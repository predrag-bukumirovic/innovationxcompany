"use client";

import Image from "next/image";
import { useState } from "react";
import { PiArrowRight } from "react-icons/pi";
import { COLORS, formatPrice } from "@/lib/catalog";
import styles from "./StyleComfort.module.scss";

const SHORTS = [
  { color: COLORS.braon, image: "/images/shorts-brown-0.jpg", position: "50% 62%" },
  { color: COLORS.maslinasta, image: "/images/shorts-olive-1.jpg", position: "50% 58%" },
  { color: COLORS.led, image: "/images/shorts-ice-1.jpg", position: "50% 30%" },
  { color: COLORS.crna, image: "/images/shorts-black-1.jpg", position: "50% 66%" },
];

export function StyleComfort() {
  const [active, setActive] = useState(0);

  return (
    <section id="sorcevi" className={styles.section}>
      <div className={styles.main}>
        <h2 className="heading" data-reveal>
          Unisex šorc u četiri boje
        </h2>

        <div className={styles.feature} data-reveal>
          {SHORTS.map((item, index) => (
            <Image
              key={item.color.id}
              src={item.image}
              alt={`Unisex šorc, ${item.color.name.toLowerCase()} boja`}
              fill
              sizes="(max-width: 900px) 100vw, 56vw"
              className={index === active ? styles.visible : undefined}
              style={{ objectPosition: item.position }}
            />
          ))}
          <p className={styles.outline} aria-hidden="true">
            {SHORTS[active].color.name}
          </p>
        </div>

        <div className={styles.swatches} role="radiogroup" aria-label="Boja šorca">
          {SHORTS.map((item, index) => (
            <button
              key={item.color.id}
              role="radio"
              aria-checked={index === active}
              className={`${styles.swatch} ${index === active ? styles.swatchActive : ""}`}
              onClick={() => setActive(index)}
            >
              <span style={{ background: item.color.hex }} />
              {item.color.name}
            </button>
          ))}
        </div>
      </div>

      <aside className={styles.side} data-reveal>
        <div className={styles.sideImage}>
          <Image
            src="/images/cocktail-white-6.jpg"
            alt="Par u belim Cocktail Club majicama i maslinastim šorcevima na padel terenu"
            fill
            sizes="(max-width: 900px) 100vw, 34vw"
          />
        </div>
        <p className={styles.text}>
          Isti kroj za nju i za njega, u veličinama od S do 3XL. Udoban, izdržljiv i sa džepovima sa strane.
        </p>
        <div className={styles.buy}>
          <p className={styles.price}>
            <span>Cena</span>
            {formatPrice(1600)}
          </p>
          <a href="#ponuda" className="pill pill-dark pill-sm">
            Pogledaj šorceve
            <span className="pill-icon">
              <PiArrowRight size={16} />
            </span>
          </a>
        </div>
      </aside>
    </section>
  );
}
