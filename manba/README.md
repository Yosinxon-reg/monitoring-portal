# Monitoring bo'limi portali — manba kodi

Sayt — repozitoriy ildizidagi `index.html` va `lib-supabase.js`. Bu papkada ularning manbasi:

* `index.html`, `js/`, `css/` — portal kodi
* `python build.py` — `deploy/index.html` + `deploy/lib-supabase.js` ni yig'adi; ularni repozitoriy ildiziga yuklang.

Ma'lumotlar bazasi o'zgarishlari (`supabase/*.sql`) xodimlarning shaxsiy ma'lumotlarini o'z ichiga olgani uchun bu ochiq repozitoriyga joylanmaydi —
ular kompyuterdagi `metodikresurs/supabase` papkasida va Supabase loyihasining o'zida saqlanadi.
