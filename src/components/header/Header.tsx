"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import { PiHandbag, PiList, PiMagnifyingGlass, PiUser } from "react-icons/pi";
import { Logo } from "@/components/Logo";
import { MenuDrawer } from "./MenuDrawer";
import { SearchOverlay } from "./SearchOverlay";
import styles from "./Header.module.scss";

export function Header() {
  const cart = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [floating, setFloating] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const observer = new IntersectionObserver(([entry]) => setFloating(!entry.isIntersecting));
    observer.observe(bar);
    return () => observer.disconnect();
  }, []);

  const actions = (
    <div className={styles.actions}>
      <button className={styles.iconButton} onClick={() => setSearchOpen(true)} aria-label="Pretraga">
        <PiMagnifyingGlass size={22} />
      </button>
      <a className={`${styles.iconButton} ${styles.hideSm}`} href="#" aria-label="Nalog">
        <PiUser size={22} />
      </a>
      <button className={styles.iconButton} onClick={cart.open} aria-label={`Korpa, ${cart.count} artikala`}>
        <PiHandbag size={22} />
        {cart.count > 0 && <span className={styles.badge}>{cart.count}</span>}
      </button>
    </div>
  );

  return (
    <>
      <div ref={barRef} className={styles.bar}>
        <button className={styles.menuButton} onClick={() => setMenuOpen(true)} aria-label="Otvori meni">
          <PiList size={22} />
        </button>
        <a href="#" className={styles.logo} aria-label="Innovation, početna">
          <Logo markSize={40} iconOnlyOnMobile />
        </a>
        {actions}
      </div>

      <div className={`${styles.floating} ${floating ? styles.floatingVisible : ""}`} inert={!floating}>
        <button className={styles.menuButtonSm} onClick={() => setMenuOpen(true)} aria-label="Otvori meni">
          <PiList size={20} />
        </button>
        <a href="#" className={styles.logo} aria-label="Innovation, početna">
          <Logo markSize={34} iconOnlyOnMobile />
        </a>
        {actions}
      </div>

      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
