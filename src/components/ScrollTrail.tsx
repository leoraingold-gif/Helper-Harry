import React, { useEffect, useRef } from 'react';
import { AppSettings } from '../types';

interface ScrollTrailProps {
  settings: AppSettings;
}

export const ScrollTrail: React.FC<ScrollTrailProps> = ({ settings }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion & settings
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches || !settings.scrollTrailEnabled) return;

    // Architectural glyph SVG data URL (stylized cyan/gold geometric diamond architectural node)
    const glyphUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">' +
      '<polygon points="16,2 30,16 16,30 2,16" stroke="%2300d1ff" stroke-width="2" fill="rgba(0,209,255,0.15)"/>' +
      '<circle cx="16" cy="16" r="4" fill="%23e5a93c"/>' +
      '</svg>'
    );

    let lastScrollY = window.scrollY;
    let ticking = false;
    let lastTime = 0;

    function createParticle(x: number, y: number, velocity: number) {
      if (!container) return;

      const el = document.createElement('div');
      el.className = 'trail-particle';
      el.style.left = `${x - 18}px`;
      el.style.top = `${y - 18}px`;
      el.style.backgroundImage = `url("${glyphUrl}")`;
      el.style.transform = `translate3d(0, ${velocity * 0.5}px, 0) scale(1)`;

      container.appendChild(el);

      // Fade out and float up slightly on next frame
      requestAnimationFrame(() => {
        el.style.opacity = '0';
        el.style.transform = `translate3d(0, ${velocity * 0.5 - 24}px, 0) scale(0.92)`;
      });

      // Remove particle after lifetime animation (1000ms)
      setTimeout(() => {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el);
        }
      }, 1000);
    }

    function onScroll() {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY;
      lastScrollY = currentY;

      if (Math.abs(delta) < 3) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const viewportWidth = window.innerWidth;
          // Position particle near right edge (e.g. 92% of viewport width)
          const x = Math.round(viewportWidth * 0.92);
          const y = Math.round(window.innerHeight * 0.5);

          const speed = Math.min(24, Math.abs(delta));
          const count = Math.max(1, Math.round(speed / 5));

          for (let i = 0; i < count; i++) {
            const jitterX = (Math.random() - 0.5) * 28;
            const jitterY = (Math.random() - 0.5) * 28;
            createParticle(x + jitterX, y + jitterY, delta);
          }

          ticking = false;
        });
        ticking = true;
      }
    }

    // Throttled scroll handler (40ms)
    function throttledScroll() {
      const now = performance.now();
      if (now - lastTime > 40) {
        onScroll();
        lastTime = now;
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [settings.scrollTrailEnabled]);

  return <div id="scroll-trail-container" ref={containerRef} aria-hidden="true" />;
};
