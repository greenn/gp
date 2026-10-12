/* Источник: исследование 32 параметров T2F 0.3.0 и пользовательские примеры 22. */
const T2FB_CATALOG = {
  "groups": [
    {
      "id": "all",
      "name": "Все"
    },
    {
      "id": "scene",
      "name": "Сцена"
    },
    {
      "id": "camera",
      "name": "Камера"
    },
    {
      "id": "light",
      "name": "Свет"
    },
    {
      "id": "material",
      "name": "Материалы"
    },
    {
      "id": "render",
      "name": "Рендер"
    },
    {
      "id": "color",
      "name": "Цвет / пост"
    }
  ],
  "presets": [
    {
      "id": "BASE_NEUTRAL",
      "name": "Нейтральный фотореализм",
      "description": "Сохраняет геометрию, перспективу и свет исходника. Сдержанная обработка. Универсальное начало."
    },
    {
      "id": "PORTRAIT_EDITORIAL",
      "name": "Портрет / фотокружок",
      "description": "Естественная кожа, мягкий свет и портретная перспектива. Для 3D-моделей людей и школьных работ."
    },
    {
      "id": "SMARTPHONE_CASUAL",
      "name": "Снимок на смартфон",
      "description": "Бытовой кадр без дорогой студийной подачи, естественная резкость и вычислительная обработка."
    },
    {
      "id": "STREET_DOCUMENTARY",
      "name": "Улица / репортаж",
      "description": "Доступный свет, реальная среда, правдоподобный репортажный кадр."
    },
    {
      "id": "PRODUCT_STUDIO",
      "name": "Предметная студия",
      "description": "Физические материалы, контролируемые отражения, высокий уровень детализации предмета."
    },
    {
      "id": "ARCH_INTERIOR_DAY",
      "name": "Архитектура / интерьер",
      "description": "Естественные вертикали, дневной свет из окон, корректный масштаб деталей."
    },
    {
      "id": "NIGHT_URBAN",
      "name": "Ночная улица",
      "description": "Смешанное освещение, сохранение источников света и контролируемый шум."
    },
    {
      "id": "AUTOMOTIVE_NATURAL",
      "name": "Автомобиль",
      "description": "Естественные отражения неба и окружения на кузове, правильная геометрия и контакт с землёй."
    }
  ],
  "params": [
    {
      "id": "P01",
      "key": "scene_subject",
      "title": "Сцена и модель",
      "group": "scene",
      "help": "Что находится в кадре и что обязательно сохраняется.",
      "tip": "Самый важный пункт: внешний вид и структура исходника не должны меняться ради красоты.",
      "example": "3D-модель ученицы; сохранить лицо, возраст, причёску, одежду и позу",
      "options": [
        {
          "label": "Сохранить модель ученицы",
          "value": "исходная 3D-модель учащейся; сохранить лицо, визуальный возраст, причёску, одежду и позу"
        },
        {
          "label": "Сохранить персонажа",
          "value": "исходный 3D-персонаж; сохранить внешность, пропорции, одежду и позу"
        },
        {
          "label": "Сохранить предмет",
          "value": "исходный 3D-предмет; сохранить форму, текстуры и масштаб"
        },
        {
          "label": "Сохранить сцену",
          "value": "сохранить исходную геометрию, расположение объектов и фон"
        }
      ]
    },
    {
      "id": "P02",
      "key": "photo_intent",
      "title": "Жанр фотографии",
      "group": "scene",
      "help": "Определяет общий характер фотографии: студия, репортаж, обычный снимок.",
      "tip": "Жанр направляет решения по свету и композиции, но не разрешает изменять человека.",
      "example": "portrait",
      "options": [
        {
          "label": "Портрет",
          "value": "portrait"
        },
        {
          "label": "Естественная фотография",
          "value": "naturalistic"
        },
        {
          "label": "Журнальная съёмка",
          "value": "editorial"
        },
        {
          "label": "Репортаж",
          "value": "documentary"
        },
        {
          "label": "Фото на телефон",
          "value": "smartphone"
        },
        {
          "label": "Предметная съёмка",
          "value": "product"
        },
        {
          "label": "Архитектура",
          "value": "architectural"
        },
        {
          "label": "Макро",
          "value": "macro"
        },
        {
          "label": "Автомобиль",
          "value": "automotive"
        }
      ]
    },
    {
      "id": "P03",
      "key": "sensor_camera",
      "title": "Тип камеры / сенсор",
      "group": "camera",
      "help": "Размер сенсора влияет на характер изображения вместе с объективом и дистанцией.",
      "tip": "Большой сенсор сам по себе не означает лучшее фото; он меняет оптические возможности.",
      "example": "full-frame",
      "options": [
        {
          "label": "Полный кадр",
          "value": "full-frame"
        },
        {
          "label": "APS-C",
          "value": "APS-C"
        },
        {
          "label": "Micro 4/3",
          "value": "MFT"
        },
        {
          "label": "Средний формат",
          "value": "medium-format"
        },
        {
          "label": "Смартфон",
          "value": "smartphone"
        },
        {
          "label": "Не указывать",
          "value": "unspecified"
        }
      ]
    },
    {
      "id": "P04",
      "key": "focal_mm",
      "title": "Фокусное расстояние",
      "group": "camera",
      "help": "8–1200 мм или эквивалент. Определяет масштаб, поле зрения и при фиксированном кадрировании перспективу через дистанцию.",
      "tip": "24–28 мм даёт широкий бытовой кадр; 50 мм универсален; 85 мм подходит для портрета. Не меняйте исходную перспективу без причины.",
      "example": "85",
      "options": [
        {
          "label": "Широкоугольный 24 мм",
          "value": "24"
        },
        {
          "label": "Широкоугольный 35 мм",
          "value": "35"
        },
        {
          "label": "Нормальный 50 мм",
          "value": "50"
        },
        {
          "label": "Портретный 85 мм",
          "value": "85"
        },
        {
          "label": "Портретный 105 мм",
          "value": "105"
        },
        {
          "label": "Смартфон (экв. 26 мм)",
          "value": "35mm_eq:26"
        }
      ]
    },
    {
      "id": "P05",
      "key": "aperture",
      "title": "Диафрагма",
      "group": "camera",
      "help": "Число f/… задаёт размер относительного отверстия и влияет на глубину резкости.",
      "tip": "f/1.8 даёт малую глубину резкости при подходящей дистанции; f/8 — больше деталей сцены.",
      "example": "f/2.2",
      "options": [
        {
          "label": "Малая ГРИП · f/1.8",
          "value": "f/1.8"
        },
        {
          "label": "Портрет · f/2.2",
          "value": "f/2.2"
        },
        {
          "label": "Умеренная · f/4",
          "value": "f/4"
        },
        {
          "label": "Глубже · f/5.6",
          "value": "f/5.6"
        },
        {
          "label": "Всё чётче · f/8",
          "value": "f/8"
        },
        {
          "label": "Автоматически",
          "value": "auto"
        },
        {
          "label": "Как в исходнике",
          "value": "inherit"
        }
      ]
    },
    {
      "id": "P06",
      "key": "focus_distance",
      "title": "Фокусировка",
      "group": "camera",
      "help": "Точка или дистанция, куда наводится резкость: глаза, лицо, объект либо метры.",
      "tip": "Для портрета обычно фокус на глазах. Для полного роста можно на лицо или центральную плоскость.",
      "example": "eyes",
      "options": [
        {
          "label": "На глазах",
          "value": "eyes"
        },
        {
          "label": "На лице",
          "value": "face"
        },
        {
          "label": "Весь человек",
          "value": "full-body subject"
        },
        {
          "label": "На объекте",
          "value": "subject"
        },
        {
          "label": "2 м",
          "value": "2 m"
        },
        {
          "label": "4 м",
          "value": "4 m"
        },
        {
          "label": "Как в исходнике",
          "value": "inherit"
        }
      ]
    },
    {
      "id": "P07",
      "key": "shutter",
      "title": "Выдержка",
      "group": "camera",
      "help": "Продолжительность экспозиции. Влияет на смаз движущихся объектов.",
      "tip": "Бег и ходьба могут требовать короткой выдержки; не обещайте полную резкость при длинной.",
      "example": "1/200 s",
      "options": [
        {
          "label": "Портрет 1/200 с",
          "value": "1/200 s"
        },
        {
          "label": "Поза 1/125 с",
          "value": "1/125 s"
        },
        {
          "label": "Ходьба 1/500 с",
          "value": "1/500 s"
        },
        {
          "label": "Спорт 1/1000 с",
          "value": "1/1000 s"
        },
        {
          "label": "Ночная сцена 1/30 с",
          "value": "1/30 s"
        },
        {
          "label": "Авто",
          "value": "auto"
        },
        {
          "label": "Не менять",
          "value": "inherit"
        }
      ]
    },
    {
      "id": "P08",
      "key": "iso",
      "title": "Светочувствительность ISO",
      "group": "camera",
      "help": "Усиление сенсора. При прочих равных высокое ISO связано с большей видимостью шума.",
      "tip": "Не добавляйте грубое зерно только ради реализма; шум должен соответствовать камере и освещению.",
      "example": "200",
      "options": [
        {
          "label": "Чистое ISO 100",
          "value": "100"
        },
        {
          "label": "ISO 200",
          "value": "200"
        },
        {
          "label": "ISO 400",
          "value": "400"
        },
        {
          "label": "ISO 800",
          "value": "800"
        },
        {
          "label": "ISO 1600",
          "value": "1600"
        },
        {
          "label": "ISO 3200",
          "value": "3200"
        },
        {
          "label": "Авто",
          "value": "auto"
        }
      ]
    },
    {
      "id": "P09",
      "key": "camera_pose",
      "title": "Положение камеры",
      "group": "camera",
      "help": "Высота камеры, дистанция до модели, положение относительно её тела.",
      "tip": "Камера на уровне глаз сохраняет естественные пропорции; близкая низкая камера может искажать лицо.",
      "example": "eye-level, 3 m from subject",
      "options": [
        {
          "label": "На уровне глаз",
          "value": "eye-level"
        },
        {
          "label": "На уровне груди",
          "value": "chest-level"
        },
        {
          "label": "На уровне талии",
          "value": "waist-level"
        },
        {
          "label": "Низкая точка",
          "value": "low camera position"
        },
        {
          "label": "На уровне глаз, 3 м",
          "value": "eye-level, 3 m from subject"
        },
        {
          "label": "Высокая точка",
          "value": "high camera position"
        }
      ]
    },
    {
      "id": "P10",
      "key": "view_angle",
      "title": "Ракурс / наклон",
      "group": "camera",
      "help": "Поворот камеры: спереди, 3/4, профиль, сверху или снизу.",
      "tip": "Для серии обычно используют фронт, 3/4 и профиль. Смена ракурса не должна менять личность.",
      "example": "3/4",
      "options": [
        {
          "label": "Фронтально",
          "value": "front"
        },
        {
          "label": "Три четверти",
          "value": "3/4"
        },
        {
          "label": "Профиль слева",
          "value": "left profile"
        },
        {
          "label": "Профиль справа",
          "value": "right profile"
        },
        {
          "label": "Слегка сверху",
          "value": "high-angle"
        },
        {
          "label": "Слегка снизу",
          "value": "low-angle"
        },
        {
          "label": "Вид сверху",
          "value": "top-down"
        }
      ]
    },
    {
      "id": "P11",
      "key": "composition_aspect",
      "title": "Кадрирование и формат",
      "group": "camera",
      "help": "Соотношение сторон и размещение модели: полный рост, по пояс, портрет.",
      "tip": "Для полного роста оставьте поля сверху и снизу, не обрезайте стопы, кисти и волосы.",
      "example": "3:2, full-body",
      "options": [
        {
          "label": "Вертикаль 3:2, весь рост",
          "value": "2:3, full-body"
        },
        {
          "label": "Вертикаль 9:16",
          "value": "9:16, full-body"
        },
        {
          "label": "Классика 3:2",
          "value": "3:2, centered"
        },
        {
          "label": "Портрет 4:5",
          "value": "4:5, portrait"
        },
        {
          "label": "По пояс 3:2",
          "value": "3:2, waist-up"
        },
        {
          "label": "Квадрат 1:1",
          "value": "1:1, head and shoulders"
        },
        {
          "label": "Широкий 16:9",
          "value": "16:9, environmental"
        }
      ]
    },
    {
      "id": "P12",
      "key": "dof_bokeh",
      "title": "Глубина резкости и боке",
      "group": "camera",
      "help": "Степень размытия фона. Реалистичное боке определяется оптикой и расстояниями.",
      "tip": "Не просите одинаковый Gaussian blur на всём фоне. Размытие должно усиливаться постепенно.",
      "example": "subtle",
      "options": [
        {
          "label": "Почти всё резко",
          "value": "deep"
        },
        {
          "label": "Лёгкое размытие",
          "value": "subtle"
        },
        {
          "label": "Малая глубина резкости",
          "value": "shallow"
        },
        {
          "label": "Без размытия",
          "value": "off"
        },
        {
          "label": "Натуральное боке",
          "value": "natural optical bokeh"
        }
      ]
    },
    {
      "id": "P13",
      "key": "environment_time",
      "title": "Среда, погода, время",
      "group": "light",
      "help": "Описывает место, сезон и природные условия, от которых зависит свет.",
      "tip": "Если фон нужно сохранить, не подменяйте его другой сценой.",
      "example": "indoor studio, soft daylight",
      "options": [
        {
          "label": "Студия",
          "value": "indoor studio"
        },
        {
          "label": "Пасмурный день",
          "value": "overcast daylight"
        },
        {
          "label": "Светлый интерьер",
          "value": "bright indoor daylight"
        },
        {
          "label": "Золотой час",
          "value": "late golden hour"
        },
        {
          "label": "Пасмурная осень",
          "value": "overcast autumn morning"
        },
        {
          "label": "Вечерний город",
          "value": "evening city"
        },
        {
          "label": "Ночь",
          "value": "night urban"
        }
      ]
    },
    {
      "id": "P14",
      "key": "key_light",
      "title": "Основной источник света",
      "group": "light",
      "help": "Направление и характер ключевого света: окно, солнце, софтбокс.",
      "tip": "Нужно согласовать свет с тенями на лице и одежде. Это сильнее влияет на реализм, чем любое зерно.",
      "example": "large softbox camera-left",
      "options": [
        {
          "label": "Софтбокс слева",
          "value": "large softbox camera-left"
        },
        {
          "label": "Окно слева",
          "value": "large window camera-left"
        },
        {
          "label": "Окно справа",
          "value": "large window camera-right"
        },
        {
          "label": "Рассеянный дневной",
          "value": "overcast daylight"
        },
        {
          "label": "Солнце сбоку",
          "value": "side sunlight"
        },
        {
          "label": "Естественный свет сцены",
          "value": "preserve existing lighting"
        }
      ]
    },
    {
      "id": "P15",
      "key": "source_size_softness",
      "title": "Мягкость источника",
      "group": "light",
      "help": "Размер источника относительно модели определяет мягкость границ теней.",
      "tip": "Большое окно поблизости даёт более мягкие тени, маленький точечный источник — жёсткие.",
      "example": "very-soft",
      "options": [
        {
          "label": "Очень мягкий",
          "value": "very-soft"
        },
        {
          "label": "Мягкий",
          "value": "soft"
        },
        {
          "label": "Средний",
          "value": "medium"
        },
        {
          "label": "Жёсткий",
          "value": "hard"
        },
        {
          "label": "Большое окно",
          "value": "2.5 m window, soft penumbra"
        }
      ]
    },
    {
      "id": "P16",
      "key": "fill_ratio",
      "title": "Заполняющий свет",
      "group": "light",
      "help": "Насколько светлее теневая сторона относительно ключевой. Может задаваться в EV.",
      "tip": "-2 EV сохраняет объём и не проваливает лицо в черноту; чрезмерное заполнение делает картинку плоской.",
      "example": "-2 EV",
      "options": [
        {
          "label": "Без дополнительного",
          "value": "none"
        },
        {
          "label": "Мягкое -1 EV",
          "value": "-1 EV"
        },
        {
          "label": "Естественный -2 EV",
          "value": "-2 EV"
        },
        {
          "label": "Контрастный -3 EV",
          "value": "-3 EV"
        },
        {
          "label": "Отражатель",
          "value": "bounce"
        },
        {
          "label": "Окружающий свет",
          "value": "ambient"
        }
      ]
    },
    {
      "id": "P17",
      "key": "rim_practical",
      "title": "Контровой и фоновые источники",
      "group": "light",
      "help": "Лампы в кадре, подсветка сзади и акцентные источники.",
      "tip": "Не добавляйте контровой свет без причины: избыточный светящийся контур часто выдаёт CGI.",
      "example": "none",
      "options": [
        {
          "label": "Без искусственного контура",
          "value": "none"
        },
        {
          "label": "Слабый контровой",
          "value": "subtle rim"
        },
        {
          "label": "Тёплая лампа сзади",
          "value": "warm practical lamp in background"
        },
        {
          "label": "Настольная лампа",
          "value": "soft warm table lamp"
        },
        {
          "label": "Подсветка волос",
          "value": "subtle hair light"
        }
      ]
    },
    {
      "id": "P18",
      "key": "light_color_wb",
      "title": "Температура света / баланс белого",
      "group": "light",
      "help": "Кельвины источника и WB камеры управляют нейтральностью и цветовым оттенком.",
      "tip": "Окно и лампа могут иметь разные температуры; не нужно насильно делать весь свет одним цветом.",
      "example": "daylight 5600 K; WB 5200 K",
      "options": [
        {
          "label": "Дневной 5600K / WB 5200K",
          "value": "daylight 5600 K; WB 5200 K"
        },
        {
          "label": "Нейтральный WB",
          "value": "neutral white balance"
        },
        {
          "label": "Тёплый 3200K",
          "value": "warm practicals 3200 K"
        },
        {
          "label": "Смешанный свет",
          "value": "mixed daylight and warm practicals"
        },
        {
          "label": "Пасмурный дневной",
          "value": "overcast daylight 6500 K"
        }
      ]
    },
    {
      "id": "P19",
      "key": "environment_reflections",
      "title": "Окружение отражений",
      "group": "light",
      "help": "Что отражается на коже, стекле, металле, в глазах и глянцевых поверхностях.",
      "tip": "Блики должны соответствовать окнам, небу и предметам сцены, а не случайной студийной картинке.",
      "example": "real studio softbox reflections",
      "options": [
        {
          "label": "Отражения студии",
          "value": "real studio softbox reflections"
        },
        {
          "label": "Окно и интерьер",
          "value": "real interior and window reflections"
        },
        {
          "label": "Улица и небо",
          "value": "sky and surrounding buildings reflections"
        },
        {
          "label": "Как на исходнике",
          "value": "preserve source environment reflections"
        },
        {
          "label": "Без ложных бликов",
          "value": "coherent natural reflections only"
        }
      ]
    },
    {
      "id": "P20",
      "key": "material_class",
      "title": "Типы материалов",
      "group": "material",
      "help": "Кожа, волосы, ткань, металл и стекло отражают и рассеивают свет по-разному.",
      "tip": "Для человека критичны кожа, волосы, глаза и одежда. Для предметов — физически корректные поверхности.",
      "example": "skin, hair, fabric",
      "options": [
        {
          "label": "Кожа, волосы, ткань",
          "value": "natural skin, hair, woven fabric"
        },
        {
          "label": "Кожа и синтетика",
          "value": "skin, sportswear fabric"
        },
        {
          "label": "Ткань, кожа и металл",
          "value": "fabric, leather, metal"
        },
        {
          "label": "Дерево и стекло",
          "value": "wood, glass, metal"
        },
        {
          "label": "Краска, металл, пластик",
          "value": "paint, brushed metal, dielectric plastic"
        }
      ]
    },
    {
      "id": "P21",
      "key": "roughness_specular",
      "title": "Шероховатость и блики",
      "group": "material",
      "help": "Степень зеркальности и вариативность микроповерхности (roughness 0–1).",
      "tip": "Одинаковый блеск по всему лицу — признак 3D. Нужна естественная локальная вариативность.",
      "example": "skin spatially varied; no glossy plastic",
      "options": [
        {
          "label": "Естественная кожа",
          "value": "skin spatially varied; no glossy plastic"
        },
        {
          "label": "Матовая ткань",
          "value": "matte woven fabric, subtle variation"
        },
        {
          "label": "Контролируемый блеск",
          "value": "moderate specular, physically plausible"
        },
        {
          "label": "Матовая поверхность",
          "value": "roughness 0.6 with subtle variation"
        },
        {
          "label": "Полуматовая поверхность",
          "value": "roughness 0.4–0.6 spatially varying"
        }
      ]
    },
    {
      "id": "P22",
      "key": "ior_metal_transmission",
      "title": "Преломление, металл, прозрачность",
      "group": "material",
      "help": "Свойства стекла, металла и прозрачных материалов: IOR, metalness, transmission.",
      "tip": "Используйте по необходимости. Для кожи человека точные IOR обычно не нужны в текстовом промпте.",
      "example": "physically plausible skin and eye reflections",
      "options": [
        {
          "label": "Реалистичные глаза",
          "value": "physically plausible skin and eye reflections"
        },
        {
          "label": "Стекло и блики",
          "value": "glass IOR 1.52, plausible transmission and reflections"
        },
        {
          "label": "Металлические детали",
          "value": "metallic materials with coherent reflections"
        },
        {
          "label": "Без технических чисел",
          "value": "material-specific physically plausible response"
        }
      ]
    },
    {
      "id": "P23",
      "key": "micro_surface",
      "title": "Микрорельеф и фактура",
      "group": "material",
      "help": "Поры кожи, пушковые волосы, переплетение ткани, мелкие неровности.",
      "tip": "Делайте фактуру естественной и масштабно правильной; нельзя заменить её цифровым sharpen.",
      "example": "natural skin pores, fine facial hair, fabric weave",
      "options": [
        {
          "label": "Кожа и волосы",
          "value": "natural skin pores, fine facial hair, fabric weave"
        },
        {
          "label": "Фактура одежды",
          "value": "natural textile weave and seams"
        },
        {
          "label": "Едва заметные несовершенства",
          "value": "subtle scale-accurate microtexture"
        },
        {
          "label": "Фактура дерева",
          "value": "fine wood pores at correct physical scale"
        }
      ]
    },
    {
      "id": "P24",
      "key": "edge_geometry",
      "title": "Геометрия и края",
      "group": "material",
      "help": "Физически возможные округления, кромки, швы и небольшие изгибы.",
      "tip": "Особенно важно для архитектуры и предметов. Для лица не добавляйте декоративную деформацию.",
      "example": "preserve natural anatomy and object geometry",
      "options": [
        {
          "label": "Не менять анатомию",
          "value": "preserve natural anatomy and object geometry"
        },
        {
          "label": "Мягкие реальные края",
          "value": "physically plausible edges; no razor-sharp CG geometry"
        },
        {
          "label": "Кромки предметов",
          "value": "small physically scaled edge radii"
        },
        {
          "label": "Сохранить заводскую геометрию",
          "value": "preserve manufactured shape and panel radii"
        }
      ]
    },
    {
      "id": "P25",
      "key": "texture_variation_wear",
      "title": "Вариативность текстуры",
      "group": "material",
      "help": "Небольшая неоднородность цвета кожи, ткани и следы использования предметов.",
      "tip": "Следы должны иметь причину; не добавляйте случайную грязь и царапины для видимости реализма.",
      "example": "natural skin variation, no beauty retouch",
      "options": [
        {
          "label": "Естественная кожа",
          "value": "natural skin variation, no beauty retouch"
        },
        {
          "label": "Ткань без повторов",
          "value": "non-repeating subtle fabric variation"
        },
        {
          "label": "Без износа",
          "value": "none"
        },
        {
          "label": "Слабые следы эксплуатации",
          "value": "subtle causal wear only"
        }
      ]
    },
    {
      "id": "P26",
      "key": "integrator_sampling",
      "title": "Рендеринг и сэмплинг",
      "group": "render",
      "help": "Качество расчёта света для реального движка (Cycles, Arnold, V-Ray); для GenAI почти всегда достаточно словесной цели.",
      "tip": "Не указывайте универсальные 1024 samples без знания движка. T2F по умолчанию генерирует, а не рендерит движком.",
      "example": "engine-default-high",
      "options": [
        {
          "label": "Качество без привязки",
          "value": "engine-default-high"
        },
        {
          "label": "Физический path tracing",
          "value": "path-tracing"
        },
        {
          "label": "Трассировка лучей",
          "value": "ray-tracing"
        },
        {
          "label": "Высокое качество адаптивно",
          "value": "high quality, sufficient adaptive samples"
        }
      ]
    },
    {
      "id": "P27",
      "key": "contact_shadows_gi",
      "title": "Контактные тени и отражённый свет",
      "group": "render",
      "help": "Опора ног на пол, контакт обуви, мягкие тени и непрямое освещение.",
      "tip": "Если человек как будто парит, сначала исправьте контакт и направление света, а не затемняйте картинку.",
      "example": "physical contact shadows and natural indirect light",
      "options": [
        {
          "label": "Реальный контакт с полом",
          "value": "physical contact shadows and natural indirect light"
        },
        {
          "label": "Мягкие тени от ног",
          "value": "realistic foot contact shadows, no AO halos"
        },
        {
          "label": "Глобальное освещение",
          "value": "physical multi-bounce GI"
        },
        {
          "label": "Сохранить исходные тени",
          "value": "preserve realistic source shadow direction"
        }
      ]
    },
    {
      "id": "P28",
      "key": "atmosphere_volumes",
      "title": "Атмосфера и воздух",
      "group": "render",
      "help": "Туман, дымка, пыль и свет в воздухе.",
      "tip": "В большинстве портретов эффект не нужен. Сильные лучи в чистой комнате выглядят искусственно.",
      "example": "none",
      "options": [
        {
          "label": "Без эффектов",
          "value": "none"
        },
        {
          "label": "Едва заметная дымка",
          "value": "subtle"
        },
        {
          "label": "Лёгкая уличная дымка",
          "value": "very subtle outdoor atmospheric haze"
        },
        {
          "label": "Умеренная дымка",
          "value": "medium"
        }
      ]
    },
    {
      "id": "P29",
      "key": "color_management",
      "title": "Цветовое управление",
      "group": "color",
      "help": "Scene-referred workflow и способ отображения тонов: ACES, AgX, Filmic, native.",
      "tip": "ACES полезен там, где движок его поддерживает, но не обязателен для генеративных моделей.",
      "example": "neutral scene-referred color response",
      "options": [
        {
          "label": "Нейтральный цвет",
          "value": "neutral scene-referred color response"
        },
        {
          "label": "ACES 2.0",
          "value": "ACES 2.0"
        },
        {
          "label": "ACEScg + sRGB",
          "value": "ACEScg working, ACES 2 output, sRGB target"
        },
        {
          "label": "AgX",
          "value": "AgX"
        },
        {
          "label": "Filmic",
          "value": "Filmic"
        },
        {
          "label": "Родной профиль",
          "value": "native"
        }
      ]
    },
    {
      "id": "P30",
      "key": "exposure_tone",
      "title": "Экспозиция и динамический диапазон",
      "group": "color",
      "help": "Контроль светлых и тёмных областей, сохранение деталей без HDR-ореолов.",
      "tip": "Нельзя определить точную экспозицию по ISO–f–выдержке без яркости сцены.",
      "example": "soft highlight roll-off; natural shadows",
      "options": [
        {
          "label": "Натуральная экспозиция",
          "value": "soft highlight roll-off; natural shadows"
        },
        {
          "label": "Светлее +0.5 EV",
          "value": "+0.5 EV, preserve highlights"
        },
        {
          "label": "Темнее -0.3 EV",
          "value": "-0.3 EV, preserve shadow detail"
        },
        {
          "label": "Беречь пересветы",
          "value": "protect highlights"
        },
        {
          "label": "Естественные тени",
          "value": "open natural shadows, no black crush"
        }
      ]
    },
    {
      "id": "P31",
      "key": "lens_sensor_artifacts",
      "title": "Особенности оптики и сенсора",
      "group": "color",
      "help": "Лёгкое виньетирование, шум, хроматическая аберрация и дисторсия.",
      "tip": "Эти признаки вторичны. Не превращайте CGI в «грязный CGI» с сильными дефектами.",
      "example": "clean, very subtle photographic character",
      "options": [
        {
          "label": "Чистая оптика",
          "value": "clean"
        },
        {
          "label": "Едва заметное виньетирование",
          "value": "subtle vignette 0.3 EV"
        },
        {
          "label": "Небольшой шум ISO",
          "value": "ISO-consistent fine grain"
        },
        {
          "label": "Без аберраций",
          "value": "negligible chromatic aberration"
        },
        {
          "label": "Естественная камера",
          "value": "clean, very subtle photographic character"
        }
      ]
    },
    {
      "id": "P32",
      "key": "post_output",
      "title": "Постобработка и финальный вид",
      "group": "color",
      "help": "Контраст, цвет, резкость, ретушь и итоговый стиль.",
      "tip": "Лучший дефолт для учебного фотореализма — естественная обработка, без beauty-фильтра и 16K-маркеров.",
      "example": "neutral editorial; restrained sharpening; no beauty smoothing",
      "options": [
        {
          "label": "Естественный редакционный",
          "value": "neutral editorial; restrained sharpening; no beauty smoothing"
        },
        {
          "label": "Студийный нейтральный",
          "value": "professional neutral portrait, minimal retouch"
        },
        {
          "label": "Без обработки",
          "value": "minimal post, no beauty retouch"
        },
        {
          "label": "Фотография со смартфона",
          "value": "ordinary smartphone processing, no fake HDR"
        },
        {
          "label": "Плёночный характер",
          "value": "subtle 35mm grain, gentle contrast"
        }
      ]
    }
  ],
  "quick": [
    {
      "group": "Камера и кадр",
      "name": "Камера 50 мм",
      "cmd": "22 cam 50",
      "desc": "Естественная перспектива универсального объектива 50 мм."
    },
    {
      "group": "Камера и кадр",
      "name": "Камера 35 мм",
      "cmd": "22 cam 35",
      "desc": "Более широкий уличный кадр."
    },
    {
      "group": "Камера и кадр",
      "name": "Камера 85 мм",
      "cmd": "22 cam 85",
      "desc": "Портретная перспектива, меньше перспективного искажения."
    },
    {
      "group": "Камера и кадр",
      "name": "Камера 24 мм",
      "cmd": "22 cam 24",
      "desc": "Широкий угол; осторожнее при съёмке лица вблизи."
    },
    {
      "group": "Камера и кадр",
      "name": "Камера на уровне глаз",
      "cmd": "22 cam eye-level",
      "desc": "Камера напротив лица."
    },
    {
      "group": "Камера и кадр",
      "name": "Камера ниже",
      "cmd": "22 cam low",
      "desc": "Нижняя точка, перспектива снизу."
    },
    {
      "group": "Камера и кадр",
      "name": "Камера выше",
      "cmd": "22 cam high",
      "desc": "Умеренно высокая точка."
    },
    {
      "group": "Камера и кадр",
      "name": "Полный рост",
      "cmd": "22 photo full body",
      "desc": "Модель от головы до обуви с полями."
    },
    {
      "group": "Камера и кадр",
      "name": "По пояс",
      "cmd": "22 photo waist up",
      "desc": "Кадр по пояс, акцент на лице."
    },
    {
      "group": "Камера и кадр",
      "name": "Крупный портрет",
      "cmd": "22 photo close portrait",
      "desc": "Лицо и плечи крупнее."
    },
    {
      "group": "Камера и кадр",
      "name": "Вертикальный кадр",
      "cmd": "22 photo aspect 9:16",
      "desc": "Вертикальный формат для полного роста."
    },
    {
      "group": "Камера и кадр",
      "name": "Горизонтальный кадр",
      "cmd": "22 photo aspect 3:2",
      "desc": "Классическая горизонтальная композиция."
    },
    {
      "group": "Камера и кадр",
      "name": "Ноги в кадре",
      "cmd": "22 legs",
      "desc": "Сохранить нижнюю часть фигуры и обувь, не обрезать стопы."
    },
    {
      "group": "Камера и кадр",
      "name": "Весь человек в кадре",
      "cmd": "22 photo head-to-toe",
      "desc": "От макушки до подошв; оставить воздух вокруг модели."
    },
    {
      "group": "Позы и ракурсы",
      "name": "Поза 3",
      "cmd": "22 pose 3",
      "desc": "Короткая пользовательская команда. Уточняйте смысл номера при необходимости; единого словаря номеров нет."
    },
    {
      "group": "Позы и ракурсы",
      "name": "Три четверти",
      "cmd": "22 pose three-quarter",
      "desc": "Корпус и лицо повернуты на три четверти."
    },
    {
      "group": "Позы и ракурсы",
      "name": "Ноги скрещены стоя",
      "cmd": "22 pose cross-leg stand",
      "desc": "Спокойная стоячая поза со скрещенными ногами."
    },
    {
      "group": "Позы и ракурсы",
      "name": "Сердитое выражение",
      "cmd": "22 pose angry pose",
      "desc": "Изменить мимику, сохраняя человека."
    },
    {
      "group": "Позы и ракурсы",
      "name": "Рука на груди",
      "cmd": "22 pose hand to chest",
      "desc": "Жест руки на груди."
    },
    {
      "group": "Позы и ракурсы",
      "name": "Идёт",
      "cmd": "22 pose walking pose",
      "desc": "Естественная фаза шага."
    },
    {
      "group": "Позы и ракурсы",
      "name": "Задумчивый вид",
      "cmd": "22 фото pose thinking pose r 1",
      "desc": "Подбородок/лицо и жест в задумчивом положении; команда из вашего примера."
    },
    {
      "group": "Позы и ракурсы",
      "name": "Бильярд — удар",
      "cmd": "22 фото action playing billiards, taking a shot view front cam 35",
      "desc": "Динамика игры, фронтальный ракурс, 35 мм — исходная пользовательская формулировка."
    },
    {
      "group": "Позы и ракурсы",
      "name": "Стоит прямо",
      "cmd": "22 pose standing neutral",
      "desc": "Спокойная естественная стойка."
    },
    {
      "group": "Позы и ракурсы",
      "name": "Сидит",
      "cmd": "22 pose sitting neutral",
      "desc": "Нейтральная сидячая поза."
    },
    {
      "group": "Позы и ракурсы",
      "name": "Поворот влево",
      "cmd": "22 view three-quarter left",
      "desc": "Три четверти с поворотом влево."
    },
    {
      "group": "Позы и ракурсы",
      "name": "Поворот вправо",
      "cmd": "22 view three-quarter right",
      "desc": "Три четверти с поворотом вправо."
    },
    {
      "group": "Позы и ракурсы",
      "name": "Строгий профиль",
      "cmd": "22 view profile left",
      "desc": "Вид строго сбоку."
    },
    {
      "group": "Позы и ракурсы",
      "name": "Вид спереди",
      "cmd": "22 view front",
      "desc": "Фронтальный ракурс."
    },
    {
      "group": "Позы и ракурсы",
      "name": "Руки вдоль тела",
      "cmd": "22 pose hands at sides",
      "desc": "Руки естественно опущены."
    },
    {
      "group": "Позы и ракурсы",
      "name": "Руки за спиной",
      "cmd": "22 pose hands behind back",
      "desc": "Стойка с руками за спиной."
    },
    {
      "group": "Позы и ракурсы",
      "name": "Руки в карманах",
      "cmd": "22 pose hands in pockets",
      "desc": "Нейтральная повседневная стойка."
    },
    {
      "group": "Позы и ракурсы",
      "name": "Держит книгу",
      "cmd": "22 pose holding book",
      "desc": "Естественное взаимодействие с книгой."
    },
    {
      "group": "Позы и ракурсы",
      "name": "С велосипедом",
      "cmd": "22 action standing with bicycle",
      "desc": "Модель держит велосипед, без изменения внешности."
    },
    {
      "group": "Позы и ракурсы",
      "name": "Смотрит в камеру",
      "cmd": "22 gaze into camera",
      "desc": "Взгляд на объектив без изменения лица."
    },
    {
      "group": "Позы и ракурсы",
      "name": "Улыбка",
      "cmd": "22 expression natural smile",
      "desc": "Естественная небольшая улыбка."
    },
    {
      "group": "Позы и ракурсы",
      "name": "Серьёзное лицо",
      "cmd": "22 expression neutral serious",
      "desc": "Нейтральное серьёзное выражение."
    },
    {
      "group": "Свет и студия",
      "name": "Мягкая студия",
      "cmd": "22 light soft studio",
      "desc": "Большой рассеянный источник без жёстких теней."
    },
    {
      "group": "Свет и студия",
      "name": "Окно слева",
      "cmd": "22 light window left",
      "desc": "Мягкий дневной свет слева от камеры."
    },
    {
      "group": "Свет и студия",
      "name": "Окно справа",
      "cmd": "22 light window right",
      "desc": "Оконный свет справа от камеры."
    },
    {
      "group": "Свет и студия",
      "name": "Пасмурный день",
      "cmd": "22 light overcast outdoor",
      "desc": "Ровный естественный свет без резких теней."
    },
    {
      "group": "Свет и студия",
      "name": "Светлее",
      "cmd": "22 exposure brighter",
      "desc": "Повысить общую экспозицию, сохранить детали."
    },
    {
      "group": "Свет и студия",
      "name": "Темнее",
      "cmd": "22 exposure darker",
      "desc": "Немного уменьшить экспозицию."
    },
    {
      "group": "Свет и студия",
      "name": "Без бликов",
      "cmd": "22 light remove plastic highlights",
      "desc": "Уменьшить жёсткий глянец и CGI-блеск."
    },
    {
      "group": "Свет и студия",
      "name": "Натуральные тени",
      "cmd": "22 light natural contact shadows",
      "desc": "Подчеркнуть контакт ног с полом и реалистичные тени."
    },
    {
      "group": "Свет и студия",
      "name": "Дневной WB",
      "cmd": "22 light white balance daylight",
      "desc": "Естественный дневной цвет без зеленоватого оттенка."
    },
    {
      "group": "Свет и студия",
      "name": "Вечер",
      "cmd": "22 light golden hour",
      "desc": "Тёплое низкое солнце; не менять лицо."
    },
    {
      "group": "Свет и студия",
      "name": "Меньше контраста",
      "cmd": "22 light softer contrast",
      "desc": "Свет без проваленных теней."
    },
    {
      "group": "Свет и студия",
      "name": "Без искусственного контрового",
      "cmd": "22 light no artificial rim",
      "desc": "Без светящегося CGI-контура волос и плеч."
    },
    {
      "group": "Фотореализм",
      "name": "Максимум реализма",
      "cmd": "22 photo realistic natural",
      "desc": "Убрать вид компьютерного рендера, оставить естественную фотографию."
    },
    {
      "group": "Фотореализм",
      "name": "Ещё реалистичнее",
      "cmd": "22 photo remove CGI look",
      "desc": "Уточнить микрофактуру кожи, волосы, ткани, свет и отражения."
    },
    {
      "group": "Фотореализм",
      "name": "Реальная кожа",
      "cmd": "22 photo natural skin texture",
      "desc": "Поры, мелкая асимметрия, без воскового сглаживания."
    },
    {
      "group": "Фотореализм",
      "name": "Волосы прядями",
      "cmd": "22 photo realistic hair strands",
      "desc": "Отдельные естественные пряди, без пластиковых причесок."
    },
    {
      "group": "Фотореализм",
      "name": "Без глянца",
      "cmd": "22 photo no beauty retouch",
      "desc": "Отказ от чрезмерной ретуши и рекламного блеска."
    },
    {
      "group": "Фотореализм",
      "name": "Естественные глаза",
      "cmd": "22 photo natural eyes reflections",
      "desc": "Настоящие блики от окружения, без искусственной резкости."
    },
    {
      "group": "Фотореализм",
      "name": "Фактура одежды",
      "cmd": "22 photo fabric detail",
      "desc": "Сохранить швы, складки и структуру ткани."
    },
    {
      "group": "Фотореализм",
      "name": "Как на смартфон",
      "cmd": "22 cam smartphone natural",
      "desc": "Реалистичный бытовой снимок с телефона."
    },
    {
      "group": "Фотореализм",
      "name": "Как на фотокамеру",
      "cmd": "22 cam full-frame mirrorless",
      "desc": "Характер фото с беззеркальной камеры."
    },
    {
      "group": "Фотореализм",
      "name": "Как на плёнку",
      "cmd": "22 cam 35mm film subtle grain",
      "desc": "Сдержанный плёночный характер без сильных дефектов."
    },
    {
      "group": "Фотореализм",
      "name": "Без искусственного боке",
      "cmd": "22 photo natural depth of field",
      "desc": "Оптическое размытие, а не фильтр по маске."
    },
    {
      "group": "Фотореализм",
      "name": "Сохранить перспективу",
      "cmd": "22 photo keep original perspective",
      "desc": "Не менять масштаб и форму тела ради стилизации."
    },
    {
      "group": "Модель и возраст",
      "name": "Сохранить лицо",
      "cmd": "22 preserve face identity",
      "desc": "Те же узнаваемые черты лица, без смены личности."
    },
    {
      "group": "Модель и возраст",
      "name": "Не взросли",
      "cmd": "22 preserve visual age",
      "desc": "Сохранить возраст, не делать подростка взрослым."
    },
    {
      "group": "Модель и возраст",
      "name": "Возраст 7 класса",
      "cmd": "22 возраст 7 класс",
      "desc": "Возрастосоответствующие подростковые черты, обычная одежда."
    },
    {
      "group": "Модель и возраст",
      "name": "Возраст 10 класса",
      "cmd": "22 возраст 10 класс",
      "desc": "Старший школьный возраст, не взрослая модель."
    },
    {
      "group": "Модель и возраст",
      "name": "Сохранить одежду",
      "cmd": "22 preserve outfit",
      "desc": "Без замены одежды и аксессуаров."
    },
    {
      "group": "Модель и возраст",
      "name": "Сохранить причёску",
      "cmd": "22 preserve hairstyle",
      "desc": "Цвет волос, длина и укладка остаются прежними."
    },
    {
      "group": "Модель и возраст",
      "name": "Сохранить фигуру",
      "cmd": "22 preserve body proportions",
      "desc": "Те же естественные пропорции, без искусственной идеализации."
    },
    {
      "group": "Модель и возраст",
      "name": "Сохранить позу",
      "cmd": "22 preserve pose",
      "desc": "Руки, ноги и взгляд исходника не меняются."
    },
    {
      "group": "Модель и возраст",
      "name": "Только один персонаж",
      "cmd": "22 photo single subject",
      "desc": "Без случайных дополнительных людей."
    },
    {
      "group": "Модель и возраст",
      "name": "Нейтральная подача",
      "cmd": "22 photo age-appropriate neutral style",
      "desc": "Для школьников — безопасная повседневная съёмка."
    },
    {
      "group": "Фон и окружение",
      "name": "Светлая студия",
      "cmd": "22 background bright studio",
      "desc": "Чистый светлый фон и студийная обстановка."
    },
    {
      "group": "Фон и окружение",
      "name": "Нейтральный фон",
      "cmd": "22 background neutral",
      "desc": "Фон не отвлекает от модели."
    },
    {
      "group": "Фон и окружение",
      "name": "Исходный фон",
      "cmd": "22 preserve background",
      "desc": "Не менять место и предметы исходной сцены."
    },
    {
      "group": "Фон и окружение",
      "name": "Реальный интерьер",
      "cmd": "22 background realistic interior",
      "desc": "Физически правдоподобное помещение."
    },
    {
      "group": "Фон и окружение",
      "name": "Улица",
      "cmd": "22 background real street",
      "desc": "Естественная улица без CGI-эффектов."
    },
    {
      "group": "Фон и окружение",
      "name": "Сельская местность",
      "cmd": "22 background countryside",
      "desc": "Простой реальный сельский пейзаж."
    },
    {
      "group": "Фон и окружение",
      "name": "Школьный коридор",
      "cmd": "22 background school corridor",
      "desc": "Учебное пространство, без искусственной постановки."
    },
    {
      "group": "Фон и окружение",
      "name": "Парк",
      "cmd": "22 background public park",
      "desc": "Естественное окружение и перспективы."
    },
    {
      "group": "Фон и окружение",
      "name": "Слабое размытие фона",
      "cmd": "22 background subtle optical blur",
      "desc": "Небольшое оптическое разделение плана."
    },
    {
      "group": "Серии и сравнение",
      "name": "2 ракурса",
      "cmd": "22 series two angles",
      "desc": "Один человек, два разных угла."
    },
    {
      "group": "Серии и сравнение",
      "name": "3 ракурса",
      "cmd": "22 series three angles",
      "desc": "Фронт, три четверти, профиль."
    },
    {
      "group": "Серии и сравнение",
      "name": "4 ракурса",
      "cmd": "22 series four angles",
      "desc": "Дополнительный ракурс при сохранении модели."
    },
    {
      "group": "Серии и сравнение",
      "name": "3 разных камеры",
      "cmd": "22 series three camera looks",
      "desc": "Одна модель, три разных характера съёмки."
    },
    {
      "group": "Серии и сравнение",
      "name": "До и после",
      "cmd": "22 comparison 3d and photo",
      "desc": "Сопоставление исходника и фотореалистичной версии."
    },
    {
      "group": "Серии и сравнение",
      "name": "Одинаковая одежда",
      "cmd": "22 series same outfit",
      "desc": "Сохранять одежду во всей серии."
    },
    {
      "group": "Серии и сравнение",
      "name": "Одинаковое лицо",
      "cmd": "22 series consistent identity",
      "desc": "Не менять лицо между кадрами."
    },
    {
      "group": "Серии и сравнение",
      "name": "Одинаковая сцена",
      "cmd": "22 series same environment",
      "desc": "Оставить фон неизменным во всей серии."
    },
    {
      "group": "Серии и сравнение",
      "name": "Ещё один ракурс",
      "cmd": "22 another angle same character",
      "desc": "Новая точка зрения на ту же модель."
    },
    {
      "group": "Серии и сравнение",
      "name": "Ещё один дубль",
      "cmd": "22 another take same constraints",
      "desc": "Новая вариация без потери заданных условий."
    }
  ]
};
