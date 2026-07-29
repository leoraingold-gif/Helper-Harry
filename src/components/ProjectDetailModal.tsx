import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { X, ChevronLeft, ChevronRight, Download, Maximize2, ShieldCheck, MapPin, Building, Cpu, Layers, CheckCircle } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [showBlueprintMode, setShowBlueprintMode] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const imagesToDisplay = showBlueprintMode && project.blueprintImage
    ? [project.blueprintImage, ...project.galleryImages]
    : project.galleryImages;

  const currentImage = imagesToDisplay[activeImageIndex] || project.coverImage;

  // Function to handle "Download PDF Spec Sheet"
  const handleDownloadPDF = () => {
    const pdfContent = `
===================================================================
                  AETHERIA ARCHITECTURE STUDIO
               TECHNICAL PROJECT SPECIFICATION SHEET
===================================================================

PROJECT NAME : ${project.title}
TYPOLOGY     : ${project.category} (${project.specs.typology})
LOCATION     : ${project.specs.location}
YEAR         : ${project.year}
STATUS       : ${project.specs.status}

-------------------------------------------------------------------
1. CONCEPT & STRUCTURAL PHILOSOPHY
-------------------------------------------------------------------
${project.concept}

${project.fullDescription}

-------------------------------------------------------------------
2. METRICS & PERFORMANCE SPECIFICATIONS
-------------------------------------------------------------------
Height / Massing    : ${project.specs.height || 'N/A'}
Gross Area          : ${project.specs.area}
Materiality         : ${project.specs.materiality}
Sustainability      : ${project.specs.sustainability}

-------------------------------------------------------------------
3. AWARDS & RECOGNITION
-------------------------------------------------------------------
${project.awards ? project.awards.join('\n') : 'Nominated for International Algorithmic Architecture Excellence.'}

-------------------------------------------------------------------
Document generated on ${new Date().toLocaleDateString()}
Aetheria Architecture Portfolio // Computational Design Lab
===================================================================
    `;

    const blob = new Blob([pdfContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${project.id}-spec-sheet.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-xl animate-fadeIn overflow-y-auto">
      {/* Container Card */}
      <div className="relative w-full max-w-6xl max-h-[90vh] glass-panel rounded-3xl border border-white/20 shadow-2xl overflow-hidden flex flex-col my-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-zinc-950/60 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-cyan-400 font-bold uppercase tracking-widest">// PROJECT DETAIL // {project.id}</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            aria-label="Close Project Detail"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Split View Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto min-h-0 flex-1">
          {/* LEFT: Immersive Image Carousel (7 cols) */}
          <div className="lg:col-span-7 p-6 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between bg-zinc-950/40">
            {/* Main Stage Image */}
            <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[460px] rounded-2xl overflow-hidden border border-white/10 group bg-black/60">
              <img
                src={currentImage}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Blueprint Mode Badge Overlay */}
              {showBlueprintMode && (
                <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-cyan-500/90 text-slate-950 font-mono text-[10px] font-bold tracking-wider">
                  BLUEPRINT WIREFRAME OVERLAY ACTIVE
                </div>
              )}

              {/* Navigation Arrows */}
              <button
                onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : imagesToDisplay.length - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full glass-panel hover:bg-white/20 text-white border border-white/20 transition-all"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setActiveImageIndex((prev) => (prev < imagesToDisplay.length - 1 ? prev + 1 : 0))}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full glass-panel hover:bg-white/20 text-white border border-white/20 transition-all"
                aria-label="Next Image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnail Strip & Blueprint Toggle */}
            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {imagesToDisplay.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border transition-all shrink-0 ${
                      activeImageIndex === idx ? 'border-cyan-400 ring-2 ring-cyan-400/30 scale-105' : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {project.blueprintImage && (
                <button
                  onClick={() => setShowBlueprintMode(!showBlueprintMode)}
                  className={`px-3 py-2 rounded-xl text-xs font-mono border transition-all shrink-0 flex items-center gap-1.5 ${
                    showBlueprintMode
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                      : 'glass-panel border-white/10 text-zinc-300 hover:border-cyan-400/40'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>{showBlueprintMode ? 'PHOTOGRAPHY VIEW' : 'BLUEPRINT MODE'}</span>
                </button>
              )}
            </div>
          </div>

          {/* RIGHT: Project Summary & Key Metrics (5 cols) */}
          <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                <span className="text-cyan-400 font-bold uppercase">{project.category}</span>
                <span>COMPLETED {project.year}</span>
              </div>

              <h2 className="text-3xl font-extrabold font-syne text-white mb-3">
                {project.title}
              </h2>

              <p className="text-xs md:text-sm font-mono text-cyan-300/90 leading-relaxed mb-4 p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20">
                "{project.concept}"
              </p>

              <p className="text-xs md:text-sm text-zinc-300 font-sans leading-relaxed mb-6">
                {project.fullDescription}
              </p>

              {/* Key Metrics Badges */}
              <div className="space-y-3 pt-4 border-t border-white/10 font-mono text-xs">
                <div className="text-[11px] text-zinc-500 uppercase tracking-widest font-bold">
                  // TECHNICAL METRICS & SPECIFICATIONS
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl glass-panel border border-white/5">
                    <span className="text-zinc-500 block text-[10px]">GROSS AREA</span>
                    <span className="text-white font-bold">{project.specs.area}</span>
                  </div>
                  <div className="p-3 rounded-xl glass-panel border border-white/5">
                    <span className="text-zinc-500 block text-[10px]">LOCATION</span>
                    <span className="text-white font-bold">{project.specs.location}</span>
                  </div>
                  <div className="p-3 rounded-xl glass-panel border border-white/5 col-span-2">
                    <span className="text-zinc-500 block text-[10px]">MATERIALITY</span>
                    <span className="text-cyan-300">{project.specs.materiality}</span>
                  </div>
                  <div className="p-3 rounded-xl glass-panel border border-white/5 col-span-2">
                    <span className="text-zinc-500 block text-[10px]">SUSTAINABILITY RATING</span>
                    <span className="text-emerald-400">{project.specs.sustainability}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar: Download PDF */}
            <div className="pt-4 border-t border-white/10">
              <button
                onClick={handleDownloadPDF}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-amber-400 text-slate-950 font-mono text-xs font-bold tracking-wider hover:opacity-95 transition-all shadow-[0_0_20px_rgba(0,209,255,0.25)] flex items-center justify-center gap-2"
              >
                {downloadSuccess ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-950" />
                    <span>SPECIFICATION SHEET DOWNLOADED!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>DOWNLOAD PROJECT SPEC SHEET (.PDF)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
