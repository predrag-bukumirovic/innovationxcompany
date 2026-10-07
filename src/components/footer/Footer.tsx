import { PiInstagramLogo } from "react-icons/pi";
import { Logo } from "@/components/Logo";
import { INSTAGRAM } from "@/lib/catalog";
import { Newsletter } from "./Newsletter";
import styles from "./Footer.module.scss";

const COLUMNS = [
  {
    title: "Prodavnica",
    links: [
      { label: "Oversized majice", href: "#ponuda" },
      { label: "Standard fit", href: "#ponuda" },
      { label: "Krop majice", href: "#ponuda" },
      { label: "Unisex šorcevi", href: "#sorcevi" },
      { label: "Po meri", href: "#po-meri" },
    ],
  },
  {
    title: "Pomoć",
    links: [
      { label: "Dostava i plaćanje", href: "#" },
      { label: "Tabela veličina", href: "#" },
      { label: "Zamena i povraćaj", href: "#" },
      { label: "Uslovi korišćenja", href: "#" },
      { label: "Politika privatnosti", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <Logo markSize={44} />
          <p>Domaća proizvodnja. Sve veličine, šivenje po meri, vez i štampa.</p>
        </div>

        {COLUMNS.map((column) => (
          <nav key={column.title} className={styles.column} aria-label={column.title}>
            <p className={styles.label}>{column.title}</p>
            <ul>
              {column.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className={styles.column}>
          <p className={styles.label}>Kontakt</p>
          <ul>
            <li>
              <a href={INSTAGRAM.url} target="_blank" rel="noreferrer" className={styles.social}>
                <PiInstagramLogo size={17} /> @{INSTAGRAM.handle}
              </a>
            </li>
            <li>Batajnica, Beograd</li>
            <li>Slanje: PostExpress i BG kurir</li>
          </ul>
        </div>

        <div className={styles.newsletter}>
          <p className={styles.label}>Newsletter</p>
          <p className={styles.newsletterText}>Javljamo kada stignu novi modeli.</p>
          <Newsletter />
        </div>
      </div>

      <p className={styles.wordmark} aria-hidden="true">
        Innovation
      </p>

      <div className={styles.bottom}>
        <p>© 2026 Innovation</p>
        <p>Batajnica, Srbija</p>
      </div>
    </footer>
  );
}
