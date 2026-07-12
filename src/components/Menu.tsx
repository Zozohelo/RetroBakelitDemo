import { useState, useRef, useEffect } from "react";
import { Reveal } from "./Reveal";

interface MenuItem {
  name: string;
  price: string;
  desc: string;
  allergens: {
    gluten: boolean;
    lactose: boolean;
    shellfish: boolean;
  };
}

interface DrinkItem {
  name: string;
  price: string;
}

const MENU_CATEGORIES = [
  {
    id: "burgerek",
    label: "Burgerek",
    accent: "#f97316",
    glow: "#f9731640",
    items: [
      {
        name: "Bacon Cheese",
        price: "4 200 Ft",
        desc: "Buci, házi szósz, saláta, paradicsom, 15 dkg marha pogácsa, cheddar, bacon, csónak burgonya",
        allergens: { gluten: false, lactose: true, shellfish: false },
      },
      {
        name: "Tanyasi Csirke",
        price: "3 500 Ft",
        desc: "Buci, házi szósz, saláta, paradicsom, 15 dkg pácolt tanyasi csirke, cheddar, bacon, csónak burgonya",
        allergens: { gluten: false, lactose: true, shellfish: false },
      },
      {
        name: "Athen",
        price: "4 900 Ft",
        desc: "Buci, tzatziki, saláta, paradicsom, lilahagyma, uborka, ruccola, olivabogyó, 15 dkg marha pogácsa, 10 dkg grill feta, csónak burgonya",
        allergens: { gluten: false, lactose: true, shellfish: false },
      },
      {
        name: "Dupla Dinamit",
        price: "5 200 Ft",
        desc: "Buci, házi öntet, saláta, dupla marhapogácsa (30 dkg), dupla cheddar, dupla bacon, 4 db rántott hagymakarika, csónak burgonya",
        allergens: { gluten: false, lactose: true, shellfish: false },
      },
      {
        name: "Jalapeno",
        price: "4 500 Ft",
        desc: "Buci, házi öntet, saláta, paradicsom, 15 dkg marhapogácsa, cheddar, bacon, lilahagyma, jalapeno, csónak burgonya",
        allergens: { gluten: false, lactose: true, shellfish: false },
      },
      {
        name: "Pulled Pork",
        price: "5 100 Ft",
        desc: "Buci, coleslaw, paradicsom, 15 dkg tépett BBQ malac, cheddar, 4 db rántott hagymakarika, csónak burgonya",
        allergens: { gluten: false, lactose: true, shellfish: false },
      },
      {
        name: "Mega Vega",
        price: "4 900 Ft",
        desc: "Buci, tzatziki, ruccola, paradicsom, grillezett kecskesajt, gyümölcs chutney, házi szósz, csónak burgonya",
        allergens: { gluten: false, lactose: true, shellfish: false },
      },
    ] as MenuItem[],
  },
  {
    id: "streetfood",
    label: "Streetfood",
    accent: "#eab308",
    glow: "#eab30840",
    items: [
      {
        name: "Bajor Kolbász Tal",
        price: "4 900 Ft",
        desc: "3 db kolbász, fűszeres csónak burgonya, bajor mustár, 15 dkg coleslaw saláta",
        allergens: { gluten: false, lactose: true, shellfish: false },
      },
      {
        name: "Gyros Tal",
        price: "3 990 Ft",
        desc: "18 dkg gyros (csirke), csónak burgonya, saláta, paradicsom, lilahagyma, uborka, tzatziki",
        allergens: { gluten: false, lactose: true, shellfish: false },
      },
      {
        name: "Grillezett Kecskesajt",
        price: "5 100 Ft",
        desc: "15 dkg kecskesajt, saláta, ruccola, paradicsom, lilahagyma, uborka, olívaolaj",
        allergens: { gluten: false, lactose: false, shellfish: false },
      },
      {
        name: "Tanyasi Csirkemell Steak",
        price: "4 600 Ft",
        desc: "2x15 dkg csirkemell filé, görög saláta: saláta, paradicsom, lilahagyma, uborka, feta sajt, olivabogyó, olívaolaj",
        allergens: { gluten: false, lactose: true, shellfish: false },
      },
      {
        name: "Fish & Chips",
        price: "3 900 Ft",
        desc: "Fűszeres csónak burgonya, kevert saláta, házi szósz, tempura harcsafilé (25 dkg)",
        allergens: { gluten: false, lactose: false, shellfish: true },
      },
    ] as MenuItem[],
  },
  {
    id: "desszertek",
    label: "Desszertek",
    accent: "#a78bfa",
    glow: "#a78bfa40",
    items: [
      {
        name: "Churros",
        price: "1 990 Ft",
        desc: "Csoki öntet, porcukor, 18 dkg churros",
        allergens: { gluten: false, lactose: false, shellfish: false },
      },
    ] as MenuItem[],
  },
  {
    id: "koretek",
    label: "Köretek & Saláták",
    accent: "#22c55e",
    glow: "#22c55e40",
    items: [
      {
        name: "Csónak Burgonya",
        price: "1 100 Ft",
        desc: "Fűszeres sült burgonya",
        allergens: { gluten: false, lactose: false, shellfish: false },
      },
      {
        name: "Édesburgonya",
        price: "1 500 Ft",
        desc: "Sült édesburgonya",
        allergens: { gluten: false, lactose: false, shellfish: false },
      },
      {
        name: "Friss Kevert Saláta",
        price: "2 290 Ft",
        desc: "Szezonális friss saláta",
        allergens: { gluten: false, lactose: false, shellfish: false },
      },
      {
        name: "Görög Saláta",
        price: "2 900 Ft",
        desc: "Paradicsom, uborka, lilahagyma, feta, olivabogyó, olívaolaj",
        allergens: { gluten: false, lactose: true, shellfish: false },
      },
      {
        name: "Coleslaw (15 dkg)",
        price: "990 Ft",
        desc: "Házi káposztasaláta",
        allergens: { gluten: false, lactose: true, shellfish: false },
      },
      {
        name: "Tzatziki (15 dkg)",
        price: "1 090 Ft",
        desc: "Görög joghurtos uborka mártás",
        allergens: { gluten: false, lactose: true, shellfish: false },
      },
      {
        name: "Cézár saláta",
        price: "2 990 Ft",
        desc: "",
        allergens: { gluten: false, lactose: true, shellfish: false },
      },
      {
        name: "Caprese saláta",
        price: "2 990 Ft",
        desc: "",
        allergens: { gluten: false, lactose: true, shellfish: false },
      },
    ] as MenuItem[],
  },
  {
    id: "feltetek",
    label: "Plusz Feltétek",
    accent: "#ec4899",
    glow: "#ec489940",
    items: [
      {
        name: "Feta sajt",
        price: "600 Ft",
        desc: "",
        allergens: { gluten: false, lactose: true, shellfish: false },
      },
      {
        name: "Cheddar",
        price: "600 Ft",
        desc: "",
        allergens: { gluten: false, lactose: true, shellfish: false },
      },
      {
        name: "Tonhal",
        price: "990 Ft",
        desc: "",
        allergens: { gluten: false, lactose: false, shellfish: false },
      },
      {
        name: "Zöldség",
        price: "500 Ft",
        desc: "",
        allergens: { gluten: false, lactose: false, shellfish: false },
      },
      {
        name: "Marha hamburger hús",
        price: "1 200 Ft",
        desc: "",
        allergens: { gluten: false, lactose: false, shellfish: false },
      },
      {
        name: "Fűszeres tanyasi csirkemell",
        price: "1 300 Ft",
        desc: "",
        allergens: { gluten: false, lactose: false, shellfish: false },
      },
      {
        name: "Rántott hagymakarika",
        price: "1 300 Ft",
        desc: "",
        allergens: { gluten: true, lactose: false, shellfish: false },
      },
      {
        name: "Grill kecskesajt",
        price: "1 650 Ft",
        desc: "",
        allergens: { gluten: false, lactose: false, shellfish: false },
      },
      {
        name: "Gamberoni (6 db)",
        price: "2 500 Ft",
        desc: "",
        allergens: { gluten: false, lactose: false, shellfish: true },
      },
    ] as MenuItem[],
  },
];

const DRINK_CATEGORIES = [
  {
    id: "koktélok",
    label: "Koktélok",
    accent: "#06b6d4",
    glow: "#06b6d440",
    items: [
      { name: "Aperol Spritz", price: "2 690 Ft" },
      { name: "Limoncello Spritz", price: "2 690 Ft" },
      { name: "Cuba Libre", price: "2 490 Ft" },
      { name: "Gin & Tonic", price: "2 490 Ft" },
      { name: "Epres Daiquiri", price: "2 790 Ft" },
      { name: "Sex on the Beach", price: "2 890 Ft" },
      { name: "Pina Colada", price: "2 790 Ft" },
      { name: "Tequila Sunrise", price: "2 890 Ft" },
      { name: "Mojito", price: "2 390 Ft" },
      { name: "Cosmopolitan", price: "2 390 Ft" },
      { name: "Mimosa", price: "1 190 Ft" },
      { name: "Hugo", price: "2 690 Ft" },
      { name: "Long Island", price: "3 290 Ft" },
      { name: "Espresso Martini", price: "2 790 Ft" },
      { name: "Pornstar Martini", price: "3 290 Ft" },
    ] as DrinkItem[],
  },
  {
    id: "borok",
    label: "Borok",
    accent: "#8b5cf6",
    glow: "#8b5cf640",
    items: [
      { name: "Juhász Rosé", price: "690 Ft/dl" },
      { name: "Juhász Irsai Olivér", price: "690 Ft/dl" },
    ] as DrinkItem[],
  },
  {
    id: "froccsok",
    label: "Fröccsök",
    accent: "#ec4899",
    glow: "#ec489940",
    items: [
      { name: "Kisfröccs", price: "690 Ft" },
      { name: "Nagyfröccs", price: "1 290 Ft" },
      { name: "Hosszúlépés", price: "790 Ft" },
      { name: "Házmester", price: "1 390 Ft" },
      { name: "Sportfröccs", price: "890 Ft" },
    ] as DrinkItem[],
  },
  {
    id: "rovidek",
    label: "Rövidek",
    accent: "#f59e0b",
    glow: "#f59e0b40",
    items: [
      { name: "Zwack Unicum", price: "1 290 Ft" },
      { name: "Unicum Szilva", price: "1 390 Ft" },
      { name: "Jägermeister", price: "1 290 Ft" },
      { name: "Agárdi Birs", price: "1 990 Ft" },
      { name: "Agárdi Cigánymeggy", price: "1 990 Ft" },
      { name: "Agárdi Vilmoskörte", price: "1 990 Ft" },
      { name: "Agárdi Szilva", price: "1 790 Ft" },
      { name: "Sierra Tequila", price: "1 290 Ft" },
      { name: "Kraken", price: "1 590 Ft" },
      { name: "Bacardi", price: "1 190 Ft" },
      { name: "Johnnie Walker", price: "1 290 Ft" },
      { name: "Jameson", price: "1 490 Ft" },
      { name: "Bulldog Gin", price: "1 890 Ft" },
      { name: "Bombay Gin", price: "1 690 Ft" },
      { name: "Absolut Vodka", price: "1 490 Ft" },
      { name: "Ciroc Vodka", price: "1 890 Ft" },
    ] as DrinkItem[],
  },
  {
    id: "sorok",
    label: "Sörök",
    accent: "#ec7a0d",
    glow: "#ec7a0d40",
    items: [
      { name: "Arany ászok", price: "990 Ft" },
      { name: "Pilsner", price: "1190 Ft" },
      { name: "Dreher hidegkomlós", price: "320 Ft" },
      { name: "Peroni", price: "1190 Ft" },
      { name: "Asaki", price: "1190 Ft" },
      { name: "HB", price: "1490 Ft" },
      { name: "Dreher 24", price: "900 Ft" },
      {
        name: "Dreher Gold (csapolt)",
        price: "Pohár: 990 Ft | Korsó: 1190 Ft",
      },
      {
        name: "Dreher meggyves (csapolt)",
        price: "Pohár: 990 Ft | Korsó: 1290 Ft",
      },
      { name: "Peroni (csapolt)", price: "Pohár: 1190 Ft | Korsó: 1390 Ft" },
    ] as DrinkItem[],
  },
  {
    id: "uditok",
    label: "Üdítők",
    accent: "#06d084",
    glow: "#06d08440",
    items: [
      { name: "Ásványvíz", price: "590 Ft" },
      { name: "Szénsavas italok", price: "799 Ft" },
      { name: "Fuze Tea", price: "799 Ft" },
      { name: "Capy gyümölcslevek", price: "799 Ft" },
      { name: "Limonádé", price: "1190 Ft" },
    ] as DrinkItem[],
  },
  {
    id: "pezsgok",
    label: "Pezsgők",
    accent: "#f97316",
    glow: "#f9731640",
    items: [
      { name: "Hungaria Extra Dry Pezsgő", price: "6 990 Ft/üveg" },
    ] as DrinkItem[],
  },
];

type FoodTab =
  | "burgerek"
  | "streetfood"
  | "desszertek"
  | "koretek"
  | "feltetek";
type DrinkTab =
  | "koktélok"
  | "borok"
  | "froccsok"
  | "rovidek"
  | "sorok"
  | "uditok"
  | "pezsgok";

function AnimatedPrice({ price, color }: { price: string; color: string }) {
  return (
    <span
      className="font-mono font-black text-base md:text-lg tabular-nums tracking-tight"
      style={{ color }}
    >
      {price}
    </span>
  );
}

function AllergenTag({
  allergens,
  accent,
}: {
  allergens: { gluten: boolean; lactose: boolean; shellfish: boolean };
  accent: string;
}) {
  const tags: string[] = [];
  if (allergens.gluten) tags.push("glutén");
  if (allergens.lactose) tags.push("laktóz");
  if (allergens.shellfish) tags.push("rákfélék");
  if (!tags.length) return null;
  return (
    <div className="flex gap-1.5 flex-wrap mt-3">
      {tags.map((t) => (
        <span
          key={t}
          className="text-[0.6rem] font-bold uppercase tracking-widest px-2 py-0.5"
          style={{
            color: accent,
            border: `1px solid ${accent}55`,
            background: `${accent}12`,
          }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function FoodCard({
  item,
  accent,
  glow,
  index,
}: {
  item: MenuItem;
  accent: string;
  glow: string;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 60);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden cursor-default"
      style={{
        transform: visible
          ? "translateY(0) rotateX(0deg)"
          : "translateY(40px) rotateX(12deg)",
        opacity: visible ? 1 : 0,
        transition: `transform 0.55s cubic-bezier(.22,1,.36,1) ${index * 0.04}s, opacity 0.45s ease ${index * 0.04}s`,
        perspective: "800px",
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          border: `1px solid ${accent}`,
          opacity: hovered ? 0.7 : 0.18,
          transition: "opacity 0.3s ease",
        }}
      />
      <div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          top: 0,
          opacity: hovered ? 1 : 0,
          animation: hovered ? "scanline 0.6s ease forwards" : "none",
        }}
      />

      <div
        className="relative flex flex-col h-full bg-neutral-950 p-4 md:p-5"
        style={{
          background: hovered
            ? `linear-gradient(135deg, ${glow} 0%, #0a0a0a 60%)`
            : "#0a0a0a",
          transition: "background 0.4s ease",
          boxShadow: hovered
            ? `0 0 40px ${glow}, inset 0 0 20px ${glow}`
            : "none",
        }}
      >
        <div className="flex items-start justify-between gap-3 mb-2">
          <span
            className="text-[0.6rem] font-black font-mono tabular-nums leading-none mt-1 flex-shrink-0"
            style={{ color: `${accent}60` }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex-1 min-w-0">
            <h3
              className="font-black text-sm md:text-base leading-tight text-neutral-50 uppercase tracking-wide"
              style={{
                textShadow: hovered ? `0 0 20px ${accent}80` : "none",
                transition: "text-shadow 0.3s ease",
              }}
            >
              {item.name}
            </h3>
          </div>
          <div className="flex-shrink-0">
            <AnimatedPrice price={item.price} color={accent} />
          </div>
        </div>
        <div
          className="h-px mb-3 w-full"
          style={{
            background: `linear-gradient(90deg, ${accent}80, transparent)`,
            opacity: hovered ? 1 : 0.3,
            transition: "opacity 0.3s",
          }}
        />
        {item.desc && (
          <p
            className="text-[0.7rem] md:text-[0.75rem] leading-relaxed flex-1"
            style={{
              color: hovered ? "#d4d4d4" : "#737373",
              transition: "color 0.3s ease",
            }}
          >
            {item.desc}
          </p>
        )}
        <AllergenTag allergens={item.allergens} accent={accent} />
        <div
          className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none"
          style={{
            borderTop: `1px solid ${accent}`,
            borderLeft: `1px solid ${accent}`,
            transform: "rotate(180deg)",
            opacity: hovered ? 0.8 : 0.2,
            transition: "opacity 0.3s",
          }}
        />
        <div
          className="absolute top-0 left-0 w-8 h-8 pointer-events-none"
          style={{
            borderBottom: `1px solid ${accent}`,
            borderRight: `1px solid ${accent}`,
            transform: "rotate(180deg)",
            opacity: hovered ? 0.8 : 0.2,
            transition: "opacity 0.3s",
          }}
        />
      </div>
    </div>
  );
}

function DrinkRow({
  item,
  accent,
  glow,
  index,
}: {
  item: DrinkItem;
  accent: string;
  glow: string;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 40);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-center gap-3 px-4 py-3 cursor-default overflow-hidden"
      style={{
        transform: visible ? "translateX(0)" : "translateX(-24px)",
        opacity: visible ? 1 : 0,
        transition: `transform 0.45s cubic-bezier(.22,1,.36,1) ${index * 0.03}s, opacity 0.35s ease ${index * 0.03}s, background 0.2s, border-color 0.2s`,
        background: hovered ? `${glow}` : "transparent",
        borderLeft: `2px solid ${hovered ? accent : accent + "30"}`,
      }}
    >
      <div
        className="w-1 h-1 rounded-full flex-shrink-0"
        style={{
          background: accent,
          boxShadow: hovered ? `0 0 8px ${accent}` : "none",
        }}
      />
      <span
        className="flex-1 font-semibold text-sm"
        style={{
          color: hovered ? "#fafafa" : "#a3a3a3",
          transition: "color 0.2s",
        }}
      >
        {item.name}
      </span>
      <AnimatedPrice price={item.price} color={accent} />
    </div>
  );
}

function TabButton({
  label,
  accent,
  active,
  onClick,
}: {
  label: string;
  accent: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="relative px-4 py-2 text-[0.7rem] font-black uppercase tracking-widest transition-all duration-200 overflow-hidden"
      style={{
        color: active ? "#0a0a0a" : "#525252",
        background: active ? accent : "transparent",
        border: `1px solid ${active ? accent : "#404040"}`,
        boxShadow: active ? `0 0 20px ${accent}60` : "none",
      }}
    >
      {label}
    </button>
  );
}

export default function MenuSection() {
  const [foodTab, setFoodTab] = useState<FoodTab>("burgerek");
  const [drinkTab, setDrinkTab] = useState<DrinkTab>("koktélok");
  const [isFood, setIsFood] = useState(true);

  const activeFoodCategory = MENU_CATEGORIES.find((c) => c.id === foodTab)!;
  const activeDrinkCategory = DRINK_CATEGORIES.find((c) => c.id === drinkTab)!;

  return (
    <>
      <style>{`
        @keyframes scanline {
          from { transform: translateY(0); opacity: 1; }
          to { transform: translateY(6000%); opacity: 0.3; }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.85; }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px #fb923c; }
          50% { opacity: 0.5; box-shadow: 0 0 12px #fb923c; }
        }
      `}</style>

      <section id="menu" className="max-w-6xl mx-auto px-6 py-24">
        <Reveal>
          <span className="text-[.62rem] font-bold tracking-[.32em] uppercase text-orange-500 block mb-3">
            Ételek &amp; Italok
          </span>
          <h2
            className="font-display font-bold text-neutral-50 leading-tight mb-10"
            style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)" }}
          >
            Az <em className="not-italic grad-text">teljes kínálatunk</em>
          </h2>

          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setIsFood(true)}
              className="text-[.72rem] font-black tracking-[.14em] uppercase px-7 py-2.5 transition-all duration-200 relative overflow-hidden"
              style={{
                color: isFood ? "#0a0a0a" : "#525252",
                background: isFood ? "#f97316" : "transparent",
                border: `1px solid ${isFood ? "#f97316" : "#404040"}`,
                boxShadow: isFood ? "0 0 28px #f9731660" : "none",
              }}
            >
              Ételek
            </button>
            <button
              onClick={() => setIsFood(false)}
              className="text-[.72rem] font-black tracking-[.14em] uppercase px-7 py-2.5 transition-all duration-200"
              style={{
                color: !isFood ? "#0a0a0a" : "#525252",
                background: !isFood ? "#06b6d4" : "transparent",
                border: `1px solid ${!isFood ? "#06b6d4" : "#404040"}`,
                boxShadow: !isFood ? "0 0 28px #06b6d460" : "none",
              }}
            >
              Italok
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {isFood
              ? MENU_CATEGORIES.map((cat) => (
                  <TabButton
                    key={cat.id}
                    label={cat.label}
                    accent={cat.accent}
                    active={foodTab === cat.id}
                    onClick={() => setFoodTab(cat.id as FoodTab)}
                  />
                ))
              : DRINK_CATEGORIES.map((cat) => (
                  <TabButton
                    key={cat.id}
                    label={cat.label}
                    accent={cat.accent}
                    active={drinkTab === cat.id}
                    onClick={() => setDrinkTab(cat.id as DrinkTab)}
                  />
                ))}
          </div>
        </Reveal>

        {isFood && (
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-px"
            style={{ background: `${activeFoodCategory.accent}18` }}
            key={foodTab}
          >
            {activeFoodCategory.items.map((item, i) => (
              <FoodCard
                key={`${foodTab}-${i}`}
                item={item}
                accent={activeFoodCategory.accent}
                glow={activeFoodCategory.glow}
                index={i}
              />
            ))}
          </div>
        )}

        {!isFood && (
          <div
            className="divide-y"
            style={{ borderColor: `${activeDrinkCategory.accent}20` }}
            key={drinkTab}
          >
            {activeDrinkCategory.items.map((item, i) => (
              <DrinkRow
                key={`${drinkTab}-${i}`}
                item={item}
                accent={activeDrinkCategory.accent}
                glow={activeDrinkCategory.glow}
                index={i}
              />
            ))}
          </div>
        )}

        {isFood && (
          <Reveal delay={100}>
            <div
              className="mt-8 px-4 py-3 flex flex-col sm:flex-row gap-3 sm:items-center justify-between"
              style={{
                border: `1px solid ${activeFoodCategory.accent}25`,
                background: `${activeFoodCategory.glow}`,
              }}
            >
              <p className="text-[0.7rem] text-neutral-500 leading-relaxed">
                <span className="text-neutral-400 font-semibold">
                  Allergének:
                </span>{" "}
                glutén · laktóz · rákfélék
              </p>
            </div>
          </Reveal>
        )}

        {/* Weekly specials promo */}
        <Reveal delay={140}>
          <div
            className="relative mt-10 overflow-hidden"
            style={{
              border: "1px solid rgba(249,115,22,0.35)",
              background:
                "linear-gradient(135deg, rgba(249,115,22,0.07) 0%, #0a0a0a 60%)",
              boxShadow: "0 0 40px rgba(249,115,22,0.07)",
            }}
          >
            {/* Corner TL */}
            <div
              className="absolute top-0 left-0 w-5 h-5 pointer-events-none"
              style={{
                borderBottom: "1px solid rgba(249,115,22,0.6)",
                borderRight: "1px solid rgba(249,115,22,0.6)",
                transform: "rotate(180deg)",
              }}
            />
            {/* Corner BR */}
            <div
              className="absolute bottom-0 right-0 w-5 h-5 pointer-events-none"
              style={{
                borderTop: "1px solid rgba(249,115,22,0.6)",
                borderLeft: "1px solid rgba(249,115,22,0.6)",
                transform: "rotate(180deg)",
              }}
            />

            {/* Pulsing dot + label */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-orange-400"
                style={{ animation: "pulse-dot 2s infinite" }}
              />
              <span className="text-[0.55rem] font-black uppercase tracking-[.22em] text-orange-500/60">
                Heti friss
              </span>
            </div>

            <div className="px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              {/* Icon box */}
              <div
                className="flex-shrink-0 w-12 h-12 flex items-center justify-center"
                style={{
                  background: "rgba(249,115,22,0.12)",
                  border: "1px solid rgba(249,115,22,0.30)",
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
                  <path d="M9 16l2 2 4-4" />
                </svg>
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="font-black text-sm md:text-base uppercase tracking-wide text-neutral-100 mb-1">
                  Heti ajánlataink — mindig valami új vár rád
                </p>
                <p className="text-[0.78rem] text-neutral-400 leading-relaxed max-w-xl">
                  Minden héten friss hétköznapi és hétvégi finomságokkal
                  készülünk. Nézd meg aktuális különleges ajánlatainkat Facebook
                  oldalunkon!
                </p>
              </div>

              {/* CTA button */}
              <a
                href="https://www.facebook.com/profile.php?id=61582215309925"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 text-[0.68rem] font-black uppercase tracking-widest transition-all duration-200"
                style={{
                  color: "#0a0a0a",
                  background: "#f97316",
                  border: "1px solid #f97316",
                  boxShadow: "0 0 20px rgba(249,115,22,0.40)",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "#fb923c";
                  el.style.boxShadow = "0 0 28px rgba(249,115,22,0.65)";
                  el.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "#f97316";
                  el.style.boxShadow = "0 0 20px rgba(249,115,22,0.40)";
                  el.style.transform = "translateY(0)";
                }}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                Facebook oldal
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
