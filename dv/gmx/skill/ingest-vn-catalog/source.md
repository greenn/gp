---
name: ingest-vn-catalog
description: >-
  Ingest visual novels into the gmx catalog from a wrapper folder of many games
  or a single game folder. Moves screenshots/logs, copies saves, records
  developer/version/play metadata in SQLite. Use when the user passes a VN
  wrapper path, a game folder, asks to ingest/import visual novels, or mentions
  gmx db, screenshots, logs, saves, more extras, kebab-case slugs, src folder,
  collecting new screenshots, --sync, or deleting the source after ingest.
  Folder named `=` is AI-converted photos and goes to src/<slug>/ai, never screenshots or more.
---

# Импорт визуальных новелл в каталог gmx

Рабочий проект: `J:\dv\gmx`. Каталог: `J:\dv\gmx\db\catalog.sqlite`. Постоянный физический корень логического `src` находится на внешнем SSD: `S:\dvb\gmx`. Пути `src/<slug>/...` в базе и инструкциях означают `S:\dvb\gmx\<slug>\...`. Все данные VN копировать и переносить туда. Если SSD или каталог недоступны, остановиться и сообщить пользователю; не создавать замену в проекте.

Категории (рядом в корне проекта, `games.category`):

| category | Куда на диске |
|---|---|
| `vn` | `src/<slug>/` — визуальные новеллы |
| `мульт` | `мульты/<slug>/` — мультфильмы/OVA |
| `материалы` | `материалы/<имя>/` — сейчас `материалы/env` (планы) |

Медиа VN постоянно хранится на внешнем SSD; другие категории остаются в указанных папках проекта. Не делать junction из `db\`. У мультов AI-фото → `мульты/<slug>/ai`, не screenshots.

## Когда применять

Пользователь даёт:

- **wrapper** — папка с несколькими VN (`L:\gmx-2j`);
- **одну игру** — папка конкретной VN (Ren'Py/`game+renpy`, Unity `*_Data`, GameMaker `data.win`);
- опционально просит **удалить исходную папку** после успеха.

## Запуск

Скрипт делает перенос/копирование и пишет базу. Агент после прогона добирает разработчика из интернета, если скрипт печатает `NEED_WEB_DEVELOPER`.

```bash
python J:/dv/gmx/tools/ingest_vn.py "PATH"
python J:/dv/gmx/tools/ingest_vn.py "PATH" --mode wrapper
python J:/dv/gmx/tools/ingest_vn.py "PATH" --mode game
python J:/dv/gmx/tools/ingest_vn.py "PATH" --copy-more
python J:/dv/gmx/tools/ingest_vn.py "PATH" --delete-source
python J:/dv/gmx/tools/ingest_vn.py "PATH" --sync
```

- `--mode auto` (по умолчанию): если в корне уже игра — одна игра; если ≥2 игровых подпапок — wrapper.
- `--copy-more`: скопировать папку `more` в `src/<slug>/more`. Ставить, если пользователь **планирует удалить** исходник (даже если удаление ещё не в этом запуске).
- `--delete-source`: удалить **переданную** папку целиком только если все игры прошли без ошибок. Сам включает `--copy-more`. Не ставить флаг, пока пользователь явно не попросил удалить.
- `--sync`: **уже в каталоге**. Только **переместить новые** `screenshots`/`logs` в `src/<slug>/`. Сейвы не копировать, `more` не трогать, исходник не удалять. PATH — **одна игра или wrapper**. Для wrapper пройти все игровые подпапки: что в базе — sync; чего нет — `SKIP` (не импортировать). `--mode auto` сам отличит wrapper.

## Собрать новые скриншоты после прохождения

Игру оставляем установленной. Сначала импорт в базу (без `--delete-source`). Потом пользователь играет, делает скрины. Затем одна игра или вся папка-враппер:

```
/ingest-vn-catalog --sync D:\gmx
/ingest-vn-catalog --sync "C:\_\gmx\Away From Home"
```

Не создавать отдельный скилл: это тот же каталог.

Отчёт: `J:\dv\gmx\db\last_ingest.json`.

## Правила файлов

| Что | Действие | Куда |
|---|---|---|
| `screenshots` / `screenshot` | **переместить** | `src/<slug>/screenshots` |
| папка `=` (фото, прогнанные через AI) | **переместить** | `src/<slug>/ai` — не screenshots и не more |
| `logs` (диалоги новеллы, не `log.txt` движка) | **переместить** | `src/<slug>/logs` |
| `game/saves`, AppData Ren'Py, Unity `Saves`, Last Man `%LOCALAPPDATA%\LAST_MAN` | **копировать** | `src/<slug>/saves/...` |
| `more` (extras, если папка есть) | **копировать**, только если планируется удаление исходника | `src/<slug>/more` |
| exe, `renpy/`, картинки игры | не трогать | остаются в источнике до `--delete-source` |

Не копировать `Player.log` Unity. Не рекурсировать `renpy/`, `lib/`, `screenshots/`, `more/`, `=` при поиске корня игры. Папки `more` и `=` не считать отдельной игрой. Папку `=` не класть в screenshots и не в more.

Дампа остатков (папка с именами игр, не полноценный wrapper): `scr` → screenshots; просто картинки в папке игры → screenshots; прочие файлы → more; ярлыки игнорировать и удалять пустое; папка `=` → `ai`. Если пользователь сказал, что дамп — автоматические AI-фото, **все** картинки включая подпапки → `src/<slug>/ai`, не screenshots. Неясное — пропуск.

`games.folder` — логический путь: `src/<slug>` для VN, `мульты/<slug>` для мультов, `материалы/env` для планов. Перенос с внешнего диска — в папку категории, не в чужую.

## Слаг, версия, разработчик

- Слаг: kebab-case, ≤ 32 символов, из названия игры / папки.
- Версия, приоритет: `_version` в `.save` → `options.rpy` `config.version` → строка версии в `log.txt` → намёк из имени папки. Несколько версий в сейвах (например `0.3_Brisbane` и `0.4.5_`) записать все в `versions.save_versions_json`.
- Разработчик: `gui.about`, CompanyName exe, затем **поиск в интернете** (itch/Steam/vndb) по title+version. `DefaultCompany` игнорировать. Обновить `developers` и `games.developer_id`.

## Чеклист агента

```
- [ ] Определить wrapper vs одна игра; обычный импорт vs --sync
- [ ] Запустить ingest_vn.py (без --delete-source, пока не просили)
- [ ] Если только новые скрины — --sync на игру или на wrapper (один запуск)
- [ ] Если просили потом удалить исходник — первый прогон с --copy-more
- [ ] Прочитать last_ingest.json
- [ ] Для NEED_WEB_DEVELOPER найти студию и дописать в SQLite
- [ ] Кратко отчитаться: slug, version, shots/logs/saves/more, first/last; для --sync — сколько новых
- [ ] Если просили удалить — повторный запуск с --delete-source только после успеха
```

После веб-поиска:

```sql
INSERT OR IGNORE INTO developers (name, website, notes) VALUES (?, ?, ?);
UPDATE games SET developer_id = (SELECT id FROM developers WHERE name=?) WHERE slug=?;
```

## Чего не делать

- Не перемещать сейвы из AppData/игры — только копия.
- Не удалять источник при ошибках скрипта.
- Не удалять исходник, пока `more` не скопирована в `src/<slug>/more` (если такая папка была).
- Не импортировать торрент-`.dat`, `Wallpapers`, PDF-гайды как ассеты каталога (кроме содержимого `more` при удалении).
- Не выдумывать playtime: только ` _game_runtime` из сейвов или NULL.

Подробности схемы: [reference.md](reference.md).

