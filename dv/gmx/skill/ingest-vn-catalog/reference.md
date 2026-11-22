# Схема каталога gmx

Файл: `J:\dv\gmx\db\catalog.sqlite`

## Таблицы

- `developers(id, name, website, notes)`
- `games(..., category, downloaded, rating_models, rating_story, rating_variations, rating_corrupt, rate_my, rate_num2, rate_num3)` — `vn` / `мульт` / `материалы`. `downloaded`: `1` скачивалась, `0` ещё нет. Оценки из личного списка: модели / история / вариации / corrupt. `rate_my` — буквенная пометка из имени (`2s`, `1cs`). `rate_num2` / `rate_num3` — дву- и трёхзначные числа из ссылок/торрентов.
- `assets(game_id, kind, relative_path, file_count)` — kind: `screenshots`, `logs`, `saves`, `saves-appdata`, `saves-unity`, `saves-local`, `more`
- `versions(game_id, installed_version, installed_source, save_versions_json, confidence, notes)`
- `play_meta(...)` — даты из скриншотов/логов/сейвов/`persistent`/`log.txt`

`folder` = логический путь: `src/<slug>` физически находится в `S:\dvb\gmx\<slug>` на внешнем SSD; игры `src/<slug>`, мульты `мульты/<slug>`, материалы `материалы/<имя>`. Ассеты игр: `screenshots`, `logs`, `saves`, при удалении исходника ещё `more`. Папка `=` и AI-дампы — в `ai`, не screenshots/more и не как kind в `assets`.

## Как отличить игру от wrapper

Корень игры: есть `renpy/`+`game/`, или `*_Data`, или `data.win`, или сразу `screenshots`/`logs` рядом с exe.

Wrapper: несколько таких детей (иногда игра вложена на 1–3 уровня, как `Foo/PC/Foo PC`).

## Источники метаданных

- Ren'Py `game/options.rpy`: `config.name`, `config.version`, `config.save_directory`, `build.name`, `gui.about`
- `log.txt`: заголовок = старт последней сессии; у новых сборок ниже имя и версия
- `.save` zip → `json`: `_version`, `_game_runtime`, `_ctime`
- `%APPDATA%\RenPy\<save_directory>`
- Unity `%USERPROFILE%\AppData\LocalLow\DefaultCompany\<Product>\Saves`

