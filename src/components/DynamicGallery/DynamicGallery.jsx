import { useState, useEffect } from "react";
import styles from "./DynamicGallery.module.css";

const images = [
  "/g1.jpg",
  "/g2.jpg",
  "/g3.jpg",
  "/g4.jpg",
  "/g5.jpg",
  "/g6.jpg",
  "/g7.jpg",
];

const initialGrid = [
  { id: 1, class: "large", image: images[0] },
  { id: 2, class: "", image: images[1] },
  { id: 3, class: "", image: images[2] },
  { id: 4, class: "tall", image: images[3] },
  { id: 5, class: "", image: images[4] },
  { id: 6, class: "", image: images[5] },
];

export default function DynamicGallery() {
  const [grid, setGrid] = useState(initialGrid);

  useEffect(() => {
    const interval = setInterval(() => {
      setGrid((prev) =>
        prev.map((cell) =>
          Math.random() > 0.7
            ? {
                ...cell,
                image: images[Math.floor(Math.random() * images.length)],
              }
            : cell
        )
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.section}>
      
      <div className={styles.grid}>
        {grid.map((cell) => (
          <div
            key={cell.id}
            className={`${styles.item} ${styles[cell.class]}`}
          >
            <img
              src={cell.image}
              className={styles.image}
              alt=""
            />

            <div className={styles.overlay}></div>
          </div>
        ))}
      </div>

    </section>
  );
}