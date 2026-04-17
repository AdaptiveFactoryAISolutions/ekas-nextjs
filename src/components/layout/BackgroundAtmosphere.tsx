"use client";

import { useEffect } from "react";

const BackgroundAtmosphere = () => {
  useEffect(() => {
    const canvas = document.getElementById("particle-field") as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 28 : 55;
    const CONNECTION_DISTANCE = isMobile ? 100 : 140;
    const COLOR = "rgba(0,200,255,";

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      radius: Math.random() * 1.4 + 0.4,
      opacity: Math.random() * 0.4 + 0.15,
    }));

    let animationId: number;

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.12;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = COLOR + alpha + ")";
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      }

      particles.forEach((p) => {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = COLOR + p.opacity + ")";
        ctx!.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = canvas!.width + 10;
        if (p.x > canvas!.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas!.height + 10;
        if (p.y > canvas!.height + 10) p.y = -10;
      });

      animationId = requestAnimationFrame(draw);
    }

    draw();

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        draw();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", setSize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div
      id="bg-atmosphere"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Fixed background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(/hero-bg.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          opacity: 0.58,
          transform: "scale(1.03)",
        }}
      />
      {/* Dark overlay to maintain readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(10,14,26,0.08) 0%, rgba(10,14,26,0.28) 45%, rgba(10,14,26,0.5) 100%)",
        }}
      />
      {/* Orb 1 — top left */}
      <div
        style={{
          position: "absolute",
          top: -200,
          left: -200,
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,200,255,0.055) 0%, rgba(0,200,255,0.018) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      {/* Orb 2 — center right */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          right: -150,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,200,255,0.035) 0%, rgba(0,200,255,0.010) 45%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      {/* Orb 3 — bottom center */}
      <div
        style={{
          position: "absolute",
          bottom: -100,
          left: "50%",
          transform: "translateX(-50%)",
          width: 900,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,200,255,0.040) 0%, rgba(0,150,200,0.012) 50%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      {/* Orb 4 — top right accent */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "10%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,200,255,0.028) 0%, transparent 65%)",
          filter: "blur(30px)",
        }}
      />
      {/* Particle canvas */}
      <canvas
        id="particle-field"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.6,
        }}
      />
    </div>
  );
};

export default BackgroundAtmosphere;
