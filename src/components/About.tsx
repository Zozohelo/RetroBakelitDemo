import gallery22 from "../assets/images/gallery22.jpg";
import { Reveal } from "./Reveal";

export default function About() {
  return (
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
              Nagykovácsiban nyílt meg — egy igazán hangulatos hely, ahol a
              retro és a modern stílus találkozik. Egy különleges tér, ami már
              elsőre magával ragad, és ahol könnyű kikapcsolódni. Ez nem csak
              egy egyszerű hely, hanem egy közösségi élmény. Legyen szó családi
              programról, baráti találkozóról vagy egy laza napról ismerősökkel
              — itt együtt tölthetitek az időt kellemes környezetben.
            </p>
            <p>
              Finom ételek, különleges fogások, minőségi sörök és ízletes italok
              teszik teljessé az élményt. Jó időben pedig a kinti kiülők még
              tovább fokozzák a hangulatot, így akár a szabadban is élvezhetitek
              a helyet.
            </p>
            <p>
              Csapatunk rengeteg időt és energiát fektetett abba, hogy ez a hely
              igazán különleges legyen, és mindenki megtalálja benne azt, amit
              keres. Éppen ezért nagyon várunk mindenkit, hogy személyesen is
              megtapasztalja, milyen élményt nyújt a Retro&Bakelit.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-6">
            {[
              "Zene",
              "Különleges ételek",
              "Jéghideg italok",
              "Retró érzet",
              "Események",
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
              src={gallery22}
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
  );
}
