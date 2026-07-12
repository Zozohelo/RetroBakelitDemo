import { useState } from "react";
import { Reveal } from "./Reveal";

interface Review {
  initials: string;
  name: string;
  text: string;
}

const REVIEWS: Review[] = [
  {
    initials: "S.E.",
    name: "S. Erika",
    text: "Sok helyről rendeltünk már a közelben, de ma innen rendeltünk először. Sült pisztráng salátával, Csibe burger csónak burgonyával, Steak-et chips burgonyával. Mind három nagyon finom volt, és bőséges! Én még soha nem ettem meg a rendelt adagmennyiséget, bárhol máshol. De ez! Valami fantasztikus volt! Az, hogy a salátába belecsempelészett tökmag mennyire feldobja, hát valami Isteni! Szóval én csak ajánlani tudom!",
  },
  {
    initials: "B.K.",
    name: "B. Krisztián",
    text: "Finom ételek, kiváló ár-érték arány és kedves kiszolgálás jellemzi. Egy igazi oázis.",
  },
  {
    initials: "Ö.N.Zs.",
    name: "Ö.N. Zsuzsanna",
    text: "Nagyon kedves a személyzet, a hely nagyon barátságos, a szakács nagyon ügyes! Az ételek és italok bőségesek és nagyon finomak! Mindenkinek csak ajánlani tudom!!",
  },
  {
    initials: "G.K.Sz.",
    name: "G.K. Szidónia",
    text: "Kiemelkedő ízek, frissesség, tálalás. Tiszta, kényelmes, megfelelő asztaltávolságok, kellemes légkör. Minden nagyon finom volt.",
  },
  {
    initials: "T.A.",
    name: "T. Anita",
    text: "Nagyon finom volt minden és bőséges adag. Hangulatos kis hely kedves kiszolgálással.",
  },
];

const ACCENT = "#f97316";
const GLOW = "#f9731640";

function StarRow() {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={ACCENT}
          style={{ filter: `drop-shadow(0 0 4px ${ACCENT}90)` }}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review, active }: { review: Review; active: boolean }) {
  const [hovered, setHovered] = useState(false);
  const on = active || hovered;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden select-none h-full"
      style={{
        background: on
          ? `linear-gradient(135deg, ${GLOW} 0%, #0a0a0a 60%)`
          : "#0a0a0a",
        border: `1px solid ${on ? ACCENT : ACCENT + "25"}`,
        boxShadow: on ? `0 0 40px ${GLOW}, inset 0 0 20px ${GLOW}` : "none",
        transition: "background 0.4s ease, border-color 0.3s, box-shadow 0.4s",
      }}
    >
      {/* Scan-line on hover */}
      {on && (
        <div
          className="absolute left-0 right-0 h-px pointer-events-none z-10"
          style={{
            background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`,
            top: 0,
            animation: "scanline 0.8s ease forwards",
          }}
        />
      )}

      {/* Corner TL */}
      <div
        className="absolute top-0 left-0 w-6 h-6 pointer-events-none"
        style={{
          borderBottom: `1px solid ${ACCENT}`,
          borderRight: `1px solid ${ACCENT}`,
          transform: "rotate(180deg)",
          opacity: on ? 0.9 : 0.25,
          transition: "opacity 0.3s",
        }}
      />
      {/* Corner BR */}
      <div
        className="absolute bottom-0 right-0 w-6 h-6 pointer-events-none"
        style={{
          borderTop: `1px solid ${ACCENT}`,
          borderLeft: `1px solid ${ACCENT}`,
          transform: "rotate(180deg)",
          opacity: on ? 0.9 : 0.25,
          transition: "opacity 0.3s",
        }}
      />

      <div className="p-6 md:p-8 flex flex-col gap-4 h-full">
        {/* Top row: avatar + name + stars */}
        <div className="flex items-center gap-4">
          {/* Avatar circle */}
          <div
            className="w-10 h-10 flex-shrink-0 flex items-center justify-center font-black text-[0.65rem] tracking-wider"
            style={{
              background: `${ACCENT}18`,
              border: `1px solid ${ACCENT}55`,
              color: ACCENT,
              boxShadow: on ? `0 0 14px ${ACCENT}50` : "none",
              transition: "box-shadow 0.3s",
            }}
          >
            {review.initials}
          </div>

          <div className="flex flex-col gap-1">
            <span
              className="font-black text-sm uppercase tracking-widest"
              style={{
                color: on ? "#fafafa" : "#a3a3a3",
                textShadow: on ? `0 0 16px ${ACCENT}70` : "none",
                transition: "color 0.3s, text-shadow 0.3s",
              }}
            >
              {review.name}
            </span>
            <StarRow />
          </div>

          {/* Facebook badge */}
          <div className="ml-auto flex-shrink-0">
            <span
              className="text-[0.55rem] font-bold uppercase tracking-widest px-2 py-1"
              style={{
                color: "#4267B2",
                border: "1px solid #4267B230",
                background: "#4267B215",
              }}
            >
              Facebook
            </span>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full"
          style={{
            background: `linear-gradient(90deg, ${ACCENT}80, transparent)`,
            opacity: on ? 1 : 0.25,
            transition: "opacity 0.3s",
          }}
        />

        {/* Quote mark */}
        <div
          className="font-black leading-none select-none"
          style={{
            fontSize: "3rem",
            lineHeight: 0.8,
            color: ACCENT,
            opacity: on ? 0.6 : 0.2,
            transition: "opacity 0.3s",
          }}
        >
          "
        </div>

        {/* Review text */}
        <p
          className="text-sm md:text-[0.9rem] leading-relaxed flex-1"
          style={{
            color: on ? "#d4d4d4" : "#737373",
            transition: "color 0.3s",
          }}
        >
          {review.text}
        </p>
      </div>
    </div>
  );
}

export default function ReviewsSection() {
  const [current, setCurrent] = useState(0);
  const [animDir, setAnimDir] = useState<"left" | "right">("right");
  const [visible, setVisible] = useState(true);
  const total = REVIEWS.length;

  function goTo(index: number, dir: "left" | "right") {
    setVisible(false);
    setAnimDir(dir);
    setTimeout(() => {
      setCurrent((index + total) % total);
      setVisible(true);
    }, 220);
  }

  function prev() {
    goTo(current - 1, "left");
  }

  function next() {
    goTo(current + 1, "right");
  }

  const review = REVIEWS[current];

  return (
    <>
      <style>{`
        @keyframes scanline {
          from { transform: translateY(0); opacity: 1; }
          to { transform: translateY(6000%); opacity: 0.3; }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      <section id="reviews" className="max-w-6xl mx-auto px-6 py-24">
        <Reveal>
          <span className="text-[.62rem] font-bold tracking-[.32em] uppercase text-orange-500 block mb-3">
            Vendégek szava
          </span>
          <h2
            className="font-display font-bold text-neutral-50 leading-tight mb-12"
            style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)" }}
          >
            Amit <em className="not-italic grad-text">rólunk mondanak</em>
          </h2>
        </Reveal>

        {/* Card */}
        <div
          className="mb-6"
          style={{
            animation: visible
              ? animDir === "right"
                ? "slideInRight 0.3s cubic-bezier(.22,1,.36,1)"
                : "slideInLeft 0.3s cubic-bezier(.22,1,.36,1)"
              : "none",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.15s ease",
          }}
        >
          <ReviewCard review={review} active={false} />
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          {/* Prev button */}
          <button
            onClick={prev}
            className="flex items-center gap-2 px-5 py-2.5 text-[0.7rem] font-black uppercase tracking-widest transition-all duration-200"
            style={{
              color: "#525252",
              border: `1px solid #404040`,
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = ACCENT;
              (e.currentTarget as HTMLElement).style.borderColor =
                ACCENT + "80";
              (e.currentTarget as HTMLElement).style.boxShadow =
                `0 0 16px ${GLOW}`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#525252";
              (e.currentTarget as HTMLElement).style.borderColor = "#404040";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Előző
          </button>

          {/* Dot indicators */}
          <div className="flex gap-2 items-center">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? "right" : "left")}
                className="transition-all duration-300"
                style={{
                  width: i === current ? "28px" : "8px",
                  height: "8px",
                  background: i === current ? ACCENT : "#404040",
                  boxShadow: i === current ? `0 0 10px ${ACCENT}` : "none",
                  border: "none",
                  outline: "none",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={next}
            className="flex items-center gap-2 px-5 py-2.5 text-[0.7rem] font-black uppercase tracking-widest transition-all duration-200"
            style={{
              color: "#525252",
              border: `1px solid #404040`,
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = ACCENT;
              (e.currentTarget as HTMLElement).style.borderColor =
                ACCENT + "80";
              (e.currentTarget as HTMLElement).style.boxShadow =
                `0 0 16px ${GLOW}`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#525252";
              (e.currentTarget as HTMLElement).style.borderColor = "#404040";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            Következő
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Counter */}
        <div className="text-center mt-4">
          <span
            className="text-[0.6rem] font-black font-mono tracking-widest"
            style={{ color: `${ACCENT}60` }}
          >
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
        </div>
      </section>
    </>
  );
}
