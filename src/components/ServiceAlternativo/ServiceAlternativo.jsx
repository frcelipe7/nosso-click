import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ServiceAlternativo.module.css";

// Assets
import s1 from "../../assets/images/Services/s1.jpg";
import s2 from "../../assets/images/Services/s2.jpg";
import s3 from "../../assets/images/Services/s3.jpeg";
import s4 from "../../assets/images/Services/s4.jpg";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { title: "NOIVADO", image: s2 },
  { title: "INFANTIL", image: s4 },
  { title: "PROFISSIONAL", image: s1 },
  { title: "NATUREZA", image: s3 },
];

export default function ServiceAlternativo() {
  const containerRef = useRef(null);
  const leftRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const imageItems = gsap.utils.toArray(`.${styles.imageItem}`);
      const infoBlocks = gsap.utils.toArray(`.${styles.infoBlock}`);

      // Fixamos o lado esquerdo sem adicionar espaço extra (pinSpacing: false)
      // para que o lado direito (imagens) possa correr livremente ao lado dele.
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: leftRef.current,
        pinSpacing: false,
      });

      imageItems.forEach((item, i) => {
        const title = infoBlocks[i].querySelector(`.${styles.title}`);
        const otherContent = infoBlocks[i].querySelectorAll(`.${styles.fadeContent}`);

        ScrollTrigger.create({
          trigger: item,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) {
              gsap.to(title, { y: "0%", duration: 0.8, ease: "power3.out" });
              gsap.to(otherContent, { opacity: 1, duration: 0.6, stagger: 0.1 });
            } else {
              gsap.to(title, { y: "100%", duration: 0.6, ease: "power3.in" });
              gsap.to(otherContent, { opacity: 0, duration: 0.4 });
            }
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.container} ref={containerRef}>
      
      {/* PAINEL DE TEXTO FIXO */}
      <div className={styles.leftSide} ref={leftRef}>
        <div className={styles.contentWrapper}>
          {services.map((service, index) => (
            <div key={index} className={styles.infoBlock}>
              <div className={styles.titleMask}>
                <h2 className={styles.title}>{service.title}</h2>
              </div>

              <div className={styles.fadeContent}>
                <p className={styles.description}>
                  Trabalhamos com fotografia de {service.title.toLowerCase()},
                  capturando momentos com sensibilidade, direção e estética refinada.
                </p>

                <button className={styles.btn}>
                  Baixar Portfólio
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GALERIA DE IMAGENS (SCROLL) */}
      <div className={styles.rightSide}>
        {services.map((service, index) => (
          <div key={index} className={styles.imageItem}>
            <div className={styles.aspectRatioBox}>
              <img src={service.image} alt={service.title} className={styles.img} />
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}