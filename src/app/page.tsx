'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { projects, Project } from '@/lib/data';
import { Lightbox } from '@/components/Lightbox';

import { Collectors } from '@/components/Collectors';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  const [activeYear, setActiveYear] = useState('2018');
  const [hoveredCollection, setHoveredCollection] = useState<string | null>(null);
  
  // Lightbox State
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const yearRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Parallax scroll setup for Hero Image
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  const heroBgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // List of distinct years in chronological order
  const years = Array.from(new Set(projects.map((p) => p.year))).sort();

  // Distinct Collections list
  const collectionsList = [
    { name: 'Seeing', label: 'Inquiries into urban geometry and direct vision' },
    { name: 'Light Studies', label: 'Meditations on volumetric sunbeams and gradients' },
    { name: 'Portraits', label: 'The human face as a record of historical navigation' },
    { name: 'Canvas', label: 'Kinetic and raw gestural brushstrokes' },
    { name: 'Color', label: 'Cadences of ceremonies translated into pure pigment' },
    { name: 'Memory', label: 'Repetitive daily rituals and spatial records' },
    { name: 'People', label: 'Documenting communities and resilience' },
    { name: 'Landscapes', label: 'The boundary where water meets the Nigerian sky' }
  ];

  // Track active year during scroll
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const year = entry.target.getAttribute('data-year');
          if (year) setActiveYear(year);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Trigger when item occupies center-screen
      threshold: 0.1
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // Observe each project block
    document.querySelectorAll('.archive-project-item').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const openLightbox = (projectId: string) => {
    const index = projects.findIndex((p) => p.id === projectId);
    if (index !== -1) {
      setLightboxIndex(index);
      setIsLightboxOpen(true);
    }
  };

  return (
    <div className="bg-background min-h-screen text-foreground relative">
      {/* 1. HERO - FULL VIEWPORT */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#1A1A1A]">
        {/* Parallax Background Artwork */}
        <motion.div style={{ y: heroBgY }} className="absolute inset-0 w-full h-full opacity-60">
          <Image
            src="/images/photography/WINDOW TO MY WORLD 1.webp"
            alt="Window to My World I"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>

        {/* Minimal Hero Text overlay */}
        <motion.div 
          style={{ opacity: heroTextOpacity }}
          className="absolute inset-0 flex flex-col justify-between p-6 md:p-12 z-10 text-[#F8F7F4]"
        >
          <div className="flex justify-between items-start w-full">
            <span className="text-xs uppercase tracking-[0.25em] opacity-80">Enifome Ozuwo</span>
            <span className="text-xs uppercase tracking-[0.25em] opacity-80">Lagos, Nigeria</span>
          </div>

          <div className="max-w-xl self-start mt-auto mb-16">
            <h1 className="text-5xl md:text-7xl font-editorial-serif italic font-light tracking-tight mb-6 leading-tight">
              A private archive.
            </h1>
            <p className="text-xs md:text-sm font-sans tracking-wide text-white/70 max-w-md leading-relaxed">
              Visual Artist working across painting and photography. Exploring the textures of Lagos, the geometry of shadows, and the quiet devotion of daily rituals.
            </p>
          </div>

          <div className="flex justify-between items-end w-full">
            <span className="text-[10px] uppercase tracking-widest opacity-60">Portfolio & Journal</span>
            <span className="text-xs font-serif italic opacity-60 animate-bounce">Scroll to enter archive ↓</span>
          </div>
        </motion.div>
      </section>

      <div className="px-6 md:px-12 max-w-[1600px] mx-auto">
        {/* 2. SELECTED COLLECTIONS (Cabinet Index) */}
        <section className="py-32 border-b border-border">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 sticky top-32">
              <span className="text-editorial-meta mb-4 block">Cabinet Index</span>
              <h2 className="text-display-medium mb-6">The Collections</h2>
              <p className="text-sm text-muted leading-relaxed max-w-sm">
                Each collection represents a thematic inquiry. Click to view the specific dialogues of color, memory, and geometry.
              </p>
            </div>

            <div className="lg:col-span-8 flex flex-col border-t border-border">
              {collectionsList.map((collection, idx) => (
                <div
                  key={collection.name}
                  className="group py-8 border-b border-border flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer transition-editorial relative"
                  onMouseEnter={() => setHoveredCollection(collection.name)}
                  onMouseLeave={() => setHoveredCollection(null)}
                >
                  <Link href={`/${idx % 2 === 0 ? 'painting' : 'photography'}?collection=${collection.name}`} className="w-full flex justify-between items-baseline z-10">
                    <div className="flex items-baseline gap-6">
                      <span className="text-xs font-mono text-muted">{String(idx + 1).padStart(2, '0')}</span>
                      <h3 className="text-2xl md:text-3xl font-editorial-serif italic group-hover:pl-4 transition-all duration-500">
                        {collection.name}
                      </h3>
                    </div>
                    <span className="text-xs text-muted max-w-xs text-right hidden md:block group-hover:text-foreground transition-colors pr-8">
                      {collection.label}
                    </span>
                  </Link>

                  {/* Floating hover artwork preview */}
                  <AnimatePresence>
                    {hoveredCollection === collection.name && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: 50, y: -20 }}
                        animate={{ opacity: 1, scale: 1, x: 0, y: -10 }}
                        exit={{ opacity: 0, scale: 0.8, x: 50, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="absolute right-12 top-0 w-36 h-48 z-20 pointer-events-none hidden md:block overflow-hidden"
                      >
                        <Image
                          src={
                            projects.find((p) => p.collection === collection.name)?.image ||
                            '/images/paintings/Good Morning.webp'
                          }
                          alt={collection.name}
                          fill
                          className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                          sizes="150px"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. COMBINED ARCHIVE SCROLL WITH FLOATING TIMELINE */}
        <section id="works" className="py-32 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Sticky Timeline Left Column */}
            <div className="hidden lg:block lg:col-span-2">
              <div className="sticky top-48 flex flex-col items-start pl-4">
                <span className="text-editorial-meta mb-12 block">Timeline</span>
                <div className="flex flex-col gap-8 relative pl-4 border-l border-border">
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => {
                        const target = document.querySelector(`[data-year="${year}"]`);
                        target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }}
                      className={`text-sm font-mono transition-editorial relative ${
                        activeYear === year ? 'text-foreground font-bold scale-110' : 'text-muted/40'
                      }`}
                    >
                      {year}
                      {activeYear === year && (
                        <motion.span
                          layoutId="activeYearDot"
                          className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-accent-olive"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Dynamic Editorial Grid Right Column */}
            <div className="lg:col-span-10 space-y-48">
              {projects.map((project, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={project.id}
                    data-year={project.year}
                    className="archive-project-item flex flex-col w-full"
                  >
                    {/* Project Layout - Alternating Spacing */}
                    <div className={`flex flex-col ${isEven ? 'md:items-start' : 'md:items-end'} w-full`}>
                      <div className="w-full md:max-w-[75%] relative group">
                        {/* Hover Overlay Caption */}
                        <div 
                          onClick={() => openLightbox(project.id)}
                          className="relative overflow-hidden cursor-pointer bg-warm-gray/10 aspect-[4/3] md:aspect-[3/2] w-full"
                        >
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-contain transition-slow group-hover:scale-[1.02] p-4"
                            sizes="(max-width: 768px) 100vw, 75vw"
                          />

                          {/* Hover Overlay Details */}
                          <div className="absolute inset-0 bg-[#1A1A1A]/85 opacity-0 group-hover:opacity-100 transition-editorial flex flex-col justify-between p-8 text-[#F8F7F4]">
                            <div className="flex justify-between items-start">
                              <span className="text-xs uppercase tracking-widest text-white/50">{project.category}</span>
                              <span className="text-xs font-mono">{project.year}</span>
                            </div>
                            <div className="max-w-md">
                              <h3 className="text-3xl font-editorial-serif italic mb-2">{project.title}</h3>
                              <p className="text-xs text-white/70 leading-relaxed mb-4">{project.description}</p>
                              <span className="text-[10px] uppercase tracking-widest text-accent-olive border border-accent-olive/40 px-3 py-1 rounded-full">
                                {project.collection}
                              </span>
                            </div>
                            <div className="flex justify-between items-end">
                              <span className="text-[10px] text-white/40">{project.medium}</span>
                              <span className="text-xs font-serif italic hover:underline">Click to view details</span>
                            </div>
                          </div>
                        </div>

                        {/* Mobile Info View (since hover doesn't exist on mobile) */}
                        <div className="flex justify-between items-baseline mt-4 md:hidden px-2">
                          <div>
                            <h3 className="font-serif italic text-lg">{project.title}</h3>
                            <p className="text-[10px] text-muted">{project.medium} — {project.dimensions}</p>
                          </div>
                          <span className="text-xs font-mono text-muted">{project.year}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. BIOGRAPHY (Chapters Progression) */}
        <section className="py-32 border-t border-border">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 sticky top-32">
              <span className="text-editorial-meta mb-4 block">The Narrative</span>
              <h2 className="text-display-medium mb-6">Chapters</h2>
              <p className="text-sm text-muted leading-relaxed max-w-sm">
                Enifome Ozuwo's journey from building global brands to returning to the canvas. A timeline of patience, craft, and transition.
              </p>
              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-widest hover:text-accent-olive transition-colors group"
              >
                Read Complete Biography
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="lg:col-span-8 flex flex-col relative pl-6 border-l border-border/60 ml-4 md:ml-0">
              {[
                { title: 'Fine Art beginnings', year: 'Before 2012', desc: 'Developing a structural understanding of weight and space on canvas, inspired by local Lagos environments.' },
                { title: 'Agency Life & Creative Direction', year: '2012 — 2018', desc: 'Heading creative campaigns and identity designs for international brands. A period dedicated to visual communication, layouts, and storytelling.' },
                { title: 'Return to Art & Painting', year: '2018 — 2023', desc: 'Leaving commercial agencies to reclaim physical craft. Establishing a dedicated Lagos studio, exploring oil pigments and the impasto techniques of "The Drummers".' },
                { title: 'Expanding Vision: Photography', year: '2024 — Present', desc: 'Introducing digital photography to capture fleeting lighting patterns, building diptych collections on Broad Street and coastal canoe parks.' }
              ].map((chapter, idx) => (
                <div key={chapter.title} className="mb-16 relative last:mb-0">
                  {/* Timeline node */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-border flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-olive" />
                  </div>

                  <span className="text-xs font-mono text-muted mb-2 block">{chapter.year}</span>
                  <h3 className="text-xl font-serif italic text-foreground mb-3">{chapter.title}</h3>
                  <p className="text-sm text-muted leading-relaxed max-w-xl">{chapter.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. CURRENT EXHIBITION */}
        <section className="py-32 border-t border-border">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="text-editorial-meta mb-4 block">Exhibitions</span>
              <h2 className="text-display-medium mb-6">Sovereign Light</h2>
              <span className="text-xs font-mono bg-accent-olive/10 text-accent-olive px-3 py-1 rounded-full uppercase tracking-wider block w-fit mb-8">
                Current Solo Exhibition — Lagos 2026
              </span>
              <p className="text-sm text-muted leading-relaxed mb-8 max-w-md">
                A physical showing of new oil paintings and digital prints exploring the volumetric properties of dusty Harmattan light filtering through coastal Lagos structures.
              </p>
              <div className="text-xs text-muted space-y-2 border-l-2 border-accent-olive pl-4">
                <p className="font-semibold text-foreground">August 12 — September 30, 2026</p>
                <p>Omenka Gallery, Ikoyi, Lagos</p>
                <p>Curated by Folasade Temitope</p>
              </div>
              <Link
                href="/exhibitions"
                className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-widest hover:text-accent-olive transition-colors group"
              >
                View Exhibition History
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="lg:col-span-7 relative h-[450px] bg-warm-gray/20">
              <Image
                src="/images/paintings/children of Makoko-Tales of Sadness.webp"
                alt="Sovereign Light Exhibition Preview"
                fill
                className="object-contain p-4"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* 6. COLLECTORS SECTION */}
        <Collectors />

        {/* 7. CONTACT SECTION */}
        <section id="contact" className="py-32 border-t border-border mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col gap-6">
              <span className="text-editorial-meta">02 / Dialogues</span>
              <h3 className="text-display-medium">
                Inquire About <br />
                Acquisitions & <br />
                Private Viewings.
              </h3>
            </div>
            
            <div className="flex flex-col justify-end items-start md:items-end gap-12">
              <div className="flex flex-col items-start md:items-end">
                <span className="text-xs text-muted mb-2">Primary Inquiries</span>
                <a
                  href="mailto:inquiries@eoe-archive.com"
                  className="text-2xl md:text-4xl font-serif italic hover:opacity-60 transition-opacity tracking-tight"
                >
                  inquiries@eoe-archive.com
                </a>
              </div>

              <div className="flex flex-col items-start md:items-end">
                <span className="text-xs text-muted mb-2">Studio Address</span>
                <p className="text-sm text-muted text-left md:text-right max-w-xs leading-relaxed">
                  Suite 12, Creative Hub, Yaba, Lagos, Nigeria. <br />
                  By appointment only.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-12 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-muted">
          <span>© 2026 EOE — Enifome Ozuwo. All rights reserved.</span>
          <div className="flex gap-8">
            <Link href="/legal#privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/legal#terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="/legal#shipping" className="hover:text-foreground transition-colors">Shipping Logistics</Link>
          </div>
        </footer>
      </div>


      {/* FULLSCREEN LIGHTBOX */}
      <Lightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        projectsList={projects}
        currentIndex={lightboxIndex}
        onNavigate={(index) => setLightboxIndex(index)}
      />
    </div>
  );
}
