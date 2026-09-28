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

  // Golden Stardust Particle Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Stardust Particles
    const particleCount = Math.min(Math.floor(width / 32), 45);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.5,
      speedY: -Math.random() * 0.4 - 0.1,
      speedX: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.5 + 0.15,
      pulse: Math.random() * 0.02 + 0.005,
      goldHue: Math.random() > 0.4 ? '245, 158, 11' : '251, 191, 36'
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.alpha += Math.sin(Date.now() * p.pulse) * 0.005;

        // Wrap around viewport
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.goldHue}, ${Math.max(0.1, Math.min(0.7, p.alpha))})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#f59e0b';
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
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
