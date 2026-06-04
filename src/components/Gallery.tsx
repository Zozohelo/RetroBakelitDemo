import gallery12 from "../assets/images/gallery12.jpg";
import gallery2 from "../assets/images/gallery2.jpg";
import gallery3 from "../assets/images/gallery3.jpg";
import gallery52 from "../assets/images/gallery52.jpg";
import gallery6 from "../assets/images/gallery6.jpg";
import gallery8 from "../assets/images/gallery8.jpg";
import gallery25 from "../assets/images/gallery25.jpg";
import gallery44 from "../assets/images/gallery44.jpg";
import gallery56 from "../assets/images/gallery56.jpeg";
import gallery57 from "../assets/images/gallery57.jpeg";
import gallery58 from "../assets/images/gallery58.jpeg";
import gallery59 from "../assets/images/gallery59.jpeg";
import gallery60 from "../assets/images/gallery60.jpeg";
import galerry62 from "../assets/images/gallery62.jpg";
import galery63 from "../assets/images/gallery63.jpg";
import { Reveal } from "./Reveal";

const GALLERY = [
  gallery25,
  gallery12,
  gallery2,
  gallery3,
  gallery52,
  gallery6,
  gallery8,
  gallery44,
  gallery56,
  gallery57,
  gallery58,
  gallery59,
  gallery60,
  galerry62,
  galery63,
];

export default function GallerySection() {
  return (
    <section id="gallery" className="max-w-6xl mx-auto px-6 py-24">
      <Reveal>
        <span className="text-[.62rem] font-bold tracking-[.32em] uppercase text-orange-500 block mb-3">
          A hangulat
        </span>
        <h2
          className="font-display font-bold text-neutral-50 leading-tight mb-8"
          style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)" }}
        >
          Látni kell, hogy <em className="not-italic grad-text">el hidd.</em>
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
  );
}
