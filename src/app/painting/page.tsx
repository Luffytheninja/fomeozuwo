'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, artists, catalogues, Project } from '@/lib/data';
import { Lightbox } from '@/components/Lightbox';
import { Collectors } from '@/components/Collectors';
import { ArrowRight, Maximize2, FileText, Sparkles, Filter, Mail } from 'lucide-react';

export default function PaintingPage() {
  const allPaintings = projects.filter((p) => p.category === 'painting');
  const [selectedArtistSlug, setSelectedArtistSlug] = useState<string>('all');
  
  // Lightbox State
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const displayedPaintings = selectedArtistSlug === 'all' 
    ? allPaintings 
    : allPaintings.filter((p) => p.artistSlug === selectedArtistSlug);

  const activeArtist = artists.find((a) => a.slug === selectedArtistSlug);
  const activeCatalogue = catalogues.find((c) => c.artistSlug === selectedArtistSlug);

  const openLightboxForWork = (workId: string) => {
    const idx = displayedPaintings.findIndex((p) => p.id === workId);
    if (idx !== -1) {
      setLightboxIndex(idx);
      setIsLightboxOpen(true);
    }
  };

  const paintingArtists = artists.filter((a) => a.category === 'painting');

  return (
    <div className="pt-32 md:pt-48 pb-32 px-6 md:px-12 max-w-[1500px] mx-auto min-h-screen text-foreground">
      {/* Editorial Header */}
      <header className="mb-20 max-w-3xl animate-reveal-up">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-muted bg-warm-gray/40 px-3 py-1 rounded-full">
            The Painting Archive
          </span>
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-accent-olive bg-accent-olive/10 px-3 py-1 rounded-full">
            55 Documented Works
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-editorial-serif italic mb-6">
          Paintings & Works on Paper
        </h1>
        <p className="text-sm md:text-base text-muted leading-relaxed">
          Spanning direct student-era patronage to senior studio practice. Featuring 55 original works across oil on canvas, 
          sawdust-primed supports, metal-foil relief, antique ink, gouache, and fabric collage by Kelani Abass, Muyiwa Akinwolere, 
          and Johnson Babatunde Shobowale.
        </p>
      </header>

      {/* Artist Filter Selector */}
      <div className="mb-16 border-y border-border py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted mr-2">
            Select Artist:
          </span>
          <button
            onClick={() => setSelectedArtistSlug('all')}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-full transition-all ${
              selectedArtistSlug === 'all'
                ? 'bg-foreground text-background font-bold'
                : 'bg-warm-gray/40 text-muted hover:text-foreground'
            }`}
          >
            All Painters ({allPaintings.length})
          </button>
          {paintingArtists.map((artist) => (
            <button
              key={artist.slug}
              onClick={() => setSelectedArtistSlug(artist.slug)}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider whitespace-nowrap rounded-full transition-all ${
                selectedArtistSlug === artist.slug
                  ? 'bg-foreground text-background font-bold'
                  : 'bg-warm-gray/40 text-muted hover:text-foreground'
              }`}
            >
              {artist.name} ({artist.worksCount})
            </button>
          ))}
        </div>

        {activeCatalogue ? (
          <a
            href={`mailto:fomeozuwobss@gmail.com?subject=${encodeURIComponent("Catalogue Request: " + activeCatalogue.title)}`}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1A1A1A] hover:bg-black text-[#F8F7F4] text-xs font-mono uppercase tracking-wider transition-colors shadow-xs"
          >
            <Mail size={13} />
            Request Catalogue
          </a>
        ) : (
          <span className="text-xs font-mono text-muted">
            Select an artist to request the dedicated catalogue
          </span>
        )}
      </div>

      {/* Artist Profile Spotlight (when an artist is selected) */}
      <AnimatePresence mode="wait">
        {activeArtist && activeCatalogue && (
          <motion.div
            key={activeArtist.slug}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="mb-20 p-8 md:p-12 bg-warm-gray/20 border border-border grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent-olive font-bold">
                  {activeArtist.role}
                </span>
                <span className="text-xs font-mono text-muted">&middot; {activeArtist.period}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-editorial-serif italic text-foreground">
                {activeArtist.name}
              </h2>
              <p className="text-xs md:text-sm text-muted leading-relaxed max-w-2xl">
                {activeArtist.bio}
              </p>
              <div className="pt-2">
                <span className="text-[10px] font-mono text-muted/80 block mb-1">CATALOGUE PUBLICATION</span>
                <p className="text-xs font-semibold text-foreground">
                  {activeCatalogue.title} &mdash; {activeCatalogue.subtitle}
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center gap-4">
              <a
            href={`mailto:fomeozuwobss@gmail.com?subject=${encodeURIComponent("Catalogue Request: " + activeCatalogue.title)}`}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1A1A1A] hover:bg-black text-[#F8F7F4] text-xs font-mono uppercase tracking-wider transition-colors shadow-xs"
          >
            <Mail size={13} />
            Request Catalogue
          </a>
              <span className="text-[10px] font-mono text-muted">
                {activeArtist.worksCount} documented artworks in catalogue
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Paintings Museum Walk / Gallery */}
      <section className="space-y-32 md:space-y-48">
        {displayedPaintings.map((painting, index) => {
          const isEven = index % 2 === 0;
          return (
            <article
              key={painting.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center"
            >
              {/* Image Frame */}
              <div 
                className={`lg:col-span-7 relative aspect-[4/3] md:aspect-[3/2] cursor-pointer group bg-warm-gray/20 overflow-hidden border border-border/50 ${
                  isEven ? 'lg:order-1' : 'lg:order-2'
                }`}
                onClick={() => openLightboxForWork(painting.id)}
              >
                <Image
                  src={painting.image}
                  alt={painting.title}
                  fill
                  className="object-contain p-6 md:p-8 transition-slow group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />

                {/* Top Catalogue Pill */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 bg-background/90 text-foreground border border-border/70 backdrop-blur-xs font-bold">
                    {painting.catalogueId}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 bg-background/90 text-muted border border-border/70 backdrop-blur-xs">
                    {painting.artist}
                  </span>
                </div>
                
                {/* Maximize Icon Overlay */}
                <div className="absolute bottom-6 right-6 p-3 bg-[#1A1A1A]/85 text-[#F8F7F4] rounded-full opacity-0 group-hover:opacity-100 transition-editorial flex items-center justify-center hover:scale-110">
                  <Maximize2 size={15} />
                </div>
              </div>

              {/* Painting Narrative & Specs */}
              <div 
                className={`lg:col-span-5 flex flex-col justify-center ${
                  isEven ? 'lg:order-2' : 'lg:order-1'
                } animate-reveal-up`}
              >
                <div className="flex justify-between items-baseline border-b border-border/80 pb-4 mb-6">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted block mb-1">
                      {painting.artist} &middot; {painting.collection}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-editorial-serif italic tracking-tight">
                      {painting.title}
                    </h2>
                  </div>
                  <span className="text-sm font-mono text-muted shrink-0 ml-4">{painting.year}</span>
                </div>

                <p className="text-xs md:text-sm text-muted leading-relaxed mb-6">
                  {painting.story}
                </p>

                {/* Provenance quote */}
                {painting.provenance && (
                  <div className="p-3 bg-warm-gray/25 border-l-2 border-accent-olive text-[11px] font-mono text-muted/90 mb-6 leading-relaxed">
                    <span className="text-[9px] uppercase tracking-widest text-accent-olive block mb-0.5">Provenance</span>
                    {painting.provenance}
                  </div>
                )}

                {/* Specs List */}
                <div className="grid grid-cols-2 gap-4 text-xs font-mono text-muted/80 mb-6 border-t border-border/40 pt-4">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-muted block mb-1">Medium</span>
                    <span className="text-foreground font-semibold line-clamp-2">{painting.medium}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-muted block mb-1">Dimensions</span>
                    <span className="text-foreground font-semibold">{painting.dimensions}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 mt-2">
                  <Link
                    href={`/work/${painting.id}`}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground hover:text-accent-olive transition-colors group font-semibold"
                  >
                    <span>View Work Particulars</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* Collectors section */}
      <Collectors />

      {/* Lightbox for large format zoom */}
      <Lightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        projectsList={displayedPaintings}
        currentIndex={lightboxIndex}
        onNavigate={(index) => setLightboxIndex(index)}
      />
    </div>
  );
}
