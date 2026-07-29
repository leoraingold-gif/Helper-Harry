import React, { useState } from 'react';
import { Menu, X, Sliders, Sparkles, Box, Compass } from 'lucide-react';
import { AppSettings } from '../types';

interface NavbarProps {
  settings: AppSettings;
  onOpenSettings: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ settings, onOpenSettings, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Studio', href: '#studio' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md bg-[#0B0D11]/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Bold Geometric Logotype */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-amber-400 p-[1px] transition-transform duration-300 group-hover:rotate-180">
            <div className="w-full h-full bg-[#0B0D11] rounded-[7px] flex items-center justify-center">
              <Box className="w-5 h-5 text-cyan-400 group-hover:text-amber-400 transition-colors" />
            </div>
          </div>
          <div>
            <span className="font-syne font-extrabold text-lg text-white tracking-widest block leading-none">
              AETHERIA
            </span>
            <span className="font-mono text-[10px] text-cyan-400 tracking-widest block mt-1 uppercase">
              // ARCHITECTURE STUDIO
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-wider">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`transition-colors relative py-1 hover:text-cyan-400 ${
                activeSection === link.name.toLowerCase() ? 'text-cyan-400 font-bold' : 'text-zinc-400'
              }`}
            >
              {link.name}
              {activeSection === link.name.toLowerCase() && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_8px_#00d1ff]" />
              )}
            </a>
          ))}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3">
          {/* Scroll Trail Status Badge */}
          <button
            onClick={onOpenSettings}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono glass-panel border border-white/10 hover:border-cyan-500/40 text-zinc-300 transition-all"
            title="Configure micro-interactions & motion"
          >
            <Sparkles className={`w-3.5 h-3.5 ${settings.scrollTrailEnabled ? 'text-cyan-400 animate-pulse' : 'text-zinc-500'}`} />
            <span>TRAIL: {settings.scrollTrailEnabled ? 'ON' : 'OFF'}</span>
          </button>

          {/* Settings Trigger */}
          <button
            onClick={onOpenSettings}
            className="p-2.5 rounded-lg glass-panel hover:bg-white/10 text-zinc-300 hover:text-cyan-400 border border-white/10 transition-colors"
            aria-label="Open Display Settings"
          >
            <Sliders className="w-4 h-4" />
          </button>

          {/* Compact Hamburger Toggle for Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-lg glass-panel hover:bg-white/10 text-zinc-300 border border-white/10"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-white/10 px-6 py-6 font-mono text-sm uppercase tracking-wider space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-zinc-300 hover:text-cyan-400 py-2 border-b border-white/5"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-zinc-500">SCROLL TRAIL EFFECT</span>
            <button
              onClick={onOpenSettings}
              className="text-xs text-cyan-400 underline"
            >
              CONFIGURE
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
