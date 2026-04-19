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
                — Ady Endre u. 5, Nagykovácski, 2094
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
