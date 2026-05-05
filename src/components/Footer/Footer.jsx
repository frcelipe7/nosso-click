import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      
      <div className={styles.container}>

        {/* ESQUERDA */}
        <div className={styles.left}>
          <h3 className={styles.logo}>NOSSO CLICK</h3>

          <p className={styles.description}>
            Fotografia autoral com sensibilidade, direção e conexão.
            Cada ensaio é pensado para capturar momentos únicos com
            elegância e significado.
          </p>

          <div className={styles.dots}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* CENTRO */}
        <div className={styles.links}>
          <p>Home</p>
          <p>Sobre</p>
          <p>Serviços</p>
          <p>Contato</p>
        </div>

        {/* DIREITA */}
        <div className={styles.right}>
          <p className={styles.ctaText}>
            Vamos criar algo único para você
          </p>

          <button className={styles.ctaButton}>
            Agendar Sessão
          </button>
        </div>

      </div>

      {/* BOTTOM */}
      <div className={styles.bottom}>
        <p>© 2026 Nosso Click — Todos os direitos reservados</p>
      </div>

    </footer>
  );
}