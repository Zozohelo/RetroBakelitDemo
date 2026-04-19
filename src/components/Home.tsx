import Hero from "./Hero";
import About from "./About";
import MenuSection from "./Menu";
import GallerySection from "./Gallery";
import Contact from "./Contact";
import Footer from "./Footer";
import Divider from "./Divider";

export default function Home() {
  return (
    <div className="font-body bg-neutral-950 text-neutral-200 overflow-x-hidden">
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

      <Hero />
      <Divider />
      <About />
      <Divider />
      <MenuSection />
      <Divider />
      <GallerySection />
      <Divider />
      <Contact />
      <Footer />
    </div>
  );
}
