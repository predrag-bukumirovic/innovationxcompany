"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { PiArrowRight } from "react-icons/pi";
import { Header } from "@/components/header/Header";
import styles from "./Hero.module.scss";

const SLIDE_MS = 6500;

// Prva dva kadra (ona i on) su uvek vidljiva na desktopu; treći i četvrti se dodaju na širokim ekranima.
const SLIDES = [
  {
    label: "I See Nothing But You",
    frames: [
      { src: "/images/isnby-cream-2.jpg", position: "50% 40%", alt: "Ona u kompletu I See Nothing But You" },
      { src: "/images/isnby-cream-5.jpg", position: "50% 22%", alt: "On u kompletu I See Nothing But You" },
      { src: "/images/isnby-cream-4.jpg", position: "50% 30%", alt: "Print I See Nothing But You na leđima" },
      { src: "/images/isnby-cream-1.jpg", position: "50% 30%", alt: "Par u kompletima I See Nothing But You" },
    ],
    single: { src: "/images/isnby-cream-1.jpg", position: "50% 30%" },
  },
  {
    label: "No Time For Romance",
    frames: [
      { src: "/images/ntfr-grey-4.jpg", position: "50% 25%", alt: "Ona u kompletu No Time For Romance" },
      { src: "/images/ntfr-grey-5.jpg", position: "50% 35%", alt: "On u kompletu No Time For Romance" },
      { src: "/images/ntfr-grey-1.jpg", position: "50% 30%", alt: "Print No Time For Romance na leđima" },
      { src: "/images/ntfr-grey-2.jpg", position: "50% 40%", alt: "On u kompletu No Time For Romance, pogled s leđa" },
    ],
    single: { src: "/images/ntfr-grey-7.jpg", position: "50% 30%" },
  },
  {
    label: "Text Me When You Get Home",
    frames: [
      { src: "/images/txtme-black-1.jpg", position: "50% 30%", alt: "Ona u majici Text Me When You Get Home" },
      { src: "/images/txtme-black-4.jpg", position: "50% 35%", alt: "On u majici Text Me When You Get Home" },
      { src: "/images/txtme-black-5.jpg", position: "50% 35%", alt: "Print Text Me When You Get Home na leđima" },
      { src: "/images/txtme-black-2.jpg", position: "50% 35%", alt: "On u majici Text Me When You Get Home, pogled s leđa" },
    ],
    single: { src: "/images/txtme-black-4.jpg", position: "50% 30%" },
  },
];

// Širina kadra prati broj vidljivih kadrova (Hero.module.scss); sakriveni kadrovi dobijaju 1px da ne povuku punu sliku.
const FRAME_SIZES = [
  "(max-width: 900px) 1px, (min-width: 2700px) 25vw, (min-width: 2000px) 33vw, 50vw",
  "(max-width: 900px) 1px, (min-width: 2700px) 25vw, (min-width: 2000px) 33vw, 50vw",
  "(min-width: 2700px) 25vw, (min-width: 2000px) 33vw, 1px",
  "(min-width: 2700px) 25vw, 1px",
];

export function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => setActive((current) => (current + 1) % SLIDES.length), SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [active]);

  return (
    <section className={styles.hero} aria-label="Matching kompleti za dvoje">
      <div className={styles.media}>
        {/* Na mobilnom se prikazuje jedna fotografija, na desktopu 2 do 4 kadra. */}
        {SLIDES.map((slide, index) => (
          <div key={slide.label} className={`${styles.slide} ${index === active ? styles.active : ""}`} aria-hidden={index !== active}>
            <div className={styles.frames}>
              {slide.frames.map((frame, position) => (
                <div key={frame.src} className={styles.frame}>
                  <Image
                    src={frame.src}
                    alt={frame.alt}
                    fill
                    sizes={FRAME_SIZES[position]}
                    loading={index === 0 && position < 2 ? "eager" : "lazy"}
                    fetchPriority={index === 0 && position < 2 ? "high" : "auto"}
                    style={{ objectPosition: frame.position }}
                  />
                </div>
              ))}
            </div>
            <div className={styles.single}>
              <Image
                src={slide.single.src}
                alt={`Par u kompletu ${slide.label}`}
                fill
                sizes="(max-width: 900px) 100vw, 1px"
                style={{ objectPosition: slide.single.position }}
              />
            </div>
          </div>
        ))}
        <div className={styles.shade} />
      </div>

      <Header />

      <div className={styles.content}>
        <div className={styles.copy}>
          <p className={`eyebrow ${styles.eyebrow}`}>Domaća proizvodnja</p>
          <h1 className="display">
            Matching kompleti
            <br />
            za dvoje
          </h1>
        </div>

        <div className={styles.aside}>
          <p className={styles.lead}>
            Oversized, standard fit i krop majice, uz unisex šorceve u četiri boje. Veličine od S do 3XL.
          </p>
          <a href="#ponuda" className="pill">
            Kupi sada
            <span className="pill-icon">
              <PiArrowRight size={18} />
            </span>
          </a>
          <div className={styles.progress} style={{ "--slide-ms": `${SLIDE_MS}ms` } as CSSProperties}>
            {SLIDES.map((slide, index) => (
              <button
                key={slide.label}
                className={`${styles.bar} ${index === active ? styles.barActive : ""} ${index < active ? styles.barDone : ""}`}
                onClick={() => setActive(index)}
                aria-label={`Prikaži ${slide.label}`}
              >
                <span />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
