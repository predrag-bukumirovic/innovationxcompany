"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { PiArrowUpRight, PiInstagramLogo, PiMapPin, PiTruck, PiX } from "react-icons/pi";
import { Logo } from "@/components/Logo";
import { INSTAGRAM } from "@/lib/catalog";
import { useOverlay } from "@/lib/useOverlay";
import styles from "./MenuDrawer.module.scss";

const LINKS = [
  { href: "#kolekcija", label: "Kolekcija" },
  { href: "#ponuda", label: "Majice" },
  { href: "#sorcevi", label: "Šorcevi" },
  { href: "#najpopularnije", label: "Najpopularnije" },
  { href: "#po-meri", label: "Po meri" },
];

export function MenuDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  useOverlay(open, onClose);

  return (
    <div className={`${styles.root} ${open ? styles.open : ""}`} inert={!open}>
      <button className={styles.backdrop} onClick={onClose} aria-label="Zatvori meni" tabIndex={-1} />
      <nav className={styles.panel} aria-label="Glavni meni">
        <div className={styles.top}>
          <Logo markSize={32} />
          <button className={styles.close} onClick={onClose} aria-label="Zatvori meni">
            <PiX size={18} />
          </button>
        </div>

        <ul className={styles.links}>
          {LINKS.map((link, index) => (
            <li key={link.href} style={{ "--i": index } as CSSProperties}>
              <a href={link.href} onClick={onClose}>
                <span className={styles.label}>{link.label}</span>
                <PiArrowUpRight className={styles.arrow} size={22} />
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.card}>
          <Image src="/images/isnby-white-1.jpg" alt="Par u belim majicama I See Nothing But You" fill sizes="360px" />
          <div className={styles.cardText}>
            <span className="eyebrow">Lookbook</span>
            <p>Leto 2026</p>
          </div>
        </div>

        <div className={styles.meta}>
          <a href={INSTAGRAM.url} target="_blank" rel="noreferrer">
            <PiInstagramLogo size={18} /> @{INSTAGRAM.handle}
          </a>
          <p>
            <PiMapPin size={18} /> Batajnica, Beograd
          </p>
          <p>
            <PiTruck size={18} /> PostExpress i BG kurir
          </p>
        </div>
      </nav>
    </div>
  );
}
