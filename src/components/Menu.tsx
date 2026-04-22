import { useState } from "react";
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
    label: "🍔 Burgerek",
    accent: "#f97316",
    items: [
      {
        name: "Bäcon Cheese",
        price: "4 200 Ft",
        desc: "Buci, házi szósz, saláta, paradicsom, 15 dkg marha pogácsa, cheddar, bäcon, csónak burgonya",
        allergens: { gluten: false, lactose: true, shellfish: false },
      },
      {
        name: "Tanyasi Csirke",
        price: "3 500 Ft",
        desc: "Buci, házi szósz, saláta, paradicsom, 15 dkg pácolt tanyasi csirke, cheddar, bäcon, csónak burgonya",
        allergens: { gluten: false, lactose: true, shellfish: false },
      },
      {
        name: "Athén",
        price: "4 900 Ft",
        desc: "Buci, tzatziki, saláta, paradicsom, lilahagyma, uborka, ruccola, olivabogyó, 15 dkg marha pogácsa, 10 dkg grill feta, csónak burgonya",
        allergens: { gluten: false, lactose: true, shellfish: false },
      },
      {
        name: "Dupla Dinamit",
        price: "5 200 Ft",
        desc: "Buci, házi öntet, saláta, dupla marhapogácsa (30 dkg), dupla cheddar, dupla bäcon, 4 db rántott hagymakarika, csónak burgonya",
        allergens: { gluten: false, lactose: true, shellfish: false },
      },
      {
        name: "Jalapeño",
        price: "4 500 Ft",
        desc: "Buci, házi öntet, saláta, paradicsom, 15 dkg marhapogácsa, cheddar, bäcon, lilahagyma, jalapeño, csónak burgonya",
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
      {
        name: "Surf & Turf Extra",
        price: "5 900 Ft",
        desc: "Buci, rákkrémes szósz, ruccola, paradicsom, 15 dkg marhapogácsa, cheddar, 4 db pikáns gamberoni, 4 db rántott tintahalkarika, édesburgonya",
        allergens: { gluten: false, lactose: true, shellfish: true },
      },
    ] as MenuItem[],
  },
  {
    id: "streetfood",
    label: "🥡 Streetfood",
    accent: "#eab308",
    items: [
      {
        name: "Bajor Kolbász Tál",
        price: "4 900 Ft",
        desc: "3 db kolbász, fűszeres csónak burgonya, bajor mustár, 15 dkg coleslaw saláta",
        allergens: { gluten: false, lactose: true, shellfish: false },
      },
      {
        name: "Gyros Tál",
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
        desc: "2×15 dkg csirkemell filé, görög saláta: saláta, paradicsom, lilahagyma, uborka, feta sajt, olivabogyó, olívaolaj",
        allergens: { gluten: false, lactose: true, shellfish: false },
      },
      {
        name: "Fish & Chips",
        price: "3 900 Ft",
        desc: "Fűszeres csónak burgonya, kevert saláta, házi szósz, tempura harcsafilé (25 dkg)",
        allergens: { gluten: false, lactose: false, shellfish: true },
      },
      {
        name: "Pikáns Gamberoni",
        price: "5 700 Ft",
        desc: "6 db gamberoni pikáns raguban, kevert saláta, paradicsom, uborka, ruccola, olívaolaj",
        allergens: { gluten: false, lactose: false, shellfish: true },
      },
    ] as MenuItem[],
  },
  {
    id: "desszertek",
    label: "🍮 Desszertek",
    accent: "#a78bfa",
    items: [
      {
        name: "Profiterol Bianco",
        price: "1 990 Ft",
        desc: "2 db / adag",
        allergens: { gluten: false, lactose: true, shellfish: false },
      },
      {
        name: "Profiterol Pisztácia",
        price: "1 990 Ft",
        desc: "2 db / adag",
        allergens: { gluten: false, lactose: true, shellfish: false },
      },
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
    label: "🥗 Köretek & Saláták",
    accent: "#22c55e",
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
    ] as MenuItem[],
  },
  {
    id: "feltetek",
    label: "➕ Plusz Feltétek",
    accent: "#ec4899",
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
        name: "Bäcon",
        price: "600 Ft",
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
        name: "Rántott tintahalkarika",
        price: "1 400 Ft",
        desc: "",
        allergens: { gluten: true, lactose: false, shellfish: true },
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
    label: "🍹 Koktélok",
    accent: "#06b6d4",
    items: [
      { name: "Aperol Spritz", price: "2 690 Ft" },
      { name: "Limoncello Spritz", price: "2 690 Ft" },
      { name: "Cuba Libre", price: "2 490 Ft" },
      { name: "Gin & Tonic", price: "2 490 Ft" },
      { name: "Epres Daiquiri", price: "2 790 Ft" },
      { name: "Sex on the Beach", price: "2 890 Ft" },
      { name: "Piña Colada", price: "2 790 Ft" },
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
    label: "🍷 Borok",
    accent: "#8b5cf6",
    items: [
      { name: "Juhász Rosé", price: "690 Ft/dl" },
      { name: "Juhász Irsai Olivér", price: "690 Ft/dl" },
    ] as DrinkItem[],
  },
  {
    id: "froccsok",
    label: "🍹 Fröccsök",
    accent: "#ec4899",
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
    label: "🥃 Rövidek",
    accent: "#f59e0b",
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
    id: "uditok",
    label: "🥤 Üdítők",
    accent: "#10b981",
    items: [
      { name: "Limonádé - Klasszikus", price: "1 190 Ft" },
      { name: "Limonádé - Málnás", price: "1 190 Ft" },
      { name: "Limonádé - Bodzás", price: "1 190 Ft" },
      { name: "Limonádé - Mangós", price: "1 190 Ft" },
    ] as DrinkItem[],
  },
  {
    id: "pezsgok",
    label: "🍾 Pezsgők",
    accent: "#f97316",
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
  | "uditok"
  | "pezsgok";
type Tab = FoodTab | DrinkTab;

function AllergenBadge({
  allergens,
  accent,
}: {
  allergens: { gluten: boolean; lactose: boolean; shellfish: boolean };
  accent: string;
}) {
  if (!allergens.gluten && !allergens.lactose && !allergens.shellfish) {
    return null;
  }

  const items: string[] = [];
  if (allergens.gluten) items.push("glutén");
  if (allergens.lactose) items.push("laktóz");
  if (allergens.shellfish) items.push("rákfélék");

  return (
    <div
      className="text-[0.65rem] font-semibold text-neutral-300 px-2.5 py-1.5 rounded w-fit"
      style={{
        background: `${accent}20`,
        border: `1px solid ${accent}40`,
      }}
    >
      Tartalmaz: <span style={{ color: accent }}>{items.join(", ")}</span>
    </div>
  );
}

export default function MenuSection() {
  const [foodTab, setFoodTab] = useState<FoodTab>("burgerek");
  const [drinkTab, setDrinkTab] = useState<DrinkTab>("koktélok");
  const [isFood, setIsFood] = useState(true);

  const activeFoodCategory = MENU_CATEGORIES.find((c) => c.id === foodTab)!;
  const activeDrinkCategory = DRINK_CATEGORIES.find((c) => c.id === drinkTab)!;

  const getHeightClass = (categoryId: string, isFood: boolean) => {
    if (!isFood) {
      return "h-28";
    }
    switch (categoryId) {
      case "burgerek":
      case "streetfood":
        return "h-44";
      case "desszertek":
      case "koretek":
        return "h-36";
      case "feltetek":
        return "h-28";
      default:
        return "h-36";
    }
  };

  const foodHeightClass = getHeightClass(foodTab, true);
  const drinkHeightClass = getHeightClass(drinkTab, false);

  return (
    <section id="menu" className="max-w-6xl mx-auto px-6 py-24">
      <Reveal>
        <span className="text-[.62rem] font-bold tracking-[.32em] uppercase text-orange-500 block mb-3">
          Konyha &amp; Itallap
        </span>
        <h2
          className="font-display font-bold text-neutral-50 leading-tight mb-8"
          style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)" }}
        >
          Az <em className="not-italic grad-text">teljes kínálatunk</em>
        </h2>

        {/* Food / Drink Toggle */}
        <div className="flex gap-2 mb-10">
          <button
            onClick={() => setIsFood(true)}
            className={`text-[.72rem] font-bold tracking-[.12em] uppercase px-6 py-2 border transition-all duration-200 ${
              isFood
                ? "text-neutral-950 border-transparent bg-orange-500"
                : "bg-transparent text-neutral-500 border-neutral-700 hover:text-neutral-200 hover:border-neutral-500"
            }`}
          >
            🍽️ Ételek
          </button>
          <button
            onClick={() => setIsFood(false)}
            className={`text-[.72rem] font-bold tracking-[.12em] uppercase px-6 py-2 border transition-all duration-200 ${
              !isFood
                ? "text-neutral-950 border-transparent bg-blue-500"
                : "bg-transparent text-neutral-500 border-neutral-700 hover:text-neutral-200 hover:border-neutral-500"
            }`}
          >
            🍹 Italok
          </button>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {isFood
            ? MENU_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFoodTab(cat.id as FoodTab)}
                  className={`text-[.72rem] font-bold tracking-[.12em] uppercase px-4 py-2 border transition-all duration-200 ${
                    foodTab === cat.id
                      ? "text-neutral-950 border-transparent"
                      : "bg-transparent text-neutral-500 border-neutral-700 hover:text-neutral-200 hover:border-neutral-500"
                  }`}
                  style={
                    foodTab === cat.id
                      ? { background: cat.accent, borderColor: cat.accent }
                      : {}
                  }
                >
                  {cat.label}
                </button>
              ))
            : DRINK_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setDrinkTab(cat.id as DrinkTab)}
                  className={`text-[.72rem] font-bold tracking-[.12em] uppercase px-4 py-2 border transition-all duration-200 ${
                    drinkTab === cat.id
                      ? "text-neutral-950 border-transparent"
                      : "bg-transparent text-neutral-500 border-neutral-700 hover:text-neutral-200 hover:border-neutral-500"
                  }`}
                  style={
                    drinkTab === cat.id
                      ? { background: cat.accent, borderColor: cat.accent }
                      : {}
                  }
                >
                  {cat.label}
                </button>
              ))}
        </div>
      </Reveal>

      {/* Food Items */}
      {isFood && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {activeFoodCategory.items.map((item, i) => (
            <Reveal key={`${foodTab}-${i}`} delay={i * 40}>
              <div
                className={`group flex flex-col bg-neutral-900/60 border border-neutral-800 px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 ${foodHeightClass}`}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    activeFoodCategory.accent + "44";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    `0 6px 24px ${activeFoodCategory.accent}12`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "";
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                }}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-0.5"
                        style={{ background: activeFoodCategory.accent }}
                      />
                      <p className="font-display font-bold text-neutral-50 text-[0.95rem] leading-tight">
                        {item.name}
                      </p>
                    </div>
                  </div>
                  <span
                    className="font-bold text-[0.85rem] whitespace-nowrap flex-shrink-0"
                    style={{ color: activeFoodCategory.accent }}
                  >
                    {item.price}
                  </span>
                </div>

                {item.desc && (
                  <p className="text-[0.78rem] leading-relaxed text-neutral-500 pl-3.5 mb-2 flex-1 overflow-hidden line-clamp-3">
                    {item.desc}
                  </p>
                )}

                <div className="flex-1" />

                <div className="mt-auto pt-1">
                  <AllergenBadge
                    allergens={item.allergens}
                    accent={activeFoodCategory.accent}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}

      {/* Drink Items */}
      {!isFood && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {activeDrinkCategory.items.map((item, i) => (
            <Reveal key={`${drinkTab}-${i}`} delay={i * 40}>
              <div
                className={`group flex items-center justify-between bg-neutral-900/60 border border-neutral-800 px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 ${drinkHeightClass}`}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    activeDrinkCategory.accent + "44";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    `0 6px 24px ${activeDrinkCategory.accent}12`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "";
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                }}
              >
                <div className="flex items-center gap-2 flex-1">
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: activeDrinkCategory.accent }}
                  />
                  <p className="font-display font-bold text-neutral-50 text-[0.95rem]">
                    {item.name}
                  </p>
                </div>
                <span
                  className="font-bold text-[0.85rem] whitespace-nowrap flex-shrink-0 ml-4"
                  style={{ color: activeDrinkCategory.accent }}
                >
                  {item.price}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      )}

      {/* Allergen box - only show when food is selected */}
      {isFood && (
        <Reveal delay={100}>
          <div className="mt-10 border border-neutral-800 bg-neutral-900/40 px-5 py-4 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
            <p className="text-[.75rem] text-neutral-500 leading-relaxed">
              <span className="text-neutral-400 font-semibold">
                Allergének:
              </span>{" "}
              glutén · laktóz · rákfélék
            </p>
            <p className="text-[.75rem] text-neutral-500 whitespace-nowrap">
              A számla végösszege{" "}
              <span className="text-orange-400 font-semibold">
                10% szervízdíjat
              </span>{" "}
              tartalmaz.
            </p>
          </div>
        </Reveal>
      )}
    </section>
  );
}
