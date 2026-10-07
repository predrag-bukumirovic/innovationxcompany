"use client";

import Image from "next/image";
import { PiArrowRight, PiHandbag, PiMinus, PiPlus, PiTruck, PiX } from "react-icons/pi";
import { formatPrice, getProduct, PRODUCTS } from "@/lib/catalog";
import { useOverlay } from "@/lib/useOverlay";
import { useCart } from "./CartContext";
import styles from "./CartDrawer.module.scss";

export function CartDrawer() {
  const cart = useCart();
  useOverlay(cart.isOpen, cart.close);

  return (
    <div className={`${styles.root} ${cart.isOpen ? styles.open : ""}`} inert={!cart.isOpen}>
      <button className={styles.backdrop} onClick={cart.close} aria-label="Zatvori korpu" tabIndex={-1} />
      <aside className={styles.panel} role="dialog" aria-modal="true" aria-label="Korpa">
        <header className={styles.header}>
          <h2 className={styles.title}>
            Korpa <sup>({cart.count})</sup>
          </h2>
          <button className="round" onClick={cart.close} aria-label="Zatvori korpu">
            <PiX size={18} />
          </button>
        </header>

        {cart.lines.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>
              <PiHandbag size={28} />
            </span>
            <p className={styles.emptyTitle}>Korpa je prazna</p>
            <p className={styles.emptyText}>Dodaj majicu ili šorc iz ponude.</p>
            <a href="#ponuda" className="pill pill-dark pill-sm" onClick={cart.close}>
              Pogledaj ponudu
              <span className="pill-icon">
                <PiArrowRight size={16} />
              </span>
            </a>
          </div>
        ) : (
          <ul className={styles.lines}>
            {cart.lines.map((line) => {
              const product = getProduct(line.productId);
              if (!product) return null;
              const color = product.colors.find((c) => c.id === line.colorId);
              return (
                <li key={line.key} className={styles.line}>
                  <div className={styles.thumb}>
                    <Image src={product.image} alt="" fill sizes="80px" />
                  </div>
                  <div className={styles.info}>
                    <div className={styles.row}>
                      <p className={styles.name}>{product.name}</p>
                      <p className={styles.price}>{formatPrice(product.price * line.qty)}</p>
                    </div>
                    <p className={styles.meta}>{product.print}</p>
                    <p className={styles.meta}>
                      {color?.name}, veličina {line.size}
                    </p>
                    <div className={styles.row}>
                      <div className={styles.stepper}>
                        <button onClick={() => cart.setQty(line.key, line.qty - 1)} aria-label="Smanji količinu">
                          <PiMinus size={14} />
                        </button>
                        <span>{line.qty}</span>
                        <button onClick={() => cart.setQty(line.key, line.qty + 1)} aria-label="Povećaj količinu">
                          <PiPlus size={14} />
                        </button>
                      </div>
                      <button className={styles.remove} onClick={() => cart.remove(line.key)}>
                        Ukloni
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {cart.lines.length > 0 && (
          <footer className={styles.footer}>
            <p className={styles.shipping}>
              <PiTruck size={18} />
              Slanje širom Srbije: PostExpress ili BG kurir
            </p>
            <div className={styles.total}>
              <span>Ukupno</span>
              <strong>{formatPrice(cart.subtotal)}</strong>
            </div>
            <a href="#" className={`pill pill-dark ${styles.checkout}`}>
              Nastavi na plaćanje
              <span className="pill-icon">
                <PiArrowRight size={16} />
              </span>
            </a>
          </footer>
        )}

        {cart.lines.length === 0 && (
          <div className={styles.suggest}>
            <p className="eyebrow">Popularno</p>
            <div className={styles.suggestGrid}>
              {PRODUCTS.filter((p) => p.badge).map((product) => (
                <div key={product.id} className={styles.suggestItem}>
                  <div className={styles.suggestThumb}>
                    <Image src={product.image} alt={`${product.name} ${product.print}`} fill sizes="200px" />
                  </div>
                  <p className={styles.name}>{product.print}</p>
                  <p className={styles.meta}>{formatPrice(product.price)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
