import React, { useState, useEffect } from "react";
import logo from "../assets/images/retrologo.png";
import { FaFacebook } from "react-icons/fa";

/* ── Section anchors match the id="" attributes in Home.tsx ── */
const NAV_LINKS = [
  { label: "Kezdőlap", href: "#hero" },
  { label: "Rólunk", href: "#about" },
  { label: "Étel/Ital", href: "#menu" },
  { label: "Képek", href: "#gallery" },
  { label: "Kapcsolat", href: "#contact" },
];

const COLORS = ["#FF2D78", "#00CFFF", "#A855F7"];
const ACTIVE_COLORS = ["#FF2D78", "#00CFFF", "#A855F7", "#FF2D78", "#00CFFF"];

const MenuIcon = ({ open }: { open: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    {open ? (
      <>
        <line
          x1="4"
          y1="4"
          x2="18"
          y2="18"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="18"
          y1="4"
          x2="4"
          y2="18"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    ) : (
      <>
        <line
          x1="3"
          y1="6"
          x2="19"
          y2="6"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="3"
          y1="11"
          x2="19"
          y2="11"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="3"
          y1="16"
          x2="19"
          y2="16"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    )}
  </svg>
);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [tick, setTick] = useState(0);
  const [activeHref, setActiveHref] = useState("#hero");

  /* Scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* LED tick */
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 600);
    return () => clearInterval(id);
  }, []);

  /* Highlight the nav link whose section is currently in view */
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveHref(`#${id}`);
        },
        { threshold: 0.35 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* Smooth scroll helper — accounts for fixed navbar height */
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    const navHeight = 100; // LED strip (6px) + main bar (85px) + LED bar (3px) + small buffer
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: "smooth" });
    setMenuOpen(false);
    setActiveHref(href);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap');

        @keyframes gshift { 0%{background-position:0%} 100%{background-position:300%} }

        .brand-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.55rem; letter-spacing: .1em;
          background: linear-gradient(90deg,#FF2D78,#00CFFF,#A855F7,#FF2D78);
          background-size: 300%;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: gshift 10s linear infinite;
        }

        .nav-link { position: relative; transition: color .2s; }
        .nav-link::after {
          content: ''; position: absolute; bottom: -1px; left: 50%; right: 50%;
          height: 2px; border-radius: 2px 2px 0 0;
          background: var(--link-color, #00CFFF);
          box-shadow: 0 0 8px var(--link-color, #00CFFF);
          transition: left .24s, right .24s;
        }
        .nav-link:hover::after  { left: 1rem; right: 1rem; }
        .nav-link.active::after { left: 1rem; right: 1rem; }

        .led-d   { transition: background 0.55s ease, box-shadow 0.55s ease; }
        .led-seg { transition: background 0.55s ease; }
      `}</style>

      <nav
        className={`font-['DM_Sans',sans-serif] fixed top-0 left-0 right-0 z-50 bg-[rgba(6,4,16,0.97)] border-b border-white/5 transition-shadow duration-300 ${scrolled ? "shadow-[0_4px_48px_rgba(0,0,0,0.85)]" : ""}`}
      >
        {/* ── Main row ── */}
        <div className="max-w-[1180px] mx-auto px-6 h-[85px] flex items-center justify-between">
          {/* Brand — scrolls to top */}
          <a
            href="#hero"
            onClick={(e) => scrollTo(e, "#hero")}
            className="flex items-center gap-2.5 no-underline"
          >
            <img
              src={logo}
              alt="Retro & Bakelit logo"
              className="h-[70px] w-auto"
            />
            <div className="flex flex-col leading-none">
              <span className="brand-name">Retro&amp;Bakelit</span>
              <span className="text-[0.6rem] text-white/30 tracking-[.26em] uppercase mt-0.5">
                Nagykovácsi
              </span>
            </div>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center list-none m-0 p-0">
            {NAV_LINKS.map((link, i) => {
              const isActive = activeHref === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollTo(e, link.href)}
                    style={
                      {
                        "--link-color": ACTIVE_COLORS[i],
                      } as React.CSSProperties
                    }
                    className={`nav-link text-[.78rem] font-semibold tracking-[.13em] uppercase no-underline px-4 py-2 block ${isActive ? "active" : "text-white/40 hover:text-white"}`}
                  >
                    <span style={isActive ? { color: ACTIVE_COLORS[i] } : {}}>
                      {link.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/profile.php?id=61582215309925"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 text-[.7rem] font-bold tracking-[.12em] uppercase text-white/80 border border-white/[.14] rounded px-4 py-2 no-underline transition-all duration-200 hover:text-white hover:border-[#1877F2] hover:bg-[rgba(24,119,242,.1)] hover:shadow-[0_0_16px_rgba(24,119,242,.25)] hover:-translate-y-px"
            >
              <FaFacebook size={14} />
              Kövess minket
            </a>

            <button
              className="md:hidden flex items-center justify-center bg-white/5 border border-white/10 rounded p-2 cursor-pointer transition-all duration-200 hover:border-[#00CFFF] hover:bg-[rgba(0,207,255,.08)]"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </div>

        {/* ── Bottom LED bar ── */}
        <div className="h-[3px] flex overflow-hidden">
          {COLORS.map((_, i) => {
            const c = COLORS[(i + tick) % COLORS.length];
            return (
              <div
                key={i}
                className="led-seg flex-1"
                style={{ background: c, boxShadow: `0 0 4px ${c}` }}
              />
            );
          })}
        </div>

        {/* ── Mobile dropdown ── */}
        <div
          className={`overflow-hidden bg-[rgba(6,4,16,.99)] border-t border-white/5 transition-all duration-[360ms] ease-[cubic-bezier(.4,0,.2,1)] ${menuOpen ? "max-h-[440px] opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="flex flex-col px-6 pt-3 pb-5">
            {NAV_LINKS.map((link, i) => {
              const isActive = activeHref === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  className={`text-[.95rem] font-semibold tracking-[.1em] uppercase no-underline py-3 border-b border-white/5 transition-all duration-200 ${isActive ? "pl-2" : "text-white/40 hover:text-white hover:pl-2"}`}
                  style={isActive ? { color: ACTIVE_COLORS[i] } : {}}
                >
                  {link.label}
                </a>
              );
            })}

            <a
              href="https://www.facebook.com/profile.php?id=61582215309925"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 text-[.78rem] font-bold tracking-[.14em] uppercase text-white/85 no-underline border border-[rgba(24,119,242,.35)] bg-[rgba(24,119,242,.07)] rounded py-3 transition-all duration-200 hover:bg-[rgba(24,119,242,.15)] hover:border-[#1877F2]"
            >
              <FaFacebook size={14} />
              Kövess minket a Facebookon
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
