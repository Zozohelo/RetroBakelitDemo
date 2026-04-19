import herobg from "../assets/images/gallery22.jpg";

const HERO_BG = herobg;

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

      <circle cx={cx} cy={cx} r={r} fill={`url(#vs-${size})`} />

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

      <circle cx={cx} cy={cx} r={r} fill={`url(#gs-${size})`} />

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

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center anim-zoom"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          filter: "brightness(.28) saturate(1.1) sepia(.2)",
        }}
      />
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 25%, rgba(10,10,10,.78) 100%), linear-gradient(to bottom, transparent 40%, rgba(10,10,10,.85) 100%)",
        }}
      />

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

      <div className="relative z-20 w-full max-w-6xl mx-auto px-6 py-28 md:py-32 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">
        <div className="flex-1 text-center md:text-left max-w-2xl md:order-1">
          <div className="anim-fade1 inline-flex items-center gap-2 border border-orange-500/25 px-4 py-1.5 mb-6 text-[0.62rem] font-bold tracking-[.32em] uppercase text-orange-400/60">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shadow-[0_0_6px_#fb923c]" />
            Nagykovácsi · Újonnan nyitott
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shadow-[0_0_6px_#fb923c]" />
          </div>

          <h1
            className="font-display font-black leading-tight tracking-tight anim-fade2"
            style={{ fontSize: "clamp(2rem,4.5vw,4rem)" }}
          >
            <span className="block text-neutral-50 mb-3">
              Több, mint egy hely
            </span>
            <span className="block text-neutral-50 mb-4">Nagykovácsiban.</span>
            <span
              className="block grad-text font-bold"
              style={{ fontSize: "clamp(1.5rem,3.5vw,3rem)" }}
            >
              Egy élmény, amit át kell élned.
            </span>
          </h1>

          <div className="anim-fade3 w-14 h-px md:mx-0 mx-auto my-6 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

          <p className="anim-fade3 text-neutral-400 max-w-lg md:mx-0 mx-auto leading-relaxed text-[0.95rem]">
            Modern retró kocsma — bakelitlemezek, hideg csapolt, házi ételek és
            zene, ami mindent elmond.
          </p>

          <div className="anim-fade4 flex gap-3 justify-center md:justify-start flex-wrap mt-8">
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
          </div>

          <div className="flex md:hidden justify-center w-full anim-fade0 order-first pt-8">
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

        <div
          className="hidden md:flex flex-shrink-0 items-center justify-center md:order-2 anim-fade1"
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

      <div className="anim-fade5 absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5">
        <div className="w-px h-10 bg-gradient-to-b from-orange-500/40 to-transparent scroll-pulse" />
        <span className="text-[.55rem] tracking-[.26em] uppercase text-orange-500/35">
          Görgess
        </span>
      </div>
    </section>
  );
}
