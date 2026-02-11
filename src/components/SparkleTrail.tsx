import { useEffect, useRef, useCallback } from "react";

interface Sparkle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  id: number;
}

const COLORS = [
  "hsl(340 80% 70%)",
  "hsl(45 100% 70%)",
  "hsl(270 60% 75%)",
  "hsl(200 80% 70%)",
  "hsl(160 60% 65%)",
];

const SparkleTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparklesRef = useRef<Sparkle[]>([]);
  const idRef = useRef(0);
  const animRef = useRef<number>(0);

  const addSparkle = useCallback((x: number, y: number) => {
    const count = 2 + Math.floor(Math.random() * 2);
    for (let i = 0; i < count; i++) {
      sparklesRef.current.push({
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        size: Math.random() * 4 + 2,
        opacity: 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        id: idRef.current++,
      });
    }
    // Keep max 100 sparkles
    if (sparklesRef.current.length > 100) {
      sparklesRef.current = sparklesRef.current.slice(-100);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => addSparkle(e.clientX, e.clientY);
    const handleTouch = (e: TouchEvent) => {
      for (let i = 0; i < e.touches.length; i++) {
        addSparkle(e.touches[i].clientX, e.touches[i].clientY);
      }
    };

    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("touchmove", handleTouch, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparklesRef.current = sparklesRef.current.filter((s) => s.opacity > 0.01);
      
      for (const s of sparklesRef.current) {
        ctx.save();
        ctx.globalAlpha = s.opacity;
        ctx.fillStyle = s.color;
        
        // Draw a 4-pointed star
        ctx.beginPath();
        const r = s.size;
        for (let i = 0; i < 4; i++) {
          const angle = (i * Math.PI) / 2;
          ctx.lineTo(s.x + Math.cos(angle) * r, s.y + Math.sin(angle) * r);
          const midAngle = angle + Math.PI / 4;
          ctx.lineTo(s.x + Math.cos(midAngle) * r * 0.3, s.y + Math.sin(midAngle) * r * 0.3);
        }
        ctx.closePath();
        ctx.fill();
        
        // Glow
        ctx.shadowBlur = 8;
        ctx.shadowColor = s.color;
        ctx.fill();
        ctx.restore();
        
        s.opacity -= 0.025;
        s.y -= 0.3;
        s.size *= 0.995;
      }
      
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("touchmove", handleTouch);
      cancelAnimationFrame(animRef.current);
    };
  }, [addSparkle]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[999]"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

export default SparkleTrail;

