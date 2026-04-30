import { useState, useEffect } from "react";

export default function ChampionsLeagueModal() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-gradient-to-b from-slate-950 to-slate-900 border border-orange-500/30 rounded-xl shadow-2xl max-w-sm w-full transform transition-all duration-300 overflow-hidden animate-in fade-in zoom-in-95">
          <div className="h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600" />

          <div className="p-8">
            <div className="flex justify-center mb-6">
              <div className="text-5xl animate-bounce">⚽</div>
            </div>

            <h2 className="font-display font-black text-center text-2xl md:text-3xl text-neutral-50 mb-2 leading-tight">
              BL Meccsek Élőben
            </h2>

            <p className="text-center text-orange-400 text-sm font-semibold mb-6 tracking-wide">
              ELŐDÖNTŐK & DÖNTŐ
            </p>

            <p className="text-neutral-300 text-center text-base leading-relaxed mb-6">
              Ne otthon nézd a meccset! Gyere el, és éld át velünk a Bajnokok
              Ligája legnagyobb pillanatait egy jó ital vagy finom étel mellett.
            </p>

            <div className="text-center text-sm text-neutral-400 mb-6 space-y-1">
              <p>Május 5. (kedd) – 21:00</p>
              <p>Május 6. (szerda) – 21:00</p>
              <p className="text-orange-400 font-semibold">
                Döntő: Május 30. (szombat) – 18:00
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/50 text-sm"
              >
                Ott leszek!
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 border-2 border-neutral-600 hover:border-orange-500/50 text-neutral-400 hover:text-orange-400 font-bold py-3 px-4 rounded-lg transition-all duration-200 text-sm"
              >
                Bezár
              </button>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
        </div>
      </div>
    </>
  );
}
