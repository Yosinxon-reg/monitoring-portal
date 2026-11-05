// =====================================================================
// Yangi o'zbek alifbosi (2026-yil 21-oktabr qonuni): Oʻ→Ö, Gʻ→Ğ, Sh→Ş, Ch→Ç
// Portal ekranga chiqaradigan barcha matn shu yerda yangi alifboga o'giriladi.
// Bazadagi ma'lumot o'zgarmaydi (eski yozuvda qoladi) — shuning uchun solishtirish,
// ballar va reyting avvalgidek ishlaydi. Kiritilgan yangi harflar saqlashdan oldin
// eski shaklga keltiriladi (ş → sh), ekranda esa yana yangi alifboda ko'rinadi.
// =====================================================================
(function () {
  "use strict";
  var WRD = /[A-Za-z'‘’ʻ`´ʼ]+/g;
  var SKIPCH = /@|:\/\/|www\.|^#\/|\.(uz|com|io|org|ru|net|html?|js|css|pdf|xlsx?|csv|mp4|mov|jpe?g|png|docx?)\b/i;
  // Chet tilidagi so'zlar va nomlar — o'zgarmaydi
  var EXC = new Set(["chrome", "chat", "chatgpt", "shorts", "short", "dashboard", "dashboards", "push", "shift", "sheets", "sheet",
    "flash", "refresh", "search", "match", "branch", "english", "teacher", "teachers", "show", "should", "cache", "tech", "schema",
    "check", "checkbox", "touch", "watch", "coach", "hashtag", "fresh", "chart", "charts", "school", "sharepoint", "chromebook", "macbook"]);
  var OG = { o: "ö", O: "Ö", g: "ğ", G: "Ğ" };
  function word(w) {
    if (!/[oOgGsScC]/.test(w)) return w;
    if (EXC.has(w.replace(/['‘’ʻ`´ʼ]/g, "").toLowerCase())) return w;
    return w.replace(/([oOgG])['‘’ʻ`´ʼ](?=[A-Za-z])/g, function (m, c) { return OG[c]; })
      .replace(/S[hH]/g, "Ş").replace(/s[hH]/g, "ş").replace(/C[hH]/g, "Ç").replace(/c[hH]/g, "ç");
  }
  function yA(s) {
    if (typeof s !== "string" || !/[oOgGsScC]/.test(s)) return s;
    return s.split(/(\s+)/).map(function (ch) { return !ch.trim() || SKIPCH.test(ch) ? ch : ch.replace(WRD, word); }).join("");
  }
  // Yangi harflarni eski shaklga (bazaga yozish va qidirish uchun)
  function eski(s) {
    if (typeof s !== "string" || !/[ŞşÇçĞğÖö]/.test(s)) return s;
    return s.replace(/Ş/g, "Sh").replace(/ş/g, "sh").replace(/Ç/g, "Ch").replace(/ç/g, "ch")
      .replace(/Ğ/g, "G'").replace(/ğ/g, "g'").replace(/Ö/g, "O'").replace(/ö/g, "o'");
  }
  // HTML satri (chop etish oynalari uchun): faqat teglar orasidagi matn o'giriladi
  function alifHtml(h) {
    return String(h).split(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]*>)/i)
      .map(function (p, i) { return i % 2 ? p : yA(p.replace(/&#0?39;|&apos;/g, "'")); }).join("");
  }
  // Excel eksport
  function alifXlsx(X) {
    if (!X || !X.utils || X.__alif) return X;
    var cv = function (c) { return typeof c === "string" ? yA(c) : c; };
    var a2s = X.utils.aoa_to_sheet, bas = X.utils.book_append_sheet, j2s = X.utils.json_to_sheet;
    X.utils.aoa_to_sheet = function (aoa, o) { return a2s.call(X.utils, (aoa || []).map(function (r) { return Array.isArray(r) ? r.map(cv) : r; }), o); };
    X.utils.book_append_sheet = function (wb, ws, n) { return bas.call(X.utils, wb, ws, typeof n === "string" ? yA(n).slice(0, 31) : n); };
    if (j2s) X.utils.json_to_sheet = function (rows, o) { return j2s.call(X.utils, (rows || []).map(function (r) { var x = {}; Object.keys(r).forEach(function (k) { x[yA(k)] = cv(r[k]); }); return x; }), o); };
    X.__alif = true; return X;
  }
  window.yA = yA; window.alifEski = eski; window.alifHtml = alifHtml; window.alifXlsx = alifXlsx;

  // ---- Ekrandagi matn
  var SKIPTAG = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, NOSCRIPT: 1, CODE: 1, INPUT: 1 };
  var ATTRS = ["placeholder", "title", "aria-label", "alt", "data-tip"];
  function attrs(el) {
    if (!el.getAttribute) return;
    for (var i = 0; i < ATTRS.length; i++) { var v = el.getAttribute(ATTRS[i]); if (v) { var y = yA(v); if (y !== v) el.setAttribute(ATTRS[i], y); } }
    if (el.tagName === "INPUT" && /^(button|submit|reset)$/i.test(el.type || "")) { var b = el.value, yb = yA(b); if (yb !== b) el.value = yb; }
  }
  // <option> ning qiymati (value) ko'rsatilmagan bo'lsa — matni qiymat bo'ladi. Matn o'girilganda qiymat o'zgarib, bazaga yangi harflar
  // bilan tushmasligi uchun asl matnni value'ga yozib qo'yamiz (2026-11-04 tuzatish: filial va holat turlari «Fağona», «Çilonzor» bo'lib qolardi)
  function txt(n) { var v = n.data, y = yA(v); if (y === v) return; var p = n.parentNode;
    if (p && p.tagName === "OPTION" && !p.hasAttribute("value")) p.setAttribute("value", p.textContent);
    n.data = y; }
  function skipped(n) {
    for (var e = n.nodeType === 1 ? n : n.parentNode; e && e.nodeType === 1; e = e.parentNode)
      if (SKIPTAG[e.tagName] || e.isContentEditable || e.hasAttribute("data-noalif")) return true;
    return false;
  }
  var FILTER = { acceptNode: function (n) {
    if (n.nodeType === 1) {
      if (SKIPTAG[n.tagName]) { if (n.tagName === "INPUT" || n.tagName === "TEXTAREA") attrs(n); return NodeFilter.FILTER_REJECT; }
      if (n.isContentEditable || n.hasAttribute("data-noalif")) return NodeFilter.FILTER_REJECT;
      attrs(n); return NodeFilter.FILTER_SKIP;
    }
    return NodeFilter.FILTER_ACCEPT;
  } };
  function walk(root) {
    if (!root) return;
    if (root.nodeType === 3) { if (!skipped(root)) txt(root); return; }
    if (root.nodeType !== 1) return;
    if (skipped(root)) { if (root.tagName === "INPUT" || root.tagName === "TEXTAREA") attrs(root); return; }
    attrs(root);
    var tw = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, FILTER), t;
    while ((t = tw.nextNode())) txt(t);
  }
  function start() {
    walk(document.documentElement);
    new MutationObserver(function (ms) {
      for (var i = 0; i < ms.length; i++) {
        var m = ms[i];
        if (m.type === "childList") for (var j = 0; j < m.addedNodes.length; j++) walk(m.addedNodes[j]);
        else if (m.type === "characterData") { if (!skipped(m.target)) txt(m.target); }
        else if (m.type === "attributes") attrs(m.target);
      }
    }).observe(document.documentElement, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  }
  if (document.documentElement) start(); else document.addEventListener("DOMContentLoaded", start);

  // ---- Brauzer oynalari (tasdiqlash, ogohlantirish)
  ["alert", "confirm", "prompt"].forEach(function (k) {
    var o = window[k]; if (!o) return;
    window[k] = function (m) { var a = [].slice.call(arguments); a[0] = yA(String(m == null ? "" : m)); return o.apply(window, a); };
  });
  // ---- Chop etish / PDF oynalari
  var oo = window.open;
  window.open = function () {
    var w = oo.apply(window, arguments);
    try { if (w && w.document) { var d = w.document, ow = d.write; d.write = function () { return ow.apply(d, [].map.call(arguments, alifHtml)); }; } } catch (e) {}
    return w;
  };
  // ---- Kiritish: ş, ç, ğ, ö yozilsa — bazaga eski shaklda tushadi (qidiruv va o'qituvchilar bazasi bir xil ishlaydi)
  document.addEventListener("input", function (e) {
    var el = e.target; if (!el) return;
    var ok = el.tagName === "TEXTAREA" || (el.tagName === "INPUT" && /^(text|search|)$/i.test(el.getAttribute("type") || ""));
    if (!ok) return;
    var v = el.value; if (!/[ŞşÇçĞğÖö]/.test(v)) return;
    var s = el.selectionStart, pre = s == null ? null : eski(v.slice(0, s)).length;
    el.value = eski(v);
    if (pre !== null) try { el.setSelectionRange(pre, pre); } catch (_) {}
  }, true);
})();
