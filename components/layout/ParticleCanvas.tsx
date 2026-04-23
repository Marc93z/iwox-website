'use client';

import { useEffect, useRef } from 'react';

const CONFIG = {
  particleCount: 120,
  particleSize: 2,
  connectionDistance: 150,
  speed: 0.3,
  depth: 400,
  fov: 250,
  colors: {
    particle: { r: 96, g: 165, b: 250 },
    connection: { r: 100, g: 180, b: 255 },
  },
} as const;

class Particle {
  x = 0;
  y = 0;
  z = 0;
  vx = 0;
  vy = 0;
  vz = 0;

  constructor(private width: number, private height: number) {
    this.reset();
    this.z = Math.random() * CONFIG.depth;
  }

  setBounds(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  reset() {
    this.x = Math.random() * this.width - this.width / 2;
    this.y = Math.random() * this.height - this.height / 2;
    this.z = Math.random() * CONFIG.depth;
    this.vx = (Math.random() - 0.5) * CONFIG.speed;
    this.vy = (Math.random() - 0.5) * CONFIG.speed;
    this.vz = (Math.random() - 0.5) * CONFIG.speed;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.z += this.vz;
    if (this.x < -this.width / 2 || this.x > this.width / 2) this.vx *= -1;
    if (this.y < -this.height / 2 || this.y > this.height / 2) this.vy *= -1;
    if (this.z < 0 || this.z > CONFIG.depth) this.vz *= -1;
  }

  project() {
    const scale = CONFIG.fov / (CONFIG.fov + this.z);
    return {
      x: this.x * scale + this.width / 2,
      y: this.y * scale + this.height / 2,
      scale,
    };
  }
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: Particle[] = [];
    for (let i = 0; i < CONFIG.particleCount; i++) {
      particles.push(new Particle(width, height));
    }

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      particles.forEach((p) => p.setBounds(width, height));
    };
    window.addEventListener('resize', handleResize);

    let rafId = 0;
    const animate = () => {
      ctx.fillStyle = 'rgba(5, 7, 16, 0.1)';
      ctx.fillRect(0, 0, width, height);

      const projected = particles.map((p) => {
        p.update();
        return { p, proj: p.project() };
      });
      projected.sort((a, b) => a.p.z - b.p.z);

      const c = CONFIG.colors.connection;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].proj.x - projected[j].proj.x;
          const dy = projected[i].proj.y - projected[j].proj.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONFIG.connectionDistance) {
            const opacity = Math.max(0, 1 - dist / CONFIG.connectionDistance);
            ctx.beginPath();
            ctx.moveTo(projected[i].proj.x, projected[i].proj.y);
            ctx.lineTo(projected[j].proj.x, projected[j].proj.y);
            ctx.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${opacity * 0.3})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      const pc = CONFIG.colors.particle;
      projected.forEach(({ proj }) => {
        const size = CONFIG.particleSize * proj.scale;
        const opacity = Math.max(0.3, proj.scale);
        const grad = ctx.createRadialGradient(proj.x, proj.y, 0, proj.x, proj.y, size * 3);
        grad.addColorStop(0, `rgba(${pc.r}, ${pc.g}, ${pc.b}, ${opacity * 0.8})`);
        grad.addColorStop(0.5, `rgba(${pc.r}, ${pc.g}, ${pc.b}, ${opacity * 0.4})`);
        grad.addColorStop(1, `rgba(${pc.r}, ${pc.g}, ${pc.b}, 0)`);
        ctx.beginPath();
        ctx.fillStyle = grad;
        ctx.arc(proj.x, proj.y, size * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = `rgba(${pc.r + 50}, ${pc.g + 50}, ${pc.b + 50}, ${opacity})`;
        ctx.arc(proj.x, proj.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
    />
  );
}
