'use client';

import { useState } from 'react';
import Image from 'next/image';
import { projects, Project } from '@/lib/data';
import { Lightbox } from '@/components/Lightbox';
import { Collectors } from '@/components/Collectors';
import { Maximize2 } from 'lucide-react';

export default function PhotographyPage() {
  const photos = projects.filter((p) => p.category === 'photography');
  
  // Lightbox State
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (projectId: string) => {
    const idx = photos.findIndex((p) => p.id === projectId);
    if (idx !== -1) {
      setLightboxIndex(idx);
      setIsLightboxOpen(true);
    }
  };

  // Group photos into a custom editorial narrative block structure:
  // - Block 1: Full-Bleed Landscape (Sunset Over Canoe Park)
  // - Block 2: Diptych (Contrast of Life I & Contrast of Life II)
  // - Block 3: Diptych (Contrast of Life III & Contrast of Life IV)
  // - Block 4: Full-Bleed Landscape (Window to Our World)
  // - Block 5: Diptych (Contrast of Life V & Contrast of Life VI)
  // - Block 6: Diptych (Window to My World I & Window to My World II)

  const sunset = photos.find((p) => p.id === 'photo-1');
  const contrast1 = photos.find((p) => p.id === 'photo-2');
  const contrast2 = photos.find((p) => p.id === 'photo-3');
  const contrast3 = photos.find((p) => p.id === 'photo-4');
  const contrast4 = photos.find((p) => p.id === 'photo-5');
  const contrast5 = photos.find((p) => p.id === 'photo-11');
  const contrast6 = photos.find((p) => p.id === 'photo-12');
  const window1 = photos.find((p) => p.id === 'photo-6');
  const window2 = photos.find((p) => p.id === 'photo-7');
  const windowOur = photos.find((p) => p.id === 'photo-8');

  return (
    <div className="pt-32 md:pt-48 pb-32 px-0 md:px-0 min-h-screen bg-background">
      {/* Editorial Header - Centered with margins */}
      <header className="mb-32 px-6 md:px-12 max-w-2xl mx-auto animate-reveal-up">
        <span className="text-editorial-meta mb-4 block">Limited Edition Prints</span>
        <h1 className="text-display-medium mb-6">The Photography</h1>
        <p className="text-sm text-muted leading-relaxed">
          Documentary and abstract studies. Printed on heavy cotton rag with archival pigments. These series focus on the spatial geometry of Broad Street and light gradients over the Lagos lagoons.
        </p>
      </header>

      {/* Photography Editorial Narrative Flow */}
      <section className="space-y-48 md:space-y-64">
        
        {/* Block 1: Full Bleed Single */}
        {sunset && (
          <div className="w-full flex justify-center px-4 md:px-12">
            <div 
              onClick={() => openLightbox(sunset.id)}
              className="relative w-full aspect-[16/10] md:aspect-[21/9] cursor-pointer group bg-warm-gray/10 overflow-hidden"
            >
              <Image
                src={sunset.image}
                alt={sunset.title}
                fill
                className="object-contain p-4 md:p-12 transition-slow group-hover:scale-[1.01]"
                sizes="100vw"
                priority
              />

              {/* Hover Overlay Caption */}
              <div className="absolute inset-0 bg-[#1A1A1A]/85 opacity-0 group-hover:opacity-100 transition-editorial flex flex-col justify-between p-8 text-[#F8F7F4]">
                <div className="flex justify-between items-start">
                  <span className="text-xs uppercase tracking-widest text-white/50">{sunset.collection}</span>
                  <span className="text-xs font-mono">{sunset.year}</span>
                </div>
                <div>
                  <h3 className="text-3xl font-editorial-serif italic mb-2">{sunset.title}</h3>
                  <p className="text-xs text-white/70 leading-relaxed max-w-lg">{sunset.story}</p>
                </div>
                <div className="flex justify-between items-end text-xs text-white/40">
                  <span>{sunset.medium}</span>
                  <span>{sunset.dimensions}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Block 2: Diptych (Contrast of Life I & II) */}
        <div className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          {[contrast1, contrast2].map((pic) => {
            if (!pic) return null;
            return (
              <div key={pic.id} className="flex flex-col">
                <div 
                  onClick={() => openLightbox(pic.id)}
                  className="relative aspect-[3/4.5] cursor-pointer group bg-warm-gray/15 overflow-hidden"
                >
                  <Image
                    src={pic.image}
                    alt={pic.title}
                    fill
                    className="object-contain p-8 md:p-16 transition-slow group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Hover Caption */}
                  <div className="absolute inset-0 bg-[#1A1A1A]/85 opacity-0 group-hover:opacity-100 transition-editorial flex flex-col justify-between p-8 text-[#F8F7F4]">
                    <div className="flex justify-between items-start">
                      <span className="text-xs uppercase tracking-widest text-white/50">{pic.collection}</span>
                      <span className="text-xs font-mono">{pic.year}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-editorial-serif italic mb-2">{pic.title}</h3>
                      <p className="text-xs text-white/70 leading-relaxed">{pic.story}</p>
                    </div>
                    <div className="flex justify-between items-end text-xs text-white/40">
                      <span>{pic.medium}</span>
                      <span>{pic.dimensions}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Block 3: Diptych (Contrast of Life III & IV) */}
        <div className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          {[contrast3, contrast4].map((pic) => {
            if (!pic) return null;
            return (
              <div key={pic.id} className="flex flex-col">
                <div 
                  onClick={() => openLightbox(pic.id)}
                  className="relative aspect-[3/4.5] cursor-pointer group bg-warm-gray/15 overflow-hidden"
                >
                  <Image
                    src={pic.image}
                    alt={pic.title}
                    fill
                    className="object-contain p-8 md:p-16 transition-slow group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Hover Caption */}
                  <div className="absolute inset-0 bg-[#1A1A1A]/85 opacity-0 group-hover:opacity-100 transition-editorial flex flex-col justify-between p-8 text-[#F8F7F4]">
                    <div className="flex justify-between items-start">
                      <span className="text-xs uppercase tracking-widest text-white/50">{pic.collection}</span>
                      <span className="text-xs font-mono">{pic.year}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-editorial-serif italic mb-2">{pic.title}</h3>
                      <p className="text-xs text-white/70 leading-relaxed">{pic.story}</p>
                    </div>
                    <div className="flex justify-between items-end text-xs text-white/40">
                      <span>{pic.medium}</span>
                      <span>{pic.dimensions}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Block 4: Large Centered Single (Window to Our World) */}
        {windowOur && (
          <div className="w-full flex justify-center px-6 md:px-24">
            <div 
              onClick={() => openLightbox(windowOur.id)}
              className="relative w-full max-w-5xl aspect-[3/4.5] md:aspect-[4/3] cursor-pointer group bg-warm-gray/10 overflow-hidden"
            >
              <Image
                src={windowOur.image}
                alt={windowOur.title}
                fill
                className="object-contain p-8 md:p-16 transition-slow group-hover:scale-[1.01]"
                sizes="(max-width: 1024px) 100vw, 80vw"
              />

              {/* Hover Caption */}
              <div className="absolute inset-0 bg-[#1A1A1A]/85 opacity-0 group-hover:opacity-100 transition-editorial flex flex-col justify-between p-8 text-[#F8F7F4]">
                <div className="flex justify-between items-start">
                  <span className="text-xs uppercase tracking-widest text-white/50">{windowOur.collection}</span>
                  <span className="text-xs font-mono">{windowOur.year}</span>
                </div>
                <div>
                  <h3 className="text-3xl font-editorial-serif italic mb-2">{windowOur.title}</h3>
                  <p className="text-xs text-white/70 leading-relaxed max-w-lg">{windowOur.story}</p>
                </div>
                <div className="flex justify-between items-end text-xs text-white/40">
                  <span>{windowOur.medium}</span>
                  <span>{windowOur.dimensions}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Block 5: Diptych (Contrast of Life V & VI) */}
        <div className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          {[contrast5, contrast6].map((pic) => {
            if (!pic) return null;
            return (
              <div key={pic.id} className="flex flex-col">
                <div 
                  onClick={() => openLightbox(pic.id)}
                  className="relative aspect-[3/4.5] cursor-pointer group bg-warm-gray/15 overflow-hidden"
                >
                  <Image
                    src={pic.image}
                    alt={pic.title}
                    fill
                    className="object-contain p-8 md:p-16 transition-slow group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Hover Caption */}
                  <div className="absolute inset-0 bg-[#1A1A1A]/85 opacity-0 group-hover:opacity-100 transition-editorial flex flex-col justify-between p-8 text-[#F8F7F4]">
                    <div className="flex justify-between items-start">
                      <span className="text-xs uppercase tracking-widest text-white/50">{pic.collection}</span>
                      <span className="text-xs font-mono">{pic.year}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-editorial-serif italic mb-2">{pic.title}</h3>
                      <p className="text-xs text-white/70 leading-relaxed">{pic.story}</p>
                    </div>
                    <div className="flex justify-between items-end text-xs text-white/40">
                      <span>{pic.medium}</span>
                      <span>{pic.dimensions}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Block 6: Diptych (Window to My World I & II) */}
        <div className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          {[window1, window2].map((pic) => {
            if (!pic) return null;
            return (
              <div key={pic.id} className="flex flex-col">
                <div 
                  onClick={() => openLightbox(pic.id)}
                  className="relative aspect-[3/4.5] cursor-pointer group bg-warm-gray/15 overflow-hidden"
                >
                  <Image
                    src={pic.image}
                    alt={pic.title}
                    fill
                    className="object-contain p-8 md:p-16 transition-slow group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Hover Caption */}
                  <div className="absolute inset-0 bg-[#1A1A1A]/85 opacity-0 group-hover:opacity-100 transition-editorial flex flex-col justify-between p-8 text-[#F8F7F4]">
                    <div className="flex justify-between items-start">
                      <span className="text-xs uppercase tracking-widest text-white/50">{pic.collection}</span>
                      <span className="text-xs font-mono">{pic.year}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-editorial-serif italic mb-2">{pic.title}</h3>
                      <p className="text-xs text-white/70 leading-relaxed">{pic.story}</p>
                    </div>
                    <div className="flex justify-between items-end text-xs text-white/40">
                      <span>{pic.medium}</span>
                      <span>{pic.dimensions}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* Acquisition details */}
      <div className="px-6 md:px-12">
        <Collectors />
      </div>

      {/* Lightbox for Photography */}
      <Lightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        projectsList={photos}
        currentIndex={lightboxIndex}
        onNavigate={(index) => setLightboxIndex(index)}
      />
    </div>
  );
}
