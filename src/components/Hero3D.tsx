import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Play, Pause, Layers, Eye, RefreshCw, Sliders, Maximize2, ShieldCheck, Zap } from 'lucide-react';
import { AppSettings } from '../types';

interface Hero3DProps {
  settings: AppSettings;
  onExploreClick: () => void;
}

export const Hero3D: React.FC<Hero3DProps> = ({ settings, onExploreClick }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [wireframeMode, setWireframeMode] = useState<boolean>(true);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [explodeValue, setExplodeValue] = useState<number>(0);
  const [activePreset, setActivePreset] = useState<'tower' | 'pavilion' | 'complex'>('tower');
  const [modelStats, setModelStats] = useState({
    polygons: 14820,
    twistAngle: '18.4°',
    windLoad: '-42%',
    height: '380m'
  });

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const floorsGroupRef = useRef<THREE.Group | null>(null);
  const coreGroupRef = useRef<THREE.Group | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Interaction tracking
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const cameraRotationRef = useRef<{ x: number; y: number }>({ x: 0.3, y: 0.6 });

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0d11, 0.015);
    sceneRef.current = scene;

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 12, 35);
    camera.lookAt(0, 6, 0);

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0b0d11, 0);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const cyanPoint = new THREE.PointLight(0x00d1ff, 3, 50);
    cyanPoint.position.set(15, 20, 15);
    scene.add(cyanPoint);

    const goldPoint = new THREE.PointLight(0xe5a93c, 2.5, 50);
    goldPoint.position.set(-15, 10, -15);
    scene.add(goldPoint);

    // 5. Grid Ground Plane
    const gridHelper = new THREE.GridHelper(60, 40, 0x00d1ff, 0x1e2638);
    gridHelper.position.y = -0.1;
    scene.add(gridHelper);

    // 6. Build Architectural Model Geometry
    const floorsGroup = new THREE.Group();
    const coreGroup = new THREE.Group();

    scene.add(floorsGroup);
    scene.add(coreGroup);

    floorsGroupRef.current = floorsGroup;
    coreGroupRef.current = coreGroup;

    rebuildBuilding(activePreset, wireframeMode, explodeValue);

    // Render loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      if (isRotating && !isDraggingRef.current && !settings.reducedMotion) {
        floorsGroup.rotation.y += 0.004;
        coreGroup.rotation.y += 0.004;
      }

      // Smooth camera position from ref
      const radius = 38;
      camera.position.x = radius * Math.sin(cameraRotationRef.current.y) * Math.cos(cameraRotationRef.current.x);
      camera.position.y = radius * Math.sin(cameraRotationRef.current.x) + 6;
      camera.position.z = radius * Math.cos(cameraRotationRef.current.y) * Math.cos(cameraRotationRef.current.x);
      camera.lookAt(0, 8, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Handle Window Resize
    const handleResize = () => {
      if (!mountRef.current || !renderer) return;
      const newW = mountRef.current.clientWidth;
      const newH = mountRef.current.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (renderer.domElement && mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Rebuild building function whenever preset or wireframe mode changes
  const rebuildBuilding = (preset: string, wireframe: boolean, explode: number) => {
    if (!floorsGroupRef.current || !coreGroupRef.current) return;

    const floors = floorsGroupRef.current;
    const core = coreGroupRef.current;

    // Clear previous mesh children
    while (floors.children.length > 0) {
      const child = floors.children[0] as THREE.Mesh;
      if (child.geometry) child.geometry.dispose();
      floors.remove(child);
    }
    while (core.children.length > 0) {
      const child = core.children[0] as THREE.Mesh;
      if (child.geometry) child.geometry.dispose();
      core.remove(child);
    }

    if (preset === 'tower') {
      // Skyscraper Twisting Tower
      const numFloors = 24;
      const baseRadius = 6;
      const floorHeight = 0.85;

      // Central core column
      const coreGeo = new THREE.CylinderGeometry(1.8, 2.2, numFloors * floorHeight, 16);
      const coreMat = new THREE.MeshBasicMaterial({
        color: 0x00d1ff,
        wireframe: true,
        transparent: true,
        opacity: 0.35
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      coreMesh.position.y = (numFloors * floorHeight) / 2;
      core.add(coreMesh);

      // Floorplates & perimeter diagrid
      for (let i = 0; i < numFloors; i++) {
        const progress = i / numFloors;
        const currentRadius = baseRadius * (1 - progress * 0.35);
        const rotationAngle = (i / numFloors) * Math.PI * 0.45; // Twisting silhouette

        // Octagonal floor plate
        const floorGeo = new THREE.CylinderGeometry(currentRadius, currentRadius * 0.98, 0.2, 8);
        const edges = new THREE.EdgesGeometry(floorGeo);

        const cyanColor = new THREE.Color(0x00d1ff);
        const goldColor = new THREE.Color(0xe5a93c);
        const floorColor = i % 3 === 0 ? goldColor : cyanColor;

        const lineMat = new THREE.LineBasicMaterial({
          color: floorColor,
          linewidth: 1.5,
          transparent: true,
          opacity: 0.85
        });

        const lineMesh = new THREE.LineSegments(edges, lineMat);

        if (!wireframe) {
          const fillMat = new THREE.MeshStandardMaterial({
            color: 0x12161f,
            roughness: 0.2,
            metalness: 0.8,
            transparent: true,
            opacity: 0.65
          });
          const fillMesh = new THREE.Mesh(floorGeo, fillMat);
          fillMesh.add(lineMesh);
          fillMesh.position.y = i * (floorHeight + explode * 0.4);
          fillMesh.rotation.y = rotationAngle;
          floors.add(fillMesh);
        } else {
          lineMesh.position.y = i * (floorHeight + explode * 0.4);
          lineMesh.rotation.y = rotationAngle;
          floors.add(lineMesh as unknown as THREE.Object3D);
        }
      }

      setModelStats({
        polygons: 18420,
        twistAngle: '22.5°',
        windLoad: '-42%',
        height: '380m'
      });
    } else if (preset === 'pavilion') {
      // Dragonfly Biomimetic Pavilion Canopy
      const radialSegments = 20;
      const rings = 8;

      for (let r = 1; r <= rings; r++) {
        const radius = r * 2.2;
        const ringGeo = new THREE.TorusGeometry(radius, 0.12, 8, radialSegments);
        const edges = new THREE.EdgesGeometry(ringGeo);
        const lineMat = new THREE.LineBasicMaterial({
          color: r % 2 === 0 ? 0x00d1ff : 0xe5a93c,
          transparent: true,
          opacity: 0.9
        });
        const ringLine = new THREE.LineSegments(edges, lineMat);

        const waveY = Math.sin(r * 0.6) * 3 + 4;
        ringLine.position.y = waveY + explode * r * 0.3;
        floors.add(ringLine as unknown as THREE.Object3D);
      }

      setModelStats({
        polygons: 9840,
        twistAngle: 'Biomimetic Voronoi',
        windLoad: '-55%',
        height: '18m'
      });
    } else {
      // Complex Skybridge Urban Hub
      for (let b = 0; b < 3; b++) {
        const angle = (b / 3) * Math.PI * 2;
        const posX = Math.cos(angle) * 12;
        const posZ = Math.sin(angle) * 12;

        const subTowerGeo = new THREE.BoxGeometry(4, 18, 4, 4, 12, 4);
        const subEdges = new THREE.EdgesGeometry(subTowerGeo);
        const lineMat = new THREE.LineBasicMaterial({ color: 0x00d1ff, transparent: true, opacity: 0.8 });
        const subLine = new THREE.LineSegments(subEdges, lineMat);
        subLine.position.set(posX, 9, posZ);
        floors.add(subLine as unknown as THREE.Object3D);
      }

      // Connecting skybridge ring
      const ringGeo = new THREE.TorusGeometry(12, 1.2, 8, 24);
      const ringEdges = new THREE.EdgesGeometry(ringGeo);
      const ringLineMat = new THREE.LineBasicMaterial({ color: 0xe5a93c, transparent: true, opacity: 0.95 });
      const skyRing = new THREE.LineSegments(ringEdges, ringLineMat);
      skyRing.position.y = 12 + explode * 2;
      skyRing.rotation.x = Math.PI / 2;
      core.add(skyRing as unknown as THREE.Object3D);

      setModelStats({
        polygons: 24100,
        twistAngle: '360° Ring Connector',
        windLoad: '-38%',
        height: '120m'
      });
    }
  };

  // Trigger rebuild when controls change
  useEffect(() => {
    rebuildBuilding(activePreset, wireframeMode, explodeValue);
  }, [activePreset, wireframeMode, explodeValue]);

  // Mouse drag handlers for orbit navigation
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    cameraRotationRef.current.y += deltaX * 0.008;
    cameraRotationRef.current.x = Math.max(-1.1, Math.min(1.1, cameraRotationRef.current.x + deltaY * 0.008));

    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <section className="relative w-full h-[90vh] min-h-[640px] max-h-[1000px] bg-[#0B0D11] overflow-hidden flex flex-col justify-between border-b border-white/10">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial-glow pointer-events-none z-0" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none z-0" />

      {/* 3D Canvas Canvas Container */}
      <div
        ref={mountRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing select-none"
      />

      {/* Top Left HUD Info Tagline */}
      <div className="relative z-10 pt-24 px-6 md:px-12 max-w-2xl pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-wider mb-4 animate-pulse">
          <Zap className="w-3.5 h-3.5" />
          <span>PARAMETRIC MODEL // V5.4 ACTIVE</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white font-syne leading-[1.1] mb-4 drop-shadow-md">
          Spatial Autonomy & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-200 to-amber-300">Algorithmic Form</span>
        </h1>
        <p className="text-zinc-300 text-base md:text-lg font-normal leading-relaxed max-w-xl mb-6">
          A living architectural archive exploring bio-computational facades, carbon-negative structures, and high-density vertical urbanism.
        </p>

        {/* CTA Button */}
        <div className="pointer-events-auto flex flex-wrap items-center gap-4">
          <button
            onClick={onExploreClick}
            className="group relative px-7 py-3.5 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 text-slate-950 font-bold font-mono tracking-wider text-sm transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,209,255,0.4)] hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
          >
            <span>EXPLORE PROJECTS</span>
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </button>

          <a
            href="#studio"
            className="px-6 py-3.5 rounded-lg glass-panel hover:bg-white/10 text-zinc-200 text-sm font-mono tracking-wider transition-all border border-white/10 hover:border-cyan-500/40"
          >
            STUDIO PHILOSOPHY
          </a>
        </div>
      </div>

      {/* Floating 3D Living Model HUD Control Panel (Right) */}
      <div className="relative z-10 p-4 md:p-6 self-end w-full max-w-md px-6 pointer-events-auto mb-4">
        <div className="glass-panel p-4 md:p-5 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-2 text-cyan-400 font-medium">
              <Sliders className="w-3.5 h-3.5" />
              LIVING MODEL CONTROLS
            </span>
            <span className="text-[10px] text-zinc-500 uppercase">3D Engine: WebGL2</span>
          </div>

          {/* Model Presets Selector */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <button
              onClick={() => setActivePreset('tower')}
              className={`py-2 px-2 text-xs font-mono rounded-md border transition-all text-center ${
                activePreset === 'tower'
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-semibold'
                  : 'bg-zinc-900/60 border-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              TOWER
            </button>
            <button
              onClick={() => setActivePreset('pavilion')}
              className={`py-2 px-2 text-xs font-mono rounded-md border transition-all text-center ${
                activePreset === 'pavilion'
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-semibold'
                  : 'bg-zinc-900/60 border-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              PAVILION
            </button>
            <button
              onClick={() => setActivePreset('complex')}
              className={`py-2 px-2 text-xs font-mono rounded-md border transition-all text-center ${
                activePreset === 'complex'
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-semibold'
                  : 'bg-zinc-900/60 border-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              SKYBRIDGE
            </button>
          </div>

          {/* Toggles & Explosive Diagram Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-300 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                Render Mode:
              </span>
              <button
                onClick={() => setWireframeMode(!wireframeMode)}
                className="px-3 py-1 text-xs font-mono rounded bg-white/5 hover:bg-white/10 text-cyan-300 border border-cyan-500/30"
              >
                {wireframeMode ? 'Wireframe Mesh' : 'Solid Shaded'}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-300 flex items-center gap-1.5">
                {isRotating ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-cyan-400" />}
                Auto Rotation:
              </span>
              <button
                onClick={() => setIsRotating(!isRotating)}
                className={`px-3 py-1 text-xs font-mono rounded border ${
                  isRotating ? 'bg-amber-500/20 border-amber-400 text-amber-300' : 'bg-white/5 border-white/10 text-zinc-400'
                }`}
              >
                {isRotating ? 'ACTIVE' : 'PAUSED'}
              </button>
            </div>

            {/* Disassembly / Explode Slider */}
            <div>
              <div className="flex justify-between text-[11px] font-mono text-zinc-400 mb-1">
                <span className="flex items-center gap-1">
                  <Layers className="w-3 h-3 text-cyan-400" />
                  Floor Disassembly:
                </span>
                <span className="text-cyan-300">{Math.round(explodeValue * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={explodeValue}
                onChange={(e) => setExplodeValue(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 bg-zinc-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Live HUD Metrics Grid */}
          <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-[11px] font-mono">
            <div className="p-2 rounded bg-zinc-900/60 border border-white/5">
              <span className="text-zinc-500 block text-[10px]">POLYGON COUNT</span>
              <span className="text-cyan-300 font-bold">{modelStats.polygons.toLocaleString()}</span>
            </div>
            <div className="p-2 rounded bg-zinc-900/60 border border-white/5">
              <span className="text-zinc-500 block text-[10px]">WIND DENSITY LOAD</span>
              <span className="text-emerald-400 font-bold">{modelStats.windLoad}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="relative z-10 px-6 pb-4 text-center text-xs font-mono text-zinc-500 pointer-events-none hidden md:block">
        [ DRAG TO ROTATE CAMERA // SCROLL TO EXPAND FLOORPLATES ]
      </div>
    </section>
  );
};
