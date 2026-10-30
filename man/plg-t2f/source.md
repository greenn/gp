# T2F 0.10.4 — режим 11: Fashion Series

Обновлено: 20 октября 2026. Новый режим использует приложенный авторский универсальный промпт **v0.2** (сохранён в приватном пакете `skills/fashion-series-11/references/universal_fashion_prompt_v0.2.md`).

## Обязательные приоритеты 11 по умолчанию

1. **TRUE SCALE.** Сначала фиксировать реальную относительную высоту и естественное телосложение моделей. Высокая выше низкой; хрупкая отличается от более плотной; подтверждённо более юная имеет соответствующие возрасту пропорции. Одна плоскость пола и одинаковая дистанция до камеры. Не нормализовать головы/плечи/талии/колени, не растягивать конечности. По разрозненным портретам нельзя точно определять рост.
2. **FASHION SHAPE.** Чуть более стройная профессиональная fashion-подача с помощью посадки одежды, нейтральной осанки, позы и света. Очень мягкая индивидуальная стилизация без замены фигуры на шаблон, без взросления детей и подростков.
3. **FULL FIT.** Только после задания соотношений роста подобрать камеру, общий зум и формат для полного размещения всех моделей от макушки до обуви. Уменьшать всю сцену целиком. Не масштабировать одного человека ради «fit», не выравнивать людей по высоте. Сохранять поля над высокой и по бокам.
4. Для `11 seq` сохранять видимый масштаб и пропорции одинаковыми между четырьмя кадрами; для школьных моделей — возрастно-корректные полностью одетые образы.

`11 height` и `11 fit` только повторяют дополнительные акценты. Обычная команда `11` уже включает правила. Модель генерации не обеспечивает измерительно точные пропорции.

## 11 — группы и последовательности

| Команда | Значение |
| --- | --- |
| `11` / `11 lineup` | Один широкий студийный портрет уникальных моделей, одна линия пола, двузначные номера с 01. |
| `11 fit` | Повторить кадрирование всей группы камерой, без изменения роста отдельных моделей; включено по умолчанию. |
| `11 height` | Дополнительный акцент на уже сохраняемой разнице роста и телосложения, без выдуманных сантиметров. |
| `11 numbers off` | Без номеров. |
| `11 start 07` | Нумерация от 07 и далее. |
| `11 continue` | Продолжить по известному предыдущему набору; без известного номера уточнить. |
| `11 seq jeans` | Взрослая модель; четыре положения джинсов поверх непрозрачного полностью закрывающего нижнего слоя. |
| `11 seq top` | Взрослая модель; четыре стадии снятия наружного верха поверх закрытого непрозрачного верха. |
| `11 seq looks` | Четыре полностью одетых каталожных образа одной модели, в том числе школьной. |
| `11 p` | Промпт без генерации; `11 help` — справка. |

Четыре кадра выполняются в **одной** широкой картинке с сохранением лица, камеры, освещения, фона, пропорций. Для детей и подростков не использовать серии снятия верха или спускания брюк; применять полностью одетый `11 seq looks`. Точный реальный рост по фото гарантировать нельзя.

Пример: `NEW 1 11 lineup height start 07` + новые фотографии. NEW сбрасывает логически контекст предыдущих генераций, но не удаляет историю чата.

## NEW (с версии 0.10.1)

`NEW` / `NEW 1` — отдельная текущая задача; `NEW 2` — строгие новые источники; `NEW 3` — автономный промпт для нового чата. Поддерживается `NEW 1 11 …`, но `NEW 11 …` — это NEW 1 с последующим режимом 11.

[Открыть интерактивную справку](./index.html).

## Часто используемые команды (20.10.2026)

Публичная страница `index.html#frequent` содержит 20 проверенных синтаксических рецептов из текущей переписки и для каждого — копируемую вариацию. Основные запросы: `REAL MAX full body` с `keep face keep age keep outfit keep pose keep bg keep light keep mood`; `22 outpaint 3`; одиночная модель `solo` на `white seamless paper backdrop`; `77 studio full body solo`; модель в кресле, камера снизу с широким углом и прямым взглядом (`sitting in armchair, low angle, wide lens, looking into camera`); `22 pose ref`; `22 next 5s`; `55 90 плёнка`; `32 @PORTRAIT_EDITORIAL`; `NEW 1/2/3`; `clean`; `12 {PS1}`; `11 lineup`; `77 p`.

**Важно:** если фон меняется на студийный, `keep bg` не добавляют. Полный рост из крупного плана достраивается предположительно. `REAL MAX` — максимальный уровень требований к фотореализму, а не техническая гарантия. Для несовершеннолетних все постановки возрастно-корректны.

## Дополнение: повседневная фотография и взрослый каталог (20.10.2026)

Четыре новых популярных сценария:

- `55 keep face keep age keep outfit\nsame pose, ordinary real-life photo, natural casual snapshot, not a fashion shoot` — обычная натуральная фотография человека. Поза сохраняется приблизительно, `55` свободнее перерабатывает кадр.
- `22 keep face keep age keep outfit keep pose\nordinary casual photo, not fashion, natural light` — повседневный снимок при более строгом сохранении исходной позы.
- `77 adult campaign swimwear catalog\nstudio full body solo\nkeep face keep age match outfit` — только совершеннолетняя модель, коммерческий каталог купальников, нейтральная поза, акцент на изделии и качестве фотографии, без эротизации.
- `77 adult campaign swimwear catalog FACE=A OUTFIT=B full body solo keep face keep age match outfit` — референс A содержит лицо, B — изделие. Дополнительный C может задавать сцену.

В разделе `#frequent` каждая команда сопровождается комментарием и копируемой вариацией. `55` — повседневная естественность, `22` — более строгое сохранение позы, `77` — постановочная коммерческая съёмка. Для `77` уточнение `adult campaign` снимает школьный контекст по умолчанию, но не заменяет проверку возраста.

**Как выбрать режим:** `55` — естественное повседневное фото с более свободной интерпретацией исходной позы; `22` — обычное фото с более строгой фиксацией позы и одежды; `77` — профессиональная постановка или каталог, в том числе с двумя отдельными референсами `FACE=A` и `OUTFIT=B`. Каталог купальников относится к взрослой коммерческой съёмке: совершеннолетние модели, нейтральная презентация.

## Серия S1 — рекламные сюжеты одной модели

Страница [S1 · Серия 1](./s1/) создана после частых команд: 14 постановочных сценариев и 49 вкладок с промптами по режимам `77`, `22`, `55` и выборочно `32`. В каждой карточке сохраняются лицо, возраст, фасон платья и направление рекламной истории. `77` предназначен для новой сцены по `FACE=A OUTFIT=B`, `22` — для изменения уже принятого кадра, `55` — для естественного бытового аналога, `32` — для параметров фотографии. Исходники и все промпты: [s1/source.md](./s1/source.md).

## FAQ — практические вопросы и готовые промпты (31.10.2026)

В существующий раздел `#faq` добавлены 12 практических вопросов из последних задач. Для каждого: краткое объяснение, полный копируемый текст команды. Исходные общие вопросы сохранены.

### 1. Как точнее всего сохранить исходную модель и просто показать её в полный рост?

Используйте 22 full. Сохраняются лицо, визуальный возраст, платье, поза и окружение. Если стопы отсутствуют в оригинале, генератор достраивает их предположительно.

```text
22 full keep face keep age keep outfit keep pose keep bg
full body, head to toe, entire figure including shoes,
realistic body proportions, natural camera perspective,
maximum photorealism, natural skin texture,
soft realistic shadows, no CGI, no beauty retouch
```

### 2. Как показать одну модель отдельно, в полный рост, в той же локации и вертикальном кадре 9:16?

Укажите solo и vertical 9:16. Сцена и одежда сохраняются. Дополнительное пространство вокруг модели и невидимые части тела могут быть реконструированы.

```text
22 full keep face keep age keep outfit keep pose keep bg keep light keep mood
solo, full body, head to toe, vertical portrait 9:16,
same location, same environment,
entire figure visible, feet and shoes fully in frame,
natural body proportions, realistic camera perspective,
maximum photorealism, soft calm natural shadows,
natural skin texture, true camera look,
no CGI, no plastic skin, no beauty retouch
```

### 3. Как сменить позу и получить яростный, но одновременно мягкий, игривый взгляд прямо в кадр?

Нужен 22 с change pose. Не добавляйте keep pose — это запрещало бы запрошенную смену позы. Для уверенной смены взгляда используйте прямое описание мимики.

```text
22 full keep face keep age keep outfit keep bg keep light
change pose, full body, solo, vertical 9:16,
direct intense eye contact with camera,
fierce yet sweet gaze, passionate and playful expression,
subtle confident smile, relaxed body language,
natural elegant pose, same location,
maximum photorealism, soft natural shadows,
real camera look, natural skin texture,
no CGI, no plastic skin, no beauty retouch
```

### 4. Как сделать открытую уверенную позу, слегка прищуренные глаза и прямой взгляд в камеру?

Открытая поза означает свободное положение плеч и рук. Для сохранения лица и одежды используйте 22 и явно задайте change pose; keep pose не требуется.

```text
22 full keep face keep age keep outfit keep bg keep light
change pose, full body, solo, vertical 9:16,
standing in an open confident pose,
slightly squinting eyes, direct intense eye contact,
fierce yet sweet expression, subtle playful smile,
shoulders relaxed, arms slightly apart,
natural elegant posture, same location,
maximum photorealism, soft natural shadows,
real camera look, natural skin texture,
no CGI, no plastic skin, no beauty retouch
```

### 5. Как максимально точно перенести исходную 3D-модель в фотографию со спокойными реальными тенями?

22 здесь предпочтительнее свободного 55. Сохраняйте лицо, возраст, платье, позу и фон. Не указывайте keep light, если хотите заменить исходный жёсткий или компьютерный свет на мягкий естественный; при хорошем исходном свете его можно добавить.

```text
22 keep face keep age keep outfit keep pose keep bg keep mood
maximum photorealism, faithful source identity,
soft calm natural shadows, realistic diffuse daylight,
real-world light falloff and contact shadows,
natural skin pores and fabric microtexture,
realistic proportions, authentic real camera look,
no CGI, no plastic skin, no beauty retouch,
no artificial HDR, no overprocessing
```

### 6. Как получить максимально живую фотографию, если точная копия источника не нужна?

Используйте 55. Он свободнее в постановке, поэтому обычно лучше подходит для правдоподобного бытового кадра. Детали одежды проверяйте после генерации.

```text
55 keep face keep age keep outfit
ordinary real-life photo, candid, natural casual shot,
real camera look, realistic lighting, natural skin texture,
subtle imperfections, authentic facial features,
authentic colors, no CGI, no plastic skin,
no beauty retouch, no overprocessing, not a fashion shoot
```

### 7. Как добавить фотографическую оптику и мягкий свет без искусственной ретуши?

Используйте 32 на уже выбранном кадре. Он отвечает за фотопараметры, а не за сборку нового человека из отдельных референсов.

```text
32 @PORTRAIT_EDITORIAL
{focal_mm=50, aperture="f/2.8", key_light="soft natural window light", post_output="neutral, no retouch"}
```

### 8. Как посадить взрослую модель перед зрителем в роскошное кресло нога на ногу?

77 подходит для новой постановочной сцены. Если готовое фото уже существует и менять нужно только позу, используйте 22 с аналогичным описанием.

```text
77 adult fashion campaign
keep face keep age keep outfit
sitting in a luxury armchair in front of me,
legs crossed, one hand resting on the armrest,
looking directly into my eyes,
slight confident smile, subtle lip bite,
elegant posture, relaxed body language,
luxury interior, soft cinematic light, 3:2
```

### 9. Как сделать кадр супермодели перед важным ментором, ожидающей решения о карьере?

77 создаёт эмоционально насыщенную рекламу. 55 подойдёт для менее постановочного варианта, 22 — если уже есть подходящая поза и кадр. Модель подразумевается совершеннолетней.

```text
77 adult fashion campaign
keep face keep age keep outfit
world-class supermodel aura,
tall, slim, striking and unforgettable,
standing before the most important mentor,
as if his words will decide her next career step,
poised but emotionally tense,
respectful, attentive, slightly anxious,
strong eye contact, elegant posture,
luxury interior, cinematic editorial fashion shot, 3:2
```

### 10. Как снять разговор за кофе: модель внимательно слушает, но немного опасается?

Для правдоподобного живого момента удобно 55. Камера со стороны собеседника; мимика сдержанная, напряжение невелико.

```text
55 keep face keep age keep outfit
sitting together at a cafe table, drinking coffee,
over-the-shoulder view, she listens attentively,
slightly wary, subtle anxiety, cautious expression,
natural candid photo, realistic emotions, soft daylight
```

### 11. Как в той же сцене за кофе передать полное доверие и тёплый взгляд в глаза?

Если композиция за кофе уже получена, выбирайте 22 и сохраните позу и фон. Меняется только выражение лица: тревога уступает доверию.

```text
22 keep face keep age keep outfit keep pose keep bg
direct eye contact, complete trust, glowing warm eyes,
gentle sincere smile, relaxed expression,
no fear, deep emotional connection
```

### 12. Обязательно ли создавать всю рекламную серию через 77?

Нет. 77 собирает новую сцену по лицу и одежде; 22 точнее меняет готовый кадр; 55 даёт более естественную фотографию; 32 отвечает за оптику и свет. В серии S1 есть отдельные вкладки с аналогами для 14 рекламных сюжетов.

```text
77 adult fashion campaign
FACE=A OUTFIT=B
keep face keep age match outfit
full body solo, clean white studio, soft light, 3:2
```
