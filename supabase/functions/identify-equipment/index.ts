// كوتش الحديد — التعرّف على أجهزة الجيم من صورة (Claude)
// Secrets: ANTHROPIC_API_KEY (مطلوب) · DAILY_LIMIT (اختياري، افتراضي 20) · MODEL / MODEL_INBODY (اختياري)
// body.mode: "equipment" (افتراضي) أو "inbody"
import { createClient } from "npm:@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (b: unknown, s = 200) =>
  new Response(JSON.stringify(b), { status: s, headers: { ...cors, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "method" }, 405);

  const key = Deno.env.get("ANTHROPIC_API_KEY");
  if (!key) return json({ error: "not_configured" }, 503);

  // only signed-in app users
  let serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
  if (!serviceKey) {
    try { const k = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") || "{}"); serviceKey = k.default || Object.values(k)[0] as string || ""; } catch { /* ignore */ }
  }
  const admin = createClient(Deno.env.get("SUPABASE_URL")!, serviceKey, { auth: { persistSession: false } });
  const jwt = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
  const { data: u } = await admin.auth.getUser(jwt);
  if (!u?.user) return json({ error: "unauthorized" }, 401);

  // daily limit per user
  const limit = Number(Deno.env.get("DAILY_LIMIT") || "20");
  const { data: count, error: e1 } = await admin.rpc("ai_bump", { p_user: u.user.id, p_limit: limit });
  if (e1) return json({ error: "usage", detail: e1.message }, 500);
  if (count < 0) return json({ error: "limit", limit }, 429);

  let body: any;
  try { body = await req.json(); } catch { return json({ error: "bad_image" }, 400); }
  const mode = body.mode === "inbody" ? "inbody" : "equipment";
  const image = String(body.image || "");
  if (!image || image.length > 5_000_000) return json({ error: "bad_image" }, 400);
  const ids = String(body.ids || "").slice(0, 12000);
  const muscles = String(body.muscles || "").slice(0, 1000);
  const catalog = String(body.catalog || "").slice(0, 6000);

  const inbodyPrompt = `The photo shows an InBody body-composition result sheet (any model: InBody 120/230/270/370/570/770; printed paper or a photo of a screen; English or Arabic). Read every value exactly as printed. Convert lb to kg if needed. Use null for anything missing or unreadable - never guess.
Reply with ONLY one JSON object with these keys:
{"is_inbody":true,"date":"YYYY-MM-DD","time":"HH:MM","idno":"...","device":"InBody 120","height":0,"age":0,"sex":"male|female","tbw":0,"protein":0,"minerals":0,"bfm":0,"weight":0,"smm":0,"bmi":0,"pbf":0,"score":0,"target_weight":0,"weight_control":0,"fat_control":0,"muscle_control":0,"bmr":0,"whr":0,"vfl":0,"obesity_deg":0,"ffm":0,"bmc":0,
"ranges":{"<key>":[low,high]},
"seg":{"la":0,"ra":0,"tr":0,"ll":0,"rl":0},"segKg":{"la":0,"ra":0,"tr":0,"ll":0,"rl":0},"segFat":{"la":0,"ra":0,"tr":0,"ll":0,"rl":0},"segFatKg":{"la":0,"ra":0,"tr":0,"ll":0,"rl":0},
"history":[{"date":"YYYY-MM-DD","weight":0,"smm":0,"pbf":0}],"unclear":"short note in Egyptian Arabic about anything you could not read, or empty"}
Meanings: smm = Skeletal Muscle Mass kg; bfm = Body Fat Mass kg; pbf = Percent Body Fat; vfl = Visceral Fat Level; bmr = Basal Metabolic Rate kcal; whr = Waist-Hip Ratio; obesity_deg = Obesity Degree %; ffm = Fat Free Mass; bmc = Bone Mineral Content; tbw = Total Body Water.
ranges: the normal range printed in brackets next to a value, keyed by the same key names (e.g. "weight":[66.8,90.4]).
seg = Segmental Lean Analysis percentages, segKg = its kg values; segFat/segFatKg = Segmental Fat Analysis. la/ra = left/right arm, ll/rl = left/right leg, tr = trunk. Use the Left/Right labels printed beside the body figure to decide sides.
history = earlier measurements from the Body Composition History table (not including this test's date). All numbers plain, no units.
If the image is not an InBody sheet, reply {"is_inbody":false}.`;
  const equipmentPrompt = `The photo was taken inside a gym. Identify the gym machine or piece of equipment in it. Write every text field in Egyptian Arabic (colloquial, short, clear).
Muscle ids you may use: ${muscles}
Exercise library (id|name|equipment) — only use these ids:
${ids}
Equipment catalog (id|name) — pick the closest one or null:
${catalog}
Reply with ONLY one JSON object:
{"is_equipment":true,"name_ar":"...","name_en":"...","what_for":"1-2 sentences: what it trains and why","primary":["muscle ids"],"secondary":["muscle ids"],"how_to":["3-5 short steps: setup, movement, breathing"],"mistakes":["2-3 common mistakes"],"related":["up to 5 library exercise ids done on this equipment"],"no_machine_alt":["1-2 bodyweight library ids"],"catalog":"catalog id or null","confidence":"high|medium|low"}
If the photo is not gym equipment, set is_equipment=false and say in what_for what to photograph instead.`;
  const prompt = mode === "inbody" ? inbodyPrompt : equipmentPrompt;

  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({
      model: mode === "inbody" ? (Deno.env.get("MODEL_INBODY") || "claude-sonnet-5") : (Deno.env.get("MODEL") || "claude-haiku-4-5-20251001"),
      max_tokens: mode === "inbody" ? 2500 : 1200,
      messages: [{ role: "user", content: [
        { type: "image", source: { type: "base64", media_type: "image/jpeg", data: image } },
        { type: "text", text: prompt },
      ] }],
    }),
  });
  if (!r.ok) return json({ error: "upstream", status: r.status, detail: (await r.text()).slice(0, 300) }, 502);
  const out = await r.json();
  const text = (out.content || []).filter((c: any) => c.type === "text").map((c: any) => c.text).join("");
  const m = text.match(/\{[\s\S]*\}/);
  if (!m) return json({ error: "parse" }, 502);
  try { return json({ ok: true, result: JSON.parse(m[0]), left: Math.max(0, limit - count) }); }
  catch { return json({ error: "parse" }, 502); }
});
