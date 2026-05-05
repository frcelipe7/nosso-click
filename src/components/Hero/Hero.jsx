import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import styles from "./Hero.module.css";
import bgImg from "../../assets/images/Hero/bgImg.webp";

export default function Hero({ startAnimation, onHeroReady }) {
  const imageRef = useRef();
  const contentRef = useRef();
  const hasAnimated = useRef(false);
  const [loaded, setLoaded] = useState(false);

  // =========================================================
  // 1. O PREPARO (Roda só 1x assim que o site abre)
  // =========================================================
  useLayoutEffect(() => {
    // Esconde a imagem e o texto instantaneamente para não piscar 
    // enquanto o preloader está na tela.
    gsap.set(imageRef.current, { clipPath: "circle(0% at 50% 50%)", scale: 1.1 });
    gsap.set(contentRef.current.children, { y: 30, opacity: 0 });
  }, []);

  // =========================================================
  // 2. AÇÃO (Sua timeline original)
  // =========================================================
  useLayoutEffect(() => {
    // 🔥 A trava mágica: Só passa daqui se a imagem baixou E o preloader sumiu!
    if (!loaded || !startAnimation || hasAnimated.current) return;
    
    hasAnimated.current = true;

    const tl = gsap.timeline();

    // MÁSCARA (A sua lógica original que funciona perfeitamente)
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
        clipPath: "circle(150% at 50% 50%)", 
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
      });

    // Dispara header no momento certo
    tl.add(() => onHeroReady && onHeroReady(), "-=0.4");

    // Texto entra
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

  }, [loaded, startAnimation, onHeroReady]);

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