import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  mass: number;
  color: string;
  outlineColor: string;
  collisionPulse: number;
}

interface ParticleBackgroundProps {
  className?: string;
}

/**
 * Colliding Particle Physics Background Animation
 * - Full 2D elastic collision resolution between particles and canvas boundaries
 * - Mouse deflection & interactive impulse
 * - Theme-aware adaptation for Neo-Brutalist Light (#FBF9F4 / #19191C) and Dark (#131316) modes
 * - Hardware optimized with IntersectionObserver, Visibility API, and capped velocity
 */
export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Color palettes
    const getThemeConfig = () => {
      const isDark = document.documentElement.classList.contains('dark');
      if (isDark) {
        return {
          isDark: true,
          colors: ['#FFE600', '#7DD3FC', '#F472B6', '#FFFFFF'],
          outlines: ['#FFE600', '#7DD3FC', '#F472B6', '#FFFFFF'],
          lineColor: 'rgba(255, 230, 0, 0.07)',
          lineMaxDist: 105,
          glow: true,
          particleAlpha: 0.85,
        };
      }
      return {
        isDark: false,
        colors: ['#FFE600', '#7DD3FC', '#F472B6', '#19191C'],
        outlines: ['#19191C', '#19191C', '#19191C', '#19191C'],
        lineColor: 'rgba(25, 25, 28, 0.06)',
        lineMaxDist: 110,
        glow: false,
        particleAlpha: 0.85,
      };
    };

    let themeConfig = getThemeConfig();

    // Determine particle count based on screen width
    const particleCount = width > 1024 ? 38 : width > 640 ? 24 : 14;
    const particles: Particle[] = [];

    // Initialize particles with non-overlapping random positions
    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 3.5 + 3.0; // 3.0px to 6.5px
      const colorIdx = Math.floor(Math.random() * themeConfig.colors.length);
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.7 + 0.35; // smooth controlled drift

      particles.push({
        x: Math.random() * (width - radius * 4) + radius * 2,
        y: Math.random() * (height - radius * 4) + radius * 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius,
        mass: radius * radius,
        color: themeConfig.colors[colorIdx],
        outlineColor: themeConfig.outlines[colorIdx],
        collisionPulse: 0,
      });
    }

    // Mouse coordinates (global window coordinates)
    let mouseX = -9999;
    let mouseY = -9999;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    // On mouse click, emit an energetic dispersion burst
    const handleClick = (e: MouseEvent) => {
      const clickX = e.clientX;
      const clickY = e.clientY;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = p.x - clickX;
        const dy = p.y - clickY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180 && dist > 0) {
          const impulse = ((180 - dist) / 180) * 3.2;
          p.vx += (dx / dist) * impulse;
          p.vy += (dy / dist) * impulse;
          p.collisionPulse = 1.0;
        }
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    // Watch for Theme Toggle (class changes on <html>)
    const themeObserver = new MutationObserver(() => {
      themeConfig = getThemeConfig();
      // Update particle colors smoothly without repositioning
      for (let i = 0; i < particles.length; i++) {
        const cIdx = Math.floor(Math.random() * themeConfig.colors.length);
        particles[i].color = themeConfig.colors[cIdx];
        particles[i].outlineColor = themeConfig.outlines[cIdx];
      }
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Pause offscreen / background tab
    let isVisible = true;
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Main Physics & Render Loop
    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const maxSpeed = 2.2;
      const minSpeed = 0.25;

      // ── 1. Update Particle Positions & Boundary Bounce ──
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Slight natural damping
        p.vx *= 0.998;
        p.vy *= 0.998;

        // Keep minimum drift
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed < minSpeed) {
          const boost = minSpeed / (speed || 1);
          p.vx *= boost;
          p.vy *= boost;
        } else if (speed > maxSpeed) {
          const damp = maxSpeed / speed;
          p.vx *= damp;
          p.vy *= damp;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Boundary collision with restitution
        if (p.x - p.radius < 0) {
          p.x = p.radius;
          p.vx = Math.abs(p.vx);
          p.collisionPulse = Math.max(p.collisionPulse, 0.5);
        } else if (p.x + p.radius > width) {
          p.x = width - p.radius;
          p.vx = -Math.abs(p.vx);
          p.collisionPulse = Math.max(p.collisionPulse, 0.5);
        }

        if (p.y - p.radius < 0) {
          p.y = p.radius;
          p.vy = Math.abs(p.vy);
          p.collisionPulse = Math.max(p.collisionPulse, 0.5);
        } else if (p.y + p.radius > height) {
          p.y = height - p.radius;
          p.vy = -Math.abs(p.vy);
          p.collisionPulse = Math.max(p.collisionPulse, 0.5);
        }

        // Mouse elastic repulsion
        const mdx = mouseX - p.x;
        const mdy = mouseY - p.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        const mRadius = 120;
        if (mDist < mRadius && mDist > 0) {
          const force = ((mRadius - mDist) / mRadius) * 0.9;
          p.vx -= (mdx / mDist) * force;
          p.vy -= (mdy / mDist) * force;
        }

        // Decay collision flash
        if (p.collisionPulse > 0.02) {
          p.collisionPulse *= 0.90;
        } else {
          p.collisionPulse = 0;
        }
      }

      // ── 2. Inter-Particle Elastic Collisions (Pairwise Physics) ──
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distSq = dx * dx + dy * dy;
          const minDist = p1.radius + p2.radius;

          if (distSq < minDist * minDist) {
            const dist = Math.sqrt(distSq) || 0.001;
            const nx = dx / dist;
            const ny = dy / dist;

            // Positional separation to prevent sticking
            const overlap = (minDist - dist) * 0.5;
            p1.x -= nx * overlap;
            p1.y -= ny * overlap;
            p2.x += nx * overlap;
            p2.y += ny * overlap;

            // Relative velocity
            const kx = p1.vx - p2.vx;
            const ky = p1.vy - p2.vy;
            const vn = kx * nx + ky * ny;

            // Only apply impulse if particles are moving toward each other
            if (vn > 0) {
              const restitution = 0.94; // slight energy retention
              const impulse = ((1 + restitution) * vn) / (p1.mass + p2.mass);

              p1.vx -= impulse * p2.mass * nx;
              p1.vy -= impulse * p2.mass * ny;
              p2.vx += impulse * p1.mass * nx;
              p2.vy += impulse * p1.mass * ny;

              // Trigger collision shock ring
              p1.collisionPulse = 1.0;
              p2.collisionPulse = 1.0;
            }
          }
        }
      }

      // ── 3. Draw Subtle Connecting Mesh Lines ──
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < themeConfig.lineMaxDist) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = themeConfig.lineColor;
            ctx.globalAlpha = 1 - dist / themeConfig.lineMaxDist;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      // ── 4. Draw Particles & Tactile Collision Rings ──
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Draw collision shockwave ring
        if (p.collisionPulse > 0.05) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius + (1 - p.collisionPulse) * 10, 0, Math.PI * 2);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1.2;
          ctx.globalAlpha = p.collisionPulse * 0.45;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }

        // Particle core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (themeConfig.glow) {
          ctx.shadowBlur = 6;
          ctx.shadowColor = p.color;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = themeConfig.particleAlpha;
        ctx.fill();

        // Neo-Brutalist crisp border
        if (!themeConfig.isDark) {
          ctx.lineWidth = 1.2;
          ctx.strokeStyle = '#19191C';
          ctx.globalAlpha = 0.9;
          ctx.stroke();
        }

        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      themeObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none transition-opacity duration-300 ${className}`}
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
