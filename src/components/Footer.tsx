import logo from "../assets/images/retrologo.png";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <img
          src={logo}
          alt="Retro & Bakelit"
          className="w-20 h-20 object-cover rounded"
          style={{
            filter: "sepia(.15) saturate(1.1) brightness(.88)",
          }}
        />

        {/* Center text */}
        <p className="text-[.7rem] text-neutral-600 tracking-wide text-center">
          © 2026 · Nagykovácsi · Minden jog fenntartva
        </p>

        {/* Right side - Email & Social */}
        <div className="flex items-center gap-4">
          <p className="text-[.7rem] text-neutral-600 hover:text-orange-500 transition-colors">
            Várunk szerettetel a Nagykovácsi Retro &amp; Bakelitben! <br />
            Kérdésed van? Írj nekünk:{" "}
            <a href="mailto:info@retrobakelit.hu" className="hover:underline">
              retrobakelit@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
