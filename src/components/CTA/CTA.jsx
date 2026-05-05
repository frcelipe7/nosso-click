import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./CTA.module.css";

import f1 from "../../assets/images/CTA/f1.jpeg";
import f2 from "../../assets/images/CTA/f2.jpeg";
import f3 from "../../assets/images/CTA/f3.jpeg";
import f4 from "../../assets/images/CTA/f4.jpeg";
import f5 from "../../assets/images/CTA/f5.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef(null);
  const imagesRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      imagesRef.current.forEach((img) => {
        const speed = parseFloat(img.dataset.speed);

        gsap.to(img, {
          y: speed,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>

      {/* IMAGENS FLUTUANTES */}
      <img
        src={f1}
        ref={(el) => (imagesRef.current[0] = el)}
        data-speed="80"
        className={`${styles.img} ${styles.i1}`}
      />

      <img
        src={f2}
        ref={(el) => (imagesRef.current[1] = el)}
        data-speed="-150"
        className={`${styles.img} ${styles.i2}`}
      />

      <img
        src={f3}
        ref={(el) => (imagesRef.current[2] = el)}
        data-speed="120"
        className={`${styles.img} ${styles.i3}`}
      />

      <img
        src={f4}
        ref={(el) => (imagesRef.current[3] = el)}
        data-speed="-60"
        className={`${styles.img} ${styles.i4}`}
      />

      <img
        src={f5}
        ref={(el) => (imagesRef.current[4] = el)}
        data-speed="-200"
        className={`${styles.img} ${styles.i5}`}
      />

      {/* CONTEÚDO */}
      <div className={styles.content}>
        <h2 className={styles.title}>
          Vamos registrar o que<br /> realmente importa?
        </h2>

        <p className={styles.text}>
          Seja fotografia pessoal, de produto comemorações ou eventos, somos 
          a escolha certa para transformar seu projeto em algo memorável
        </p>

        <div className={styles.buttons}>
          <button className={styles.outline}>
            Baixar Portfólio
          </button>

          <button className={styles.filled}>
            Agendar Sessão
          </button>
        </div>
      </div>

    </section>
  );
}