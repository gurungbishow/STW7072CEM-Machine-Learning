#!/usr/bin/env python3
import os
import re

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TEX_PATH = os.path.join(BASE_DIR, "report", "main.tex")

with open(TEX_PATH, "r", encoding="utf-8") as f:
    tex = f.read()

body = tex.split(r"\begin{document}")[1].split(r"\begin{thebibliography}")[0]
body = re.sub(r"(?<!\\)%.*", "", body)
for env in ["table", "table*", "figure", "figure*", "equation", "align", "aligned", "tabular"]:
    body = re.sub(r"\\begin\{" + re.escape(env) + r"\}.*?\\end\{" + re.escape(env) + r"\}", " ", body, flags=re.DOTALL)

body = re.sub(r"\\texorpdfstring\{[^}]*\}\{[^}]*\}", " ", body)
s = re.sub(r"\$[^$]+\$", " ", body)
for cmd in ["label", "ref", "cite", "texttt", "href", "url"]:
    s = re.sub(r"\\" + cmd + r"\{[^}]*\}", " ", s)
s = re.sub(r"\\addcontentsline\{[^}]*\}\{[^}]*\}\{[^}]*\}", " ", s)
s = re.sub(r"\\setcounter\{[^}]*\}\{[^}]*\}", " ", s)
s = re.sub(r"\\[a-zA-Z]+\*?(\[[^\]]*\])?", " ", s)
words = re.findall(r"[A-Za-z][A-Za-z\-]*", s)
print(f"Verified Main-Body Prose Word Count: {len(words):,} words (Target: 4,800-5,300; Brief Limit: <= 6,000)")
