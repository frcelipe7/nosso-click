import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./About.module.css";
import aboutImg from "../../assets/images/About/about-img.png";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const textRefs = useRef([]);
  const buttonRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
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

      const titleChars = splitText(titleRef.current);

      gsap.fromTo(
        titleChars,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.02,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            end: "center center",
            scrub: true,
          },
        }
      );

      textRefs.current.forEach((p) => {
        const chars = splitText(p);

        gsap.fromTo(
          chars,
          { y: 10, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.002,
            ease: "power2.out",
            scrollTrigger: {
              trigger: p,
              start: "top 70%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });

      // 🔥 PARALLAX IMAGEM
      gsap.to(imageRef.current, {
        y: 80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // 🔥 BOTÃO (fade suave)
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: buttonRef.current,
            start: "top 90%",
            end: "top 70%",
            scrub: true,
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>

        {/* TEXTO */}
        <div className={styles.text}>
          <h3 className={styles.label}>NOSSO CLICK</h3>

          <h2 ref={titleRef} className={styles.title}>
            Sensibilidade, direção e conexão em cada momento
          </h2>

          <p
            ref={(el) => (textRefs.current[0] = el)}
            className={styles.description}
          >
            Mais do que registrar imagens, buscamos capturar sentimentos.
            Cada ensaio é construído com atenção aos detalhes, direção cuidadosa
            e uma conexão real com quem está sendo fotografado.
          </p>

          <p
            ref={(el) => (textRefs.current[1] = el)}
            className={styles.description}
          >
            Nosso olhar vai além da estética — ele traduz histórias,
            emoções e memórias que permanecem.
          </p>

          <button ref={buttonRef} className={styles.button}>
            Saiba mais
          </button>
        </div>

        {/* IMAGEM */}
        <div className={styles.imageWrapper}>
          <img
            ref={imageRef}
            src={aboutImg}
            alt="Sobre"
            className={styles.mainImage}
          />
        </div>

      </div>
    </section>
  );
}