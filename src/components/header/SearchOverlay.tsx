"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PiMagnifyingGlass, PiX } from "react-icons/pi";
import { formatPrice, PRODUCTS } from "@/lib/catalog";
import { useOverlay } from "@/lib/useOverlay";
import styles from "./SearchOverlay.module.scss";

const SUGGESTIONS = ["Oversized", "Krop", "Šorc", "Cocktail Club", "Romance"];

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/đ/g, "dj")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  useOverlay(open, onClose);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const needle = normalize(query.trim());
  const results = needle
    ? PRODUCTS.filter((p) => normalize(`${p.name} ${p.print} ${p.colors.map((c) => c.name).join(" ")}`).includes(needle))
    : PRODUCTS.filter((p) => p.badge);

  return (
    <div className={`${styles.root} ${open ? styles.open : ""}`} inert={!open}>
      <button className={styles.backdrop} onClick={onClose} aria-label="Zatvori pretragu" tabIndex={-1} />
      <div className={styles.sheet} role="dialog" aria-modal="true" aria-label="Pretraga">
        <div className={styles.field}>
          <PiMagnifyingGlass size={26} />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Pretraži majice, šorceve, printove…"
            aria-label="Pretraga proizvoda"
          />
          <button className="round" onClick={onClose} aria-label="Zatvori pretragu">
            <PiX size={18} />
          </button>
        </div>

        <div className={styles.chips}>
          <span>Popularno:</span>
          {SUGGESTIONS.map((suggestion) => (
            <button key={suggestion} onClick={() => setQuery(suggestion)} className={styles.chip}>
              {suggestion}
            </button>
          ))}
        </div>

        <p className={styles.count}>
          {needle ? `${results.length} ${results.length === 1 ? "rezultat" : "rezultata"}` : "Popularno"}
        </p>

        {results.length > 0 ? (
          <ul className={styles.results}>
            {results.map((product) => (
              <li key={product.id}>
                <a href="#ponuda" onClick={onClose} className={styles.result}>
                  <div className={styles.thumb}>
                    <Image src={product.image} alt="" fill sizes="180px" />
                  </div>
                  <p className={styles.name}>{product.name}</p>
                  <p className={styles.meta}>{product.print}</p>
                  <p className={styles.price}>{formatPrice(product.price)}</p>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.empty}>Nema rezultata za „{query}”. Probaj „oversized” ili „šorc”.</p>
        )}
      </div>
    </div>
  );
}
