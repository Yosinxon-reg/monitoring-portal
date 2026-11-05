// =============================================================
// O'rganish bo'limi darslari.
// Yangi imkoniyat qo'shilganda shu ro'yxatga yangi dars qo'shing:
// "added" sanasi yangi bo'lsa, foydalanuvchilarga "Yangi" bo'lib chiqadi.
// roles — darsni kimlar ko'radi; pages — qaysi sahifada "Yordam" tugmasi shu darsni ochadi.
// =============================================================
window.LESSONS = [
  // ---------------- Hamma xodim va CEO uchun ----------------
  { id: "kirish", title: "Portalga kirish", group: "Boshlash", roles: ["xodim", "ceo"], added: "2026-10-24", pages: ["bosh"],
    desc: "Havolani ochish, login va parol bilan kirish.",
    parts: [
      { img: "oqish/x01-kirish-tab.jpg", phone: true, steps: ["<b>\"Rahbar yoki xodim\"</b> so'zini bosing. \"O'qituvchi\" bo'limi o'qituvchilar uchun."] },
      { img: "oqish/x02-login.jpg", phone: true, steps: ["Telefon raqamingizni yozing (masalan: 90 123 45 67).", "Parolni yozing.", "<b>\"Kirish\"</b> tugmasini bosing."] }
    ],
    tip: "Havolani telefoningizning bosh ekraniga qo'yib oling: brauzer menyusidan \"Bosh ekranga qo'shish\" ni bosing." },
  { id: "bosh", title: "Bosh sahifa va menyu", group: "Boshlash", roles: ["xodim", "ceo"], added: "2026-10-24", pages: ["bosh"],
    desc: "Bosh sahifada nima bor, menyudan bo'limlarni qanday topasiz.",
    parts: [
      { img: "oqish/x03-bosh.jpg", phone: true, steps: ["<b>Ko'k yozuv</b> — ish boshlanishida bugungi rejangizni eslatadi.", "<b>Menyu tugmasi</b> (uchta chiziq) — barcha bo'limlar shu yerda."] },
      { img: "oqish/x04-menyu.jpg", phone: true, steps: ["<b>Kunlik baholarim</b> — rahbar yozgan hisobot va bahongiz.", "<b>Topshiriqlarim</b> — sizga berilgan ishlar.", "<b>Eslatmalar</b> — bo'limingizga yuborilgan umumiy topshiriqlar.", "<b>Masalalar</b> — muammo va takliflar."] }
    ],
    tip: "Menyudagi oq doiradagi raqam — nechta yangi ish borligini ko'rsatadi. Kompyuterda menyu chap tomonda doim ochiq turadi." },
  { id: "reja-baho", title: "Bugungi reja va baholarim", group: "Har kungi ish", roles: ["xodim"], added: "2026-10-25", pages: ["bosh", "hisobotlar", "reja"],
    desc: "Rahbaringiz yozgan kunlik rejani, eslatmalarni va bahongizni qayerdan ko'rasiz.",
    parts: [
      { img: "oqish/x11-reja-bosh.jpg", phone: true, steps: ["<b>Ko'k yozuv</b> — ish boshlanishida bugungi rejangiz shu yerda chiqadi.", "<b>Joriy darajangiz</b> va 2 haftalik o'rtacha bahongiz.", "<b>📌 Rahbaringizdan eslatma</b> — rahbar sizga yozgan topshiriq yoki eslatma.", "<b>Bugungi rejangiz</b> va butun hafta rejasi."] },
      { img: "oqish/x12-baholarim.jpg", phone: true, steps: ["Menyudan <b>\"Kunlik baholarim\"</b> ni oching.", "Hozirgi darajangiz: A'lo (9+), Yaxshi (7.5+), O'rtacha (6+), Past.", "Har kungi hisobot: rahbar nima yozgani va qo'ygan bahosi (1–10)."] }
    ],
    tip: "Kunlik hisobotni endi o'zingiz yozmaysiz — uni rahbaringiz yozadi va baholaydi. Siz faqat ko'rasiz. Har 2 haftada o'rtacha baho chiqadi." },
  { id: "topshiriq", title: "Topshiriqni bajarish", group: "Har kungi ish", roles: ["xodim", "ceo"], added: "2026-10-24", pages: ["topshiriqlar"],
    desc: "Sizga berilgan topshiriqni bajarildi deb belgilash va natija yozish.",
    parts: [
      { img: "oqish/x06-topshiriq.jpg", phone: true, steps: ["Topshiriqni oching va ish tugagach <b>\"Bajarildi deb belgilash\"</b>ni bosing."] },
      { img: "oqish/x06b-natija.jpg", phone: true, steps: ["Qisqacha nima qilganingizni yozing.", "<b>\"Yuborish\"</b>ni bosing — topshiriq CEO tekshiruviga boradi."] }
    ],
    tip: "Muddati o'tgan topshiriq qizil \"kechikdi\" belgisi bilan chiqadi va statistikada \"bajarilmadi\" hisoblanadi." },
  { id: "eslatma", title: "Eslatmaga \"Bajardim\" deyish", group: "Har kungi ish", roles: ["xodim", "ceo"], added: "2026-10-24", pages: ["eslatmalar"],
    desc: "Bo'limga yuborilgan eslatma-topshiriqni bajarganingizni belgilash.",
    parts: [{ img: "oqish/x07-eslatma.jpg", phone: true, steps: ["Qisqa izoh yozing (ixtiyoriy).", "<b>\"Bajardim\"</b>ni bosing. Keyin CEO tasdiqlaydi — faqat tasdiqlangani KPI'ga qo'shiladi."] }] },
  { id: "masala", title: "Masala va taklif yozish", group: "Har kungi ish", roles: ["xodim", "ceo"], added: "2026-10-24", pages: ["masalalar"],
    desc: "Ichki-tashqi muammolar, takliflar va eslatmalarni yozish.",
    parts: [
      { img: "oqish/x08-masala.jpg", phone: true, steps: ["Bo'limni tanlang (ichki muammo, taklif va h.k.).", "Muammoni aniq yozing: qayer, nima, qachon.", "<b>\"Yuborish\"</b>ni bosing."] },
      { img: "oqish/c10-masalalar.jpg", steps: ["Chapda bo'limlar — raqam ochiq masalalar soni.", "<b>\"+ Yangi masala\"</b> tugmasi."] }
    ],
    tip: "Masalani hamma xodim va CEO ko'radi, ostiga izoh yozadi. Holat: Ochiq → Jarayonda → Hal qilindi." },
  { id: "parol", title: "Parolni almashtirish", group: "Boshlash", roles: ["xodim", "ceo"], added: "2026-10-24", pages: ["profil"],
    desc: "Birinchi kirishda o'z parolingizni qo'ying.",
    parts: [{ img: "oqish/x09-parol.jpg", phone: true, steps: ["Yangi parol (kamida 6 belgi).", "Yangi parolni yana bir marta yozing.", "<b>\"Parolni yangilash\"</b>ni bosing."] }],
    tip: "Parolni unutsangiz — monitoring bo'limi rahbariga ayting, u tiklab beradi." },
  { id: "kpi-korish", title: "KPI natijamni ko'rish", group: "Natijalar", roles: ["xodim"], added: "2026-10-24", pages: ["kpi", "statistika"],
    desc: "Kunlik, haftalik, bosqich va yillik natijalaringiz.",
    parts: [{ img: "oqish/x10-kpi.jpg", phone: true, steps: ["Ko'rinishni tanlang: Kunlik, Haftalik, 2 haftalik (bosqich), Yillik. Rahbaringiz har kuni ball qo'yadi; haftalik va 2 haftalik ball shundan o'zi chiqadi.", "Jadvalda har bir mezon bo'yicha ballaringiz. «avto» belgili mezon (Akademikda «Reja», Intizomiyda «Ochiqlik») kunlik bahodan avtomatik hisoblanadi.", "Pastdagi <b>Ball kartam</b> — har bir mezon bo'yicha ball, foizdagi taqsimot va rahbaringiz yozgan izoh (💬)."] }],
    tip: "Har 2 haftada eng yaxshi natijalar taqdirlanadi. \"Statistika\"da qancha topshiriq bajarilgan/bajarilmaganini ko'rasiz." },

  // ---------------- CEO uchun ----------------
  { id: "ceo-bosh", title: "Jamoa holati (bosh sahifa)", group: "CEO: jamoani boshqarish", roles: ["ceo", "asoschi"], added: "2026-10-24", pages: ["bosh", "xodimlar"],
    desc: "Kim hisobot topshirdi, nima kechikdi — bir qarashda.",
    parts: [{ img: "oqish/c01-bosh.jpg", steps: ["Umumiy raqamlar: bugun hisobot yozilganlar, o'rtacha baho, muddati o'tganlar.", "<b>Jamoam holati</b> — har bir xodimning bugungi bahosi, oxirgi faolligi va topshiriqlari.", "<b>Hisoboti yozilmaganlar</b> — ustiga bosib darhol yozasiz."] }] },
  { id: "topshiriq-berish", title: "Topshiriq berish (kimga, qachongacha)", group: "CEO: jamoani boshqarish", roles: ["ceo", "asoschi"], added: "2026-10-24", pages: ["topshiriqlar", "eslatmalar"],
    desc: "Bir yoki bir nechta xodimga muddat bilan topshiriq yuborish.",
    parts: [
      { img: "oqish/c02-topshiriq-berish.jpg", steps: ["Topshiriq nomi.", "<b>Kimga</b>: \"Hammaga\", butun bo'lim yoki alohida xodimlar.", "<b>Qachongacha</b>: Bugun, Ertaga, 2 kundan keyin, 1 haftaga.", "Yoki kun, oy, yil va soatni o'zingiz tanlang."] },
      { img: "oqish/c02b-yuborish.jpg", steps: [null, null, null, null, "<b>\"Yuborish\"</b> — har bir xodimga alohida boradi."] }
    ],
    tip: "Umumiy eslatma uchun \"Eslatmalar\" → \"+ Yangi eslatma\" — oynasi xuddi shunday." },
  { id: "qabul", title: "Bajarilgan topshiriqni qabul qilish", group: "CEO: jamoani boshqarish", roles: ["ceo", "asoschi"], added: "2026-10-24", pages: ["topshiriqlar"],
    desc: "Xodim natijasini qabul qilish yoki qaytarish.",
    parts: [{ img: "oqish/c06-qabul.jpg", steps: ["<b>\"Qabul qilish\"</b> — ish to'g'ri bajarilgan.", "<b>\"Qaytarish\"</b> — izohda nima yetishmayotganini yozing."] }] },
  { id: "hisobot-yozish", title: "Xodimga kunlik hisobot yozish va baholash", group: "CEO: jamoani boshqarish", roles: ["ceo", "asoschi"], added: "2026-10-25", pages: ["hisobotlar", "bosh"],
    desc: "Har kuni har bir xodimning bajargan ishini yozish, 1–10 ball qo'yish va eslatma qoldirish.",
    parts: [
      { img: "oqish/c11-hisobotlar.jpg", steps: ["Menyudan <b>\"Hisobotlar va baholar\"</b>.", "Sana (bugun avtomatik tanlangan).", "Qizil chiziqli karta — hali yozilmagan. Yashil — yozilgan, o'ngda baho.", "<b>\"Hisobot yozish va baholash\"</b> tugmasi."] },
      { img: "oqish/c12-hisobot-yozish.jpg", steps: ["Tepada — shu kungi reja (solishtirish uchun).", "<b>Bugun bajargan ishlari</b> — xodim nima qildi.", "<b>Baho</b>: 1 dan 10 gacha bittasini bosing.", "<b>📌 Xodimga eslatma</b> — xodim bosh sahifasida alohida ko'radi.", "<b>Ertangi reja</b> — o'zgartirsangiz, haftalik reja ham yangilanadi.", "<b>\"Saqlash\"</b>."] }
    ],
    tip: "Ish tugashiga 1 soat qolganda portal yozilmagan xodimlar sonini eslatadi. CEO'ning hisoboti va bahosini asoschi yozadi; CEO o'z baholarini \"Mening baholarim\" bo'limida ko'radi." },
  { id: "eslatma-tasdiq", title: "Eslatmalarni tasdiqlash", group: "CEO: jamoani boshqarish", roles: ["ceo", "asoschi"], added: "2026-10-24", pages: ["eslatmalar"],
    desc: "Har bir xodim eslatmani bajarganini tasdiqlash.",
    parts: [{ img: "oqish/c05-eslatma-tasdiq.jpg", steps: ["<b>\"✓ Bajarildi\"</b> — KPI \"Reja\" baliga qo'shiladi.", "<b>\"✗ Yo'q\"</b> — statistikada \"bajarilmadi\"."] }] },
  { id: "reja-kunlik", title: "Haftalik rejani kunlarga bo'lib yozish", group: "CEO: jamoani boshqarish", roles: ["ceo", "asoschi"], added: "2026-10-25", pages: ["reja", "xodimlar"],
    desc: "Har bir xodimga Dushanbadan Shanbagacha kunlik reja yozish. Xodimga har kuni ish boshida eslatiladi.",
    parts: [
      { img: "oqish/c13-reja.jpg", steps: ["Haftani tanlang (joriy yoki keyingi hafta).", "Har bir xodim va kun uchun katakka vazifani yozing.", "Boshqa joyga bosing — o'zi saqlanadi (katak yashil bo'ladi)."] },
      { img: "oqish/c14-profil-reja.jpg", steps: ["\"Jamoam\" da xodim ustiga bosing — profili ochiladi.", "Oxirgi faollik — xodim portalga qachon kirgani.", "Joriy bosqich bahosi va darajasi.", "Shu yerdan ham kunlik rejani yozib, <b>\"Rejani saqlash\"</b>ni bosing."] }
    ],
    tip: "Xodim bir kun ko'p yoki kam bajarsa, kunlik hisobot oynasidagi \"Ertangi reja\" ni o'zgartiring — ertangi reja avtomatik yangilanadi." },
  { id: "kpi-kunlik", title: "KPI ballarini har kuni qo'yish", group: "CEO: jamoani boshqarish", roles: ["ceo", "asoschi"], added: "2026-10-25", pages: ["kpi"],
    desc: "Kunlik ball qo'yiladi — haftalik va 2 haftalik natija o'zi shakllanadi.",
    parts: [{ img: "oqish/c08-kpi.jpg", steps: ["<b>KPI va reyting → Kunlik</b>. Sanani tanlang (bugun avtomatik).", "Har bir xodim va mezon katagiga ball yozing. «avto» belgili ustun (Akademikda «Reja», Intizomiyda «Ochiqlik») kunlik hisobotdagi bahodan o'zi qo'yiladi (baho/10 × max) — kerak bo'lsa o'zgartiring.", "Ball yonidagi <b>+</b> — shu ballga izoh (💬 — izoh bor). Xodim ismiga bossangiz — ball kartasi.", "<b>Haftalik</b> va <b>2 haftalik</b> — kunlik ballarning o'rtachasi kulrang bo'lib chiqadi. Katakka yozsangiz, o'zgartirasiz; o'chirsangiz, avtomatikka qaytadi."] }],
    tip: "Kunlik ballarni hisobot oynasida ham qo'yish mumkin: \"Hisobotlar va baholar\" → \"Hisobot yozish va baholash\" → \"Bugungi KPI ballari\". Ballni faqat siz va ball egasi ko'radi. CEO'ni asoschi baholaydi." },
  { id: "rahbar-hisobot", title: "Rahbarga kunlik hisobot", group: "CEO: jamoani boshqarish", roles: ["ceo", "asoschi"], added: "2026-10-27", pages: ["rahbar-hisobot"],
    desc: "Har kuni ish oxirida bo'lim bo'yicha hisobot — Monitoring bo'limi rahbariga avtomatik yetib boradi.",
    parts: [
      { steps: ["Menyudan <b>Rahbarga hisobot</b> ni oching. Bo'limingizdagi barcha xodimlar (o'zingiz ham) avtomatik chiqadi.", "<b>Akademik:</b> har bir xodim necha soat dars ko'rganini aniq yozing — yuqorida bugungi jami soat o'zi hisoblanadi. «Qisqacha ma'lumot» ixtiyoriy.", "<b>Intizomiy:</b> filial nomini bosing → nechta post yuborildi → har bir post qaysi masala bo'yicha → kim kuzatdi va qay darajada (A'lo / Yaxshi / O'rtacha / Past).", "Kelmagan xodim uchun <b>«Bugun kelmadi»</b> tugmasini bosing va sababini yozing (majburiy).", "Oxirida <b>«Siz bugun nimalar qildingiz?»</b> ni to'ldirib, <b>Hisobotni yuborish</b> ni bosing."] },
      { steps: ["<b>Jamlanma</b> — kunlik, haftalik, 2 haftalik, oylik va yillik natijalar.", "Xodim ismini bossangiz — u bo'yicha kunma-kun ma'lumot chiqadi."] }
    ],
    tip: "Hisobotni yuborgandan keyin ham shu kun ichida o'zgartirib, qayta saqlashingiz mumkin." },
  { id: "masalalar-birlashgan", title: "Masalalar: topshiriq, eslatma va kim ko'rgani", group: "Har kungi ish", roles: ["xodim", "ceo", "asoschi"], added: "2026-10-27", pages: ["masalalar"],
    desc: "Topshiriqlar, eslatmalar va masalalar endi bitta «Masalalar» bo'limida. Kim ko'rgani ko'rinib turadi.",
    parts: [
      { steps: ["Menyudan <b>Masalalar</b> ni oching. Chap tomonda birinchi qator — <b>Topshiriqlar va eslatmalar</b>, pastda masalalar bo'limlari.", "Sizga yangi topshiriq yoki eslatma kelsa — menyuda qizil raqam va sahifa tepasida 📬 yozuv chiqadi. Yangilari ko'k chiziq va «Yangi» belgisi bilan ajralib turadi.", "Topshiriq yoki eslatmani <b>ochishingiz bilan</b> u «ko'rildi» bo'ladi — yuborgan rahbar qachon ko'rganingizni ko'radi.", "Rahbar uchun: ro'yxatda «👁 7/9 ko'rdi», ichida esa har bir xodim ko'rgan vaqt yoki «Ko'rmagan» yozuvi chiqadi. Masalalar ichida «👁 N kishi ko'rdi» ni bossangiz — kimlar ko'rgani."] }
    ],
    tip: "Brauzerda 🔔 eslatmalarni yoqsangiz, yangi topshiriq kelganda telefon/kompyuteringizga xabar ham chiqadi." },
  { id: "oz-hisobot", title: "Kunlik hisobotni o'zim yozaman", group: "Har kungi ish", roles: ["xodim", "ceo"], added: "2026-10-27", pages: ["hisobotlar"],
    desc: "Endi kunlik hisobotni xodimning o'zi yozadi, bo'lim rahbari izoh qoldirib baholaydi.",
    parts: [
      { steps: ["Ish tugashidan <b>30 daqiqa oldin</b> portal eslatadi: menyuda <b>Kunlik hisobotim</b> ni oching.", "<b>Akademik bo'lim:</b> har bir baholangan dars uchun qator: o'qituvchining I/F, fan, filial, intizomiy ball, akademik ball, sana. Pastda kunlik ishlar bo'yicha izoh (ixtiyoriy).", "<b>Intizomiy bo'lim:</b> qaysi filialni kuzatganingizni tanlang, mavzular bo'yicha nechta post yuborganingizni yozing, rahbariyat nechtasiga javob berganini va qanday ishlaganini belgilang, oxirida ish kuni haqida izoh.", "<b>Hisobotni yuborish</b> ni bosing. Rahbaringiz baholaguncha o'zgartirishingiz mumkin."] },
      { steps: ["<b>Bo'lim rahbari:</b> «Hisobotlar va baholar» da xodim kartasidagi <b>Ko'rish va baholash</b> ni bosing.", "Hisobotni o'qing, izoh yozing va 1–10 baho qo'ying — baho KPI'ga avtomatik o'tadi."] }
    ],
    tip: "Baholangan hisobotda rahbaringiz izohi chiqadi: «Kunlik hisobotim → Hisobotlarim va baholarim»." },
  { id: "statistika", title: "Statistika", group: "Natijalar", roles: ["ceo", "asoschi"], added: "2026-10-24", pages: ["statistika"],
    desc: "Topshiriqlar bajarildi / bajarilmadi — bo'lim va xodim kesimida.",
    parts: [{ img: "oqish/c09-statistika.jpg", steps: ["Davrni tanlang.", "Umumiy: bajarildi, tekshiruvda, jarayonda, bajarilmadi.", "Xodim qatoriga bosing — bajarilmagan topshiriqlari."] }] },
  // ---------------- 2026-11-05 yangiliklari ----------------
  { id: "yangi-menyu", title: "Yangi menyu va «Bugungi ishlarim»", group: "Boshlash", roles: ["xodim", "ceo", "asoschi"], added: "2026-11-05", pages: ["bosh"],
    desc: "Bir xil ishlar endi bitta bo'limda — menyu qisqardi.",
    parts: [
      { steps: ["<b>Bosh sahifa</b> tepasida <b>✅ Bugungi ishlarim</b>: hisobot yozildimi, nechta topshiriq bor, kimdan so'rov keldi. Qatorni bossangiz — kerakli joy ochiladi.", "Bir nechta ogohlantirish bo'lsa, ular bitta qatorga yig'iladi: <b>«▾ Menga kelganlar … yana N ta»</b> ni bosib hammasini ko'rasiz."] },
      { steps: ["<b>Hisobot va reyting</b> — kunlik hisobot, rahbarga hisobot, <b>Haftalik reja</b>, KPI va reytinglar (tepadagi tablar).", "<b>Ustozlar</b> — Ustozlarim, Oylik reja, (rahbarlarga) Barcha ustozlar va reyting.", "<b>Tahlil</b> — Statistika, Intizomiy tahlil, Filiallar.", "<b>Profil va yordam</b> — Profilim, O'rganish, Portal haqida."] },
      { steps: ["Bir sahifada bir nechta yuklab olish (Excel, PDF) bo'lsa — bitta <b>⬇ Yuklab olish ▾</b> tugmasi, bosganda format tanlanadi.", "Topshiriq va so'rovlar endi <b>darhol</b> ko'rinadi — sahifani yangilash shart emas."] }
    ],
    tip: "Telefonda ham shunday: menyu tugmasini bosing, tepadagi tablar yon tomonga suriladi." },
  { id: "ustozlarim", title: "Ustozlarim: ketgan va yangi ustoz", group: "Ish", roles: ["xodim", "ceo"], added: "2026-11-05", pages: ["yordam", "hisobotlar"],
    desc: "O'z ustozlaringiz ro'yxati; ishdan ketgan yoki yangi kelgan ustozni CEO tasdig'i bilan kiritish.",
    parts: [
      { steps: ["Menyudan <b>Ustozlar → Ustozlarim</b>. Ustozlaringiz filial bo'yicha: fani, sinfi, shu oyda necha marta ko'rilgani.", "Ustoz ishdan ketgan bo'lsa — qatoridagi <b>🚪 Ketdi</b>. O'rniga kelgan bo'lsa ismini yozasiz, kelmagan bo'lsa — izoh.", "Ro'yxatda yo'q yangi ustoz — <b>➕ Yangi ustoz</b>: ism, filial, fan."] },
      { steps: ["So'rov <b>CEO tasdiqlagach</b> bazaga kiradi. Natija «Ustoz so'rovlari» tabida va Telegram'da chiqadi.", "Hisobotda bazada yo'q ismni yozib bo'lmaydi — avval so'rov yuboring.", "So'rov yuborgach, <b>CEOga og'zaki ham ayting</b>."] }
    ],
    tip: "Boshqa xodimdan ustozlaringizni ko'rib berishni so'rash — shu sahifadagi <b>🤝 Yordam so'rash</b>." }
];
