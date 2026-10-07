"use client";

import { useState } from "react";
import { PiArrowRight } from "react-icons/pi";
import styles from "./Footer.module.scss";

export function Newsletter() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return <p className={styles.thanks}>Hvala na prijavi!</p>;
  }

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email adresa
      </label>
      <input id="newsletter-email" type="email" required placeholder="Email adresa" autoComplete="email" />
      <button type="submit" aria-label="Prijavi se">
        <PiArrowRight size={18} />
      </button>
    </form>
  );
}
