import React from 'react';
import { AppSettings } from '../types';
import { X, Sparkles, Sliders, Eye, RotateCw, Check, Zap } from 'lucide-react';

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: (newSettings: AppSettings) => void;
}

export const SettingsDrawer: React.FC<SettingsDrawerProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md h-full glass-panel border-l border-white/20 p-6 md:p-8 flex flex-col justify-between shadow-2xl overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
            <div className="flex items-center gap-2 font-syne font-bold text-lg text-white">
              <Sliders className="w-5 h-5 text-cyan-400" />
              <span>DISPLAY & MOTION SETTINGS</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close Settings"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6 font-mono text-xs">
            {/* 1. Scroll Trail Particle Micro-interaction Toggle */}
            <div className="p-4 rounded-2xl glass-panel border border-cyan-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  SCROLL TRAIL GLYPH PARTICLES
                </span>
                <button
                  onClick={() =>
                    onUpdateSettings({ ...settings, scrollTrailEnabled: !settings.scrollTrailEnabled })
                  }
                  className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                    settings.scrollTrailEnabled ? 'bg-cyan-500' : 'bg-zinc-800'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                      settings.scrollTrailEnabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Leaves a soft, fading trail of blurred architectural glyph copies following vertical scroll movement.
              </p>
            </div>

            {/* 2. Reduced Motion Toggle */}
            <div className="p-4 rounded-2xl glass-panel border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white font-bold flex items-center gap-2">
                  <Eye className="w-4 h-4 text-amber-400" />
                  REDUCED MOTION
                </span>
                <button
                  onClick={() =>
                    onUpdateSettings({ ...settings, reducedMotion: !settings.reducedMotion })
                  }
                  className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                    settings.reducedMotion ? 'bg-amber-400' : 'bg-zinc-800'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                      settings.reducedMotion ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Disables heavy 3D canvas rotations and particle trail animations for maximum accessibility.
              </p>
            </div>

            {/* 3. Color Accent Selection */}
            <div className="p-4 rounded-2xl glass-panel border border-white/10 space-y-3">
              <span className="text-white font-bold block mb-1 uppercase">// NEON COLOR ACCENT</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => onUpdateSettings({ ...settings, accentColor: 'cyan' })}
                  className={`py-2 px-3 rounded-lg border text-center transition-all ${
                    settings.accentColor === 'cyan'
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                      : 'bg-zinc-900 border-white/5 text-zinc-400'
                  }`}
                >
                  NEON CYAN
                </button>
                <button
                  onClick={() => onUpdateSettings({ ...settings, accentColor: 'gold' })}
                  className={`py-2 px-3 rounded-lg border text-center transition-all ${
                    settings.accentColor === 'gold'
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                      : 'bg-zinc-900 border-white/5 text-zinc-400'
                  }`}
                >
                  WARM GOLD
                </button>
                <button
                  onClick={() => onUpdateSettings({ ...settings, accentColor: 'dual' })}
                  className={`py-2 px-3 rounded-lg border text-center transition-all ${
                    settings.accentColor === 'dual'
                      ? 'bg-gradient-to-r from-cyan-500/20 to-amber-500/20 border-cyan-400 text-white font-bold'
                      : 'bg-zinc-900 border-white/5 text-zinc-400'
                  }`}
                >
                  DUAL
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-white/10 text-center font-mono text-[11px] text-zinc-500">
          AETHERIA PORTFOLIO ENGINE V5.4
        </div>
      </div>
    </div>
  );
};
