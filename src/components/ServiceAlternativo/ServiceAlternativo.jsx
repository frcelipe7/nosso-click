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
  { title: "CORPORATIVO", image: s1 },
  { title: "NATUREZA", image: s3 },
];

export default function ServiceAlternativo() {
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const headingRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      const splitText = (element) => {
        const words = element.innerText.split(" ");
        element.innerHTML = words
          .map(
            (word) => `
              <span class="${styles.word}">
                ${word
                  .split("")
                  .map((char) => `<span class="${styles.char}">${char}</span>`)
                  .join("")}
              </span>
            `
          )
          .join(" ");

        return element.querySelectorAll(`.${styles.char}`);
      };

      if (headingRef.current) {
        const chars = splitText(headingRef.current);
        const total = chars.length;

        chars.forEach((char) => {
          char.style.opacity = "0.3";
        });

        ScrollTrigger.create({
          trigger: headingRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const activeIndex = Math.floor(progress * total);

            chars.forEach((char, i) => {
              char.style.opacity = i < activeIndex ? "1" : "0.3";
            });
          },
        });
      }

      // ==========================================
      // 2. EFEITO DO SPLIT SCREEN (SERVIÇOS)
      // ==========================================
      const imageItems = gsap.utils.toArray(`.${styles.imageItem}`);
      const infoBlocks = gsap.utils.toArray(`.${styles.infoBlock}`);

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
        const currentBlock = infoBlocks[i];

        ScrollTrigger.create({
          trigger: item,
          start: "top 30%",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) {
              gsap.to(title, { y: "0%", duration: 0.8, ease: "power3.out" });
              gsap.to(otherContent, { opacity: 1, duration: 0.6, stagger: 0.1 });
              gsap.set(currentBlock, { pointerEvents: "auto" });
            } else {
              gsap.to(title, { y: "100%", duration: 0.6, ease: "power3.in" });
              gsap.to(otherContent, { opacity: 0, duration: 0.4 });
              gsap.set(currentBlock, { pointerEvents: "none" });
            }
          },
        });
      });
      
    }, containerRef); // Aplicando o contexto no wrapper geral

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.wrapper}>
      
      {/* ================= INTRODUÇÃO ================= */}
      <div className={styles.intro}>
        <h2 ref={headingRef} className={styles.heading}>
          Cada história tem uma forma de ser contada
        </h2>
        
        <p className={styles.subtext}>
          Trabalhamos com diferentes estilos fotográficos, sempre com um olhar
          sensível e focado nos seus objetivos.
        </p>
      </div>

      {/* ================= ÁREA DE SCROLL DIVIDIDO ================= */}
      <div className={styles.container} ref={containerRef}>
        
        {/* Lado Esquerdo (Fixo) */}
        <div className={styles.leftSide} ref={leftRef}>
          <div className={styles.contentWrapper}>
            {services.map((service, index) => (
              <div key={index} className={styles.infoBlock}>
                <div className={styles.titleMask}>
                  <h3 className={styles.title}>{service.title}</h3>
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

        {/* Lado Direito (Scroll) */}
        <div className={styles.rightSide}>
          {services.map((service, index) => (
            <div key={index} className={styles.imageItem}>
              <div className={styles.aspectRatioBox}>
                <img src={service.image} alt={service.title} className={styles.img} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}