# كوتش الحديد — تطبيق (PWA)

تطبيق ويب بيتثبّت على أندرويد وآيفون، وكل مستخدم له اسم مستخدم وباسورد وبياناته لوحده.

## الملفات
- `index.html` و`style.css` و`app.js`: التطبيق.
- `config.js`: بيانات السيرفر (Supabase). لو فاضية، التطبيق بيشتغل «وضع تجريبي» على الجهاز بس.
- `manifest.webmanifest` و`sw.js` و`icons/`: عشان التطبيق يتثبّت ويشتغل من غير نت.
- `supabase/schema.sql`: جداول السيرفر وصلاحياتها.
- `vendor/supabase.js`: مكتبة Supabase.

## التشغيل
1. اعمل مشروع على supabase.com (اختار منطقة Frankfurt).
2. SQL Editor ← الصق `supabase/schema.sql` ← Run.
3. Authentication ← Sign In / Providers ← Email ← اقفل «Confirm email» واحفظ.
4. Project Settings ← API Keys: انسخ Project URL والمفتاح anon (publishable) وحطهم في `config.js`.
5. ارفع الفولدر ده كله على Netlify Drop (app.netlify.com/drop) أو أي استضافة ملفات ثابتة بـ HTTPS.
6. على الموبايل: أندرويد (Chrome ← القائمة ← Install app) — آيفون (Safari ← Share ← Add to Home Screen).

## ملاحظات
- المفتاح anon معمول عشان يبقى في التطبيق؛ الحماية من صلاحيات الجداول (RLS): كل مستخدم يشوف بياناته بس.
- مفيش استرجاع باسورد بالإيميل (الأسماء مش إيميلات). لو حد نسي الباسورد: Supabase ← Authentication ← Users ← اختار المستخدم ← Reset/Update password.
- مع كل تحديث للملفات غيّر `VERSION` في `sw.js` عشان الموبايلات تاخد النسخة الجديدة.
- المرحلة الجاية: نفس الكود يتغلّف بـ (Capacitor) ويترفع على Google Play وApp Store.
