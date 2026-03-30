import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/images/retrologo.png";

const HERO_BG =
  "https://images.unsplash.com/photo-1543007631-283050bb3e8c?w=1800&q=80";

const GALLERY = [
  "https://images.unsplash.com/photo-1574096079513-d8259312b785?w=800&q=80",
  "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80",
  "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800&q=80",
  "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80",
  "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&q=80",
  "https://images.unsplash.com/photo-1543007631-283050bb3e8c?w=800&q=80",
];

const FOOD_ITEMS = [
  {
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
    tag: "Kitchen Favourite",
    name: "Smash Burger",
    desc: "Double smashed beef patties, American cheese, pickles, comeback sauce, brioche bun.",
    price: "2 890 Ft",
    accent: "#f97316",
  },
  {
    img: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=600&q=80",
    tag: "Share & Devour",
    name: "Loaded Nachos",
    desc: "Crispy tortilla chips, jalapeño cheese sauce, pulled pork, sour cream, guacamole.",
    price: "2 490 Ft",
    accent: "#eab308",
  },
  {
    img: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=600&q=80",
    tag: "Late Night Pick",
    name: "Crispy Wings",
    desc: "12 pcs double-fried wings. Buffalo, honey-garlic or dry rub. Blue cheese dip.",
    price: "3 190 Ft",
    accent: "#ef4444",
  },
  {
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    tag: "Veggie Vibes",
    name: "Halloumi Fries",
    desc: "Golden halloumi strips, roasted red pepper dip, fresh herbs, chilli flakes.",
    price: "1 990 Ft",
    accent: "#22c55e",
  },
];

const DRINK_ITEMS = [
  {
    img: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=600&q=80",
    tag: "On Tap",
    name: "Craft Lager",
    desc: "Rotating selection of Hungarian microbrewery lagers. Always fresh, always cold.",
    price: "890 Ft / 0.5L",
    accent: "#eab308",
  },
  {
    img: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&q=80",
    tag: "Signature",
    name: "Neon Sunset",
    desc: "Aperol, passion fruit, lemon juice, ginger beer, pink salt rim. Electric.",
    price: "2 290 Ft",
    accent: "#ec4899",
  },
  {
    img: "https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=600&q=80",
    tag: "Classic",
    name: "Old Fashioned",
    desc: "Buffalo Trace bourbon, Angostura bitters, demerara, orange peel. No shortcuts.",
    price: "2 490 Ft",
    accent: "#a78bfa",
  },
  {
    img: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=600&q=80",
    tag: "Non-Alcoholic",
    name: "Bakelit Lemonade",
    desc: "Housemade lemonade, fresh mint, cucumber, elderflower syrup, soda.",
    price: "990 Ft",
    accent: "#38bdf8",
  },
];

const VIBES = [
  {
    n: "01",
    title: "DJ & Live Music",
    desc: "Fri & Sat nights — local DJs spinning everything from funk to house. Nobody sits.",
  },
  {
    n: "02",
    title: "16 Craft Taps",
    desc: "Rotating Hungarian micro-brewery selection. Always fresh, always cold, always good.",
  },
  {
    n: "03",
    title: "Retro Game Corner",
    desc: "Original arcades, pinball & a record player loaded with vinyl. Drinking done right.",
  },
  {
    n: "04",
    title: "Kitchen 'til Late",
    desc: "Smash burgers, crispy wings, loaded nachos and other sins — served until midnight.",
  },
];

const HOURS = [
  { day: "Monday – Tuesday", time: "Closed" },
  { day: "Wednesday – Thursday", time: "17:00 – 24:00" },
  { day: "Friday", time: "16:00 – 02:00" },
  { day: "Saturday", time: "14:00 – 02:00" },
  { day: "Sunday", time: "14:00 – 22:00" },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(28px)",
        transition: `opacity .65s ease ${delay}ms, transform .65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Vinyl record SVG component — reusable at any size ── */
function VinylRecord({ size }: { size: number }) {
  const cx = size / 2;
  const r = size / 2 - 2;
  const labelR = r * 0.39;
  const grooveRadii = [
    0.94, 0.88, 0.83, 0.77, 0.72, 0.68, 0.63, 0.59, 0.55, 0.52, 0.48, 0.46,
    0.43,
  ].map((f) => r * f);

  return (
    <svg
      className="vinyl-disc absolute inset-0"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
    >
      <defs>
        <radialGradient id={`vs-${size}`} cx="38%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#3a3a3a" />
          <stop offset="40%" stopColor="#111111" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </radialGradient>
        <radialGradient id={`lg-${size}`} cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="50%" stopColor="#c2410c" />
          <stop offset="100%" stopColor="#7c2d12" />
        </radialGradient>
        <radialGradient id={`gs-${size}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="60%" stopColor="white" stopOpacity="0" />
          <stop offset="80%" stopColor="white" stopOpacity=".04" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Main disc */}
      <circle cx={cx} cy={cx} r={r} fill={`url(#vs-${size})`} />

      {/* Grooves */}
      {grooveRadii.map((gr, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cx}
          r={gr}
          fill="none"
          stroke={
            i % 2 === 0 ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)"
          }
          strokeWidth={i % 3 === 0 ? "0.8" : "0.5"}
        />
      ))}

      {/* Groove shine */}
      <circle cx={cx} cy={cx} r={r} fill={`url(#gs-${size})`} />

      {/* Rim */}
      <circle
        cx={cx}
        cy={cx}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
      />
      <circle
        cx={cx}
        cy={cx}
        r={r * 0.96}
        fill="none"
        stroke="rgba(0,0,0,0.4)"
        strokeWidth="2"
      />

      {/* Label */}
      <circle cx={cx} cy={cx} r={labelR} fill={`url(#lg-${size})`} />
      <circle
        cx={cx}
        cy={cx}
        r={labelR}
        fill="none"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1"
      />
      <circle
        cx={cx}
        cy={cx}
        r={labelR * 0.9}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="0.5"
      />

      {/* Label text — curved */}
      <path
        id={`ta-${size}`}
        d={`M ${cx - labelR * 0.88},${cx - labelR * 0.15} A ${labelR * 0.88},${labelR * 0.88} 0 0,1 ${cx + labelR * 0.88},${cx - labelR * 0.15}`}
        fill="none"
      />
      <text
        fontSize={size * 0.022}
        fontFamily="'DM Sans',sans-serif"
        fontWeight="700"
        letterSpacing={size * 0.008}
        fill="rgba(255,255,255,0.9)"
        textAnchor="middle"
      >
        <textPath href={`#ta-${size}`} startOffset="50%">
          RETRO &amp; BAKELIT
        </textPath>
      </text>

      <path
        id={`ba-${size}`}
        d={`M ${cx - labelR * 0.78},${cx + labelR * 0.18} A ${labelR * 0.88},${labelR * 0.88} 0 0,0 ${cx + labelR * 0.78},${cx + labelR * 0.18}`}
        fill="none"
      />
      <text
        fontSize={size * 0.019}
        fontFamily="'DM Sans',sans-serif"
        fontWeight="600"
        letterSpacing={size * 0.007}
        fill="rgba(255,255,255,0.55)"
        textAnchor="middle"
      >
        <textPath href={`#ba-${size}`} startOffset="50%">
          NAGYKOVÁCSI
        </textPath>
      </text>

      {/* Spindle */}
      <circle cx={cx} cy={cx} r={size * 0.019} fill="#080808" />
      <circle
        cx={cx}
        cy={cx}
        r={size * 0.019}
        fill="none"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="0.5"
      />
      <circle cx={cx} cy={cx} r={size * 0.008} fill="#141414" />
    </svg>
  );
}

type Tab = "food" | "drinks";

export default function Home() {
  const [tab, setTab] = useState<Tab>("food");
  const items = tab === "food" ? FOOD_ITEMS : DRINK_ITEMS;

  const today = new Date().getDay();
  const isToday = (day: string) =>
    (today === 5 && day.includes("Friday")) ||
    (today === 6 && day.includes("Saturday")) ||
    (today === 0 && day.includes("Sunday")) ||
    ((today === 3 || today === 4) && day.includes("Wednesday"));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Playfair Display', Georgia, serif; }
        .font-body    { font-family: 'DM Sans', sans-serif; }

        @keyframes slowZoom { from{transform:scale(1.02)} to{transform:scale(1.1)} }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:none} }
        @keyframes gshift   { 0%{background-position:0%} 100%{background-position:200%} }
        @keyframes sPulse   { 0%,100%{opacity:.3} 50%{opacity:.9} }
        @keyframes vinylSpin  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes vinylFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes vinylGlow  { 0%,100%{opacity:.3} 50%{opacity:.6} }

        .anim-zoom    { animation: slowZoom 22s ease-in-out infinite alternate; }
        .anim-fade0   { animation: fadeUp .85s ease both; }
        .anim-fade1   { animation: fadeUp .85s .14s ease both; }
        .anim-fade2   { animation: fadeUp .85s .28s ease both; }
        .anim-fade3   { animation: fadeUp .85s .42s ease both; }
        .anim-fade4   { animation: fadeUp .85s .62s ease both; }
        .anim-fade5   { animation: fadeUp .85s .72s ease both; }

        .grad-text {
          background: linear-gradient(135deg,#f97316,#ec4899,#a78bfa);
          background-size: 200%;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: gshift 6s linear infinite;
        }
        .scroll-pulse { animation: sPulse 2.4s ease-in-out infinite; }
        .vinyl-disc   { animation: vinylSpin 5s linear infinite; transform-origin: 50% 50%; }
        .vinyl-float  { animation: vinylFloat 7s ease-in-out infinite; }
        .vinyl-glow   { animation: vinylGlow 5s ease-in-out infinite; }

        .img-retro { filter: sepia(.15) saturate(1.1) brightness(.88); transition: filter .4s; }
        .img-retro:hover { filter: sepia(.04) saturate(1.25) brightness(.96); }
        .map-tint  { filter: sepia(.3) saturate(.85) brightness(.8) contrast(1.05); }
      `}</style>

      <div className="font-body bg-neutral-950 text-neutral-200 overflow-x-hidden">
        {/* ══ HERO ══ */}
        <section
          id="hero"
          className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        >
          {/* BG */}
          <div
            className="absolute inset-0 bg-cover bg-center anim-zoom"
            style={{
              backgroundImage: `url(${HERO_BG})`,
              filter: "brightness(.22) saturate(1.1) sepia(.2)",
            }}
          />
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, transparent 25%, rgba(10,10,10,.78) 100%), linear-gradient(to bottom, transparent 40%, rgba(10,10,10,.85) 100%)",
            }}
          />

          {/* Corner ornaments — desktop only */}
          {[
            "top-20 left-6 border-t border-l",
            "top-20 right-6 border-t border-r",
            "bottom-20 left-6 border-b border-l",
            "bottom-20 right-6 border-b border-r",
          ].map((cls, i) => (
            <div
              key={i}
              className={`absolute z-20 w-16 h-16 border-orange-500/20 hidden lg:block ${cls}`}
            />
          ))}

          {/* ── CONTENT WRAPPER ── */}
          <div className="relative z-20 w-full max-w-6xl mx-auto px-6 py-28 md:py-32 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">
            {/* ── VINYL — top on mobile, right on desktop ── */}
            {/* Mobile: centered above text, smaller */}

            {/* ── TEXT — center on mobile, left on desktop ── */}
            <div className="flex-1 text-center md:text-left max-w-xl order-2 md:order-1">
              <div className="anim-fade1 inline-flex items-center gap-2 border border-orange-500/25 px-4 py-1.5 mb-6 text-[0.62rem] font-bold tracking-[.32em] uppercase text-orange-400/60">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shadow-[0_0_6px_#fb923c]" />
                Nagykovácsi · Újonnan nyitott
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shadow-[0_0_6px_#fb923c]" />
              </div>

              <h1
                className="font-display font-black leading-[.9] tracking-tight anim-fade2"
                style={{ fontSize: "clamp(2.4rem,5.5vw,5.5rem)" }}
              >
                <span className="block text-neutral-50">Ahol az éjszaka</span>
                <span className="block grad-text">soha nem öregszik</span>
              </h1>

              <div className="anim-fade3 w-14 h-px md:mx-0 mx-auto my-5 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

              <p className="anim-fade3 text-neutral-400 max-w-sm md:mx-0 mx-auto leading-relaxed text-[0.95rem]">
                Modern retró kocsma — bakelitlemezek, hideg csapolt, házi ételek
                és zene, ami mindent elmond.
              </p>

              <div className="anim-fade4 flex gap-3 justify-center md:justify-start flex-wrap mt-7">
                <button
                  onClick={() =>
                    document
                      .getElementById("menu")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="font-body text-[.72rem] font-bold tracking-[.18em] uppercase bg-orange-500 hover:bg-orange-400 text-neutral-950 px-7 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(249,115,22,.45)]"
                >
                  Megnézem a menüt
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="font-body text-[.72rem] font-bold tracking-[.18em] uppercase text-neutral-300 border border-neutral-600 hover:border-orange-500 hover:text-orange-400 px-7 py-3 transition-all duration-200"
                >
                  Hogyan találsz meg?
                </button>
                <div className="flex md:hidden justify-center w-full anim-fade0 p-5">
                  <div
                    className="vinyl-float relative"
                    style={{ width: 200, height: 200 }}
                  >
                    <div
                      className="vinyl-glow absolute inset-0 rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(249,115,22,.2) 0%, transparent 70%)",
                        transform: "scale(1.2)",
                      }}
                    />
                    <VinylRecord size={200} />
                  </div>
                </div>
              </div>
            </div>

            {/* ── VINYL desktop — right side, large ── */}
            <div
              className="hidden md:flex flex-shrink-0 items-center justify-center order-2 anim-fade1"
              style={{ width: 360, height: 360 }}
            >
              <div
                className="vinyl-float relative"
                style={{ width: 360, height: 360 }}
              >
                <div
                  className="vinyl-glow absolute inset-0 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(249,115,22,.18) 0%, transparent 70%)",
                    transform: "scale(1.15)",
                  }}
                />
                <VinylRecord size={360} />
              </div>
            </div>
          </div>

          {/* Scroll cue */}
          <div className="anim-fade5 absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5">
            <div className="w-px h-10 bg-gradient-to-b from-orange-500/40 to-transparent scroll-pulse" />
            <span className="text-[.55rem] tracking-[.26em] uppercase text-orange-500/35">
              Scroll
            </span>
          </div>
        </section>

        {/* ══ ABOUT ══ */}
        <section id="about" className="max-w-6xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <Reveal>
              <span className="text-[.62rem] font-bold tracking-[.32em] uppercase text-orange-500 block mb-3">
                A mi történetünk
              </span>
              <h2
                className="font-display font-bold text-neutral-50 mb-5 leading-tight"
                style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)" }}
              >
                Retró lélek,{" "}
                <em className="not-italic grad-text">modern kocsma.</em>
              </h2>
              <div className="space-y-4 text-[.97rem] leading-relaxed text-neutral-500">
                <p>
                  A{" "}
                  <span className="text-neutral-300 font-semibold">
                    Retro&amp;Bakelit
                  </span>{" "}
                  Nagykovácsi szívében nyílt meg — egy hely ahol igazán el lehet
                  lazulni. Bakelitlemezek forognak, a falakat régi plakátok
                  díszítik, és a csapolt mindig hideg.
                </p>
                <p>
                  Nem csak kocsma. Jöjj egyedül, barátokkal, vagy csak azért,
                  mert{" "}
                  <span className="text-neutral-300 font-semibold">
                    valahol végre jó a zene
                  </span>
                  . Táncelhetsz, beszélgethetsz, vagy csak csendben megihatsz
                  egy jót.
                </p>
                <p>
                  Házi ételek, kézműves italok, és egy közösség ami lassan a
                  sajátod lesz.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                {[
                  "Élőzene",
                  "DJ Estek",
                  "Kézműves sör",
                  "Retró játékok",
                  "Házi konyha",
                  "Tánctér",
                ].map((t) => (
                  <span
                    key={t}
                    className="text-[.6rem] font-bold tracking-[.18em] uppercase border border-orange-500/25 text-orange-400/70 px-3 py-1.5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={140}>
              <div className="relative hidden md:block">
                <img
                  src={logo}
                  alt="Inside Retro & Bakelit"
                  className="w-full object-cover img-retro"
                  style={{
                    aspectRatio: "5/4",
                    outline: "1px solid rgba(249,115,22,.12)",
                    outlineOffset: "10px",
                  }}
                />
                <div className="absolute -bottom-4 -left-4 bg-orange-500 px-5 py-4">
                  <p className="font-display font-black text-3xl text-neutral-950 leading-none">
                    2026
                  </p>
                  <p className="text-[.58rem] font-bold tracking-[.2em] uppercase text-neutral-950/60 mt-0.5">
                    Nagykovácsi
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="max-w-6xl mx-auto px-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-neutral-800" />
          <span className="text-neutral-700 text-xs tracking-widest select-none">
            ✦ ✦ ✦
          </span>
          <div className="flex-1 h-px bg-neutral-800" />
        </div>

        {/* ══ VIBES STRIP ══ */}
        <div className="bg-neutral-900/50 border-y border-neutral-800">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 divide-x-0 sm:divide-x divide-neutral-800">
            {VIBES.map((v, i) => (
              <Reveal key={i} delay={i * 65}>
                <div className="p-8 hover:bg-orange-500/5 transition-colors duration-200">
                  <p className="font-display italic text-4xl text-orange-500/20 leading-none mb-3">
                    {v.n}
                  </p>
                  <p className="text-[.8rem] font-bold tracking-[.1em] uppercase text-neutral-100 mb-2">
                    {v.title}
                  </p>
                  <p className="text-[.84rem] leading-relaxed text-neutral-500">
                    {v.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="max-w-6xl mx-auto px-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-neutral-800" />
          <span className="text-neutral-700 text-xs tracking-widest select-none">
            ✦ ✦ ✦
          </span>
          <div className="flex-1 h-px bg-neutral-800" />
        </div>

        {/* ══ FOOD & DRINKS ══ */}
        <section id="menu" className="max-w-6xl mx-auto px-6 py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
              <div>
                <span className="text-[.62rem] font-bold tracking-[.32em] uppercase text-orange-500 block mb-3">
                  Konyha &amp; Bár
                </span>
                <h2
                  className="font-display font-bold text-neutral-50 leading-tight"
                  style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)" }}
                >
                  Ételek &amp; <em className="not-italic grad-text">Italok</em>
                </h2>
              </div>
              <div className="flex border border-neutral-700 overflow-hidden">
                <button
                  onClick={() => setTab("food")}
                  className={`text-[.72rem] font-bold tracking-[.16em] uppercase px-5 py-2.5 transition-all duration-200 ${tab === "food" ? "bg-orange-500 text-neutral-950" : "bg-transparent text-neutral-500 hover:text-neutral-300"}`}
                >
                  🍔 Ételek
                </button>
                <button
                  onClick={() => setTab("drinks")}
                  className={`text-[.72rem] font-bold tracking-[.16em] uppercase px-5 py-2.5 border-l border-neutral-700 transition-all duration-200 ${tab === "drinks" ? "bg-orange-500 text-neutral-950" : "bg-transparent text-neutral-500 hover:text-neutral-300"}`}
                >
                  🍺 Italok
                </button>
              </div>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {items.map((item, i) => (
              <Reveal key={`${tab}-${i}`} delay={i * 60}>
                <div
                  className="bg-neutral-900 border border-neutral-800 overflow-hidden cursor-default transition-all duration-300 hover:-translate-y-1"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      item.accent + "55";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      `0 10px 30px ${item.accent}18`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "";
                    (e.currentTarget as HTMLElement).style.boxShadow = "";
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full object-cover img-retro"
                    style={{ aspectRatio: "4/3" }}
                  />
                  <div className="p-4">
                    <span
                      className="text-[.58rem] font-bold tracking-[.22em] uppercase block mb-1.5"
                      style={{ color: item.accent }}
                    >
                      {item.tag}
                    </span>
                    <p className="font-display font-bold text-neutral-50 text-lg leading-tight mb-2">
                      {item.name}
                    </p>
                    <p className="text-[.8rem] leading-relaxed text-neutral-500 mb-3">
                      {item.desc}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[.88rem] font-bold text-orange-400">
                        {item.price}
                      </span>
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{
                          background: item.accent,
                          boxShadow: `0 0 6px ${item.accent}`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="max-w-6xl mx-auto px-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-neutral-800" />
          <span className="text-neutral-700 text-xs tracking-widest select-none">
            ✦ ✦ ✦
          </span>
          <div className="flex-1 h-px bg-neutral-800" />
        </div>

        {/* ══ GALLERY ══ */}
        <section id="gallery" className="max-w-6xl mx-auto px-6 py-24">
          <Reveal>
            <span className="text-[.62rem] font-bold tracking-[.32em] uppercase text-orange-500 block mb-3">
              A hangulat
            </span>
            <h2
              className="font-display font-bold text-neutral-50 leading-tight mb-8"
              style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)" }}
            >
              Látni kell, hogy{" "}
              <em className="not-italic grad-text">hidd el.</em>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5">
              {GALLERY.map((src, i) => (
                <div
                  key={i}
                  className={`overflow-hidden relative group ${i === 0 ? "lg:col-span-2" : ""}`}
                >
                  <img
                    src={src}
                    alt={`Gallery ${i + 1}`}
                    className="w-full object-cover img-retro block"
                    style={{ aspectRatio: i === 0 ? "16/7" : "4/3" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-[.6rem] font-bold tracking-[.22em] uppercase text-orange-400/80">
                      Retro &amp; Bakelit
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ── Divider ── */}
        <div className="max-w-6xl mx-auto px-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-neutral-800" />
          <span className="text-neutral-700 text-xs tracking-widest select-none">
            ✦ ✦ ✦
          </span>
          <div className="flex-1 h-px bg-neutral-800" />
        </div>

        {/* ══ HOURS + MAP ══ */}
        <section id="contact" className="max-w-6xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <Reveal>
              <span className="text-[.62rem] font-bold tracking-[.32em] uppercase text-orange-500 block mb-3">
                Nyitvatartás
              </span>
              <h2
                className="font-display font-bold text-neutral-50 leading-tight mb-8"
                style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)" }}
              >
                Mikor <em className="not-italic grad-text">vagyunk itt?</em>
              </h2>
              <div className="divide-y divide-neutral-800/70">
                {HOURS.map((h, i) => {
                  const active = isToday(h.day);
                  return (
                    <div
                      key={i}
                      className="flex justify-between items-center py-3.5 text-[.9rem]"
                    >
                      <span
                        className={
                          active
                            ? "text-orange-400 font-semibold"
                            : "text-neutral-500 font-medium"
                        }
                      >
                        {h.day}
                        {active ? " · Ma" : ""}
                      </span>
                      <span
                        className={
                          h.time === "Closed"
                            ? "text-neutral-700 italic font-normal"
                            : active
                              ? "text-orange-400 font-bold"
                              : "text-neutral-200 font-semibold"
                        }
                      >
                        {h.time}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <span className="text-[.62rem] font-bold tracking-[.32em] uppercase text-orange-500 block mb-3">
                Megközelítés
              </span>
              <h2
                className="font-display font-bold text-neutral-50 leading-tight mb-6"
                style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)" }}
              >
                Így <em className="not-italic grad-text">találsz meg.</em>
              </h2>
              <div className="border border-neutral-800 overflow-hidden">
                <iframe
                  className="map-tint block w-full"
                  style={{ height: 300 }}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2691.5530192328224!2d18.889314611971034!3d47.576484571066935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476a76f7684a292d%3A0xda27567c63506af!2sNagykov%C3%A1csi%2C%20Ady%20Endre%20u.%205%2C%202094!5e0!3m2!1shu!2shu!4v1773852309020!5m2!1shu!2shu"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Retro & Bakelit helyszín"
                />
                <div className="bg-neutral-900 border-t border-neutral-800 px-4 py-3 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_7px_#f97316] flex-shrink-0" />
                  <span className="text-[.82rem] text-neutral-400">
                    <span className="text-neutral-200 font-semibold">
                      Retro &amp; Bakelit
                    </span>{" "}
                    — Ady Endre u. 5, Nagykovácsi, 2094
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ FOOTER ══ */}
        <footer className="bg-neutral-950 border-t border-neutral-800 py-8 px-6">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <p className="font-display font-bold text-orange-500 text-lg tracking-wide">
              Retro &amp; Bakelit
            </p>
            <p className="text-[.72rem] text-neutral-600 tracking-wide">
              © 2026 · Nagykovácsi · Minden jog fenntartva
            </p>
            <p className="text-[.72rem] text-neutral-600 italic">
              Szeretettel &amp; hideg sörrel készítve 🍺
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
