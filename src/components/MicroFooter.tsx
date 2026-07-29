import React from 'react';
import { AppSettings } from '../types';
import { Box, Sparkles, ShieldCheck, Sliders, ChevronUp } from 'lucide-react';

interface MicroFooterProps {
  settings: AppSettings;
  onOpenSettings: () => void;
}

export const MicroFooter: React.FC<MicroFooterProps> = ({ settings, onOpenSettings }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="sticky bottom-0 z-40 bg-[#0B0D11]/90 backdrop-blur-md border-t border-white/10 px-6 py-3 font-mono text-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-zinc-400">
        {/* Left: Operational Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>NODES: 100% OPERATIONAL</span>
          </div>
          <span className="hidden md:inline text-zinc-600">|</span>
          <span className="hidden md:inline text-zinc-500">AETHERIA ARCHITECTURE LAB © 2026</span>
        </div>

        {/* Center: Micro Nav Quick Links */}
        <div className="flex items-center gap-6 text-[11px] uppercase tracking-wider">
          <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
          <a href="#studio" className="hover:text-cyan-400 transition-colors">Studio</a>
          <a href="#timeline" className="hover:text-cyan-400 transition-colors">Timeline</a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
        </div>

        {/* Right: Motion & Trail Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 border border-white/10 hover:border-cyan-400/40 text-cyan-300 text-[11px]"
          >
            <Sliders className="w-3 h-3 text-cyan-400" />
            <span>TRAIL: {settings.scrollTrailEnabled ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={scrollToTop}
            className="p-1.5 rounded bg-zinc-900 border border-white/10 hover:bg-white/10 text-zinc-300"
            title="Return to top"
            aria-label="Return to top"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
