"use client";

import { useEffect } from "react";

// Zaključava skrol stranice i zatvara overlay na Escape dok je otvoren.
export function useOverlay(isOpen: boolean, onClose: () => void) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.classList.add("lock-scroll");
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("lock-scroll");
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);
}
