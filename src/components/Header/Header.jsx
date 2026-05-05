import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./Header.module.css";

export default function Header({ show }) {
  const headerRef = useRef();
  const [isDark, setIsDark] = useState(false); // Estado do tema

  // Animação de entrada do Header
  useEffect(() => {
    if (!show) return;

    gsap.to(headerRef.current, {
      y: 0, 
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
    });
  }, [show]);

  // Efeito que injeta o atributo data-theme no HTML
  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [isDark]);

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
          {/* 🔥 Botão de Tema */}
          <button 
            className={styles.themeBtn} 
            onClick={() => setIsDark(!isDark)}
            aria-label="Alternar tema"
          >
            {isDark ? "☀️" : "🌙"}
          </button>

          <button className={styles.cta}>
            Agendar
          </button>
          <button className={styles.cta}>
            Sociais
          </button>
        </div>

      </div>
    </header>
  );
}