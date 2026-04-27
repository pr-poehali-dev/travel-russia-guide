import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

// ─── Helpers: генерация партнёрских ссылок ────────────────────────────────────

function yaTravel(city: string) {
  return `https://travel.yandex.ru/hotels/${encodeURIComponent(city)}/`;
}

function yaMarket(query: string) {
  return `https://market.yandex.ru/search?text=${encodeURIComponent(query)}`;
}

// ─── Data ───────────────────────────────────────────────────────────────────

const CITIES = [
  // Москва
  { id: 1, name: "Москва", region: "Москва", coords: "55°45′N 37°37′E", desc: "Сердце России, столица с тысячелетней историей", img: "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=600&q=80", category: "Москва", rating: 4.8, hotels: 1240 },
  // Санкт-Петербург
  { id: 2, name: "Санкт-Петербург", region: "Санкт-Петербург", coords: "59°57′N 30°19′E", desc: "Северная столица, город белых ночей и дворцов", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", category: "Санкт-Петербург", rating: 4.9, hotels: 890 },
  // Республика Карелия
  { id: 3, name: "Петрозаводск", region: "Республика Карелия", coords: "61°47′N 34°20′E", desc: "Столица Карелии на берегу Онежского озера", img: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=600&q=80", category: "Республика Карелия", rating: 4.6, hotels: 124 },
  { id: 4, name: "Сортавала", region: "Республика Карелия", coords: "61°42′N 30°41′E", desc: "Старинный карельский город у Ладожского озера", img: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=600&q=80", category: "Республика Карелия", rating: 4.7, hotels: 48 },
  // Республика Татарстан
  { id: 5, name: "Казань", region: "Республика Татарстан", coords: "55°47′N 49°07′E", desc: "Третья столица России, где встречаются культуры", img: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=600&q=80", category: "Республика Татарстан", rating: 4.8, hotels: 320 },
  // Республика Башкортостан
  { id: 6, name: "Уфа", region: "Республика Башкортостан", coords: "54°44′N 55°58′E", desc: "Столица Башкортостана, город на семи холмах", img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80", category: "Республика Башкортостан", rating: 4.6, hotels: 210 },
  // Свердловская область
  { id: 7, name: "Екатеринбург", region: "Свердловская область", coords: "56°50′N 60°35′E", desc: "Граница Европы и Азии, уральская столица", img: "https://images.unsplash.com/photo-1605800950303-bd89a2e1d77c?w=600&q=80", category: "Свердловская область", rating: 4.7, hotels: 310 },
  // Челябинская область
  { id: 8, name: "Челябинск", region: "Челябинская область", coords: "55°09′N 61°24′E", desc: "Южноуральская столица, крупный промышленный и культурный центр", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80", category: "Челябинская область", rating: 4.5, hotels: 180 },
  // Краснодарский край
  { id: 9, name: "Краснодар", region: "Краснодарский край", coords: "45°02′N 38°58′E", desc: "Столица Кубани, южный мегаполис с мягким климатом", img: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80", category: "Краснодарский край", rating: 4.6, hotels: 220 },
  { id: 10, name: "Сочи", region: "Краснодарский край", coords: "43°35′N 39°43′E", desc: "Южная жемчужина, курорт у Черного моря", img: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=600&q=80", category: "Краснодарский край", rating: 4.7, hotels: 540 },
  { id: 11, name: "Анапа", region: "Краснодарский край", coords: "44°53′N 37°19′E", desc: "Город-курорт с песчаными пляжами и виноградниками", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80", category: "Краснодарский край", rating: 4.6, hotels: 290 },
  { id: 12, name: "Геленджик", region: "Краснодарский край", coords: "44°33′N 38°04′E", desc: "Жемчужина Черноморского побережья, бухта мечты", img: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=600&q=80", category: "Краснодарский край", rating: 4.7, hotels: 340 },
  { id: 13, name: "Новороссийск", region: "Краснодарский край", coords: "44°43′N 37°46′E", desc: "Город-герой, крупнейший порт Черного моря", img: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=600&q=80", category: "Краснодарский край", rating: 4.5, hotels: 150 },
  // Ставропольский край
  { id: 14, name: "Пятигорск", region: "Ставропольский край", coords: "44°02′N 43°03′E", desc: "Курортный город у подножия Машука, жемчужина КМВ", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80", category: "Ставропольский край", rating: 4.7, hotels: 230 },
  // Кабардино-Балкарская Республика
  { id: 15, name: "Нальчик", region: "Кабардино-Балкарская Республика", coords: "43°29′N 43°36′E", desc: "Столица Кабардино-Балкарии у подножия Кавказских гор", img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80", category: "Кабардино-Балкарская Республика", rating: 4.6, hotels: 170 },
  // Республика Северная Осетия — Алания
  { id: 16, name: "Владикавказ", region: "Республика Северная Осетия — Алания", coords: "43°01′N 44°41′E", desc: "Ворота Кавказа, столица Северной Осетии", img: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=600&q=80", category: "Республика Северная Осетия — Алания", rating: 4.6, hotels: 190 },
  // Чеченская Республика
  { id: 17, name: "Грозный", region: "Чеченская Республика", coords: "43°18′N 45°41′E", desc: "Столица Чечни, современный город с небоскрёбами", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80", category: "Чеченская Республика", rating: 4.7, hotels: 200 },
  // ХМАО — Югра
  { id: 18, name: "Ханты-Мансийск", region: "ХМАО — Югра", coords: "61°00′N 69°01′E", desc: "Столица Югры, город у слияния Оби и Иртыша", img: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80", category: "ХМАО — Югра", rating: 4.6, hotels: 150 },
  { id: 19, name: "Сургут", region: "ХМАО — Югра", coords: "61°15′N 73°26′E", desc: "Нефтяная столица Сибири, динамичный город-миллионник", img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80", category: "ХМАО — Югра", rating: 4.5, hotels: 120 },
  { id: 20, name: "Нижневартовск", region: "ХМАО — Югра", coords: "60°56′N 76°33′E", desc: "Город нефтяников на берегу реки Обь", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80", category: "ХМАО — Югра", rating: 4.4, hotels: 100 },
  // Иркутская область
  { id: 21, name: "Иркутск", region: "Иркутская область", coords: "52°17′N 104°16′E", desc: "Ворота Байкала, купеческий город с богатой историей", img: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=600&q=80", category: "Иркутская область", rating: 4.7, hotels: 240 },
  // Приморский край
  { id: 22, name: "Владивосток", region: "Приморский край", coords: "43°07′N 131°54′E", desc: "Тихоокеанские ворота России, город на сопках и бухтах", img: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=600&q=80", category: "Приморский край", rating: 4.8, hotels: 290 },
  // Камчатский край
  { id: 23, name: "Петропавловск-Камчатский", region: "Камчатский край", coords: "53°01′N 158°39′E", desc: "Столица Камчатки у подножия действующих вулканов", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80", category: "Камчатский край", rating: 4.8, hotels: 220 },
  { id: 24, name: "Елизово", region: "Камчатский край", coords: "53°11′N 158°22′E", desc: "Ворота Камчатки, база для вулканных экспедиций", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=600&q=80", category: "Камчатский край", rating: 4.6, hotels: 110 },
];

const HOTELS = [
  { id: 1, name: "Гостиница Астория", city: "Санкт-Петербург", stars: 5, price: "от 18 500 ₽", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80", rating: 4.9, reviews: 1240, tags: ["СПА", "Ресторан", "Вид на Исаакий"] },
  { id: 2, name: "Four Seasons Москва", city: "Москва", stars: 5, price: "от 35 000 ₽", img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80", rating: 4.9, reviews: 980, tags: ["Кремль рядом", "СПА", "Ресторан"] },
  { id: 3, name: "Лотте Отель Москва", city: "Москва", stars: 5, price: "от 28 000 ₽", img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80", rating: 4.8, reviews: 760, tags: ["Бассейн", "Арбат", "Люкс"] },
  { id: 4, name: "Korston Hotel Казань", city: "Казань", stars: 5, price: "от 12 000 ₽", img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80", rating: 4.7, reviews: 580, tags: ["Центр", "Вид на Кремль", "СПА"] },
  { id: 5, name: "Swissôtel Сочи", city: "Сочи", stars: 5, price: "от 22 000 ₽", img: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&q=80", rating: 4.8, reviews: 890, tags: ["Море", "Бассейн", "Пляж"] },
  { id: 6, name: "Marins Park Hotel", city: "Екатеринбург", stars: 4, price: "от 8 500 ₽", img: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80", rating: 4.7, reviews: 420, tags: ["Центр", "Ресторан", "Конференц-залы"] },
];

const MARKET_PRODUCTS = [
  { id: 1, name: "Туристический рюкзак 60 л", brand: "Osprey", price: "от 8 490 ₽", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80", rating: 4.8, reviews: 3240, query: "туристический рюкзак 60 литров", badge: "Топ продаж" },
  { id: 2, name: "Чемодан-спиннер 75 см", brand: "Samsonite", price: "от 14 900 ₽", img: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=400&q=80", rating: 4.9, reviews: 5100, query: "чемодан самсонайт спиннер", badge: "Хит" },
  { id: 3, name: "Треккинговые ботинки", brand: "Salomon", price: "от 9 800 ₽", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80", rating: 4.7, reviews: 2870, query: "трекинговые ботинки salomon", badge: "" },
  { id: 4, name: "Палатка двухместная", brand: "Naturehike", price: "от 5 600 ₽", img: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&q=80", rating: 4.6, reviews: 1890, query: "двухместная туристическая палатка", badge: "" },
  { id: 5, name: "Спальный мешок -15°C", brand: "Bask", price: "от 6 200 ₽", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", rating: 4.7, reviews: 1430, query: "спальный мешок зимний", badge: "" },
  { id: 6, name: "Экшн-камера 4K", brand: "GoPro", price: "от 24 990 ₽", img: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&q=80", rating: 4.9, reviews: 8700, query: "gopro экшн камера 4k", badge: "Хит" },
  { id: 7, name: "Компас туристический", brand: "Silva", price: "от 1 490 ₽", img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80", rating: 4.5, reviews: 920, query: "туристический компас silva", badge: "" },
  { id: 8, name: "Термос 1 л", brand: "Stanley", price: "от 3 900 ₽", img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80", rating: 4.8, reviews: 4200, query: "термос stanley 1 литр", badge: "Топ продаж" },
  { id: 9, name: "Дождевик-пончо", brand: "Jack Wolfskin", price: "от 2 100 ₽", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", rating: 4.4, reviews: 730, query: "дождевик пончо туристический", badge: "" },
  { id: 10, name: "Трекинговые палки", brand: "Black Diamond", price: "от 4 800 ₽", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80", rating: 4.7, reviews: 1680, query: "трекинговые палки black diamond", badge: "" },
  { id: 11, name: "Аптечка походная", brand: "Lifesystems", price: "от 1 890 ₽", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80", rating: 4.6, reviews: 2100, query: "походная аптечка", badge: "" },
  { id: 12, name: "Powerbank 20 000 мАч", brand: "Xiaomi", price: "от 2 490 ₽", img: "https://images.unsplash.com/photo-1585338447937-7082f8fc763d?w=400&q=80", rating: 4.8, reviews: 12000, query: "powerbank xiaomi 20000", badge: "Хит" },
];

const MARKET_CATEGORIES = [
  { label: "Все товары", query: "" },
  { label: "Рюкзаки и чемоданы", query: "туристический рюкзак чемодан" },
  { label: "Обувь", query: "трекинговые ботинки" },
  { label: "Кемпинг", query: "палатка спальный мешок кемпинг" },
  { label: "Гаджеты", query: "экшн камера powerbank туристический" },
  { label: "Снаряжение", query: "трекинговые палки компас дождевик" },
];

const CITY_FILTERS = [
  "Все",
  "Москва",
  "Санкт-Петербург",
  "Республика Карелия",
  "Республика Татарстан",
  "Республика Башкортостан",
  "Свердловская область",
  "Челябинская область",
  "Краснодарский край",
  "Ставропольский край",
  "Кабардино-Балкарская Республика",
  "Республика Северная Осетия — Алания",
  "Чеченская Республика",
  "ХМАО — Югра",
  "Иркутская область",
  "Приморский край",
  "Камчатский край",
];

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "cities", label: "Направления" },
  { id: "hotels", label: "Отели" },
  { id: "market", label: "Товары" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  return (
    <span className="stars text-sm">
      {"★".repeat(full)}{"☆".repeat(5 - full)}
      <span className="ml-1 font-golos text-xs" style={{ color: "var(--ink-light)" }}>{rating}</span>
    </span>
  );
}

function CompassRose() {
  return (
    <div className="relative w-16 h-16 animate-compass-spin opacity-30">
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="30" stroke="#b5651d" strokeWidth="1" strokeDasharray="4 3" />
        <circle cx="32" cy="32" r="20" stroke="#b5651d" strokeWidth="0.5" />
        <polygon points="32,4 35,30 32,28 29,30" fill="#b5651d" />
        <polygon points="32,60 35,34 32,36 29,34" fill="#5c3d1e" />
        <polygon points="4,32 30,29 28,32 30,35" fill="#5c3d1e" />
        <polygon points="60,32 34,29 36,32 34,35" fill="#b5651d" />
        <circle cx="32" cy="32" r="3" fill="#b5651d" />
        <text x="32" y="18" textAnchor="middle" fontSize="7" fill="#b5651d" fontFamily="Golos Text">С</text>
        <text x="32" y="52" textAnchor="middle" fontSize="7" fill="#5c3d1e" fontFamily="Golos Text">Ю</text>
        <text x="18" y="35" textAnchor="middle" fontSize="7" fill="#5c3d1e" fontFamily="Golos Text">З</text>
        <text x="46" y="35" textAnchor="middle" fontSize="7" fill="#b5651d" fontFamily="Golos Text">В</text>
      </svg>
    </div>
  );
}

function MapPin() {
  return (
    <svg width="10" height="14" viewBox="0 0 12 16" fill="none" style={{ display: "inline", verticalAlign: "middle", flexShrink: 0 }}>
      <path d="M6 0C2.69 0 0 2.69 0 6c0 4.5 6 10 6 10s6-5.5 6-10c0-3.31-2.69-6-6-6z" fill="var(--copper)" />
      <circle cx="6" cy="6" r="2.5" fill="var(--parchment)" />
    </svg>
  );
}

function SectionHeader({ label, title, subtitle }: { label: string; title: string; subtitle: string }) {
  return (
    <div className="text-center mb-12">
      <div className="coord-tag mb-3">{label}</div>
      <h2 className="font-cormorant text-4xl md:text-5xl font-bold mb-4" style={{ color: "var(--ink)" }}>
        {title}
      </h2>
      <div className="section-divider max-w-xs mx-auto mb-4">
        <span className="font-cormorant text-lg" style={{ color: "var(--copper)" }}>⁕</span>
      </div>
      <p className="font-golos text-sm" style={{ color: "var(--muted-foreground)" }}>{subtitle}</p>
    </div>
  );
}

// Значок Яндекса
function YaBadge({ service }: { service: "travel" | "market" }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-golos font-semibold"
      style={{
        background: service === "travel" ? "#FFCC00" : "#FF6600",
        color: "#1a1a1a",
      }}
    >
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="currentColor" />
      </svg>
      {service === "travel" ? "Яндекс.Путешествия" : "Яндекс.Маркет"}
    </span>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function HeroSection({ onNav }: { onNav: (s: string) => void }) {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden map-grid">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: `url(https://cdn.poehali.dev/projects/55e8c3ae-27b8-46ec-a897-04a254c487e1/files/59d70daf-cc25-44f8-8e44-ee2235c95f89.jpg)` }}
      />

      {[
        "absolute top-8 left-8",
        "absolute top-8 right-8 rotate-90",
        "absolute bottom-8 left-8 -rotate-90",
        "absolute bottom-8 right-8 rotate-180",
      ].map((cls, i) => (
        <div key={i} className={`${cls} w-24 h-24 pointer-events-none`}>
          <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
            <path d="M0 96V0h96" stroke="var(--copper)" strokeWidth="1" strokeDasharray="6 4" opacity="0.4" />
          </svg>
        </div>
      ))}

      <div className="absolute top-20 right-24 hidden lg:block">
        <CompassRose />
      </div>

      <div className="relative flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="coord-tag mb-6 animate-fade-in" style={{ animationDelay: "0.1s", opacity: 0 }}>
          ПУТЕВОДИТЕЛЬ ПО ГОРОДАМ России · 2024
        </div>

        <h1
          className="font-cormorant text-6xl md:text-8xl lg:text-9xl font-bold leading-none mb-6 animate-fade-in"
          style={{ color: "var(--ink)", animationDelay: "0.3s", opacity: 0 }}
        >
          Атлас<br />
          <em className="italic" style={{ color: "var(--copper)" }}>Путешествий</em>
        </h1>

        <p
          className="font-golos text-base md:text-lg max-w-2xl mb-4 leading-relaxed animate-fade-in"
          style={{ color: "var(--ink-light)", animationDelay: "0.5s", opacity: 0 }}
        >
          Выбирайте направление — мы покажем лучшие отели через Яндекс.Путешествия
          и поможем собрать вещи через Яндекс.Маркет.
        </p>

        <div className="flex gap-3 mb-10 animate-fade-in flex-wrap justify-center" style={{ animationDelay: "0.6s", opacity: 0 }}>
          <YaBadge service="travel" />
          <YaBadge service="market" />
        </div>

        <div className="flex gap-4 flex-wrap justify-center animate-fade-in" style={{ animationDelay: "0.7s", opacity: 0 }}>
          <button
            onClick={() => onNav("cities")}
            className="px-8 py-3.5 font-golos text-sm font-semibold uppercase tracking-wider transition-opacity hover:opacity-90"
            style={{ background: "var(--copper)", color: "var(--parchment)", borderRadius: "2px", cursor: "pointer" }}
          >
            Выбрать направление
          </button>
          <button
            onClick={() => onNav("market")}
            className="px-8 py-3.5 font-golos text-sm font-semibold uppercase tracking-wider transition-opacity hover:opacity-90"
            style={{ background: "transparent", color: "var(--ink)", border: "1.5px solid var(--copper)", borderRadius: "2px", cursor: "pointer" }}
          >
            Товары для путешествий
          </button>
        </div>

        <div className="flex gap-12 mt-12 animate-fade-in" style={{ animationDelay: "0.9s", opacity: 0 }}>
          {[
            { num: "24", label: "Города" },
            { num: "17", label: "Регионов" },
            { num: "12", label: "Категорий товаров" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-cormorant text-3xl font-bold" style={{ color: "var(--copper)" }}>{s.num}</div>
              <div className="font-golos text-xs uppercase tracking-wider mt-1" style={{ color: "var(--muted-foreground)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex justify-center pb-10">
        <div className="flex flex-col items-center gap-2 opacity-40">
          <span className="coord-tag">ПРОКРУТИТЕ ВНИЗ</span>
          <Icon name="ChevronsDown" size={16} style={{ color: "var(--copper)" }} />
        </div>
      </div>
    </section>
  );
}

function CitiesSection() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Все");

  const filtered = CITIES.filter((c) => {
    const q = search.toLowerCase();
    return (!q || c.name.toLowerCase().includes(q) || c.region.toLowerCase().includes(q))
      && (filter === "Все" || c.category === filter);
  });

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <SectionHeader
        label="02 · НАПРАВЛЕНИЯ"
        title="Города России"
        subtitle="Выберите направление — перейдите к отелям на Яндекс.Путешествиях"
      />

      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <div className="flex-1 flex items-center gap-2 search-input px-4 py-2.5">
          <Icon name="Search" size={16} style={{ color: "var(--copper)" }} />
          <input
            type="text"
            placeholder="Поиск по городу или региону..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent flex-1 text-sm font-golos"
            style={{ outline: "none", border: "none", color: "var(--ink)" }}
          />
          {search && <button onClick={() => setSearch("")}><Icon name="X" size={14} style={{ color: "var(--copper)" }} /></button>}
        </div>
        <div className="flex gap-2 flex-wrap">
          {CITY_FILTERS.map((f) => (
            <button key={f} className={`filter-pill ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((city, i) => (
          <a
            key={city.id}
            href={yaTravel(city.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="paper-card card-hover cursor-pointer overflow-hidden animate-fade-in block"
            style={{ animationDelay: `${i * 0.07}s`, opacity: 0, textDecoration: "none" }}
          >
            <div className="relative h-48 overflow-hidden">
              <img src={city.img} alt={city.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute top-3 right-3">
                <YaBadge service="travel" />
              </div>
              <div className="absolute bottom-3 left-3 coord-tag" style={{ color: "rgba(255,255,255,0.85)" }}>{city.coords}</div>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-cormorant text-xl font-bold" style={{ color: "var(--ink)" }}>{city.name}</h3>
                  <p className="font-golos text-xs flex items-center gap-1 mt-0.5" style={{ color: "var(--ink-light)" }}>
                    <MapPin />{city.region}
                  </p>
                </div>
                <StarRating rating={city.rating} />
              </div>
              <p className="font-golos text-sm leading-relaxed mb-3" style={{ color: "var(--ink-light)" }}>{city.desc}</p>
              <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px dashed var(--parchment-dark)" }}>
                <span className="coord-tag">{city.hotels}+ отелей</span>
                <span className="font-golos text-xs uppercase tracking-wider" style={{ color: "var(--copper)" }}>Найти отель →</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="font-cormorant text-4xl mb-2" style={{ color: "var(--copper)" }}>∅</div>
          <p className="font-golos text-sm" style={{ color: "var(--muted-foreground)" }}>По вашему запросу ничего не найдено</p>
        </div>
      )}
    </section>
  );
}

function HotelsSection() {
  const [search, setSearch] = useState("");

  const filtered = HOTELS.filter((h) => {
    const q = search.toLowerCase();
    return !q || h.name.toLowerCase().includes(q) || h.city.toLowerCase().includes(q);
  });

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <SectionHeader
        label="03 · ОТЕЛИ"
        title="Популярные отели"
        subtitle="Бронируйте через Яндекс.Путешествия — лучшие цены и кешбэк"
      />

      <div className="flex items-center gap-2 search-input px-4 py-2.5 max-w-md mb-10">
        <Icon name="Search" size={16} style={{ color: "var(--copper)" }} />
        <input
          type="text"
          placeholder="Поиск по отелю или городу..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent flex-1 text-sm font-golos"
          style={{ outline: "none", border: "none", color: "var(--ink)" }}
        />
        {search && <button onClick={() => setSearch("")}><Icon name="X" size={14} style={{ color: "var(--copper)" }} /></button>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((h, i) => (
          <div key={h.id} className="paper-card card-hover overflow-hidden animate-fade-in" style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}>
            <div className="relative h-48 overflow-hidden">
              <img src={h.img} alt={h.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-3 right-3">
                <YaBadge service="travel" />
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                <div>
                  <h3 className="font-cormorant text-lg font-bold text-white">{h.name}</h3>
                  <p className="font-golos text-xs flex items-center gap-1" style={{ color: "rgba(255,255,255,0.8)" }}>
                    <MapPin />{h.city}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-cormorant text-sm font-bold text-white">{h.price}</div>
                  <div className="text-xs" style={{ color: "#ffd700" }}>{"★".repeat(h.stars)}</div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <StarRating rating={h.rating} />
                <span className="coord-tag">{h.reviews.toLocaleString("ru")} отзывов</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {h.tags.map((t) => (
                  <span key={t} className="font-golos text-xs px-2 py-0.5" style={{ background: "var(--parchment-dark)", color: "var(--ink-light)", borderRadius: "2px" }}>{t}</span>
                ))}
              </div>
              <a
                href={yaTravel(h.city)}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-2.5 font-golos text-sm font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity text-center"
                style={{ background: "#FFCC00", color: "#1a1a1a", borderRadius: "2px", cursor: "pointer", textDecoration: "none" }}
              >
                Забронировать на Яндексе
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function MarketSection() {
  const [catFilter, setCatFilter] = useState("");
  const [search, setSearch] = useState("");

  const filtered = MARKET_PRODUCTS.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
    const matchCat = !catFilter || p.query.toLowerCase().split(" ").some((w) => catFilter.toLowerCase().includes(w));
    return matchSearch && (catFilter === "" ? true : matchCat);
  });

  const displayProducts = search ? filtered : (catFilter ? filtered : MARKET_PRODUCTS);

  return (
    <section className="py-20 px-6" style={{ background: "rgba(232,220,200,0.3)" }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="04 · ТОВАРЫ"
          title="Всё для путешествия"
          subtitle="Подбираем снаряжение — покупайте на Яндекс.Маркете"
        />

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 flex items-center gap-2 search-input px-4 py-2.5">
            <Icon name="Search" size={16} style={{ color: "var(--copper)" }} />
            <input
              type="text"
              placeholder="Поиск товара..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent flex-1 text-sm font-golos"
              style={{ outline: "none", border: "none", color: "var(--ink)" }}
            />
            {search && <button onClick={() => setSearch("")}><Icon name="X" size={14} style={{ color: "var(--copper)" }} /></button>}
          </div>
          <div className="flex gap-2 flex-wrap">
            {MARKET_CATEGORIES.map((c) => (
              <button
                key={c.label}
                className={`filter-pill ${catFilter === c.query ? "active" : ""}`}
                onClick={() => setCatFilter(c.query)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {displayProducts.map((p, i) => (
            <a
              key={p.id}
              href={yaMarket(p.query)}
              target="_blank"
              rel="noopener noreferrer"
              className="paper-card card-hover overflow-hidden animate-fade-in block"
              style={{ animationDelay: `${i * 0.06}s`, opacity: 0, textDecoration: "none" }}
            >
              <div className="relative h-40 overflow-hidden">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                {p.badge && (
                  <div className="absolute top-2 left-2">
                    <span className="font-golos text-xs px-2 py-0.5 font-bold" style={{ background: "#FF6600", color: "#fff", borderRadius: "2px" }}>
                      {p.badge}
                    </span>
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <YaBadge service="market" />
                </div>
              </div>
              <div className="p-4">
                <div className="font-golos text-xs mb-1" style={{ color: "var(--copper)" }}>{p.brand}</div>
                <h3 className="font-cormorant text-base font-bold mb-1 leading-tight" style={{ color: "var(--ink)" }}>{p.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  <StarRating rating={p.rating} />
                </div>
                <div className="font-golos text-xs mb-3" style={{ color: "var(--muted-foreground)" }}>{p.reviews.toLocaleString("ru")} отзывов</div>
                <div className="flex items-center justify-between">
                  <span className="font-cormorant text-lg font-bold" style={{ color: "var(--ink)" }}>{p.price}</span>
                  <span className="font-golos text-xs uppercase tracking-wider" style={{ color: "#FF6600" }}>Купить →</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href={yaMarket("туристическое снаряжение")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 font-golos text-sm font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
            style={{ background: "#FF6600", color: "#fff", borderRadius: "2px", textDecoration: "none" }}
          >
            <Icon name="ShoppingBag" size={16} />
            Все товары на Яндекс.Маркете
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Index() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (id: string) => {
    setActive(id);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen font-golos" style={{ background: "var(--parchment)" }}>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(245,239,224,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(8px)" : "none",
          borderBottom: scrolled ? "1px solid var(--parchment-dark)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <button onClick={() => navigate("home")} className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center" style={{ border: "1.5px solid var(--copper)", borderRadius: "2px" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="var(--copper)" strokeWidth="1" />
                <circle cx="8" cy="8" r="3" stroke="var(--copper)" strokeWidth="0.5" />
                <line x1="8" y1="1" x2="8" y2="5" stroke="var(--copper)" strokeWidth="1" />
                <line x1="8" y1="11" x2="8" y2="15" stroke="var(--copper)" strokeWidth="1" />
                <line x1="1" y1="8" x2="5" y2="8" stroke="var(--copper)" strokeWidth="1" />
                <line x1="11" y1="8" x2="15" y2="8" stroke="var(--copper)" strokeWidth="1" />
              </svg>
            </div>
            <span className="font-cormorant text-xl font-bold" style={{ color: "var(--ink)" }}>
              Атлас <em className="italic" style={{ color: "var(--copper)" }}>Путешествий</em>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => navigate(item.id)} className={`nav-link ${active === item.id ? "active" : ""}`}>
                {item.label}
              </button>
            ))}
          </nav>

          <a
            href={yaTravel("Россия")}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block px-4 py-2 font-golos text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
            style={{ background: "#FFCC00", color: "#1a1a1a", borderRadius: "2px" }}
          >
            Яндекс.Путешествия
          </a>

          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={20} style={{ color: "var(--ink)" }} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t animate-fade-in" style={{ background: "var(--parchment)", borderColor: "var(--parchment-dark)" }}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className="w-full text-left px-6 py-4 font-golos text-sm uppercase tracking-wider border-b"
                style={{ borderColor: "var(--parchment-dark)", color: active === item.id ? "var(--copper)" : "var(--ink-light)", fontWeight: active === item.id ? "600" : "400" }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main>
        {active === "home" && <HeroSection onNav={navigate} />}
        {active === "cities" && <div className="pt-20"><CitiesSection /></div>}
        {active === "hotels" && <div className="pt-20"><HotelsSection /></div>}
        {active === "market" && <div className="pt-20"><MarketSection /></div>}
      </main>

      <footer className="py-12 px-6" style={{ borderTop: "1px solid var(--parchment-dark)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="section-divider mb-8">
            <span className="font-cormorant text-sm italic" style={{ color: "var(--copper)" }}>
              «Мир — это книга, и тот, кто не путешествует, читает лишь одну её страницу»
            </span>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="font-cormorant text-lg font-bold" style={{ color: "var(--ink)" }}>
              Атлас <em className="italic" style={{ color: "var(--copper)" }}>Путешествий</em>
            </div>
            <div className="flex gap-8 flex-wrap justify-center">
              {NAV_ITEMS.map((item) => (
                <button key={item.id} onClick={() => navigate(item.id)} className="nav-link">{item.label}</button>
              ))}
            </div>
            <div className="flex gap-3 items-center">
              <YaBadge service="travel" />
              <YaBadge service="market" />
            </div>
          </div>
          <div className="text-center mt-6 coord-tag">© 2024 · ATLAS TERRARUM · Партнёрский проект</div>
        </div>
      </footer>
    </div>
  );
}
