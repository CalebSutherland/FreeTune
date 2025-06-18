import { useEffect, useRef, useState } from "react";
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
}

export default function Graph({ freqDifference }: GraphProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [trailPoints, setTrailPoints] = useState<TrailPoint[]>([]);
  const [maxShift, setMaxShift] = useState(200);
  const pointIdCounter = useRef(0);
  const trailPointsRef = useRef<TrailPoint[]>([]);

  // Function to get color based on frequency difference
  const getColorFromFreqDiff = (freqDiff: number | null): string => {
    if (freqDiff === null) return "var(--text-color)";

    const absDiff = Math.abs(freqDiff);

    // In tune range (green)
    if (absDiff <= 2) return "#00ff00";

    // Transition from green to yellow (2-8 Hz)
    if (absDiff <= 8) {
      const ratio = (absDiff - 2) / 6; // 0 to 1
      const red = Math.round(255 * ratio);
      return `rgb(${red}, 255, 0)`;
    }

    // Transition from yellow to red (8-20 Hz)
    if (absDiff <= 20) {
      const ratio = (absDiff - 8) / 12; // 0 to 1
      const green = Math.round(255 * (1 - ratio));
      return `rgb(255, ${green}, 0)`;
    }

    // Very out of tune (red)
    return "#ff0000";
  };

  // Calculate dynamic max shift based on container size
  useEffect(() => {
    const updateMaxShift = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const circleWidth = 40; // Circle width from CSS
        // Allow circle to move to 90% of container width minus circle size
        const calculatedMaxShift = (containerWidth * 0.9 - circleWidth) / 2;
        setMaxShift(Math.max(calculatedMaxShift, 50)); // Minimum 50px shift
      }
    };

    updateMaxShift();
    window.addEventListener("resize", updateMaxShift);

    return () => window.removeEventListener("resize", updateMaxShift);
  }, []);

  // Keep ref in sync with state
  useEffect(() => {
    trailPointsRef.current = trailPoints;
  }, [trailPoints]);

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

  // Animate trail points and add new ones
  useEffect(() => {
    let animationId: number;
    let lastPointTime = 0;
    const pointInterval = 100;

    const animate = (currentTime: number) => {
      // Update trail points
      const updatedPoints = trailPointsRef.current
        .map((point) => ({ ...point, y: point.y + 0.35 }))
        .filter((point) => point.y < 200);

      // Add new point if needed
      if (
        freqDifference !== null &&
        currentTime - lastPointTime > pointInterval
      ) {
        const shift = Math.max(
          Math.min(freqDifference * 10, maxShift),
          -maxShift
        );

        updatedPoints.push({
          x: shift,
          y: 75,
          id: pointIdCounter.current++,
          color: getColorFromFreqDiff(freqDifference),
        });

        lastPointTime = currentTime;
      }

      // Update state
      setTrailPoints(updatedPoints);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [freqDifference, maxShift]);

  // Movement: dynamic max shift based on container
  const shift =
    freqDifference !== null
      ? Math.max(Math.min(freqDifference * 10, maxShift), -maxShift)
      : 0;

  // Get current color for the moving circle
  const currentColor = getColorFromFreqDiff(freqDifference);

  return (
    <div className="graph-container" ref={containerRef}>
      <div ref={gridRef} className="scrolling-grid" />

      {/* Trail points */}
      {trailPoints.map((point) => (
        <div
          key={point.id}
          className="trail-point"
          style={{
            left: `calc(50% + ${point.x}px - 2px)`,
            top: `${point.y}px`,
            backgroundColor: point.color,
            boxShadow: `0 0 3px ${point.color}`,
          }}
        />
      ))}

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
