/* =========================================================================
   L'AURUM — Конфигурация общей базы данных Supabase (Сайт №1: Для Гостей)
   =========================================================================
   ✅ Ваш публичный ключ (Publishable Key) УЖЕ ВСТАВЛЕН ниже!
   ⚠️ Секретный ключ (sb_secret_...) НИКОГДА не вставляйте в браузерный код
      и не загружайте на публичный GitHub — для сайта нужен только publishable ключ.

   ОСТАЛОСЬ УКАЗАТЬ ТОЛЬКО ВАШ SUPABASE_URL:
   Скопируйте Project URL из Supabase (Settings -> API -> Project URL),
   например: "https://abcdefghijklmnop.supabase.co"
   (Либо вставьте его прямо на сайте по кнопке «⚙️ Подключить Project URL Supabase»).
   ========================================================================= */
window.LAURUM_CONFIG = {
  SUPABASE_URL: "TODO_PASTE_YOUR_SUPABASE_PROJECT_URL",
  SUPABASE_ANON_KEY: "sb_publishable_Q8bp5yDcT3g-b0K7tnvbfw_RYFYDkMi",

  // Ссылка на ваш второй сайт (ERP Персонала) после публикации на GitHub Pages
  STAFF_SITE_URL: "../site-2-staff-erp/index.html",

  CURRENCY: "₸",
  PREPAY_PERCENT: 50,          // Предоплата при бронировании = 50% от заказанных блюд
  FREE_CANCEL_HOURS: 24,       // 100% возврат предоплаты при отмене за 24+ часов
  CASHBACK_PERCENT: 5,         // 5% кэшбэк бонусами гостю с каждого оплаченного счёта
  BONUS_MAX_PAY_PERCENT: 30,   // Бонусами можно оплатить до 30% счёта
  WELCOME_BONUS: 2000          // Приветственные бонусы при регистрации гостя
};
