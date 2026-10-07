"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { PiHandbag, PiPlus, PiX } from "react-icons/pi";
import { useCart } from "@/components/cart/CartContext";
import { formatPrice, SIZES, type Product } from "@/lib/catalog";
import styles from "./ProductCard.module.scss";

type ProductCardProps = {
  product: Product;
  variant?: "card" | "tile";
  sizes: string;
};

export function ProductCard({ product, variant = "card", sizes }: ProductCardProps) {
  const cart = useCart();
  const [colorId, setColorId] = useState(product.colors[0].id);
  const [picking, setPicking] = useState(false);

  const mainImage = variant === "tile" && product.lifestyleImage ? product.lifestyleImage : product.image;
  const hoverImage = variant === "tile" && product.lifestyleImage ? product.image : product.hoverImage;
  const colorName = product.colors.find((c) => c.id === colorId)?.name;

  const swatches = (
    <div className={styles.swatches} role="radiogroup" aria-label="Boja">
      {product.colors.map((color) => (
        <button
          key={color.id}
          role="radio"
          aria-checked={color.id === colorId}
          aria-label={color.name}
          title={color.name}
          className={color.id === colorId ? styles.swatchActive : undefined}
          style={{ "--swatch": color.hex } as CSSProperties}
          onClick={() => setColorId(color.id)}
        />
      ))}
    </div>
  );

  const sizePicker = (
    <div className={`${styles.sizes} ${picking ? styles.sizesOpen : ""}`} inert={!picking}>
      <div className={styles.sizesHead}>
        <span>Izaberi veličinu ({colorName?.toLowerCase()})</span>
        <button onClick={() => setPicking(false)} aria-label="Zatvori izbor veličine">
          <PiX size={16} />
        </button>
      </div>
      <div className={styles.sizeGrid}>
        {SIZES.map((size) => (
          <button
            key={size}
            onClick={() => {
              cart.add(product.id, size, colorId);
              setPicking(false);
            }}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );

  const media = (
    <div className={styles.media}>
      <Image src={mainImage} alt={`${product.name} ${product.print}`} fill sizes={sizes} className={styles.main} />
      <Image src={hoverImage} alt="" fill sizes={sizes} className={styles.alt} />
      {product.badge && <span className={styles.badge}>{product.badge}</span>}
      {variant === "tile" && (
        <button className={styles.quick} onClick={() => setPicking(true)} aria-label={`Dodaj ${product.name} u korpu`}>
          <PiHandbag size={19} />
        </button>
      )}
      {sizePicker}
    </div>
  );

  if (variant === "tile") {
    return (
      <article className={styles.tile}>
        {media}
        <div className={styles.tileInfo}>
          <div>
            <h3 className={styles.name}>{product.print}</h3>
            <p className={styles.sub}>{product.name}</p>
          </div>
          <p className={styles.price}>{formatPrice(product.price)}</p>
        </div>
        <div className={styles.tileMeta}>{swatches}</div>
      </article>
    );
  }

  return (
    <article className={styles.card}>
      <header className={styles.top}>
        <div>
          <h3 className={styles.name}>{product.name}</h3>
          <p className={styles.sub}>{product.print}</p>
        </div>
        <p className={styles.price}>{formatPrice(product.price)}</p>
      </header>
      {media}
      <footer className={styles.bottom}>
        {swatches}
        <button className={styles.add} onClick={() => setPicking((open) => !open)}>
          Dodaj u korpu
          <span className={styles.addIcon}>
            <PiPlus size={16} />
          </span>
        </button>
      </footer>
    </article>
  );
}
