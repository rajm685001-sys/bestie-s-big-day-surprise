import { useEffect, useState, useCallback } from "react";

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  size: number;
  delay: number;
  duration: number;
  rotate: number;
}

const COLORS = [
  "hsl(340 80% 65%)",
  "hsl(45 90% 60%)",
  "hsl(270 50% 70%)",
  "hsl(160 60% 55%)",
  "hsl(200 70% 60%)",
];

const Confetti = ({ active, count = 60 }: { active: boolean; count?: number }) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  const generate = useCallback(() => {
    setPieces(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 8 + 4,
        delay: Math.random() * 1,
        duration: Math.random() * 2 + 2,
        rotate: Math.random() * 360,
      }))
    );
  }, [count]);

  useEffect(() => {
    if (active) {
      generate();
      const t = setTimeout(() => setPieces([]), 4000);
      return () => clearTimeout(t);
    }
  }, [active, generate]);

  if (!active || pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute animate-confetti"
          style={{
            left: `${p.x}%`,
            top: -20,
            width: p.size,
            height: p.size * 1.5,
            backgroundColor: p.color,
            borderRadius: p.size > 8 ? "50%" : "2px",
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
