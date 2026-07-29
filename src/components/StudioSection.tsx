import React, { useState } from 'react';
import { TimelineEvent, TeamMember } from '../types';
import { Cpu, Award, Globe2, Sparkles, MapPin, Linkedin, ArrowUpRight } from 'lucide-react';

interface StudioSectionProps {
  timelineEvents: TimelineEvent[];
  teamMembers: TeamMember[];
}

export const StudioSection: React.FC<StudioSectionProps> = ({ timelineEvents, teamMembers }) => {
  const [activeTimelineCategory, setActiveTimelineCategory] = useState<string>('All');

  const categories = ['All', 'Milestone', 'Award', 'Research', 'Exhibition'];

  const filteredEvents = timelineEvents.filter(
    (event) => activeTimelineCategory === 'All' || event.category === activeTimelineCategory
  );

  return (
    <section id="studio" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 border-t border-white/10">
      {/* Studio Header */}
      <div className="mb-16">
        <div className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-2">
          // LABORATORY & ETHOS
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold font-syne text-white tracking-tight mb-6">
          ABOUT AETHERIA
        </h2>
        <p className="text-zinc-300 font-sans text-base md:text-xl max-w-3xl leading-relaxed">
          We operate at the intersection of parametric architecture, materials physics, and ecological systems. Our living model philosophy treats every building as a self-regulating organism.
        </p>
      </div>

      {/* Philosophy Pillar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        <div className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold font-syne text-white mb-3">Generative Physics</h3>
          <p className="text-xs font-mono text-zinc-400 leading-relaxed">
            Algorithmic form generation using neural topology optimization to minimize structural mass while maximizing kinetic solar capture.
          </p>
        </div>

        <div className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-amber-500/30 transition-all">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold font-syne text-white mb-3">Biomimetic Shells</h3>
          <p className="text-xs font-mono text-zinc-400 leading-relaxed">
            Translating biological structural principles—from dragonfly wing venation to cellular bone trusses—into lightweight facade engineering.
          </p>
        </div>

        <div className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-emerald-500/30 transition-all">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
            <Globe2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold font-syne text-white mb-3">Carbon-Negative Life</h3>
          <p className="text-xs font-mono text-zinc-400 leading-relaxed">
            Pioneering high-rise mass timber, bio-receptive concrete, and subterranean thermal loops for positive ecological balance.
          </p>
        </div>
      </div>

      {/* Studio Timeline Section */}
      <div id="timeline" className="mb-24 pt-12 border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-mono text-amber-400 tracking-widest uppercase mb-2">
              // EVOLUTION & MILESTONES
            </div>
            <h3 className="text-2xl md:text-4xl font-extrabold font-syne text-white">
              STUDIO TIMELINE
            </h3>
          </div>

          {/* Timeline Category Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTimelineCategory(cat)}
                className={`px-3 py-1.5 rounded-lg border transition-all shrink-0 ${
                  activeTimelineCategory === cat
                    ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                    : 'glass-panel text-zinc-400 border-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Nodes */}
        <div className="relative border-l-2 border-cyan-500/30 ml-4 md:ml-8 pl-6 md:pl-10 space-y-12">
          {filteredEvents.map((event) => (
            <div key={event.id} className="relative group">
              {/* Animated Node Icon */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-[#0B0D11] border-2 border-cyan-400 group-hover:border-amber-400 group-hover:scale-125 transition-all flex items-center justify-center shadow-[0_0_12px_rgba(0,209,255,0.4)]">
                <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:bg-amber-400" />
              </div>

              {/* Card Container */}
              <div className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all max-w-3xl">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2 font-mono text-xs">
                  <span className="text-amber-300 font-bold text-base">{event.year}</span>
                  <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 uppercase text-[10px]">
                    {event.category}
                  </span>
                </div>

                <h4 className="text-lg font-bold font-syne text-white mb-2">{event.title}</h4>
                <p className="text-xs font-mono text-zinc-300 leading-relaxed mb-3">{event.description}</p>

                {event.metrics && (
                  <div className="text-[11px] font-mono text-cyan-400 pt-2 border-t border-white/5 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>{event.metrics}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Cards Section */}
      <div className="pt-12 border-t border-white/10">
        <div className="mb-10">
          <div className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-2">
            // LEADERSHIP & FELLOWS
          </div>
          <h3 className="text-2xl md:text-4xl font-extrabold font-syne text-white">
            STUDIO PRINCIPALS
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="group glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(0,209,255,0.15)] flex flex-col justify-between"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D11] via-transparent to-transparent" />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full glass-panel text-[10px] font-mono text-zinc-300 border border-white/10 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-cyan-400" />
                  <span>{member.location}</span>
                </div>
              </div>

              <div className="p-6">
                <h4 className="text-lg font-bold font-syne text-white group-hover:text-cyan-300 transition-colors mb-1">
                  {member.name}
                </h4>
                <p className="text-xs font-mono text-amber-300 mb-3">{member.role}</p>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-4">{member.bio}</p>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                  {member.specialties.map((spec, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-zinc-900 border border-white/5 text-[10px] font-mono text-zinc-400">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
