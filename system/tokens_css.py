# Generates tokens.css from tokens.json (stdlib). Usage, from the root: python3 system/tokens_css.py system/tokens.json > system/tokens.css
import json, re, sys
t = json.load(open(sys.argv[1]))
v = lambda s: re.sub(r"\{([\w-]+)\}", r"var(--\1)", s)
a = [f"  --{x['name']}: {v(x['value'])};" for k in ("color", "shadow") for x in t[k]["tokens"]]
b = [f"  --{x['name']}: {x['value']};" for k in ("spacing", "radius") for x in t[k]["tokens"]]
b += [f"  --font-{k}: {f};" for k, f in t["type"]["families"].items()]
print(f"/* Aparato — variables from tokens.json (version {t['version']}) */")
print(':root, [data-theme="light"] {', *a, "}", ":root {", *b, "}", sep="\n")
