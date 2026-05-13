import { useEffect, useRef } from 'react';

interface Trail {
  x: number;
  y: number;
  alpha: number;
  size: number;
}

export default function Cursor3D() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const trails = useRef<Trail[]>([]);

  useEffect(() => {
    // hide the system cursor
    document.body.style.cursor = 'none';

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };

      trails.current.push({
        x: e.clientX,
        y: e.clientY,
        alpha: 1,
        size: 4,
      });
      if (trails.current.length > 18) trails.current.shift();
    };

    const onEnterLink = () => {
      cursorRef.current?.classList.add('cursor-hover');
    };
    const onLeaveLink = () => {
      cursorRef.current?.classList.remove('cursor-hover');
    };

    window.addEventListener('mousemove', onMove);
    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });

    // Outer ring — smooth lag
    let ringX = -100;
    let ringY = -100;
    let frame: number;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      frame = requestAnimationFrame(animate);

      // Smooth follow for outer ring
      ringX += (pos.current.x - ringX) * 0.12;
      ringY += (pos.current.y - ringY) * 0.12;
      dotPos.current.x += (pos.current.x - dotPos.current.x) * 0.35;
      dotPos.current.y += (pos.current.y - dotPos.current.y) * 0.35;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x - 3}px, ${dotPos.current.y - 3}px)`;
      }

      // Trail canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      trails.current.forEach((t, i) => {
        const ratio = i / trails.current.length;
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.size * ratio, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, ${Math.floor(200 + ratio * 55)}, ${ratio * 0.6})`;
        ctx.shadowBlur = 8 * ratio;
        ctx.shadowColor = '#00ff00';
        ctx.fill();
        t.alpha -= 0.05;
      });
      trails.current = trails.current.filter(t => t.alpha > 0);
    };
    animate();

    return () => {
      document.body.style.cursor = '';
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      {/* Trail canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[99998] pointer-events-none"
      />

      {/* Outer ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[99999] pointer-events-none"
        style={{ willChange: 'transform' }}
      >
        <div
          className="w-10 h-10 rounded-full border border-primary/70 flex items-center justify-center transition-all duration-200"
          style={{
            boxShadow: '0 0 12px rgba(0,255,0,0.5), inset 0 0 8px rgba(0,255,0,0.1)',
          }}
          id="cursor-ring"
        />
      </div>

      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[99999] pointer-events-none w-1.5 h-1.5 rounded-full bg-primary"
        style={{
          boxShadow: '0 0 10px rgba(0,255,0,1), 0 0 20px rgba(0,255,0,0.5)',
          willChange: 'transform',
        }}
      />

      <style>{`
        #cursor-ring { transition: transform 0.1s, width 0.2s, height 0.2s; }
        .cursor-hover #cursor-ring {
          transform: scale(1.6);
          border-color: rgba(0,255,255,0.9);
          box-shadow: 0 0 20px rgba(0,255,255,0.6), inset 0 0 12px rgba(0,255,255,0.15);
        }
      `}</style>
    </>
  );
}
