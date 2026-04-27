import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

// ─── Data ───────────────────────────────────────────────────────────────────

const CITIES = [
  { id: 1, name: "Санкт-Петербург", country: "Россия", coords: "59°57′N 30°19′E", desc: "Северная столица, город белых ночей и дворцов", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", category: "Северо-Запад", rating: 4.9, sights: 48 },
  { id: 2, name: "Москва", country: "Россия", coords: "55°45′N 37°37′E", desc: "Сердце России, столица с тысячелетней историей", img: "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=600&q=80", category: "Центр", rating: 4.8, sights: 74 },
  { id: 3, name: "Казань", country: "Россия", coords: "55°47′N 49°07′E", desc: "Третья столица России, где встречаются культуры", img: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=600&q=80", category: "Поволжье", rating: 4.8, sights: 32 },
  { id: 4, name: "Сочи", country: "Россия", coords: "43°35′N 39°43′E", desc: "Южная жемчужина, курорт у Черного моря", img: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=600&q=80", category: "Юг", rating: 4.7, sights: 27 },
  { id: 5, name: "Екатеринбург", country: "Россия", coords: "56°50′N 60°35′E", desc: "Граница Европы и Азии, уральская столица", img: "https://images.unsplash.com/photo-1605800950303-bd89a2e1d77c?w=600&q=80", category: "Урал", rating: 4.7, sights: 31 },
  { id: 6, name: "Байкал", country: "Россия", coords: "53°30′N 108°00′E", desc: "Глубочайшее озеро мира, жемчужина Сибири", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=600&q=80", category: "Сибирь", rating: 4.9, sights: 19 },
];

const SIGHTS = [
  { id: 1, name: "Эрмитаж", city: "Санкт-Петербург", type: "Музей", rating: 4.9, reviews: 24500, img: "https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=600&q=80", desc: "Один из крупнейших музеев мира, сокровищница мировой культуры" },
  { id: 2, name: "Собор Василия Блаженного", city: "Москва", type: "Храм", rating: 4.8, reviews: 31200, img: "https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=600&q=80", desc: "Символ России, шедевр русской архитектуры XVI века" },
  { id: 3, name: "Петергоф", city: "Санкт-Петербург", type: "Парк", rating: 4.9, reviews: 28700, img: "https://images.unsplash.com/photo-1548625361-58a9b86aa83b?w=600&q=80", desc: "Русский Версаль, дворцово-парковый ансамбль с фонтанами" },
  { id: 4, name: "Казанский Кремль", city: "Казань", type: "Крепость", rating: 4.8, reviews: 18400, img: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=600&q=80", desc: "Белокаменная крепость, объект Всемирного наследия ЮНЕСКО" },
  { id: 5, name: "Кремль", city: "Москва", type: "Крепость", rating: 4.9, reviews: 45200, img: "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=600&q=80", desc: "Главная крепость страны, резиденция президента России" },
  { id: 6, name: "Байкал", city: "Иркутск", type: "Природа", rating: 5.0, reviews: 38100, img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=600&q=80", desc: "Глубочайшее озеро мира, объект Всемирного природного наследия" },
];

const HOTELS = [
  { id: 1, name: "Гостиница Астория", city: "Санкт-Петербург", stars: 5, price: "от 18 500 ₽", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80", rating: 4.9, reviews: 1240, tags: ["СПА", "Ресторан", "Вид на Исаакий"] },
  { id: 2, name: "Four Seasons Москва", city: "Москва", stars: 5, price: "от 35 000 ₽", img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80", rating: 4.9, reviews: 980, tags: ["Кремль рядом", "СПА", "Ресторан"] },
  { id: 3, name: "Лотте Отель Москва", city: "Москва", stars: 5, price: "от 28 000 ₽", img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80", rating: 4.8, reviews: 760, tags: ["Бассейн", "Арбат", "Люкс"] },
  { id: 4, name: "Korston Hotel Казань", city: "Казань", stars: 5, price: "от 12 000 ₽", img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80", rating: 4.7, reviews: 580, tags: ["Центр", "Вид на Кремль", "СПА"] },
  { id: 5, name: "Swissôtel Сочи", city: "Сочи", stars: 5, price: "от 22 000 ₽", img: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&q=80", rating: 4.8, reviews: 890, tags: ["Море", "Бассейн", "Пляж"] },
  { id: 6, name: "Marins Park Hotel", city: "Екатеринбург", stars: 4, price: "от 8 500 ₽", img: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80", rating: 4.7, reviews: 420, tags: ["Центр", "Ресторан", "Конференц-залы"] },
];

const CITY_FILTERS = ["Все", "Центр", "Северо-Запад", "Поволжье", "Юг", "Урал", "Сибирь"];
const SIGHT_FILTERS = ["Все", "Музей", "Храм", "Парк", "Крепость", "Природа"];
const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "cities", label: "Города" },
  { id: "sights", label: "Достопримечательности" },
  { id: "hotels", label: "Отели" },
  { id: "contacts", label: "Контакты" },
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

// ─── Sections ─────────────────────────────────────────────────────────────────

function HeroSection({ onNav }: { onNav: (s: string) => void }) {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden map-grid">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: `url(https://cdn.poehali.dev/projects/55e8c3ae-27b8-46ec-a897-04a254c487e1/files/59d70daf-cc25-44f8-8e44-ee2235c95f89.jpg)` }}
      />

      {/* Corner decorations */}
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
          ATLAS TERRARUM · 2024 · VOL. XII
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "0.2s", opacity: 0 }}>
          <div className="inline-flex items-center gap-3 px-4 py-1.5 stamp mb-6">
            <MapPin />
            <span className="font-golos text-xs uppercase tracking-widest" style={{ color: "var(--copper)" }}>
              Путеводитель по миру
            </span>
          </div>
        </div>

        <h1
          className="font-cormorant text-6xl md:text-8xl lg:text-9xl font-bold leading-none mb-6 animate-fade-in"
          style={{ color: "var(--ink)", animationDelay: "0.3s", opacity: 0 }}
        >
          Атлас<br />
          <em className="italic" style={{ color: "var(--copper)" }}>Путешествий</em>
        </h1>

        <p
          className="font-golos text-base md:text-lg max-w-2xl mb-10 leading-relaxed animate-fade-in"
          style={{ color: "var(--ink-light)", animationDelay: "0.5s", opacity: 0 }}
        >
          Откройте для себя лучшие города, достопримечательности и отели мира.<br />
          Ваш личный картограф в каждом путешествии.
        </p>

        <div className="w-full max-w-xl animate-fade-in" style={{ animationDelay: "0.7s", opacity: 0 }}>
          <div className="paper-card p-2">
            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-2 px-4">
                <Icon name="Search" size={16} style={{ color: "var(--copper)" }} />
                <input
                  type="text"
                  placeholder="Найти город или достопримечательность..."
                  className="flex-1 py-3 px-2 bg-transparent border-none text-sm font-golos"
                  style={{ outline: "none", color: "var(--ink)" }}
                  onKeyDown={(e) => { if (e.key === "Enter") onNav("cities"); }}
                />
              </div>
              <button
                onClick={() => onNav("cities")}
                className="px-6 py-3 font-golos text-sm font-semibold uppercase tracking-wider transition-opacity hover:opacity-90"
                style={{ background: "var(--copper)", color: "var(--parchment)", border: "none", borderRadius: "2px", cursor: "pointer" }}
              >
                Найти
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-12 mt-12 animate-fade-in" style={{ animationDelay: "0.9s", opacity: 0 }}>
          {[
            { num: "120+", label: "Городов" },
            { num: "840+", label: "Достопримечательностей" },
            { num: "2400+", label: "Отелей" },
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
    return (!q || c.name.toLowerCase().includes(q) || c.country.toLowerCase().includes(q))
      && (filter === "Все" || c.category === filter);
  });

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <SectionHeader label="02 · ГОРОДА" title="Города мира" subtitle="Исследуйте лучшие направления для путешествий" />

      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <div className="flex-1 flex items-center gap-2 search-input px-4 py-2.5">
          <Icon name="Search" size={16} style={{ color: "var(--copper)" }} />
          <input
            type="text"
            placeholder="Поиск по городу или стране..."
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
          <div key={city.id} className="paper-card card-hover cursor-pointer overflow-hidden animate-fade-in" style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}>
            <div className="relative h-48 overflow-hidden">
              <img src={city.img} alt={city.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute top-3 right-3">
                <span className="filter-pill active text-xs">{city.category}</span>
              </div>
              <div className="absolute bottom-3 left-3 coord-tag" style={{ color: "rgba(255,255,255,0.85)" }}>{city.coords}</div>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-cormorant text-xl font-bold" style={{ color: "var(--ink)" }}>{city.name}</h3>
                  <p className="font-golos text-xs flex items-center gap-1 mt-0.5" style={{ color: "var(--ink-light)" }}>
                    <MapPin />{city.country}
                  </p>
                </div>
                <StarRating rating={city.rating} />
              </div>
              <p className="font-golos text-sm leading-relaxed mb-3" style={{ color: "var(--ink-light)" }}>{city.desc}</p>
              <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px dashed var(--parchment-dark)" }}>
                <span className="coord-tag">{city.sights} мест</span>
                <button className="font-golos text-xs uppercase tracking-wider" style={{ color: "var(--copper)" }}>Исследовать →</button>
              </div>
            </div>
          </div>
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

function SightsSection() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Все");

  const filtered = SIGHTS.filter((s) => {
    const q = search.toLowerCase();
    return (!q || s.name.toLowerCase().includes(q) || s.city.toLowerCase().includes(q))
      && (filter === "Все" || s.type === filter);
  });

  return (
    <section className="py-20 px-6" style={{ background: "rgba(232,220,200,0.3)" }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader label="03 · ДОСТОПРИМЕЧАТЕЛЬНОСТИ" title="Сокровища мира" subtitle="Самые захватывающие места, которые стоит увидеть" />

        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="flex-1 flex items-center gap-2 search-input px-4 py-2.5">
            <Icon name="Search" size={16} style={{ color: "var(--copper)" }} />
            <input
              type="text"
              placeholder="Поиск по названию или городу..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent flex-1 text-sm font-golos"
              style={{ outline: "none", border: "none", color: "var(--ink)" }}
            />
            {search && <button onClick={() => setSearch("")}><Icon name="X" size={14} style={{ color: "var(--copper)" }} /></button>}
          </div>
          <div className="flex gap-2 flex-wrap">
            {SIGHT_FILTERS.map((f) => (
              <button key={f} className={`filter-pill ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filtered.map((s, i) => (
            <div key={s.id} className="paper-card card-hover cursor-pointer flex overflow-hidden animate-fade-in" style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}>
              <div className="w-40 flex-shrink-0 overflow-hidden">
                <img src={s.img} alt={s.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
              </div>
              <div className="flex-1 p-5">
                <div className="flex items-start justify-between mb-1">
                  <span className="filter-pill active text-xs">{s.type}</span>
                  <StarRating rating={s.rating} />
                </div>
                <h3 className="font-cormorant text-xl font-bold mt-2" style={{ color: "var(--ink)" }}>{s.name}</h3>
                <p className="font-golos text-xs flex items-center gap-1 mb-2" style={{ color: "var(--copper)" }}>
                  <MapPin />{s.city}
                </p>
                <p className="font-golos text-sm leading-relaxed" style={{ color: "var(--ink-light)" }}>{s.desc}</p>
                <div className="mt-3 coord-tag">{s.reviews.toLocaleString("ru")} отзывов</div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="font-cormorant text-4xl mb-2" style={{ color: "var(--copper)" }}>∅</div>
            <p className="font-golos text-sm" style={{ color: "var(--muted-foreground)" }}>По вашему запросу ничего не найдено</p>
          </div>
        )}
      </div>
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
      <SectionHeader label="04 · ОТЕЛИ" title="Лучшие отели" subtitle="Безупречный отдых в самых красивых городах мира" />

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
          <div key={h.id} className="paper-card card-hover cursor-pointer overflow-hidden animate-fade-in" style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}>
            <div className="relative h-48 overflow-hidden">
              <img src={h.img} alt={h.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
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
              <button
                className="w-full py-2.5 font-golos text-sm font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
                style={{ background: "var(--ink)", color: "var(--parchment)", borderRadius: "2px", cursor: "pointer" }}
              >
                Забронировать
              </button>
            </div>
          </div>
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

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <section className="py-20 px-6" style={{ background: "rgba(44,26,14,0.04)" }}>
      <div className="max-w-4xl mx-auto">
        <SectionHeader label="05 · КОНТАКТЫ" title="Свяжитесь с нами" subtitle="Планируете путешествие? Мы поможем составить идеальный маршрут" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="font-cormorant text-2xl font-bold mb-4" style={{ color: "var(--ink)" }}>Ваш личный картограф</h3>
              <p className="font-golos text-sm leading-relaxed" style={{ color: "var(--ink-light)" }}>
                Наша команда экспертов поможет вам открыть новые горизонты. Мы знаем лучшие маршруты,
                скрытые жемчужины и проверенные отели по всему миру.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: "Mail", text: "info@atlas-travel.ru" },
                { icon: "Phone", text: "+7 (800) 123-45-67" },
                { icon: "MapPin", text: "Москва, ул. Тверская, 12" },
                { icon: "Clock", text: "Пн–Пт: 9:00–20:00" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center" style={{ border: "1px solid var(--copper)", borderRadius: "2px", flexShrink: 0 }}>
                    <Icon name={item.icon} size={14} style={{ color: "var(--copper)" }} />
                  </div>
                  <span className="font-golos text-sm" style={{ color: "var(--ink-light)" }}>{item.text}</span>
                </div>
              ))}
            </div>

            <CompassRose />
          </div>

          <div className="paper-card corner-ornament p-8">
            <div className="space-y-4">
              {[
                { key: "name", label: "Ваше имя", type: "text", placeholder: "Иван Путешественников" },
                { key: "email", label: "Email", type: "email", placeholder: "ivan@example.com" },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <label className="font-golos text-xs uppercase tracking-wider mb-1.5 block" style={{ color: "var(--ink-light)" }}>{label}</label>
                  <input
                    type={type}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="search-input w-full px-4 py-3 text-sm"
                  />
                </div>
              ))}
              <div>
                <label className="font-golos text-xs uppercase tracking-wider mb-1.5 block" style={{ color: "var(--ink-light)" }}>Сообщение</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Расскажите о вашем путешествии мечты..."
                  rows={4}
                  className="search-input w-full px-4 py-3 text-sm resize-none"
                />
              </div>
              <button
                className="w-full py-3.5 font-golos text-sm font-semibold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all"
                style={{ background: "var(--copper)", color: "var(--parchment)", borderRadius: "2px", cursor: "pointer" }}
              >
                Отправить сообщение
              </button>
            </div>
          </div>
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
      {/* Header */}
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

          <button
            className="hidden md:block px-4 py-2 font-golos text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
            style={{ background: "var(--copper)", color: "var(--parchment)", borderRadius: "2px", cursor: "pointer" }}
            onClick={() => navigate("contacts")}
          >
            Написать нам
          </button>

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

      {/* Content */}
      <main>
        {active === "home" && <HeroSection onNav={navigate} />}
        {active === "cities" && <div className="pt-20"><CitiesSection /></div>}
        {active === "sights" && <div className="pt-20"><SightsSection /></div>}
        {active === "hotels" && <div className="pt-20"><HotelsSection /></div>}
        {active === "contacts" && <div className="pt-20"><ContactSection /></div>}
      </main>

      {/* Footer */}
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
            <div className="coord-tag">© 2024 · ATLAS TERRARUM</div>
          </div>
        </div>
      </footer>
    </div>
  );
}