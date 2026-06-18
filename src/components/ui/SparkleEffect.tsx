import { useEffect, useRef, useState } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  animationDuration: number;
  animationDelay: number;
}

interface SparkleEffectProps {
  trigger: number;
  isLoading: boolean;
  originRef: React.RefObject<HTMLElement | null>;
}

const SPARKLE_COLORS = [
  "#FFD700", // Gold
  "#FF6B6B", // Coral
  "#4ECDC4", // Teal
  "#45B7D1", // Sky blue
  "#96CEB4", // Sage
  "#FFEAA7", // Light yellow
  "#DDA0DD", // Plum
  "#98D8C8", // Mint
  "#F7DC6F", // Soft gold
  "#BB8FCE", // Lavender
];

const createSparkles = (centerX: number, centerY: number, count: number): Sparkle[] => {
  const newSparkles: Sparkle[] = [];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 120 + 30;
    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;

    newSparkles.push({
      id: Date.now() + Math.random(),
      x,
      y,
      size: Math.random() * 10 + 4,
      color: SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
      animationDuration: Math.random() * 1.5 + 0.8,
      animationDelay: Math.random() * 0.5,
    });
  }
  return newSparkles;
};

export const SparkleEffect = ({ trigger, isLoading, originRef }: SparkleEffectProps) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (trigger === 0 || !originRef.current) return;

    const rect = originRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const initialSparkles = createSparkles(centerX, centerY, 25);
    setSparkles(initialSparkles);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [trigger, originRef]);

  useEffect(() => {
    if (!isLoading || !originRef.current) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    const rect = originRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    intervalRef.current = setInterval(() => {
      setSparkles((prev) => {
        const fresh = createSparkles(centerX, centerY, 8);
        const cutoff = Date.now() - 3000;
        const alive = prev.filter((s) => s.id > cutoff);
        return [...alive, ...fresh];
      });
    }, 300);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isLoading, originRef]);

  useEffect(() => {
    if (isLoading) return;

    const timer = setTimeout(() => {
      setSparkles([]);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          style={{
            position: "absolute",
            left: sparkle.x,
            top: sparkle.y,
            width: sparkle.size,
            height: sparkle.size,
            backgroundColor: sparkle.color,
            borderRadius: "50%",
            animation: `sparkle ${sparkle.animationDuration}s ease-out ${sparkle.animationDelay}s forwards`,
            boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.color}`,
          }}
        />
      ))}
      <style>
        {`
          @keyframes sparkle {
            0% {
              transform: scale(0) rotate(0deg);
              opacity: 1;
            }
            30% {
              transform: scale(1.2) rotate(120deg);
              opacity: 1;
            }
            60% {
              transform: scale(0.8) rotate(240deg);
              opacity: 0.6;
            }
            100% {
              transform: scale(0) rotate(360deg);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};
