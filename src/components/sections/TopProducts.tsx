"use client";

import { useEffect, useRef, useState } from "react";
import { PiArrowLeft, PiArrowRight } from "react-icons/pi";
import { ProductCard } from "@/components/product/ProductCard";
import { CATEGORIES, PRODUCTS, type Category } from "@/lib/catalog";
import styles from "./TopProducts.module.scss";

type Scroll = { start: number; size: number; atStart: boolean; atEnd: boolean };

function readScroll(el: HTMLElement): Scroll {
  const max = el.scrollWidth - el.clientWidth;
  const size = Math.min(1, el.clientWidth / el.scrollWidth);
  return {
    size,
    start: max > 0 ? (el.scrollLeft / max) * (1 - size) : 0,
    atStart: el.scrollLeft <= 2,
    atEnd: el.scrollLeft >= max - 2,
  };
}

export function TopProducts() {
  const [category, setCategory] = useState<Category | "sve">("sve");
  const [scroll, setScroll] = useState<Scroll>({ start: 0, size: 0.3, atStart: true, atEnd: false });
  const scrollerRef = useRef<HTMLDivElement>(null);

  const products = category === "sve" ? PRODUCTS : PRODUCTS.filter((p) => p.category === category);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => setScroll(readScroll(el)));
    observer.observe(el);
    if (el.firstElementChild) observer.observe(el.firstElementChild);
    return () => observer.disconnect();
  }, []);

  const page = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const choose = (id: Category | "sve") => {
    setCategory(id);
    scrollerRef.current?.scrollTo({ left: 0 });
  };

  return (
    <section id="ponuda" className={styles.section}>
      <h2 className={`heading ${styles.title}`} data-reveal>
        Naša top ponuda
      </h2>

      <div className={styles.tabs} role="tablist" aria-label="Kategorije" data-reveal>
        {CATEGORIES.map((c, index) => {
          const count = c.id === "sve" ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === c.id).length;
          return (
            <span key={c.id} className={styles.tabWrap}>
              {index > 0 && <span className={styles.slash}>/</span>}
              <button
                role="tab"
                aria-selected={category === c.id}
                className={`${styles.tab} ${category === c.id ? styles.tabActive : ""}`}
                onClick={() => choose(c.id)}
              >
                {c.label}
                <sup>({count})</sup>
              </button>
            </span>
          );
        })}
      </div>

      <div className={styles.scroller} ref={scrollerRef} onScroll={(event) => setScroll(readScroll(event.currentTarget))} data-reveal>
        <div className={styles.track}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} sizes="(max-width: 640px) 78vw, 340px" />
          ))}
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.progress} aria-hidden="true">
          <span style={{ left: `${scroll.start * 100}%`, width: `${scroll.size * 100}%` }} />
        </div>
        <div className={styles.buttons}>
          <button className="round" onClick={() => page(-1)} disabled={scroll.atStart} aria-label="Prethodni proizvodi">
            <PiArrowLeft size={18} />
          </button>
          <button className="round" onClick={() => page(1)} disabled={scroll.atEnd} aria-label="Sledeći proizvodi">
            <PiArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
