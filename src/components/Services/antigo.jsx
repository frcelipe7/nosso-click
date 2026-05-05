import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Services.module.css";

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

export default function Services() {
  const containerRef = useRef(null);
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
                  .map(
                    (char) =>
                      `<span class="${styles.char}">${char}</span>`
                  )
                  .join("")}
              </span>
            `
          )
          .join(" ");

        return element.querySelectorAll(`.${styles.char}`);
      };

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

      const blocks = gsap.utils.toArray(`.${styles.serviceBlock}`);

      blocks.forEach((block) => {
        const title = block.querySelector(`.${styles.bigTitle}`);
        const image = block.querySelector(`.${styles.imageWrapper}`);

        // título fixo no centro
        ScrollTrigger.create({
          trigger: block,
          start: "top 10%",
          end: "bottom bottom",
          pin: title,
          pinSpacing: false,
        });

        // imagem sobe cobrindo
        gsap.fromTo(
          image,
          { y: "100vh" },
          {
            y: "-10vh",
            ease: "none",
            scrollTrigger: {
              trigger: block,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={containerRef}>
      
      {/* INTRO */}
      <div className={styles.intro}>
        <h2 ref={headingRef} className={styles.heading}>
          Cada história tem uma forma de ser contada
        </h2>

        <p className={styles.subtext}>
          Trabalhamos com diferentes estilos fotográficos, sempre com um olhar
          sensível e focado nos seus objetivos.
        </p>
      </div>

      {/* SERVIÇOS */}
      {services.map((service, index) => (
        <div key={index} className={styles.serviceBlock}>
          
          <div className={styles.titleContainer}>
            <h3 className={styles.bigTitle}>{service.title}</h3>
          </div>

          <div className={styles.imageWrapper}>
            <div className={styles.aspectRatioBox}>
              <img
                src={service.image}
                alt={service.title}
                className={styles.image}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          </div>

        </div>
      ))}

    </section>
  );
}