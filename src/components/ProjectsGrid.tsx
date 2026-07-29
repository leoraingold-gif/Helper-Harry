import React, { useState } from 'react';
import { Project, Category } from '../types';
import { Search, ArrowUpRight, Filter, Maximize2, Layers } from 'lucide-react';

interface ProjectsGridProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects, onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: Category[] = ['All', 'Commercial', 'Residential', 'Cultural', 'Pavilion', 'Urban Planning'];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.concept.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.specs.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-white/10 pb-8">
        <div>
          <div className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-2">
            // SELECTED WORKS & ARCHIVES
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold font-syne text-white tracking-tight">
            PROJECTS GRID
          </h2>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search typology, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/80 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar font-mono text-xs">
        <Filter className="w-4 h-4 text-zinc-500 mr-2 shrink-0 hidden sm:block" />
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-xl transition-all shrink-0 whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,209,255,0.3)]'
                : 'glass-panel text-zinc-400 hover:text-white hover:border-white/20'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Masonry-like Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => {
          // Create visual asymmetry for masonry-like feel
          const isLargeTile = index % 5 === 0;

          return (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className={`group relative rounded-2xl overflow-hidden glass-panel glass-panel-hover cursor-pointer border border-white/10 transition-all duration-500 flex flex-col justify-between ${
                isLargeTile ? 'lg:col-span-2 lg:row-span-2 min-h-[460px]' : 'min-h-[380px]'
              }`}
            >
              {/* Background Image with ReferrerPolicy */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-70 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D11] via-[#0B0D11]/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
              </div>

              {/* Top Card Badges */}
              <div className="relative z-10 p-6 flex items-start justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-zinc-950/80 border border-cyan-500/40 text-cyan-300 backdrop-blur-md">
                    {project.category}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono text-amber-300 bg-zinc-950/80 border border-amber-500/30 backdrop-blur-md">
                    {project.year}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-full glass-panel border border-white/20 flex items-center justify-center text-white group-hover:bg-cyan-400 group-hover:text-slate-950 transition-colors shadow-lg">
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              {/* Bottom Project Metadata */}
              <div className="relative z-10 p-6 md:p-8 mt-auto transform group-hover:-translate-y-1 transition-transform duration-300">
                <div className="text-xs font-mono text-zinc-400 mb-1 flex items-center gap-2">
                  <span>{project.specs.location}</span>
                  <span>•</span>
                  <span>{project.specs.area}</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-extrabold font-syne text-white tracking-tight mb-2 group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>

                {/* Hover Reveal Concept */}
                <p className="text-xs md:text-sm font-mono text-zinc-300 line-clamp-2 leading-relaxed opacity-85 group-hover:opacity-100 transition-opacity">
                  {project.concept}
                </p>

                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-cyan-400">
                  <span className="flex items-center gap-1">
                    <Maximize2 className="w-3.5 h-3.5" />
                    INSPECT SPECIFICATIONS
                  </span>
                  <span className="text-zinc-500 uppercase">{project.specs.status}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-20 glass-panel rounded-2xl border border-white/10">
          <Layers className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
          <p className="font-mono text-sm text-zinc-400">No architectural projects matched your filter.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-mono text-xs font-bold"
          >
            RESET FILTERS
          </button>
        </div>
      )}
    </section>
  );
};
