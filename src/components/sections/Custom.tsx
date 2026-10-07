import { PiArrowRight } from "react-icons/pi";
import { INSTAGRAM } from "@/lib/catalog";
import styles from "./Custom.module.scss";

const SERVICES = [
  { title: "Šivenje po meri", text: "Kroj po tvojim merama, od majice do celog kompleta." },
  { title: "Vez", text: "Inicijali ili logo, izvezeni na trenerci ili majici." },
  { title: "Štampa", text: "Printovi za ekipe, timove i firme, od jednog komada do serije." },
];

export function Custom() {
  return (
    <section id="po-meri" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.copy} data-reveal>
          <h2 className="heading">Radimo i po meri</h2>
          <p className={styles.lead}>
            Pored kolekcija radimo šivenje po meri, vez i štampu. Pošalji nam ideju na Instagramu i dogovorićemo kroj,
            boju i detalje.
          </p>
          <ul className={styles.services}>
            {SERVICES.map((service) => (
              <li key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </li>
            ))}
          </ul>
          <a href={INSTAGRAM.dm} target="_blank" rel="noreferrer" className="pill">
            Pošalji upit
            <span className="pill-icon">
              <PiArrowRight size={18} />
            </span>
          </a>
        </div>

        <figure className={styles.media} data-reveal>
          <video
            src="/video/komplet-olive.mp4"
            poster="/images/komplet-olive-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Video: maslinaste matching trenerke sa vezenim inicijalima i bele majice"
          />
          <figcaption>
            Matching trenerke sa vezenim inicijalima, porudžbina iz našeg{" "}
            <a href="https://www.instagram.com/reel/Dcy6XCkMQqh/" target="_blank" rel="noreferrer">
              reela
            </a>
            .
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
