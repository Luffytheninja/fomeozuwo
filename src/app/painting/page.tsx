'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projects, Project } from '@/lib/data';
import { Lightbox } from '@/components/Lightbox';
import { Collectors } from '@/components/Collectors';
import { ArrowRight, Maximize2 } from 'lucide-react';

export default function PaintingPage() {
  const paintings = projects.filter((p) => p.category === 'painting');
  
  // Lightbox State
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <div className="pt-32 md:pt-48 pb-32 px-6 md:px-12 max-w-[1400px] mx-auto min-h-screen">
      {/* Editorial Header */}
      <header className="mb-32 max-w-2xl animate-reveal-up">
        <span className="text-editorial-meta mb-4 block">Original Works</span>
        <h1 className="text-display-medium mb-6">The Paintings</h1>
        <p className="text-sm text-muted leading-relaxed">
          One-of-one physical assets designed to anchor contemporary spaces. Working primarily in oil on canvas and mixed media, these pieces explore Yoruba ceremonies, Lagos transit, and reflections of stilt communities.
        </p>
      </header>

      {/* Paintings Museum Walk */}
      <section className="space-y-64">
        {paintings.map((painting, index) => {
          const isEven = index % 2 === 0;
          return (
            <article
              key={painting.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center`}
            >
              {/* Image Frame */}
              <div 
                className={`lg:col-span-7 relative aspect-[4/3] md:aspect-[3/2] cursor-pointer group bg-warm-gray/20 overflow-hidden ${
                  isEven ? 'lg:order-1' : 'lg:order-2'
                }`}
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={painting.image}
                  alt={painting.title}
                  fill
                  className="object-contain p-6 transition-slow group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                
                {/* Maximize Icon Overlay */}
                <div className="absolute bottom-6 right-6 p-3 bg-[#1A1A1A]/80 text-[#F8F7F4] rounded-full opacity-0 group-hover:opacity-100 transition-editorial flex items-center justify-center">
                  <Maximize2 size={16} />
                </div>
              </div>

              {/* Painting Narrative & Stats */}
              <div 
                className={`lg:col-span-5 flex flex-col justify-center ${
                  isEven ? 'lg:order-2' : 'lg:order-1'
                } animate-reveal-up`}
              >
                <div className="flex justify-between items-baseline border-b border-border/80 pb-4 mb-8">
                  <h2 className="text-3xl font-editorial-serif italic tracking-tight">{painting.title}</h2>
                  <span className="text-sm font-mono text-muted">{painting.year}</span>
                </div>

                <p className="text-sm text-muted leading-relaxed mb-8 italic">
                  &ldquo;{painting.story}&rdquo;
                </p>

                {/* Specs List */}
                <div className="grid grid-cols-2 gap-6 text-xs uppercase tracking-wider text-muted/80 mb-8 border-t border-border/40 pt-6">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-muted block mb-1">Medium</span>
                    <span className="text-foreground font-semibold">{painting.medium}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-muted block mb-1">Dimensions</span>
                    <span className="text-foreground font-semibold">{painting.dimensions}</span>
                  </div>
                </div>

                <div className="flex gap-6 mt-4">
                  <Link
                    href={`/work/${painting.id}`}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground hover:text-accent-olive transition-colors group"
                  >
                    View Details & Brushstrokes
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* Provenance details */}
      <Collectors />

      {/* Lightbox for Paintings */}
      <Lightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        projectsList={paintings}
        currentIndex={lightboxIndex}
        onNavigate={(index) => setLightboxIndex(index)}
      />
    </div>
  );
}
