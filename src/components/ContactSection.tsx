import React, { useState, useEffect } from 'react';
import { StudioLocation } from '../types';
import { Mail, MapPin, Clock, Send, CheckCircle2, Globe, ArrowUpRight } from 'lucide-react';

interface ContactSectionProps {
  locations: StudioLocation[];
}

export const ContactSection: React.FC<ContactSectionProps> = ({ locations }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    typology: 'High-Rise / Commercial',
    budget: '$10M - $50M',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentTimes, setCurrentTimes] = useState<{ [city: string]: string }>({});

  // Live time clocks for studio locations
  useEffect(() => {
    const updateClocks = () => {
      const times: { [city: string]: string } = {};
      locations.forEach((loc) => {
        try {
          const formatted = new Intl.DateTimeFormat('en-US', {
            timeZone: loc.timeZone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          }).format(new Date());
          times[loc.city] = formatted;
        } catch {
          times[loc.city] = '12:00:00';
        }
      });
      setCurrentTimes(times);
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, [locations]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        typology: 'High-Rise / Commercial',
        budget: '$10M - $50M',
        message: ''
      });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 border-t border-white/10">
      <div className="mb-16">
        <div className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-2">
          // INITIATE DIALOGUE
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold font-syne text-white tracking-tight mb-4">
          CONTACT & LOCATIONS
        </h2>
        <p className="text-zinc-300 font-sans text-base md:text-lg max-w-xl">
          We welcome global commissions, academic research collaborations, and parametric structural design inquiries.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Minimal Form (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-8 md:p-10 rounded-3xl border border-white/10">
          <h3 className="text-xl font-bold font-syne text-white mb-6 flex items-center gap-2">
            <Mail className="w-5 h-5 text-cyan-400" />
            <span>COMMISSION / INQUIRY FORM</span>
          </h3>

          {isSubmitted ? (
            <div className="p-8 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 text-center animate-fadeIn py-12">
              <CheckCircle2 className="w-12 h-12 text-cyan-400 mx-auto mb-4 animate-bounce" />
              <h4 className="text-xl font-bold font-syne text-white mb-2">TRANSMISSION RECEIVED</h4>
              <p className="text-xs font-mono text-zinc-300 max-w-md mx-auto">
                Thank you for initiating contact. Our Zurich studio office will review your project parameters and respond within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-zinc-400 mb-2 uppercase text-[11px]">Your Name / Entity *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya Lin / Mori Building Corp"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-zinc-900/80 border border-white/10 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-2 uppercase text-[11px]">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="architect@studio.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-zinc-900/80 border border-white/10 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-zinc-400 mb-2 uppercase text-[11px]">Project Typology</label>
                  <select
                    value={formData.typology}
                    onChange={(e) => setFormData({ ...formData, typology: e.target.value })}
                    className="w-full bg-zinc-900/80 border border-white/10 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-cyan-400 transition-colors"
                  >
                    <option>High-Rise / Commercial Tower</option>
                    <option>Cultural Pavilion & Exhibition</option>
                    <option>Coastal / Mountain Residence</option>
                    <option>Urban Infrastructure / Skybridge</option>
                    <option>Academic / Parametric Research</option>
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-400 mb-2 uppercase text-[11px]">Target Capital Budget</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-zinc-900/80 border border-white/10 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-cyan-400 transition-colors"
                  >
                    <option>$5M - $10M</option>
                    <option>$10M - $50M</option>
                    <option>$50M - $200M+</option>
                    <option>Academic / Non-Commercial</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 mb-2 uppercase text-[11px]">Project Brief / Site Details *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe site location, spatial vision, and performance targets..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-zinc-900/80 border border-white/10 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-amber-400 text-slate-950 font-bold font-mono text-xs tracking-wider hover:shadow-[0_0_20px_rgba(0,209,255,0.3)] transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>SEND TRANSMISSION</span>
              </button>
            </form>
          )}
        </div>

        {/* Right: Interactive Studio Locations with Live Clocks (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest font-bold mb-2">
            // GLOBAL LABS & LIVE TIME NODES
          </div>

          {locations.map((loc) => (
            <div key={loc.city} className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all">
              <div className="flex items-center justify-between mb-3 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold font-syne text-white">{loc.city}</span>
                  <span className="text-zinc-500">/ {loc.country}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-cyan-500/30 text-cyan-300">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  <span>{currentTimes[loc.city] || '--:--:--'}</span>
                </div>
              </div>

              <div className="text-xs font-mono text-zinc-400 space-y-2 mb-4">
                <p className="flex items-center gap-1.5 text-zinc-300">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{loc.address}</span>
                </p>
                <p className="text-[11px] text-zinc-500 pl-5">{loc.coordinates}</p>
              </div>

              <a
                href={`mailto:${loc.email}`}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:underline pt-2 border-t border-white/5 w-full justify-between"
              >
                <span>{loc.email}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}

          {/* Social Links */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <span className="text-xs font-mono text-zinc-400 block mb-3 uppercase">// ARCHIVAL REPOSITORIES</span>
            <div className="flex flex-wrap gap-3 font-mono text-xs">
              <a href="#" className="px-3 py-2 rounded-lg bg-zinc-900 hover:bg-white/10 text-zinc-300 border border-white/10 flex items-center gap-1">
                <span>ArchDaily</span>
                <ArrowUpRight className="w-3 h-3 text-cyan-400" />
              </a>
              <a href="#" className="px-3 py-2 rounded-lg bg-zinc-900 hover:bg-white/10 text-zinc-300 border border-white/10 flex items-center gap-1">
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-cyan-400" />
              </a>
              <a href="#" className="px-3 py-2 rounded-lg bg-zinc-900 hover:bg-white/10 text-zinc-300 border border-white/10 flex items-center gap-1">
                <span>GitHub / Parametric</span>
                <ArrowUpRight className="w-3 h-3 text-cyan-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
