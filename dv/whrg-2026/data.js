window.WHRG_DATA = {
  meta: {
    title: "WHRG 2026",
    updated: "2026-08-29",
    teams: 666,
    robots: 2056,
    countries: 16,
    sessions: 1301,
    competitive: 30,
    scenario: 21
  },
  sources: {
    official: {label:"Оргкомитет / Beijing.gov.cn", url:"https://www.beijing.gov.cn/shipin/Interviewlive/1430.html"},
    robopodium: {label:"RoboPodium · протоколы организатора", url:"https://robopodium.com/results"},
    xinhua23: {label:"Xinhua · 23 Aug", url:"https://www.bj.news.cn/20260824/2d7448b221ea4b3ca483459e412cb7eb/c.html"},
    xinhua25: {label:"Xinhua · 25 Aug", url:"https://app.xinhuanet.com/news/article.html?articleId=2026082632c843335abf4055bcab366458287a46"},
    xinhua26: {label:"Xinhua · 26 Aug", url:"https://www.news.cn/sports/20260826/642fab7306524f3bbaee48f3eb9a4a32/c.html"},
    xinhua27: {label:"Xinhua · 27 Aug", url:"https://www.xinhuanet.com/sports/20260827/ef030ec2d6074bc68e717f47bb9055c8/c.html"},
    bjnewsNew: {label:"Beijing News · новые дисциплины", url:"https://www.bjnews.com.cn/detail/1787648045129344.html"},
    bjnewsScenario: {label:"Beijing News · сценарные финалы", url:"https://news.sina.cn/2026-08-23/detail-inipiiqn2339361.d.html?vt=4"},
    agibot: {label:"AgiBot · итог турнира", url:"https://app.xinhuanet.com/news/article.html?articleId=20260827aeb57984f28749f5a8359071842b6366"},
    tiangong: {label:"Beijing Humanoid · итог турнира", url:"https://finance.sina.com.cn/stock/t/2026-08-27/doc-inipuiyu0769830.shtml"},
    spqr: {label:"ANSA · SPQR silver", url:"https://www.ansa.it/canale_legalita_scuola/notizie/universita_news/2026/08/28/maker-faire-rome-arriva-il-torneo-di-calcio-internazionale-per-robot-umanoidi_d6a13b5b-c3a5-4dd0-8838-0d0b500cef52.html"},
    tug: {label:"Beijing News · tug of war", url:"https://news.sina.com.cn/o/2026-08-25/doc-inipqaae9500812.shtml"}
  },
  events: [
    {id:"c01",type:"competitive",category:"Лёгкая атлетика",name:"100 м · большие роботы",coverage:"full",source:"robopodium",placements:[
      {rank:1,team:"Tianjiao 016",country:"CN",result:"8,64 с"},{rank:2,team:"Tianxiao 017",country:"CN",result:"8,65 с"},{rank:3,team:"Fenghuo Shandian 078",country:"CN",result:"8,83 с"},{rank:4,team:"Feileishen 099",country:"CN",result:"8,85 с"},{rank:5,team:"Jinghong Dongli 148",country:"CN",result:"8,87 с"}
    ]},
    {id:"c02",type:"competitive",category:"Лёгкая атлетика",name:"100 м · малые роботы",coverage:"partial",source:"robopodium",placements:[
      {rank:1,team:"Tianxiao 017",country:"CN",result:"11,98 с",robot:"Tiangong Omni"},{rank:2,team:"Tianzhuo 015",country:"CN",result:"12,16 с"},{rank:3,team:"Rongyao Shuangchi 092",country:"CN",result:"12,19 с"},{rank:4,team:"Tianjiao 016",country:"CN",result:"12,35 с"}
    ]},
    {id:"c03",type:"competitive",category:"Лёгкая атлетика",name:"400 м · малые роботы",coverage:"partial",source:"robopodium",placements:[
      {rank:1,team:"Tiangong 001",country:"CN",result:"45,66 с",robot:"Tiangong Omni"},{rank:2,team:"Fenghuo Shandian",country:"CN",result:"48,47 с"},{rank:3,team:"Tianxiao",country:"CN",result:"1:14,80",note:"+30 с штраф"},{rank:4,team:"Tianjiao",country:"CN",result:"1:16,02",note:"+30 с штраф"}
    ]},
    {id:"c04",type:"competitive",category:"Лёгкая атлетика",name:"400 м · большие роботы",coverage:"partial",source:"robopodium",placements:[
      {rank:1,team:"Tiangong 001",country:"CN",result:"38,15 с",robot:"Tiangong Ultra"},{rank:2,team:"Zhuifeng Zaizai",country:"CN",result:"39,45 с"},{rank:3,team:"Jinghong Dongli",country:"CN",result:"39,66 с"},{rank:4,team:"Rongyao Shuangchi",country:"CN",result:"40,08 с"}
    ]},
    {id:"c05",type:"competitive",category:"Лёгкая атлетика",name:"1500 м",coverage:"partial",source:"robopodium",placements:[
      {rank:1,team:"Tianzhuo",country:"CN",result:"2:21,64"},{rank:2,team:"Feileishen",country:"CN",result:"2:30,00"},{rank:3,team:"Fenghuo Shandian",country:"CN",result:"2:30,22"},{rank:4,team:"Tiangong",country:"CN",result:"2:33,23"},{rank:5,team:"Rongyao Shuangchi",country:"CN",result:"2:36,73"},{rank:6,team:"Jinghong Dongli",country:"CN",result:"2:38,00"},{rank:7,team:"GMO Robots",country:"JP",result:"7:43,89"}
    ]},
    {id:"c06",type:"competitive",category:"Лёгкая атлетика",name:"4×100 м · эстафета",coverage:"partial",source:"xinhua26",placements:[
      {rank:1,team:"Tiangong 001",country:"CN",result:"2:20,79"}
    ]},
    {id:"c07",type:"competitive",category:"Лёгкая атлетика",name:"100 м · полоса препятствий",coverage:"full",source:"robopodium",placements:[
      {rank:1,team:"AgiBot Shenzhen",country:"CN",result:"1:28,32"},{rank:2,team:"Tianxiao",country:"CN",result:"1:39,97"},{rank:3,team:"AgiBot Ningxia",country:"CN",result:"1:40,35"},{rank:4,team:"AgiBot Beijing",country:"CN",result:"1:44,96"},{rank:5,team:"Tianzhuo",country:"CN",result:"1:46,07"},{rank:6,team:"AgiBot Chengdu",country:"CN",result:"1:48,80"},{rank:7,team:"AgiBot Shanghai",country:"CN",result:"2:01,71"},{rank:8,team:"Tianjiao",country:"CN",result:"2:04,22"}
    ]},
    {id:"c08",type:"competitive",category:"Лёгкая атлетика",name:"400 м · полоса препятствий",coverage:"full",source:"robopodium",placements:[
      {rank:1,team:"Tianjiao",country:"CN",result:"4:11,44"},{rank:2,team:"AgiBot Shanghai",country:"CN",result:"4:19,13"},{rank:3,team:"Tiangong",country:"CN",result:"4:32,65"},{rank:4,team:"AgiBot Ningxia",country:"CN",result:"4:40,03"},{rank:5,team:"Tianzhuo",country:"CN",result:"4:47,91"},{rank:6,team:"Tianxiao",country:"CN",result:"5:11,46"},{rank:7,team:"AgiBot Beijing",country:"CN",result:"7:39,86"},{rank:8,team:"AgiBot Shenzhen",country:"CN",result:"7:46,92"}
    ]},
    {id:"c09",type:"competitive",category:"Лёгкая атлетика",name:"Прыжок в длину с места",coverage:"full",source:"robopodium",placements:[
      {rank:1,team:"Tianzhuo",country:"CN",result:"4,83 м"},{rank:2,team:"Tianjiao",country:"CN",result:"4,75 м"},{rank:3,team:"Tianxiao",country:"CN",result:"4,64 м"},{rank:4,team:"Tiangong",country:"CN",result:"4,16 м"},{rank:5,team:"Unitree Team",country:"CN",result:"3,37 м"},{rank:6,team:"Beijing Lingyi",country:"CN",result:"3,17 м"},{rank:7,team:"Yuxingzhe",country:"CN",result:"2,81 м"},{rank:8,team:"Beijing Police College / BUCT / Yizhuang",country:"CN",result:"1,92 м"}
    ]},
    {id:"c10",type:"competitive",category:"Лёгкая атлетика",name:"Прыжок в длину",coverage:"partial",source:"robopodium",placements:[
      {rank:1,team:"Tianjiao",country:"CN",result:"7,97 м"},{rank:2,team:"Tianzhuo",country:"CN",result:"7,24 м"},{rank:3,team:"Tiangong",country:"CN",result:"7,19 м"},{rank:4,team:"Tianxiao",country:"CN",result:"7,19 м"},{rank:5,team:"Unitree Team",country:"CN",result:"4,07 м"},{rank:6,team:"Shanghai Gaoyi",country:"CN",result:"4,03 м"}
    ]},
    {id:"c11",type:"competitive",category:"Лёгкая атлетика",name:"Прыжок в высоту с места",coverage:"full",source:"robopodium",placements:[
      {rank:1,team:"Tianzhuo",country:"CN",result:"3,40 м"},{rank:2,team:"Tianxiao",country:"CN",result:"3,29 м"},{rank:3,team:"Tiangong",country:"CN",result:"3,26 м"},{rank:4,team:"Tianjiao",country:"CN",result:"2,80 м"},{rank:5,team:"Shanghai Gaoyi",country:"CN",result:"2,31 м"},{rank:6,team:"Unitree Team",country:"CN",result:"2,17 м"},{rank:7,team:"Songyan Power Xiaoshadian",country:"CN",result:"1,96 м"},{rank:8,team:"Zhuxing",country:"CN",result:"1,87 м"}
    ]},

    {id:"c12",type:"competitive",category:"Футбол",name:"5×5 · большие роботы",coverage:"partial",source:"spqr",placements:[
      {rank:1,team:"Tsinghua Hephaestus",country:"CN",result:"10–1 в финале"},{rank:2,team:"SPQR · Sapienza University of Rome",country:"IT",result:"серебро"}
    ]},
    {id:"c13",type:"competitive",category:"Футбол",name:"5×5 · средние роботы",coverage:"missing",source:"official",placements:[]},
    {id:"c14",type:"competitive",category:"Футбол",name:"3×3 U19 · средние роботы",coverage:"missing",source:"official",placements:[]},

    {id:"c15",type:"competitive",category:"Гимнастика",name:"Вольные упражнения",coverage:"full",source:"robopodium",placements:[
      {rank:1,team:"Xinghaitu Xingjian",country:"CN",result:"269,000"},{rank:2,team:"AgiBot Ningxia",country:"CN",result:"268,250"},{rank:3,team:"AgiBot Beijing",country:"CN",result:"266,250"},{rank:4,team:"AgiBot Wuxi",country:"CN",result:"265,500"},{rank:5,team:"Galaxea Team",country:"CN",result:"264,000"},{rank:6,team:"AgiBot Shenzhen",country:"CN",result:"262,500"},{rank:7,team:"AgiBot Shanghai",country:"CN",result:"261,250"},{rank:8,team:"AgiBot Chengdu",country:"CN",result:"256,500"}
    ]},

    {id:"c16",type:"competitive",category:"Тяжёлая атлетика",name:"Тяжёлая атлетика · лёгкий вес",coverage:"missing",source:"official",placements:[]},
    {id:"c17",type:"competitive",category:"Тяжёлая атлетика",name:"Тяжёлая атлетика · тяжёлый вес",coverage:"partial",source:"robopodium",placements:[
      {rank:1,team:"Beijing Humanoid–HUST Joint 9",country:"CN",result:"16 кг"},{rank:2,team:"Tianzhuo 3",country:"CN",result:"15 кг"},{rank:3,team:"Tiangong 6",country:"CN",result:"15 кг"}
    ]},

    {id:"c18",type:"competitive",category:"Танцы",name:"Street Dance",coverage:"missing",source:"official",placements:[]},
    {id:"c19",type:"competitive",category:"Танцы",name:"International Standard Dance",coverage:"partial",source:"robopodium",placements:[
      {rank:1,team:"Beijing Dance Academy × AgiBot",country:"CN",result:"90,43"},{rank:2,team:"Zhugidongli Humanoid Robot Team",country:"CN",result:"87,64"},{rank:3,team:"Capital University of Physical Education × Songyan Power",country:"CN",result:"86,29"}
    ]},
    {id:"c20",type:"competitive",category:"Танцы",name:"Cheerleading",coverage:"partial",source:"robopodium",placements:[
      {rank:1,team:"Luming Robot",country:"CN",result:"93,00"},{rank:2,team:"Beijing Humanoid × Beijing Dance Academy Humanities",country:"CN",result:"92,71"},{rank:3,team:"Beijing Dance Academy × Beijing Humanoid",country:"CN",result:"92,56"}
    ]},

    {id:"c21",type:"competitive",category:"Ушу",name:"Тайцзицюань",coverage:"partial",source:"robopodium",placements:[
      {rank:1,team:"AgiBot Shanghai",country:"CN",result:"40,50"},{rank:2,team:"Unitree Technology Team",country:"CN",result:"21,21"},{rank:3,team:"China Mobile Lingxi Robot",country:"CN",result:"17,96"},{rank:4,team:"Beijing Lingyi",country:"CN",result:"16,06"}
    ]},
    {id:"c22",type:"competitive",category:"Ушу",name:"Свободный бокс / Self-selected Boxing",coverage:"partial",source:"robopodium",placements:[
      {rank:1,team:"Shanghai Gaoyi",country:"CN",result:"84,00"},{rank:2,team:"AgiBot Wuxi",country:"CN",result:"75,21"},{rank:3,team:"AgiBot Ningxia",country:"CN",result:"74,28"},{rank:4,team:"Beijing Lingyi",country:"CN",result:"68,65"},{rank:5,team:"AgiBot Chengdu",country:"CN",result:"65,60"}
    ]},

    {id:"c23",type:"competitive",category:"Перетягивание каната",name:"Перетягивание каната · лёгкий вес",coverage:"partial",source:"tug",placements:[
      {rank:1,team:"Xingzhe Taishan",country:"CN",result:"золото"},{rank:2,team:"Thor",country:"CN",result:"серебро"},{rank:3,team:"RUC-HiLight",country:"CN",result:"бронза"}
    ]},
    {id:"c24",type:"competitive",category:"Перетягивание каната",name:"Перетягивание каната · тяжёлый вес",coverage:"partial",source:"robopodium",placements:[
      {rank:1,team:"Tiangong",country:"CN",result:"золото"},{rank:2,team:"Beijing Humanoid–HUST Joint",country:"CN",result:"серебро"},{rank:3,team:"Humanoid–HUST Mechanical School Joint",country:"CN",result:"бронза"}
    ]},

    {id:"c25",type:"competitive",category:"Тоу-ху",name:"Touhu · колёсные",coverage:"full",source:"robopodium",placements:[
      {rank:1,team:"AgiBot Chengdu",country:"CN",result:"15 очков"},{rank:2,team:"AgiBot Shanghai",country:"CN",result:"15 очков"},{rank:3,team:"RUC–Beijing Humanoid iYZhuo",country:"CN",result:"10 очков"},{rank:4,team:"RUC–Beijing Humanoid DTao",country:"CN",result:"место подтверждено"},{rank:5,team:"Lingxin Qiaoshou",country:"CN",result:"место подтверждено"}
    ]},
    {id:"c26",type:"competitive",category:"Тоу-ху",name:"Touhu · шагающие",coverage:"partial",source:"robopodium",placements:[
      {rank:1,team:"Qijiang Baibu Chuanyang",country:"CN",result:"5 очков"},{rank:2,team:"Beijing Humanoid–RUC uYTian",country:"CN",result:"серебро"},{rank:3,team:"Beijing Humanoid–HUST Joint",country:"CN",result:"бронза"}
    ]},

    {id:"c27",type:"competitive",category:"Настольный теннис",name:"Table Tennis · 1×1",coverage:"partial",source:"xinhua25",placements:[
      {rank:1,team:"Peking University × Beijing Academy of AI",country:"CN",result:"золото"},{rank:2,team:"HKU SMASH",country:"HK",chinaRegion:true,result:"серебро"}
    ]},

    {id:"c28",type:"competitive",category:"Свободный бой",name:"Free Combat · 40 кг",coverage:"partial",source:"robopodium",placements:[
      {rank:1,team:"North China Electric Power University",country:"CN",result:"золото"},{rank:2,team:"Unitree Technology Team",country:"CN",result:"серебро"},{rank:3,team:"Bingcheng Tiejia",country:"CN",result:"бронза"},{rank:4,team:"Shanghai Gaoyi",country:"CN",result:"4-е место"}
    ]},
    {id:"c29",type:"competitive",category:"Свободный бой",name:"Free Combat · 58 кг",coverage:"partial",source:"robopodium",placements:[
      {rank:1,team:"Shanxi GoGo",country:"CN",result:"золото"},{rank:2,team:"AgiBot Beijing",country:"CN",result:"серебро"},{rank:3,team:"Shanghai Sport University × AgiBot",country:"CN",result:"бронза"},{rank:4,team:"Tiequan Zhenyanyuan",country:"CN",result:"4-е место"}
    ]},
    {id:"c30",type:"competitive",category:"Свободный бой",name:"Free Combat · 80 кг",coverage:"partial",source:"robopodium",placements:[
      {rank:1,team:"BISTU × Beijing City University",country:"CN",result:"золото"},{rank:2,team:"Qi Yi Dian Team",country:"CN",result:"серебро"},{rank:3,team:"Tujing Zhixie Team",country:"CN",result:"бронза"},{rank:4,team:"Beijing Jiaotong University Mechatronics 1",country:"CN",result:"4-е место"}
    ]},

    {id:"s01",type:"scenario",category:"Сервисные сценарии",name:"Магазин · розничный сервис",coverage:"partial",source:"agibot",placements:[
      {rank:1,team:"Beijing Galaxy Star Data / Galbot",country:"CN",result:"золото",note:"публично подтверждён победитель; точное имя заявки в источнике не раскрыто"}
    ]},
    {id:"s02",type:"scenario",category:"Сервисные сценарии",name:"Общепит · приготовление и продажа",coverage:"partial",source:"agibot",placements:[
      {rank:1,team:"Beijing Galaxy Star Data / Galbot",country:"CN",result:"золото"}
    ]},
    {id:"s03",type:"scenario",category:"Промышленность",name:"Промышленность · упаковка и приёмка",coverage:"missing",source:"official",placements:[]},
    {id:"s04",type:"scenario",category:"Промышленность",name:"Промышленность · сборка и подача деталей",coverage:"missing",source:"official",placements:[]},
    {id:"s05",type:"scenario",category:"Аварийные сценарии",name:"Пожаротушение и спасение",coverage:"partial",source:"bjnewsScenario",placements:[
      {rank:1,team:"AgiBot Shanghai",country:"CN",result:"золото"},{rank:2,team:"AgiBot Wuxi",country:"CN",result:"серебро"},{rank:3,team:"Uliqi Future Warrior",country:"CN",result:"бронза"}
    ]},
    {id:"s06",type:"scenario",category:"Аварийные сценарии",name:"Экстренное реагирование",coverage:"partial",source:"agibot",placements:[
      {rank:1,team:"AgiBot Shenzhen",country:"CN",result:"золото"}
    ]},
    {id:"s07",type:"scenario",category:"Сервисные сценарии",name:"Офис · комплексный сервис",coverage:"partial",source:"agibot",placements:[
      {rank:1,team:"Qianxun Intelligence",country:"CN",result:"190 очков"},{rank:2,team:"AgiBot Shenzhen",country:"CN",result:"серебро"},{rank:3,team:"AgiBot Ningxia",country:"CN",result:"бронза"}
    ]},
    {id:"s08",type:"scenario",category:"Сервисные сценарии",name:"Дом · домашнее хозяйство",coverage:"partial",source:"bjnewsScenario",placements:[
      {rank:1,team:"Beijing Galaxy Star Data",country:"CN",result:"золото"}
    ]},
    {id:"s09",type:"scenario",category:"Сервисные сценарии",name:"Отель · обслуживание гостей",coverage:"partial",source:"bjnewsScenario",placements:[
      {rank:1,team:"Uliqi Black Panther",country:"CN",result:"золото"},{rank:2,team:"AgiBot Wuxi",country:"CN",result:"серебро"},{rank:3,team:"AgiBot Shanghai",country:"CN",result:"бронза"}
    ]},
    {id:"s10",type:"scenario",category:"Сервисные сценарии",name:"Библиотека · сортировка книг",coverage:"partial",source:"bjnewsScenario",placements:[
      {rank:1,team:"Tsinghua × SJTU × AgiBot Joint",country:"CN",result:"270 очков"},{rank:2,team:"Beijing Humanoid × Xiaowu Intelligence",country:"CN",result:"серебро"},{rank:3,team:"AgiBot Beijing",country:"CN",result:"бронза"}
    ]},
    {id:"s11",type:"scenario",category:"Сервисные сценарии",name:"Парк · управление территорией",coverage:"partial",source:"bjnewsScenario",placements:[
      {rank:1,team:"Beijing Humanoid × Henan Institute of Science and Technology",country:"CN",result:"золото"}
    ]},
    {id:"s12",type:"scenario",category:"Транспорт",name:"Зарядка электромобиля · smart charging",coverage:"partial",source:"tiangong",placements:[
      {rank:1,team:"Beijing Humanoid / Tiangong 3.0",country:"CN",result:"золото"},{rank:3,team:"Beijing Humanoid / Tiangong 3.0",country:"CN",result:"бронза",note:"разные заявки одной экосистемы; точные названия команд в публикации не указаны"}
    ]},

    {id:"s13",type:"scenario",category:"Ловкость рук",name:"Сборка электроинструмента",coverage:"partial",source:"xinhua23",placements:[
      {rank:1,team:"Lingxin Qiaoshou",country:"CN",result:"золото"}
    ]},
    {id:"s14",type:"scenario",category:"Ловкость рук",name:"Взвешивание порошка",coverage:"partial",source:"agibot",placements:[
      {rank:1,team:"Wuhan University × AgiBot",country:"CN",result:"золото"}
    ]},
    {id:"s15",type:"scenario",category:"Ловкость рук",name:"Сборка из блоков",coverage:"partial",source:"agibot",placements:[
      {rank:1,team:"AgiBot Shanghai",country:"CN",result:"золото"}
    ]},
    {id:"s16",type:"scenario",category:"Ловкость рук",name:"Фиксация гвоздя",coverage:"partial",source:"agibot",placements:[
      {rank:1,team:"AgiBot Wuxi",country:"CN",result:"золото"}
    ]},
    {id:"s17",type:"scenario",category:"Ловкость рук",name:"Открытие бутылки / поддевание крышки",coverage:"partial",source:"agibot",placements:[
      {rank:1,team:"AgiBot / OmniHand",country:"CN",result:"золото",note:"компания подтверждает золото OmniHand; конкретная региональная заявка не указана"}
    ]},
    {id:"s18",type:"scenario",category:"Ловкость рук",name:"Распаковка коробки",coverage:"partial",source:"agibot",placements:[
      {rank:1,team:"AgiBot / OmniHand",country:"CN",result:"золото",note:"компания подтверждает золото OmniHand; конкретная заявка не указана"}
    ]},
    {id:"s19",type:"scenario",category:"Ловкость рук",name:"Пинцет · перенос бобов",coverage:"partial",source:"agibot",placements:[
      {rank:1,team:"AgiBot Chengdu",country:"CN",result:"золото"}
    ]},
    {id:"s20",type:"scenario",category:"Ловкость рук",name:"Подключение кабеля",coverage:"partial",source:"agibot",placements:[
      {rank:1,team:"AgiBot / OmniHand",country:"CN",result:"золото",note:"AgiBot сообщает о 7 победах из 8 дисциплин OmniHand; точное имя заявки в сводке не приведено"}
    ]},
    {id:"s21",type:"scenario",category:"Многоборье",name:"Combined Pentathlon · комплексное пятиборье",coverage:"partial",source:"tiangong",placements:[
      {rank:1,team:"Beijing Humanoid / Tiangong 3.0",country:"CN",result:"золото"},{rank:2,team:"Beijing Humanoid / Tiangong 3.0",country:"CN",result:"серебро"}
    ]}
  ],
  internationalHighlights: [
    {country:"IT",team:"SPQR · Sapienza University of Rome",result:"2-е место",event:"Футбол 5×5 · большие роботы",note:"Единственная не-китайская команда, дошедшая до полуфинала этой сетки; в финале уступила Tsinghua Hephaestus.",source:"spqr"},
    {country:"JP",team:"GMO Robots",result:"7-е место · 7:43,89",event:"1500 м",note:"Подтверждённая позиция в опубликованном протоколе 1500 м.",source:"robopodium"},
    {country:"HK",chinaRegion:true,team:"HKU SMASH",result:"2-е место",event:"Настольный теннис 1×1",note:"Гонконг, Китай. В режиме «Только не Китай» эта строка скрывается.",source:"xinhua25"}
  ]
};
