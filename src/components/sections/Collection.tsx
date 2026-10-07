"use client";

import Image from "next/image";
import { useState } from "react";
import { PiArrowRight } from "react-icons/pi";
import { COLLECTIONS, formatPrice } from "@/lib/catalog";
import styles from "./Collection.module.scss";

function PhotoStack({ side, active, className }: { side: 0 | 1; active: number; className: string }) {
  return (
    <div className={`${styles.photo} ${className}`}>
      {COLLECTIONS.map((collection, index) => (
        <Image
          key={collection.id}
          src={collection.images[side]}
          alt={`${collection.name}, ${side === 0 ? "par" : "detalj printa"}`}
          fill
          sizes="(max-width: 860px) 50vw, 32vw"
          className={index === active ? styles.visible : undefined}
          aria-hidden={index !== active}
        />
      ))}
    </div>
  );
}

export function Collection() {
  const [active, setActive] = useState(0);
  const collection = COLLECTIONS[active];

  return (
    <section id="kolekcija" className={styles.section}>
      <div className={styles.head} data-reveal>
        <h2 className="heading">Letnja kolekcija</h2>
        <p className={styles.caption}>Četiri printa u krojevima oversized, standard fit i krop, uz unisex šorceve.</p>
      </div>

      <div className={styles.grid} data-reveal>
        <PhotoStack side={0} active={active} className={styles.a} />

        <div className={`${styles.card} ${styles.b}`}>
          <div key={collection.id} className={styles.cardBody}>
            <h3 className={styles.cardTitle}>{collection.name}</h3>
            <p className={styles.muted}>{collection.description}</p>
            <ul className={styles.pieces}>
              {collection.pieces.map((piece) => (
                <li key={piece.label}>
                  <span>{piece.label}</span>
                  <span>{formatPrice(piece.price)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.cardBottom}>
            <button
              className={styles.next}
              onClick={() => setActive((current) => (current + 1) % COLLECTIONS.length)}
              aria-label="Sledeći print"
            >
              <PiArrowRight size={28} />
            </button>
            <div className={styles.dots}>
              {COLLECTIONS.map((c, index) => (
                <button
                  key={c.id}
                  className={index === active ? styles.dotActive : undefined}
                  onClick={() => setActive(index)}
                  aria-label={c.name}
                />
              ))}
            </div>
          </div>
        </div>

        <PhotoStack side={1} active={active} className={styles.c} />
      </div>
    </section>
  );
}
