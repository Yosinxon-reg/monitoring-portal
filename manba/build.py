# Portalni yig'ish: python build.py
#   monitoring-portal.html — hammasi bitta faylda (yuborish va oflayn ochish uchun)
#   deploy/index.html      — saytga joylanadigan nusxa; Supabase kutubxonasi alohida deploy/lib-supabase.js faylida
#                            (u deyarli o'zgarmaydi — brauzer keshida qoladi, har yangilanishda qayta yuklanmaydi)
import re, os, shutil
root = os.path.dirname(os.path.abspath(__file__))
rd = lambda p: open(os.path.join(root, p), encoding="utf-8").read()

def build(split_lib):
    html = rd("index.html")
    html = html.replace('<link rel="stylesheet" href="css/style.css">', "<style>\n" + rd("css/style.css") + "\n</style>")
    def inline(m):
        src = m.group(1)
        if split_lib and src == "js/supabase.js":
            return '<script src="lib-supabase.js"></script>'
        return "<script>\n" + rd(src) + "\n</script>"
    return re.sub(r'<script src="(js/[^"]+)"></script>', inline, html)

one = build(False)
open(os.path.join(root, "monitoring-portal.html"), "w", encoding="utf-8").write(one)
os.makedirs(os.path.join(root, "deploy"), exist_ok=True)
dep = build(True)
open(os.path.join(root, "deploy/index.html"), "w", encoding="utf-8").write(dep)
shutil.copyfile(os.path.join(root, "js/supabase.js"), os.path.join(root, "deploy/lib-supabase.js"))
print("ok", len(one), "| deploy/index.html", len(dep), "+ lib-supabase.js", os.path.getsize(os.path.join(root, "js/supabase.js")))
