import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Statement.module.css";

import f1 from "../../assets/images/Statement/f1.webp";
import f2 from "../../assets/images/Statement/f2.webp";
import f3 from "../../assets/images/Statement/f3.webp";
import f4 from "../../assets/images/Statement/f4.webp";
import f5 from "../../assets/images/Statement/f5.webp";

gsap.registerPlugin(ScrollTrigger);

export default function Statement() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imagesRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // 🔹 SPLIT TEXT (SEM QUEBRAR PALAVRAS)
      const splitText = (element) => {
        const words = element.innerText.split(" ");

        element.innerHTML = words
          .map((word) => {
            return `
              <span class="${styles.word}">
                ${word
                  .split("")
                  .map(
                    (char) =>
                      `<span class="${styles.char}">${char}</span>`
                  )
                  .join("")}
              </span>
            `;
          })
          .join(" ");

        return element.querySelectorAll(`.${styles.char}`);
      };

      const chars = splitText(textRef.current);

      // 🔤 ANIMAÇÃO DO TEXTO (scroll)
      gsap.fromTo(
        chars,
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.02,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
            end: "center center",
            scrub: true,
          },
        }
      );

      // 🌊 PARALLAX NAS IMAGENS (baseado no tamanho)
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

      {/* IMAGENS */}
      <img
        src={f1}
        ref={(el) => (imagesRef.current[0] = el)}
        data-speed="20"
        className={`${styles.img} ${styles.i1}`}
      />
      <img
        src={f2}
        ref={(el) => (imagesRef.current[1] = el)}
        data-speed="-300"
        className={`${styles.img} ${styles.i2}`}
      />
      <img
        src={f3}
        ref={(el) => (imagesRef.current[2] = el)}
        data-speed="100"
        className={`${styles.img} ${styles.i3}`}
      />
      <img
        src={f4}
        ref={(el) => (imagesRef.current[3] = el)}
        data-speed="-200"
        className={`${styles.img} ${styles.i4}`}
      />
      <img
        src={f5}
        ref={(el) => (imagesRef.current[4] = el)}
        data-speed="300"
        className={`${styles.img} ${styles.i5}`}
      />

      {/* TEXTO */}
      <div className={styles.content}>
        <p ref={textRef} className={styles.text}>
          Algumas histórias merecem mais do que serem lembradas.
          Elas merecem ser sentidas novamente.
        </p>
      </div>

    </section>
  );
}