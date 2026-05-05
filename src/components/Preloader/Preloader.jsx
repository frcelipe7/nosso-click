import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./Preloader.module.css";

export default function Preloader({ onComplete }) {
  const overlayRef = useRef(null);
  const ballRef = useRef(null);
  const pulseAnim = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 1. Animação de pulsar (10px até 20px)
    // Como a bola tem 10px no CSS, scale: 2 faz ela ir para 20px
    pulseAnim.current = gsap.to(ballRef.current, {
      scale: 2, 
      duration: 0.6,
      repeat: -1, // Loop infinito
      yoyo: true, // Vai e volta
      ease: "power1.inOut",
    });

    // 2. Lógica para detectar o carregamento total (Imagens, fontes, etc)
    const handleLoad = () => {
      // Adicionamos um pequeno delay extra (opcional) só para garantir a fluidez
      setTimeout(() => setIsLoaded(true), 500);
    };

    // Verifica se a página já carregou (útil para navegação rápida)
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  // 3. Animação de saída quando o carregamento termina
  useEffect(() => {
    if (isLoaded) {
      pulseAnim.current.kill(); // Para o batimento cardíaco da bola

      const tl = gsap.timeline({
        onComplete: () => {
          // Avisa o componente pai (App/Home) que terminou para rodar a animação da imagem
          if (onComplete) onComplete(); 
        }
      });

      // A bola encolhe até sumir...
      tl.to(ballRef.current, {
        scale: 0,
        duration: 0.4,
        ease: "back.in(1.5)",
      })
      // ...e o fundo desaparece revelando o site
      .to(overlayRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
      })
      // Esconde do DOM para não bloquear cliques no site
      .set(overlayRef.current, { display: "none" }); 
    }
  }, [isLoaded, onComplete]);

  return (
    <div className={styles.overlay} ref={overlayRef}>
      <div className={styles.ball} ref={ballRef}></div>
    </div>
  );
}