# L'AURUM — Сайт №1: Клиентский сайт для Гостей (`site-1-guest`)

Отдельный репозиторий клиентского сайта ресторана **L'AURUM**, работающий на **единой облачной базе данных Supabase** совместно со вторым репозиторием персонала (`site-2-staff-erp`).

## 🚀 Как залить в 1-й репозиторий на GitHub Pages
1. Создайте на GitHub первый репозиторий (например, `laurum-guest`).
2. Загрузите в корень репозитория файлы из этой папки `site-1-guest/`:
   * `index.html`
   * `js/config.js` (ваш ключ `sb_publishable_Q8bp5yDcT3g-b0K7tnvbfw_RYFYDkMi` уже встроен!)
   * `js/core.js`
3. В файле `js/config.js` (строка 13) укажите ваш `SUPABASE_URL` (из раздела **Supabase → Project Settings → API → Project URL**).
4. Включите **Settings → Pages → Branch: main (/root)**.
