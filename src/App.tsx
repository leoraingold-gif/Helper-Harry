import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero3D } from './components/Hero3D';
import { ScrollTrail } from './components/ScrollTrail';
import { ProjectsGrid } from './components/ProjectsGrid';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { StudioSection } from './components/StudioSection';
import { ContactSection } from './components/ContactSection';
import { MicroFooter } from './components/MicroFooter';
import { SettingsDrawer } from './components/SettingsDrawer';

import { PROJECTS_DATA, TIMELINE_EVENTS, TEAM_MEMBERS, STUDIO_LOCATIONS } from './data/portfolioData';
import { Project, AppSettings } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('projects');

  const [settings, setSettings] = useState<AppSettings>({
    scrollTrailEnabled: true,
    reducedMotion: false,
    accentColor: 'dual',
    wireframeHero: true,
    heroAutoRotate: true
  });

  const handleExploreClick = () => {
    const projectsEl = document.getElementById('projects');
    if (projectsEl) {
      projectsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#0B0D11] text-zinc-100 min-h-screen relative font-space selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Decorative Scroll Trail Micro-interaction particle container */}
      <ScrollTrail settings={settings} />

      {/* Top Fixed Header Navbar */}
      <Navbar
        settings={settings}
        onOpenSettings={() => setIsSettingsOpen(true)}
        activeSection={activeSection}
      />

      {/* Hero Section: Interactive 3D Living Model */}
      <Hero3D settings={settings} onExploreClick={handleExploreClick} />

      {/* Main Content Area */}
      <main className="relative z-10">
        {/* Projects Grid Section (Masonry layout) */}
        <ProjectsGrid
          projects={PROJECTS_DATA}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* Studio & Timeline Section */}
        <StudioSection
          timelineEvents={TIMELINE_EVENTS}
          teamMembers={TEAM_MEMBERS}
        />

        {/* Contact Form & Studio Locations Section */}
        <ContactSection locations={STUDIO_LOCATIONS} />
      </main>

      {/* Split-View Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Display & Motion Settings Drawer */}
      <SettingsDrawer
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={(newSettings) => setSettings(newSettings)}
      />

      {/* Sticky Micro-Footer */}
      <MicroFooter
        settings={settings}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
    </div>
  );
}
