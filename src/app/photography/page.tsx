'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, photographyCatalogue, Project } from '@/lib/data';
import { Lightbox } from '@/components/Lightbox';
import { Collectors } from '@/components/Collectors';
import { FileText, ChevronDown, ChevronUp, ArrowRight, Eye, Mail } from 'lucide-react';

export default function PhotographyPage() {
  const photos = projects.filter((p) => p.category === 'photography');
  
  // Lightbox State
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Curatorial essay collapse state
  const [showEssay, setShowEssay] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const openLightbox = (projectId: string) => {
    const idx = photos.findIndex((p) => p.id === projectId);
    if (idx !== -1) {
      setLightboxIndex(idx);
      setIsLightboxOpen(true);
    }
  };

  // Group photos chronologically by suite
  const suite2016 = photos.filter((p) => p.year === '2016');
  const suite2018 = photos.filter((p) => p.year === '2018');
  const suite2020 = photos.filter((p) => p.year === '2020');

  return (
    <div className="pt-32 md:pt-48 pb-32 px-0 md:px-0 min-h-screen bg-background text-foreground">
      {/* Editorial Header */}
      <header className="mb-20 px-6 md:px-12 max-w-4xl mx-auto text-center animate-reveal-up">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-muted/80 bg-warm-gray/40 px-3 py-1 rounded-full">
            First Catalogue Collection
          </span>
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-accent-olive/90 bg-accent-olive/10 px-3 py-1 rounded-full">
            1/1 Unique Editions
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-editorial-serif italic mb-4">
          {photographyCatalogue.title}
        </h1>

        <p className="text-xs uppercase tracking-[0.2em] text-muted mb-6">
          {photographyCatalogue.subtitle} &middot; {photographyCatalogue.period}
        </p>

        <p className="text-sm md:text-base text-muted leading-relaxed max-w-2xl mx-auto mb-10">
          Twelve humane encounters across labour, belonging, solitude, companionship, and hope.
          Original photographic captures reinterpreted through digital artistic treatments, issued as
          singular physical fine-art prints.
        </p>

        {/* Catalogue & Inquiry Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
          <a
            href={`mailto:fomeozuwobss@gmail.com?subject=${encodeURIComponent("Catalogue Request: Humanised Landscape Gallery Catalogue")}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/30 text-white hover:bg-white/10 text-xs font-mono uppercase tracking-wider transition-colors group"
          >
            <Mail size={15} className="group-hover:translate-y-0.5 transition-transform" />
            <span>Request Gallery Catalogue</span>
          </a>

          <a
            href={`mailto:${photographyCatalogue.contactEmail}?subject=Acquisition%20Inquiry%3A%20The%20Art%20of%20Everyday%20Life`}
            className="inline-flex items-center gap-2 px-6 py-3 border border-border hover:border-foreground/60 transition-editorial text-foreground font-medium tracking-wide"
          >
            <Mail size={15} />
            <span>Inquire on Collection</span>
          </a>
        </div>
      </header>

      {/* Curatorial Essay & Artist Profile Collapsible Section */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 mb-32">
        <div className="border-y border-border divide-y divide-border">
          {/* Curatorial Essay Toggle */}
          <div className="py-6">
            <button
              onClick={() => setShowEssay(!showEssay)}
              className="w-full flex items-center justify-between text-left group cursor-pointer"
            >
              <div>
                <span className="text-[9px] uppercase tracking-widest text-muted block mb-1">
                  Curatorial Essay
                </span>
                <h3 className="text-xl font-editorial-serif italic text-foreground group-hover:text-accent-olive transition-colors">
                  &ldquo;{photographyCatalogue.curatorialEssay.title}&rdquo;
                </h3>
              </div>
              <span className="text-xs text-muted flex items-center gap-1">
                {showEssay ? 'Close' : 'Read Essay'}
                {showEssay ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </span>
            </button>

            <AnimatePresence>
              {showEssay && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden pt-6 space-y-4 text-sm text-muted leading-relaxed"
                >
                  {photographyCatalogue.curatorialEssay.paragraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                  <div className="pt-4 border-t border-border/40 text-[11px] font-mono text-muted/70">
                    Extracted from the official exhibition catalogue &middot; Humanised Landscape
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Artist Profile Toggle */}
          <div className="py-6">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="w-full flex items-center justify-between text-left group cursor-pointer"
            >
              <div>
                <span className="text-[9px] uppercase tracking-widest text-muted block mb-1">
                  Practice & Methodology
                </span>
                <h3 className="text-xl font-editorial-serif italic text-foreground group-hover:text-accent-olive transition-colors">
                  Artist Profile: Ozuwo Enifome
                </h3>
              </div>
              <span className="text-xs text-muted flex items-center gap-1">
                {showProfile ? 'Close' : 'Read Profile'}
                {showProfile ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </span>
            </button>

            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden pt-6 space-y-4 text-sm text-muted leading-relaxed"
                >
                  {photographyCatalogue.artistProfile.paragraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Photography Suites Flow */}
      <section className="space-y-40">

        {/* SUITE 1: 2016 — Encounter & Companionship */}
        <div>
          <div className="px-6 md:px-12 max-w-5xl mx-auto mb-16 text-center">
            <span className="text-editorial-meta mb-2 block">Suite I &middot; 2016</span>
            <h2 className="text-2xl md:text-3xl font-editorial-serif italic">Encounter & Companionship</h2>
            <div className="w-12 h-px bg-border mx-auto mt-4" />
          </div>

          {/* Feature 1: The Hopelessness of Hope (Large portrait) & Three is Company (Diptych format) */}
          <div className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center mb-16 max-w-7xl mx-auto">
            {suite2016[0] && (
              <div className="md:col-span-5 flex flex-col">
                <ArtworkCard
                  project={suite2016[0]}
                  onOpenLightbox={() => openLightbox(suite2016[0].id)}
                />
              </div>
            )}
            {suite2016[1] && (
              <div className="md:col-span-7 flex flex-col">
                <ArtworkCard
                  project={suite2016[1]}
                  onOpenLightbox={() => openLightbox(suite2016[1].id)}
                />
              </div>
            )}
          </div>

          {/* Pair: Untitled & Friends (Square formats) */}
          <div className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-7xl mx-auto">
            {suite2016.slice(2, 4).map((item) => (
              <ArtworkCard
                key={item.id}
                project={item}
                onOpenLightbox={() => openLightbox(item.id)}
              />
            ))}
          </div>
        </div>

        {/* SUITE 2: 2018 — Contrast, Labour & Solitude */}
        <div>
          <div className="px-6 md:px-12 max-w-5xl mx-auto mb-16 text-center">
            <span className="text-editorial-meta mb-2 block">Suite II &middot; 2018</span>
            <h2 className="text-2xl md:text-3xl font-editorial-serif italic">Contrast, Labour & Solitude</h2>
            <div className="w-12 h-px bg-border mx-auto mt-4" />
          </div>

          {/* Contrast of Life 1 & Market Woman */}
          <div className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center mb-16 max-w-7xl mx-auto">
            {suite2018[0] && (
              <div className="md:col-span-6 flex flex-col">
                <ArtworkCard
                  project={suite2018[0]}
                  onOpenLightbox={() => openLightbox(suite2018[0].id)}
                />
              </div>
            )}
            {suite2018[1] && (
              <div className="md:col-span-6 flex flex-col">
                <ArtworkCard
                  project={suite2018[1]}
                  onOpenLightbox={() => openLightbox(suite2018[1].id)}
                />
              </div>
            )}
          </div>

          {/* Contrast of Life 2, Fulani Woman & Light at the End of the Tunnel (Triptych) */}
          <div className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-7xl mx-auto">
            {suite2018.slice(2, 5).map((item) => (
              <ArtworkCard
                key={item.id}
                project={item}
                onOpenLightbox={() => openLightbox(item.id)}
              />
            ))}
          </div>
        </div>

        {/* SUITE 3: 2020 — Waterscapes & Collective Motion */}
        <div>
          <div className="px-6 md:px-12 max-w-5xl mx-auto mb-16 text-center">
            <span className="text-editorial-meta mb-2 block">Suite III &middot; 2020</span>
            <h2 className="text-2xl md:text-3xl font-editorial-serif italic">Waterscapes & Collective Motion</h2>
            <div className="w-12 h-px bg-border mx-auto mt-4" />
          </div>

          {/* Full bleed view: Face to Face Conversation */}
          {suite2020[0] && (
            <div className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
              <ArtworkCard
                project={suite2020[0]}
                onOpenLightbox={() => openLightbox(suite2020[0].id)}
                isFeatured
              />
            </div>
          )}

          {/* Pair: Kids Washing & Argungu Sprint */}
          <div className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-7xl mx-auto">
            {suite2020.slice(1, 3).map((item) => (
              <ArtworkCard
                key={item.id}
                project={item}
                onOpenLightbox={() => openLightbox(item.id)}
              />
            ))}
          </div>
        </div>

      </section>

      {/* Catalogue Authentication & Object Record Callout */}
      <section className="mt-40 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="p-8 md:p-12 border border-border bg-warm-gray/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-8 border-b border-border/80">
            <div>
              <span className="text-editorial-meta block mb-2">Catalogue Specification</span>
              <h3 className="text-2xl font-editorial-serif italic">
                {photographyCatalogue.editionFramework.title}
              </h3>
            </div>
            <a
            href={`mailto:fomeozuwobss@gmail.com?subject=${encodeURIComponent("Catalogue Request: Humanised Landscape Gallery Catalogue")}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/30 text-white hover:bg-white/10 text-xs font-mono uppercase tracking-wider transition-colors group"
          >
            <Mail size={15} className="group-hover:translate-y-0.5 transition-transform" />
            <span>Request Gallery Catalogue</span>
          </a>
          </div>

          <p className="text-sm text-muted leading-relaxed mb-6">
            {photographyCatalogue.editionFramework.summary}
          </p>

          <ul className="space-y-3 text-xs text-muted/90">
            {photographyCatalogue.editionFramework.points.map((pt, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="text-accent-olive mt-0.5">&bull;</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Acquisition Section */}
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

// Reusable Artwork Card for Photography Collection
interface ArtworkCardProps {
  project: Project;
  onOpenLightbox: () => void;
  isFeatured?: boolean;
}

function ArtworkCard({ project, onOpenLightbox, isFeatured }: ArtworkCardProps) {
  // Determine aspect container class based on project orientation
  const aspectClass = isFeatured
    ? 'aspect-[16/9] md:aspect-[21/9]'
    : project.aspectRatio === 'portrait'
    ? 'aspect-[3/4] md:aspect-[4/5]'
    : project.aspectRatio === 'square'
    ? 'aspect-square'
    : 'aspect-[4/3] md:aspect-[16/10]';

  return (
    <div className="flex flex-col group">
      {/* Visual Frame */}
      <div
        onClick={onOpenLightbox}
        className={`relative ${aspectClass} cursor-pointer bg-warm-gray/15 overflow-hidden transition-editorial`}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-contain p-6 md:p-10 transition-slow group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Top-right Catalogue Pill */}
        <div className="absolute top-4 right-4 z-10">
          <span className="text-[10px] font-mono tracking-widest uppercase bg-background/90 backdrop-blur-sm px-2.5 py-1 text-foreground/80 border border-border/60">
            {project.catalogueId || project.year}
          </span>
        </div>

        {/* Hover Action Badge */}
        <div className="absolute inset-0 bg-[#1A1A1A]/75 opacity-0 group-hover:opacity-100 transition-editorial flex flex-col justify-between p-6 text-[#F8F7F4]">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/60">
              {project.catalogueId} &middot; Edition 1/1
            </span>
            <span className="text-xs font-mono text-white/70">{project.year}</span>
          </div>

          <div>
            <h4 className="text-xl md:text-2xl font-editorial-serif italic mb-2 text-white">
              {project.title}
            </h4>
            <p className="text-xs text-white/80 line-clamp-3 leading-relaxed max-w-md">
              {project.story}
            </p>
          </div>

          <div className="flex justify-between items-end text-[11px] text-white/50 pt-2 border-t border-white/20">
            <span>{project.dimensions}</span>
            <span className="inline-flex items-center gap-1 text-white font-medium">
              Inspect Frame <Eye size={12} />
            </span>
          </div>
        </div>
      </div>

      {/* Caption Meta Below Frame */}
      <div className="mt-4 flex justify-between items-start text-xs">
        <div>
          <Link
            href={`/work/${project.id}`}
            className="font-editorial-serif italic text-base md:text-lg hover:text-accent-olive transition-colors flex items-center gap-1.5"
          >
            {project.title}
            <ArrowRight size={13} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-muted" />
          </Link>
          <p className="text-[11px] text-muted mt-0.5">
            {project.medium} &middot; {project.dimensions}
          </p>
        </div>

        <div className="text-right flex flex-col items-end">
          <span className="text-[10px] font-mono uppercase tracking-wider text-accent-olive font-semibold">
            1/1 Edition
          </span>
          <span className="text-[10px] font-mono text-muted/70">{project.year}</span>
        </div>
      </div>
    </div>
  );
}
