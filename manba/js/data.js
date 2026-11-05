// =============================================================
// Ma'lumotlar qatlami: DEMO (brauzer xotirasi) yoki SUPABASE
// Ikkalasi ham bir xil funksiyalarni beradi.
// =============================================================
(function () {
  const cfg = window.PORTAL_CONFIG || {};
  const today = () => localDate(new Date());
  function localDate(d) {
    const z = n => String(n).padStart(2, "0");
    return d.getFullYear() + "-" + z(d.getMonth() + 1) + "-" + z(d.getDate());
  }
  function addDays(n) { const d = new Date(); d.setDate(d.getDate() + n); return localDate(d); }
  window.dateUtil = { today, addDays, localDate };

  // Telefon raqam bilan kirish: 90 123 45 67 -> 998901234567@xodim.registon.uz
  const LOGIN_DOMAIN = "xodim.registon.uz";
  function phoneDigits(v) {
    let d = String(v || "").replace(/\D/g, "");
    if (d.length === 9) d = "998" + d;
    return d;
  }
  function loginToEmail(v) {
    v = String(v || "").trim();
    if (v.includes("@")) return v.toLowerCase();
    return phoneDigits(v) + "@" + LOGIN_DOMAIN;
  }
  const pwFromBirth = iso => { const [y, m, d] = String(iso || "").split("-"); return d && m && y ? d + m + y : ""; };
  window.loginUtil = { phoneDigits, loginToEmail, pwFromBirth, LOGIN_DOMAIN };

  // ---------------------------------------------------------------- DEMO
  function DemoDB() {
    const KEY = "monitoring_portal_demo_v1";
    let mem = null;
    const load = () => {
      if (mem) return mem;
      try { const s = localStorage.getItem(KEY); if (s) mem = JSON.parse(s); } catch (e) {}
      if (!mem) mem = seed();
      return mem;
    };
    const save = () => { try { localStorage.setItem(KEY, JSON.stringify(mem)); } catch (e) {} };
    let meId = null;
    try { meId = localStorage.getItem(KEY + "_me"); } catch (e) {}

    function seed() {
      const P = (id, full_name, email, role, ceo_id) =>
        ({ id, full_name, email, role, ceo_id: ceo_id || null, phone: "", active: true, password: "1234" });
      const profiles = [
        P("u-asoschi", "Yosinxon Ahmadxonov", "asoschi@demo.uz", "asoschi"),
        { ...P("u-ceo1", "Dilnoza Karimova", "ceo1@demo.uz", "ceo"), bolim: "intizomiy" },
        { ...P("u-ceo2", "Javohir Rahimov", "ceo2@demo.uz", "ceo"), bolim: "akademik" },
        P("u-ceo3", "Malika Tursunova", "ceo3@demo.uz", "ceo"),
        P("u-x1", "Aziz Qodirov", "xodim1@demo.uz", "xodim", "u-ceo1"),
        P("u-x2", "Nodira Saidova", "xodim2@demo.uz", "xodim", "u-ceo1"),
        P("u-x3", "Bekzod Ergashev", "xodim3@demo.uz", "xodim", "u-ceo2"),
        P("u-x4", "Gulnoza Aliyeva", "xodim4@demo.uz", "xodim", "u-ceo2"),
        P("u-x5", "Sardor Yusupov", "xodim5@demo.uz", "xodim", "u-ceo3"),
        P("u-x6", "Madina Xolmatova", "xodim6@demo.uz", "xodim", "u-ceo3"),
        P("u-r1", "Shavkat Nazarov", "rahbar@demo.uz", "rahbar"),
        P("u-o1", "Feruza Abdullayeva", "oqituvchi@demo.uz", "oqituvchi")
      ];
      let tid = 1;
      const T = (title, category, assigned_to, created_by, due, status, priority, description) => ({
        id: tid++, title, category, assigned_to, created_by, due_date: addDays(due), status,
        priority: priority || "oddiy", description: description || "", result_note: "", review_note: "",
        created_at: new Date().toISOString(), updated_at: new Date().toISOString()
      });
      const tasks = [
        T("7-A sinfda matematika darsini kuzatish", "dars_kuzatuvi", "u-x1", "u-ceo1", 1, "yangi", "yuqori", "Kuzatuv varaqasi bo'yicha baholang, o'qituvchi bilan suhbat o'tkazing."),
        T("Ona tili o'qituvchilari dars ishlanmalarini tahlil qilish", "hujjat_tahlili", "u-x2", "u-ceo1", 3, "jarayonda"),
        T("O'quvchilar o'rtasida so'rovnoma o'tkazish (8-sinflar)", "sorovnoma", "u-x3", "u-ceo2", -1, "jarayonda", "yuqori"),
        T("Yosh o'qituvchilarga baholash mezonlari bo'yicha yordam", "uslubiy_yordam", "u-x4", "u-ceo2", 5, "yangi"),
        T("5-sinflar ingliz tili darslarini kuzatish", "dars_kuzatuvi", "u-x5", "u-ceo3", 2, "bajarildi"),
        T("Oylik monitoring natijalarini jamlash", "hujjat_tahlili", "u-ceo1", "u-asoschi", 6, "yangi", "yuqori"),
        T("Jamoa uchun haftalik reja tuzish", "boshqa", "u-ceo3", "u-asoschi", 0, "jarayonda")
      ];
      let rid = 1;
      const reports = [];
      ["u-x1", "u-x2", "u-x3", "u-x5", "u-ceo1"].forEach((a, i) => {
        for (let d = 1; d <= 3; d++) reports.push({
          id: rid++, author_id: a, report_date: addDays(-d),
          done: "Ikki ta dars kuzatildi, kuzatuv varaqalari to'ldirildi.",
          problems: d === 2 ? "Bir o'qituvchi dars ishlanmasini taqdim etmadi." : "",
          plan: "Kuzatuv natijalari bo'yicha o'qituvchilar bilan suhbat.",
          hours: 6 + (i % 3), status: "tasdiqlandi", reviewer_note: "", reviewed_by: null,
          grade: [9, 7, 8, 6, 10][(i + d) % 5], staff_note: d === 1 && i === 0 ? "Kuzatuv varaqasini ertaga 10:00 gacha topshiring." : "",
          written_by: a === "u-ceo1" ? "u-asoschi" : (profiles.find(p => p.id === a) || {}).ceo_id
        });
      });
      reports.push({ id: rid++, author_id: "u-x1", report_date: today(), done: "7-A sinfda darsni kuzatish uchun tayyorgarlik ko'rildi.",
        problems: "", plan: "Ertaga darsga kirish.", hours: 4, status: "tasdiqlandi", reviewer_note: "", reviewed_by: null, grade: 8,
        staff_note: "Ertaga 9:00 da 7-A sinfga kiring, varaqani o'zingiz bilan oling.", written_by: "u-ceo1" });
      return {
        profiles, tasks, reports, nextTask: tid, nextReport: rid,
        posts: [
          { id: 1, category: "ichki_muammo", body: "Samarqanddagi 426-xonada doska ishlamayapti.", link: "", author_id: "u-x1", status: "ochiq", created_at: new Date(Date.now() - 3600e3).toISOString() },
          { id: 2, category: "taklif", body: "#taklif Kunlik hisobotlarni markazlashtirib, bitta joyda yuritish kerak.", link: "", author_id: "u-ceo2", status: "jarayonda", created_at: new Date(Date.now() - 86400e3 * 2).toISOString() },
          { id: 3, category: "video_kontent", body: "USTOZLAR FAOLIYATINI BAHOLASH TIZIMI bo'yicha batafsil video.", link: "https://youtube.com", author_id: "u-asoschi", status: "ochiq", created_at: new Date(Date.now() - 86400e3 * 4).toISOString() }
        ],
        comments: [{ id: 1, post_id: 1, author_id: "u-ceo1", body: "Xo'jalik bo'limiga aytildi.", created_at: new Date().toISOString() }],
        nextPost: 4, nextComment: 2, videos: [], nextVideo: 1,
        plans: (() => { const now = new Date(); const dow = (now.getDay() + 6) % 7; const ws = addDays(-dow);
          const days = { "1": "2 ta dars kuzatuvi (7-A, 8-B)", "2": "Kuzatuv varaqalarini tahlil qilish", "3": "Filialga tashrif, 3 ta dars", "4": "O'qituvchilar bilan suhbat", "5": "Haftalik xulosa tayyorlash", "6": "Hujjatlarni tartiblash" };
          return ["u-x1", "u-x2", "u-ceo1"].map(u => ({ user_id: u, week_start: ws, plan: "", days: { ...days }, updated_by: u === "u-ceo1" ? "u-asoschi" : "u-ceo1" })); })(),
        about: {
          full_name: "Yosinxon Ahmadxonov",
          title: "Monitoring bo'limi rahbari, Registon maktabi",
          bio: "Ta'lim sifatini monitoring qilish, o'qituvchilarga uslubiy yordam ko'rsatish va maktab rahbarlari bilan hamkorlikda ishlash bo'yicha mutaxassis.",
          phone: "", telegram: "", website: "https://yosinxon-reg.github.io/mening-saytim/", photo_url: ""
        }
      };
    }

    const me = () => load().profiles.find(p => p.id === meId) || null;
    const pub = p => { if (!p) return p; const { password, ...rest } = p; return { ...rest }; };
    const isMember = (uid) => { const m = me(); const p = load().profiles.find(x => x.id === uid);
      return m && m.role === "ceo" && p && p.ceo_id === m.id; };
    const ok = v => Promise.resolve(JSON.parse(JSON.stringify(v)));
    const fail = msg => Promise.reject(new Error(msg));

    return {
      mode: "demo",
      async restore() { return pub(me()); },
      async needsSetup() { return false; },
      async signIn(email, password) {
        const p = load().profiles.find(x => x.email.toLowerCase() === loginToEmail(email));
        if (!p || p.password !== password) return fail("Login yoki parol noto'g'ri");
        if (!p.active) return fail("Hisobingiz o'chirilgan. Asoschiga murojaat qiling.");
        meId = p.id; try { localStorage.setItem(KEY + "_me", meId); } catch (e) {}
        return pub(p);
      },
      async signInTeacher({ full_name, filial }) {
        const d = load();
        const p = { id: "u-t" + Date.now(), email: "", password: null, full_name, filial, role: "oqituvchi", ceo_id: null, phone: "", active: true };
        d.profiles.push(p); save();
        meId = p.id; try { localStorage.setItem(KEY + "_me", meId); } catch (e) {}
        return pub(p);
      },
      async signOut() { meId = null; try { localStorage.removeItem(KEY + "_me"); } catch (e) {} },
      async changePassword(pw) { const m = me(); m.password = pw; save(); return true; },
      async getAbout() { return ok(load().about); },
      async saveAbout(a) { if (me()?.role !== "asoschi") return fail("Ruxsat yo'q"); Object.assign(load().about, a); save(); return true; },

      async listProfiles() {
        const m = me(); if (!m) return [];
        const all = load().profiles;
        let v;
        if (m.role === "asoschi") v = all;
        else if (["ceo", "xodim"].includes(m.role)) v = all.filter(p => p.id === m.id || ["asoschi", "ceo", "xodim"].includes(p.role));
        else v = all.filter(p => p.id === m.id);
        return ok(v.map(pub));
      },
      async updateProfile(id, patch) {
        const m = me(); const p = load().profiles.find(x => x.id === id);
        if (!p) return fail("Topilmadi");
        if (m.role !== "asoschi") {
          if (id !== m.id) return fail("Ruxsat yo'q");
          patch = { full_name: patch.full_name, phone: patch.phone, filial: patch.filial };
        }
        Object.keys(patch).forEach(k => patch[k] !== undefined && (p[k] = patch[k]));
        save(); return pub(p);
      },
      async createUser({ login, password, full_name, role, ceo_id, ...extra }) {
        if (me()?.role !== "asoschi") return fail("Ruxsat yo'q");
        const d = load(); const email = loginToEmail(login);
        if (d.profiles.some(p => p.email.toLowerCase() === email)) return fail("Bu login band");
        const p = { id: "u-" + Date.now() + Math.random().toString(36).slice(2, 5), email, password, full_name, role, ceo_id: ceo_id || null, phone: "", active: true, ...extra };
        d.profiles.push(p); save(); return pub(p);
      },

      async listTasks() {
        const m = me(); if (!m) return [];
        return ok(load().tasks.filter(t => m.role === "asoschi" || t.assigned_to === m.id || t.created_by === m.id || isMember(t.assigned_to)));
      },
      async listTasksSince(ts) { return ok((await this.listTasks()).filter(t => (t.created_at || "") >= ts)); },
      async createTask(t) {
        const m = me(); const d = load();
        if (!(m.role === "asoschi" || (m.role === "ceo" && (isMember(t.assigned_to) || t.assigned_to === m.id)))) return fail("Bu odamga topshiriq bera olmaysiz");
        const row = { result_note: "", review_note: "", status: "yangi", ...t, id: d.nextTask++, created_by: m.id,
          created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        d.tasks.push(row); save(); return ok(row);
      },
      async updateTask(id, patch) {
        const m = me(); const t = load().tasks.find(x => x.id === id);
        if (!t) return fail("Topilmadi");
        const manager = m.role === "asoschi" || t.created_by === m.id || isMember(t.assigned_to);
        if (!manager) {
          if (t.assigned_to !== m.id) return fail("Ruxsat yo'q");
          const p2 = {};
          if (patch.status && ["jarayonda", "bajarildi"].includes(patch.status)) p2.status = patch.status;
          if (patch.result_note !== undefined) p2.result_note = patch.result_note;
          if (patch.result_images !== undefined) p2.result_images = patch.result_images;
          patch = p2;
        }
        Object.assign(t, patch, { updated_at: new Date().toISOString() }); save(); return ok(t);
      },
      async deleteTask(id) {
        const m = me(); const d = load(); const t = d.tasks.find(x => x.id === id);
        if (!t || !(m.role === "asoschi" || t.created_by === m.id)) return fail("Ruxsat yo'q");
        d.tasks = d.tasks.filter(x => x.id !== id); save(); return true;
      },

      async listReports({ from, to } = {}) {
        const m = me(); if (!m) return [];
        return ok(load().reports.filter(r =>
          (r.author_id === m.id || m.role === "asoschi" || isMember(r.author_id)) &&
          (!from || r.report_date >= from) && (!to || r.report_date <= to)));
      },
      async saveMyReport(r) {
        const m = me(); const d = load();
        if (!["xodim", "ceo", "asoschi"].includes(m.role)) return fail("Ruxsat yo'q");
        let ex = d.reports.find(x => x.author_id === m.id && x.report_date === r.report_date);
        if (ex) {
          if (ex.grade !== null && ex.grade !== undefined && ex.grade !== "") return fail("Baholangan hisobotni o'zgartirib bo'lmaydi");
          if (ex.written_by === m.id && Date.now() - new Date(ex.created_at).getTime() > 864e5) return fail("Hisobot yuborilganiga 24 soatdan oshdi — endi tahrirlab bo'lmaydi");
          Object.assign(ex, { edited_at: ex.written_by === m.id ? new Date().toISOString() : (ex.edited_at || null), done: r.done, problems: r.problems, plan: r.plan, hours: r.hours, data: r.data || {}, status: "yuborildi", written_by: m.id, updated_at: new Date().toISOString() });
        } else {
          ex = { id: d.nextReport++, author_id: m.id, report_date: r.report_date, done: r.done, problems: r.problems, data: r.data || {}, grade: null, staff_note: "",
            plan: r.plan, hours: r.hours, status: "yuborildi", reviewer_note: "", reviewed_by: null, written_by: m.id, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
          d.reports.push(ex);
        }
        save(); return ok(ex);
      },
      async gradeReport(author_id, report_date, f) {
        const m = me(); const d = load();
        if (!(m.role === "asoschi" ? author_id !== m.id : isMember(author_id))) return fail("Ruxsat yo'q");
        let ex = d.reports.find(x => x.author_id === author_id && x.report_date === report_date);
        if (!ex) { ex = { id: d.nextReport++, author_id, report_date, done: "", problems: "", plan: "", hours: 0, data: {}, written_by: m.id, created_at: new Date().toISOString() }; d.reports.push(ex); }
        Object.assign(ex, { grade: f.grade, staff_note: f.staff_note || "", status: "tasdiqlandi", reviewed_by: m.id, reviewed_at: new Date().toISOString() });
        save(); return ok(ex);
      },
      async saveStaffReport(author_id, report_date, f) {
        const m = me(); const d = load();
        if (!(m.role === "asoschi" ? author_id !== m.id : isMember(author_id))) return fail("Ruxsat yo'q");
        let ex = d.reports.find(x => x.author_id === author_id && x.report_date === report_date);
        if (!ex) { ex = { id: d.nextReport++, author_id, report_date, hours: 0, reviewer_note: "", reviewed_by: null }; d.reports.push(ex); }
        Object.assign(ex, { done: f.done || "", problems: f.problems || "", plan: f.plan || "", grade: f.grade ?? null, staff_note: f.staff_note || "",
          status: "tasdiqlandi", written_by: m.id, updated_at: new Date().toISOString() });
        save(); return ok(ex);
      },
      async touch() { const d = load(); const p = d.profiles.find(x => x.id === meId); if (p) { p.last_seen = new Date().toISOString(); save(); } return true; },
      async reviewReport(id, status, note) {
        const m = me(); const r = load().reports.find(x => x.id === id);
        if (!r || !(m.role === "asoschi" || isMember(r.author_id))) return fail("Ruxsat yo'q");
        Object.assign(r, { status, reviewer_note: note || "", reviewed_by: m.id }); save(); return ok(r);
      },
      async listPosts() {
        const m = me(); if (!m || !["asoschi", "ceo", "xodim"].includes(m.role)) return [];
        const d = load(); d.posts = d.posts || []; d.comments = d.comments || [];
        return ok(d.posts.map(p => ({ ...p, comment_count: d.comments.filter(c => c.post_id === p.id).length }))
          .sort((a, b) => a.created_at < b.created_at ? 1 : -1));
      },
      async createPost(p) {
        const m = me(); const d = load();
        if (!["asoschi", "ceo", "xodim"].includes(m.role)) return fail("Ruxsat yo'q");
        const row = { id: d.nextPost++, category: p.category, body: p.body, link: p.link || "", images: p.images || [], author_id: m.id, status: "ochiq", created_at: new Date().toISOString() };
        d.posts.push(row); save(); return ok(row);
      },
      async updatePost(id, patch) {
        const m = me(); const p = load().posts.find(x => x.id === id);
        if (!p) return fail("Topilmadi");
        if (p.author_id !== m.id) {
          if (!["asoschi", "ceo"].includes(m.role)) return fail("Ruxsat yo'q");
          patch = { status: patch.status };
        }
        Object.assign(p, patch); save(); return ok(p);
      },
      async deletePost(id) {
        const m = me(); const d = load(); const p = d.posts.find(x => x.id === id);
        if (!p || !(p.author_id === m.id || m.role === "asoschi")) return fail("Ruxsat yo'q");
        d.posts = d.posts.filter(x => x.id !== id); d.comments = d.comments.filter(c => c.post_id !== id); save(); return true;
      },
      async listComments(postId) { return ok((load().comments || []).filter(c => c.post_id === postId)); },
      async uploadImage(blob) { return new Promise(res => { const r = new FileReader(); r.onload = () => res(r.result); r.readAsDataURL(blob); }); },
      async signedUrls(paths) { return Object.fromEntries(paths.map(p => [p, p])); },
      async addComment(postId, body, images) {
        const m = me(); const d = load();
        const c = { id: d.nextComment++, post_id: postId, author_id: m.id, body, images: images || [], created_at: new Date().toISOString() };
        d.comments.push(c); save(); return ok(c);
      },
      async listVideos() {
        const m = me(); if (!m) return []; const d = load(); d.videos = d.videos || [];
        const c = m.ceo_id ? d.profiles.find(x => x.id === m.ceo_id) : null; const dept = "dept:" + ((m.role === "ceo" ? m.bolim : c && c.bolim) || "");
        return ok(d.videos.filter(v => m.role === "asoschi" || v.audience.includes(m.role) || v.audience.includes(dept)).sort((a, b) => a.created_at < b.created_at ? 1 : -1));
      },
      async createVideo(v) {
        const m = me(); if (m.role !== "asoschi") return fail("Ruxsat yo'q");
        if (v.file) return fail("Demo rejimda fayl yuklab bo'lmaydi — havola qo'ying");
        const d = load(); d.videos = d.videos || []; d.nextVideo = d.nextVideo || 1;
        const row = { id: d.nextVideo++, title: v.title, description: v.description, kind: v.kind, url: v.url, storage_path: null,
          audience: v.audience, created_by: m.id, created_at: new Date().toISOString() };
        d.videos.push(row); save(); return ok(row);
      },
      async deleteVideo(v) { const d = load(); d.videos = (d.videos || []).filter(x => x.id !== v.id); save(); return true; },
      async videoUrl(v) { return v.url; },
      async listStaffImport() { return []; },
      async listStaffInfo() { return []; },
      async listViews(from) { const d = load(); return ok((d.views || []).filter(v => v.seen_at >= from)); },
      async markSeen(kind, item_id) { const d = load(); const m = me(); d.views = d.views || [];
        if (!d.views.some(v => v.kind === kind && v.item_id === item_id && v.user_id === m.id)) { d.views.push({ kind, item_id, user_id: m.id, seen_at: new Date().toISOString() }); save(); } return ok(true); },
      async listLessonViews() { const d = load(); const m = me(); return ok((d.lviews || []).filter(r => m.role === "asoschi" || r.user_id === m.id || isMember(r.user_id))); },
      async markLesson(id) { const d = load(); d.lviews = d.lviews || []; const m = me();
        if (!d.lviews.some(r => r.user_id === m.id && r.lesson_id === id)) { d.lviews.push({ user_id: m.id, lesson_id: id, viewed_at: new Date().toISOString() }); save(); } return true; },
      async listDeptTasks() { const d = load(); return ok(d.dtasks || []); },
      async createDeptTask(t) { const d = load(); d.dtasks = d.dtasks || []; d.nextDt = d.nextDt || 1;
        const row = { ...t, id: d.nextDt++, created_by: me().id, created_at: new Date().toISOString() }; d.dtasks.push(row); save(); return ok(row); },
      async deleteDeptTask(id) { const d = load(); d.dtasks = (d.dtasks || []).filter(x => x.id !== id); d.dts = (d.dts || []).filter(x => x.task_id !== id); save(); return true; },
      async listDeptStatus() { const d = load(); const m = me(); return ok((d.dts || []).filter(r => m.role === "asoschi" || r.user_id === m.id || isMember(r.user_id))); },
      async setDeptStatus(task_id, user_id, patch) {
        const d = load(); d.dts = d.dts || []; const m = me();
        const rater = m.role === "asoschi" || (isMember(user_id) && user_id !== m.id);
        if (!rater && user_id !== m.id) return fail("Ruxsat yo'q");
        let r = d.dts.find(x => x.task_id === task_id && x.user_id === user_id);
        if (!r) { r = { task_id, user_id, self_done: false, self_note: "", status: "kutilmoqda" }; d.dts.push(r); }
        if (patch.self_done !== undefined && user_id === m.id) { r.self_done = patch.self_done; r.self_note = patch.self_note || ""; }
        if (patch.status && rater) { r.status = patch.status; r.confirmed_by = m.id; r.confirmed_at = new Date().toISOString(); }
        save(); return ok(r);
      },
      async listPlans(from, to) { const d = load(); const m = me();
        return ok((d.plans || []).filter(r => r.week_start >= from && r.week_start <= to && (m.role === "asoschi" || r.user_id === m.id || isMember(r.user_id)))); },
      async setPlan(user_id, week_start, plan) { const d = load(); d.plans = d.plans || [];
        let ex = d.plans.find(r => r.user_id === user_id && r.week_start === week_start);
        if (!ex) { ex = { user_id, week_start, days: {} }; d.plans.push(ex); }
        Object.assign(ex, { plan, updated_by: me().id }); save(); return true; },
      async setPlanDays(user_id, week_start, days, plan) { const d = load(); const m = me();
        if (!(m.role === "asoschi" ? user_id !== m.id : isMember(user_id))) return fail("Ruxsat yo'q");
        d.plans = d.plans || []; let ex = d.plans.find(r => r.user_id === user_id && r.week_start === week_start);
        if (!ex) { ex = { user_id, week_start, plan: "", days: {} }; d.plans.push(ex); }
        ex.days = days; if (plan !== undefined) ex.plan = plan; ex.updated_by = m.id; save(); return true; },
      async listAwards(from, to) { return ok((load().awards || []).filter(r => r.period_start >= from && r.period_start <= to)); },
      async setAward(period, user_id) { const d = load(); d.awards = (d.awards || []).filter(r => r.period_start !== period);
        if (user_id) d.awards.push({ period_start: period, user_id }); save(); return true; },
      async listSelfLogs(from, to, uid) { const d = load(); const m = me();
        return ok((d.slogs || []).filter(r => r.log_date >= from && r.log_date <= to && (!uid || r.user_id === uid) && (m.role === "asoschi" || r.user_id === m.id)).sort((a, b) => a.log_date < b.log_date ? 1 : -1)); },
      async saveSelfLog(date, body) { const d = load(); const m = me(); d.slogs = d.slogs || []; const now = new Date().toISOString();
        const ex = d.slogs.find(r => r.user_id === m.id && r.log_date === date); if (ex) Object.assign(ex, { body, updated_at: now }); else d.slogs.push({ user_id: m.id, log_date: date, body, created_at: now, updated_at: now }); save(); return ok(true); },
      async listCeoReports(from, to) { const d = load(); const m = me();
        return ok((d.ceoReps || []).filter(r => r.report_date >= from && r.report_date <= to && (m.role === "asoschi" || r.ceo_id === m.id))); },
      async saveCeoReport(date, kind, data, summary) {
        const d = load(); const m = me(); if (!m || m.role !== "ceo") return fail("Hisobotni faqat bo'lim rahbari yuboradi");
        d.ceoReps = d.ceoReps || []; const ex = d.ceoReps.find(r => r.report_date === date && r.ceo_id === m.id); const now = new Date().toISOString();
        if (ex) Object.assign(ex, { kind, data, summary, updated_at: now }); else d.ceoReps.push({ report_date: date, ceo_id: m.id, kind, data, summary, created_at: now, updated_at: now });
        save(); return ok(true); },
      // ---- O'qituvchilar bazasi va kuzatuvlar (demo)
      async listTeachers(subs, ids) { return ok((load().teachers || []).filter(t => !subs || !subs.length || subs.includes(t.subject) || !t.subject || (ids || []).includes(t.id))); },
      async claimTeacher(tid, subj) { const d = load(); const t = (d.teachers || []).find(x => x.id === tid); if (!t || t.subject) return fail("Bu ustozni boshqa xodim allaqachon tanlab oldi"); t.subject = subj; t.claimed_by = me().id; save(); return ok(subj); },
      async listHelpReqs() { return ok(load().helpreq || []); },
      async listTeacherReqs() { return ok(load().treq || []); },
      async sendTeacherReq(kind, tid, left_on, nm, fil, subj, kl, note) { const d = load(); d.treq = d.treq || []; const t = (d.teachers || []).find(x => x.id === tid);
        d.treq.unshift({ id: Date.now(), kind, author_id: me().id, teacher_id: tid, old_name: t ? t.full_name : "", left_on, new_name: nm, new_filial: t ? t.filial : fil, new_subject: t ? t.subject : subj, new_class: kl, note, status: "kutilmoqda", reply: "", created_at: new Date().toISOString() }); save(); return ok(1); },
      async decideTeacherReq(rid, okk, msg, nm, fil, subj) { const d = load(); const r = (d.treq || []).find(x => x.id === rid); if (!r) return ok(true);
        r.status = okk ? "tasdiq" : "rad"; r.reply = msg; r.reviewer_id = me().id;
        if (okk) { if (r.kind === "ketdi") { const t = (d.teachers || []).find(x => x.id === r.teacher_id); if (t) { t.status = "arxiv"; t.left_at = r.left_on; } }
          const n = nm || r.new_name; if (n) { d.teachers = d.teachers || []; d.teachers.push({ id: "t" + Date.now(), full_name: n, name_key: n.toLowerCase(), filial: fil || r.new_filial, subject: subj || r.new_subject, classes: [], lead_class: r.new_class, claimed_by: r.author_id, status: "faol" }); } }
        save(); return ok(true); },
      async cancelTeacherReq(rid) { const d = load(); const r = (d.treq || []).find(x => x.id === rid); if (r) r.status = "bekor"; save(); return ok(true); },
      async teachersByIds(ids) { return ok((load().teachers || []).filter(t => ids.includes(t.id))); },
      async sendHelpReq(to_id, teacher_ids, due, note) { const d = load(); d.helpreq = d.helpreq || []; const id = Date.now(); d.helpreq.unshift({ id, from_id: me().id, to_id, teacher_ids, due, note: note || "", status: "kutilmoqda", reply: "", created_at: new Date().toISOString() }); save(); return ok(id); },
      async answerHelpReq(rid, okk, msg) { const d = load(); const h = (d.helpreq || []).find(x => x.id === rid); if (h) { h.status = okk ? "qabul" : "rad"; h.reply = msg || ""; h.answered_at = new Date().toISOString(); } save(); return ok(true); },
      async cancelHelpReq(rid) { const d = load(); const h = (d.helpreq || []).find(x => x.id === rid); if (h) h.status = "bekor"; save(); return ok(true); },
      async listTeacherObs(from, subs) { return ok((load().tobs || []).filter(o => o.day >= from && (!subs || !subs.length || subs.includes(o.subject)))); },
      async setStaffSubjects(uid, subs) { const d = load(); const m = me(); if (!m || !(m.role === "asoschi" || (m.role === "ceo" && m.bolim === "akademik"))) return fail("Ruxsat yo'q");
        const p = d.profiles.find(x => x.id === uid); if (p) p.subjects = subs || []; save(); return ok(true); },
      async listTeacherPlans() { return ok(load().tplan || []); },
      async setTeacherPlan(teacher_id, month, plan, note) { const d = load(); d.tplan = (d.tplan || []).filter(x => !(x.teacher_id === teacher_id && x.month === month));
        if (plan !== null && plan !== undefined) d.tplan.push({ teacher_id, month, plan, note: note || "" }); save(); return ok(true); },
      async listIssueReviews(from, to) { return ok((load().irev || []).filter(x => x.report_date >= from && x.report_date <= to)); },
      async setIssueReview(author_id, report_date, idx, verdict) { const d = load(); d.irev = (d.irev || []).filter(x => !(x.author_id === author_id && x.report_date === report_date && x.idx === idx));
        d.irev.push({ author_id, report_date, idx, verdict, reviewed_by: me().id }); save(); return ok(true); },
      async listActivity(from, to) { return ok([]); },
      async myTgLink() { return null; }, async listTgLinks() { return []; }, async tgLinkCode() { return "demo0000000000000a"; }, async unlinkTg() { return true; }, async logError() { return true; },
      async listRecurring() { return ok(load().recur || []); }, async saveRecurring(r) { const d = load(); d.recur = d.recur || []; if (r.id) Object.assign(d.recur.find(x => x.id === r.id) || {}, r); else d.recur.push({ ...r, id: Date.now(), created_by: me().id }); save(); return true; },
      async deleteRecurring(id) { const d = load(); d.recur = (d.recur || []).filter(x => x.id !== id); save(); return true; },
      async listTemplates() { return ok(load().tpls || []); }, async saveTemplate(t) { const d = load(); d.tpls = d.tpls || []; d.tpls.push({ ...t, id: Date.now(), created_by: me().id }); save(); return true; },
      async deleteTemplate(id) { const d = load(); d.tpls = (d.tpls || []).filter(x => x.id !== id); save(); return true; },
      async listCeoRatings(from, to) { const m = me(); return ok((load().crates || []).filter(r => r.month >= from && r.month <= to && (m.role === "asoschi" || r.ceo_id === m.id))); },
      async setCeoRating(month, ceo_id, score, note) { const d = load(); const m = me(); if (m.role !== "asoschi") return fail("Ruxsat yo'q"); d.crates = (d.crates || []).filter(r => !(r.month === month && r.ceo_id === ceo_id));
        d.crates.push({ month, ceo_id, score, note: note || "", updated_at: new Date().toISOString() }); save(); return ok(true); },
      async getSettings() { return ok({ ...(load().settings || {}) }); },
      async setSetting(key, value) { const d = load(); if (me().role !== "asoschi") return fail("Ruxsat yo'q"); d.settings = { ...(d.settings || {}), [key]: value }; save(); return ok(true); },
      async saveAkademikObs(day, rows) { const d = load(); const m = me(); d.teachers = d.teachers || []; d.tobs = (d.tobs || []).filter(o => !(o.author_id === m.id && o.report_date === day));
        const key = n => String(n || "").trim().replace(/[‘’ʻʼ`´]/g, "'").replace(/\s+/g, " ").toLowerCase();
        rows.forEach(r => { if (!String(r.teacher || "").trim()) return; let t = d.teachers.find(x => x.id === r.teacher_id) || d.teachers.find(x => x.name_key === key(r.teacher));
          if (!t) { t = { id: "t" + Date.now() + Math.random().toString(36).slice(2, 6), full_name: r.teacher.trim(), name_key: key(r.teacher), filial: r.filial || "", subject: r.subject || "", classes: r.klass ? [r.klass] : [], created_by: m.id }; d.teachers.push(t); }
          else { if (r.filial) t.filial = r.filial; if (r.subject) t.subject = r.subject; if (r.klass && !(t.classes || []).includes(r.klass)) t.classes = [...(t.classes || []), r.klass]; }
          if (r.lead && !t.lead_class) t.lead_class = r.lead;
          d.tobs.push({ id: Date.now() + Math.random(), teacher_id: t.id, author_id: m.id, report_date: day, day: r.date || day, filial: r.filial || "", subject: r.subject || "", klass: r.klass || "", soat: r.soat ? +r.soat : null, lesson: r.lesson || "", ib: r.ib, ab: r.ab }); });
        save(); return ok(true); },
      async listTeacherEditors() { return ok([{ user_id: "u-x4" }]); },
      async setTeacherLead(id, v) { const d = load(); const t = (d.teachers || []).find(x => x.id === id); if (t) t.lead_class = v; save(); return ok(true); },
      async setTeacherKind(id, kind) { const d = load(); const t = (d.teachers || []).find(x => x.id === id); if (t) { t.subject = kind; t.kind_set = true; }
        (d.tobs || []).forEach(o => { if (o.teacher_id === id) { o.subject = kind; if (kind === "Bog'cha") { if (o.ab === null || o.ab === undefined || o.ab === "") o.ab = o.ib; o.ib = null; } } }); save(); return ok(true); },
      async updateTeacher(id, patch) { const d = load(); const t = (d.teachers || []).find(x => x.id === id); if (t) Object.assign(t, patch); save(); return ok(true); },
      async deleteTeacher(id) { const d = load(); d.teachers = (d.teachers || []).filter(x => x.id !== id); save(); return ok(true); },
      async mergeTeachers(keep, others) { const d = load(); const k = d.teachers.find(x => x.id === keep);
        d.tobs.forEach(o => { if (others.includes(o.teacher_id)) o.teacher_id = keep; });
        d.teachers.filter(x => others.includes(x.id)).forEach(x => { k.classes = [...new Set([...(k.classes || []), ...(x.classes || [])])]; if (!k.filial) k.filial = x.filial; if (!k.subject) k.subject = x.subject; });
        d.teachers = d.teachers.filter(x => !others.includes(x.id)); save(); return ok(true); },
      // ---- Ta'til kunlari va avtomatik bo'sh kompyuter qoidalari (demo)
      async listLeaves(from, to) { const d = load(); return ok((d.leaves || []).filter(l => l.to_day >= from && l.from_day <= to)); },
      async addLeaves(rows) { const d = load(); const m = me(); if (m.role !== "asoschi") return fail("Faqat Monitoring bo'limi rahbari belgilaydi");
        d.leaves = d.leaves || []; rows.forEach(r => d.leaves.push({ ...r, id: "lv" + Date.now() + Math.random().toString(36).slice(2, 6), created_by: m.id, created_at: new Date().toISOString() })); save(); return ok(true); },
      async delLeave(id) { const d = load(); d.leaves = (d.leaves || []).filter(l => l.id !== id); save(); return ok(true); },
      async listMetRules() { return ok(load().mrules || []); },
      // ---- Metodistlar vaqti (demo)
      async listMetPcs(from, to) { const d = load(); return ok((d.mpcs || []).filter(r => r.day >= from && r.day <= to)); },
      async openMetPc(day, owner_id, from_time) { const d = load(); const m = me(); const adm = m.role === "asoschi" || (m.role === "ceo" && m.bolim === "akademik");
        if (!adm) return fail("Faqat Monitoring bo'limi va Akademik bo'lim rahbari ochadi"); d.mpcs = d.mpcs || [];
        if (d.mpcs.some(r => r.day === day && r.owner_id === owner_id)) return fail("Bu xodimning joyi allaqachon ochilgan");
        const r = { id: "pc" + Date.now() + Math.random().toString(36).slice(2, 6), day, owner_id, from_time, opened_by: m.id, created_at: new Date().toISOString() }; d.mpcs.push(r); save(); return ok(r); },
      async closeMetPc(id) { const d = load(); d.mpcs = (d.mpcs || []).filter(r => r.id !== id); save(); return ok(true); },
      async listMetBookings(from, to) { const d = load(); return ok((d.mbook || []).filter(r => r.day >= from && r.day <= to)); },
      async bookMet(row) { const d = load(); const m = me(); d.mbook = d.mbook || [];
        if (row.end_t <= row.start_t) return fail("Tugash vaqti boshlanish vaqtidan keyin bo'lishi kerak");
        if (row.pc_id !== "asosiy" && !String(row.pc_id).startsWith("auto:")) { const pc = (d.mpcs || []).find(x => x.id === row.pc_id); if (!pc) return fail("Bu kompyuter topilmadi yoki yopilgan"); if (row.start_t < pc.from_time) return fail("Bu kompyuter soat " + pc.from_time + " dan ochiq"); }
        if (d.mbook.some(b => b.day === row.day && b.pc_id === row.pc_id && b.status === "faol" && b.start_t < row.end_t && row.start_t < b.end_t)) return fail("Bu vaqtda kompyuter band. Boshqa vaqt yoki kompyuterni tanlang");
        const r = { ...row, id: "mb" + Date.now(), booked_by: m.id, status: "faol", fb_done: false, created_at: new Date().toISOString() }; d.mbook.push(r); save(); return ok(r); },
      async cancelMet(id) { const d = load(); const b = (d.mbook || []).find(x => x.id === id); if (b) b.status = "bekor"; save(); return ok(true); },
      async listMetFeedback() { const d = load(); const m = me(); const adm = m.role === "asoschi" || (m.role === "ceo" && m.bolim === "akademik"); return ok(adm ? (d.mfb || []) : []); },
      async sendMetFeedback(booking_id, f) { const d = load(); const m = me(); const b = (d.mbook || []).find(x => x.id === booking_id);
        if (!b || b.booked_by !== m.id) return fail("So'rovnomani faqat bron qilgan xodim to'ldiradi"); d.mfb = d.mfb || [];
        if (d.mfb.some(x => x.booking_id === booking_id)) return fail("So'rovnoma allaqachon yuborilgan");
        d.mfb.push({ booking_id, ...f, author_id: m.id, created_at: new Date().toISOString() }); b.fb_done = true; save(); return ok(true); },
      async listKpiRange(from, to) { const d = load(); const m = me(); const vis = r => m.role === "asoschi" || r.user_id === m.id || isMember(r.user_id);
        return ok({ scores: (d.kpi || []).filter(r => r.period_start >= from && r.period_start <= to && vis(r)), finals: (d.kpiF || []).filter(r => r.period_start >= from && r.period_start <= to && vis(r)),
          daily: (d.kpiD || []).filter(r => r.day >= from && r.day <= to && vis(r)), week: (d.kpiW || []).filter(r => r.week_start >= from && r.week_start <= to && vis(r)) }); },
      async setKpiAt(lvl, date, user_id, criterion, score, note) {
        if (lvl === "bosqich") return this.setKpiScore(date, user_id, criterion, score, note);
        const m = me(); if (!(m.role === "asoschi" || (isMember(user_id) && user_id !== m.id))) return fail("Ruxsat yo'q");
        const d = load(); const key = lvl === "kun" ? "kpiD" : "kpiW", col = lvl === "kun" ? "day" : "week_start"; d[key] = d[key] || [];
        const ex = d[key].find(r => r[col] === date && r.user_id === user_id && r.criterion === criterion);
        const nn = note !== undefined ? note : (ex ? ex.note || "" : "");
        d[key] = d[key].filter(r => r !== ex);
        if (score !== null || nn) d[key].push({ [col]: date, user_id, criterion, score, note: nn, updated_by: m.id });
        save(); return true; },
      async listKpi(period) {
        const d = load(); d.kpi = d.kpi || []; d.kpiF = d.kpiF || []; const m = me();
        const vis = r => m.role === "asoschi" || r.user_id === m.id || isMember(r.user_id);
        return ok({ scores: d.kpi.filter(r => r.period_start === period && vis(r)), finals: d.kpiF.filter(r => r.period_start === period && vis(r)) });
      },
      async setKpiScore(period, user_id, criterion, score, note) {
        const m = me(); if (!(m.role === "asoschi" || (isMember(user_id) && user_id !== m.id))) return fail("Ruxsat yo'q");
        const d = load(); d.kpi = d.kpi || [];
        const ex = d.kpi.find(r => r.period_start === period && r.user_id === user_id && r.criterion === criterion);
        const nn = note !== undefined ? note : (ex ? ex.note || "" : "");
        d.kpi = d.kpi.filter(r => r !== ex);
        if (score !== null || nn) d.kpi.push({ period_start: period, user_id, criterion, score, note: nn, updated_by: m.id, updated_at: new Date().toISOString() });
        save(); return true;
      },
      async setKpiFinal(period, user_id, final_score) {
        const m = me(); if (!(m.role === "asoschi" || (isMember(user_id) && user_id !== m.id))) return fail("Ruxsat yo'q");
        const d = load(); d.kpiF = (d.kpiF || []).filter(r => !(r.period_start === period && r.user_id === user_id));
        if (final_score !== null) d.kpiF.push({ period_start: period, user_id, final_score, updated_by: m.id });
        save(); return true;
      },
      async markImported() { return true; },
      async adminSetPassword(uid, pw) { const p = load().profiles.find(x => x.id === uid); if (p) { p.password = pw; save(); } return true; },
      async resetDemo() { mem = seed(); save(); }
    };
  }

  // ------------------------------------------------------------ SUPABASE
  function SupaDB() {
    const sb = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
    let meCache = null;
    const chk = ({ data, error }) => { if (error) throw new Error(trErr(error.message)); return data; };
    // Supabase bir so'rovda ko'pi bilan 1000 qator qaytaradi — qolganlari jimgina tushib qolardi. Sahifalab hammasini olamiz.
    const PG = 1000;
    async function pageAll(mk) { const out = []; for (let i = 0; i < 200000; i += PG) { const rows = chk(await mk().range(i, i + PG - 1)) || []; out.push(...rows); if (rows.length < PG) break; } return out; }
    // Yangi alifbo harflari (ğ, ç, ş, ö) bilan saqlanib qolgan filial/holat qiymatlarini eski shaklga keltiramiz
    const E = v => typeof v === "string" && window.alifEski ? window.alifEski(v) : v;
    const normIss = l => Array.isArray(l) ? l.map(h => h && typeof h === "object" ? { ...h, filial: E(h.filial), type: E(h.type), place: E(h.place), who: E(h.who) } : h) : l;
    const normRep = r => { if (r && r.data && typeof r.data === "object") { const d = { ...r.data }; if (d.issues) d.issues = normIss(d.issues); if (d.own_issues) d.own_issues = normIss(d.own_issues); if (Array.isArray(d.filials)) d.filials = d.filials.map(E);
        if (Array.isArray(d.rows)) d.rows = d.rows.map(x => x && typeof x === "object" ? { ...x, filial: E(x.filial), subject: E(x.subject) } : x); r.data = d; } return r; };
    async function pageSoft(mk) { try { return await pageAll(mk); } catch (e) { return []; } }
    function trErr(m) {
      if (/Invalid login/i.test(m)) return "Login yoki parol noto'g'ri";
      if (/row-level security/i.test(m)) return "Bu amal uchun ruxsatingiz yo'q";
      if (/already registered|already been registered/i.test(m)) return "Bu login (telefon) allaqachon ro'yxatdan o'tgan";
      if (/anonymous sign-ins are disabled/i.test(m)) return "O'qituvchilar uchun kirish hali yoqilmagan. Monitoring bo'limiga murojaat qiling.";
      if (/rate limit|too many/i.test(m)) return "Juda ko'p so'rov. 5 daqiqa kutib, qayta bosing.";
      if (/Password should be/i.test(m)) return "Parol kamida 6 belgidan iborat bo'lishi kerak";
      return m;
    }
    async function loadMe() {
      const { data: { user } } = await sb.auth.getUser();
      if (!user) return (meCache = null);
      meCache = chk(await sb.from("profiles").select("*").eq("id", user.id).single());
      return meCache;
    }
    return {
      mode: "supabase",
      async restore() { return loadMe(); },
      async needsSetup() {
        const { data, error } = await sb.rpc("has_founder");
        return !error && data === false;
      },
      async signUpFounder({ email, password, full_name }) {
        const res = chk(await sb.auth.signUp({ email: email.trim(), password, options: { data: { full_name } } }));
        if (!res.session) throw new Error("Hisob yaratildi. Emailingizga kelgan havolani bosing, so'ng kiring.");
        return loadMe();
      },
      async signIn(email, password) {
        chk(await sb.auth.signInWithPassword({ email: loginToEmail(email), password }));
        const p = await loadMe();
        if (p && !p.active) { await sb.auth.signOut(); throw new Error("Hisobingiz o'chirilgan. Asoschiga murojaat qiling."); }
        return p;
      },
      async signInTeacher({ full_name, filial }) {
        chk(await sb.auth.signInAnonymously({ options: { data: { full_name, filial } } }));
        return loadMe();
      },
      async signOut() { await sb.auth.signOut(); meCache = null; },
      async changePassword(pw) { chk(await sb.auth.updateUser({ password: pw })); return true; },
      async getAbout() { return chk(await sb.from("about").select("*").eq("id", 1).single()); },
      async saveAbout(a) { chk(await sb.from("about").update({ ...a, updated_at: new Date().toISOString() }).eq("id", 1)); return true; },
      async listProfiles() {
        const r = chk(await sb.from("profiles").select("*").order("full_name"));
        // Monitoring bo'limi rahbarining shaxsiy ma'lumotlari boshqalarga berilmaydi — faqat ism va lavozim
        if (!r.some(p => p.role === "asoschi")) {
          try { const { data } = await sb.rpc("founder_card"); (data || []).forEach(f => r.push({ id: f.id, full_name: f.full_name, role: "asoschi", active: true })); } catch (e) {}
        }
        return r;
      },
      async updateProfile(id, patch) { return chk(await sb.from("profiles").update(patch).eq("id", id).select().single()); },
      async createUser({ login, password, full_name, role, ceo_id, ...extra }) {
        const email = loginToEmail(login);
        // Alohida mijoz: asoschining o'z sessiyasi buzilmaydi
        const tmp = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY,
          { auth: { persistSession: false, autoRefreshToken: false, storageKey: "tmp-signup" } });
        const res = chk(await tmp.auth.signUp({ email, password, options: { data: { full_name } } }));
        const id = res.user && res.user.id;
        if (!id) throw new Error("Foydalanuvchi yaratilmadi");
        return chk(await sb.from("profiles").update({ full_name, role, ceo_id: ceo_id || null, ...extra }).eq("id", id).select().single());
      },
      async listTasks() { return pageAll(() => sb.from("tasks").select("*").order("created_at", { ascending: false }).order("id")); },
      async listTasksSince(ts) { return chk(await sb.from("tasks").select("*").gte("created_at", ts).order("created_at", { ascending: false })); },
      async createTask(t) { return chk(await sb.from("tasks").insert({ ...t, created_by: meCache.id }).select().single()); },
      async updateTask(id, patch) { return chk(await sb.from("tasks").update(patch).eq("id", id).select().single()); },
      async deleteTask(id) { chk(await sb.from("tasks").delete().eq("id", id)); return true; },
      async listReports({ from, to } = {}) {
        return (await pageAll(() => { let q = sb.from("daily_reports").select("*").order("report_date", { ascending: false }).order("id");
          if (from) q = q.gte("report_date", from);
          if (to) q = q.lte("report_date", to);
          return q; })).map(normRep);
      },
      async saveMyReport(r) {
        const ex = chk(await sb.from("daily_reports").select("id,status,grade").eq("author_id", meCache.id).eq("report_date", r.report_date).maybeSingle());
        const body = { done: r.done, problems: r.problems, plan: r.plan, hours: r.hours, data: r.data || {} };
        if (ex) {
          if (ex.grade !== null && ex.grade !== undefined) throw new Error("Baholangan hisobotni o'zgartirib bo'lmaydi");
          return chk(await sb.from("daily_reports").update(body).eq("id", ex.id).select().single());
        }
        return chk(await sb.from("daily_reports").insert({ ...body, author_id: meCache.id, report_date: r.report_date }).select().single());
      },
      async gradeReport(author_id, report_date, f) {
        const ex = chk(await sb.from("daily_reports").select("id").eq("author_id", author_id).eq("report_date", report_date).maybeSingle());
        const body = { grade: f.grade, staff_note: f.staff_note || "", status: "tasdiqlandi" };
        if (ex) return chk(await sb.from("daily_reports").update(body).eq("id", ex.id).select().single());
        return chk(await sb.from("daily_reports").insert({ ...body, author_id, report_date }).select().single());
      },
      async saveStaffReport(author_id, report_date, f) {
        const body = { author_id, report_date, done: f.done || "", problems: f.problems || "", plan: f.plan || "", grade: f.grade ?? null,
          staff_note: f.staff_note || "", status: "tasdiqlandi" };
        return chk(await sb.from("daily_reports").upsert(body, { onConflict: "author_id,report_date" }).select().single());
      },
      async touch() { try { await sb.rpc("touch_last_seen"); } catch (e) {} return true; },
      async listViews(from) { return pageAll(() => sb.from("item_views").select("kind,item_id,user_id,seen_at").gte("seen_at", from).order("seen_at").order("item_id").order("user_id")); },
      async markSeen(kind, item_id) { chk(await sb.from("item_views").upsert({ kind, item_id, user_id: meCache.id }, { onConflict: "kind,item_id,user_id", ignoreDuplicates: true })); return true; },
      async listLessonViews() { return pageAll(() => sb.from("lesson_views").select("*").order("user_id").order("lesson_id")); },
      async markLesson(id) { chk(await sb.from("lesson_views").upsert({ user_id: meCache.id, lesson_id: id }, { onConflict: "user_id,lesson_id", ignoreDuplicates: true })); return true; },
      async listDeptTasks() { return pageAll(() => sb.from("dept_tasks").select("*").order("created_at", { ascending: false }).order("id")); },
      async createDeptTask(t) { return chk(await sb.from("dept_tasks").insert({ ...t, created_by: meCache.id }).select().single()); },
      async deleteDeptTask(id) { chk(await sb.from("dept_tasks").delete().eq("id", id)); return true; },
      async listDeptStatus() { return pageAll(() => sb.from("dept_task_status").select("*").order("task_id").order("user_id")); },
      async setDeptStatus(task_id, user_id, patch) {
        return chk(await sb.from("dept_task_status").upsert({ task_id, user_id, ...patch }, { onConflict: "task_id,user_id" }).select().single());
      },
      async listPlans(from, to) { return chk(await sb.from("weekly_plans").select("*").gte("week_start", from).lte("week_start", to)); },
      async setPlan(user_id, week_start, plan) { chk(await sb.from("weekly_plans").upsert({ user_id, week_start, plan }, { onConflict: "user_id,week_start" })); return true; },
      async setPlanDays(user_id, week_start, days, plan) {
        const body = { user_id, week_start, days }; if (plan !== undefined) body.plan = plan;
        chk(await sb.from("weekly_plans").upsert(body, { onConflict: "user_id,week_start" })); return true; },
      async listAwards(from, to) { return chk(await sb.from("kpi_award").select("*").gte("period_start", from).lte("period_start", to)); },
      async setAward(period, user_id) {
        if (!user_id) { chk(await sb.from("kpi_award").delete().eq("period_start", period)); return true; }
        chk(await sb.from("kpi_award").upsert({ period_start: period, user_id }, { onConflict: "period_start" })); return true;
      },
      async listSelfLogs(from, to, uid) { let q = sb.from("self_logs").select("*").gte("log_date", from).lte("log_date", to).order("log_date", { ascending: false }); if (uid) q = q.eq("user_id", uid); return chk(await q); },
      async saveSelfLog(date, body) { chk(await sb.from("self_logs").upsert({ user_id: meCache.id, log_date: date, body }, { onConflict: "user_id,log_date" })); return true; },
      async listCeoReports(from, to) { return (await pageAll(() => sb.from("ceo_reports").select("*").gte("report_date", from).lte("report_date", to).order("report_date").order("ceo_id"))).map(normRep); },
      async saveCeoReport(date, kind, data, summary) {
        chk(await sb.from("ceo_reports").upsert({ report_date: date, ceo_id: meCache.id, kind, data, summary }, { onConflict: "report_date,ceo_id" })); return true;
      },
      // ---- O'qituvchilar bazasi va kuzatuvlar
      // subs — xodim fanlari; ids — yordam so'rovi orqali ochilgan ustozlar. Fani yo'q (yangi bazadagi) ustozlar hammaga yuklanadi
      async listTeachers(subs, ids) {
        const base = () => sb.from("teachers").select("*").order("full_name").order("id");
        if (!subs || !subs.length) return (await pageAll(base)).map(t => ({ ...t, filial: E(t.filial) }));
        const [a, b, c] = await Promise.all([pageAll(() => base().in("subject", subs)), pageAll(() => base().eq("subject", "")),
          ids && ids.length ? pageAll(() => base().in("id", ids)) : Promise.resolve([])]);
        const m = new Map(); [...a, ...b, ...c].forEach(t => m.set(t.id, t));
        return [...m.values()].sort((x, y) => x.full_name.localeCompare(y.full_name)).map(t => ({ ...t, filial: E(t.filial) }));
      },
      async listTeacherObs(from, subs, ids) {
        const base = () => sb.from("teacher_obs").select("*").gte("day", from).order("day").order("id");
        if (!subs || !subs.length) return (await pageAll(base)).map(o => ({ ...o, filial: E(o.filial) }));
        const [a, c] = await Promise.all([pageAll(() => base().in("subject", subs)), ids && ids.length ? pageAll(() => base().in("teacher_id", ids)) : Promise.resolve([])]);
        const m = new Map(); [...a, ...c].forEach(o => m.set(o.id, o));
        return [...m.values()].sort((x, y) => x.day < y.day ? -1 : x.day > y.day ? 1 : x.id - y.id).map(o => ({ ...o, filial: E(o.filial) }));
      },
      onChange(tables, cb, st) { try { const ch = sb.channel("mp-live-" + Math.random().toString(36).slice(2, 8)); tables.forEach(t => ch.on("postgres_changes", { event: "*", schema: "public", table: t }, cb)); ch.subscribe(x => st && st(x)); return () => sb.removeChannel(ch); } catch (e) { return () => {}; } },
      async zaxiraExport(fresh) { return chk(await sb.rpc("zaxira_export", { fresh: !!fresh })); },
      async zaxiraInfo() { return chk(await sb.rpc("zaxira_info")); },
      async listTeacherReqs() { const r = await sb.from("teacher_requests").select("*").gte("created_at", new Date(Date.now() - 120 * 864e5).toISOString()).order("created_at", { ascending: false }); if (r.error) throw new Error(trErr(r.error.message)); return r.data; },
      async sendTeacherReq(k, tid, left_day, nm, fil, subj, kl, msg) { return chk(await sb.rpc("send_teacher_request", { k, tid, left_day: left_day || null, nm: nm || "", fil: fil || "", subj: subj || "", kl: kl || "", msg: msg || "" })); },
      async decideTeacherReq(rid, okk, msg, nm, fil, subj) { chk(await sb.rpc("decide_teacher_request", { rid, ok: okk, msg: msg || "", nm: nm || "", fil: fil || "", subj: subj || "" })); return true; },
      async cancelTeacherReq(rid) { chk(await sb.rpc("cancel_teacher_request", { rid })); return true; },
      async teachersByIds(ids) { const r = await sb.from("teachers").select("id,full_name,filial,subject").in("id", ids); return r.error ? [] : r.data.map(t => ({ ...t, filial: E(t.filial) })); },
      async claimTeacher(tid, subj) { return chk(await sb.rpc("claim_teacher", { tid, subj })); },
      async listHelpReqs() { const r = await sb.from("help_requests").select("*").gte("created_at", new Date(Date.now() - 90 * 864e5).toISOString()).order("created_at", { ascending: false }); if (r.error) throw new Error(trErr(r.error.message)); return r.data; },
      async sendHelpReq(to_user, tids, due_date, msg) { return chk(await sb.rpc("send_help_request", { to_user, tids, due_date, msg: msg || "" })); },
      async answerHelpReq(rid, ok, msg) { chk(await sb.rpc("answer_help_request", { rid, ok, msg: msg || "" })); return true; },
      async cancelHelpReq(rid) { chk(await sb.rpc("cancel_help_request", { rid })); return true; },
      async setStaffSubjects(uid, subs) { chk(await sb.rpc("set_staff_subjects", { uid, subs: subs || [] })); return true; },
      async listTeacherPlans() { const r = await sb.from("teacher_plan").select("*").gte("month", new Date(Date.now() - 400 * 864e5).toISOString().slice(0, 10)); return r.error ? [] : r.data; },
      async setTeacherPlan(teacher_id, month, plan, note) { if (plan === null || plan === undefined) { chk(await sb.from("teacher_plan").delete().eq("teacher_id", teacher_id).eq("month", month)); return true; }
        chk(await sb.from("teacher_plan").upsert({ teacher_id, month, plan, note: note || "", updated_at: new Date().toISOString() }, { onConflict: "teacher_id,month" })); return true; },
      async listIssueReviews(from, to) { return pageSoft(() => sb.from("issue_reviews").select("*").gte("report_date", from).lte("report_date", to).order("report_date").order("author_id").order("idx")); },
      async setIssueReview(author_id, report_date, idx, verdict) { chk(await sb.from("issue_reviews").upsert({ author_id, report_date, idx, verdict, reviewed_at: new Date().toISOString() }, { onConflict: "author_id,report_date,idx" })); return true; },
      async myTgLink() { const r = await sb.from("tg_links").select("*").eq("user_id", meCache.id).maybeSingle(); return r.error ? null : r.data; },
      async listTgLinks() { const r = await sb.from("tg_links").select("user_id,linked_at"); return r.error ? [] : r.data; },
      async tgLinkCode() { const r = await sb.rpc("tg_link_code"); if (r.error) throw new Error(trErr(r.error.message)); return r.data; },
      async unlinkTg() { chk(await sb.from("tg_links").delete().eq("user_id", meCache.id)); return true; },
      async logError(e) { await sb.from("client_errors").insert({ ...e, user_id: meCache && meCache.id }); return true; },
      async listRecurring() { return chk(await sb.from("task_recurring").select("*").order("created_at", { ascending: false })); },
      async saveRecurring(r) { if (r.id) { const { id, ...rest } = r; return chk(await sb.from("task_recurring").update(rest).eq("id", id).select().single()); } return chk(await sb.from("task_recurring").insert({ ...r, created_by: meCache.id }).select().single()); },
      async deleteRecurring(id) { chk(await sb.from("task_recurring").delete().eq("id", id)); return true; },
      async listTemplates() { return chk(await sb.from("task_templates").select("*").order("title")); },
      async saveTemplate(t) { return chk(await sb.from("task_templates").insert({ ...t, created_by: meCache.id }).select().single()); },
      async deleteTemplate(id) { chk(await sb.from("task_templates").delete().eq("id", id)); return true; },
      async listAbsences(f, t) { const r = await sb.rpc("staff_absences", { f, t }); return r.error ? [] : (r.data || []); },
      async listActivity(from, to) { return pageSoft(() => sb.from("staff_activity").select("user_id,day").gte("day", from).lte("day", to).order("day").order("user_id")); },
      async listCeoRatings(from, to) { const r = await sb.from("ceo_ratings").select("*").gte("month", from).lte("month", to); return r.error ? [] : r.data; },
      async setCeoRating(month, ceo_id, score, note) { chk(await sb.from("ceo_ratings").upsert({ month, ceo_id, score, note: note || "", updated_at: new Date().toISOString() }, { onConflict: "month,ceo_id" })); return true; },
      async getSettings() { const r = await sb.from("portal_settings").select("key,value"); return r.error ? {} : Object.fromEntries((r.data || []).map(x => [x.key, x.value])); },
      async setSetting(key, value) { chk(await sb.from("portal_settings").upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" })); return true; },
      async saveAkademikObs(day, rows) { chk(await sb.rpc("save_akademik_obs", { d: day, rows })); return true; },
      async listTeacherEditors() { const r = await sb.from("teacher_editors").select("*"); return r.error ? [] : r.data; },
      async setTeacherKind(id, kind) { chk(await sb.rpc("set_teacher_kind", { tid: id, kind })); return true; },
      async setTeacherLead(id, v) { chk(await sb.rpc("set_teacher_lead", { tid: id, klass: v })); return true; },
      async updateTeacher(id, patch) { chk(await sb.from("teachers").update(patch).eq("id", id)); return true; },
      async deleteTeacher(id) { chk(await sb.from("teachers").delete().eq("id", id)); return true; },
      async mergeTeachers(keep, others) { chk(await sb.rpc("merge_teachers", { keep, others })); return true; },
      // ---- Ta'til kunlari va avtomatik bo'sh kompyuter qoidalari
      async listLeaves(from, to) { return chk(await sb.from("staff_leaves").select("*").gte("to_day", from).lte("from_day", to).order("from_day")); },
      async addLeaves(rows) { chk(await sb.from("staff_leaves").insert(rows)); return true; },
      async delLeave(id) { chk(await sb.from("staff_leaves").delete().eq("id", id)); return true; },
      async listMetRules() { const r = await sb.from("metod_pc_rules").select("*"); return r.error ? [] : r.data; },
      // ---- Metodistlar vaqti
      async listMetPcs(from, to) { return chk(await sb.from("metod_pcs").select("*").gte("day", from).lte("day", to)); },
      async openMetPc(day, owner_id, from_time) { const r = chk(await sb.from("metod_pcs").insert({ day, owner_id, from_time }).select().single()); return r; },
      async closeMetPc(id) { chk(await sb.from("metod_pcs").delete().eq("id", id)); return true; },
      async listMetBookings(from, to) { return chk(await sb.from("metod_bookings").select("*").gte("day", from).lte("day", to).order("start_t")); },
      async bookMet(row) { return chk(await sb.from("metod_bookings").insert(row).select().single()); },
      async cancelMet(id) { chk(await sb.from("metod_bookings").update({ status: "bekor" }).eq("id", id)); return true; },
      async listMetFeedback() { const r = await sb.from("metod_feedback").select("*").order("created_at", { ascending: false }).limit(1000); return r.error ? [] : r.data; },
      async sendMetFeedback(booking_id, f) { chk(await sb.from("metod_feedback").insert({ booking_id, ...f })); return true; },
      async listKpiRange(from, to) {
        const [a, b, c, w] = await Promise.all([pageAll(() => sb.from("kpi_scores").select("*").gte("period_start", from).lte("period_start", to).order("period_start").order("user_id").order("criterion")),
          pageAll(() => sb.from("kpi_final").select("*").gte("period_start", from).lte("period_start", to).order("period_start").order("user_id")),
          pageSoft(() => sb.from("kpi_daily").select("*").gte("day", from).lte("day", to).order("day").order("user_id").order("criterion")),
          pageSoft(() => sb.from("kpi_week").select("*").gte("week_start", from).lte("week_start", to).order("week_start").order("user_id").order("criterion"))]);
        return { scores: a, finals: b, daily: c, week: w };
      },
      async setKpiAt(lvl, date, user_id, criterion, score, note) {
        if (lvl === "bosqich") return this.setKpiScore(date, user_id, criterion, score, note);
        const tbl = lvl === "kun" ? "kpi_daily" : "kpi_week", col = lvl === "kun" ? "day" : "week_start";
        if (score === null && note !== undefined && !note) { chk(await sb.from(tbl).delete().match({ [col]: date, user_id, criterion })); return true; }
        const body = { [col]: date, user_id, criterion, score }; if (note !== undefined) body.note = note;
        chk(await sb.from(tbl).upsert(body, { onConflict: col + ",user_id,criterion" })); return true;
      },
      async listKpi(period) {
        const [a, b] = await Promise.all([pageAll(() => sb.from("kpi_scores").select("*").eq("period_start", period).order("user_id").order("criterion")), pageAll(() => sb.from("kpi_final").select("*").eq("period_start", period).order("user_id"))]);
        return { scores: a, finals: b };
      },
      async setKpiScore(period, user_id, criterion, score, note) {
        if (score === null && note !== undefined && !note) { chk(await sb.from("kpi_scores").delete().match({ period_start: period, user_id, criterion })); return true; }
        const body = { period_start: period, user_id, criterion, score }; if (note !== undefined) body.note = note;
        chk(await sb.from("kpi_scores").upsert(body, { onConflict: "period_start,user_id,criterion" })); return true;
      },
      async setKpiFinal(period, user_id, final_score) {
        if (final_score === null) { chk(await sb.from("kpi_final").delete().match({ period_start: period, user_id })); return true; }
        chk(await sb.from("kpi_final").upsert({ period_start: period, user_id, final_score }, { onConflict: "period_start,user_id" })); return true;
      },
      async listStaffInfo() { return chk(await sb.from("staff_info").select("phone, photo, details, bio")); },
      async listStaffImport() { return chk(await sb.from("staff_import").select("*").eq("created", false).order("id")); },
      async markImported(id) { chk(await sb.from("staff_import").update({ created: true }).eq("id", id)); return true; },
      async adminSetPassword(uid, pw) { chk(await sb.rpc("admin_set_password", { uid, new_password: pw })); return true; },
      async listVideos() { return chk(await sb.from("videos").select("*").order("created_at", { ascending: false })); },
      async createVideo(v) {
        let storage_path = null;
        if (v.file) {
          const ext = (v.file.name.split(".").pop() || "mp4").toLowerCase();
          storage_path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
          const up = await sb.storage.from("videos").upload(storage_path, v.file, { contentType: v.file.type || "video/mp4", upsert: false });
          if (up.error) throw new Error(/exceeded|too large|size/i.test(up.error.message) ? "Fayl juda katta (50 MB dan oshmasin). Katta videoni YouTube'ga yuklab, havolasini qo'ying." : up.error.message);
        }
        return chk(await sb.from("videos").insert({ title: v.title, description: v.description, kind: v.kind, url: v.url || "",
          storage_path, audience: v.audience, created_by: meCache.id }).select().single());
      },
      async deleteVideo(v) {
        if (v.storage_path) await sb.storage.from("videos").remove([v.storage_path]);
        chk(await sb.from("videos").delete().eq("id", v.id)); return true;
      },
      async videoUrl(v) {
        if (v.kind !== "file") return v.url;
        const r = await sb.storage.from("videos").createSignedUrl(v.storage_path, 3 * 3600);
        if (r.error) throw new Error("Videoni ochib bo'lmadi: " + r.error.message);
        return r.data.signedUrl;
      },
      async listPosts() {
        const rows = chk(await sb.from("posts").select("*, post_comments(count)").order("created_at", { ascending: false }).limit(300));
        return rows.map(r => ({ ...r, comment_count: r.post_comments?.[0]?.count || 0 }));
      },
      async createPost(p) { return chk(await sb.from("posts").insert({ category: p.category, body: p.body, link: p.link || "", images: p.images || [], author_id: meCache.id }).select().single()); },
      async uploadImage(blob) {
        const path = `${meCache.id}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;
        const up = await sb.storage.from("rasmlar").upload(path, blob, { contentType: "image/jpeg", upsert: false });
        if (up.error) throw new Error("Rasm yuklanmadi: " + up.error.message); return path;
      },
      async signedUrls(paths) {
        const out = {}; const ext = paths.filter(p => /^(data:|https?:)/.test(p)); ext.forEach(p => out[p] = p);
        const own = paths.filter(p => !ext.includes(p)); if (!own.length) return out;
        const r = await sb.storage.from("rasmlar").createSignedUrls(own, 3600); (r.data || []).forEach(x => { if (x.signedUrl) out[x.path] = x.signedUrl; }); return out;
      },
      async updatePost(id, patch) { return chk(await sb.from("posts").update(patch).eq("id", id).select().single()); },
      async deletePost(id) { chk(await sb.from("posts").delete().eq("id", id)); return true; },
      async listComments(postId) { return chk(await sb.from("post_comments").select("*").eq("post_id", postId).order("created_at")); },
      async addComment(postId, body, images) { return chk(await sb.from("post_comments").insert({ post_id: postId, body, images: images || [], author_id: meCache.id }).select().single()); },
      async reviewReport(id, status, note) {
        return chk(await sb.from("daily_reports").update({ status, reviewer_note: note || "" }).eq("id", id).select().single());
      }
    };
  }

  window.createDB = function () {
    if (cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY) {
      if (!window.supabase) throw new Error("Supabase kutubxonasi yuklanmadi");
      return SupaDB();
    }
    return DemoDB();
  };
})();
