'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { catalogues, projects } from '@/lib/data';
import { BackToTop } from '@/components/BackToTop';
import { Directory } from '@/components/Directory';
import { Collectors } from '@/components/Collectors';
import { ArrowDown, ArrowRight, Mail } from 'lucide-react';

// Curated artworks across painting and photography spanning all four artists
const HERO_SLIDES = [
  {
    src: '/images/paintings/early-patronage/KA-03_traditional-musicians.webp',
    alt: 'Traditional Musicians by Kelani Abass',
    artist: 'Kelani Abass',
    medium: 'Painting',
  },
  {
    src: '/images/collections/akinwolere/ma-05.webp',
    alt: 'Figures & Line by Muyiwa Akinwolere',
    artist: 'Muyiwa Akinwolere',
    medium: 'Painting',
  },
  {
    src: '/images/collections/shobowale/jbs-002.webp',
    alt: 'Mixed Media on Wood by Johnson Babatunde Shobowale',
    artist: 'Johnson Babatunde Shobowale',
    medium: 'Mixed Media',
  },
  {
    src: '/images/photography/art-of-everyday-life/OE-PH010_face-to-face-conversation.webp',
    alt: 'Face to Face Conversation by Ozuwo Enifome',
    artist: 'Ozuwo Enifome',
    medium: 'Fine Art Photography',
  },
  {
    src: '/images/paintings/enifome/oe-p001.webp',
    alt: 'Daily Hustle by Ozuwo Enifome',
    artist: 'Ozuwo Enifome',
    medium: 'Painting & Digitopainting',
  },
  {
    src: '/images/paintings/enifome/oe-p004.webp',
    alt: 'The Street Guitarist by Ozuwo Enifome',
    artist: 'Ozuwo Enifome',
    medium: 'Painting & Digitopainting',
  },
  {
    src: '/images/paintings/early-patronage/KA-01_village-passage.webp',
    alt: 'Village Passage by Kelani Abass',
    artist: 'Kelani Abass',
    medium: 'Painting',
  },
  {
    src: '/images/collections/shobowale/jbs-006.webp',
    alt: 'Textured Relief by Johnson Babatunde Shobowale',
    artist: 'Johnson Babatunde Shobowale',
    medium: 'Mixed Media',
  },
  {
    src: '/images/collections/akinwolere/ma-02.webp',
    alt: 'Works on Paper by Muyiwa Akinwolere',
    artist: 'Muyiwa Akinwolere',
    medium: 'Painting',
  },
  {
    src: '/images/photography/art-of-everyday-life/OE-PH009_light-at-the-end-of-the-tunnel.webp',
    alt: 'Light at the End of the Tunnel by Ozuwo Enifome',
    artist: 'Ozuwo Enifome',
    medium: 'Fine Art Photography',
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slideshow auto-advance every 5.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);

    return () => clearInterval(timer);
  }, []);

  // Parallax scroll setup for Hero
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroBgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Scroll to #contact if navigated from another page via /#contact
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#contact') {
      setTimeout(() => {
        document.getElementById('collectors')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }, []);

  const scrollToDirectory = useCallback(() => {
    document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const scrollToCatalogues = useCallback(() => {
    document.getElementById('catalogues')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="bg-background min-h-screen text-foreground relative w-full overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section
        ref={heroRef}
        className="relative min-h-[100svh] w-full overflow-hidden flex items-center justify-start bg-[#151515]"
      >
        {/* Artwork Media Slideshow with Ken Burns & Parallax */}
        <motion.div style={{ y: heroBgY }} className="absolute inset-0 w-full h-full pointer-events-none">
          <AnimatePresence mode="sync">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.78, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={HERO_SLIDES[currentSlide].src}
                alt={HERO_SLIDES[currentSlide].alt}
                fill
                priority={currentSlide === 0}
                className="object-cover"
                sizes="100vw"
              />
            </motion.div>
          </AnimatePresence>

          {/* Directional gradients — heavy on left+bottom where text sits, transparent elsewhere */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-[#151515]/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#151515]/85 via-[#151515]/30 to-transparent" />
        </motion.div>

        {/* Minimalist Slide Navigation Dots (aesthetic gallery touch) */}
        <div className="absolute bottom-6 right-4 sm:bottom-8 sm:right-8 md:right-12 z-20 flex items-center gap-1.5 pointer-events-auto">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1 transition-all duration-500 rounded-full ${
                idx === currentSlide ? 'w-6 bg-white' : 'w-1.5 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Hero Content: Pure Swiss copy without clutter */}
        <motion.div
          style={{ opacity: heroTextOpacity }}
          className="relative z-10 max-w-[1600px] mx-auto w-full px-4 sm:px-8 md:px-12 pb-20 sm:pb-24 md:pb-28 flex flex-col justify-end min-h-[100svh] pt-24 sm:pt-32"
        >
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-editorial-serif italic font-light tracking-tight text-[#F8F7F4] leading-[1.12] sm:leading-[1.15] mb-5 sm:mb-6">
              A private collection of painting, patronage &amp; light.
            </h1>

            <p className="text-xs sm:text-sm md:text-base font-sans font-light tracking-wide text-white/80 max-w-2xl leading-relaxed mb-8 md:mb-10">
              Paintings, photography and mixed media acquired directly from the studio — spanning Kelani Abass, Muyiwa Akinwolere, Johnson Babatunde Shobowale, and the artist's own practice. Documented in six gallery catalogues with full provenance records.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={scrollToDirectory}
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 bg-[#F8F7F4] text-[#151515] hover:bg-white text-xs font-mono uppercase tracking-[0.16em] font-medium transition-all shadow-md group"
              >
                <span>Explore The Directory</span>
                <ArrowDown size={13} className="group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={scrollToCatalogues}
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 border border-white/40 hover:border-white hover:bg-white/10 text-[#F8F7F4] text-xs font-mono uppercase tracking-[0.16em] font-medium transition-all backdrop-blur-xs"
              >
                <span>View Catalogues</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Main Content Wrapper (Optimized for Mobile & Wide Screens) */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 md:px-12 w-full">
        {/* 2. CATALOGUE SUITES (Curated Collections Shelf) */}
        <section id="catalogues" className="py-20 sm:py-24 md:py-32 border-b border-border">
          <div className="max-w-2xl mb-12 sm:mb-16">
            <span className="text-editorial-meta mb-3 block">Curated Portfolios</span>
            <h2 className="text-display-medium mb-4">Six Gallery Catalogues</h2>
            <p className="text-sm text-muted leading-relaxed">
              Ozuwo Enifome has assembled a documented private collection spanning over a decade of direct patronage and his own studio practice across painting and photography. Each body of work is presented through a formal gallery catalogue.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {catalogues.map((cat, idx) => (
              <div 
                key={cat.id}
                className="group flex flex-col justify-between border border-border/70 bg-warm-gray/10 hover:bg-warm-gray/25 hover:border-foreground/40 transition-editorial p-5 sm:p-6"
              >
                <div>
                  <div className="relative aspect-[4/3] w-full mb-6 bg-warm-gray/30 overflow-hidden">
                    <Image
                      src={cat.coverImage}
                      alt={cat.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-slow"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1400px) 33vw, 400px"
                    />
                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-background/90 text-foreground font-mono text-[9px] uppercase border border-border/60">
                      {cat.period}
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-muted tracking-widest uppercase block mb-1">
                    0{idx + 1} &middot; {cat.category}
                  </span>
                  
                  <h3 className="text-xl sm:text-2xl font-editorial-serif italic text-foreground mb-1">
                    {cat.artist}
                  </h3>

                  <h4 className="text-xs font-mono uppercase tracking-wider text-accent-olive font-semibold mb-3">
                    {cat.title}
                  </h4>

                  <p className="text-xs text-muted leading-relaxed line-clamp-3 mb-2">
                    {cat.curatorialSummary}
                  </p>
                  {cat.id === 'ozuwo-enifome-humanised-landscape' && (
                    <p className="text-[10px] font-mono text-accent-olive/80 italic mb-4">
                      Companion publication — the same 12 photographs are also documented in <em>The Art of Everyday Life</em> catalogue.
                    </p>
                  )}
                  {cat.id !== 'ozuwo-enifome-humanised-landscape' && <div className="mb-6" />}
                </div>

                <div className="pt-4 border-t border-border/60 space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-muted">
                    <span>Documented Works</span>
                    <span className="text-foreground font-semibold">{cat.worksCount} Works</span>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <a
                      href="#enquiry"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-[11px] font-mono uppercase tracking-wider border border-foreground/30 text-foreground hover:bg-foreground hover:text-background transition-colors flex-1"
                    >
                      <Mail size={12} />
                      <span>Request Dossier</span>
                    </a>

                    <Link
                      href={cat.category === 'painting' ? `/painting?artist=${cat.artistSlug}` : '/photography'}
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-[11px] font-mono uppercase tracking-wider bg-foreground text-background hover:bg-accent-olive hover:text-white transition-colors"
                      title={`Explore ${cat.artist} works`}
                    >
                      <span>Explore</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. FULL COLLECTION DIRECTORY & INTERACTIVE FILTER */}
        <section className="py-20 sm:py-24 md:py-32">
          <div className="max-w-3xl mb-10 sm:mb-12">
            <span className="text-editorial-meta mb-3 block">Complete Archive</span>
            <h2 className="text-display-medium mb-4">Collection Directory</h2>
            <p className="text-sm text-muted leading-relaxed">
              Explore the entire inventory of <strong className="text-foreground">{projects.length}</strong> authenticated works across all six catalogues. Filter by artist, medium, or year — or request the corresponding curatorial publication directly.
            </p>
          </div>

          {/* Interactive Directory Component */}
          <Directory />
        </section>

        {/* 4. COLLECTORS & LOGISTICS SECTION */}
        <Collectors />
      </div>

      {/* Floating Back to Top */}
      <BackToTop />
    </div>
  );
}
