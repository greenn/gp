#!/usr/bin/env python3
"""Create two private, self-contained offline HTML pages from GP sources.

No HTTP server, no cloud, and no access-code prompt inside either HTML page.
Never commit the output: it contains the original decrypted class data.
"""
from __future__ import annotations

import base64
import getpass
import hashlib
import json
import os
import re
import sys
from pathlib import Path

try:
    from cryptography.hazmat.primitives.ciphers.aead import AESGCM
except ImportError:
    raise SystemExit("Install dependency once: python -m pip install cryptography")

ROOT = Path(__file__).resolve().parents[2]
PRIVATE_ROOT = ROOT.parent / "gp-local"
CODE_FILE = ROOT.parent / ".gp-local-codes.json"

ATTENDANCE = ROOT / "шк" / "res-6-1-2627"
TRIP = ROOT / "шк" / "поездка-1026"


def source(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def credentials() -> dict[str, str]:
    codes: dict[str, str] = {}
    if CODE_FILE.exists():
        codes = json.loads(source(CODE_FILE))
    attendance = os.environ.get("GP_ATTENDANCE_CODE") or codes.get("attendance")
    trip = os.environ.get("GP_TRIP_CODE") or codes.get("trip")
    if not attendance:
        attendance = getpass.getpass("Код исходной базы посещаемости (один раз): ")
    if not trip:
        trip = getpass.getpass("Код исходной базы поездки (один раз): ")
    if not attendance or not trip:
        raise SystemExit("Необходимо указать оба кода для расшифровки исходных данных.")
    updated = {"attendance": attendance, "trip": trip}
    if not CODE_FILE.exists():
        CODE_FILE.write_text(json.dumps(updated, ensure_ascii=False, indent=2), encoding="utf-8")
        try:
            CODE_FILE.chmod(0o600)
        except OSError:
            pass
        print("Коды сохранены только на этом компьютере:", CODE_FILE)
    return updated


def decrypt(path: Path, code: str, *, upper: bool = False) -> dict:
    envelope = json.loads(source(path))
    if envelope.get("alg") != "AES-256-GCM" or envelope.get("kdf") != "PBKDF2-SHA256":
        raise ValueError(f"Неизвестный формат зашифрованной базы: {path}")
    material = (code.strip().upper() if upper else code.strip()).encode("utf-8")
    salt = base64.b64decode(envelope["salt"])
    iv = base64.b64decode(envelope["iv"])
    ciphertext = base64.b64decode(envelope["ciphertext"])
    key = hashlib.pbkdf2_hmac("sha256", material, salt, int(envelope["iterations"]), 32)
    try:
        raw = AESGCM(key).decrypt(iv, ciphertext, None)
    except Exception as exc:
        raise ValueError(f"Неверный код или повреждена исходная база: {path.name}") from exc
    return json.loads(raw.decode("utf-8"))


def js_json(value: object) -> str:
    # Script-safe JSON, preserving every original value.
    return (json.dumps(value, ensure_ascii=False, separators=(",", ":"))
            .replace("&", "\\u0026").replace("<", "\\u003c")
            .replace(">", "\\u003e").replace("\u2028", "\\u2028")
            .replace("\u2029", "\\u2029"))


def bundle_html(html_path: Path, styles: list[Path], scripts: list[str],
                bootstrap: str) -> str:
    html = source(html_path)
    html = re.sub(r'<link\s+rel="stylesheet"\s+href="[^"]+"\s*/?>', "", html)
    html = re.sub(r'<script\s+src="[^"]+"\s+defer></script>', "", html)
    css = "\n".join(source(path) for path in styles)
    if "</style" in css.lower():
        raise ValueError("Небезопасный CSS: closing style tag")
    html = html.replace("</head>", "<style>\n" + css + "\n</style>\n</head>", 1)
    all_scripts = [bootstrap, *scripts]
    for script in all_scripts:
        if "</script" in script.lower():
            raise ValueError("Небезопасный JS: closing script tag")
    inline = "\n".join("<script>\n" + script + "\n</script>" for script in all_scripts)
    if "</body>" not in html:
        raise ValueError("В исходном HTML отсутствует </body>")
    return html.replace("</body>", inline + "\n</body>", 1)


def build_attendance(data: dict) -> str:
    if not isinstance(data.get("students"), list) or len(data["students"]) != 21:
        raise ValueError("Изменился состав исходной базы посещаемости.")
    seed = """window.__GP_LOCAL_ATTENDANCE = """ + js_json(data) + """;
try {
  const k = 'gp.pb-2627-1.attendance.v1';
  const value = localStorage.getItem(k);
  if (!value) localStorage.setItem(k, JSON.stringify(window.__GP_LOCAL_ATTENDANCE));
} catch (_) {}"""
    app = source(ATTENDANCE / "app.js")
    needle = "const saved=localStorage.getItem(KEY);if(saved)state=normalize(JSON.parse(saved));"
    replacement = needle + "else if(window.__GP_LOCAL_ATTENDANCE)state=normalize(window.__GP_LOCAL_ATTENDANCE);"
    if app.count(needle) != 1:
        raise ValueError("Не найден блок загрузки посещаемости в app.js")
    app = app.replace(needle, replacement)
    return bundle_html(
        ATTENDANCE / "index.html", [ATTENDANCE / "style.css"], [app], seed
    )


def build_trip(data: dict) -> str:
    people = data.get("people")
    if not isinstance(people, list) or len(people) != 22:
        raise ValueError("Изменился состав исходной базы поездки.")
    if sum(p.get("role") == "student" for p in people) != 20:
        raise ValueError("Неверное количество учащихся в базе поездки.")
    seed = """window.__GP_LOCAL_TRIP_ROSTER = """ + js_json(people) + """;
try {
  const k = 'gp.trip-1026.roster.v1';
  if (!localStorage.getItem(k)) localStorage.setItem(k, JSON.stringify(window.__GP_LOCAL_TRIP_ROSTER));
} catch (_) {}"""
    bus = source(TRIP / "bus.js")
    old = ("try{const response=await fetch('./bus-panel.html',{cache:'no-store'});"
           "if(!response.ok)throw Error('HTTP '+response.status);"
           "busView.innerHTML=await response.text()}")
    replacement = "try{busView.innerHTML=window.__GP_LOCAL_BUS_PANEL}"
    if bus.count(old) != 1:
        raise ValueError("Не найден блок загрузки автобуса в bus.js")
    bus = bus.replace(old, replacement)
    panel = "window.__GP_LOCAL_BUS_PANEL = " + js_json(source(TRIP / "bus-panel.html")) + ";"
    app = source(TRIP / "app.js")
    ending = app.rfind("(async()=>{")
    if ending == -1:
        raise ValueError("Не найдена процедура запуска страницы поездки.")
    app = app[:ending] + """(() => {
  const rows = readRoster() || window.__GP_LOCAL_TRIP_ROSTER;
  if (rows) { applyPeople(rows); forgetOldCodes(); }
  else missingRoster();
})();
})();"""
    return bundle_html(
        TRIP / "index.html", [TRIP / "style.css", TRIP / "bus.css"],
        [bus, app, source(TRIP / "swap-quests.js")], seed + "\n" + panel
    )


def main() -> None:
    codes = credentials()
    attendance_data = decrypt(
        ATTENDANCE / "initial-data.enc.json", codes["attendance"]
    )
    trip_data = decrypt(TRIP / "roster.enc.json", codes["trip"], upper=True)
    pages = {
        "attendance.html": build_attendance(attendance_data),
        "trip.html": build_trip(trip_data),
    }
    PRIVATE_ROOT.mkdir(parents=True, exist_ok=True)
    for name, html in pages.items():
        target = PRIVATE_ROOT / name
        target.write_text(html, encoding="utf-8")
        print("Готово:", target)
    print("Откройте HTML двойным щелчком. Данные находятся только в этих локальных файлах.")
    print("Не публикуйте папку gp-local в GitHub Pages и не пересылайте её посторонним.")


if __name__ == "__main__":
    try:
        main()
    except (ValueError, OSError, json.JSONDecodeError) as exc:
        raise SystemExit(str(exc)) from exc
