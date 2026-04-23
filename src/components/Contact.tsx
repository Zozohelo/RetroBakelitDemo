import { Reveal } from "./Reveal";

const HOURS = [
  { day: "Hétfő", dayNum: 1, time: "Zárva" },
  { day: "Kedd", dayNum: 2, time: "Zárva" },
  { day: "Szerda", dayNum: 3, time: "14:00 – 22:00" },
  { day: "Csütörtök", dayNum: 4, time: "14:00 – 22:00" },
  { day: "Péntek", dayNum: 5, time: "14:00 – 01:00" },
  { day: "Szombat", dayNum: 6, time: "14:00 – 01:00" },
  { day: "Vasárnap", dayNum: 0, time: "12:00 – 20:00" },
];

export default function Contact() {
  const today = new Date().getDay();

  return (
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
            Mikor <em className="not-italic grad-text">vagyunk nyitva?</em>
          </h2>
          <div className="divide-y divide-neutral-800/70">
            {HOURS.map((h, i) => {
              const active = today === h.dayNum;
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
                      h.time === "Zárva"
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
              style={{ height: 360 }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1128.0366245433615!2d18.893597352821555!3d47.57631374869557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476a76f782dbee61%3A0x6f0b00c2a079f2e2!2sNagykov%C3%A1csi%2C%20Kossuth%20Lajos%20u.%201%2C%202094!5e0!3m2!1shu!2shu!4v1776787821252!5m2!1shu!2shu"
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
                — Kossuth Lajos u. 1, Nagykovácsi, 2094
              </span>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-4 bg-orange-500/10 border border-orange-500/30 rounded p-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <svg
                  className="w-5 h-5 text-orange-500 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="text-[.99rem] font-semibold text-orange-400 mb-1">
                  Helyünk
                </p>
                <p className="text-[.99rem] text-neutral-300 leading-relaxed">
                  A Retro &amp; Bakelit a{" "}
                  <span className="font-semibold">Hód udvar előtt</span>{" "}
                  található.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
