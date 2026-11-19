/* =========================================================================
   L'AURUM Restaurant OS — Единое облачное ядро БД (Supabase + LocalStorage)
   Обеспечивает общую базу данных между двумя отдельными GitHub-репозиториями:
   - Репозиторий №1: site-1-guest (Клиентский сайт для Гостей)
   - Репозиторий №2: site-2-staff-erp (Корпоративная ERP-система Персонала)
   ========================================================================= */

(function () {
  const STORAGE_KEY = "laurum_dodo_erp_v5";
  const DEFAULT_PUBLISHABLE_KEY = "sb_publishable_Q8bp5yDcT3g-b0K7tnvbfw_RYFYDkMi";

  const ROLE_INFO = {
    guest: { title: "Гость ресторана", badge: "bg-amber-100 text-amber-800" },
    cook: { title: "Повар (Экран KDS)", badge: "bg-orange-100 text-orange-800" },
    waiter: { title: "Официант / Хостес", badge: "bg-blue-100 text-blue-800" },
    accountant: { title: "Бухгалтер / Склад", badge: "bg-emerald-100 text-emerald-800" },
    boss: { title: "Босс / Владелец", badge: "bg-purple-100 text-purple-800" }
  };

  const ALLERGENS = {
    gluten: "Глютен",
    lactose: "Лактоза (молоко)",
    nuts: "Орехи",
    eggs: "Яйца",
    fish: "Рыба",
    shellfish: "Морепродукты"
  };

  const DONENESS = ["Rare (с кровью)", "Medium Rare (слабая)", "Medium (средняя)", "Medium Well", "Well Done (полная)"];

  const REVIEW_TAGS = [
    "Идеально вкусно",
    "Горячее и свежее",
    "Красивая подача",
    "Пересолено",
    "Подали остывшим",
    "Маленькая порция",
    "Не та прожарка",
    "Долго готовили"
  ];

  const COMPLAINT_REASONS = [
    "Блюдо подали холодным / остывшим",
    "Ошибка повара (не учли «без лука» / не та прожарка)",
    "Пересолено / пережарено",
    "Посторонний предмет в блюде",
    "Маленькая порция / несвежий продукт"
  ];

  const SUPPLIERS = [
    "ТОО «KazBeef Prime» (Мраморная говядина и ягнёнок)",
    "ТОО «Italia Gastro Import» (Сыры, паста, оливковое масло)",
    "«Almaty Fresh Farm» (Фермерские овощи, зелень, яйца)",
    "«Ocean & Fjords KZ» (Охлаждённый лосось, тунец, морепродукты)",
    "«Grand Wine & Beverage» (Вина, лимонады, спешелти кофе)"
  ];

  function uid(prefix) {
    return prefix + "-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 6);
  }

  function dateOffset(days) {
    const d = new Date(Date.now() + (days || 0) * 86400000);
    return d.toISOString().split("T")[0];
  }

  function fmt(num) {
    return Math.round(Number(num || 0)).toLocaleString("ru-RU") + " ₸";
  }

  function buildSeedData() {
    const today = dateOffset(0);
    const tomorrow = dateOffset(1);

    return {
      updated_at: new Date().toISOString(),
      profiles: [
        { id: "u-boss", full_name: "Арман Султанов", role: "boss", login: "boss", password: "123", phone: "+7 701 100 00 01", hourly_rate: 6000, bonus_balance: 0, is_active: true },
        { id: "u-acc", full_name: "Мадина Касымова", role: "accountant", login: "buh", password: "123", phone: "+7 701 100 00 02", hourly_rate: 4500, bonus_balance: 0, is_active: true },
        { id: "u-chef", full_name: "Лоран Вальтер (Шеф-повар)", role: "cook", login: "chef", password: "123", phone: "+7 701 100 00 03", hourly_rate: 5000, bonus_balance: 0, is_active: true },
        { id: "u-cook2", full_name: "Данияр Алиев (Повар горячего цеха)", role: "cook", login: "povar", password: "123", phone: "+7 701 100 00 04", hourly_rate: 3800, bonus_balance: 0, is_active: true },
        { id: "u-waiter", full_name: "Айгерим Нурланова", role: "waiter", login: "waiter", password: "123", phone: "+7 701 100 00 05", hourly_rate: 2800, bonus_balance: 0, is_active: true },
        { id: "u-guest-1", full_name: "Алия Сатпаева", role: "guest", login: "aliya", password: "123", phone: "+7 701 555 01 01", hourly_rate: 0, bonus_balance: 4500, is_active: true }
      ],

      zones: [
        { id: "z-main", name: "Основной светлый зал", is_vip: false, deposit_per_guest: 5000, deposit_per_table: 0 },
        { id: "z-terrace", name: "Панорамная терраса", is_vip: false, deposit_per_guest: 5000, deposit_per_table: 0 },
        { id: "z-chef", name: "Chef's Table (У открытой кухни)", is_vip: false, deposit_per_guest: 10000, deposit_per_table: 0 },
        { id: "z-vip", name: "VIP-кабинет (Приватный зал)", is_vip: true, deposit_per_guest: 0, deposit_per_table: 50000 }
      ],

      tables: [
        { id: "T1", number: 1, label: "Стол №1 (У окна)", zone_id: "z-main", seats: 2 },
        { id: "T2", number: 2, label: "Стол №2 (У окна)", zone_id: "z-main", seats: 2 },
        { id: "T3", number: 3, label: "Стол №3 (Центр зала)", zone_id: "z-main", seats: 4 },
        { id: "T4", number: 4, label: "Стол №4 (Мягкие диваны)", zone_id: "z-main", seats: 4 },
        { id: "T5", number: 5, label: "Стол №5 (Большой семейный)", zone_id: "z-main", seats: 6 },
        { id: "T6", number: 6, label: "Стол №6 (Терраса в саду)", zone_id: "z-terrace", seats: 2 },
        { id: "T7", number: 7, label: "Стол №7 (Терраса в саду)", zone_id: "z-terrace", seats: 4 },
        { id: "T8", number: 8, label: "Стол №8 (Терраса панорама)", zone_id: "z-terrace", seats: 4 },
        { id: "T9", number: 9, label: "Стол №9 (Chef's Table)", zone_id: "z-chef", seats: 6 },
        { id: "T10", number: 10, label: "Стол №10 (VIP-кабинет)", zone_id: "z-vip", seats: 10 }
      ],

      categories: [
        { id: "cat-steaks", name: "🥩 Стейки и Гриль" },
        { id: "cat-starters", name: "🥗 Салаты и Закуски" },
        { id: "cat-mains", name: "🍝 Горячие блюда и Паста" },
        { id: "cat-sides", name: "🍟 Гарниры" },
        { id: "cat-desserts", name: "🍰 Десерты" },
        { id: "cat-drinks", name: "🍷 Напитки и Кофе" }
      ],

      dishes: [
        {
          id: "d-ribeye", category_id: "cat-steaks", title: "Стейк Рибай Prime на углях",
          description: "Сочный мраморный стейк зернового откорма с ароматным сливочным маслом и печёным чесноком.",
          composition: "Мраморная говядина Рибай, сливочное масло, чеснок, розмарин, морская соль",
          price: 16000, weight: "350 г", kcal: 860, protein: 62, fat: 68, carbs: 2,
          allergens: ["lactose"], has_doneness: true,
          removable: ["сливочное масло", "печёный чеснок", "розмарин", "чёрный перец"],
          upsell: ["d-fries", "d-veg", "d-lemonade"], cook_time: 18, in_stock: true,
          image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "d-filet", category_id: "cat-steaks", title: "Филе-миньон из говяжьей вырезки",
          description: "Самый нежный постный стейк из центральной части вырезки с соусом демиглас.",
          composition: "Говяжья вырезка, соус демиглас, тимьян, сливочное масло",
          price: 14000, weight: "240 г", kcal: 510, protein: 48, fat: 32, carbs: 4,
          allergens: ["lactose"], has_doneness: true,
          removable: ["соус демиглас", "сливочное масло", "тимьян"],
          upsell: ["d-puree", "d-lemonade"], cook_time: 16, in_stock: true,
          image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "d-burrata", category_id: "cat-starters", title: "Буррата со сладкими томатами и песто",
          description: "Фермерский сливочный мешочек бурраты, спелые узбекские томаты и домашний соус песто.",
          composition: "Сыр буррата, томаты, базилик, оливковое масло, кедровый орех",
          price: 5800, weight: "230 г", kcal: 390, protein: 17, fat: 30, carbs: 10,
          allergens: ["lactose", "nuts"], has_doneness: false,
          removable: ["соус песто (орехи)", "красный лук", "базилик"],
          upsell: ["d-lemonade"], cook_time: 7, in_stock: true,
          image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "d-tartare", category_id: "cat-starters", title: "Тартар из говядины с тёплой бриошью",
          description: "Рубленая мраморная вырезка с каперсами, шалотом, перепелиным желтком и хрустящей бриошью.",
          composition: "Говяжья вырезка, лук шалот, каперсы, желток, горчица, хлеб бриошь",
          price: 6400, weight: "190 г", kcal: 370, protein: 25, fat: 22, carbs: 14,
          allergens: ["gluten", "eggs"], has_doneness: false,
          removable: ["лук шалот", "каперсы", "дижонская горчица"],
          upsell: ["d-fries"], cook_time: 10, in_stock: true,
          image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "d-salmon", category_id: "cat-mains", title: "Стейк лосося со спаржей и сливочным соусом",
          description: "Филе норвежского лосося с хрустящей корочкой, молодой спаржей и икорным соусом.",
          composition: "Филе лосося, зелёная спаржа, сливки 33%, лимон, красная икра",
          price: 9200, weight: "270 г", kcal: 540, protein: 38, fat: 34, carbs: 12,
          allergens: ["fish", "lactose"], has_doneness: false,
          removable: ["сливочный соус", "лимон"],
          upsell: ["d-puree", "d-lemonade"], cook_time: 15, in_stock: true,
          image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "d-pasta", category_id: "cat-mains", title: "Паста Феттуччине с креветками и белыми грибами",
          description: "Домашняя паста в нежном сливочно-трюфельном соусе с тигровыми креветками.",
          composition: "Паста феттуччине, тигровые креветки, белые грибы, сливки, пармезан, чеснок, лук",
          price: 7600, weight: "310 г", kcal: 610, protein: 32, fat: 26, carbs: 58,
          allergens: ["gluten", "shellfish", "lactose", "eggs"], has_doneness: false,
          removable: ["лук", "чеснок", "пармезан", "зелень"],
          upsell: ["d-lemonade"], cook_time: 14, in_stock: true,
          image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "d-fries", category_id: "cat-sides", title: "Картофель фри с трюфельным маслом и пармезаном",
          description: "Золотистый хрустящий картофель с тёртым выдержанным пармезаном.",
          composition: "Картофель, трюфельное масло, пармезан, соль",
          price: 2200, weight: "160 г", kcal: 380, protein: 6, fat: 18, carbs: 46,
          allergens: ["lactose"], has_doneness: false,
          removable: ["пармезан", "трюфельное масло"],
          upsell: [], cook_time: 7, in_stock: true,
          image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "d-puree", category_id: "cat-sides", title: "Сливочное картофельное пюре",
          description: "Нежное воздушное пюре на фермерском молоке и сливочном масле.",
          composition: "Картофель, сливочное масло, молоко",
          price: 1800, weight: "180 г", kcal: 250, protein: 4, fat: 12, carbs: 32,
          allergens: ["lactose"], has_doneness: false,
          removable: ["зелёный лук"],
          upsell: [], cook_time: 5, in_stock: true,
          image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "d-veg", category_id: "cat-sides", title: "Овощи гриль с травами",
          description: "Цукини, сладкий перец, спаржа и баклажан на живом огне.",
          composition: "Цукини, болгарский перец, баклажан, спаржа, оливковое масло",
          price: 2400, weight: "200 г", kcal: 140, protein: 4, fat: 7, carbs: 15,
          allergens: [], has_doneness: false,
          removable: ["чесночное масло"],
          upsell: [], cook_time: 8, in_stock: true,
          image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "d-fondant", category_id: "cat-desserts", title: "Шоколадный фондан с шариком пломбира",
          description: "Горячий шоколадный кекс с жидким центром из бельгийского шоколада и холодным мороженым.",
          composition: "Тёмный шоколад 70%, сливочное масло, яйца, мука, ванильный пломбир",
          price: 3400, weight: "150 г", kcal: 460, protein: 8, fat: 28, carbs: 44,
          allergens: ["gluten", "lactose", "eggs"], has_doneness: false,
          removable: ["шарик мороженого", "мята"],
          upsell: ["d-coffee"], cook_time: 12, in_stock: true,
          image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "d-cheesecake", category_id: "cat-desserts", title: "Фисташковый чизкейк Сан-Себастьян",
          description: "Нежнейший кремовый чизкейк с пастой из сицилийской фисташки.",
          composition: "Сливочный сыр, сливки, фисташковая паста, яйца, сахар",
          price: 3200, weight: "160 г", kcal: 440, protein: 9, fat: 27, carbs: 36,
          allergens: ["lactose", "nuts", "eggs"], has_doneness: false,
          removable: ["дроблёная фисташка сверху"],
          upsell: ["d-coffee"], cook_time: 5, in_stock: true,
          image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "d-lemonade", category_id: "cat-drinks", title: "Домашний лимонад Маракуйя — Манго",
          description: "Натуральный освежающий лимонад из спелого манго, маракуйи и мяты.",
          composition: "Пюре манго, маракуйя, мята, лайм, газированная вода",
          price: 1800, weight: "400 мл", kcal: 110, protein: 1, fat: 0, carbs: 26,
          allergens: [], has_doneness: false,
          removable: ["лёд", "мята"],
          upsell: [], cook_time: 3, in_stock: true,
          image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "d-coffee", category_id: "cat-drinks", title: "Капучино Спешелти Арабика",
          description: "Ароматный двойной эспрессо со взбитым фермерским молоком.",
          composition: "Кофе 100% Арабика, молоко 3.2%",
          price: 1400, weight: "250 мл", kcal: 120, protein: 6, fat: 5, carbs: 9,
          allergens: ["lactose"], has_doneness: false,
          removable: ["корица"],
          upsell: ["d-fondant", "d-cheesecake"], cook_time: 3, in_stock: true,
          image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80"
        }
      ],

      ingredients: [
        { id: "ing-ribeye", name: "Мраморная говядина Рибай", unit: "кг", stock_qty: 18.5, cost_per_unit: 11000, min_qty: 5 },
        { id: "ing-tender", name: "Говяжья вырезка Prime", unit: "кг", stock_qty: 12.0, cost_per_unit: 13000, min_qty: 4 },
        { id: "ing-salmon", name: "Филе лосося охлаждённое", unit: "кг", stock_qty: 9.5, cost_per_unit: 8500, min_qty: 3 },
        { id: "ing-shrimp", name: "Тигровые креветки", unit: "кг", stock_qty: 6.2, cost_per_unit: 9500, min_qty: 2 },
        { id: "ing-burrata", name: "Сыр Буррата фермерский", unit: "шт", stock_qty: 24, cost_per_unit: 1600, min_qty: 8 },
        { id: "ing-tomato", name: "Томаты узбекские", unit: "кг", stock_qty: 11.0, cost_per_unit: 1800, min_qty: 3 },
        { id: "ing-pasta", name: "Паста и мука твёрдых сортов", unit: "кг", stock_qty: 15.0, cost_per_unit: 1400, min_qty: 4 },
        { id: "ing-potato", name: "Картофель отборный", unit: "кг", stock_qty: 40.0, cost_per_unit: 350, min_qty: 10 },
        { id: "ing-veg", name: "Спаржа и свежие овощи", unit: "кг", stock_qty: 14.0, cost_per_unit: 2200, min_qty: 4 },
        { id: "ing-cream", name: "Сливки, масло и крем-чиз", unit: "кг", stock_qty: 12.5, cost_per_unit: 3400, min_qty: 3 },
        { id: "ing-choc", name: "Шоколад бельгийский 70%", unit: "кг", stock_qty: 5.0, cost_per_unit: 9000, min_qty: 1.5 },
        { id: "ing-pistachio", name: "Паста фисташковая", unit: "кг", stock_qty: 2.5, cost_per_unit: 14000, min_qty: 1 },
        { id: "ing-fruit", name: "Пюре манго, маракуйя, лайм", unit: "кг", stock_qty: 8.0, cost_per_unit: 2600, min_qty: 2 },
        { id: "ing-coffee", name: "Кофе зерновой Спешелти", unit: "кг", stock_qty: 6.0, cost_per_unit: 9500, min_qty: 1.5 }
      ],

      tech_cards: [
        { dish_id: "d-ribeye", ingredient_id: "ing-ribeye", qty: 0.38 },
        { dish_id: "d-ribeye", ingredient_id: "ing-cream", qty: 0.04 },
        { dish_id: "d-filet", ingredient_id: "ing-tender", qty: 0.26 },
        { dish_id: "d-filet", ingredient_id: "ing-cream", qty: 0.04 },
        { dish_id: "d-burrata", ingredient_id: "ing-burrata", qty: 1 },
        { dish_id: "d-burrata", ingredient_id: "ing-tomato", qty: 0.14 },
        { dish_id: "d-tartare", ingredient_id: "ing-tender", qty: 0.16 },
        { dish_id: "d-salmon", ingredient_id: "ing-salmon", qty: 0.22 },
        { dish_id: "d-salmon", ingredient_id: "ing-veg", qty: 0.08 },
        { dish_id: "d-salmon", ingredient_id: "ing-cream", qty: 0.05 },
        { dish_id: "d-pasta", ingredient_id: "ing-pasta", qty: 0.15 },
        { dish_id: "d-pasta", ingredient_id: "ing-shrimp", qty: 0.14 },
        { dish_id: "d-pasta", ingredient_id: "ing-cream", qty: 0.08 },
        { dish_id: "d-fries", ingredient_id: "ing-potato", qty: 0.25 },
        { dish_id: "d-puree", ingredient_id: "ing-potato", qty: 0.25 },
        { dish_id: "d-puree", ingredient_id: "ing-cream", qty: 0.05 },
        { dish_id: "d-veg", ingredient_id: "ing-veg", qty: 0.24 },
        { dish_id: "d-fondant", ingredient_id: "ing-choc", qty: 0.08 },
        { dish_id: "d-fondant", ingredient_id: "ing-cream", qty: 0.06 },
        { dish_id: "d-cheesecake", ingredient_id: "ing-cream", qty: 0.14 },
        { dish_id: "d-cheesecake", ingredient_id: "ing-pistachio", qty: 0.03 },
        { dish_id: "d-lemonade", ingredient_id: "ing-fruit", qty: 0.12 },
        { dish_id: "d-coffee", ingredient_id: "ing-coffee", qty: 0.02 },
        { dish_id: "d-coffee", ingredient_id: "ing-cream", qty: 0.05 }
      ],

      supplies: [
        { id: "sup-101", invoice: "НКЛ-2026-081", supplier: "ТОО «KazBeef Prime» (Мраморная говядина и ягнёнок)", ingredient_id: "ing-ribeye", ingredient_name: "Мраморная говядина Рибай", qty: 10, unit: "кг", unit_cost: 11000, total_cost: 110000, date: today, accepted_by: "Мадина Касымова (Бухгалтер)" },
        { id: "sup-102", invoice: "НКЛ-2026-082", supplier: "«Ocean & Fjords KZ» (Охлаждённый лосось, тунец, морепродукты)", ingredient_id: "ing-salmon", ingredient_name: "Филе лосося охлаждённое", qty: 6, unit: "кг", unit_cost: 8500, total_cost: 51000, date: today, accepted_by: "Мадина Касымова (Бухгалтер)" },
        { id: "sup-103", invoice: "НКЛ-2026-083", supplier: "ТОО «Italia Gastro Import» (Сыры, паста, оливковое масло)", ingredient_id: "ing-burrata", ingredient_name: "Сыр Буррата фермерский", qty: 20, unit: "шт", unit_cost: 1600, total_cost: 32000, date: today, accepted_by: "Мадина Касымова (Бухгалтер)" }
      ],

      expenses: [
        { id: "exp-1", category: "Закупка продуктов (Поставки)", title: "Оплата поставщику ТОО «KazBeef Prime» по накладной НКЛ-2026-081 (Рибай 10 кг)", amount: 110000, recipient: "ТОО «KazBeef Prime»", date: today },
        { id: "exp-2", category: "Закупка продуктов (Поставки)", title: "Оплата поставщику «Ocean & Fjords KZ» по накладной НКЛ-2026-082 (Лосось 6 кг)", amount: 51000, recipient: "«Ocean & Fjords KZ»", date: today },
        { id: "exp-3", category: "Закупка продуктов (Поставки)", title: "Оплата поставщику ТОО «Italia Gastro Import» по накладной НКЛ-2026-083 (Буррата 20 шт)", amount: 32000, recipient: "ТОО «Italia Gastro Import»", date: today },
        { id: "exp-4", category: "Аренда и коммунальные платежи", title: "Суточная часть аренды помещения и электроэнергии (хоспер / холодильные камеры)", amount: 45000, recipient: "БЦ «Dostyk Plaza Premium»", date: today },
        { id: "exp-5", category: "Банковский эквайринг и сервис", title: "Комиссия банковского эквайринга Kaspi Pay / Halyk POS (1.8%) и прачечная текстиля", amount: 14500, recipient: "АО «Kaspi Bank» / Сервис прачечной", date: today }
      ],

      reservations: [
        {
          id: "res-1", code: "BR-501", guest_id: "u-guest-1", guest_name: "Алия Сатпаева", guest_phone: "+7 701 555 01 01",
          table_id: "T2", visit_date: tomorrow, visit_time: "19:30", guests_count: 2, comment: "Стол №2 у окна, годовщина",
          preorder: [
            { dish_id: "d-ribeye", title: "Стейк Рибай Prime на углях", price: 16000, qty: 1, options: "Medium Rare" },
            { dish_id: "d-burrata", title: "Буррата со сладкими томатами и песто", price: 5800, qty: 1, options: "" }
          ],
          preorder_total: 21800, deposit_amount: 10900,
          deposit_rule: "Предоплата 50% от стоимости предзаказанных блюд (21 800 ₸ × 50%)",
          deposit_status: "paid", status: "confirmed", refund_amount: 0,
          created_at: new Date(Date.now() - 3600000 * 4).toISOString()
        },
        {
          id: "res-2", code: "BR-502", guest_id: null, guest_name: "Тимур Бектуров", guest_phone: "+7 702 888 44 11",
          table_id: "T4", visit_date: today, visit_time: "20:00", guests_count: 4, comment: "Деловой ужин",
          preorder: [
            { dish_id: "d-filet", title: "Филе-миньон из говяжьей вырезки", price: 14000, qty: 2, options: "Medium" }
          ],
          preorder_total: 28000, deposit_amount: 14000,
          deposit_rule: "Предоплата 50% от стоимости предзаказанных блюд (28 000 ₸ × 50%)",
          deposit_status: "paid", status: "confirmed", refund_amount: 0,
          created_at: new Date(Date.now() - 3600000 * 2).toISOString()
        }
      ],

      orders: [
        { id: "ord-100", code: "ЧЕК-100", table_id: "T3", guest_id: "u-guest-1", guest_name: "Алия Сатпаева", waiter_id: "u-waiter", status: "open", subtotal: 31200, deposit_applied: 10000, bonus_used: 0, total: 21200, paid_amount: 0, created_at: new Date(Date.now() - 20 * 60000).toISOString() },
        { id: "ord-099", code: "ЧЕК-099", table_id: "T5", guest_id: null, guest_name: "Кайрат Нурпеисов (Банкет)", waiter_id: "u-waiter", status: "paid", subtotal: 185000, deposit_applied: 50000, bonus_used: 0, total: 135000, paid_amount: 135000, created_at: new Date(Date.now() - 180 * 60000).toISOString() },
        { id: "ord-098", code: "ЧЕК-098", table_id: "T9", guest_id: null, guest_name: "Динара Ахметова", waiter_id: "u-waiter", status: "paid", subtotal: 96000, deposit_applied: 25000, bonus_used: 0, total: 71000, paid_amount: 71000, created_at: new Date(Date.now() - 240 * 60000).toISOString() }
      ],

      order_items: [
        { id: "item-1", order_id: "ord-100", table_id: "T3", dish_id: "d-burrata", title: "Буррата со сладкими томатами и песто", price: 5800, qty: 1, mods: "Без красного лука", status: "served", norm_min: 7, cook_id: "u-chef", refunded: false, created_at: new Date(Date.now() - 18 * 60000).toISOString(), started_at: new Date(Date.now() - 17 * 60000).toISOString() },
        { id: "item-2", order_id: "ord-100", table_id: "T3", dish_id: "d-ribeye", title: "Стейк Рибай Prime на углях", price: 16000, qty: 1, mods: "Прожарка: Medium Rare · Без печёного чеснока", status: "cooking", norm_min: 18, cook_id: "u-chef", refunded: false, created_at: new Date(Date.now() - 11 * 60000).toISOString(), started_at: new Date(Date.now() - 9 * 60000).toISOString() },
        { id: "item-3", order_id: "ord-100", table_id: "T3", dish_id: "d-pasta", title: "Паста Феттуччине с креветками и белыми грибами", price: 7600, qty: 1, mods: "Без лука (аллергия)", status: "accepted", norm_min: 14, cook_id: "u-cook2", refunded: false, created_at: new Date(Date.now() - 4 * 60000).toISOString() },
        { id: "item-4", order_id: "ord-100", table_id: "T3", dish_id: "d-lemonade", title: "Домашний лимонад Маракуйя — Манго", price: 1800, qty: 1, mods: "Меньше льда", status: "ready", norm_min: 3, cook_id: "u-chef", refunded: false, created_at: new Date(Date.now() - 6 * 60000).toISOString(), started_at: new Date(Date.now() - 5 * 60000).toISOString() }
      ],

      transactions: [
        { id: "tx-101", direction: "in", type: "order", title: "Оплата счёта ЧЕК-099 (Стол №5, Банкет)", amount: 185000, method: "Карта / Kaspi QR", created_at: new Date(Date.now() - 180 * 60000).toISOString() },
        { id: "tx-102", direction: "in", type: "order", title: "Оплата счёта ЧЕК-098 (Стол №9, Chef's Table)", amount: 96000, method: "Банковская карта", created_at: new Date(Date.now() - 240 * 60000).toISOString() },
        { id: "tx-103", direction: "in", type: "deposit", title: "Предоплата 50% от заказанных блюд (Бронь BR-501, Алия Сатпаева)", amount: 10900, method: "Карта онлайн", created_at: new Date(Date.now() - 220 * 60000).toISOString() },
        { id: "tx-104", direction: "in", type: "deposit", title: "Предоплата 50% от заказанных блюд (Бронь BR-502, Тимур Бектуров)", amount: 14000, method: "Карта онлайн", created_at: new Date(Date.now() - 120 * 60000).toISOString() },
        { id: "tx-105", direction: "in", type: "deposit_forfeit", title: "Удержанный депозит при поздней отмене брони <24ч (Бронь BR-495)", amount: 15000, method: "Удержание депозита", created_at: new Date(Date.now() - 300 * 60000).toISOString() }
      ],

      write_offs: [
        { id: "wo-1", ingredient_id: "ing-ribeye", dish_title: "Стейк Рибай Prime (продажи за день)", qty: 3.8, unit: "кг", reason: "sale", cost: 41800, created_at: today },
        { id: "wo-2", ingredient_id: "ing-salmon", dish_title: "Стейк лосося (продажи за день)", qty: 1.8, unit: "кг", reason: "sale", cost: 15300, created_at: today },
        { id: "wo-3", ingredient_id: "ing-burrata", dish_title: "Буррата с томатами (продажи за день)", qty: 8, unit: "шт", reason: "sale", cost: 12800, created_at: today },
        { id: "wo-4", ingredient_id: "ing-shrimp", dish_title: "Списание брака (возврат пасты RET-101)", qty: 0.14, unit: "кг", reason: "complaint", cost: 1330, created_at: today }
      ],

      reviews: [
        { id: "rev-1", order_item_id: "item-1", dish_id: "d-burrata", dish_title: "Буррата со сладкими томатами и песто", cook_id: "u-chef", guest_name: "Алия Сатпаева", rating: 5, tags: ["Идеально вкусно", "Красивая подача"], comment: "Свежайшая буррата, принесли за 6 минут!", created_at: new Date(Date.now() - 10 * 60000).toISOString() },
        { id: "rev-2", order_item_id: null, dish_id: "d-ribeye", dish_title: "Стейк Рибай Prime на углях", cook_id: "u-chef", guest_name: "Кайрат Нурпеисов", rating: 5, tags: ["Идеально вкусно", "Горячее и свежее"], comment: "Лучший рибай в Алматы, прожарка идеальная.", created_at: new Date(Date.now() - 120 * 60000).toISOString() }
      ],

      complaints: [
        { id: "cmp-101", code: "RET-101", order_item_id: null, table_id: "T5", dish_id: "d-pasta", dish_title: "Паста Феттуччине с креветками и белыми грибами", cook_id: "u-cook2", guest_name: "Гость Стола №5", reason: "Блюдо подали холодным / остывшим", description: "Пасту долго несли с раздачи, соус остыл.", photo_url: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=500&q=70", amount: 7600, preferred: "refund", status: "open", resolution_note: "", created_at: new Date(Date.now() - 15 * 60000).toISOString() }
      ],

      service_calls: [
        { id: "call-1", table_id: "T3", type: "waiter", message: "Стол №3 (Алия Сатпаева) вызывает официанта к столу", status: "new", created_at: new Date(Date.now() - 3 * 60000).toISOString() }
      ],

      shifts: [
        { id: "sh-1", staff_id: "u-chef", hours: 10, bonus: 5000, penalty: 0 },
        { id: "sh-2", staff_id: "u-cook2", hours: 10, bonus: 0, penalty: 2000 },
        { id: "sh-3", staff_id: "u-waiter", hours: 11, bonus: 4000, penalty: 0 },
        { id: "sh-4", staff_id: "u-acc", hours: 8, bonus: 0, penalty: 0 },
        { id: "sh-5", staff_id: "u-boss", hours: 8, bonus: 0, penalty: 0 }
      ],

      loyalty_log: [
        { id: "loy-1", guest_id: "u-guest-1", amount: 2000, reason: "Приветственный бонус за регистрацию", date: today },
        { id: "loy-2", guest_id: "u-guest-1", amount: 2500, reason: "Кэшбэк 5% за прошлый визит в ресторан", date: today }
      ],

      happy_hour_enabled: false,
      happy_hour_pct: 15
    };
  }

  class LaurumCoreEngine {
    constructor() {
      this.mode = "local";
      this.supabase = null;
      this.state = buildSeedData();
      this.listeners = new Set();
      this.channel = typeof BroadcastChannel !== "undefined" ? new BroadcastChannel("laurum_two_sites_sync") : null;
      this.pollTimer = null;
      this.init();
    }

    init() {
      this.loadLocal();
      window.addEventListener("storage", (e) => {
        if (e.key === STORAGE_KEY) {
          this.loadLocal();
          this.notify();
        }
      });
      if (this.channel) {
        this.channel.onmessage = () => {
          this.loadLocal();
          this.notify();
        };
      }
      this.tryConnectSupabase();
    }

    getSupabaseCredentials() {
      const cfg = window.LAURUM_CONFIG || {};
      let url = cfg.SUPABASE_URL || "";
      let key = cfg.SUPABASE_ANON_KEY || DEFAULT_PUBLISHABLE_KEY;
      try {
        const saved = JSON.parse(localStorage.getItem("laurum_sb_creds") || "null");
        if (saved && saved.url) url = saved.url;
        if (saved && saved.key) key = saved.key;
      } catch (_) {}
      return { url: url.trim(), key: (key || DEFAULT_PUBLISHABLE_KEY).trim() };
    }

    async saveSupabaseCredentials(url, key) {
      localStorage.setItem(
        "laurum_sb_creds",
        JSON.stringify({
          url: (url || "").trim(),
          key: (key || DEFAULT_PUBLISHABLE_KEY).trim()
        })
      );
      await this.tryConnectSupabase();
      this.notify();
    }

    async tryConnectSupabase() {
      const { url, key } = this.getSupabaseCredentials();
      if (!url || !key || url.includes("TODO") || !url.startsWith("http") || !navigator.onLine) {
        this.mode = "local";
        return false;
      }
      try {
        const mod = await import("https://esm.sh/@supabase/supabase-js@2.45.4");
        this.supabase = mod.createClient(url, key);
        this.mode = "supabase";

        // Загружаем единое облачное состояние из таблицы laurum_shared_state
        await this.pullFromSupabase();

        // Подписываемся на изменения в реальном времени между двумя GitHub-репозиториями
        this.supabase
          .channel("laurum-shared-sync")
          .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "laurum_shared_state" },
            (payload) => {
              if (payload.new && payload.new.payload) {
                this.state = { ...buildSeedData(), ...payload.new.payload };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
                this.notify();
              }
            }
          )
          .subscribe();

        // Дополнительный фоновый опрос каждые 3 сек для 100% гарантии синхронизации между сайтами
        if (this.pollTimer) clearInterval(this.pollTimer);
        this.pollTimer = setInterval(() => {
          if (!document.hidden) this.pullFromSupabase();
        }, 3000);

        this.notify();
        return true;
      } catch (e) {
        console.warn("Supabase fallback:", e.message);
        this.mode = "local";
        return false;
      }
    }

    async pullFromSupabase() {
      if (!this.supabase) return;
      try {
        const { data, error } = await this.supabase
          .from("laurum_shared_state")
          .select("*")
          .eq("id", "main")
          .maybeSingle();

        if (!error && data && data.payload && Object.keys(data.payload).length > 0) {
          const remoteTs = new Date(data.payload.updated_at || 0).getTime();
          const localTs = new Date(this.state.updated_at || 0).getTime();
          if (remoteTs >= localTs) {
            this.state = { ...buildSeedData(), ...data.payload };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
            this.notify();
          }
        } else if (!error && !data) {
          // Первая инициализация облачной базы
          await this.pushToSupabase();
        }
      } catch (_) {}
    }

    async pushToSupabase() {
      if (!this.supabase || this.mode !== "supabase") return;
      try {
        await this.supabase.from("laurum_shared_state").upsert({
          id: "main",
          payload: this.state,
          updated_at: this.state.updated_at
        });
      } catch (_) {}
    }

    loadLocal() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          this.state = { ...buildSeedData(), ...JSON.parse(raw) };
        } else {
          this.state = buildSeedData();
          this.saveLocal(false);
        }
      } catch (_) {
        this.state = buildSeedData();
      }
    }

    saveLocal(broadcast = true) {
      this.state.updated_at = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      if (broadcast && this.channel) {
        this.channel.postMessage({ updated: Date.now() });
      }
      if (this.mode === "supabase") {
        this.pushToSupabase();
      }
      this.notify();
    }

    resetAllDemoData() {
      this.state = buildSeedData();
      this.saveLocal(true);
    }

    subscribe(fn) {
      this.listeners.add(fn);
      return () => this.listeners.delete(fn);
    }

    notify() {
      for (const fn of this.listeners) fn(this.state);
    }

    // --- ТЕКУЩИЙ ГОСТЬ И ТЕКУЩИЙ СОТРУДНИК ---
    getActiveGuest() {
      const id = localStorage.getItem("laurum_guest_uid") || "u-guest-1";
      return this.state.profiles.find((p) => p.id === id && p.role === "guest") || this.state.profiles.find((p) => p.role === "guest");
    }

    loginGuest({ full_name, phone }) {
      const clean = (phone || "").trim();
      let g = this.state.profiles.find((p) => p.role === "guest" && p.phone === clean);
      let isNew = false;
      if (!g) {
        isNew = true;
        g = {
          id: uid("u-guest"),
          full_name: (full_name || "Гость").trim(),
          role: "guest",
          login: null,
          password: "",
          phone: clean || "+7 700 000 00 00",
          hourly_rate: 0,
          bonus_balance: 2000,
          is_active: true
        };
        this.state.profiles.push(g);
        this.state.loyalty_log.unshift({
          id: uid("loy"),
          guest_id: g.id,
          amount: 2000,
          reason: "Приветственные 2 000 ₸ бонусов при регистрации",
          date: dateOffset(0)
        });
      } else if (full_name) {
        g.full_name = full_name.trim();
      }
      localStorage.setItem("laurum_guest_uid", g.id);
      this.saveLocal(true);
      return { guest: g, isNew };
    }

    getActiveStaff() {
      const id = localStorage.getItem("laurum_staff_uid") || "u-boss";
      return this.state.profiles.find((p) => p.id === id && p.role !== "guest" && p.is_active) || this.state.profiles[0];
    }

    loginStaff(login, password) {
      const clean = (login || "").trim().toLowerCase();
      const staff = this.state.profiles.find(
        (p) => p.role !== "guest" && p.is_active && p.login && p.login.toLowerCase() === clean
      );
      if (!staff) throw new Error("Сотрудник с таким логином не найден. Аккаунты создаёт только Босс.");
      if (staff.password && staff.password !== password) throw new Error("Неверный пароль сотрудника.");
      localStorage.setItem("laurum_staff_uid", staff.id);
      this.notify();
      return staff;
    }

    quickSwitchStaffByRole(role) {
      const staff = this.state.profiles.find((p) => p.role === role && p.is_active);
      if (staff) {
        localStorage.setItem("laurum_staff_uid", staff.id);
        this.notify();
      }
      return staff;
    }

    // СОЗДАНИЕ АККАУНТА СОТРУДНИКА БОССОМ (RBAC)
    createStaffByBoss({ full_name, role, login, password, phone, hourly_rate }) {
      const cleanLogin = (login || "").trim().toLowerCase();
      if (!cleanLogin || !password) throw new Error("Заполните логин и пароль сотрудника");
      if (this.state.profiles.some((p) => p.login && p.login.toLowerCase() === cleanLogin)) {
        throw new Error("Логин «" + cleanLogin + "» уже существует в базе");
      }
      const staff = {
        id: uid("u-staff"),
        full_name: full_name.trim(),
        role: role || "waiter",
        login: cleanLogin,
        password: password.trim(),
        phone: (phone || "+7 701 000 00 00").trim(),
        hourly_rate: Number(hourly_rate || 3000),
        bonus_balance: 0,
        is_active: true
      };
      this.state.profiles.push(staff);
      this.state.shifts.push({ id: uid("sh"), staff_id: staff.id, hours: 8, bonus: 0, penalty: 0 });
      this.saveLocal(true);
      return staff;
    }

    // --- ЦЕНА С УЧЁТОМ СЧАСТЛИВЫХ ЧАСОВ И СЕБЕСТОИМОСТЬ БЛЮДА ПО ТЕХКАРТЕ ---
    getDishPrice(dish) {
      if (this.state.happy_hour_enabled) {
        const pct = this.state.happy_hour_pct || 15;
        return {
          price: Math.round((dish.price * (100 - pct)) / 100),
          oldPrice: dish.price,
          discountPct: pct
        };
      }
      return { price: dish.price, oldPrice: null, discountPct: 0 };
    }

    toggleHappyHour() {
      this.state.happy_hour_enabled = !this.state.happy_hour_enabled;
      this.saveLocal(true);
      return this.state.happy_hour_enabled;
    }

    getDishCostAndMargin(dishId) {
      const dish = this.state.dishes.find((d) => d.id === dishId);
      const rows = this.state.tech_cards.filter((tc) => tc.dish_id === dishId);
      let cost = 0;
      const items = rows.map((tc) => {
        const ing = this.state.ingredients.find((i) => i.id === tc.ingredient_id);
        const lineCost = ing ? Math.round(tc.qty * ing.cost_per_unit) : 0;
        cost += lineCost;
        return {
          name: ing ? ing.name : tc.ingredient_id,
          qty: tc.qty,
          unit: ing ? ing.unit : "",
          lineCost
        };
      });
      const price = dish ? dish.price : 0;
      const margin = price - cost;
      const foodCostPct = price > 0 ? Math.round((cost / price) * 100) : 0;
      const marginPct = price > 0 ? 100 - foodCostPct : 0;
      return { cost, price, margin, foodCostPct, marginPct, items };
    }

    // --- СТАТУС СТОЛА И БРОНИРОВАНИЕ С ПРЕДОПЛАТОЙ 50% ---
    getTableLiveStatus(tableId) {
      const openOrder = this.state.orders.find((o) => o.table_id === tableId && o.status === "open");
      if (openOrder) return { status: "occupied", label: "Гости за столом", order: openOrder, reservation: null };
      const activeRes = this.state.reservations.find(
        (r) => r.table_id === tableId && r.status === "confirmed"
      );
      if (activeRes) return { status: "reserved", label: "Бронь с предоплатой", order: null, reservation: activeRes };
      return { status: "free", label: "Свободен", order: null, reservation: null };
    }

    calculatePrepayment({ tableId, guestsCount, cartItems }) {
      const table = this.state.tables.find((t) => t.id === tableId) || this.state.tables[0];
      const zone = this.state.zones.find((z) => z.id === table.zone_id) || this.state.zones[0];
      const foodTotal = (cartItems || []).reduce((s, i) => s + i.price * i.qty, 0);
      const prepay50 = Math.round(foodTotal * 0.5);
      const fallbackDeposit = zone.is_vip ? zone.deposit_per_table : zone.deposit_per_guest * Number(guestsCount || 2);

      const depositAmount = foodTotal > 0 ? prepay50 : fallbackDeposit;
      const explanation =
        foodTotal > 0
          ? `50% от стоимости заказанных блюд (${fmt(foodTotal)} × 50% = ${fmt(prepay50)})`
          : zone.is_vip
          ? `Фиксированный депозит за VIP-кабинет (${fmt(fallbackDeposit)})`
          : `Депозит ${fmt(zone.deposit_per_guest)} × ${guestsCount} гост. (так как блюда заранее не выбраны)`;

      return { foodTotal, prepay50, fallbackDeposit, depositAmount, explanation, table, zone };
    }

    createReservation({ guest_name, guest_phone, table_id, visit_date, visit_time, guests_count, comment, cartItems }) {
      const calc = this.calculatePrepayment({ tableId: table_id, guestsCount: guests_count, cartItems });
      const guest = this.getActiveGuest();

      const res = {
        id: uid("res"),
        code: "BR-" + Math.floor(100 + Math.random() * 900),
        guest_id: guest ? guest.id : null,
        guest_name: guest_name.trim(),
        guest_phone: guest_phone.trim(),
        table_id,
        visit_date,
        visit_time,
        guests_count: Number(guests_count),
        comment: (comment || "").trim(),
        preorder: (cartItems || []).map((i) => ({
          dish_id: i.dish_id,
          title: i.title,
          price: i.price,
          qty: i.qty,
          options: i.mods || ""
        })),
        preorder_total: calc.foodTotal,
        deposit_amount: calc.depositAmount,
        deposit_rule: calc.explanation,
        deposit_status: "paid",
        status: "confirmed",
        refund_amount: 0,
        created_at: new Date().toISOString()
      };

      this.state.reservations.unshift(res);
      this.state.transactions.unshift({
        id: uid("tx"),
        direction: "in",
        type: "deposit",
        title: `Предоплата брони ${res.code} (${res.guest_name}, ${calc.table.label}) — ${calc.explanation}`,
        amount: calc.depositAmount,
        method: "Карта онлайн",
        created_at: new Date().toISOString()
      });

      this.saveLocal(true);
      return res;
    }

    cancelReservation(resId, forceLateDemo = null) {
      const res = this.state.reservations.find((r) => r.id === resId);
      if (!res || res.status !== "confirmed") return null;

      const visitTs = new Date(`${res.visit_date}T${res.visit_time}:00`).getTime();
      const hoursLeft = (visitTs - Date.now()) / 3600000;
      const isFullRefund = forceLateDemo === null ? hoursLeft >= 24 : !forceLateDemo;

      res.status = "cancelled";
      if (isFullRefund) {
        res.deposit_status = "refunded";
        res.refund_amount = res.deposit_amount;
        this.state.expenses.unshift({
          id: uid("exp"),
          category: "Возвраты депозитов броней (отмена ≥24ч)",
          title: `100% возврат предоплаты по брони ${res.code} (${res.guest_name}, отмена более чем за 24 часа)`,
          amount: res.deposit_amount,
          recipient: res.guest_name,
          date: dateOffset(0)
        });
      } else {
        res.deposit_status = "forfeited";
        res.refund_amount = 0;
        this.state.transactions.unshift({
          id: uid("tx"),
          direction: "in",
          type: "deposit_forfeit",
          title: `Удержание депозита брони ${res.code} (${res.guest_name} — поздняя отмена менее чем за 24ч)`,
          amount: res.deposit_amount,
          method: "Удержание депозита",
          created_at: new Date().toISOString()
        });
      }

      this.saveLocal(true);
      return { res, isFullRefund };
    }

    seatGuestsByReservation(resId) {
      const res = this.state.reservations.find((r) => r.id === resId);
      if (!res) return null;
      res.status = "seated";
      res.deposit_status = "applied";

      const order = this.sendOrderToTable({
        table_id: res.table_id,
        guest_name: res.guest_name,
        deposit_applied: res.deposit_amount,
        items: (res.preorder || []).map((p) => ({
          dish_id: p.dish_id,
          title: p.title,
          price: p.price,
          qty: p.qty,
          mods: p.options || "Предзаказ к приходу"
        }))
      });

      this.saveLocal(true);
      return order;
    }

    sendOrderToTable({ table_id, guest_name, deposit_applied = 0, items = [] }) {
      const guest = this.getActiveGuest();
      let order = this.state.orders.find((o) => o.table_id === table_id && o.status === "open");

      if (!order && !deposit_applied) {
        const res = this.state.reservations.find((r) => r.table_id === table_id && r.status === "confirmed");
        if (res) {
          deposit_applied = res.deposit_amount;
          res.status = "seated";
          res.deposit_status = "applied";
        }
      }

      if (!order) {
        order = {
          id: uid("ord"),
          code: "ЧЕК-" + Math.floor(101 + Math.random() * 899),
          table_id,
          guest_id: guest ? guest.id : null,
          guest_name: guest_name || (guest ? guest.full_name : "Гость " + table_id),
          waiter_id: "u-waiter",
          status: "open",
          subtotal: 0,
          deposit_applied: Number(deposit_applied || 0),
          bonus_used: 0,
          total: 0,
          paid_amount: 0,
          created_at: new Date().toISOString()
        };
        this.state.orders.unshift(order);
      } else if (deposit_applied > 0 && order.deposit_applied === 0) {
        order.deposit_applied = Number(deposit_applied);
      }

      const cooks = this.state.profiles.filter((p) => p.role === "cook" && p.is_active);
      items.forEach((it, idx) => {
        const dish = this.state.dishes.find((d) => d.id === it.dish_id);
        const cook = cooks.length ? cooks[idx % cooks.length] : { id: "u-chef" };
        this.state.order_items.push({
          id: uid("item"),
          order_id: order.id,
          table_id: order.table_id,
          dish_id: it.dish_id,
          title: it.title,
          price: Number(it.price),
          qty: Number(it.qty || 1),
          mods: it.mods || "",
          status: "accepted",
          norm_min: dish ? dish.cook_time : 15,
          cook_id: cook.id,
          refunded: false,
          created_at: new Date().toISOString()
        });

        this.deductStockByTechCard(it.dish_id, Number(it.qty || 1), "sale", it.title);
      });

      this.recalcOrder(order.id);
      this.saveLocal(true);
      return order;
    }

    deductStockByTechCard(dishId, qty, reason, dishTitle) {
      const rows = this.state.tech_cards.filter((tc) => tc.dish_id === dishId);
      rows.forEach((tc) => {
        const ing = this.state.ingredients.find((i) => i.id === tc.ingredient_id);
        if (!ing) return;
        const used = Number((tc.qty * qty).toFixed(3));
        ing.stock_qty = Number(Math.max(0, ing.stock_qty - used).toFixed(3));
        this.state.write_offs.unshift({
          id: uid("wo"),
          ingredient_id: ing.id,
          dish_title: dishTitle || dishId,
          qty: used,
          unit: ing.unit,
          reason,
          cost: Math.round(used * ing.cost_per_unit),
          created_at: dateOffset(0)
        });
      });
    }

    recalcOrder(orderId) {
      const order = this.state.orders.find((o) => o.id === orderId);
      if (!order) return;
      const activeItems = this.state.order_items.filter((i) => i.order_id === orderId && !i.refunded);
      order.subtotal = activeItems.reduce((s, i) => s + i.price * i.qty, 0);
      order.total = Math.max(0, order.subtotal - order.deposit_applied - order.bonus_used);
    }

    advanceDishStatus(itemId, nextStatus) {
      const item = this.state.order_items.find((i) => i.id === itemId);
      if (!item) return null;
      item.status = nextStatus;
      if (nextStatus === "cooking") item.started_at = new Date().toISOString();
      if (nextStatus === "ready") item.ready_at = new Date().toISOString();
      if (nextStatus === "served") item.served_at = new Date().toISOString();
      this.saveLocal(true);
      return item;
    }

    payOrder({ orderId, payAmount, useBonus = 0, method = "Карта / Kaspi QR" }) {
      const order = this.state.orders.find((o) => o.id === orderId);
      if (!order) return null;
      const guest = this.getActiveGuest();

      if (useBonus > 0 && guest) {
        const actualBonus = Math.min(useBonus, guest.bonus_balance);
        guest.bonus_balance -= actualBonus;
        order.bonus_used += actualBonus;
        this.state.loyalty_log.unshift({
          id: uid("loy"),
          guest_id: guest.id,
          amount: -actualBonus,
          reason: `Оплата бонусами по счёту ${order.code}`,
          date: dateOffset(0)
        });
      }

      this.recalcOrder(order.id);
      const remaining = Math.max(0, order.total - order.paid_amount);
      const actualPay = Math.min(remaining, Number(payAmount || remaining));
      order.paid_amount += actualPay;

      if (actualPay > 0) {
        this.state.transactions.unshift({
          id: uid("tx"),
          direction: "in",
          type: "order",
          title: `Оплата по счёту ${order.code} (Стол ${order.table_id}, ${order.guest_name})`,
          amount: actualPay,
          method,
          created_at: new Date().toISOString()
        });
      }

      if (order.paid_amount >= order.total) {
        order.status = "paid";
        if (guest) {
          const cashback = Math.round((order.paid_amount + order.deposit_applied) * 0.05);
          if (cashback > 0) {
            guest.bonus_balance += cashback;
            this.state.loyalty_log.unshift({
              id: uid("loy"),
              guest_id: guest.id,
              amount: cashback,
              reason: `Кэшбэк 5% за оплаченный счёт ${order.code}`,
              date: dateOffset(0)
            });
          }
        }
      }

      this.saveLocal(true);
      return order;
    }

    addDishReview({ order_item_id, rating, tags, comment }) {
      const item = this.state.order_items.find((i) => i.id === order_item_id);
      if (!item) return null;
      const guest = this.getActiveGuest();
      const rev = {
        id: uid("rev"),
        order_item_id,
        dish_id: item.dish_id,
        dish_title: item.title,
        cook_id: item.cook_id,
        guest_name: guest ? guest.full_name : "Гость зала",
        rating: Number(rating),
        tags: tags || [],
        comment: (comment || "").trim(),
        created_at: new Date().toISOString()
      };
      this.state.reviews.unshift(rev);
      this.saveLocal(true);
      return rev;
    }

    createComplaint({ order_item_id, reason, description, photo_url, preferred }) {
      const item = this.state.order_items.find((i) => i.id === order_item_id);
      if (!item) return null;
      const guest = this.getActiveGuest();
      const cmp = {
        id: uid("cmp"),
        code: "RET-" + Math.floor(102 + Math.random() * 890),
        order_item_id: item.id,
        order_id: item.order_id,
        table_id: item.table_id,
        dish_id: item.dish_id,
        dish_title: item.title,
        cook_id: item.cook_id,
        guest_name: guest ? guest.full_name : "Гость зала",
        reason,
        description: (description || "").trim(),
        photo_url: photo_url || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=70",
        amount: item.price * item.qty,
        preferred: preferred || "refund",
        status: "open",
        resolution_note: "",
        created_at: new Date().toISOString()
      };
      this.state.complaints.unshift(cmp);

      this.state.service_calls.unshift({
        id: uid("call"),
        table_id: item.table_id,
        type: "complaint",
        message: `🚨 ПРОБЛЕМА С БЛЮДОМ «${item.title}» (${reason}) — Стол ${item.table_id}!`,
        status: "new",
        created_at: new Date().toISOString()
      });

      this.saveLocal(true);
      return cmp;
    }

    resolveComplaint(cmpId, actionType) {
      const cmp = this.state.complaints.find((c) => c.id === cmpId);
      if (!cmp || cmp.status !== "open") return null;

      const item = this.state.order_items.find((i) => i.id === cmp.order_item_id);
      if (actionType === "refund") {
        cmp.status = "refunded";
        cmp.resolution_note = `Возврат ${fmt(cmp.amount)} на карту гостя`;
        if (item) {
          item.refunded = true;
          this.recalcOrder(item.order_id);
        }
        this.state.expenses.unshift({
          id: uid("exp"),
          category: "Возвраты гостям за проблемные блюда",
          title: `Возврат денег гостю (${cmp.guest_name}) за блюдо «${cmp.dish_title}» по акту ${cmp.code} (${cmp.reason})`,
          amount: cmp.amount,
          recipient: cmp.guest_name,
          date: dateOffset(0)
        });
      } else {
        cmp.status = "bonus";
        const bonusAmt = Math.round(cmp.amount * 1.2);
        cmp.resolution_note = `Начислено ${fmt(bonusAmt)} бонусов (+20%)`;
        const guest = this.getActiveGuest();
        if (guest) {
          guest.bonus_balance += bonusAmt;
          this.state.loyalty_log.unshift({
            id: uid("loy"),
            guest_id: guest.id,
            amount: bonusAmt,
            reason: `Компенсация бонусами по обращению ${cmp.code} («${cmp.dish_title}»)`,
            date: dateOffset(0)
          });
        }
      }

      this.deductStockByTechCard(cmp.dish_id, 1, "complaint", `Брак по акту ${cmp.code}: ${cmp.dish_title}`);
      const shift = this.state.shifts.find((s) => s.staff_id === cmp.cook_id);
      if (shift) shift.penalty = Number(shift.penalty || 0) + 1500;

      this.saveLocal(true);
      return cmp;
    }

    createSupply({ supplier, ingredient_id, qty, unit_cost, invoice }) {
      const ing = this.state.ingredients.find((i) => i.id === ingredient_id);
      if (!ing) throw new Error("Ингредиент не найден");
      const numQty = Number(qty);
      const numCost = Number(unit_cost || ing.cost_per_unit);
      const total = Math.round(numQty * numCost);

      ing.stock_qty = Number((ing.stock_qty + numQty).toFixed(3));
      ing.cost_per_unit = numCost;

      const sup = {
        id: uid("sup"),
        invoice: (invoice || "НКЛ-2026-" + Math.floor(100 + Math.random() * 899)).trim(),
        supplier,
        ingredient_id: ing.id,
        ingredient_name: ing.name,
        qty: numQty,
        unit: ing.unit,
        unit_cost: numCost,
        total_cost: total,
        date: dateOffset(0),
        accepted_by: this.getActiveStaff().full_name
      };
      this.state.supplies.unshift(sup);

      this.state.expenses.unshift({
        id: uid("exp"),
        category: "Закупка продуктов (Поставки)",
        title: `Оплата поставки по накладной ${sup.invoice}: ${ing.name} (${numQty} ${ing.unit} × ${fmt(numCost)})`,
        amount: total,
        recipient: supplier,
        date: dateOffset(0)
      });

      this.saveLocal(true);
      return sup;
    }

    addExpense({ category, title, amount, recipient }) {
      const exp = {
        id: uid("exp"),
        category,
        title: title.trim(),
        amount: Number(amount),
        recipient: (recipient || "Контрагент").trim(),
        date: dateOffset(0)
      };
      this.state.expenses.unshift(exp);
      this.saveLocal(true);
      return exp;
    }

    getAccountingSummary() {
      const orderIncome = this.state.transactions
        .filter((t) => t.type === "order")
        .reduce((s, t) => s + t.amount, 0);
      const depositIncome = this.state.transactions
        .filter((t) => t.type === "deposit")
        .reduce((s, t) => s + t.amount, 0);
      const forfeitIncome = this.state.transactions
        .filter((t) => t.type === "deposit_forfeit")
        .reduce((s, t) => s + t.amount, 0);
      const totalInflow = orderIncome + depositIncome + forfeitIncome;

      const cogsSales = this.state.write_offs
        .filter((w) => w.reason === "sale")
        .reduce((s, w) => s + w.cost, 0);
      const cogsSpoilage = this.state.write_offs
        .filter((w) => w.reason !== "sale")
        .reduce((s, w) => s + w.cost, 0);

      const grossMargin = totalInflow - cogsSales;
      const grossMarginPct = totalInflow > 0 ? Math.round((grossMargin / totalInflow) * 100) : 0;
      const foodCostPct = totalInflow > 0 ? Math.round((cogsSales / totalInflow) * 100) : 0;

      const suppliesSpent = this.state.expenses
        .filter((e) => e.category.includes("Поставки"))
        .reduce((s, e) => s + e.amount, 0);
      const opexSpent = this.state.expenses
        .filter((e) => !e.category.includes("Поставки"))
        .reduce((s, e) => s + e.amount, 0);

      const staffList = this.state.profiles.filter((p) => p.role !== "guest");
      const payrollTotal = staffList.reduce((sum, st) => {
        const sh = this.state.shifts.find((x) => x.staff_id === st.id) || { hours: 8, bonus: 0, penalty: 0 };
        return sum + sh.hours * st.hourly_rate + (sh.bonus || 0) - (sh.penalty || 0);
      }, 0);

      const totalOutflow = suppliesSpent + opexSpent + payrollTotal;
      const netOperatingProfit = grossMargin - opexSpent - payrollTotal - cogsSpoilage;

      return {
        orderIncome,
        depositIncome,
        forfeitIncome,
        totalInflow,
        cogsSales,
        cogsSpoilage,
        grossMargin,
        grossMarginPct,
        foodCostPct,
        suppliesSpent,
        opexSpent,
        payrollTotal,
        totalOutflow,
        netOperatingProfit
      };
    }

    callStaffFromTable(tableId, type, customMessage) {
      const msg =
        customMessage ||
        (type === "bill"
          ? `🧾 Стол ${tableId} просит принести счёт / терминал оплаты`
          : `🔔 Стол ${tableId} вызывает официанта`);
      this.state.service_calls.unshift({
        id: uid("call"),
        table_id: tableId,
        type,
        message: msg,
        status: "new",
        created_at: new Date().toISOString()
      });
      this.saveLocal(true);
    }

    closeServiceCall(callId) {
      const c = this.state.service_calls.find((x) => x.id === callId);
      if (c) c.status = "done";
      this.saveLocal(true);
    }

    toggleDishStock(dishId) {
      const d = this.state.dishes.find((x) => x.id === dishId);
      if (d) d.in_stock = !d.in_stock;
      this.saveLocal(true);
      return d;
    }

    createDish({ title, category_id, price, weight, kcal, cook_time, description, image }) {
      const dish = {
        id: uid("d"),
        category_id: category_id || "cat-mains",
        title: title.trim(),
        description: (description || "Авторское блюдо от Шеф-повара L'AURUM").trim(),
        composition: (description || "Свежие фермерские ингредиенты").trim(),
        price: Number(price || 6500),
        weight: weight || "250 г",
        kcal: Number(kcal || 450),
        protein: 28,
        fat: 24,
        carbs: 22,
        allergens: [],
        has_doneness: category_id === "cat-steaks",
        removable: ["зелень", "соус", "лук"],
        upsell: ["d-lemonade"],
        cook_time: Number(cook_time || 15),
        in_stock: true,
        image: image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
      };
      this.state.dishes.unshift(dish);
      this.state.tech_cards.push({ dish_id: dish.id, ingredient_id: "ing-cream", qty: 0.15 });
      this.saveLocal(true);
      return dish;
    }
  }

  window.LaurumDB = new LaurumCoreEngine();
  window.LAURUM_CONST = {
    ROLE_INFO,
    ALLERGENS,
    DONENESS,
    REVIEW_TAGS,
    COMPLAINT_REASONS,
    SUPPLIERS,
    fmt
  };
})();
