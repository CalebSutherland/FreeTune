import { useEffect, useRef } from "react";
import "./graph.css";

interface GraphProps {
  freqDifference: number | null;
  centsDifference: number | null;
}

export default function Graph({ freqDifference }: GraphProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  // Animate background scrolling
  useEffect(() => {
    let offset = 0;
    const grid = gridRef.current;
    let animationId: number;

    const animate = () => {
      if (grid) {
        offset = (offset + 0.35) % 20;
        grid.style.backgroundPosition = `10px ${offset}px`;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  // Movement: max 100px left or right
  const maxShift = 200;
  const shift =
    freqDifference !== null
      ? Math.max(Math.min(freqDifference * 10, maxShift), -maxShift)
      : 0;

  return (
    <div className="graph-container">
      <div ref={gridRef} className="scrolling-grid" />

      <div
        className="moving-circle"
        style={{ transform: `translateX(${shift}px)` }}
      >
        {freqDifference !== null ? `${freqDifference.toFixed(0)}` : ""}
      </div>
    </div>
  );
}
