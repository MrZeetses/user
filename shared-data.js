// ============================================================================
// ВОСТОК ХАУС — Общие данные меню, настройки Supabase и синхронизация
// ============================================================================

window.VOSTOK_DEFAULT_SB_URL = "https://gwfoyreeyuxxevysvzey.supabase.co";
window.VOSTOK_DEFAULT_SB_KEY = "sb_publishable_Sp0cCczhPjC1PZuecl0l3A_OJxldmLy";
window.VOSTOK_DEFAULT_AI_FN  = "vostok-ai"; // Сначала вызывает ресторанную функцию vostok-ai

const IMG = window.VOSTOK_IMAGES || {};

window.VOSTOK_CATEGORIES = [
  { slug: "all",    name: "Популярное и всё", icon: "🔥" },
  { slug: "plov",   name: "Плов и рис",       icon: "🍛" },
  { slug: "grill",  name: "Шашлык и мангал",  icon: "🍢" },
  { slug: "bakery", name: "Самса и выпечка",  icon: "🥟" },
  { slug: "manti",  name: "Манты и лагман",   icon: "🍜" },
  { slug: "soups",  name: "Супы и шурпа",     icon: "🍲" },
  { slug: "snacks", name: "Салаты и закуски", icon: "🥗" },
  { slug: "drinks", name: "Десерты и напитки",icon: "🫖" }
];

window.VOSTOK_ADDONS_BY_CATEGORY = {
  plov: [
    { id: "a-plov-1", name: "Казы (конская колбаса, 50 г)", price: 890 },
    { id: "a-plov-2", name: "Дополнительная томлёная баранина (80 г)", price: 950 },
    { id: "a-plov-3", name: "Перепелиные яйца (3 шт)", price: 450 },
    { id: "a-plov-4", name: "Печёная головка чеснока и стручковый чили", price: 290 },
    { id: "a-plov-5", name: "Салат Ачичук к плову (мини-порция)", price: 590 },
    { id: "a-plov-6", name: "Нут и сладкий кишмиш (двойная порция)", price: 350 }
  ],
  grill: [
    { id: "a-grill-1", name: "Соус Наршараб (гранатовый)", price: 390 },
    { id: "a-grill-2", name: "Соус Ткемали сливовый", price: 350 },
    { id: "a-grill-3", name: "Маринованный красный лук с сумахом", price: 300 },
    { id: "a-grill-4", name: "Овощи-гриль на углях (томат, баклажан, перец)", price: 790 },
    { id: "a-grill-5", name: "Острый соус Аджика домашняя", price: 320 },
    { id: "a-grill-6", name: "Свежая кинза и фиолетовый базилик", price: 350 }
  ],
  bakery: [
    { id: "a-bak-1", name: "Домашний каймак (густая сметана)", price: 390 },
    { id: "a-bak-2", name: "Топлёное сливочное масло с травами", price: 320 },
    { id: "a-bak-3", name: "Двойная порция тягучего сыра Сулугуни", price: 550 },
    { id: "a-bak-4", name: "Острый томатно-чесночный соус Лазджан", price: 300 },
    { id: "a-bak-5", name: "Пиала горячего мясного бульона к самсе", price: 450 }
  ],
  manti: [
    { id: "a-manti-1", name: "Домашняя сметана с горной зеленью", price: 350 },
    { id: "a-manti-2", name: "Острый уйгурский соус Лазджан с чесноком", price: 300 },
    { id: "a-manti-3", name: "Сливочно-чесночная подлива с кинзой", price: 380 },
    { id: "a-manti-4", name: "Дополнительная порция рубленого мяса (70 г)", price: 850 },
    { id: "a-manti-5", name: "Виноградный уксус с чёрным перцем", price: 250 }
  ],
  soups: [
    { id: "a-soup-1", name: "Домашняя сметана (50 г)", price: 350 },
    { id: "a-soup-2", name: "Свежая кинза, укроп и зелёный лук", price: 290 },
    { id: "a-soup-3", name: "Острый стручковый перец и чеснок", price: 250 },
    { id: "a-soup-4", name: "Дополнительная баранина на косточке (80 г)", price: 890 },
    { id: "a-soup-5", name: "Домашние сухарики с зирой и паприкой", price: 250 }
  ],
  snacks: [
    { id: "a-snk-1", name: "Зёрна спелого граната и дроблёный грецкий орех", price: 450 },
    { id: "a-snk-2", name: "Заправка из ароматного кунжутного масла", price: 320 },
    { id: "a-snk-3", name: "Свежий пучок кинзы и райхана", price: 350 },
    { id: "a-snk-4", name: "Острый перец чили кольцами", price: 220 },
    { id: "a-snk-5", name: "Кубики рассольного сыра брынза", price: 490 }
  ],
  drinks: [
    { id: "a-drk-1", name: "Кристаллы восточного сахара Нават", price: 350 },
    { id: "a-drk-2", name: "Горный цветочный мёд в пиале (50 г)", price: 450 },
    { id: "a-drk-3", name: "Свежий лимон и листья садовой мяты", price: 290 },
    { id: "a-drk-4", name: "Иранские фисташки и жареный миндаль (40 г)", price: 690 },
    { id: "a-drk-5", name: "Восточный рахат-лукум и курага к чаю", price: 590 },
    { id: "a-drk-6", name: "Сироп (карамельный / ванильный / ореховый)", price: 320 }
  ]
};

window.VOSTOK_BASE_BY_CATEGORY = {
  plov:   { title: "Подача с хлебом", options: ["Тандырная лепёшка", "Тонкий лаваш", "Без хлеба"] },
  grill:  { title: "Подача с хлебом", options: ["Тандырная лепёшка", "Тонкий лаваш", "Без хлеба"] },
  bakery: { title: "Температура подачи", options: ["С пылу с жару из тандыра", "Тёплая подача"] },
  manti:  { title: "Подача с хлебом", options: ["Тандырная лепёшка", "Тонкий лаваш", "Без хлеба"] },
  soups:  { title: "Подача с хлебом", options: ["Тандырная лепёшка", "Баурсаки (3 шт)", "Без хлеба"] },
  snacks: { title: "Заправка", options: ["С классической заправкой", "С оливковым маслом", "Без заправки"] },
  drinks: { title: "Сладость и подача", options: ["Без сахара", "С восточным сахаром Нават", "С горным мёдом"] }
};

window.getAddonsForCategory = function (catSlug) {
  return window.VOSTOK_ADDONS_BY_CATEGORY[catSlug] || window.VOSTOK_ADDONS_BY_CATEGORY.plov;
};

window.getBaseConfigForCategory = function (catSlug) {
  return window.VOSTOK_BASE_BY_CATEGORY[catSlug] || window.VOSTOK_BASE_BY_CATEGORY.plov;
};

window.VOSTOK_ADDONS = Object.values(window.VOSTOK_ADDONS_BY_CATEGORY).flat();

window.VOSTOK_BASE_OPTIONS = ["Тандырная лепёшка", "Тонкий лаваш", "Без хлеба"];

window.VOSTOK_PROMOS = [
  { code: "VOSTOK10", discount: 10, min: 3000, desc: "Скидка 10% от 3 000 ₸" },
  { code: "PLOV20",   discount: 20, min: 6000, desc: "Скидка 20% от 6 000 ₸" },
  { code: "NAURYZ15", discount: 15, min: 4500, desc: "Скидка 15% от 4 500 ₸" }
];

window.VOSTOK_STATUS_META = {
  new:        { label: "Принят",            step: 1, color: "bg-blue-100 text-blue-800" },
  cooking:    { label: "Готовится",         step: 2, color: "bg-amber-100 text-amber-800" },
  ready:      { label: "Готов к выдаче",    step: 3, color: "bg-emerald-100 text-emerald-800" },
  delivering: { label: "В пути",            step: 4, color: "bg-indigo-100 text-indigo-800" },
  completed:  { label: "Выполнен",          step: 5, color: "bg-stone-200 text-stone-800" },
  cancelled:  { label: "Отменён",           step: 0, color: "bg-rose-100 text-rose-800" },
  refunded:   { label: "Возврат / Брак",    step: 0, color: "bg-rose-200 text-rose-900" }
};

window.VOSTOK_ROLE_META = {
  customer:   { label: "Клиент",                  badge: "bg-stone-200 text-stone-800",     staff: false },
  accountant: { label: "Главный бухгалтер",       badge: "bg-teal-100 text-teal-800",       staff: true },
  kitchen:    { label: "Шеф-повар (Кухня KDS)",   badge: "bg-orange-100 text-orange-800",   staff: true },
  cashier:    { label: "Кассир (Терминал POS)",   badge: "bg-amber-100 text-amber-800",     staff: true },
  courier:    { label: "Курьер (Доставка)",       badge: "bg-indigo-100 text-indigo-800",   staff: true },
  warehouse:  { label: "Су-шеф / Склад и ТТК",    badge: "bg-blue-100 text-blue-800",       staff: true },
  admin:      { label: "Управляющий (Админ)",     badge: "bg-emerald-100 text-emerald-800", staff: true }
};

window.VOSTOK_SEED_PRODUCTS = [
  // 1. Плов и рис
  {
    id: "p-1",
    category_slug: "plov",
    name: "Плов Ташкентский праздничный с бараниной",
    description: "Рассыпчатый рис девзира, томлёная мякоть баранины, жёлтая морковь, нут, изюм, казы и печёный чеснок",
    base_price: 2890,
    weight: 400,
    calories: 740,
    image: IMG.plov || "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600",
    is_available: true,
    is_hit: true,
    is_spicy: false,
    is_veg: false,
    sizes: [
      { label: "Стандарт", mult: 1, g: 400 },
      { label: "Большая", mult: 1.35, g: 550 },
      { label: "Ляган на компанию", mult: 2.3, g: 1000 }
    ]
  },
  {
    id: "p-2",
    category_slug: "plov",
    name: "Плов Самаркандский слоёный с говядиной",
    description: "Классический слоёный плов на кунжутно-хлопковом масле с нежной телятиной, зирой и барбарисом",
    base_price: 2690,
    weight: 380,
    calories: 690,
    image: IMG.plov || "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600",
    is_available: true,
    is_hit: false,
    is_spicy: false,
    is_veg: false,
    sizes: [
      { label: "Стандарт", mult: 1, g: 380 },
      { label: "Большая", mult: 1.35, g: 520 },
      { label: "Ляган на компанию", mult: 2.2, g: 950 }
    ]
  },
  {
    id: "p-3",
    category_slug: "plov",
    name: "Плов Ферганский тёмный на курдюке",
    description: "Ароматный обжаренный плов из красного риса девзира с бараниной на косточке и острым стручковым перцем",
    base_price: 2950,
    weight: 400,
    calories: 780,
    image: IMG.plov || "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600",
    is_available: true,
    is_hit: true,
    is_spicy: true,
    is_veg: false,
    sizes: [
      { label: "Стандарт", mult: 1, g: 400 },
      { label: "Большая", mult: 1.35, g: 550 }
    ]
  },
  {
    id: "p-4",
    category_slug: "plov",
    name: "Плов Бухарский с курицей и курагой",
    description: "Лёгкий золотистый плов с филе цыплёнка, сладкой курагой, нутом и восточными пряностями",
    base_price: 2290,
    weight: 370,
    calories: 590,
    image: IMG.plov || "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600",
    is_available: true,
    is_hit: false,
    is_spicy: false,
    is_veg: false,
    sizes: [
      { label: "Стандарт", mult: 1, g: 370 },
      { label: "Большая", mult: 1.35, g: 500 }
    ]
  },

  // 2. Шашлык и мангал
  {
    id: "p-5",
    category_slug: "grill",
    name: "Люля-кебаб из баранины на углях",
    description: "Сочный рубленый кебаб с курдючным жирком, красным луком, сумахом, свежей кинзой и соусом Наршараб",
    base_price: 2590,
    weight: 260,
    calories: 520,
    image: IMG.shashlik || "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600",
    is_available: true,
    is_hit: true,
    is_spicy: false,
    is_veg: false,
    sizes: [
      { label: "1 шампур", mult: 1, g: 260 },
      { label: "Двойной (2 шампура)", mult: 1.8, g: 500 }
    ]
  },
  {
    id: "p-6",
    category_slug: "grill",
    name: "Шашлык из мраморной телятины",
    description: "Отборная вырезка молодой телятины в пряном маринаде, обжаренная на саксауле до сочной корочки",
    base_price: 3290,
    weight: 280,
    calories: 550,
    image: IMG.shashlik || "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600",
    is_available: true,
    is_hit: true,
    is_spicy: false,
    is_veg: false,
    sizes: [
      { label: "Стандарт", mult: 1, g: 280 },
      { label: "Большая", mult: 1.5, g: 420 }
    ]
  },
  {
    id: "p-7",
    category_slug: "grill",
    name: "Казан-кебаб из бараньих рёбрышек",
    description: "Томлёные в чугунном казане бараньи рёбрышки с румяным молодым картофелем, зирой и свежим луком",
    base_price: 3490,
    weight: 420,
    calories: 790,
    image: IMG.shashlik || "https://images.unsplash.com/photo-1544025162-d76694265947?w=600",
    is_available: true,
    is_hit: true,
    is_spicy: false,
    is_veg: false,
    sizes: [
      { label: "Стандарт", mult: 1, g: 420 },
      { label: "Большая", mult: 1.4, g: 600 }
    ]
  },
  {
    id: "p-8",
    category_slug: "grill",
    name: "Корейка ягнёнка на кости",
    description: "Нежнейшее каре молодого ягнёнка на мангале с печёными овощами и гранатовым соусом",
    base_price: 3890,
    weight: 310,
    calories: 640,
    image: IMG.shashlik || "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600",
    is_available: true,
    is_hit: false,
    is_spicy: false,
    is_veg: false,
    sizes: [
      { label: "3 косточки", mult: 1, g: 310 },
      { label: "5 косточек", mult: 1.6, g: 500 }
    ]
  },
  {
    id: "p-9",
    category_slug: "grill",
    name: "Шашлык из куриного бедра в тандыре",
    description: "Сочное куриное бедро в маринаде из айрана, паприки и чеснока с соусом ткемали",
    base_price: 2190,
    weight: 280,
    calories: 460,
    image: IMG.shashlik || "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600",
    is_available: true,
    is_hit: false,
    is_spicy: false,
    is_veg: false,
    sizes: [
      { label: "Стандарт", mult: 1, g: 280 },
      { label: "Двойной", mult: 1.75, g: 520 }
    ]
  },

  // 3. Самса и выпечка
  {
    id: "p-10",
    category_slug: "bakery",
    name: "Самса тандырная с рубленой бараниной",
    description: "Хрустящее слоёное тесто прямо со стенок глиняного тандыра с сочной бараниной, курдюком и кунжутом",
    base_price: 1450,
    weight: 260,
    calories: 560,
    image: IMG.samsa || "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600",
    is_available: true,
    is_hit: true,
    is_spicy: false,
    is_veg: false,
    sizes: [
      { label: "2 шт", mult: 1, g: 260 },
      { label: "4 шт", mult: 1.85, g: 520 }
    ]
  },
  {
    id: "p-11",
    category_slug: "bakery",
    name: "Самса слоёная с говядиной и луком",
    description: "Золотистая домашняя самса с рубленой телятиной, репчатым луком, зирой и чёрным тмином",
    base_price: 1290,
    weight: 240,
    calories: 510,
    image: IMG.samsa || "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600",
    is_available: true,
    is_hit: true,
    is_spicy: false,
    is_veg: false,
    sizes: [
      { label: "2 шт", mult: 1, g: 240 },
      { label: "4 шт", mult: 1.85, g: 480 }
    ]
  },
  {
    id: "p-12",
    category_slug: "bakery",
    name: "Самса с мускатной тыквой и сулугуни",
    description: "Нежная выпечка со сладкой печёной тыквой, тягучим сыром сулугуни и топлёным маслом",
    base_price: 1090,
    weight: 220,
    calories: 410,
    image: IMG.samsa || "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600",
    is_available: true,
    is_hit: false,
    is_spicy: false,
    is_veg: true,
    sizes: [
      { label: "2 шт", mult: 1, g: 220 },
      { label: "4 шт", mult: 1.85, g: 440 }
    ]
  },
  {
    id: "p-13",
    category_slug: "bakery",
    name: "Хачапури по-аджарски из печи",
    description: "Румяная лодочка из воздушного теста с двойным сыром сулугуни, сливочным маслом и фермерским желтком",
    base_price: 2190,
    weight: 360,
    calories: 690,
    image: IMG.samsa || "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600",
    is_available: true,
    is_hit: true,
    is_spicy: false,
    is_veg: true,
    sizes: [
      { label: "Стандарт", mult: 1, g: 360 },
      { label: "Большой с двойным сыром", mult: 1.35, g: 480 }
    ]
  },
  {
    id: "p-14",
    category_slug: "bakery",
    name: "Лепёшка Самаркандская из тандыра",
    description: "Горячая пышная лепёшка с хрустящей корочкой, кунжутом и нигеллой",
    base_price: 450,
    weight: 240,
    calories: 380,
    image: IMG.samsa || "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600",
    is_available: true,
    is_hit: false,
    is_spicy: false,
    is_veg: true,
    sizes: [
      { label: "1 шт", mult: 1, g: 240 },
      { label: "2 шт", mult: 1.9, g: 480 }
    ]
  },

  // 4. Манты и лагман
  {
    id: "p-15",
    category_slug: "manti",
    name: "Манты паровые с рубленой говядиной",
    description: "Тонкое тесто ручной лепки, сочная рубленая говядина с луком и зирой, подаются со сметаной",
    base_price: 2390,
    weight: 360,
    calories: 610,
    image: IMG.manti || "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600",
    is_available: true,
    is_hit: true,
    is_spicy: false,
    is_veg: false,
    sizes: [
      { label: "5 шт", mult: 1, g: 360 },
      { label: "8 шт", mult: 1.5, g: 570 }
    ]
  },
  {
    id: "p-16",
    category_slug: "manti",
    name: "Манты с бараниной и молодой тыквой",
    description: "Традиционные восточные манты с рубленым мясом ягнёнка и кубиками сладкой тыквы",
    base_price: 2490,
    weight: 360,
    calories: 590,
    image: IMG.manti || "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600",
    is_available: true,
    is_hit: false,
    is_spicy: false,
    is_veg: false,
    sizes: [
      { label: "5 шт", mult: 1, g: 360 },
      { label: "8 шт", mult: 1.5, g: 570 }
    ]
  },
  {
    id: "p-17",
    category_slug: "manti",
    name: "Лагман Уйгурский тянутый",
    description: "Домашняя тянутая лапша в насыщенном бульоне ваджу с телятиной, джусаем, перцем, сельдереем и лазджаном",
    base_price: 2450,
    weight: 440,
    calories: 540,
    image: IMG.lagman || "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600",
    is_available: true,
    is_hit: true,
    is_spicy: true,
    is_veg: false,
    sizes: [
      { label: "Стандарт", mult: 1, g: 440 },
      { label: "Большая", mult: 1.35, g: 600 }
    ]
  },
  {
    id: "p-18",
    category_slug: "manti",
    name: "Гуйру-лагман жареный на воке",
    description: "Тянутая лапша с обжаренной на сильном огне говядиной, пекинской капустой, перцем и соево-чесночным соусом",
    base_price: 2650,
    weight: 400,
    calories: 620,
    image: IMG.lagman || "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600",
    is_available: true,
    is_hit: true,
    is_spicy: true,
    is_veg: false,
    sizes: [
      { label: "Стандарт", mult: 1, g: 400 },
      { label: "Большая", mult: 1.35, g: 540 }
    ]
  },

  // 5. Супы и шурпа
  {
    id: "p-19",
    category_slug: "soups",
    name: "Шурпа Коурма из баранины с нутом",
    description: "Наваристый прозрачный бульон с мягкой бараниной на косточке, нутом, крупным картофелем и свежей кинзой",
    base_price: 2250,
    weight: 420,
    calories: 480,
    image: IMG.lagman || "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600",
    is_available: true,
    is_hit: true,
    is_spicy: false,
    is_veg: false,
    sizes: [
      { label: "Стандарт", mult: 1, g: 420 },
      { label: "Большая", mult: 1.3, g: 560 }
    ]
  },
  {
    id: "p-20",
    category_slug: "soups",
    name: "Чучвара по-бухарски в бульоне",
    description: "Миниатюрные пельмени ручной лепки с говядиной в ароматном бульоне с домашней сметаной и зеленью",
    base_price: 1990,
    weight: 380,
    calories: 490,
    image: IMG.manti || "https://images.unsplash.com/photo-1583032015879-e5022cb87c3b?w=600",
    is_available: true,
    is_hit: false,
    is_spicy: false,
    is_veg: false,
    sizes: [
      { label: "Стандарт", mult: 1, g: 380 },
      { label: "Большая", mult: 1.35, g: 510 }
    ]
  },

  // 6. Салаты и закуски
  {
    id: "p-21",
    category_slug: "snacks",
    name: "Салат Ачичук с ташкентскими томатами",
    description: "Тончайшие ломтики спелых розовых томатов со сладким красным луком, фиолетовым базиликом и чили",
    base_price: 1190,
    weight: 220,
    calories: 115,
    image: IMG.plov || "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600",
    is_available: true,
    is_hit: true,
    is_spicy: true,
    is_veg: true,
    sizes: [
      { label: "Стандарт", mult: 1, g: 220 },
      { label: "Большая", mult: 1.4, g: 320 }
    ]
  },
  {
    id: "p-22",
    category_slug: "snacks",
    name: "Мясная нарезка Казы и Чучук",
    description: "Деликатесная конская колбаса казы, подаётся с кольцами маринованного лука и зёрнами граната",
    base_price: 2790,
    weight: 180,
    calories: 510,
    image: IMG.shashlik || "https://images.unsplash.com/photo-1544025162-d76694265947?w=600",
    is_available: true,
    is_hit: false,
    is_spicy: false,
    is_veg: false,
    sizes: [
      { label: "180 г", mult: 1, g: 180 },
      { label: "300 г", mult: 1.6, g: 300 }
    ]
  },

  // 7. Десерты и напитки
  {
    id: "p-23",
    category_slug: "drinks",
    name: "Пахлава медовая с иранской фисташкой",
    description: "Тончайшие слои теста фило с грецким орехом, горным мёдом, кардамоном и дроблёной фисташкой",
    base_price: 1390,
    weight: 160,
    calories: 490,
    image: IMG.baklava || "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=600",
    is_available: true,
    is_hit: true,
    is_spicy: false,
    is_veg: true,
    sizes: [
      { label: "3 шт", mult: 1, g: 160 },
      { label: "6 шт", mult: 1.85, g: 320 }
    ]
  },
  {
    id: "p-24",
    category_slug: "drinks",
    name: "Чай «Шёлковый путь» в чайнике",
    description: "Отборный листовой чай с горным чабрецом, мятой, свежим лимоном и кристаллами восточного сахара нават",
    base_price: 1290,
    weight: 800,
    calories: 65,
    image: IMG.baklava || "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600",
    is_available: true,
    is_hit: true,
    is_spicy: false,
    is_veg: true,
    sizes: [
      { label: "Чайник 800 мл", mult: 1, g: 800 },
      { label: "Большой чайник 1.2 л", mult: 1.35, g: 1200 }
    ]
  },
  {
    id: "p-25",
    category_slug: "drinks",
    name: "Айран домашний с горной зеленью",
    description: "Прохладный густой айран собственного приготовления с мелко рубленым укропом, мятой и свежим огурцом",
    base_price: 750,
    weight: 400,
    calories: 135,
    image: IMG.baklava || "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600",
    is_available: true,
    is_hit: false,
    is_spicy: false,
    is_veg: true,
    sizes: [
      { label: "400 мл", mult: 1, g: 400 },
      { label: "Кувшин 1 л", mult: 2.1, g: 1000 }
    ]
  },
  {
    id: "p-26",
    category_slug: "drinks",
    name: "Шербет гранатово-вишнёвый",
    description: "Натуральный освежающий восточный напиток из зёрен граната, спелой вишни и лепестков каркаде",
    base_price: 890,
    weight: 450,
    calories: 160,
    image: IMG.baklava || "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600",
    is_available: true,
    is_hit: false,
    is_spicy: false,
    is_veg: true,
    sizes: [
      { label: "450 мл", mult: 1, g: 450 },
      { label: "Кувшин 1 л", mult: 2.0, g: 1000 }
    ]
  }
];

window.VOSTOK_SEED_INVENTORY = [
  { id: "i-1",  sku: "ING-0012", name: "Рис Девзира и Лазер",              category: "Бакалея и крупы",   unit: "кг", qty: 42.5, min: 10.0, cost: 1450, supplier: 'ТОО "ВостокАгро"',       warehouse: "Основной" },
  { id: "i-2",  sku: "ING-0045", name: "Баранина (мякоть и корейка)",      category: "Мясо и птица",      unit: "кг", qty: 28.0, min: 8.0,  cost: 4200, supplier: 'АО "КазМясо Халяль"',    warehouse: "Кухня" },
  { id: "i-3",  sku: "ING-0078", name: "Говядина (вырезка)",               category: "Мясо и птица",      unit: "кг", qty: 34.0, min: 10.0, cost: 3800, supplier: 'АО "КазМясо Халяль"',    warehouse: "Кухня" },
  { id: "i-4",  sku: "ING-0098", name: "Мука высший сорт",                 category: "Бакалея и крупы",   unit: "кг", qty: 55.0, min: 15.0, cost: 420,  supplier: 'ТОО "Казах Зерно"',      warehouse: "Основной" },
  { id: "i-5",  sku: "ING-0144", name: "Гранатовый соус Наршараб",         category: "Соусы и специи",    unit: "л",  qty: 2.8,  min: 4.0,  cost: 3200, supplier: 'ИП "Шёлковый Путь"',     warehouse: "Кухня" },
  { id: "i-6",  sku: "ING-0162", name: "Кинза, райхан и зелень",           category: "Овощи и зелень",    unit: "кг", qty: 1.2,  min: 2.5,  cost: 2400, supplier: 'ТОО "ФудТрейд"',         warehouse: "Кухня" },
  { id: "i-7",  sku: "ING-0175", name: "Жёлтая самаркандская морковь",     category: "Овощи и зелень",    unit: "кг", qty: 38.0, min: 12.0, cost: 380,  supplier: 'ТОО "ФудТрейд"',         warehouse: "Основной" },
  { id: "i-8",  sku: "ING-0182", name: "Казы и курдюк",                    category: "Мясо и птица",      unit: "кг", qty: 14.5, min: 5.0,  cost: 5400, supplier: 'ИП "Жайляу Деликатес"',  warehouse: "Кухня" },
  { id: "i-9",  sku: "ING-0201", name: "Сыр Сулугуни",                     category: "Молочные продукты", unit: "кг", qty: 11.0, min: 4.0,  cost: 3600, supplier: 'ИП "Парма Сыр"',         warehouse: "Кухня" },
  { id: "i-10", sku: "ING-0245", name: "Чай листовой и горный чабрец",     category: "Бар и чайхана",     unit: "кг", qty: 6.4,  min: 2.0,  cost: 4800, supplier: 'ТОО "Чайный Дом"',       warehouse: "Бар" },
  { id: "i-11", sku: "ING-0289", name: "Томаты ташкентские розовые",       category: "Овощи и зелень",    unit: "кг", qty: 3.4,  min: 6.0,  cost: 950,  supplier: 'ТОО "ФудТрейд"',         warehouse: "Кухня" },
  { id: "i-12", sku: "ING-0312", name: "Фисташка иранская и грецкий орех", category: "Бар и чайхана",     unit: "кг", qty: 1.8,  min: 3.0,  cost: 8900, supplier: 'ИП "Шёлковый Путь"',     warehouse: "Бар" }
];

window.VOSTOK_SEED_STAFF = [
  { id: "00000000-0000-0000-0000-000000000001", name: "Рустам Каримов",              email: "admin@vostok.kz",      role: "admin",      shift: true,  shiftRate: 22000, shiftsWorked: 22, bonusPay: 45000 },
  { id: "00000000-0000-0000-0000-000000000007", name: "Ирина П. / Гульнара С.",      email: "buh@vostok.kz",        role: "accountant", shift: true,  shiftRate: 19500, shiftsWorked: 21, bonusPay: 30000 },
  { id: "00000000-0000-0000-0000-000000000002", name: "Азизбек Умаров (Шеф-ошпаз)",  email: "kitchen@vostok.kz",    role: "kitchen",    shift: true,  shiftRate: 18500, shiftsWorked: 21, bonusPay: 35000 },
  { id: "00000000-0000-0000-0000-000000000003", name: "Мадина Садыкова",             email: "cashier@vostok.kz",    role: "cashier",    shift: true,  shiftRate: 13500, shiftsWorked: 20, bonusPay: 20000 },
  { id: "00000000-0000-0000-0000-000000000004", name: "Ерлан Нурланов",              email: "courier@vostok.kz",    role: "courier",    shift: true,  shiftRate: 12500, shiftsWorked: 22, bonusPay: 28000 },
  { id: "00000000-0000-0000-0000-000000000008", name: "Алексей К. (Су-шеф / Склад)", email: "sklad@vostok.kz",      role: "warehouse",  shift: true,  shiftRate: 17500, shiftsWorked: 21, bonusPay: 25000 },
  { id: "00000000-0000-0000-0000-000000000005", name: "Бахтияр Рахимов (Мангал)",    email: "kitchen2@vostok.kz",   role: "kitchen",    shift: true,  shiftRate: 17000, shiftsWorked: 19, bonusPay: 25000 },
  { id: "00000000-0000-0000-0000-000000000006", name: "Дастан Алиев",                email: "courier2@vostok.kz",   role: "courier",    shift: false, shiftRate: 12500, shiftsWorked: 16, bonusPay: 18000 }
];

// Генератор 100 реалистичных заказов за 30 дней для демонстрации аналитики за День / Неделю / Месяц
window.VOSTOK_SEED_ORDERS = (function () {
  const names = [
    "Тимур Ахметов", "Алина Касымова", "Данияр Муратов", "Айгерим Сапарова", "Нурлан Беков",
    "Мадина Оспанова", "Ержан Калиев", "Динара Сулейменова", "Асхат Жумабаев", "Камила Ибраева",
    "Бауржан Токтаров", "Сауле Нурмагамбетова", "Арман Досов", "Гульнара Серикова", "Руслан Тажиев",
    "Жанна Абдрахманова", "Марат Кожахметов", "Асель Тулегенова", "Санжар Есимов", "Зарина Байжанова"
  ];
  const addrs = [
    "ул. Абая, 45, кв. 18", "пр. Шакарима, 12, оф. 4", "ул. Кабанбай батыра, 88, кв. 5",
    "ул. Достык, 114, кв. 32", "пр. Ауэзова, 27, кв. 90", "ул. Гагарина, 63, кв. 11",
    "мкр. Самал-2, д. 19, кв. 44", "ул. Толе би, 155, кв. 7", "ул. Сатпаева, 30, оф. 205", "ул. Богенбай батыра, 71, кв. 14"
  ];
  const dishes = [
    { name: "Плов Ташкентский праздничный с бараниной", price: 2890, drink: false },
    { name: "Шашлык из мраморной телятины", price: 3290, drink: false },
    { name: "Люля-кебаб из баранины на углях", price: 2590, drink: false },
    { name: "Самса тандырная с рубленой бараниной", price: 1450, drink: false },
    { name: "Лагман Уйгурский тянутый", price: 2450, drink: false },
    { name: "Манты паровые с рубленой говядиной", price: 2390, drink: false },
    { name: "Казан-кебаб из бараньих рёбрышек", price: 3490, drink: false },
    { name: "Хачапури по-аджарски из печи", price: 2190, drink: false },
    { name: "Шурпа Коурма из баранины с нутом", price: 2250, drink: false },
    { name: "Чай «Шёлковый путь» в чайнике", price: 1290, drink: true },
    { name: "Пахлава медовая с иранской фисташкой", price: 1390, drink: true },
    { name: "Плов Ферганский тёмный на курдюке", price: 2950, drink: false },
    { name: "Салат Ачичук с ташкентскими томатами", price: 1190, drink: false },
    { name: "Гуйру-лагман жареный на воке", price: 2650, drink: false }
  ];

  const list = [];
  const now = Date.now();
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  for (let i = 1; i <= 100; i++) {
    const num = 100 + i;
    const customer = names[(i * 7) % names.length];
    const phone = `+7 (70${1 + (i % 7)}) ${String(((210 + i * 13) % 900) + 100)}-${String(((i * 19) % 89) + 10)}-${String(((i * 23) % 89) + 10)}`;

    let daysAgo = 0;
    if (i <= 14) daysAgo = 0;
    else if (i <= 42) daysAgo = 1 + (i % 6);
    else daysAgo = 7 + ((i * 3) % 23);

    const hour = 11 + ((i * 5) % 11);
    const min = (i * 11) % 55;
    let createdAt = startOfToday.getTime() - daysAgo * 86400000 + hour * 3600000 + min * 60000;
    if (daysAgo === 0 && createdAt > now) {
      createdAt = now - i * 4 * 60000;
    }

    const type = i % 3 === 0 ? "dine_in" : "delivery";
    const address = type === "dine_in" ? "В зале (свободная посадка)" : addrs[(i * 3) % addrs.length];
    const paymentMethod = i % 5 === 0 ? "cash" : "card";

    let status = "completed";
    let paymentStatus = "paid";
    let refundReason = "";
    let refundType = "";
    let refundAmount = 0;
    let writeoffCost = 0;
    if (i === 1) status = "new";
    else if (i === 2 || i === 3) status = "cooking";
    else if (i === 4 || i === 5) status = "ready";
    else if (i === 6) status = "delivering";
    else if (i === 35 || i === 72) status = "cancelled";

    const idx1 = i % 4 === 0 ? 0 : i % 5 === 0 ? 1 : (i * 3) % dishes.length;
    let idx2 = (i * 5 + 3) % dishes.length;
    if (idx2 === idx1) idx2 = 9;

    const d1 = dishes[idx1];
    const d2 = dishes[idx2];
    const q1 = 1 + (i % 2);
    const q2 = 1;
    const total = d1.price * q1 + d2.price * q2;
    const isDone = ["ready", "delivering", "completed"].includes(status);

    if (num === 198) {
      status = "refunded";
      paymentStatus = "refunded";
      refundReason = "Посторонний предмет в блюде (волос и т.д.)";
      refundType = "money_refund";
      refundAmount = total;
      writeoffCost = Math.round(total * 0.34);
    } else if (num === 196) {
      status = "cooking";
      refundReason = "Не устроил вкус или качество приготовления блюда (пересол / недожар)";
      refundType = "remake_dish";
      refundAmount = 0;
      writeoffCost = Math.round(total * 0.34);
    }

    list.push({
      id: `ord-${num}`,
      number: num,
      customer,
      phone,
      type,
      address,
      comment: num === 198
        ? "[ВОЗВРАТ: Посторонний предмет в блюде (волос и т.д.) • Возврат денег клиенту]"
        : num === 196
          ? "[ПЕРЕДЕЛКА БРАКА: Не устроил вкус или качество приготовления блюда]"
          : i % 7 === 0 ? "Побольше салфеток и горячую лепёшку" : "",
      paymentMethod,
      paymentStatus,
      transactionId: `TX-${884000 + i}`,
      status,
      total,
      refundReason,
      refundType,
      refundAmount,
      writeoffCost,
      courierName: type === "delivery" ? (i % 2 === 0 ? "Ерлан Нурланов" : "Дастан Алиев") : "",
      createdAt,
      items: [
        {
          name: d1.name,
          size: "Стандарт",
          base: d1.drink ? "С восточным сахаром Нават" : "Тандырная лепёшка",
          addons: i % 3 === 0 ? ["Казы (конская колбаса, 50 г)"] : [],
          qty: q1,
          price: d1.price,
          ready: isDone
        },
        {
          name: d2.name,
          size: "Стандарт",
          base: d2.drink ? "С горным мёдом" : "Тонкий лаваш",
          addons: [],
          qty: q2,
          price: d2.price,
          ready: isDone
        }
      ]
    });
  }
  return list;
})();

// Форматирование валюты в тенге (₸)
window.fmtKZT = function (n) {
  return Number(n || 0).toLocaleString("ru-RU") + " ₸";
};

// Единое хранилище состояния между index.html и staff.html + Supabase
const SHARED_STORAGE_KEY = "vostok_house_shared_db_v5";
const SB_CFG_STORAGE_KEY = "vostok_sb_preview_cfg_v3";

window.loadVostokConfig = function () {
  try {
    const raw = localStorage.getItem(SB_CFG_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        url: (parsed.url || window.VOSTOK_DEFAULT_SB_URL).trim(),
        key: (parsed.key || window.VOSTOK_DEFAULT_SB_KEY).trim(),
        aiFn: (parsed.aiFn || window.VOSTOK_DEFAULT_AI_FN).trim()
      };
    }
  } catch (_) {}
  return {
    url: window.VOSTOK_DEFAULT_SB_URL,
    key: window.VOSTOK_DEFAULT_SB_KEY,
    aiFn: window.VOSTOK_DEFAULT_AI_FN
  };
};

window.saveVostokConfig = function (url, key, aiFn) {
  try {
    localStorage.setItem(
      SB_CFG_STORAGE_KEY,
      JSON.stringify({
        url: (url || "").trim(),
        key: (key || "").trim(),
        aiFn: (aiFn || "ertis-ai").trim()
      })
    );
  } catch (_) {}
};

window.loadSharedDb = function () {
  try {
    const raw = localStorage.getItem(SHARED_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        products: parsed.products?.length ? parsed.products : window.VOSTOK_SEED_PRODUCTS,
        inventory: parsed.inventory?.length ? parsed.inventory : window.VOSTOK_SEED_INVENTORY,
        staff: parsed.staff?.length ? parsed.staff : window.VOSTOK_SEED_STAFF,
        orders: parsed.orders?.length ? parsed.orders : window.VOSTOK_SEED_ORDERS,
        paymentLogs: parsed.paymentLogs || []
      };
    }
  } catch (_) {}
  return {
    products: window.VOSTOK_SEED_PRODUCTS,
    inventory: window.VOSTOK_SEED_INVENTORY,
    staff: window.VOSTOK_SEED_STAFF,
    orders: window.VOSTOK_SEED_ORDERS,
    paymentLogs: []
  };
};

window.saveSharedDb = function (dbPatch) {
  try {
    const current = window.loadSharedDb();
    const next = {
      products: dbPatch.products || current.products,
      inventory: dbPatch.inventory || current.inventory,
      staff: dbPatch.staff || current.staff,
      orders: dbPatch.orders || current.orders,
      paymentLogs: dbPatch.paymentLogs || current.paymentLogs
    };
    localStorage.setItem(SHARED_STORAGE_KEY, JSON.stringify(next));
  } catch (_) {}
};

// Ответ ИИ-ассистента (через Supabase Edge Function vostok-ai + глубокий аналитический ответ по живым данным БД)
window.callVostokAi = async function ({ sbUrl, sbKey, aiFn, systemPrompt, history, userText, dbSnapshot }) {
  const urlBase = (sbUrl || window.VOSTOK_DEFAULT_SB_URL).replace(/\/+$/, "");
  const key = sbKey || window.VOSTOK_DEFAULT_SB_KEY;
  const fn = aiFn || "vostok-ai";

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 7500);
    const res = await fetch(`${urlBase}/functions/v1/${fn}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": key
      },
      body: JSON.stringify({
        systemPrompt,
        history: (history || []).slice(-8)
      }),
      signal: controller.signal
    });
    clearTimeout(timer);
    const data = await res.json().catch(() => ({}));
    if (res.ok && data?.reply) {
      const rText = String(data.reply).trim();
      const rLow = rText.toLowerCase();
      const isHydroReply = rLow.includes("гидропост") || rLow.includes("ертіс") || rLow.includes("бекет") || rLow.includes("шүлбі");
      // Проверяем, что ответ не оборвался на полуслове (не короче 70 символов)
      if (!isHydroReply && rText.length >= 70) {
        return { reply: rText, source: `Supabase Edge (${fn})` };
      }
    }
  } catch (_) {}

  // Продуманный и информативный ответ напрямую по живым данным базы данных (меню, цены в ₸, промокоды, заказы, возвраты, склад)
  const q = (userText || "").toLowerCase();
  const prods = (dbSnapshot?.products || window.VOSTOK_SEED_PRODUCTS).filter((p) => p.is_available);
  const stopped = (dbSnapshot?.products || []).filter((p) => !p.is_available);
  const orders = dbSnapshot?.orders || [];
  const inventory = dbSnapshot?.inventory || [];
  const isStaff = Boolean(dbSnapshot?.isStaff);

  if (isStaff) {
    const validOrds = orders.filter((o) => o.status !== "cancelled" && o.status !== "refunded");
    const refundedOrds = orders.filter((o) => o.status === "refunded" || Number(o.refundAmount || 0) > 0);
    const revenue = validOrds.reduce((s, o) => s + Number(o.total || 0), 0);
    const refundLoss = refundedOrds.reduce((s, o) => s + Number(o.refundAmount || o.total || 0), 0);
    const writeoffLoss = refundedOrds.reduce((s, o) => s + Number(o.writeoffCost || Math.round((o.total || 0) * 0.32)), 0);
    const activeOrders = orders.filter((o) => ["new", "cooking", "ready", "delivering"].includes(o.status));
    const lowInv = inventory.filter((i) => Number(i.qty) <= Number(i.min));
    if (q.includes("склад") || q.includes("остат") || q.includes("продукт") || q.includes("закуп")) {
      return {
        reply:
          `**Детальный анализ склада и закупочной стоимости из БД Supabase:**\n\n` +
          inventory.map((i) => `- **${i.sku || "ING"} • ${i.name}**: остаток \`${Number(i.qty).toFixed(1)} ${i.unit}\` по цене \`${window.fmtKZT(i.cost || 1500)}/${i.unit}\` (сумма: **${window.fmtKZT(Math.round(Number(i.qty) * Number(i.cost || 1500)))}**)${Number(i.qty) <= Number(i.min) ? " — ⚠️ *критический остаток, требуется автозаказ поставщику " + (i.supplier || "") + "!*" : ""}`).join("\n") +
          (lowInv.length ? `\n\n**Рекомендация ИИ:** срочно отправьте заявку поставщикам по **${lowInv.length} поз.** (${lowInv.map((x) => x.name).join(", ")}), чтобы избежать постановки блюд на стоп-лист.` : "\n\n**Вывод ИИ:** Все позиции выше минимального лимита, запасов достаточно для бесперебойной работы кухни."),
        source: "Live DB Analyzer"
      };
    }
    return {
      reply:
        `**Аналитическая и бухгалтерская сводка «ВОСТОК ХАУС» по базе данных:**\n\n` +
        `1. **Выручка (Оборот):** \`${window.fmtKZT(revenue)}\` (успешных заказов: **${validOrds.length}**, средний чек: \`${window.fmtKZT(validOrds.length ? Math.round(revenue / validOrds.length) : 0)}\`)\n` +
        `2. **Себестоимость сырья (Food Cost 32%):** \`-${window.fmtKZT(Math.round(revenue * 0.32))}\`\n` +
        `3. **Возвраты и брак блюд:** **${refundedOrds.length} инцидентов** (возврат средств клиентам: \`-${window.fmtKZT(refundLoss)}\`, убыток от списания продуктов: \`-${window.fmtKZT(writeoffLoss)}\`)\n` +
        `4. **Операционная нагрузка:** сейчас в работе **${activeOrders.length} активных заказов** (${activeOrders.map((o) => `#${o.number} — ${window.VOSTOK_STATUS_META[o.status]?.label}`).join(", ") || "очередь свободна"})\n` +
        `5. **Контроль меню и склада:** в продаже **${prods.length} блюд** (на стопе: **${stopped.length}**), критических позиций сырья: **${lowInv.length}**.`,
      source: "Live DB Analyzer"
    };
  }

  // Ответы для клиента по данным базы
  if (q.includes("возврат") || q.includes("волос") || q.includes("претенз") || q.includes("брак") || q.includes("не устро")) {
    return {
      reply:
        `**Гарантия качества «ВОСТОК ХАУС» — мгновенный возврат или переделка блюда:**\n\n` +
        `Если в блюде обнаружен посторонний предмет (например, волос), блюдо остыло или не устроило по качеству:\n` +
        `1. Откройте раздел **«📋 Мои заказы»** в верхней шапке сайта.\n` +
        `2. Нажмите кнопку **«⚠️ Оформить возврат / Претензия по качеству»** напротив вашего заказа.\n` +
        `3. Выберите причину (*посторонний предмет / волос*, *не устроил вкус или температура*, *ошибка комплектации*) и решение: **100% возврат денег на карту** или **срочная бесплатная переделка блюда за счёт заведения**.\n\n` +
        `Заявка мгновенно поступает в Бухгалтерию и на Кухню KDS для возврата средств и списания брака!`,
      source: "Live DB"
    };
  }

  if (q.includes("статус") || q.includes("заказ") || q.includes("где мой")) {
    const latest = dbSnapshot?.trackedOrder || orders[0];
    if (!latest) {
      return {
        reply: "В вашей личной истории пока нет активных заказов. Выберите блюда в меню, нажмите **«В корзину +»** и оформите заказ на **Доставку** (за 35–45 минут) или **В зале (свободная посадка)**!",
        source: "Live DB"
      };
    }
    const st = window.VOSTOK_STATUS_META[latest.status]?.label || latest.status;
    return {
      reply:
        `**Подробная информация по вашему заказу #${latest.number} из базы данных:**\n\n` +
        `- **Текущий статус:** **${st}**\n` +
        `- **Формат получения:** ${latest.type === "delivery" ? `Доставка по адресу: ${latest.address}` : "В зале (свободная посадка — займите любой свободный столик)"}\n` +
        `- **Состав заказа:** ${(latest.items || []).map((i) => `**${i.name}** (${i.size || "Стандарт"}) ×${i.qty}`).join(", ")}\n` +
        `- **Итоговая сумма:** \`${window.fmtKZT(latest.total)}\`${latest.refundReason ? `\n- **Статус претензии:** Оформлен возврат (${latest.refundReason})` : ""}`,
      source: "Live DB"
    };
  }

  if (q.includes("промо") || q.includes("скидк") || q.includes("акци")) {
    return {
      reply:
        `**Действующие промокоды и акции в базе данных «ВОСТОК ХАУС»:**\n\n` +
        `- \`START15\` — **скидка 15%** на первый заказ (от \`2 500 ₸\`)\n` +
        window.VOSTOK_PROMOS.map((p) => `- \`${p.code}\` — **скидка ${p.discount}%** при заказе от \`${window.fmtKZT(p.min)}\` (${p.desc})`).join("\n") +
        `\n\n**Совет от Восток AI:** введите промокод в правой колонке **«Ваш заказ»** и нажмите **«ОК»** — итоговая сумма в тенге пересчитается автоматически!`,
      source: "Live DB"
    };
  }

  if (q.includes("сет") || q.includes("компани") || q.includes("10") || q.includes("собери")) {
    const plov = prods.find((p) => p.category_slug === "plov") || prods[0];
    const grill = prods.find((p) => p.category_slug === "grill") || prods[1];
    const manti = prods.find((p) => p.category_slug === "manti") || prods[2];
    const bakery = prods.find((p) => p.category_slug === "bakery") || prods[3];
    const drink = prods.find((p) => p.category_slug === "drinks") || prods[prods.length - 1];
    const sum = (plov?.base_price || 0) + (grill?.base_price || 0) + (manti?.base_price || 0) + (bakery?.base_price || 0) + (drink?.base_price || 0);
    const withPromo = Math.round(sum * 0.8);
    return {
      reply:
        `**Сбалансированный восточный сет на компанию до 10 000 ₸ (по данным живого меню):**\n\n` +
        `1. 🍛 **${plov?.name}** (${plov?.weight} г, ${plov?.calories} ккал) — \`${window.fmtKZT(plov?.base_price)}\`\n` +
        `   *Почему стоит взять:* рассыпчатый рис девзира с томлёной бараниной, нутом и казы.\n` +
        `2. 🍢 **${grill?.name}** (${grill?.weight} г) — \`${window.fmtKZT(grill?.base_price)}\`\n` +
        `   *Почему стоит взять:* сочное мясо на саксауле с дымком и гранатовым соусом Наршараб.\n` +
        `3. 🍜 **${manti?.name}** (${manti?.weight} г) — \`${window.fmtKZT(manti?.base_price)}\`\n` +
        `4. 🥟 **${bakery?.name}** (${bakery?.weight} г) — \`${window.fmtKZT(bakery?.base_price)}\`\n` +
        `5. 🫖 **${drink?.name}** (${drink?.weight} мл) — \`${window.fmtKZT(drink?.base_price)}\`\n\n` +
        `**Сумма без скидки:** \`${window.fmtKZT(sum)}\`\n` +
        `**Со скидкой -20% по промокоду \`PLOV20\`:** всего **\`${window.fmtKZT(withPromo)}\`**!`,
      source: "Live DB"
    };
  }

  // Развёрнутый ответ по меню и хитам с описанием категорий и состава
  const hits = prods.filter((p) => p.is_hit);
  return {
    reply:
      `**Ассаламу алейкум! Сейчас в базе данных «ВОСТОК ХАУС» доступно ${prods.length} блюд (100% Халяль):**\n\n` +
      `**🔥 Главные хиты нашего казана, тандыра и мангала:**\n` +
      hits.slice(0, 7).map((p, i) => `${i + 1}. **${p.name}** (${p.weight} г • ${p.calories} ккал) — **\`${window.fmtKZT(p.base_price)}\`**\n   *Состав:* ${p.description}`).join("\n") +
      (stopped.length ? `\n\n*Временно на стоп-листе:* ${stopped.map((s) => s.name).join(", ")}.` : "\n\n*Все блюда из меню сейчас в наличии на кухне!*") +
      `\n\n**💡 Рекомендация Восток AI:**\n` +
      `- К плову отлично подойдёт **Салат Ачичук с ташкентскими томатами** (\`1 190 ₸\`) и **Чай «Шёлковый путь» с кристаллами сахара Нават** (\`1 290 ₸\`).\n` +
      `- Используйте промокод \`START15\` для скидки **-15%** на первый заказ или \`PLOV20\` для скидки **-20%** при заказе от \`6 000 ₸\`!`,
    source: "Live DB"
  };
};
