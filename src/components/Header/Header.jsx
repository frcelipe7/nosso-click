import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Header.module.css";

export default function Header({ show }) {
  const headerRef = useRef();

  useEffect(() => {
    if (!show) return;

    gsap.to(headerRef.current, {
      y: 0, // 🔥 não empurra mais
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
    });
  }, [show]);

  return (
    <header ref={headerRef} className={styles.header}>
      <div className={styles.container}>
        
        <nav className={styles.nav}>
          <a href="#">Home</a>
          <a href="#">Sobre</a>
          <a href="#">Serviços</a>
        </nav>

        <div className={styles.logo}>
          NOSSO CLICK
        </div>

        <div className={styles.actions}>
          <button className={styles.cta}>
            Agendar
          </button>
        </div>

      </div>
    </header>
  );
}