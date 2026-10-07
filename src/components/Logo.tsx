import Image from "next/image";
import styles from "./Logo.module.scss";

type LogoProps = {
  markSize?: number;
  withWordmark?: boolean;
  /** Na telefonu prikazuje samo ikonicu (koristi se u headeru). */
  iconOnlyOnMobile?: boolean;
  className?: string;
};

export function Logo({ markSize = 36, withWordmark = true, iconOnlyOnMobile = false, className }: LogoProps) {
  return (
    <span className={`${styles.logo} ${iconOnlyOnMobile ? styles.iconOnlyOnMobile : ""} ${className ?? ""}`}>
      <Image src="/images/logo.jpg" alt="" width={markSize} height={markSize} className={styles.mark} />
      {withWordmark && <span className={styles.wordmark}>Innovation</span>}
    </span>
  );
}
