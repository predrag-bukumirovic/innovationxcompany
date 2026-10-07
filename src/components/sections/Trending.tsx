import type { CSSProperties } from "react";
import { PiArrowRight } from "react-icons/pi";
import { ProductCard } from "@/components/product/ProductCard";
import { getProduct, TRENDING_IDS } from "@/lib/catalog";
import styles from "./Trending.module.scss";

export function Trending() {
  const products = TRENDING_IDS.map((id) => getProduct(id)).filter((p) => p !== undefined);

  return (
    <section id="najpopularnije" className={styles.section}>
      <div className={styles.head} data-reveal>
        <h2 className="heading">Najpopularnije</h2>
        <p className={styles.note}>Modeli sa najviše lajkova na našem Instagramu</p>
      </div>

      <div className={styles.grid}>
        {products.map((product, index) => (
          <div key={product.id} data-reveal style={{ "--reveal-delay": `${index * 0.08}s` } as CSSProperties}>
            <ProductCard product={product} variant="tile" sizes="(max-width: 900px) 50vw, 25vw" />
          </div>
        ))}
      </div>

      <div className={styles.more}>
        <a href="#ponuda" className="ghost">
          Pogledaj celu ponudu <PiArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}
