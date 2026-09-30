(function(){
"use strict";
/* ---------- muscles ---------- */
const MUSCLES={chest:"صدر",front_delts:"كتف أمامي",side_delts:"كتف جانبي",rear_delts:"كتف خلفي",biceps:"باي",triceps:"تراي",forearms:"سواعد",abs:"بطن",obliques:"جوانب البطن",traps:"ترابيس",lats:"ظهر عريض (لاتس)",lower_back:"أسفل الظهر",glutes:"مؤخرة (جلوتس)",quads:"فخذ أمامي",hamstrings:"فخذ خلفي",adductors:"داخل الفخذ",calves:"سمانة"};
const SIL_FRONT=`<circle class="sil" cx="100" cy="28" r="18"/><rect class="sil" x="92" y="44" width="16" height="16" rx="4"/><path class="sil" d="M76 168 L124 168 L130 198 L70 198 Z"/><ellipse class="sil" cx="46" cy="180" rx="7" ry="10"/><ellipse class="sil" cx="154" cy="180" rx="7" ry="10"/><ellipse class="sil" cx="83" cy="280" rx="9" ry="8"/><ellipse class="sil" cx="117" cy="280" rx="9" ry="8"/><ellipse class="sil" cx="80" cy="352" rx="10" ry="6"/><ellipse class="sil" cx="120" cy="352" rx="10" ry="6"/>`;
const SIL_BACK=SIL_FRONT;
const FRONT=[
 ["traps",'<path d="M86 58 L100 63 L114 58 L127 68 L73 68 Z"/>'],
 ["side_delts",'<ellipse cx="55" cy="80" rx="8" ry="14"/>'],["side_delts",'<ellipse cx="145" cy="80" rx="8" ry="14"/>'],
 ["front_delts",'<ellipse cx="65" cy="76" rx="10" ry="13"/>'],["front_delts",'<ellipse cx="135" cy="76" rx="10" ry="13"/>'],
 ["chest",'<path d="M99 70 L77 70 Q70 86 76 101 Q89 107 99 103 Z"/>'],["chest",'<path d="M101 70 L123 70 Q130 86 124 101 Q111 107 101 103 Z"/>'],
 ["biceps",'<ellipse cx="57" cy="110" rx="9" ry="19"/>'],["biceps",'<ellipse cx="143" cy="110" rx="9" ry="19"/>'],
 ["forearms",'<ellipse cx="50" cy="150" rx="8" ry="21"/>'],["forearms",'<ellipse cx="150" cy="150" rx="8" ry="21"/>'],
 ["obliques",'<path d="M87 107 L77 104 Q72 140 78 167 L87 167 Z"/>'],["obliques",'<path d="M113 107 L123 104 Q128 140 122 167 L113 167 Z"/>'],
 ["abs",'<rect x="89" y="107" width="22" height="60" rx="6"/>'],
 ["quads",'<path d="M71 198 L89 202 L91 270 Q82 278 76 268 Q67 234 71 198 Z"/>'],["quads",'<path d="M129 198 L111 202 L109 270 Q118 278 124 268 Q133 234 129 198 Z"/>'],
 ["adductors",'<path d="M90 202 L99 201 L97 248 L92 260 Z"/>'],["adductors",'<path d="M110 202 L101 201 L103 248 L108 260 Z"/>'],
 ["calves",'<ellipse cx="82" cy="314" rx="9" ry="28"/>'],["calves",'<ellipse cx="118" cy="314" rx="9" ry="28"/>']
];
const BACK=[
 ["side_delts",'<ellipse cx="55" cy="80" rx="8" ry="14"/>'],["side_delts",'<ellipse cx="145" cy="80" rx="8" ry="14"/>'],
 ["rear_delts",'<ellipse cx="65" cy="76" rx="10" ry="13"/>'],["rear_delts",'<ellipse cx="135" cy="76" rx="10" ry="13"/>'],
 ["lats",'<path d="M77 72 L91 100 L93 150 L80 152 Q70 112 75 82 Z"/>'],["lats",'<path d="M123 72 L109 100 L107 150 L120 152 Q130 112 125 82 Z"/>'],
 ["traps",'<path d="M100 48 L123 67 L108 100 L100 108 L92 100 L77 67 Z"/>'],
 ["lower_back",'<path d="M95 112 L105 112 L109 150 L112 168 L88 168 L91 150 Z"/>'],
 ["triceps",'<ellipse cx="57" cy="110" rx="9" ry="19"/>'],["triceps",'<ellipse cx="143" cy="110" rx="9" ry="19"/>'],
 ["forearms",'<ellipse cx="50" cy="150" rx="8" ry="21"/>'],["forearms",'<ellipse cx="150" cy="150" rx="8" ry="21"/>'],
 ["glutes",'<ellipse cx="88" cy="186" rx="14" ry="16"/>'],["glutes",'<ellipse cx="112" cy="186" rx="14" ry="16"/>'],
 ["hamstrings",'<path d="M72 204 L98 206 L96 270 Q84 278 76 268 Q68 236 72 204 Z"/>'],["hamstrings",'<path d="M128 204 L102 206 L104 270 Q116 278 124 268 Q132 236 128 204 Z"/>'],
 ["calves",'<ellipse cx="82" cy="314" rx="11" ry="28"/>'],["calves",'<ellipse cx="118" cy="314" rx="11" ry="28"/>']
];
function bodyMap(p,s,opts){
  opts=opts||{};p=p||[];s=s||[];
  const draw=(arr,sil,label)=>`<figure><svg viewBox="30 0 140 362" role="img" aria-label="${label}">${sil}${arr.map(([m,svg])=>{
      const c=p.includes(m)?" p":(s.includes(m)?" s":"");
      const tag=svg.match(/^<(\w+)/)[1];
      return svg.replace(/^<(\w+)/,`<$1 class="m${c}" data-m="${m}"`).replace(/\/>$/,`><title>${MUSCLES[m]}</title></${tag}>`);
    }).join("")}</svg>${opts.caption===false?"":`<figcaption>${label}</figcaption>`}</figure>`;
  return `<div class="bm${opts.big?" big":""}${opts.pick?" pick":""}">${draw(FRONT,SIL_FRONT,"أمام")}${draw(BACK,SIL_BACK,"خلف")}</div>`;
}
const LEGEND=`<div class="legend"><span><i style="background:var(--hit)"></i>عضلة أساسية</span><span><i style="background:var(--hit-2)"></i>مساعدة</span></div>`;

/* ---------- exercise library ---------- */
const EQ={machine:"جهاز",cable:"كابل",barbell:"بار",dumbbell:"دمبلز",bodyweight:"بدون جهاز"};
const X=(id,ar,en,eq,pat,p,s,steps,tip)=>({id,ar,en,eq,pat,p,s,steps,tip});
const LIB=[
X("bench_press","بنش برس بالبار","Barbell Bench Press","barbell","horizontal_push",["chest"],["front_delts","triceps"],["نام على البنش وعينك تحت البار، ولوحي الكتف مشدودين لورا","نزّل البار ببطء لحد منتصف الصدر","ادفع لفوق من غير ما تقفل الكوع بعنف"],"خلي رجلك ثابتة في الأرض وماتنططش البار على صدرك."),
X("incline_db_press","ضغط دمبلز مايل","Incline Dumbbell Press","dumbbell","horizontal_push",["chest"],["front_delts","triceps"],["البنش على ميل 30 درجة تقريبًا","نزّل الدمبلز لحد جنب الصدر والكوع بزاوية 45","ادفع لفوق وقرّب الدمبلز من غير ما تخبطهم"],"الميل العالي بيحوّل الشغل للكتف، خليه 30 درجة."),
X("chest_press_machine","جهاز تشيست برس","Chest Press Machine","machine","horizontal_push",["chest"],["front_delts","triceps"],["اضبط الكرسي بحيث المسكات تبقى على مستوى نص الصدر","ادفع لقدام مع الزفير","ارجع ببطء لحد ما تحس بفرد في الصدر"],"أسهل وأأمن بداية للمبتدئين."),
X("push_up","ضغط","Push-up","bodyweight","horizontal_push",["chest"],["triceps","front_delts","abs"],["إيديك أعرض من كتافك شوية وجسمك خط مستقيم","انزل لحد ما صدرك يقرّب من الأرض","ادفع لفوق وشد بطنك طول الوقت"],"لو صعب، ابدأ على ركبك أو إيديك على كنبة."),
X("pec_deck","جهاز فراشة (بيك دك)","Pec Deck","machine","chest_fly",["chest"],["front_delts"],["اضبط الكرسي بحيث الإيد على مستوى الصدر","قفّل الدراعين قدامك بحركة نص دايرة","ارجع ببطء من غير ما تفتح زيادة عن اللزوم"],"ركّز إنك بتعصر الصدر مش بتشد بالإيد."),
X("cable_fly","تفتيح كابل","Cable Fly","cable","chest_fly",["chest"],["front_delts"],["البكرات على مستوى الكتف وخطوة لقدام","كوع مثني شوية وقفّل الإيدين قدام صدرك","ارجع ببطء لحد فرد الصدر"],"غيّر ارتفاع البكرة عشان تشتغل على أعلى أو أسفل الصدر."),
X("db_fly","تفتيح دمبلز","Dumbbell Fly","dumbbell","chest_fly",["chest"],["front_delts"],["نام على بنش مستوي والدمبلز فوق صدرك","افتح الدراعين لجنب بكوع مثني شوية","ارجع لفوق كأنك بتحضن شجرة"],"استخدم وزن خفيف، الحركة دي للفرد مش للقوة."),
X("dips","متوازي","Parallel Bar Dips","bodyweight","triceps",["triceps"],["chest","front_delts"],["امسك البارين وجسمك مفرود","انزل لحد ما الكوع يبقى 90 درجة","اطلع لفوق وأنت بتدفع بالتراي"],"ميل لقدام = صدر أكتر، جسم مفرود = تراي أكتر."),
X("bench_dip","ديبس على كرسي","Bench Dip","bodyweight","triceps",["triceps"],["front_delts","chest"],["إيديك على طرف كرسي ثابت ورجلك قدامك","انزل بالكوع لورا لحد 90 درجة","ادفع لفوق بالتراي"],"خلي ضهرك قريب من الكرسي عشان تحمي الكتف."),
X("diamond_push_up","ضغط ضيق (دايموند)","Diamond Push-up","bodyweight","triceps",["triceps"],["chest","front_delts"],["إيديك تحت صدرك ومعمول بيهم شكل مثلث","انزل والكوع لازق في جسمك","ادفع لفوق"],"لو صعب اعمله على ركبك."),
X("cable_pushdown","ترايسبس بوش داون بالكابل","Cable Triceps Pushdown","cable","triceps",["triceps"],["forearms"],["امسك الحبل أو البار والكوع لازق في جنبك","افرد دراعك لتحت لحد النهاية","ارجع لحد 90 درجة بس"],"الكوع ثابت، اللي بيتحرك الساعد بس."),
X("overhead_db_ext","ترايسبس خلف الراس بالدمبل","Overhead Dumbbell Extension","dumbbell","triceps",["triceps"],[],["امسك دمبل بالإيدين فوق راسك","نزّله ورا راسك والكوع ناحية السقف","افرد لفوق"],"بيشغّل الراس الطويلة للتراي كويس."),
X("lat_pulldown","سحب عالي (لات بول داون)","Lat Pulldown","machine","vertical_pull",["lats"],["biceps","rear_delts","traps"],["امسك البار أعرض من كتافك واقعد ثابت","اسحب البار لأعلى الصدر وصدرك لفوق","ارجع ببطء لحد فرد الدراع"],"اسحب بالكوع مش بالإيد، وماترجعش بجسمك لورا زيادة."),
X("pull_up","عقلة","Pull-up","bodyweight","vertical_pull",["lats"],["biceps","forearms","rear_delts"],["اتعلّق والإيد أعرض من الكتف","اسحب لحد ما دقنك تعدّي البار","انزل ببطء لحد فرد كامل"],"لو مش قادر، استخدم أستك مساعد أو اعمل النزول البطيء بس."),
X("seated_row","سحب أرضي بالكابل (سيتد رو)","Seated Cable Row","cable","horizontal_pull",["lats","traps"],["biceps","rear_delts"],["اقعد وضهرك مفرود ورجلك مثنية شوية","اسحب المسكة لبطنك وقفّل لوحي الكتف","ارجع ببطء لقدام"],"ماتهزّش جسمك لقدام ولورا عشان ترفع الوزن."),
X("barbell_row","سحب بالبار منحني","Bent-over Barbell Row","barbell","horizontal_pull",["lats","traps"],["biceps","rear_delts","lower_back"],["انحني لقدام 45 درجة وضهرك مفرود","اسحب البار لأسفل البطن","نزّل بتحكم"],"لو أسفل ضهرك بيوجعك، استبدله بجهاز رو."),
X("db_row","سحب دمبل بإيد واحدة","One-arm Dumbbell Row","dumbbell","horizontal_pull",["lats"],["traps","biceps","rear_delts"],["إيد وركبة على البنش وضهرك مستقيم","اسحب الدمبل ناحية الوسط","نزّل لحد فرد كامل"],"فكّر إنك بتدخّل الكوع في جيبك الورانية."),
X("inverted_row","سحب مقلوب تحت ترابيزة","Inverted Row","bodyweight","horizontal_pull",["lats","traps"],["biceps","rear_delts"],["نام تحت ترابيزة متينة وامسك طرفها","جسمك مفرود، اسحب صدرك لفوق","انزل ببطء"],"اتأكد إن الترابيزة ثابتة وتستحمل وزنك."),
X("machine_row","جهاز رو","Machine Row","machine","horizontal_pull",["lats","traps"],["biceps","rear_delts"],["صدرك على المسند واضبط الارتفاع","اسحب المسكات لورا وقفّل لوحي الكتف","ارجع ببطء"],"اختيار ممتاز لو أسفل ضهرك تعبان."),
X("shoulder_press_machine","جهاز ضغط كتف","Shoulder Press Machine","machine","vertical_push",["front_delts","side_delts"],["triceps"],["اضبط الكرسي والمسكات على مستوى الكتف","ادفع لفوق","انزل لحد مستوى الودن"],"ماتقوسش ضهرك."),
X("db_shoulder_press","ضغط كتف بالدمبلز","Dumbbell Shoulder Press","dumbbell","vertical_push",["front_delts","side_delts"],["triceps","traps"],["اقعد على بنش مسنده عمودي","الدمبلز على مستوى الكتف، ادفع لفوق","انزل ببطء"],"البطن مشدودة والضهر لازق في المسند."),
X("pike_push_up","ضغط بايك (للكتف)","Pike Push-up","bodyweight","vertical_push",["front_delts","side_delts"],["triceps"],["اعمل شكل حرف V مقلوب ووسطك لفوق","انزل براسك ناحية الأرض بين إيديك","ادفع لفوق"],"كل ما رجلك تبقى أعلى (على كرسي) الحركة تصعب."),
X("lateral_raise","رفرفة جانبي بالدمبلز","Dumbbell Lateral Raise","dumbbell","lateral",["side_delts"],["traps"],["اقف والدمبلز جنبك وكوع مثني شوية","ارفع لجنب لحد مستوى الكتف","نزّل ببطء"],"وزن خفيف وتحكم، ماترفعش كتافك لودانك."),
X("cable_lateral","رفرفة جانبي بالكابل","Cable Lateral Raise","cable","lateral",["side_delts"],["traps"],["البكرة تحت وامسكها بالإيد البعيدة","ارفع لجنب لحد مستوى الكتف","نزّل ببطء"],"الكابل بيدي شد ثابت طول الحركة."),
X("reverse_pec_deck","فراشة عكسي","Reverse Pec Deck","machine","rear_delt",["rear_delts"],["traps"],["اقعد وصدرك على المسند","افتح دراعك لورا بحركة نص دايرة","ارجع ببطء"],"وزن خفيف، الكتف الخلفي عضلة صغيرة."),
X("face_pull","فيس بول بالكابل","Face Pull","cable","rear_delt",["rear_delts"],["traps","side_delts"],["البكرة على مستوى الوش بحبل","اسحب الحبل ناحية وشك والكوع عالي","افتح الحبل عند نهاية الحركة"],"مفيد جدًا لصحة الكتف ووقفة الجسم."),
X("prone_y_raise","رفع Y على البطن","Prone Y Raise","bodyweight","rear_delt",["rear_delts","traps"],["lower_back"],["نام على بطنك ودراعك قدامك على شكل Y","ارفع دراعك من الأرض وضم لوحي الكتف","اثبت ثانية ونزّل"],"ممكن تمسك زجاجتين مية عشان تصعبه."),
X("barbell_curl","بايسبس بالبار","Barbell Curl","barbell","biceps",["biceps"],["forearms"],["اقف والبار في إيدك بعرض الكتف","اثني الكوع وارفع البار","نزّل ببطء لحد فرد كامل"],"الكوع ثابت جنبك وماتهزّش جسمك."),
X("db_curl","بايسبس دمبلز","Dumbbell Curl","dumbbell","biceps",["biceps"],["forearms"],["دمبل في كل إيد وكفك لقدام","ارفع وانت بتلف الكف لفوق","نزّل ببطء"],"ممكن تبدّل إيد إيد."),
X("hammer_curl","هامر كيرل","Hammer Curl","dumbbell","biceps",["biceps","forearms"],[],["امسك الدمبلز والكف ناحية جسمك","ارفع من غير ما تلف الكف","نزّل ببطء"],"بيشتغل على السواعد كمان."),
X("cable_curl","بايسبس بالكابل","Cable Curl","cable","biceps",["biceps"],["forearms"],["البكرة تحت وامسك البار","ارفع بالكوع الثابت","نزّل ببطء"],"شد مستمر أحسن من الدمبلز في آخر الحركة."),
X("towel_curl","بايسبس بالفوطة (مقاومة ذاتية)","Towel Isometric Curl","bodyweight","biceps",["biceps"],["forearms"],["دوس على نص فوطة برجلك وامسك طرفيها","اسحب لفوق وقاوم برجلك","اثبت 5 ثواني في كل عدّة"],"بديل بيتي لما مايكونش عندك أوزان."),
X("squat","سكوات بالبار","Barbell Back Squat","barbell","squat",["quads","glutes"],["adductors","lower_back","abs","hamstrings"],["البار على الترابيس ورجلك بعرض الكتف","انزل كأنك قاعد على كرسي والضهر مفرود","اطلع بالدفع من الكعب"],"الركبة في اتجاه صوابع الرجل، وماتنزلش أكتر من ما مرونتك تسمح."),
X("leg_press","جهاز ليج برس","Leg Press","machine","squat",["quads","glutes"],["adductors","hamstrings"],["رجلك على المنصة بعرض الكتف","انزل لحد ما الركبة تبقى 90 درجة","ادفع من غير ما تقفل الركبة"],"ماتخليش وسطك يترفع من الكرسي تحت."),
X("goblet_squat","جوبلت سكوات بالدمبل","Goblet Squat","dumbbell","squat",["quads","glutes"],["adductors","abs"],["امسك دمبل قدام صدرك","انزل والكوع بين الركبتين","اطلع وانت صدرك مرفوع"],"أحسن تمرين لتعليم السكوات الصح."),
X("bw_squat","سكوات بوزن الجسم","Bodyweight Squat","bodyweight","squat",["quads","glutes"],["adductors","abs"],["رجلك بعرض الكتف وإيدك قدامك","انزل لحد ما الفخذ يبقى موازي للأرض","اطلع بالدفع من الكعب"],"زوّد العدّات أو بطّأ النزول عشان تصعّبه."),
X("romanian_deadlift","رومانيان ديدليفت","Romanian Deadlift","barbell","hinge",["hamstrings","glutes"],["lower_back","forearms"],["امسك البار ورجلك بعرض الوسط","ارجع بوسطك لورا والبار ماشي على رجلك","اطلع بعصر المؤخرة"],"الضهر مستقيم دايمًا، والركبة مثنية شوية."),
X("db_rdl","رومانيان بالدمبلز","Dumbbell Romanian Deadlift","dumbbell","hinge",["hamstrings","glutes"],["lower_back"],["دمبل في كل إيد قدام فخذك","ارجع بوسطك لورا والدمبلز نازلين على رجلك","اطلع بعصر المؤخرة"],"هتحس بشد في الفخذ الخلفي، ده المطلوب."),
X("deadlift","ديدليفت","Conventional Deadlift","barbell","hinge",["hamstrings","glutes","lower_back"],["traps","forearms","quads","lats"],["البار فوق نص رجلك، امسكه والضهر مفرود","ادفع الأرض برجلك وافرد جسمك","نزّل بنفس المسار"],"تمرين تقيل، ابدأ خفيف واتعلم التكنيك كويس."),
X("single_leg_rdl","رومانيان رجل واحدة بوزن الجسم","Single-leg RDL","bodyweight","hinge",["hamstrings","glutes"],["lower_back","abs"],["اقف على رجل واحدة","انحني لقدام والرجل التانية ترتفع لورا","ارجع لفوق بعصر المؤخرة"],"امسك في حيطة في الأول عشان التوازن."),
X("back_extension","ظهر سفلي (هايبر إكستنشن)","Back Extension","machine","hinge",["lower_back"],["glutes","hamstrings"],["وسطك على طرف المسند ورجلك مثبتة","انزل لقدام والضهر مفرود","اطلع لحد خط مستقيم بس"],"ماتطلعش أعلى من الخط المستقيم."),
X("superman","سوبرمان","Superman Hold","bodyweight","hinge",["lower_back"],["glutes","rear_delts"],["نام على بطنك ودراعك قدامك","ارفع إيدك ورجلك سوا من الأرض","اثبت 2-3 ثواني ونزّل"],"بديل بيتي لأسفل الضهر."),
X("leg_extension","جهاز رفرفة أمامي (ليج إكستنشن)","Leg Extension","machine","knee_ext",["quads"],[],["اضبط المسند بحيث الركبة عند محور الجهاز","افرد رجلك لقدام","نزّل ببطء"],"اثبت ثانية فوق عشان تعصر الفخذ."),
X("wall_sit","قعدة الحيطة","Wall Sit","bodyweight","knee_ext",["quads"],["glutes"],["سند ضهرك على الحيطة","انزل لحد ما الركبة 90 درجة","اثبت 30-60 ثانية"],"بديل بيتي للفخذ الأمامي."),
X("leg_curl","جهاز رفرفة خلفي (ليج كيرل)","Lying Leg Curl","machine","knee_flex",["hamstrings"],["calves"],["نام على بطنك والمسند فوق الكعب","اثني رجلك لورا ناحية المؤخرة","نزّل ببطء"],"ماترفعش وسطك من الجهاز."),
X("slider_leg_curl","ليج كيرل بالفوطة على الأرض","Towel Slider Leg Curl","bodyweight","knee_flex",["hamstrings"],["glutes"],["نام على ضهرك وكعبك على فوطة على أرض ملسا","ارفع وسطك واسحب الفوطة ناحيتك","افرد رجلك ببطء"],"بديل بيتي قوي للفخذ الخلفي."),
X("walking_lunge","لانجز بالدمبلز","Dumbbell Walking Lunge","dumbbell","lunge",["quads","glutes"],["hamstrings","adductors"],["دمبل في كل إيد وخد خطوة واسعة","انزل لحد ما الركبة الورانية تقرّب من الأرض","اطلع وكمّل بالرجل التانية"],"الجذع مفرود والركبة الأمامية ماتدخلش لجوه."),
X("bw_lunge","لانجز بوزن الجسم","Bodyweight Lunge","bodyweight","lunge",["quads","glutes"],["hamstrings","adductors"],["خد خطوة لقدام","انزل بالركبتين 90 درجة","ارجع وبدّل"],"ممكن تعمله لورا لو ركبتك حساسة."),
X("bulgarian","بلغاري سبليت سكوات","Bulgarian Split Squat","dumbbell","lunge",["quads","glutes"],["adductors","hamstrings"],["رجل ورا على بنش والتانية قدام","انزل على الرجل الأمامية","اطلع بالدفع من الكعب"],"من أقوى تمارين الرجل لو معاك دمبلز خفيفة."),
X("hip_thrust","هيب ثرست بالبار","Barbell Hip Thrust","barbell","glute_iso",["glutes"],["hamstrings"],["ضهرك على البنش والبار على وسطك","ارفع وسطك لحد خط مستقيم","اعصر المؤخرة فوق ونزّل"],"استخدم مخدة للبار عشان عضمة الحوض."),
X("glute_bridge","جلوت بريدج","Glute Bridge","bodyweight","glute_iso",["glutes"],["hamstrings","lower_back"],["نام على ضهرك والركبة مثنية","ارفع وسطك لفوق","اعصر المؤخرة ونزّل ببطء"],"اعمله برجل واحدة لما يسهل."),
X("hip_abductor","جهاز أبدكتور (خارج الفخذ)","Hip Abductor Machine","machine","glute_iso",["glutes"],[],["اقعد والمساند على جنب ركبتك","افتح رجلك لبرّه","ارجع ببطء"],"مال لقدام شوية عشان تشتغل على الجلوت أكتر."),
X("hip_adductor","جهاز أدكتور (داخل الفخذ)","Hip Adductor Machine","machine","adductor",["adductors"],[],["اقعد والمساند جوه ركبتك","قفّل رجلك لجوه","افتح ببطء"],"ماتفتحش أكتر من مرونتك."),
X("sumo_squat","سومو سكوات","Sumo Squat","bodyweight","adductor",["adductors","glutes"],["quads"],["رجلك أعرض من الكتف وصوابعك لبرّه","انزل والركبة في اتجاه الصوابع","اطلع بعصر داخل الفخذ"],"ممكن تمسك دمبل أو شنطة تقيلة."),
X("calf_raise_machine","جهاز سمانة","Calf Raise Machine","machine","calves",["calves"],[],["مشط رجلك على الطرف","ارفع كعبك لأعلى نقطة","نزّل لحد فرد كامل"],"اثبت ثانية فوق وثانية تحت."),
X("bw_calf_raise","سمانة على سلمة","Step Calf Raise","bodyweight","calves",["calves"],[],["اقف بمشط رجلك على سلمة","ارفع كعبك لفوق","نزّل تحت مستوى السلمة"],"اعمله برجل واحدة عشان تصعّبه."),
X("plank","بلانك","Plank","bodyweight","core",["abs"],["obliques","lower_back","front_delts"],["على الساعدين وجسمك خط مستقيم","شد بطنك ومؤخرتك","اثبت 30-60 ثانية"],"ماتخليش وسطك يقع لتحت."),
X("crunch","كرانش","Crunch","bodyweight","core",["abs"],[],["نام على ضهرك والركبة مثنية","ارفع كتافك من الأرض بعصر البطن","نزّل ببطء"],"ماتشدش رقبتك بإيدك."),
X("hanging_leg_raise","رفع رجلين وانت متعلق","Hanging Leg Raise","bodyweight","core",["abs"],["obliques","forearms"],["اتعلّق في العقلة","ارفع رجلك أو ركبتك لفوق","نزّل ببطء من غير مرجحة"],"ابدأ برفع الركبة لو الرجل مفرودة صعبة."),
X("cable_crunch","كرانش بالكابل","Cable Crunch","cable","core",["abs"],["obliques"],["اركع قدام البكرة وامسك الحبل جنب راسك","انحني لتحت بالبطن","ارجع ببطء"],"الحركة من البطن مش من الوسط."),
X("russian_twist","رشن تويست","Russian Twist","bodyweight","obliques",["obliques"],["abs"],["اقعد ومِيل لورا شوية ورجلك مرفوعة","لف جسمك يمين وشمال","خلي الحركة بطيئة"],"ممكن تمسك زجاجة مية أو طبق."),
X("side_plank","بلانك جانبي","Side Plank","bodyweight","obliques",["obliques"],["abs","side_delts"],["على ساعد واحد وجسمك على جنب","ارفع وسطك لخط مستقيم","اثبت 20-45 ثانية كل ناحية"],"ماتخليش الوسط ينزل."),
X("cable_woodchop","وود تشوب بالكابل","Cable Woodchop","cable","obliques",["obliques"],["abs","front_delts"],["البكرة عالية وامسكها بالإيدين","اسحب بالعرض لتحت ناحية الركبة التانية","ارجع ببطء"],"اللف من الجذع مش من الدراع."),
X("incline_walk","مشي على سير بميل","Incline Treadmill Walk","machine","cardio",["calves","glutes"],["hamstrings","quads"],["اضبط الميل 8-12% والسرعة 5-6 كم/س","امشي من غير ما تسند على الجهاز","كمّل 15-25 دقيقة"],"كارديو قليل الضغط على الركبة وممتاز للحرق."),
X("bike","عجلة ثابتة","Stationary Bike","machine","cardio",["quads"],["calves","glutes","hamstrings"],["اضبط الكرسي بحيث الركبة مثنية شوية تحت","ابدأ بمقاومة متوسطة","ممكن تبدّل دقيقة سريع ودقيقة هادي"],"اختيار كويس لو عندك وزن زايد أو ركبة حساسة."),
X("jumping_jacks","جامبنج جاك","Jumping Jacks","bodyweight","cardio",["calves"],["quads","side_delts"],["اقف ورجلك مضمومة","نط وافتح رجلك وإيدك فوق","ارجع لنفس الوضع"],"اعمل 30 ثانية شغل و15 راحة."),
X("burpee","بيربي","Burpee","bodyweight","cardio",["quads","chest"],["abs","front_delts","triceps"],["انزل وحط إيدك على الأرض","ارمي رجلك لورا واعمل ضغطة","ارجع ونط لفوق"],"تمرين حرق قوي، ابدأ بعدد قليل.")
];
const BY=Object.fromEntries(LIB.map(e=>[e.id,e]));
/* ---------- animated images + extended library (Free Exercise DB, public domain) ---------- */
const ANIM=new Set(["bench_press", "incline_db_press", "chest_press_machine", "push_up", "pec_deck", "cable_fly", "db_fly", "dips", "bench_dip", "diamond_push_up", "cable_pushdown", "overhead_db_ext", "lat_pulldown", "pull_up", "seated_row", "barbell_row", "db_row", "inverted_row", "machine_row", "shoulder_press_machine", "db_shoulder_press", "lateral_raise", "cable_lateral", "reverse_pec_deck", "face_pull", "prone_y_raise", "barbell_curl", "db_curl", "hammer_curl", "cable_curl", "squat", "leg_press", "goblet_squat", "bw_squat", "romanian_deadlift", "db_rdl", "deadlift", "single_leg_rdl", "back_extension", "superman", "leg_extension", "leg_curl", "slider_leg_curl", "walking_lunge", "bw_lunge", "bulgarian", "hip_thrust", "glute_bridge", "hip_abductor", "hip_adductor", "sumo_squat", "calf_raise_machine", "bw_calf_raise", "plank", "crunch", "hanging_leg_raise", "cable_crunch", "russian_twist", "side_plank", "cable_woodchop", "incline_walk", "bike", "jumping_jacks"]);
EQ.other="أدوات تانية";
let XDB=null,XBY={},xdbLoading=null;
const XLVL={beginner:"مبتدئ",intermediate:"متوسط",expert:"متقدم"};
const XCAT={strength:"قوة",stretching:"إطالة",plyometrics:"بليومترك",cardio:"كارديو",powerlifting:"باورليفتنج","olympic weightlifting":"رفع أثقال أوليمبي",strongman:"سترونج مان"};
function loadXDB(){
  if(!xdbLoading)xdbLoading=fetch("xdb.json").then(r=>r.json()).then(a=>{XDB=a;XBY=Object.fromEntries(a.map(x=>[x.i,x]));return a;}).catch(()=>{xdbLoading=null;return null;});
  return xdbLoading;
}
function getEx(id){
  if(LIBMAP[id])return LIBMAP[id];
  if(id&&id.startsWith("x:")){const x=XBY[id.slice(2)];if(!x)return null;
    return {id,ar:x.n,en:x.n,eq:x.q,pat:null,p:x.p,s:x.s,steps:x.t,tip:"",x:true,xid:x.i,frames:x.k,lvl:x.l,cat:x.c};}
  return null;
}
const LIBMAP=BY;
function frames(e){
  if(!e)return null;
  if(e.x)return e.frames?[0,1].slice(0,e.frames).map(n=>"xdb/"+encodeURIComponent(e.xid)+"/"+n+".jpg"):null;
  return ANIM.has(e.id)?["ex/"+e.id+"-0.jpg","ex/"+e.id+"-1.jpg"]:null;
}
function animHTML(e,cls){
  const f=frames(e);if(!f)return "";
  return `<div class="anim ${cls||""}" data-open="${esc(e.id)}" role="img" aria-label="${esc(e.ar)}"><img src="${f[0]}" alt="" loading="lazy" decoding="async">${f[1]?`<img src="${f[1]}" alt="" class="f2" loading="lazy" decoding="async">`:""}</div>`;
}

/* ---------- plan generator ---------- */
const TEMPLATES={
 full_a:{sh:"كامل A",t:"جسم كامل A",f:"رجل + صدر + ظهر",p:["squat","horizontal_push","vertical_pull","lateral","biceps","core"]},
 full_b:{sh:"كامل B",t:"جسم كامل B",f:"خلفي + كتف + ظهر",p:["hinge","vertical_push","horizontal_pull","lunge","triceps","obliques"]},
 full_c:{sh:"كامل C",t:"جسم كامل C",f:"تنويع شامل",p:["squat#1","horizontal_push#1","horizontal_pull#1","rear_delt","knee_flex","calves"]},
 upper1:{sh:"علوي 1",t:"الجزء العلوي 1",f:"صدر + ظهر + كتف + دراع",p:["horizontal_push","horizontal_pull","vertical_push","vertical_pull","biceps","triceps"]},
 lower1:{sh:"سفلي 1",t:"الجزء السفلي 1",f:"فخذ أمامي وخلفي + سمانة",p:["squat","hinge","knee_ext","knee_flex","calves","core"]},
 upper2:{sh:"علوي 2",t:"الجزء العلوي 2",f:"صدر وضهر بتنويع",p:["horizontal_push#1","vertical_pull#1","chest_fly","horizontal_pull#1","lateral","rear_delt"]},
 lower2:{sh:"سفلي 2",t:"الجزء السفلي 2",f:"مؤخرة + لانجز + بطن",p:["lunge","glute_iso","squat#1","knee_flex#1","adductor","obliques"]},
 push:{sh:"دفع",t:"دفع (Push)",f:"صدر + كتف + تراي",p:["horizontal_push","vertical_push","horizontal_push#1","chest_fly","lateral","triceps"]},
 pull:{sh:"سحب",t:"سحب (Pull)",f:"ظهر + كتف خلفي + باي",p:["vertical_pull","horizontal_pull","horizontal_pull#1","rear_delt","biceps","biceps#1"]},
 legs:{sh:"رجل",t:"رجل (Legs)",f:"فخذ + مؤخرة + سمانة",p:["squat","hinge","knee_ext","knee_flex","calves","core"]},
 push2:{sh:"دفع 2",t:"دفع 2",f:"كتف + صدر علوي + تراي",p:["vertical_push#1","horizontal_push#2","chest_fly#1","lateral#1","triceps#1","triceps#2"]},
 pull2:{sh:"سحب 2",t:"سحب 2",f:"سماكة الضهر + باي",p:["horizontal_pull#2","vertical_pull#1","rear_delt#1","biceps#2","biceps#1","core#1"]},
 legs2:{sh:"رجل 2",t:"رجل 2",f:"مؤخرة + خلفي",p:["hinge#1","lunge","glute_iso","knee_flex#1","adductor","calves#1"]}
};
const SPLITS={1:["full_a"],2:["full_a","full_b"],3:["full_a","full_b","full_c"],4:["upper1","lower1","upper2","lower2"],5:["push","pull","legs","upper2","lower2"],6:["push","pull","legs","push2","pull2","legs2"],7:["push","pull","legs","push2","pull2","legs2","full_c"]};
function allowedEq(pr){
  if(pr.location==="home0") return ["bodyweight"];
  if(pr.location==="home1") return ["bodyweight","dumbbell"];
  return ["machine","cable","barbell","dumbbell","bodyweight"];
}
function eqPref(pr){
  if(pr.location==="home1") return ["dumbbell","bodyweight"];
  if(pr.location==="home0") return ["bodyweight"];
  return pr.level==="beginner"?["machine","cable","dumbbell","bodyweight","barbell"]:["barbell","dumbbell","cable","machine","bodyweight"];
}
function candidates(pat,pr,strict){
  const al=strict===false?Object.keys(EQ):allowedEq(pr),pref=eqPref(pr).concat(Object.keys(EQ));
  return LIB.filter(e=>e.pat===pat&&al.includes(e.eq)).sort((a,b)=>pref.indexOf(a.eq)-pref.indexOf(b.eq));
}
const FALLBACK_PAT={chest_fly:"horizontal_push",lateral:"vertical_push",biceps:"horizontal_pull",vertical_pull:"horizontal_pull",knee_ext:"squat",adductor:"squat"};
function pickFor(pat,idx,pr){
  let c=candidates(pat,pr);
  if(!c.length&&FALLBACK_PAT[pat]) {c=candidates(FALLBACK_PAT[pat],pr);idx+=2;}
  if(!c.length) c=candidates(pat,pr,false);
  return c.length?c[idx%c.length]:null;
}
function goalOf(pr,ib){
  if(pr.goal&&pr.goal!=="auto") return pr.goal;
  return analyze(pr,ib).autoGoal;
}
function prescription(goal,level,pos){
  const beg=level==="beginner";
  if(goal==="fat_loss") return pos<2?{sets:beg?3:4,reps:"8–10",rest:"90 ث"}:{sets:3,reps:"12–15",rest:"45–60 ث"};
  if(goal==="muscle") return {sets:beg?3:(pos<2?4:3),reps:pos<2?"8–10":"10–12",rest:pos<2?"90 ث":"60–75 ث"};
  if(goal==="strength") return {sets:beg?3:(pos<2?5:3),reps:pos<2?"4–6":"8–10",rest:pos<2?"2–3 د":"90 ث"};
  return {sets:beg?3:(pos<2?4:3),reps:pos<2?"6–8":"10–12",rest:pos<2?"2 د":"60–75 ث"};
}
function buildPlan(pr,ib,nDays){
  const goal=goalOf(pr,ib),keys=SPLITS[Math.max(1,Math.min(7,nDays))]||SPLITS[3];
  const days=keys.map((k,di)=>{
    const T=TEMPLATES[k],used=new Set();
    const items=[];
    T.p.forEach((raw,pos)=>{
      const [pat,off]=raw.split("#");let idx=+(off||0),e=pickFor(pat,idx,pr),guard=0;
      while(e&&used.has(e.id)&&guard<6){idx++;e=pickFor(pat,idx,pr);guard++;}
      if(!e||used.has(e.id)) return;
      used.add(e.id);
      items.push(Object.assign({id:e.id},prescription(goal,pr.level,pos)));
    });
    const E=segEmphasis(ib);
    const has=(ps)=>T.p.some(r=>ps.includes(r.split("#")[0]));
    const addPat=(pat,why)=>{let k=0,e=pickFor(pat,k,pr);while(e&&used.has(e.id)&&k<6){k++;e=pickFor(pat,k,pr);}if(e&&!used.has(e.id)){used.add(e.id);items.push({id:e.id,sets:3,reps:"12–15",rest:"60 ث",note:why});}};
    if(E.weak.includes("arms")&&has(["horizontal_push","horizontal_pull","vertical_push","vertical_pull"]))addPat(di%2?"triceps":"biceps","زيادة للدراع — أضعف جزء في InBody");
    if(E.weak.includes("legs")&&has(["squat","hinge","lunge"]))addPat(T.p.some(r=>r.startsWith("lunge"))?"knee_ext":"lunge","زيادة للرجل — أضعف جزء في InBody");
    if(E.weak.includes("trunk")&&!has(["core"])) addPat("core","زيادة للجذع — أضعف جزء في InBody");
    if(goal==="fat_loss"){const c=pickFor("cardio",items.length%2,pr);if(c) items.push({id:c.id,sets:1,reps:"15–20 دقيقة",rest:"—"});}
    return {title:T.t,short:T.sh,focus:T.f,items};
  });
  return {source:"auto",goal,days,summary:localSummary(pr,ib,goal),cardio:goal==="fat_loss"?"كارديو 15–20 دقيقة في آخر كل تمرين، ومشي 7–10 آلاف خطوة يوميًا.":"كارديو خفيف 10–15 دقيقة مرتين في الأسبوع لصحة القلب.",created:today()};
}

/* ---------- segmental analysis ---------- */
const SEGN={arms:"الدراعين",trunk:"الجذع",legs:"الرجلين"};
function segEmphasis(ib){
  const r={weak:[],imb:[]};const s=ib&&ib.seg;if(!s) return r;
  const avg=(a,b)=>a!=null&&b!=null?(a+b)/2:(a!=null?a:b);
  const v={arms:avg(s.ra,s.la),trunk:s.tr,legs:avg(s.rl,s.ll)};
  const vals=Object.values(v).filter(x=>x!=null);if(!vals.length) return r;
  const mx=Math.max(...vals);
  for(const k in v){if(v[k]==null)continue;if(v[k]<95||(v[k]<105&&mx-v[k]>=12)) r.weak.push(k);}
  if(r.weak.length===3){const mn=Math.min(...vals);r.weak=Object.keys(v).filter(k=>v[k]===mn);}
  if(s.ra!=null&&s.la!=null&&Math.abs(s.ra-s.la)>=5) r.imb.push(`الدراع ${s.ra<s.la?"اليمين":"الشمال"} أضعف`);
  if(s.rl!=null&&s.ll!=null&&Math.abs(s.rl-s.ll)>=5) r.imb.push(`الرجل ${s.rl<s.ll?"اليمين":"الشمال"} أضعف`);
  r.v=v;return r;
}
function localSummary(pr,ib,goal){
  if(!ib) return "";const a=analyze(pr,ib),E=segEmphasis(ib),out=[];
  const why=goal==="fat_loss"?`نسبة الدهون ${fmt(a.pbf)}%${ib.vfl?` والدهون الحشوية مستوى ${ib.vfl}`:""}، فالأولوية حرق دهون مع الحفاظ على العضل: أول تمرينين في كل يوم أوزان تقيلة، والباقي عدّات أعلى وراحة أقصر، وكارديو في الآخر.`:goal==="muscle"?`كتلة العضل ${fmt(ib.smm)} كجم ونسبة الدهون ${fmt(a.pbf)}% في حدود كويسة، فالأولوية بناء عضل: أوزان أتقل وعدّات 8–12.`:goal==="strength"?"الأولوية قوة: أوزان تقيلة وعدّات قليلة في أول تمرينين.":`الأرقام متوازنة، فالبرنامج بيجمع بين بناء العضل وحرق الدهون.`;
  out.push(`الهدف: ${GOALS[goal]}. ${why}`);
  if(E.weak.length) out.push(`تحليل الأجزاء بيقول إن ${E.weak.map(k=>SEGN[k]).join(" و")} أضعف جزء، فزوّدنا تمارين ليه (مكتوب جنبها).`);
  if(E.imb.length) out.push(`فيه فرق بين الناحيتين (${E.imb.join("، ")}) — استخدم دمبلز وتمارين بإيد أو رجل واحدة، وابدأ بالناحية الأضعف.`);
  if(ib.segFat&&ib.segFat.tr>160) out.push(`دهون الجذع عالية (${fmt(ib.segFat.tr)}% من الطبيعي) — دي بتنزل بالحرق العام (كارديو + أكل)، مفيش تمرين بطن بيحرق دهون البطن لوحده.`);
  const ix=(S.inbody||[]).indexOf(ib),pv=ix>0?S.inbody[ix-1]:null;
  if(pv&&pv.smm!=null&&ib.smm!=null&&ib.smm-pv.smm<=-0.5) out.push(`العضل نزل ${fmt(pv.smm-ib.smm)} كجم من قياس ${pv.date} — عشان كده أول تمرينين في كل يوم أوزان تقيلة (8–10 عدّات)، وخلي البروتين كفاية. (فرق المية في الجسم ممكن يأثر على القراءة، قيس في نفس الظروف كل مرة.)`);
  if(ib.muscle_control>0) out.push(`الجهاز بيقترح تزوّد ${fmt(ib.muscle_control)} كجم عضل${ib.fat_control<0?` وتنزّل ${fmt(Math.abs(ib.fat_control))} كجم دهون`:""}.`);
  return out.join("\n");
}

/* ---------- InBody analysis ---------- */
function analyze(pr,ib){
  const r={};if(!ib) return {autoGoal:"recomp",items:[]};
  const w=+ib.weight||0,h=+pr.height||0,male=pr.sex!=="female";
  const bfm=+ib.bfm||(ib.pbf&&w?w*ib.pbf/100:0),pbf=+ib.pbf||(bfm&&w?bfm/w*100:0),smm=+ib.smm||0,vfl=+ib.vfl||0;
  const lbm=w-bfm;
  r.bmi=h?w/Math.pow(h/100,2):0;
  const pT=male?[10,20,25]:[18,28,33];
  r.pbfState=!pbf?null:pbf<pT[0]?["منخفضة","warn"]:pbf<=pT[1]?["طبيعية","ok"]:pbf<=pT[2]?["أعلى من الطبيعي","warn"]:["عالية","bad"];
  const smmPct=w&&smm?smm/w*100:0;const sT=male?[38,45]:[32,38];
  r.smmPct=smmPct;
  r.smmState=!smmPct?null:smmPct<sT[0]?["أقل من المطلوب","warn"]:smmPct<=sT[1]?["كويسة","ok"]:["ممتازة","ok"];
  r.vflState=!vfl?null:vfl<10?["طبيعية","ok"]:vfl<15?["عالية","warn"]:["عالية جدًا","bad"];
  let g="recomp";
  if((pbf&&pbf>pT[1])||vfl>=10) g="fat_loss";
  else if(smmPct&&smmPct<sT[0]) g="muscle";
  else if(pbf&&pbf<=pT[1]&&smmPct>=sT[0]) g="muscle";
  r.autoGoal=g;
  const bmr=+ib.bmr||(lbm>0?370+21.6*lbm:0);
  const nd=(pr.weekdays||[]).length||3;const f=nd<=2?1.375:nd<=4?1.465:nd<=5?1.55:1.725;
  r.bmr=bmr;r.tdee=bmr*f;
  const goal=pr.goal&&pr.goal!=="auto"?pr.goal:g;
  r.kcal=goal==="fat_loss"?r.tdee-450:goal==="muscle"?r.tdee+250:r.tdee;
  r.protein=lbm>0?[Math.round(lbm*1.8),Math.round(lbm*2.2)]:null;
  r.lbm=lbm;r.pbf=pbf;r.bfm=bfm;
  return r;
}
const GOALS={auto:"تلقائي من InBody",fat_loss:"تنشيف (حرق دهون)",muscle:"تضخيم عضلي",recomp:"إعادة تشكيل (حرق + عضل)",strength:"قوة"};

/* ---------- state ---------- */
const WEEK=[6,0,1,2,3,4,5];
const WNAME={6:"السبت",0:"الأحد",1:"الاتنين",2:"التلات",3:"الأربع",4:"الخميس",5:"الجمعة"};
function today(d){d=d||new Date();return d.toLocaleDateString("en-CA");}
function emptyState(){return {v:1,profile:{sex:"male",age:null,height:null,level:"beginner",location:"gym",goal:"auto",minutes:60,weekdays:[6,1,3],injuries:""},inbody:[],plan:null,log:{}};}
let S=emptyState();
let tab="today",selDay=null,saveTimer=null,USER=null;
function latestIB(){return S.inbody&&S.inbody.length?S.inbody[S.inbody.length-1]:null;}
function setSync(t){const el=document.getElementById("sync");if(el)el.textContent=t;}
function toast(t){const el=document.getElementById("toast");el.textContent=t;el.hidden=false;clearTimeout(el._t);el._t=setTimeout(()=>{el.hidden=true;},3200);}
function cacheKey(){return USER?"ironcoach:"+USER.id:null;}
function persist(){
  const keys=Object.keys(S.log||{}).sort();while(keys.length>400){delete S.log[keys.shift()];}
  try{if(cacheKey())localStorage.setItem(cacheKey(),JSON.stringify(S));}catch(e){}
  if(!USER)return;
  clearTimeout(saveTimer);setSync("بيحفظ…");
  saveTimer=setTimeout(async()=>{
    try{await Backend.save(USER.id,S);setSync(Backend.remote?"محفوظ على السيرفر ✓":"محفوظ على الجهاز ده ✓");}
    catch(e){setSync(navigator.onLine?"الحفظ فشل — هيحاول تاني":"مفيش نت — اتحفظ على الجهاز وهيترفع لما النت يرجع");}
  },800);
}
window.addEventListener("online",()=>{if(USER)persist();});
function normalize(d){
  const s=Object.assign(emptyState(),d||{});s.profile=Object.assign(emptyState().profile,s.profile||{});
  if(!Array.isArray(s.inbody))s.inbody=[];if(!s.log)s.log={};
  if(!s.plan||!s.plan.days||!s.plan.days.length)s.plan=null;
  delete s.example;delete s.needsPlan;delete s.seeded0921;
  s.settings=Object.assign({restBetween:120,sound:true,vibrate:true,remTime:"19:00",remBefore:30},s.settings||{});
  if(s.session===undefined)s.session=null;
  return s;
}
function ensurePlan(){if(!S.plan)S.plan=buildPlan(S.profile,latestIB(),orderedDays().length);}

/* ---------- helpers ---------- */
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fmt=(n,d)=>n||n===0?(+n).toFixed(d==null?1:d):"—";
const orderedDays=()=>WEEK.filter(d=>(S.profile.weekdays||[]).includes(d));
function dayIndexFor(wd){const o=orderedDays();const i=o.indexOf(wd);return i<0?-1:i%Math.max(1,S.plan.days.length);}
function imgLink(e){return "https://www.google.com/search?tbm=isch&q="+encodeURIComponent(e.en+" exercise");}
function vidLink(e){return "https://www.youtube.com/results?search_query="+encodeURIComponent(e.en+" proper form");}
function noMachineAlt(e){
  if(e.eq==="bodyweight") return null;
  const c=LIB.filter(x=>x.pat===e.pat&&x.eq==="bodyweight");
  if(c.length) return c[0];
  const fp=FALLBACK_PAT[e.pat];return fp?LIB.find(x=>x.pat===fp&&x.eq==="bodyweight"):null;
}
function muscleChips(e){return e.p.map(m=>`<span class="chip hit">${MUSCLES[m]}</span>`).join("")+e.s.map(m=>`<span class="chip hit2">${MUSCLES[m]}</span>`).join("");}

/* ---------- views ---------- */
function vToday(){
  const now=new Date(),wd=now.getDay(),key=today();
  if(selDay==null) selDay=wd;
  const idx=dayIndexFor(selDay),isToday=selDay===wd;
  let strip=`<div class="week">`+WEEK.map(d=>{const i=dayIndexFor(d);const t=i>=0?(S.plan.days[i].short||S.plan.days[i].title):"راحة";
    return `<button class="wd${i>=0?" train":""}${d===wd?" today":""}${d===selDay?" sel":""}" data-wd="${d}"><b>${WNAME[d]}</b><span>${esc(t)}</span></button>`}).join("")+`</div>`;
  let head=`<div class="panel">${!latestIB()?`<div class="banner">البرنامج ده مبني على معلومات عامة. روح لتبويب <b>«بياناتي و InBody»</b> ودخّل أرقامك وهو هيترتب عليها.</div>`:""}${strip}</div>`;
  if(idx<0){
    const o=orderedDays();let next=null;for(let k=1;k<=7;k++){const d=(selDay+k)%7;if(o.includes(d)){next=d;break;}}
    return head+`<div class="panel"><h2>${isToday?"النهارده":WNAME[selDay]}: يوم راحة</h2><p class="muted">الراحة جزء من البرنامج، العضلة بتكبر وانت بترتاح. ممكن تمشي 30 دقيقة أو تعمل إطالات خفيفة.</p>${next!=null?`<p>التمرين الجاي: <b>${WNAME[next]}</b> — ${esc(S.plan.days[dayIndexFor(next)].title)}</p>`:""}</div>`;
  }
  const day=S.plan.days[idx];const L=(S.log[key]&&S.log[key].day===idx)?S.log[key]:{day:idx,done:{}};
  let total=0,done=0;day.items.forEach((it,i)=>{total+=+it.sets||1;done+=Math.min(+it.sets||1,(L.done[i]||0));});
  const pct=total?Math.round(done/total*100):0;
  let html=head+`<div class="panel"><div class="row between"><div><h2>${isToday?"تمرين النهارده":"تمرين "+WNAME[selDay]}: ${esc(day.title)}</h2><div class="muted small">${esc(day.focus)} · ${day.items.length} تمارين</div></div>${isToday?`<div class="num small">${done}/${total} مجموعة · ${pct}%</div>`:""}</div>${isToday?`<div class="progress"><i style="width:${pct}%"></i></div>`:`<div class="muted small">ده عرض لتمرين يوم تاني. تسجيل المجموعات بيشتغل على تمرين النهارده بس.</div>`}</div>`;
  if(isToday)html+=`<div class="panel startpanel">${sessionBanner(isToday,idx)}</div>`;
  html+=day.items.map((it,i)=>exCard(it,i,isToday?L:null,idx)).join("");
  return html;
}
function exCard(it,i,L,dayIdx){
  const e=getEx(it.id);if(!e) return it.id&&it.id.startsWith("x:")&&!XDB?`<article class="ex"><div class="muted small">بيحمّل التمرين…</div></article>`:"";
  const alt=noMachineAlt(e);const n=+it.sets||1;const d=L?(L.done[i]||0):0;
  return `<article class="ex"><div class="exvis">${animHTML(e)}${bodyMap(e.p,e.s,{caption:false})}</div><div class="info">
   <div class="title"><h3>${i+1}. ${esc(e.ar)}</h3>${e.x?"":`<span class="en">${esc(e.en)}</span>`}<span class="chip">${EQ[e.eq]}</span></div>
   <div class="row" style="gap:4px">${muscleChips(e)}</div>
   <div class="presc"><div><small>مجموعات</small><b class="num">${esc(it.sets)}</b></div><div><small>عدّات</small><b class="num">${esc(it.reps)}</b></div><div><small>راحة</small><b class="num">${esc(it.rest)}</b></div></div>
   ${it.note?`<div class="small muted">${esc(it.note)}</div>`:""}
   ${lastHint(it)}
   ${L?`<div class="sets">${Array.from({length:n},(_,k)=>`<button class="set${k<d?" done":""}" data-set="${i}" data-k="${k}" aria-label="مجموعة ${k+1}">${k+1}</button>`).join("")}</div>`:""}
   ${alt?`<div class="alt">بدون جهاز: <b>${esc(alt.ar)}</b></div>`:""}
   <div class="links"><button data-open="${e.id}">طريقة الأداء</button><a href="${imgLink(e)}" target="_blank" rel="noopener">صور التمرين</a><a href="${vidLink(e)}" target="_blank" rel="noopener">فيديو</a><button data-swap="${dayIdx}:${i}">بدّل التمرين</button>${alt?`<button data-swapbw="${dayIdx}:${i}">خليه بدون جهاز</button>`:""}</div>
  </div></article>`;
}
function vPlan(){
  const pr=S.profile,a=analyze(pr,latestIB());
  const wdPick=`<div class="week">`+WEEK.map(d=>`<button class="wd${pr.weekdays.includes(d)?" train sel":""}" data-pickwd="${d}"><b>${WNAME[d]}</b><span>${pr.weekdays.includes(d)?"تمرين":"راحة"}</span></button>`).join("")+`</div>`;
  const o=orderedDays();
  return `<div class="panel"><div class="row between"><h2>أيام الجيم</h2><span class="muted small">${o.length} أيام في الأسبوع</span></div><p class="muted small">دوس على الأيام اللي هتروح فيها الجيم، والبرنامج هيتقسم عليها تلقائي.</p>${wdPick}</div>
  <div class="panel"><div class="row between"><div><h2>برنامجك</h2><div class="muted small">الهدف: <b>${GOALS[S.plan.goal]||GOALS[a.autoGoal]}</b> · ${S.plan.source==="ai"?"مترتب بالذكاء الاصطناعي":"مترتب تلقائي"} · ${esc(S.plan.created||"")}</div></div>
  <div class="row"><button class="btn" id="regen">رتّبه من جديد</button></div></div>
  <div id="aiStatus" class="small muted"></div>
  ${S.plan.summary?`<div class="aiout">${esc(S.plan.summary)}</div>`:""}
  <div class="pgrid">${S.plan.days.map((d,i)=>`<div class="pday"><div class="row between"><h3>${esc(d.title)}</h3><span class="chip">${o.filter((x,k)=>k%S.plan.days.length===i).map(x=>WNAME[x]).join("، ")||"—"}</span></div><div class="muted small">${esc(d.focus)}</div><ol>${d.items.map(it=>{const e=getEx(it.id);return e?`<li><button class="linkbtn" data-open="${e.id}" style="all:unset;cursor:pointer;color:var(--fg)">${esc(e.ar)}</button> <span class="muted num small">${esc(it.sets)}×${esc(it.reps)}</span></li>`:""}).join("")}</ol></div>`).join("")}</div>
  <div class="small"><b>كارديو:</b> ${esc(S.plan.cardio||"")}</div>
  ${S.plan.nutrition?`<div class="small"><b>أكل:</b> ${esc(S.plan.nutrition)}</div>`:""}
  </div>`;
}
let libMuscle=null,libEq="all";
let libSrc="mine",libQ="",libShow=48;
function vLib(){
  const matchM=(p,sx)=>!libMuscle||p.includes(libMuscle)||sx.includes(libMuscle);
  let list,total;
  if(libSrc==="mine"){
    list=LIB.filter(e=>matchM(e.p,e.s)&&(libEq==="all"||e.eq===libEq)).sort((a,b)=>(libMuscle?(b.p.includes(libMuscle)-a.p.includes(libMuscle)):0));total=list.length;
  }else{
    if(!XDB){loadXDB().then(()=>{if(tab==="lib")render();});list=[];total=0;}
    else{const q=libQ.trim().toLowerCase();
      const all=XDB.filter(x=>matchM(x.p,x.s)&&(libEq==="all"||x.q===libEq)&&(!q||x.n.toLowerCase().includes(q)))
        .sort((a,b)=>(libMuscle?(b.p.includes(libMuscle)-a.p.includes(libMuscle)):0));
      total=all.length;list=all.slice(0,libShow).map(x=>getEx("x:"+x.i));}
  }
  const card=e=>`<button class="libcard" data-open="${esc(e.id)}">${frames(e)?`<img class="thumb" src="${frames(e)[0]}" alt="" loading="lazy" decoding="async">`:bodyMap(e.p,e.s,{caption:false})}<div><b${e.x?' dir="ltr"':""}>${esc(e.ar)}</b><span class="muted small">${EQ[e.eq]||""} · ${e.p.map(m=>MUSCLES[m]).join("، ")}</span></div></button>`;
  return `<div class="panel"><div class="seg2 libsrc" role="tablist"><button data-libsrc="mine" aria-selected="${libSrc==="mine"}">تماريني بالعربي (${LIB.length})</button><button data-libsrc="x" aria-selected="${libSrc==="x"}">المكتبة الموسعة (870+)</button></div>
  <div class="libwrap"><div class="field" style="gap:8px"><h3>دوس على العضلة</h3>${bodyMap(libMuscle?[libMuscle]:[],[],{pick:true})}<div class="row" style="justify-content:center">${libMuscle?`<span class="chip hit">${MUSCLES[libMuscle]}</span><button class="btn ghost small" id="clearM">كل العضلات</button>`:`<span class="muted small">كل العضلات</span>`}</div></div>
  <div style="display:flex;flex-direction:column;gap:10px;min-width:0">
   ${libSrc==="x"?`<div class="field"><input id="libQ" type="search" dir="ltr" placeholder="Search: squat, curl, press…" value="${esc(libQ)}" aria-label="دوّر على تمرين"></div>`:""}
   <div class="filters">${[["all","الكل"]].concat(Object.entries(EQ).filter(([k])=>libSrc==="x"||k!=="other")).map(([k,v])=>`<button class="${libEq===k?"on":""}" data-eq="${k}">${v}</button>`).join("")}</div>
   <div class="muted small">${libSrc==="x"&&!XDB?`<span class="spinner"></span> بيحمّل المكتبة…`:total+" تمرين"}${libSrc==="x"?" · الأسماء والشرح بالإنجليزي":""}</div>
   <div class="lib">${list.map(card).join("")}</div>
   ${libSrc==="x"&&XDB&&total>libShow?`<button class="btn" id="libMore">اعرض أكتر (${total-libShow} باقيين)</button>`:""}
   <p class="muted small">صور المكتبة الموسعة من Free Exercise DB (ملكية عامة).</p>
  </div></div></div>`;
}
/* ---------- InBody sheet (same sections as the printed result sheet) ---------- */
const IBF={
 tbw:["إجمالي المية في الجسم","Total Body Water","كجم"],protein:["البروتين","Protein","كجم"],minerals:["المعادن","Minerals","كجم"],
 bfm:["كتلة الدهون","Body Fat Mass","كجم"],weight:["الوزن","Weight","كجم"],smm:["كتلة العضل الهيكلي","Skeletal Muscle Mass","كجم"],
 bmi:["مؤشر كتلة الجسم","BMI","كجم/م²"],pbf:["نسبة الدهون","Percent Body Fat","%"],score:["InBody Score","InBody Score","/100"],
 target_weight:["الوزن المستهدف","Target Weight","كجم"],weight_control:["تحكم الوزن","Weight Control","كجم"],fat_control:["تحكم الدهون","Fat Control","كجم"],muscle_control:["تحكم العضل","Muscle Control","كجم"],
 bmr:["معدل الحرق الأساسي","Basal Metabolic Rate","سعر"],whr:["نسبة الوسط للحوض","Waist-Hip Ratio",""],vfl:["مستوى الدهون الحشوية","Visceral Fat Level",""],
 obesity_deg:["درجة السمنة","Obesity Degree","%"],ffm:["الكتلة الخالية من الدهون","Fat Free Mass","كجم"],bmc:["معادن العظام","Bone Mineral Content","كجم"]
};
const IB_SECTIONS=[
 ["تحليل مكونات الجسم","Body Composition Analysis",["tbw","protein","minerals","bfm","weight"],true],
 ["تحليل العضل والدهون + السمنة","Muscle-Fat & Obesity Analysis",["smm","bmi","pbf"],true],
 ["InBody Score والتحكم في الوزن","Score & Weight Control",["score","target_weight","weight_control","fat_control","muscle_control"],false],
 ["مؤشرات إضافية","Research Parameters",["bmr","whr","vfl","obesity_deg","ffm","bmc"],true]
];
const SEGS=[["la","دراع شمال"],["ra","دراع يمين"],["tr","الجذع"],["ll","رجل شمال"],["rl","رجل يمين"]];
const RANGED=new Set(["tbw","protein","minerals","bfm","weight","smm","bmi","pbf","bmr","whr","vfl","obesity_deg","ffm","bmc"]);
function leanState(p){return p==null?null:p<90?["أقل","warn"]:p<=110?["طبيعي","ok"]:["أعلى","ok"];}
function fatState(p){return p==null?null:p<80?["أقل","ok"]:p<=160?["طبيعي","ok"]:["أعلى","bad"];}
function rangeState(v,r){if(v==null||!r||r[0]==null||r[1]==null)return null;return v<r[0]?["أقل من الطبيعي","warn"]:v>r[1]?["أعلى من الطبيعي","bad"]:["طبيعي","ok"];}
function barRow(k,ib){
  const v=ib[k],r=(ib.ranges||{})[k];if(v==null)return "";
  const lo=r?r[0]:null,hi=r?r[1]:null;
  let min,max;if(k==="pbf"){min=0;max=50;}else if(k==="bmi"){min=10;max=55;}else if(lo!=null){min=lo*0.55;max=hi*1.75;}else{min=0;max=v*1.6;}
  const pos=x=>Math.max(0,Math.min(100,(x-min)/(max-min)*100));
  const s=rangeState(v,r);
  return `<div class="ibbar"><div class="lbl"><b>${IBF[k][0]}</b><span dir="ltr">${IBF[k][1]}</span></div>
   <div class="track">${lo!=null?`<i class="norm" style="inset-inline-start:${pos(lo)}%;width:${pos(hi)-pos(lo)}%"></i>`:""}<i class="fill ${s?s[1]:""}" style="width:${pos(v)}%"></i></div>
   <div class="val"><b class="num">${fmt(v)}</b> <span class="muted small">${IBF[k][2]}</span>${lo!=null?`<div class="muted small num" dir="ltr">${lo}–${hi}</div>`:""}</div></div>`;
}
function segGrid(ib,kind){
  const P=kind==="lean"?ib.seg:ib.segFat,K=kind==="lean"?ib.segKg:ib.segFatKg;if(!P&&!K)return "";
  const cell=(k,label)=>{const p=P&&P[k],kg=K&&K[k],s=kind==="lean"?leanState(p):fatState(p);
    return `<div class="seg ${k}"><small>${label}</small><b class="num">${kg!=null?fmt(kg,2)+" كجم":"—"}</b><span class="num">${p!=null?fmt(p)+"%":""}</span>${s?`<span class="chip ${s[1]}">${s[0]}</span>`:""}</div>`;};
  return `<div class="seggrid" dir="ltr">${SEGS.map(([k,l])=>cell(k,l)).join("")}</div>`;
}
function sheetView(ib){
  const pr=S.profile,E=segEmphasis(ib);
  const research=["bmr","whr","vfl","obesity_deg","ffm","bmc","tbw","protein","minerals"].filter(k=>ib[k]!=null);
  return `<div class="panel sheet">
   <div class="row between"><h2>ورقة InBody <span class="muted small num">${esc(ib.date)}${ib.time?" "+esc(ib.time):""}</span></h2>${ib.device?`<span class="chip">${esc(ib.device)}</span>`:""}</div>
   <div class="row small" style="gap:6px">${ib.idno?`<span class="chip">ID ${esc(ib.idno)}</span>`:""}<span class="chip">الطول ${fmt(ib.height||pr.height,0)} سم</span><span class="chip">السن ${esc(ib.age||pr.age)}</span><span class="chip">${(ib.sex||pr.sex)==="female"?"أنثى":"ذكر"}</span></div>
   <div class="sheetcols"><div class="sheetmain">
    <h3>تحليل العضل والدهون</h3>${["weight","smm","bfm"].map(k=>barRow(k,ib)).join("")}
    <h3>تحليل السمنة</h3>${["bmi","pbf"].map(k=>barRow(k,ib)).join("")}
    ${ib.seg||ib.segKg?`<h3>تحليل العضل في الأجزاء</h3><p class="muted small">النسبة مقارنة بالطبيعي لجسمك (90–110% طبيعي).</p>${segGrid(ib,"lean")}`:""}
    ${ib.segFat||ib.segFatKg?`<h3>تحليل الدهون في الأجزاء</h3><p class="muted small">النسبة مقارنة بالطبيعي (80–160% طبيعي).</p>${segGrid(ib,"fat")}`:""}
   </div><div class="sheetside">
    ${ib.score!=null?`<div class="scorebox"><small>InBody Score</small><b class="num">${ib.score}</b><span class="muted small">/100</span></div>`:""}
    ${ib.target_weight!=null||ib.weight_control!=null?`<div class="kv"><h3>التحكم في الوزن</h3>${["target_weight","weight_control","fat_control","muscle_control"].filter(k=>ib[k]!=null).map(k=>`<div><span>${IBF[k][0]}</span><b class="num" dir="ltr">${fmt(ib[k])} ${k==="target_weight"?"kg":"kg"}</b></div>`).join("")}</div>`:""}
    ${research.length?`<div class="kv"><h3>مؤشرات إضافية</h3>${research.map(k=>{const r=(ib.ranges||{})[k],s=rangeState(ib[k],r);return `<div><span>${IBF[k][0]}</span><b class="num" dir="ltr">${ib[k]}${r?` <span class="muted small">(${r[0]}–${r[1]})</span>`:""}</b>${s&&s[1]!=="ok"?`<span class="chip ${s[1]}">${s[0]}</span>`:""}</div>`;}).join("")}</div>`:""}
   </div></div>
   ${E.weak.length||E.imb.length?`<div class="row" style="gap:6px">${E.weak.map(k=>`<span class="chip warn">${SEGN[k]}: محتاج تركيز في التمرين</span>`).join("")}${E.imb.map(t=>`<span class="chip warn">${t}</span>`).join("")}</div>`:""}
  </div>`;
}
function ibForm(ib){
  ib=ib||{};const R=ib.ranges||{};
  const row=(k)=>`<div class="frow"><label for="f_${k}"><b>${IBF[k][0]}</b><span dir="ltr">${IBF[k][1]}</span></label>
    <div class="fin"><input id="f_${k}" type="number" step="any" inputmode="decimal" value="${ib[k]==null?"":ib[k]}"><span class="unit">${IBF[k][2]}</span></div>
    ${RANGED.has(k)?`<div class="frange" dir="ltr"><input id="r_${k}_lo" type="number" step="any" placeholder="من" aria-label="الطبيعي من" value="${R[k]?R[k][0]:""}"><span>–</span><input id="r_${k}_hi" type="number" step="any" placeholder="إلى" aria-label="الطبيعي إلى" value="${R[k]?R[k][1]:""}"></div>`:"<div></div>"}</div>`;
  const segIn=(pre,kgMap,pctMap)=>`<div class="seggrid" dir="ltr">${SEGS.map(([k,l])=>`<div class="seg ${k}"><small>${l}</small><div class="segin"><input id="${pre}_kg_${k}" type="number" step="any" placeholder="كجم" value="${kgMap&&kgMap[k]!=null?kgMap[k]:""}"><input id="${pre}_pct_${k}" type="number" step="any" placeholder="%" value="${pctMap&&pctMap[k]!=null?pctMap[k]:""}"></div></div>`).join("")}</div>`;
  return `<div class="form">
    <div class="field"><label for="f_idno">ID</label><input id="f_idno" type="text" value="${esc(ib.idno||"")}"></div>
    <div class="field"><label for="f_date">تاريخ القياس</label><input id="f_date" type="date" value="${esc(ib.date||today())}"></div>
    <div class="field"><label for="f_time">الوقت</label><input id="f_time" type="time" value="${esc(ib.time||"")}"></div>
    <div class="field"><label for="f_device">موديل الجهاز</label><input id="f_device" type="text" value="${esc(ib.device||"")}" placeholder="InBody 120"></div>
  </div>
  <p class="muted small">الخانة الأولى للقيمة، والخانتين الصغيرين للمدى الطبيعي اللي بين القوسين في الورقة (اختياري).</p>
  ${IB_SECTIONS.map(([ar,en,keys])=>`<div class="fsec"><h3>${ar} <span class="muted small" dir="ltr">${en}</span></h3>${keys.map(row).join("")}</div>`).join("")}
  <div class="fsec"><h3>تحليل العضل في الأجزاء <span class="muted small" dir="ltr">Segmental Lean Analysis</span></h3><p class="muted small">زي الورقة: الشمال على الشمال واليمين على اليمين. اكتب الكيلو والنسبة.</p>${segIn("sl",ib.segKg,ib.seg)}</div>
  <div class="fsec"><h3>تحليل الدهون في الأجزاء <span class="muted small" dir="ltr">Segmental Fat Analysis</span></h3>${segIn("sf",ib.segFatKg,ib.segFat)}</div>`;
}
function vMe(){
  const pr=S.profile,ib=latestIB(),a=analyze(pr,ib);
  const f=(id,label,v,type,unit)=>`<div class="field"><label for="${id}">${label}</label><input id="${id}" type="${type||"number"}" step="any" value="${v==null?"":esc(v)}">${unit?`<span class="unit">${unit}</span>`:""}</div>`;
  const sel=(id,label,v,opts)=>`<div class="field"><label for="${id}">${label}</label><select id="${id}">${opts.map(([k,t])=>`<option value="${k}"${k===v?" selected":""}>${t}</option>`).join("")}</select></div>`;
  const st=(label,v,unit,state)=>`<div class="stat"><small>${label}</small><span class="v">${v}<span class="small muted"> ${unit||""}</span></span>${state?`<span class="chip ${state[1]}">${state[0]}</span>`:""}</div>`;
  const hist=(S.inbody||[]).slice().reverse();
  const prev=S.inbody&&S.inbody.length>1?S.inbody[S.inbody.length-2]:null;
  const d=(k)=>prev&&ib&&ib[k]!=null&&prev[k]!=null?(ib[k]-prev[k]):null;
  const ds=(k,good)=>{const x=d(k);if(x==null)return "";const c=Math.abs(x)<0.05?"":(x>0)===good?"ok":"bad";return `<span class="chip ${c}" dir="ltr">${x>0?"+":""}${x.toFixed(1)}</span>`;};
  const editing=!ib||S.example||window._ibNew;
  return `${S.example?`<div class="banner">أهلاً! ابدأ بمعلوماتك تحت، وبعدين دخّل أرقام ورقة InBody بتاعتك ودوس «احفظ ورتّب البرنامج». البرنامج الحالي مبني على معلومات عامة لحد ما تدخّل أرقامك.</div>`:""}
  ${ib&&!S.example?sheetView(ib):""}
  ${ib&&!S.example?`<div class="panel"><h2>التحليل والخطة</h2><div class="stats">
    ${st("الهدف المقترح",GOALS[a.autoGoal],"",null)}${st("سعرات تقريبية في اليوم",a.kcal?Math.round(a.kcal/50)*50:"—","سعر",null)}${st("بروتين تقريبي",a.protein?a.protein.join("–"):"—","جم/يوم",null)}
   </div>${prev?`<div class="row small" style="gap:8px">من ${esc(prev.date)}: الوزن ${ds("weight",false)} العضل ${ds("smm",true)} الدهون ${ds("bfm",false)} نسبة الدهون ${ds("pbf",false)}</div>`:""}
   <div class="aiout small">${esc(localSummary(pr,ib,goalOf(pr,ib)))}</div>
   <p class="muted small">الأرقام دي تقديرية للتوجيه بس، مش بديل عن دكتور أو أخصائي تغذية.</p></div>`:""}
  <div class="panel"><h2>معلوماتك</h2><div class="form">
   ${sel("p_sex","النوع",pr.sex,[["male","ذكر"],["female","أنثى"]])}${f("p_age","السن",pr.age,"number","سنة")}${f("p_height","الطول",pr.height,"number","سم")}
   ${sel("p_level","مستواك",pr.level,[["beginner","مبتدئ (أقل من 6 شهور)"],["intermediate","متوسط"],["advanced","متقدم"]])}
   ${sel("p_loc","بتتمرن فين",pr.location,[["gym","جيم كامل"],["home1","البيت ومعايا دمبلز"],["home0","البيت من غير أدوات"]])}
   ${sel("p_goal","هدفك",pr.goal,Object.entries(GOALS))}${f("p_min","وقت التمرين",pr.minutes,"number","دقيقة")}
   <div class="field" style="grid-column:1/-1"><label for="p_inj">إصابات أو حاجات لازم تتجنبها</label><input id="p_inj" type="text" value="${esc(pr.injuries)}" placeholder="مثلاً: وجع في الركبة الشمال"></div>
  </div><div class="row"><button class="btn" id="saveProfile">احفظ معلوماتي</button></div></div>
  <div class="panel"><div class="row between"><h2>${editing?"قراءة InBody":"قراءة جديدة"}</h2>${!editing?`<div class="row"><button class="btn" id="ibEdit">عدّل آخر قراءة</button><button class="btn primary" id="ibNew">ضيف قراءة جديدة</button></div>`:""}</div>
   ${editing||window._ibEdit?`
   ${ibForm(window._ibEdit?ib:(S.example?ib:null))}
   <div class="row"><button class="btn primary" id="saveMe">احفظ ورتّب البرنامج</button><button class="btn ghost" id="ibCancel"${editing&&!window._ibEdit&&!window._ibNew?" hidden":""}>إلغاء</button><span class="small muted" id="meStatus"></span></div>`:`<p class="muted small">آخر قراءة محفوظة فوق. لما تعمل قياس جديد، دوس «ضيف قراءة جديدة» واكتب أرقام الورقة في نفس الأقسام.</p>`}
  </div>
  ${hist.length&&!S.example?`<div class="panel"><h2>سجل القياسات <span class="muted small" dir="ltr">Body Composition History</span></h2><div class="tablewrap"><table><thead><tr><th>التاريخ</th><th>الوزن</th><th>العضل SMM</th><th>الدهون كجم</th><th>الدهون %</th><th>حشوية</th><th>Score</th><th></th></tr></thead><tbody>${hist.map((h,k)=>`<tr><td class="num">${esc(h.date)}</td><td class="num">${fmt(h.weight)}</td><td class="num">${fmt(h.smm)}</td><td class="num">${fmt(h.bfm)}</td><td class="num">${fmt(h.pbf)}</td><td class="num">${h.vfl!=null?fmt(h.vfl,0):"—"}</td><td class="num">${h.score||"—"}</td><td><button class="btn ghost small" data-delib="${S.inbody.length-1-k}">امسح</button></td></tr>`).join("")}</tbody></table></div></div>`:""}`;
}

/* ---------- render & events ---------- */
function render(){
  const v=document.getElementById("view");
  v.innerHTML=tab==="today"?vToday():tab==="plan"?vPlan()+vReminders():tab==="lib"?vLib():tab==="prog"?vProgress():vMe();
  document.querySelectorAll("#tabs button").forEach(b=>b.setAttribute("aria-selected",b.dataset.tab===tab?"true":"false"));
}
document.getElementById("tabs").addEventListener("click",e=>{const b=e.target.closest("button[data-tab]");if(!b)return;tab=b.dataset.tab;render();window.scrollTo({top:0});});
document.getElementById("app").addEventListener("click",e=>{
  const t=e.target.closest("[data-wd],[data-set],[data-open],[data-swap],[data-swapbw],[data-pickwd],[data-eq],[data-m],[data-delib],[data-libsrc],#libMore,#clearM,#regen,#saveMe,#saveProfile,#ibNew,#ibEdit,#ibCancel");
  if(!t) return;
  if(t.dataset.wd!=null){selDay=+t.dataset.wd;render();return;}
  if(t.dataset.set!=null){const key=today(),idx=dayIndexFor(new Date().getDay());if(!S.log[key]||S.log[key].day!==idx) S.log[key]={day:idx,done:{}};
    const i=+t.dataset.set,k=+t.dataset.k,cur=S.log[key].done[i]||0;S.log[key].done[i]=k<cur?k:k+1;persist();render();return;}
  if(t.dataset.open){openEx(t.dataset.open);return;}
  if(t.dataset.swap||t.dataset.swapbw){const [d,i]=(t.dataset.swap||t.dataset.swapbw).split(":").map(Number);const it=S.plan.days[d].items[i],e=getEx(it.id);if(!e)return;
    let next;if(t.dataset.swapbw){next=noMachineAlt(e);}else{const c=LIB.filter(x=>x.pat===e.pat&&allowedEq(S.profile).includes(x.eq));const used=new Set(S.plan.days[d].items.map(x=>x.id));const pool=c.filter(x=>!used.has(x.id));next=pool.length?pool[(pool.findIndex(x=>x.eq===e.eq)+1)%pool.length]:null;}
    if(next){it.id=next.id;persist();render();}return;}
  if(t.dataset.pickwd!=null){const d=+t.dataset.pickwd,w=S.profile.weekdays;const i=w.indexOf(d);if(i>=0){if(w.length>1)w.splice(i,1);}else w.push(d);
    S.plan=buildPlan(S.profile,latestIB(),w.length);persist();render();return;}
  if(t.dataset.eq){libEq=t.dataset.eq;render();return;}
  if(t.dataset.m&&t.closest(".bm.pick")){libMuscle=t.dataset.m;render();return;}
  if(t.dataset.delib!=null){S.inbody.splice(+t.dataset.delib,1);persist();render();return;}
  if(t.dataset.libsrc){libSrc=t.dataset.libsrc;libShow=48;render();return;}
  if(t.id==="libMore"){libShow+=48;render();return;}
  if(t.id==="clearM"){libMuscle=null;render();return;}
  if(t.id==="regen"){S.plan=buildPlan(S.profile,latestIB(),orderedDays().length);persist();render();return;}
  if(t.id==="saveMe"){saveMe();return;}
  if(t.id==="saveProfile"){readProfile();S.plan=buildPlan(S.profile,latestIB(),orderedDays().length);persist();render();return;}
  if(t.id==="ibNew"){window._ibNew=true;window._ibEdit=false;render();return;}
  if(t.id==="ibEdit"){window._ibEdit=true;window._ibNew=false;render();return;}
  if(t.id==="ibCancel"){window._ibNew=window._ibEdit=false;render();return;}
});
function val(id){const el=document.getElementById(id);return el?el.value.trim():"";}
function num(id){const v=val(id);return v===""?null:+v;}
function readProfile(){const pr=S.profile;pr.sex=val("p_sex")||pr.sex;pr.age=num("p_age");pr.height=num("p_height");pr.level=val("p_level")||pr.level;pr.location=val("p_loc")||pr.location;pr.goal=val("p_goal")||pr.goal;pr.minutes=num("p_min");pr.injuries=val("p_inj");}
function saveMe(){
  readProfile();
  const rec={date:val("f_date")||today(),ranges:{}};
  ["time","idno","device"].forEach(k=>{const v=val("f_"+k);if(v)rec[k]=v;});
  Object.keys(IBF).forEach(k=>{const v=num("f_"+k);if(v!=null)rec[k]=v;if(RANGED.has(k)){const lo=num("r_"+k+"_lo"),hi=num("r_"+k+"_hi");if(lo!=null&&hi!=null)rec.ranges[k]=[lo,hi];}});
  const seg=(pre,kind)=>{const o={};let any=false;SEGS.forEach(([k])=>{const v=num(pre+"_"+kind+"_"+k);if(v!=null){o[k]=v;any=true;}});return any?o:null;};
  const sl=seg("sl","pct"),slk=seg("sl","kg"),sf=seg("sf","pct"),sfk=seg("sf","kg");
  if(sl)rec.seg=sl;if(slk)rec.segKg=slk;if(sf)rec.segFat=sf;if(sfk)rec.segFatKg=sfk;
  const st=document.getElementById("meStatus");
  if(!rec.weight){st.textContent="اكتب الوزن على الأقل.";return;}
  if(rec.pbf==null&&rec.bfm!=null)rec.pbf=+(rec.bfm/rec.weight*100).toFixed(1);
  if(rec.bfm==null&&rec.pbf!=null)rec.bfm=+(rec.weight*rec.pbf/100).toFixed(1);
  if(rec.bmi==null&&S.profile.height)rec.bmi=+(rec.weight/Math.pow(S.profile.height/100,2)).toFixed(1);
    const i=S.inbody.findIndex(x=>x.date===rec.date);
  if(i>=0){["impedance"].forEach(k=>{if(S.inbody[i][k]&&!rec[k])rec[k]=S.inbody[i][k];});S.inbody[i]=rec;}else S.inbody.push(rec);
  S.inbody.sort((a,b)=>a.date<b.date?-1:1);
  window._ibNew=window._ibEdit=false;
  S.plan=buildPlan(S.profile,latestIB(),orderedDays().length);
  persist();tab="plan";render();window.scrollTo({top:0});
  toast("اتحفظت القراءة والبرنامج اترتب على أرقامك ✓");
}
function openEx(id){
  const e=getEx(id);if(!e)return;const alt=noMachineAlt(e);
  const same=LIB.filter(x=>x.pat===e.pat&&x.id!==e.id);
  document.getElementById("dlgBody").innerHTML=`<div class="row between"><div><h2>${esc(e.ar)}</h2>${e.x?"":`<div class="en muted small" dir="ltr">${esc(e.en)}</div>`}</div><button class="btn ghost" id="dlgX" aria-label="قفل">✕</button></div>
  ${frames(e)?`<div class="animbig">${animHTML(e,"big")}</div>`:""}
  ${bodyMap(e.p,e.s,{big:true})}${LEGEND}<div class="row" style="gap:4px"><span class="chip">${EQ[e.eq]||""}</span>${e.x&&e.lvl?`<span class="chip">${XLVL[e.lvl]||e.lvl}</span>`:""}${e.x&&e.cat?`<span class="chip">${XCAT[e.cat]||e.cat}</span>`:""}${muscleChips(e)}</div>
  <div><h3>طريقة الأداء</h3>${e.x?`<p class="muted small">الشرح ده من المكتبة الموسعة وهو بالإنجليزي.</p>`:""}<ol class="clean"${e.x?' dir="ltr" style="text-align:left"':""}>${e.steps.map(s=>`<li>${esc(s)}</li>`).join("")}</ol></div>
  ${e.tip?`<div class="banner" style="border-style:solid;border-color:var(--line);background:var(--surface-2)"><b>نصيحة:</b> ${esc(e.tip)}</div>`:""}
  ${S.plan&&S.plan.days.length?`<div class="fsec"><h3>ضيفه لبرنامجك</h3><div class="row"><select id="addDay" class="btn">${S.plan.days.map((d,i)=>`<option value="${i}">${esc(d.title)}</option>`).join("")}</select><button class="btn primary" id="addToDay">ضيف</button><span class="small muted" id="addMsg"></span></div></div>`:""}
  ${alt?`<div class="alt">بديل بدون جهاز: <button style="all:unset;cursor:pointer;color:var(--accent);font-weight:600" data-open="${alt.id}">${esc(alt.ar)}</button></div>`:""}
  ${same.length?`<div class="alt">تمارين بنفس الشغل: ${same.map(x=>`<button style="all:unset;cursor:pointer;color:var(--accent);font-weight:600" data-open="${x.id}">${esc(x.ar)}</button>`).join(" · ")}</div>`:""}
  <div class="links"><a href="${imgLink(e)}" target="_blank" rel="noopener">صور التمرين</a><a href="${vidLink(e)}" target="_blank" rel="noopener">فيديو للأداء الصح</a></div>`;
  const d=document.getElementById("dlg");if(!d.open)d.showModal();
  document.getElementById("dlgX").onclick=()=>d.close();
  const ab=document.getElementById("addToDay");
  if(ab)ab.onclick=()=>{const di=+document.getElementById("addDay").value,day=S.plan.days[di];
    if(day.items.some(x=>x.id===e.id)){document.getElementById("addMsg").textContent="موجود في اليوم ده.";return;}
    day.items.push({id:e.id,sets:3,reps:"10–12",rest:"60–90 ث"});persist();render();document.getElementById("addMsg").textContent="اتضاف لـ «"+day.title+"» ✓";};
}
document.getElementById("dlg").addEventListener("click",e=>{if(e.target.id==="dlg")e.target.close();});
let libQT=null;
document.getElementById("app").addEventListener("input",e=>{if(e.target.id!=="libQ")return;libQ=e.target.value;libShow=48;clearTimeout(libQT);libQT=setTimeout(()=>{render();const el=document.getElementById("libQ");if(el){el.focus();el.setSelectionRange(el.value.length,el.value.length);}},250);});
/* ================= workout session, rest timer, progress, reminders ================= */
function settings(){S.settings=Object.assign({restBetween:120,sound:true,vibrate:true,remTime:"19:00",remBefore:30},S.settings||{});return S.settings;}
function restSec(txt){
  const t=String(txt||"");const nums=(t.match(/\d+(\.\d+)?/g)||[]).map(Number);if(!nums.length)return 90;
  const v=Math.max(...nums);return /د|min/.test(t)?Math.round(v*60):Math.round(v);
}
function repTop(txt){const n=(String(txt||"").match(/\d+/g)||[]).map(Number);return n.length?Math.max(...n):10;}
const mmss=s=>{s=Math.max(0,Math.round(s));return Math.floor(s/60)+":"+String(s%60).padStart(2,"0");};
function dayLog(date){const L=S.log[date]=S.log[date]||{day:null,done:{}};if(!L.done)L.done={};if(!L.sets)L.sets={};return L;}
/* history of one exercise: [{date, sets:[{w,r}]}] oldest first */
function historyFor(id){
  const out=[];Object.keys(S.log||{}).sort().forEach(d=>{const L=S.log[d];if(!L||!L.sets)return;
    Object.values(L.sets).forEach(x=>{if(x&&x.id===id&&x.s&&x.s.length)out.push({date:d,sets:x.s});});});
  return out;
}
const e1rm=(w,r)=>w>0&&r>0?w*(1+r/30):0;
function sessionStats(h){const ws=h.sets.map(s=>+s.w||0);return {max:Math.max(0,...ws),e1:Math.max(0,...h.sets.map(s=>e1rm(+s.w,+s.r))),vol:h.sets.reduce((a,s)=>a+(+s.w||0)*(+s.r||0),0)};}
function lastFor(id,beforeDate){const h=historyFor(id).filter(x=>!beforeDate||x.date<beforeDate);return h.length?h[h.length-1]:null;}
function suggestion(it,last){
  if(!last)return null;const top=repTop(it.reps);const ws=last.sets.map(s=>+s.w||0);const w=Math.max(0,...ws);if(!w)return null;
  const hitAll=last.sets.length>=(+it.sets||1)&&last.sets.every(s=>(+s.r||0)>=top);
  return hitAll?{w:w+2.5,why:"كمّلت كل العدّات المرة اللي فاتت، زوّد الوزن"}:{w,why:"ثبّت الوزن لحد ما تكمّل كل العدّات"};
}
function lastHint(it){
  const last=lastFor(it.id,today());if(!last)return "";
  const best=last.sets.reduce((a,s)=>(+s.w||0)>=(+a.w||0)?s:a,last.sets[0]);const sg=suggestion(it,last);
  return `<div class="lasthint small"><span>آخر مرة (${esc(last.date.slice(5).replace("-","/"))}): <b class="num" dir="ltr">${fmt(best.w,1).replace(/\.0$/,"")} kg × ${best.r}</b></span>${sg?`<span class="muted"> · النهارده: <b class="num" dir="ltr">${String(sg.w).replace(/\.0$/,"")} kg</b></span>`:""}</div>`;
}

/* ---------- sound / vibration / wake lock / notifications ---------- */
let AC=null,wakeLock=null;
function audioInit(){try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();if(AC.state==="suspended")AC.resume();}catch(e){}}
function beep(n){if(!settings().sound||!AC)return;try{for(let k=0;k<(n||3);k++){const o=AC.createOscillator(),g=AC.createGain();o.frequency.value=k===(n||3)-1?1320:880;o.connect(g);g.connect(AC.destination);
  const t=AC.currentTime+k*0.28;g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(0.35,t+0.02);g.gain.exponentialRampToValueAtTime(0.0001,t+0.22);o.start(t);o.stop(t+0.24);}}catch(e){}}
function buzz(p){if(settings().vibrate&&navigator.vibrate)try{navigator.vibrate(p||[250,120,250,120,400]);}catch(e){}}
async function keepAwake(on){try{if(on&&"wakeLock" in navigator&&!wakeLock){wakeLock=await navigator.wakeLock.request("screen");wakeLock.addEventListener("release",()=>{wakeLock=null;});}
  if(!on&&wakeLock){await wakeLock.release();wakeLock=null;}}catch(e){}}
function notify(title,body){try{if(!("Notification" in window)||Notification.permission!=="granted"||!document.hidden)return;
  navigator.serviceWorker&&navigator.serviceWorker.getRegistration().then(r=>{if(r)r.showNotification(title,{body,icon:"icons/icon-192.png",badge:"icons/icon-192.png",tag:"ironcoach-rest",renotify:true,vibrate:[250,120,250]});else new Notification(title,{body});});}catch(e){}}

/* ---------- session ---------- */
function sessDay(){const s=S.session;return s&&S.plan&&S.plan.days[s.day]?S.plan.days[s.day]:null;}
function startSession(){
  audioInit();const idx=dayIndexFor(new Date().getDay());if(idx<0)return;
  const L=dayLog(today());L.day=idx;if(!L.started)L.started=Date.now();
  const day=S.plan.days[idx];let ex=0;while(ex<day.items.length&&(L.done[ex]||0)>=(+day.items[ex].sets||1))ex++;
  if(ex>=day.items.length)ex=0;
  S.session={date:today(),day:idx,ex,phase:"work",restEnd:null,restTotal:0,restKind:null,startedAt:L.started};
  if("Notification" in window&&Notification.permission==="default"){try{Notification.requestPermission();}catch(e){}}
  keepAwake(true);persist();openSession();
}
function curSetNo(){const s=S.session,L=dayLog(s.date);return (L.done[s.ex]||0);}
function prefill(){
  const s=S.session,day=sessDay(),it=day.items[s.ex],L=dayLog(s.date);const cur=(L.sets[s.ex]&&L.sets[s.ex].s)||[];
  if(cur.length)return {w:+cur[cur.length-1].w||0,r:+cur[cur.length-1].r||repTop(it.reps)};
  const last=lastFor(it.id,s.date),sg=suggestion(it,last);
  return {w:sg?sg.w:(last?+last.sets[0].w||0:0),r:repTop(it.reps)};
}
let sessTick=null,wIn=null,rIn=null;
function openSession(){
  const el=document.getElementById("session");el.hidden=false;document.body.classList.add("insession");
  if(S.session&&S.session.phase==="work"){const p=prefill();wIn=p.w;rIn=p.r;}
  drawSession();clearInterval(sessTick);sessTick=setInterval(tickSession,250);
}
function closeSessionView(){const el=document.getElementById("session");el.hidden=true;document.body.classList.remove("insession");clearInterval(sessTick);render();}
function tickSession(){
  const s=S.session;if(!s)return;
  const el=document.getElementById("sessClock");if(el)el.textContent=mmss((Date.now()-s.startedAt)/1000);
  if(s.phase==="rest"){
    const left=(s.restEnd-Date.now())/1000;const t=document.getElementById("restLeft"),ring=document.getElementById("restRing");
    if(t)t.textContent=mmss(Math.ceil(left));if(ring){const C=2*Math.PI*88;ring.style.strokeDashoffset=String(C*(1-Math.max(0,left)/Math.max(1,s.restTotal)));}
    if(left<=3.2&&left>0&&!s._warned){s._warned=true;beep(1);}
    if(left<=0)endRest(true);
  }
}
function endRest(auto){
  const s=S.session;if(!s||s.phase!=="rest")return;
  if(auto){beep(3);buzz();const day=sessDay();const it=day&&day.items[s.ex];notify("الراحة خلصت 💪",it?("يلا: "+(getEx(it.id)||{}).ar+" — المجموعة "+(curSetNo()+1)):"يلا نكمّل");}
  s.phase="work";s.restEnd=null;s._warned=false;const p=prefill();wIn=p.w;rIn=p.r;persist();drawSession();
}
function startRest(sec,kind){const s=S.session;s.phase="rest";s.restTotal=sec;s.restEnd=Date.now()+sec*1000;s.restKind=kind;s._warned=false;persist();drawSession();}
function finishSet(){
  const s=S.session,day=sessDay(),it=day.items[s.ex],L=dayLog(s.date);
  L.sets[s.ex]=L.sets[s.ex]||{id:it.id,s:[]};L.sets[s.ex].id=it.id;L.sets[s.ex].s.push({w:+wIn||0,r:+rIn||0});
  L.done[s.ex]=(L.done[s.ex]||0)+1;
  const n=+it.sets||1;
  if(L.done[s.ex]<n){startRest(restSec(it.rest),"set");return;}
  const next=nextUnfinished(s.ex);
  if(next==null){s.phase="done";persist();drawSession();return;}
  s.ex=next;startRest(settings().restBetween,"ex");
}
function nextUnfinished(from){const day=sessDay(),L=dayLog(S.session.date);for(let k=1;k<=day.items.length;k++){const j=(from+k)%day.items.length;if((L.done[j]||0)<(+day.items[j].sets||1))return j;}return null;}
function finishSession(){
  const s=S.session;if(!s)return;const L=dayLog(s.date);L.finished=Date.now();L.dur=Math.round((L.finished-(L.started||s.startedAt))/1000);
  S.session=null;keepAwake(false);persist();closeSessionView();toast("برافو! التمرين اتسجّل ✓");
}
function sessSummary(){
  const s=S.session,L=dayLog(s.date);let sets=0,vol=0;const prs=[];
  Object.values(L.sets).forEach(x=>{sets+=x.s.length;x.s.forEach(z=>vol+=(+z.w||0)*(+z.r||0));
    const prev=historyFor(x.id).filter(h=>h.date<s.date);const pm=Math.max(0,...prev.map(h=>sessionStats(h).max));const now=Math.max(0,...x.s.map(z=>+z.w||0));
    if(prev.length&&now>pm){const e=getEx(x.id);prs.push((e?e.ar:x.id)+": "+now+" كجم");}});
  return {sets,vol,prs,dur:(Date.now()-(L.started||s.startedAt))/1000};
}
function drawSession(){
  const s=S.session,el=document.getElementById("sessBody");if(!s||!el)return;
  const day=sessDay();if(!day){S.session=null;closeSessionView();return;}
  const L=dayLog(s.date);let total=0,done=0;day.items.forEach((it,i)=>{total+=+it.sets||1;done+=Math.min(+it.sets||1,L.done[i]||0);});
  const top=`<div class="sesstop"><button class="btn ghost" data-wk="min" aria-label="صغّر">⌄</button><div class="sessinfo"><b>${esc(day.title)}</b><span class="num" id="sessClock">${mmss((Date.now()-s.startedAt)/1000)}</span></div><button class="btn ghost" data-wk="end">إنهاء</button></div>
   <div class="progress"><i style="width:${total?Math.round(done/total*100):0}%"></i></div>
   <div class="exdots">${day.items.map((it,i)=>{const n=+it.sets||1,d=L.done[i]||0;return `<button class="exdot${i===s.ex?" on":""}${d>=n?" ok":""}" data-wk="goto" data-i="${i}" aria-label="تمرين ${i+1}">${i+1}</button>`;}).join("")}</div>`;
  if(s.phase==="done"){const sm=sessSummary();
    el.innerHTML=top+`<div class="sessmain"><h2>خلّصت التمرين 🎉</h2><div class="stats">
      <div class="stat"><small>المدة</small><span class="v num">${mmss(sm.dur)}</span></div><div class="stat"><small>المجموعات</small><span class="v num">${sm.sets}</span></div><div class="stat"><small>إجمالي الحِمل</small><span class="v num">${Math.round(sm.vol).toLocaleString("en")}<span class="small muted"> كجم</span></span></div></div>
      ${sm.prs.length?`<div class="banner" style="border-style:solid;border-color:var(--ok)"><b>أرقام جديدة 🏆</b><br>${sm.prs.map(esc).join("<br>")}</div>`:""}
      <button class="btn primary big" data-wk="finish">احفظ وخلّص</button></div>`;return;}
  const it=day.items[s.ex],e=getEx(it.id)||{ar:it.id,p:[],s:[]};const setNo=Math.min(curSetNo()+1,+it.sets||1);
  if(s.phase==="rest"){
    const nxt=getEx(day.items[s.ex].id)||{};const C=2*Math.PI*88;
    el.innerHTML=top+`<div class="sessmain rest"><div class="muted">${s.restKind==="ex"?"راحة بين التمارين":"راحة بين المجموعات"}</div>
      <div class="ringwrap"><svg viewBox="0 0 200 200" class="ring" aria-hidden="true"><circle cx="100" cy="100" r="88" class="rbg"/><circle id="restRing" cx="100" cy="100" r="88" class="rfg" style="stroke-dasharray:${C};stroke-dashoffset:0"/></svg><div class="ringtxt"><b class="num" id="restLeft">${mmss(Math.ceil((s.restEnd-Date.now())/1000))}</b></div></div>
      <div class="row" style="justify-content:center"><button class="btn" data-wk="rest-" >−15 ث</button><button class="btn primary" data-wk="skiprest">ابدأ دلوقتي</button><button class="btn" data-wk="rest+">+15 ث</button></div>
      <div class="nextup">${animHTML(nxt,"small")}<div><small class="muted">${s.restKind==="ex"?"التمرين الجاي":"الجاي"}</small><b>${esc(nxt.ar||"")}</b><span class="muted small">المجموعة ${setNo} من ${+it.sets||1} · <bdi dir="ltr">${esc(it.reps)}</bdi> عدّة</span></div></div></div>`;
    tickSession();return;}
  const cur=(L.sets[s.ex]&&L.sets[s.ex].s)||[];const last=lastFor(it.id,s.date);
  el.innerHTML=top+`<div class="sessmain">
    <div class="sesshead"><h2>${esc(e.ar)}</h2><span class="chip">المجموعة ${setNo} من ${+it.sets||1}</span></div>
    ${animHTML(e,"sess")||bodyMap(e.p,e.s,{caption:false})}
    <div class="target">الهدف: <b class="num"><bdi dir="ltr">${esc(it.reps)}</bdi></b> عدّة · راحة <b class="num">${mmss(restSec(it.rest))}</b>${last?` · آخر مرة: <b class="num" dir="ltr">${last.sets.map(z=>(+z.w||0)+"×"+z.r).join("  ")}</b>`:""}</div>
    <div class="steppers"><div class="stepper"><small>الوزن (كجم)</small><div class="srow"><button class="btn" data-wk="w-">−</button><input id="wIn" type="number" inputmode="decimal" step="0.5" value="${wIn}" dir="ltr"><button class="btn" data-wk="w+">+</button></div></div>
     <div class="stepper"><small>العدّات</small><div class="srow"><button class="btn" data-wk="r-">−</button><input id="rIn" type="number" inputmode="numeric" value="${rIn}" dir="ltr"><button class="btn" data-wk="r+">+</button></div></div></div>
    ${cur.length?`<div class="donesets">${cur.map((z,k)=>`<span class="chip ok" dir="ltr">${k+1}: ${+z.w||0}kg × ${z.r}</span>`).join("")}</div>`:""}
    <button class="btn primary big" data-wk="doneset">✓ خلّصت المجموعة</button>
    <div class="row" style="justify-content:space-between"><button class="btn ghost small" data-wk="skipex">اسكب التمرين ده</button><button class="btn ghost small" data-open="${esc(it.id)}">طريقة الأداء</button></div></div>`;
}
document.addEventListener("click",e=>{
  const b=e.target.closest("[data-wk]");if(!b)return;const a=b.dataset.wk,s=S.session;audioInit();
  if(a==="start"){startSession();return;}
  if(a==="resume"){if(S.session){keepAwake(true);openSession();}return;}
  if(!s)return;
  if(a==="min"){closeSessionView();return;}
  if(a==="end"){if(b.dataset.confirm){s.phase="done";drawSession();}else{b.dataset.confirm="1";b.textContent="متأكد؟ دوس تاني";setTimeout(()=>{if(b.isConnected){b.textContent="إنهاء";delete b.dataset.confirm;}},3000);}return;}
  if(a==="finish"){finishSession();return;}
  if(a==="w-"||a==="w+"){wIn=Math.max(0,Math.round(((+document.getElementById("wIn").value||0)+(a==="w+"?2.5:-2.5))*10)/10);document.getElementById("wIn").value=wIn;return;}
  if(a==="r-"||a==="r+"){rIn=Math.max(0,(+document.getElementById("rIn").value||0)+(a==="r+"?1:-1));document.getElementById("rIn").value=rIn;return;}
  if(a==="doneset"){wIn=+document.getElementById("wIn").value||0;rIn=+document.getElementById("rIn").value||0;finishSet();return;}
  if(a==="skiprest"){endRest(false);return;}
  if(a==="rest+"){s.restEnd+=15000;s.restTotal+=15;persist();tickSession();return;}
  if(a==="rest-"){s.restEnd-=15000;s.restTotal=Math.max(1,s.restTotal-15);persist();tickSession();return;}
  if(a==="skipex"){const n=nextUnfinished(s.ex);if(n==null){s.phase="done";}else{s.ex=n;s.phase="work";const p=prefill();wIn=p.w;rIn=p.r;}persist();drawSession();return;}
  if(a==="goto"){s.ex=+b.dataset.i;s.phase="work";s.restEnd=null;const p=prefill();wIn=p.w;rIn=p.r;persist();drawSession();return;}
});
document.addEventListener("input",e=>{if(e.target.id==="wIn")wIn=+e.target.value||0;if(e.target.id==="rIn")rIn=+e.target.value||0;});
document.addEventListener("visibilitychange",()=>{if(!document.hidden&&S.session&&!document.getElementById("session").hidden){keepAwake(true);tickSession();}});
/* resume an unfinished session from an earlier day: close it quietly */
function sessionResumeCheck(){if(S.session&&S.session.date!==today()){const L=dayLog(S.session.date);if(!L.finished&&L.started)L.finished=L.started;S.session=null;persist();}}
function sessionBanner(isToday,idx){
  if(!isToday)return "";
  if(S.session&&S.session.day===idx)return `<button class="btn primary big" data-wk="resume">▶ كمّل التمرين</button>`;
  const L=S.log[today()];if(L&&L.finished)return `<div class="banner" style="border-style:solid;border-color:var(--ok)">خلّصت تمرين النهارده ✓ ${L.dur?`في ${mmss(L.dur)}`:""}</div><button class="btn big" data-wk="start">ابدأ تاني</button>`;
  return `<button class="btn primary big" data-wk="start">▶ ابدأ التمرين</button><p class="muted small" style="margin:0">هيمشي معاك تمرين تمرين، يسجّل الأوزان، ويعدّ الراحة لوحده.</p>`;
}

/* ---------- progress tab ---------- */
let progEx=null;
function allWorkouts(){return Object.keys(S.log||{}).sort().filter(d=>{const L=S.log[d];return L&&((L.sets&&Object.keys(L.sets).length)||Object.values(L.done||{}).some(n=>n>0));});}
function weekStart(d){const x=new Date(d+"T12:00:00");const back=(x.getDay()+1)%7;x.setDate(x.getDate()-back);return x.toLocaleDateString("en-CA");}
function volOf(d){const L=S.log[d];let v=0;if(L&&L.sets)Object.values(L.sets).forEach(x=>x.s.forEach(z=>v+=(+z.w||0)*(+z.r||0)));return v;}
function lineChart(points,opts){
  // points: [{x:label,y:number,tip:string}] single series; one axis
  opts=opts||{};const W=400,H=opts.h||190,P={l:42,r:10,t:12,b:24};
  if(points.length<1)return `<div class="muted small chartempty">${opts.empty||"مفيش بيانات لسه"}</div>`;
  const ys=points.map(p=>p.y);let lo=Math.min(...ys),hi=Math.max(...ys);if(lo===hi){lo-=1;hi+=1;}const pad=(hi-lo)*0.12;lo-=pad;hi+=pad;if(opts.zero)lo=0;const fmtT=v=>(hi-lo)>=20?Math.round(v).toLocaleString("en"):String(Math.round(v*10)/10);
  const X=i=>P.l+(points.length===1?(W-P.l-P.r)/2:i*(W-P.l-P.r)/(points.length-1)),Y=v=>P.t+(H-P.t-P.b)*(1-(v-lo)/(hi-lo));
  const ticks=4;let grid="";for(let k=0;k<=ticks;k++){const v=lo+(hi-lo)*k/ticks,y=Y(v);grid+=`<line x1="${P.l}" x2="${W-P.r}" y1="${y}" y2="${y}" class="cg"/><text x="${P.l-6}" y="${y+4}" class="ct" text-anchor="end">${fmtT(v)}</text>`;}
  const step=Math.max(1,Math.ceil(points.length/6));let xl="";points.forEach((p,i)=>{if(i%step===0||i===points.length-1)xl+=`<text x="${X(i)}" y="${H-8}" class="ct" text-anchor="middle">${esc(p.x)}</text>`;});
  const path=points.map((p,i)=>(i?"L":"M")+X(i).toFixed(1)+" "+Y(p.y).toFixed(1)).join(" ");
  const area=path+` L${X(points.length-1).toFixed(1)} ${H-P.b} L${X(0).toFixed(1)} ${H-P.b} Z`;
  const dots=points.map((p,i)=>`<circle cx="${X(i)}" cy="${Y(p.y)}" r="${i===points.length-1?5:3}" class="cd${i===points.length-1?" last":""}"/><rect x="${X(i)-Math.max(10,(W-P.l-P.r)/points.length/2)}" y="${P.t}" width="${Math.max(20,(W-P.l-P.r)/points.length)}" height="${H-P.t-P.b}" class="hit" data-tip="${esc(p.tip||p.x+": "+p.y)}" data-tx="${X(i)}" data-ty="${Y(p.y)}"/>`).join("");
  return `<div class="chart"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(opts.label||"")}" preserveAspectRatio="none">${grid}${xl}<path d="${area}" class="ca"/><path d="${path}" class="cl"/>${dots}<line class="cx" x1="0" x2="0" y1="${P.t}" y2="${H-P.b}" hidden/></svg><div class="ctip" hidden></div></div>`;
}
document.addEventListener("pointermove",chartHover);document.addEventListener("pointerdown",chartHover);
function chartHover(e){const r=e.target.closest&&e.target.closest(".chart .hit");document.querySelectorAll(".chart").forEach(c=>{if(!r||!c.contains(r)){const t=c.querySelector(".ctip");if(t)t.hidden=true;const l=c.querySelector(".cx");if(l)l.setAttribute("hidden","");}});
  if(!r)return;const c=r.closest(".chart"),svg=c.querySelector("svg"),t=c.querySelector(".ctip"),l=c.querySelector(".cx");const vb=svg.viewBox.baseVal,bb=svg.getBoundingClientRect(),cb=c.getBoundingClientRect();
  const x=+r.dataset.tx*bb.width/vb.width+bb.left-cb.left,y=+r.dataset.ty*bb.height/vb.height+bb.top-cb.top;t.textContent=r.dataset.tip;t.hidden=false;
  t.style.left=Math.min(Math.max(0,x-70),cb.width-140)+"px";t.style.top=Math.max(0,y-44)+"px";l.setAttribute("x1",r.dataset.tx);l.setAttribute("x2",r.dataset.tx);l.removeAttribute("hidden");}
function vProgress(){
  const W=allWorkouts(),wk=weekStart(today());const thisWeek=W.filter(d=>weekStart(d)===wk);
  let streak=0;{let w=new Date(wk+"T12:00:00");for(let k=0;k<52;k++){const ws=w.toLocaleDateString("en-CA");if(W.some(d=>weekStart(d)===ws))streak++;else if(k>0)break;w.setDate(w.getDate()-7);}}
  const exIds=[...new Set(W.flatMap(d=>Object.values(S.log[d].sets||{}).filter(x=>x.s.some(z=>+z.w>0)).map(x=>x.id)))];
  if(!progEx||!exIds.includes(progEx))progEx=exIds[0]||null;
  const hist=progEx?historyFor(progEx):[];
  const pts=hist.map(h=>{const st=sessionStats(h);return {x:h.date.slice(5).replace("-","/"),y:st.max,tip:`${h.date.slice(5).replace("-","/")}: أقصى وزن ${st.max} كجم · أقصى تقديري ${Math.round(st.e1)} كجم`};});
  const weeks=[];{let w=new Date(wk+"T12:00:00");for(let k=7;k>=0;k--){const x=new Date(w);x.setDate(x.getDate()-7*k);const ws=x.toLocaleDateString("en-CA");weeks.push({x:ws.slice(5).replace("-","/"),y:Math.round(W.filter(d=>weekStart(d)===ws).reduce((a,d)=>a+volOf(d),0))});}}
  weeks.forEach(p=>p.tip=`أسبوع ${p.x}: ${p.y.toLocaleString("en")} كجم`);
  const ib=(S.inbody||[]).filter(r=>r.weight);
  const body=(k,label,unit)=>{const p=ib.filter(r=>r[k]!=null).map(r=>({x:r.date.slice(5).replace("-","/"),y:+r[k],tip:`${r.date}: ${r[k]} ${unit}`}));return `<div class="minichart"><h3>${label}</h3>${lineChart(p,{h:150,label,empty:"ضيف قياسات InBody"})}</div>`;};
  const recent=W.slice(-8).reverse();
  return `<div class="panel"><h2>التقدّم</h2><div class="stats">
    <div class="stat"><small>تمارين الأسبوع ده</small><span class="v num">${thisWeek.length}<span class="small muted"> / ${orderedDays().length}</span></span></div>
    <div class="stat"><small>أسابيع ورا بعض</small><span class="v num">${streak}</span></div>
    <div class="stat"><small>حِمل الأسبوع</small><span class="v num">${Math.round(thisWeek.reduce((a,d)=>a+volOf(d),0)).toLocaleString("en")}<span class="small muted"> كجم</span></span></div>
    <div class="stat"><small>كل التمارين</small><span class="v num">${W.length}</span></div></div></div>
   <div class="panel"><div class="row between"><h2>تقدّمك في تمرين</h2>${exIds.length?`<select id="progEx" class="btn">${exIds.map(id=>`<option value="${esc(id)}"${id===progEx?" selected":""}>${esc((getEx(id)||{ar:id}).ar)}</option>`).join("")}</select>`:""}</div>
    ${exIds.length?`<p class="muted small">أقصى وزن رفعته في كل مرة. دوس على أي نقطة تشوف التفاصيل.</p>${lineChart(pts,{label:"أقصى وزن"})}
    <div class="tablewrap"><table><thead><tr><th>التاريخ</th><th>المجموعات</th><th>أقصى وزن</th><th>أقصى تقديري (1RM)</th></tr></thead><tbody>${hist.slice(-8).reverse().map(h=>{const st=sessionStats(h);return `<tr><td class="num">${esc(h.date)}</td><td class="num" dir="ltr">${h.sets.map(z=>(+z.w||0)+"×"+z.r).join("  ")}</td><td class="num">${st.max}</td><td class="num">${Math.round(st.e1)}</td></tr>`;}).join("")}</tbody></table></div>`
    :`<div class="banner">لسه مفيش أوزان متسجّلة. دوس «ابدأ التمرين» في «تمرين النهارده» وسجّل الوزن والعدّات في كل مجموعة، وهتلاقي تقدّمك هنا.</div>`}</div>
   <div class="panel"><h2>الحِمل الأسبوعي</h2><p class="muted small">مجموع (الوزن × العدّات) في آخر 8 أسابيع.</p>${lineChart(weeks,{label:"الحمل الأسبوعي",zero:true})}</div>
   <div class="panel"><h2>جسمك من InBody</h2><div class="minis">${body("weight","الوزن (كجم)","كجم")}${body("smm","العضل SMM (كجم)","كجم")}${body("pbf","نسبة الدهون %","%")}</div></div>
   ${recent.length?`<div class="panel"><h2>آخر التمارين</h2><div class="tablewrap"><table><thead><tr><th>التاريخ</th><th>اليوم</th><th>مجموعات</th><th>حِمل</th><th>المدة</th></tr></thead><tbody>${recent.map(d=>{const L=S.log[d];const t=S.plan&&S.plan.days[L.day]?S.plan.days[L.day].title:"—";const n=Object.values(L.done||{}).reduce((a,b)=>a+b,0);return `<tr><td class="num">${esc(d)}</td><td>${esc(t)}</td><td class="num">${n}</td><td class="num">${Math.round(volOf(d)).toLocaleString("en")}</td><td class="num">${L.dur?mmss(L.dur):"—"}</td></tr>`;}).join("")}</tbody></table></div></div>`:""}`;
}
document.addEventListener("change",e=>{if(e.target.id==="progEx"){progEx=e.target.value;render();}});

/* ---------- reminders (phone calendar alarms) ---------- */
const ICSDAY={0:"SU",1:"MO",2:"TU",3:"WE",4:"TH",5:"FR",6:"SA"};
function nextDate(wd,time){const d=new Date();const [h,m]=time.split(":").map(Number);for(let k=0;k<8;k++){const x=new Date(d);x.setDate(d.getDate()+k);x.setHours(h,m,0,0);if(x.getDay()===wd&&x>d)return x;}return d;}
const icsT=d=>d.getFullYear()+String(d.getMonth()+1).padStart(2,"0")+String(d.getDate()).padStart(2,"0")+"T"+String(d.getHours()).padStart(2,"0")+String(d.getMinutes()).padStart(2,"0")+"00";
function buildICS(){
  const st=settings(),o=orderedDays(),mins=+S.profile.minutes||60;const now=new Date();const L=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//IronCoach//AR","CALSCALE:GREGORIAN","METHOD:PUBLISH"];
  o.forEach((wd,k)=>{const d=S.plan.days[k%S.plan.days.length];const s=nextDate(wd,st.remTime),e=new Date(s.getTime()+mins*60000);
    L.push("BEGIN:VEVENT","UID:ironcoach-"+ICSDAY[wd]+"-"+(USER?USER.username:"me")+"@ironcoach","DTSTAMP:"+icsT(now),"DTSTART:"+icsT(s),"DTEND:"+icsT(e),"RRULE:FREQ=WEEKLY;BYDAY="+ICSDAY[wd],
      "SUMMARY:🏋️ تمرين: "+d.title,"DESCRIPTION:"+d.focus+" — افتح كوتش الحديد ودوس ابدأ التمرين","BEGIN:VALARM","ACTION:DISPLAY","DESCRIPTION:ميعاد التمرين","TRIGGER:-PT"+(+st.remBefore||0)+"M","END:VALARM","END:VEVENT");});
  L.push("END:VCALENDAR");return L.join("\r\n");
}
function googleCalURL(){
  const st=settings(),o=orderedDays();if(!o.length)return "#";const s=nextDate(o[0],st.remTime),e=new Date(s.getTime()+(+S.profile.minutes||60)*60000);
  const q=new URLSearchParams({action:"TEMPLATE",text:"🏋️ تمرين — كوتش الحديد",details:"افتح كوتش الحديد ودوس «ابدأ التمرين»",dates:icsT(s)+"/"+icsT(e),ctz:Intl.DateTimeFormat().resolvedOptions().timeZone||"Africa/Cairo",recur:"RRULE:FREQ=WEEKLY;BYDAY="+o.map(d=>ICSDAY[d]).join(",")});
  return "https://calendar.google.com/calendar/render?"+q.toString();
}
function vReminders(){
  const st=settings(),o=orderedDays();const perm="Notification" in window?Notification.permission:"unsupported";
  return `<div class="panel"><h2>مواعيد التمرين والمنبّه</h2>
   <div class="form"><div class="field"><label for="remTime">ميعاد التمرين</label><input id="remTime" type="time" value="${esc(st.remTime)}"></div>
    <div class="field"><label for="remBefore">نبّهني قبلها</label><select id="remBefore">${[0,10,15,30,45,60,90].map(m=>`<option value="${m}"${+st.remBefore===m?" selected":""}>${m?m+" دقيقة":"في الميعاد"}</option>`).join("")}</select></div>
    <div class="field"><label for="restBetween">راحة بين التمارين</label><select id="restBetween">${[60,90,120,150,180,240].map(s=>`<option value="${s}"${+st.restBetween===s?" selected":""}>${mmss(s)} دقيقة</option>`).join("")}</select></div></div>
   <p class="small">الأيام: <b>${o.map(d=>WNAME[d]).join("، ")||"—"}</b> الساعة <b class="num">${esc(st.remTime)}</b></p>
   <div class="row"><button class="btn primary" data-rem="ics">ضيف المنبّه للموبايل (ملف تقويم)</button><a class="btn" href="${googleCalURL()}" target="_blank" rel="noopener">ضيف على (Google Calendar)</a></div>
   <p class="muted small">المنبّه بيتضاف لتقويم الموبايل نفسه، فبيرن حتى لو التطبيق مقفول. آيفون: افتح الملف ودوس «Add All». أندرويد: افتحه بتطبيق التقويم، أو استخدم زرار (Google Calendar). لو غيّرت الأيام أو الميعاد، امسح الأحداث القديمة من التقويم وضيف الجديدة.</p>
   <div class="fsec"><h3>أثناء التمرين</h3><div class="row"><label class="row small" style="gap:6px"><input type="checkbox" id="setSound"${st.sound?" checked":""}> صوت لما الراحة تخلص</label><label class="row small" style="gap:6px"><input type="checkbox" id="setVib"${st.vibrate?" checked":""}> اهتزاز</label>
   ${perm==="default"?`<button class="btn small" data-rem="perm">فعّل الإشعارات</button>`:perm==="granted"?`<span class="chip ok">الإشعارات شغالة</span>`:perm==="denied"?`<span class="chip warn">الإشعارات مقفولة من إعدادات المتصفح</span>`:""}</div>
   <p class="muted small">الشاشة بتفضل منوّرة طول ما التمرين شغال، والعداد بيرن ويهز لما الراحة تخلص.</p></div></div>`;
}
document.addEventListener("change",e=>{const id=e.target.id,st=settings();
  if(id==="remTime"){st.remTime=e.target.value||"19:00";persist();render();}
  if(id==="remBefore"){st.remBefore=+e.target.value;persist();}
  if(id==="restBetween"){st.restBetween=+e.target.value;persist();}
  if(id==="setSound"){st.sound=e.target.checked;persist();if(st.sound){audioInit();beep(1);}}
  if(id==="setVib"){st.vibrate=e.target.checked;persist();if(st.vibrate)buzz([150]);}
});
document.addEventListener("click",e=>{const b=e.target.closest("[data-rem]");if(!b)return;
  if(b.dataset.rem==="perm"){try{Notification.requestPermission().then(()=>render());}catch(err){}return;}
  if(b.dataset.rem==="ics"){const blob=new Blob([buildICS()],{type:"text/calendar"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="ironcoach-mawa3eed.ics";document.body.appendChild(a);a.click();a.remove();toast("اتنزّل ملف المواعيد — افتحه وضيفه للتقويم");}
});

/* ---------- accounts & storage ---------- */
const CFG=window.IRONCOACH_CONFIG||{};
const USERNAME_RE=/^[a-z0-9_.]{3,20}$/;
const AUTH_ERR={
  invalid_login:"اسم المستخدم أو الباسورد غلط.",
  taken:"اسم المستخدم ده متاخد، جرّب اسم تاني.",
  weak:"الباسورد لازم يبقى 6 حروف أو أرقام على الأقل.",
  bad_username:"اسم المستخدم من 3 لـ 20 حرف إنجليزي صغير أو أرقام أو _ أو نقطة، من غير مسافات.",
  mismatch:"الباسوردين مش زي بعض.",
  confirm_required:"السيرفر طالب تأكيد بالإيميل. اقفل «Confirm email» من إعدادات Supabase (الخطوة 3 في الدليل).",
  network:"مفيش اتصال بالسيرفر. اتأكد من النت وجرّب تاني.",
  unknown:"حصلت مشكلة، جرّب تاني."
};
function mapAuthError(e){
  const m=String((e&&(e.message||e.code))||"").toLowerCase();
  if(e&&AUTH_ERR[e.code])return e.code;
  if(m.includes("invalid login")||m.includes("invalid_credentials"))return "invalid_login";
  if(m.includes("already")||m.includes("registered")||m.includes("exists"))return "taken";
  if(m.includes("password")&&(m.includes("6")||m.includes("weak")||m.includes("short")))return "weak";
  if(m.includes("confirm"))return "confirm_required";
  if(m.includes("fetch")||m.includes("network"))return "network";
  return "unknown";
}
const toEmail=u=>u+"@"+(CFG.emailDomain||"users.ironcoach.app");

function supabaseBackend(){
  const sb=window.supabase.createClient(CFG.supabaseUrl,CFG.supabaseAnonKey,{auth:{persistSession:true,autoRefreshToken:true,storageKey:"ironcoach-auth"}});
  const who=u=>u?{id:u.id,username:(u.user_metadata&&u.user_metadata.username)||String(u.email||"").split("@")[0]}:null;
  return {remote:true,
    async current(){const {data}=await sb.auth.getSession();return who(data.session&&data.session.user);},
    async signUp(u,p){const {data,error}=await sb.auth.signUp({email:toEmail(u),password:p,options:{data:{username:u}}});
      if(error)throw error;if(!data.session)throw {code:"confirm_required"};
      if(data.user&&Array.isArray(data.user.identities)&&data.user.identities.length===0)throw {code:"taken"};
      return who(data.user);},
    async signIn(u,p){const {data,error}=await sb.auth.signInWithPassword({email:toEmail(u),password:p});if(error)throw error;return who(data.user);},
    async signOut(){await sb.auth.signOut();},
    async changePassword(p){const {error}=await sb.auth.updateUser({password:p});if(error)throw error;},
    async load(id){const {data,error}=await sb.from("app_state").select("data").eq("user_id",id).maybeSingle();if(error)throw error;return data?data.data:null;},
    async save(id,d){const {error}=await sb.from("app_state").upsert({user_id:id,data:d,updated_at:new Date().toISOString()});if(error)throw error;}
  };
}
/* Demo mode: accounts live only in this browser (used until Supabase is configured). */
function localBackend(){
  const K="ironcoach-local-users",SK="ironcoach-local-session";
  const users=()=>{try{return JSON.parse(localStorage.getItem(K)||"{}");}catch(e){return {};}};
  const hash=async(p,salt)=>{const enc=new TextEncoder();const key=await crypto.subtle.importKey("raw",enc.encode(p),"PBKDF2",false,["deriveBits"]);
    const bits=await crypto.subtle.deriveBits({name:"PBKDF2",salt:enc.encode(salt),iterations:120000,hash:"SHA-256"},key,256);
    return Array.from(new Uint8Array(bits)).map(b=>b.toString(16).padStart(2,"0")).join("");};
  return {remote:false,
    async current(){try{const s=JSON.parse(localStorage.getItem(SK)||"null");return s&&users()[s.username]?s:null;}catch(e){return null;}},
    async signUp(u,p){const all=users();if(all[u])throw {code:"taken"};const salt=crypto.getRandomValues(new Uint32Array(4)).join("-");
      all[u]={id:"local-"+u,salt,hash:await hash(p,salt)};localStorage.setItem(K,JSON.stringify(all));const s={id:all[u].id,username:u};localStorage.setItem(SK,JSON.stringify(s));return s;},
    async signIn(u,p){const r=users()[u];if(!r||r.hash!==await hash(p,r.salt))throw {code:"invalid_login"};const s={id:r.id,username:u};localStorage.setItem(SK,JSON.stringify(s));return s;},
    async signOut(){localStorage.removeItem(SK);},
    async changePassword(p){const s=await this.current();const all=users();const salt=crypto.getRandomValues(new Uint32Array(4)).join("-");all[s.username].salt=salt;all[s.username].hash=await hash(p,salt);localStorage.setItem(K,JSON.stringify(all));},
    async load(id){try{return JSON.parse(localStorage.getItem("ironcoach-data:"+id)||"null");}catch(e){return null;}},
    async save(id,d){localStorage.setItem("ironcoach-data:"+id,JSON.stringify(d));}
  };
}
const Backend=(CFG.supabaseUrl&&CFG.supabaseAnonKey&&window.supabase)?supabaseBackend():localBackend();

function authView(mode){
  return `<div class="authcard"><div class="brandbig"><div class="plate">20</div><h1>كوتش الحديد</h1><p class="muted">برنامج الجيم بتاعك على أرقام InBody</p></div>
  <div class="seg2" role="tablist"><button data-auth="login" aria-selected="${mode==="login"}">دخول</button><button data-auth="register" aria-selected="${mode==="register"}">حساب جديد</button></div>
  <form id="authForm" class="authform" autocomplete="on" novalidate>
   <div class="field"><label for="a_user">اسم المستخدم (Username)</label><input id="a_user" name="username" autocomplete="username" autocapitalize="none" autocorrect="off" spellcheck="false" dir="ltr" required></div>
   <div class="field"><label for="a_pass">الباسورد</label><input id="a_pass" name="password" type="password" autocomplete="${mode==="login"?"current-password":"new-password"}" dir="ltr" required></div>
   ${mode==="register"?`<div class="field"><label for="a_pass2">اكتب الباسورد تاني</label><input id="a_pass2" type="password" autocomplete="new-password" dir="ltr" required></div><p class="muted small">اسم المستخدم: حروف إنجليزي صغيرة وأرقام و _ أو نقطة. احفظ الباسورد كويس، مفيش استرجاع بالإيميل.</p>`:""}
   <button class="btn primary big" type="submit" id="authGo">${mode==="login"?"ادخل":"اعمل الحساب"}</button>
   <div class="small" id="authMsg" role="alert"></div>
  </form>
  ${Backend.remote?"":`<div class="banner small">وضع تجريبي: الحسابات والبيانات محفوظة على الجهاز ده بس لحد ما السيرفر يتوصّل.</div>`}</div>`;
}
let authMode="login";
function showAuth(){document.getElementById("shell").hidden=true;const a=document.getElementById("auth");a.hidden=false;a.innerHTML=authView(authMode);}
document.getElementById("auth").addEventListener("click",e=>{const b=e.target.closest("[data-auth]");if(b){authMode=b.dataset.auth;showAuth();}});
document.getElementById("auth").addEventListener("submit",async e=>{
  e.preventDefault();const msg=document.getElementById("authMsg"),go=document.getElementById("authGo");
  const u=document.getElementById("a_user").value.trim().toLowerCase(),p=document.getElementById("a_pass").value;
  const fail=c=>{msg.textContent=AUTH_ERR[c]||AUTH_ERR.unknown;msg.style.color="var(--bad)";};
  if(!USERNAME_RE.test(u))return fail("bad_username");
  if(p.length<6)return fail("weak");
  if(authMode==="register"&&p!==document.getElementById("a_pass2").value)return fail("mismatch");
  go.disabled=true;msg.style.color="";msg.innerHTML=`<span class="spinner"></span> لحظة…`;
  try{const who=authMode==="login"?await Backend.signIn(u,p):await Backend.signUp(u,p);await enterApp(who,authMode==="register");}
  catch(err){fail(mapAuthError(err));go.disabled=false;}
});
async function enterApp(who,isNew){
  USER=who;S=emptyState();
  let d=null;
  try{d=await Backend.load(who.id);}catch(e){try{d=JSON.parse(localStorage.getItem(cacheKey())||"null");}catch(_){}setSync("مفيش نت — بيعرض آخر نسخة على الجهاز");}
  S=normalize(d);ensurePlan();sessionResumeCheck();
  document.getElementById("auth").hidden=true;document.getElementById("shell").hidden=false;
  document.getElementById("who").textContent=who.username;
  tab=isNew||!latestIB()?"me":"today";render();
  loadXDB().then(()=>{if(JSON.stringify(S.plan||{}).includes('"x:'))render();});
  if(isNew){persist();toast("أهلاً "+who.username+"! ابدأ بمعلوماتك وأرقام InBody.");}
  else setSync(Backend.remote?"محفوظ على السيرفر ✓":"محفوظ على الجهاز ده ✓");
}
/* account dialog */
function openAccount(){
  document.getElementById("dlgBody").innerHTML=`<div class="row between"><h2>الحساب</h2><button class="btn ghost" id="dlgX" aria-label="قفل">✕</button></div>
  <p>اسم المستخدم: <b dir="ltr">${esc(USER.username)}</b></p>
  <form id="pwForm" class="authform"><h3>غيّر الباسورد</h3><div class="field"><label for="n_pass">الباسورد الجديد</label><input id="n_pass" type="password" autocomplete="new-password" dir="ltr"></div>
   <div class="field"><label for="n_pass2">اكتبه تاني</label><input id="n_pass2" type="password" autocomplete="new-password" dir="ltr"></div>
   <button class="btn" type="submit">غيّر الباسورد</button><div class="small" id="pwMsg"></div></form>
  <div class="fsec"><h3>بياناتك</h3><p class="muted small">خد نسخة من كل بياناتك في ملف، أو رجّع نسخة قديمة.</p>
   <div class="row"><button class="btn" id="expBtn">نزّل نسخة (JSON)</button><label class="btn" for="impFile">رجّع نسخة</label><input id="impFile" type="file" accept="application/json,.json" class="vh"></div><div class="small" id="impMsg"></div></div>
  <div class="fsec"><button class="btn" id="logoutBtn">خروج</button></div>`;
  const d=document.getElementById("dlg");if(!d.open)d.showModal();
  document.getElementById("dlgX").onclick=()=>d.close();
  document.getElementById("pwForm").onsubmit=async e=>{e.preventDefault();const m=document.getElementById("pwMsg"),p=document.getElementById("n_pass").value;
    if(p.length<6){m.textContent=AUTH_ERR.weak;return;}if(p!==document.getElementById("n_pass2").value){m.textContent=AUTH_ERR.mismatch;return;}
    try{await Backend.changePassword(p);m.textContent="الباسورد اتغيّر ✓";}catch(err){m.textContent=AUTH_ERR[mapAuthError(err)];}};
  document.getElementById("expBtn").onclick=()=>{const b=new Blob([JSON.stringify(S,null,1)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="ironcoach-"+USER.username+"-"+today()+".json";document.body.appendChild(a);a.click();a.remove();};
  document.getElementById("impFile").onchange=async e=>{const m=document.getElementById("impMsg");const f=e.target.files[0];if(!f)return;
    try{const d=JSON.parse(await f.text());if(!d||typeof d!=="object"||!d.profile)throw 0;S=normalize(d);ensurePlan();persist();render();m.textContent="البيانات رجعت ✓ ("+S.inbody.length+" قياس)";}
    catch(err){m.textContent="الملف ده مش نسخة من كوتش الحديد.";}};
  document.getElementById("logoutBtn").onclick=async()=>{await Backend.signOut();clearTimeout(saveTimer);clearInterval(sessTick);document.getElementById("session").hidden=true;document.body.classList.remove("insession");keepAwake(false);USER=null;S=emptyState();d.close();authMode="login";showAuth();};
}
document.getElementById("acctBtn").addEventListener("click",openAccount);

/* boot */
(async()=>{
  let who=null;try{who=await Backend.current();}catch(e){}
  if(who)await enterApp(who,false);else showAuth();
})();
if("serviceWorker" in navigator&&location.protocol!=="file:"){navigator.serviceWorker.register("/sw.js",{scope:"/"}).catch(()=>{});}

})();
