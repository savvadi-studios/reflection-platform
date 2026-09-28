import React, { useEffect, useState, useRef } from 'react';

export default function AmbientBackground() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [smoothPos, setSmoothPos] = useState({ x: -1000, y: -1000 });
  const canvasRef = useRef(null);

  // Mouse Spotlight Tracking with smooth interpolation
  useEffect(() => {
    let animationId;
    let targetX = -1000;
    let targetY = -1000;
    let currentX = -1000;
    let currentY = -1000;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY + window.scrollY;
    };

    const updatePosition = () => {
      // Linear interpolation for smooth trailing glow
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      setSmoothPos({ x: Math.round(currentX), y: Math.round(currentY) });
      animationId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Interactive Constellation & Stardust Particle Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = { x: -1000, y: -1000 };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Constellation Nodes
    const count = Math.min(Math.floor(width / 26), 60);
    const nodes = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 0.8,
      baseAlpha: Math.random() * 0.45 + 0.2,
      color: Math.random() > 0.3 ? '245, 158, 11' : (Math.random() > 0.5 ? '251, 191, 36' : '6, 182, 212')
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw connections between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 95) {
            const lineAlpha = (1 - dist / 95) * 0.16;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(245, 158, 11, ${lineAlpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // 2. Draw dynamic interactive filament web to mouse cursor
      if (mouse.x > 0 && mouse.y > 0) {
        for (let i = 0; i < nodes.length; i++) {
          const dx = nodes[i].x - mouse.x;
          const dy = nodes[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const filamentAlpha = (1 - dist / 150) * 0.35;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(251, 191, 36, ${filamentAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Magnetic gentle draw toward cursor
            nodes[i].x += (mouse.x - nodes[i].x) * 0.003;
            nodes[i].y += (mouse.y - nodes[i].y) * 0.003;
          }
        }
      }

      // 3. Update & render each node with ambient radial glow
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;

        // Bounce/wrap borders
        if (n.x < 0) n.x = width;
        if (n.x > width) n.x = 0;
        if (n.y < 0) n.y = height;
        if (n.y > height) n.y = 0;

        // Core Dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${n.color}, ${n.baseAlpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${n.color}, 0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      
      {/* 1. Interactive Cursor Follower Spotlight */}
      <div 
        className="absolute rounded-full transition-opacity duration-300 opacity-80"
        style={{
          width: '700px',
          height: '700px',
          left: `${smoothPos.x - 350}px`,
          top: `${smoothPos.y - 350}px`,
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.065) 0%, rgba(234, 88, 12, 0.025) 45%, transparent 70%)',
          filter: 'blur(45px)',
          willChange: 'left, top',
          transform: 'translateZ(0)'
        }}
      />

      {/* 2. Floating Atmospheric Aurora Orbs (Slow Organic Drift) */}
      
      {/* Orb 1: Upper Gold Glow */}
      <div 
        className="absolute -top-[15%] left-[10%] w-[650px] h-[650px] rounded-full bg-gradient-to-br from-amber-500/18 via-orange-600/10 to-transparent blur-[140px] animate-pulse-glow"
        style={{ animationDuration: '9s' }}
      />

      {/* Orb 2: Mid-Right Saffron & Crimson Radiance */}
      <div 
        className="absolute top-[35%] -right-[10%] w-[750px] h-[750px] rounded-full bg-gradient-to-bl from-orange-600/14 via-amber-700/8 to-transparent blur-[160px] animate-pulse-glow"
        style={{ animationDuration: '12s', animationDelay: '-3s' }}
      />

      {/* Orb 3: Mid-Left Royal Indigo Balance */}
      <div 
        className="absolute top-[60%] -left-[12%] w-[680px] h-[680px] rounded-full bg-gradient-to-tr from-indigo-600/12 via-blue-900/6 to-transparent blur-[150px] animate-pulse-glow"
        style={{ animationDuration: '14s', animationDelay: '-6s' }}
      />

      {/* Orb 4: Lower Cartography Cyan / Gold Halo */}
      <div 
        className="absolute bottom-[-10%] right-[15%] w-[800px] h-[800px] rounded-full bg-gradient-to-t from-amber-500/14 via-cyan-900/8 to-transparent blur-[170px] animate-pulse-glow"
        style={{ animationDuration: '11s', animationDelay: '-4s' }}
      />

      {/* 3. Subtle Luxury Architectural Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.028] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 90% 70% at 50% 50%, #000 60%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 50%, #000 60%, transparent 100%)'
        }}
      />

      {/* 4. Fine Film Grain Texture Vignette */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* 5. Fixed Canvas for Floating Golden Stardust Specks */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-70"
      />

    </div>
  );
}
