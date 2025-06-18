import { useEffect, useRef, useState } from "react";
import { getColorFromFreqDiff } from "../../utils/noteUtils";
import "./graph.css";

interface GraphProps {
  freqDifference: number | null;
  centsDifference: number | null;
}

interface TrailPoint {
  x: number;
  y: number;
  id: number;
  color: string;
  element: HTMLDivElement;
}

export default function Graph({ freqDifference }: GraphProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trailPointsRef = useRef<TrailPoint[]>([]);
  const [maxShift, setMaxShift] = useState(200);
  const [gridOffsetX, setGridOffsetX] = useState(0);
  const pointIdCounter = useRef(0);
  const freqDifferenceRef = useRef(freqDifference);
  const maxShiftRef = useRef(maxShift);
  const scrollSpeed = 0.5;
  const gridSize = 20;

  // Keep refs updated
  useEffect(() => {
    freqDifferenceRef.current = freqDifference;
  }, [freqDifference]);

  useEffect(() => {
    maxShiftRef.current = maxShift;
  }, [maxShift]);

  // Calculate dynamic max shift and grid offset based on container size
  useEffect(() => {
    const updateMaxShift = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const circleWidth = 40;
        const calculatedMaxShift = (containerWidth * 0.9 - circleWidth) / 2;
        setMaxShift(Math.max(calculatedMaxShift, 50));

        // Calculate offset so a grid line passes through the center
        const centerX = containerWidth / 2;
        const offsetX = centerX % gridSize;
        setGridOffsetX(offsetX);
      }
    };

    updateMaxShift();
    window.addEventListener("resize", updateMaxShift);
    return () => window.removeEventListener("resize", updateMaxShift);
  }, []);

  // Single animation loop using direct DOM manipulation
  useEffect(() => {
    let backgroundOffset = 0;
    let lastPointTime = 0;
    const pointInterval = 100;
    const grid = gridRef.current;
    const container = containerRef.current;
    let animationId: number;

    const createTrailPointElement = (x: number, y: number, color: string) => {
      const element = document.createElement("div");
      element.className = "trail-point";
      element.style.position = "absolute";
      element.style.width = "4px";
      element.style.height = "4px";
      element.style.borderRadius = "50%";
      element.style.backgroundColor = color;
      element.style.boxShadow = `0 0 3px ${color}`;
      element.style.zIndex = "0";
      element.style.left = `calc(50% + ${x}px - 2px)`;
      element.style.top = `${y}px`;

      if (container) {
        container.appendChild(element);
      }

      return element;
    };

    const animate = (currentTime: number) => {
      // Update background
      if (grid) {
        backgroundOffset = (backgroundOffset + scrollSpeed) % gridSize;
        grid.style.backgroundPosition = `${gridOffsetX}px ${backgroundOffset}px`;
      }

      // Update trail points using direct DOM manipulation
      trailPointsRef.current = trailPointsRef.current.filter((point) => {
        point.y += scrollSpeed;
        point.element.style.top = `${point.y}px`;

        if (point.y >= 200) {
          // Remove element from DOM
          if (point.element.parentNode) {
            point.element.parentNode.removeChild(point.element);
          }
          return false;
        }
        return true;
      });

      // Add new point if needed
      if (
        freqDifferenceRef.current !== null &&
        currentTime - lastPointTime > pointInterval
      ) {
        const shift = Math.max(
          Math.min(freqDifferenceRef.current * 10, maxShiftRef.current),
          -maxShiftRef.current
        );
        const color = getColorFromFreqDiff(freqDifferenceRef.current);
        const element = createTrailPointElement(shift, 75, color);

        trailPointsRef.current.push({
          x: shift,
          y: 75,
          id: pointIdCounter.current++,
          color,
          element,
        });
        lastPointTime = currentTime;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      // Clean up all trail point elements
      trailPointsRef.current.forEach((point) => {
        if (point.element.parentNode) {
          point.element.parentNode.removeChild(point.element);
        }
      });
      trailPointsRef.current = [];
    };
  }, [gridOffsetX]);

  const shift =
    freqDifference !== null
      ? Math.max(Math.min(freqDifference * 10, maxShift), -maxShift)
      : 0;

  const currentColor = getColorFromFreqDiff(freqDifference);

  return (
    <div className="graph-container" ref={containerRef}>
      <div ref={gridRef} className="scrolling-grid" />

      <div
        className="moving-circle"
        style={{
          transform: `translateX(${shift}px)`,
          borderColor: currentColor,
        }}
      >
        {freqDifference !== null ? `${freqDifference.toFixed(0)}` : ""}
      </div>
    </div>
  );
}
