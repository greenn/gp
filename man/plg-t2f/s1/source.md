# T2F — S1. Серия 1: одна взрослая модель, одно платье

14 рекламных сюжетов, переключаемые варианты 77, 22, 55, для ряда сюжетов также 32. Каждая команда — отдельный кадр. Для 77 требуются FACE=A (лицо) и OUTFIT=B (платье) либо замена на `keep outfit` для уже объединённого снимка. Для 22/55/32 используйте утверждённый кадр той же модели в том же платье. Всегда `keep face keep age keep outfit` там, где это применимо. Реализм — цель, не гарантированная идентичность. Возраст — только 18+, товарный акцент, без эротизации.

## 01 — 01. Белая студия · эталон

Начните с кадра в полный рост. Это эталон лица и платья для остальных сцен.

### 77 — новая постановка
```text
77 adult fashion campaign
FACE=A OUTFIT=B
keep face keep age match outfit
full body, solo, natural elegant standing pose; white seamless paper backdrop, soft studio lighting, complete dress and shoes visible, accurate fabric color, seams and drape, 3:2
```

### 22 — редактирование принятого кадра
```text
22 keep face keep age keep outfit
full body, preserve original pose, seamless white studio backdrop, even soft light, no extra people, dress and shoes entirely in frame, 3:2
```

### 55 — живая фотография
```text
55 keep face keep age keep outfit
natural straightforward full-length portrait on a simple white studio background, gentle relaxed posture, subtle real camera texture, no glossy beauty retouch, 3:2
```

### 32 — оптика и свет на готовом кадре
```text
32 @PRODUCT_STUDIO {focal_mm=50, aperture="f/5.6", key_light="large softbox camera-left", post_output="natural product color, restrained retouch"}
```

## 02 — 02. Платье рядом на стойке

Модель в платье и второй экземпляр того же платья на вешалке — отдельная презентация товара.

### 77 — новая постановка
```text
77 adult fashion campaign
FACE=A OUTFIT=B
keep face keep age match outfit
full body model wearing the reference dress; a SECOND IDENTICAL DRESS hangs beside her on a minimal clothing rack, both items fully visible, fabric and silhouette match, clean white studio, commercial garment comparison, 3:2
```

### 22 — редактирование принятого кадра
```text
22 keep face keep age keep outfit
place a clothing rack to one side with a second identical copy of the dress, model continues wearing the first, preserve dress pattern and person, uncluttered catalog composition, 3:2
```

### 55 — живая фотография
```text
55 keep face keep age keep outfit
candid behind-the-scenes fashion showroom photo; adult model wearing the same dress beside a garment rack displaying a duplicate; naturally imperfect studio light, 3:2
```

### 32 — оптика и свет на готовом кадре
```text
32 @PRODUCT_STUDIO {focal_mm=50, aperture="f/8", key_light="soft frontal", post_output="accurate garment colors"}
```

## 03 — 03. Платье на манекене

Сравните носимое платье и отдельный экземпляр на манекене; не превращать модель в манекен.

### 77 — новая постановка
```text
77 adult fashion campaign
FACE=A OUTFIT=B
keep face keep age match outfit
full body adult model wearing reference dress beside a torso mannequin carrying a SECOND IDENTICAL DRESS; product detail emphasis; clean white display room, elegant posture, 3:2
```

### 22 — редактирование принятого кадра
```text
22 keep face keep age keep outfit
add mannequin beside the adult model displaying a duplicate of exactly the same dress, maintain model's current dress and facial identity, product-forward catalog photo, 3:2
```

### 55 — живая фотография
```text
55 keep face keep age keep outfit
natural showroom candid photo, model smiling beside a mannequin displaying an identical copy of her dress, soft window light, authentic texture, 3:2
```

## 04 — 04. Отдыхает на кровати

Уютный lifestyle-кадр: платье не заменяется домашней одеждой.

### 77 — новая постановка
```text
77 adult fashion campaign
FACE=A OUTFIT=B
keep face keep age match outfit
adult model reclining fully clothed on a neatly made bed, dress skirt arranged naturally and visibly, relaxed smile, airy contemporary bedroom, morning window light, cozy lifestyle campaign, 3:2
```

### 22 — редактирование принятого кадра
```text
22 keep face keep age keep outfit
change scene to bright bedroom; same model in the same dress reclines naturally on a bed, dress remains intact, realistic contact shadows and fabric folds, 3:2
```

### 55 — живая фотография
```text
55 keep face keep age keep outfit
casual candid smartphone photo of the same adult woman in her dress resting on a neatly made bed, quiet laughter, authentic daylight, not a posed fashion shoot, 3:2
```

## 05 — 05. Прыгает на кровати

Энергия и смех, динамика ткани, движение без изменения платья.

### 77 — новая постановка
```text
77 adult fashion campaign
FACE=A OUTFIT=B
keep face keep age match outfit
joyful small jump on a bed, adult model fully clothed in the reference dress, arms open, laughing, natural movement and flowing hem, bright bedroom, freeze-frame commercial shot, realistic balance, 3:2
```

### 22 — редактирование принятого кадра
```text
22 keep face keep age keep outfit
same adult model in the same dress captured mid-small-jump on a bed; dynamic flowing fabric, cheerful expression, natural gravity, preserve dress color and length, 3:2
```

### 55 — живая фотография
```text
55 keep face keep age keep outfit
authentic handheld snapshot of an adult woman in her dress having a playful small jump on the bed, imperfect joyful motion, spontaneous laugh, window light, 3:2
```

### 32 — оптика и свет на готовом кадре
```text
32 @SMARTPHONE_CASUAL {focal_mm=28, aperture="f/2.8", view_angle="eye-level", post_output="natural motion, restrained processing"}
```

## 06 — 06. Смеётся и озорничает

Радость, лёгкая дерзость и молодой настрой совершеннолетней модели.

### 77 — новая постановка
```text
77 adult fashion campaign
FACE=A OUTFIT=B
keep face keep age match outfit
adult model laughing spontaneously while taking a playful step, mischievous expression, youthful carefree energy, full dress visible, bright neutral loft, premium lifestyle campaign, 3:2
```

### 22 — редактирование принятого кадра
```text
22 keep face keep age keep outfit
change expression to lively mischievous open smile, slight playful body turn, maintain the same dress and face, realistic facial muscles, daylight, 3:2
```

### 55 — живая фотография
```text
55 keep face keep age keep outfit
unposed candid photo of the same woman bursting into laughter, cheeky grin, tiny flyaway hairs, ordinary natural daylight, dress still recognizable, 3:2
```

## 07 — 07. Сидит · спокойная улыбка

Нежный кадр с мягкими руками, видимой посадкой платья и честной фактурой.

### 77 — новая постановка
```text
77 adult fashion campaign
FACE=A OUTFIT=B
keep face keep age match outfit
adult model sitting comfortably in a contemporary chair, warm calm smile, dress drapes naturally over the knees, relaxed hands, soft window light, editorial fashion photography, 3:2
```

### 22 — редактирование принятого кадра
```text
22 keep face keep age keep outfit
same model sits in chair, warm relaxed smile, hands naturally resting on knees, dress shape and fabric folds preserved, avoid changing hem length, 3:2
```

### 55 — живая фотография
```text
55 keep face keep age keep outfit
natural unposed seated portrait of an adult woman in a dress smiling while talking to a friend, simple interior, soft ambient daylight, 3:2
```

### 32 — оптика и свет на готовом кадре
```text
32 @PORTRAIT_EDITORIAL {focal_mm=85, aperture="f/2.8", focus_distance="eyes", key_light="soft window", post_output="natural skin texture"}
```

## 08 — 08. Сидит · ехидная улыбка

Рекламная ирония: хитрый взгляд и непринуждённая посадка.

### 77 — новая постановка
```text
77 adult fashion campaign
FACE=A OUTFIT=B
keep face keep age match outfit
adult model sitting on an upholstered chair, playful knowing smile, raised eyebrow, direct eye contact, dress naturally draped, crisp modern studio, cheerful witty brand attitude, 3:2
```

### 22 — редактирование принятого кадра
```text
22 keep face keep age keep outfit
same adult model sitting in chair, slightly raised eyebrow, subtle mischievous sideways smile, direct look at camera, preserve face dress colors and hairstyle, 3:2
```

### 55 — живая фотография
```text
55 keep face keep age keep outfit
real-life candid of the woman leaning back slightly in a chair with a cheeky smirk, spontaneous light, no heavy fashion styling, recognizable dress, 3:2
```

## 09 — 09. Дождь · свобода

Вода и движение, платье читается даже в мокром состоянии.

### 77 — новая постановка
```text
77 adult fashion campaign
FACE=A OUTFIT=B
keep face keep age match outfit
adult model fully dressed in the reference dress laughing beneath a gentle rain shower outdoors, realistic raindrops and natural wet fabric texture, no transparent garment effect, playful movement, overcast soft light, 3:2
```

### 22 — редактирование принятого кадра
```text
22 keep face keep age keep outfit
change scene to gentle natural rain outdoors, same adult model same dress, realistic raindrops, damp fabric without transparency, face and garment design remain recognizable, 3:2
```

### 55 — живая фотография
```text
55 keep face keep age keep outfit
spontaneous rainy-day street snapshot of the adult woman in her dress laughing at light rain, believable drops and motion, modest natural texture, no dramatic glamour, 3:2
```

### 32 — оптика и свет на готовом кадре
```text
32 @STREET_DOCUMENTARY {focal_mm=50, aperture="f/4", key_light="overcast sky", post_output="neutral wet-day colors"}
```

## 10 — 10. Мёд · золотой реквизит

Золотистые струи и акценты рядом с платьем; без фетишизации тела.

### 77 — новая постановка
```text
77 adult fashion campaign
FACE=A OUTFIT=B
keep face keep age match outfit
adult fashion commercial with transparent golden honey ribbons as decorative studio props flowing beside the dressed model and onto a separate acrylic display panel, dress remains wearable and visually clear, product-first luxury styling, 3:2
```

### 22 — редактирование принятого кадра
```text
22 keep face keep age keep outfit
add golden honey pours in the foreground near the same fully dressed model; keep honey on transparent props and away from face; preserve dress construction, clean controlled light, 3:2
```

### 55 — живая фотография
```text
55 keep face keep age keep outfit
realistic behind-the-scenes editorial moment, adult model in her dress near a honey-themed golden prop installation, candid smiling expression, believable sticky liquid on props, 3:2
```

## 11 — 11. Масло · блеск и отражения

Глянцевая композиция с маслом в реквизите, а не покрытие кожи.

### 77 — новая постановка
```text
77 adult fashion campaign
FACE=A OUTFIT=B
keep face keep age match outfit
adult fashion campaign with clear oil-like golden liquid pouring across a separate glass display surface around the model, glossy reflections and backlight, model fully dressed, dress fabric color and design clear, commercial art direction, 3:2
```

### 22 — редактирование принятого кадра
```text
22 keep face keep age keep outfit
add a separate foreground glass prop with flowing glossy oil and studio reflections; same dressed adult woman remains clean and fully visible, unchanged dress, 3:2
```

### 55 — живая фотография
```text
55 keep face keep age keep outfit
natural editorial candid from an artistic set with reflective oil-effect props and an adult model in her dress, soft side lighting, real textures, unglamorous facial retouch, 3:2
```

### 32 — оптика и свет на готовом кадре
```text
32 @PRODUCT_STUDIO {focal_mm=50, aperture="f/5.6", key_light="soft side light", post_output="realistic reflections, no plastic skin"}
```

## 12 — 12. Шоколад · контраст

Реквизит из жидкого шоколада усиливает цвет платья, оставаясь предметной постановкой.

### 77 — новая постановка
```text
77 adult fashion campaign
FACE=A OUTFIT=B
keep face keep age match outfit
adult model in the original dress against a neutral studio background, glossy flowing chocolate as artistic arcs on a separate product display table, dress remains completely visible and unchanged, tasteful food-and-fashion advertising, 3:2
```

### 22 — редактирование принятого кадра
```text
22 keep face keep age keep outfit
add a stylish transparent product table with realistic molten chocolate ribbons in foreground, same adult model in her dress beside it, preserve fabric detailing, neutral camera perspective, 3:2
```

### 55 — живая фотография
```text
55 keep face keep age keep outfit
casual candid behind-the-scenes fashion ad photo showing an adult model in her dress beside a chocolate-art installation, authentic working studio light, playful smile, 3:2
```

## 13 — 13. Слёзы · потёкшая тушь

Драматический контраст: «Что, если платье упустили?» — постановочная эмоция, не реальное событие.

### 77 — новая постановка
```text
77 adult fashion campaign
FACE=A OUTFIT=B
keep face keep age match outfit
adult model sitting on a stool in the original dress, theatrical sad expression, visible tears and subtle mascara streaks under eyes, cinematic but believable commercial concept, subdued soft studio light, nonviolent, 3:2
```

### 22 — редактирование принятого кадра
```text
22 keep face keep age keep outfit
same seated adult woman, sad facial expression with tears and gently running mascara under eyes, original dress and overall composition preserved, natural skin texture, 3:2
```

### 55 — живая фотография
```text
55 keep face keep age keep outfit
unpolished candid documentary-style image of the same adult woman in her dress quietly crying, real tears and light mascara smudges, soft indoor light, emotionally believable, 3:2
```

### 32 — оптика и свет на готовом кадре
```text
32 @PORTRAIT_EDITORIAL {focal_mm=85, aperture="f/2.2", focus_distance="eyes", key_light="soft window", post_output="natural skin, subtle mascara detail"}
```

## 14 — 14. Страх · рекламная история

Выразительный взгляд, тревога и ироничный контраст с жизнерадостной серией.

### 77 — новая постановка
```text
77 adult fashion campaign
FACE=A OUTFIT=B
keep face keep age match outfit
adult fashion model seated and fully dressed, wide worried eyes and tense but nonviolent facial expression, subtle dramatically soft lighting, dress remains visible, tongue-in-cheek fashion campaign, 3:2
```

### 22 — редактирование принятого кадра
```text
22 keep face keep age keep outfit
change expression to anxious worried look, slight tension in shoulders, keep the same adult woman, dress and seated pose, realistic subtle emotion, no signs of injury, 3:2
```

### 55 — живая фотография
```text
55 keep face keep age keep outfit
authentic quiet documentary-style portrait of same adult woman wearing the dress, worried surprised expression as if hearing unexpected news, normal household lighting, understated, 3:2
```

## Режимы вне прямых аналогов

- `REAL MAX` — фотореалистичные детали/проверка результата, не смена сюжета.
- `12` — фото→3D-кадр, не фотографический аналог.
- `11 seq looks` — четыре разных полностью одетых образа в одном изображении.
- `22 next 1s` — временное продолжение одного кадра, может быть полезно для варианта прыжка, но не создаёт видео.

## Примечания к материалам

Мёд, масло и шоколад — художественные элементы реквизита; цвет, конструкцию и посадку платья сохранять. Драматические слёзы и страх — постановка рекламного сюжета. Нет утверждения, что кадр фиксирует реальную съёмку.
