import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let points: { x: number; y: number; age: number }[] = [];
    const maxPoints = 30; // Length of the tail memory
    let animationFrameId: number;

    let mouseX = -100;
    let mouseY = -100;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
      
      points.unshift({ x: mouseX, y: mouseY, age: 0 });
    };

    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (points.length > 0) {
        if (points[0].x === mouseX && points[0].y === mouseY) {
          points[0].age += 1;
          if (points[0].age > 2) {
             points.unshift({ x: mouseX, y: mouseY, age: 0 });
          }
        }
      }

      for (let i = 0; i < points.length; i++) {
        points[i].age += 1;
      }
      points = points.filter((p, index) => index < maxPoints && p.age < 50);

      if (points.length > 2) {
        // Use screen mode so that overlapping semi-transparent segments glow instead of looking muddy/dark
        ctx.globalCompositeOperation = "screen";
        
        // We draw from tail to head
        for (let i = points.length - 2; i >= 1; i--) {
          const pt = points[i];
          const nextPt = points[i - 1]; // point closer to the cursor head
          const prevPt = points[i + 1]; // point closer to the tail end
          
          // Calculate midpoints to draw smooth sweeping bezier curves
          const midX1 = (prevPt.x + pt.x) / 2;
          const midY1 = (prevPt.y + pt.y) / 2;
          
          const midX2 = (pt.x + nextPt.x) / 2;
          const midY2 = (pt.y + nextPt.y) / 2;

          const fraction = i / points.length; 
          
          // Smooth taper
          const thickness = Math.max(0.1, 14 * (1 - fraction));
          const alpha = Math.max(0, 1 - fraction);

          ctx.beginPath();
          ctx.moveTo(midX1, midY1);
          // quadratic curve through the actual point to the next midpoint
          ctx.quadraticCurveTo(pt.x, pt.y, midX2, midY2);

          ctx.lineWidth = thickness;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          // Core streak
          ctx.strokeStyle = `rgba(247, 195, 95, ${alpha})`;
          
          // Soft blue atmospheric glow
          ctx.shadowBlur = 24;
          ctx.shadowColor = `rgba(96, 165, 250, ${alpha * 0.9})`;

          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998] mix-blend-screen"
      />
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] flex items-center justify-center mix-blend-screen will-change-transform top-0 left-0"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      >
        <div className="comet-cursor-head">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.9))' }}
          >
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
      </div>
    </>
  );
}
