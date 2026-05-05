import { useEffect, useState  } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Statement from "./components/Statement/Statement";
import Services from "./components/Services/Services";
import ServiceAlternativo from "./components/ServiceAlternativo/ServiceAlternativo";
import CTA from "./components/CTA/CTA";
import DynamicGallery from "./components/DynamicGallery/DynamicGallery";
import Footer from "./components/Footer/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      smoothTouch: false,
    });

    // sincroniza com GSAP
    lenis.on("scroll", ScrollTrigger.update);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // MUITO IMPORTANTE
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length
          ? lenis.scrollTo(value)
          : lenis.scroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
    });

    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main>
      <Header show={heroReady} />
      <Hero onHeroReady={() => setHeroReady(true)} />
      <About />
      <Statement />
      {/* <Services /> */}
      <ServiceAlternativo />
      <CTA />
      {/* <DynamicGallery /> */}
      <Footer />
    </main>
  );
}