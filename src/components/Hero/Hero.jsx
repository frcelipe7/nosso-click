import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import styles from "./Hero.module.css";
import bgImg from "../../assets/images/Hero/bgImg.png";

export default function Hero({ onHeroReady }) {
  const imageRef = useRef();
  const contentRef = useRef();
  const hasAnimated = useRef(false); // 🔥 evita rodar 2x
  const [loaded, setLoaded] = useState(false);

  useLayoutEffect(() => {
    if (!loaded || hasAnimated.current) return;
    hasAnimated.current = true;

    const tl = gsap.timeline();

    // 🔥 MÁSCARA CORRIGIDA (usa 150% pra cobrir tudo)
    tl.fromTo(
      imageRef.current,
      { clipPath: "circle(0% at 50% 50%)", scale: 1.1 },
      { clipPath: "circle(5% at 50% 50%)", duration: 0.25 }
    )
      .to(imageRef.current, {
        clipPath: "circle(15% at 50% 50%)",
        duration: 0.25,
        delay: 0.08,
      })
      .to(imageRef.current, {
        clipPath: "circle(25% at 50% 50%)",
        duration: 0.3,
        delay: 0.08,
      })
      .to(imageRef.current, {
        clipPath: "circle(150% at 50% 50%)", // 🔥 resolve corte
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
      });

    // 🔥 dispara header no momento certo
    tl.add(() => onHeroReady && onHeroReady(), "-=0.4");

    // 🔥 texto entra
    tl.fromTo(
      contentRef.current.children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.3"
    );

  }, [loaded, onHeroReady]);

  return (
    <section className={styles.hero}>

      <img
        ref={imageRef}
        src={bgImg}
        alt="Hero"
        className={styles.image}
        onLoad={() => setLoaded(true)}
      />

      <div className={styles.content} ref={contentRef}>
        <h1 className={styles.title}>
          the RAPH <br /> RAPH/RANY
        </h1>

        <p className={styles.subtitle}>
          Fotografia autoral com sensibilidade, direção e conexão com cada momento
        </p>

        <button className={styles.button}>
          Ver Portfólio
        </button>
      </div>

    </section>
  );
}