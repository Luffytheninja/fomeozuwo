'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { projects, artists, catalogues } from '@/lib/data';
import { Directory } from '@/components/Directory';
import { Collectors } from '@/components/Collectors';
import { ArrowDown, ArrowRight, Mail, ShieldCheck, Sparkles } from 'lucide-react';

export default function HomePage() {
  // Parallax scroll setup for Hero Image
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  const heroBgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Scroll to #contact if navigated from another page via /#contact
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#contact') {
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }, []);

  return (
    <div className="bg-background min-h-screen text-foreground relative">
      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#151515]">
        {/* Parallax Background Artwork */}
        <motion.div style={{ y: heroBgY }} className="absolute inset-0 w-full h-full opacity-45">
          <Image
            src="/images/photography/art-of-everyday-life/OE-PH010_face-to-face-conversation.webp"
            alt="The Ozuwo Enifome Collection"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-black/40" />
        </motion.div>

        {/* Minimal Hero Text overlay */}
        <motion.div 
          style={{ opacity: heroTextOpacity }}
          className="absolute inset-0 flex flex-col justify-between p-6 md:p-14 z-10 text-[#F8F7F4]"
        >
          <div className="flex justify-between items-start w-full">
            <div className="flex flex-col">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] opacity-80">
                The Ozuwo Enifome Collection
              </span>
              <span className="text-[9px] font-mono text-white/50 tracking-wider">
                Private Archive &middot; Lagos, Nigeria
              </span>
            </div>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] opacity-80 font-mono">
              67 Documented Works
            </span>
          </div>

          <div className="max-w-2xl self-start mt-auto mb-12 md:mb-16">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent-olive/90 block mb-3">
              Modern & Contemporary Nigerian Art
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-editorial-serif italic font-light tracking-tight mb-6 leading-tight">
              A private collection of painting, patronage & light.
            </h1>
            <p className="text-xs md:text-sm font-sans tracking-wide text-white/75 max-w-xl leading-relaxed">
              Curated holdings and early student patronage spanning Kelani Abass, Muyiwa Akinwolere, 
              Johnson Babatunde Shobowale, and the photographic works of Ozuwo Enifome. 
              Preserved with dedicated gallery catalogues and provenance records.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <button
                onClick={() => {
                  document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#F8F7F4] text-[#151515] hover:bg-white text-xs font-mono uppercase tracking-wider font-semibold transition-all shadow-md group"
              >
                <span>Explore The Directory</span>
                <ArrowDown size={13} className="group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => {
                  document.getElementById('catalogues')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 hover:border-white text-[#F8F7F4] text-xs font-mono uppercase tracking-wider transition-all"
              >
                <ArrowDown size={13} />
                <span>Explore Catalogues</span>
              </button>
            </div>
          </div>

          <div className="flex justify-between items-end w-full border-t border-white/10 pt-4">
            <span className="text-[10px] uppercase tracking-widest opacity-60 font-mono">
              2006 &ndash; 2026 Archive
            </span>
            <span className="text-xs font-serif italic opacity-60">
              Scroll to explore works & catalogues &darr;
            </span>
          </div>
        </motion.div>
      </section>

      <div className="px-6 md:px-12 max-w-[1600px] mx-auto">
        
        {/* 2. CATALOGUE SUITES (Curated Collections Shelf) */}
        <section id="catalogues" className="py-24 md:py-32 border-b border-border">
          <div className="max-w-2xl mb-16">
            <span className="text-editorial-meta mb-3 block">Curated Portfolios</span>
            <h2 className="text-display-medium mb-4">Four Landmark Catalogues</h2>
            <p className="text-sm text-muted leading-relaxed">
              Each artist represented in the Ozuwo Enifome Collection is documented through an international gallery catalogue, detailing provenance, artist biographies, exhibitions, and technical notes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {catalogues.map((cat, idx) => (
              <div 
                key={cat.id}
                className="group flex flex-col justify-between border border-border/70 bg-warm-gray/10 hover:bg-warm-gray/25 hover:border-foreground/40 transition-editorial p-6"
              >
                <div>
                  <div className="relative aspect-[4/3] w-full mb-6 bg-warm-gray/30 overflow-hidden">
                    <Image
                      src={cat.coverImage}
                      alt={cat.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-slow"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-background/90 text-foreground font-mono text-[9px] uppercase border border-border/60">
                      {cat.period}
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-muted tracking-widest uppercase block mb-1">
                    0{idx + 1} &middot; {cat.category}
                  </span>
                  
                  <h3 className="text-2xl font-editorial-serif italic text-foreground mb-1">
                    {cat.artist}
                  </h3>

                  <h4 className="text-xs font-mono uppercase tracking-wider text-accent-olive font-semibold mb-3">
                    {cat.title}
                  </h4>

                  <p className="text-xs text-muted leading-relaxed line-clamp-3 mb-6">
                    {cat.curatorialSummary}
                  </p>
                </div>

                <div className="pt-4 border-t border-border/60 space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-muted">
                    <span>Documented Works</span>
                    <span className="text-foreground font-semibold">{cat.worksCount} Works</span>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <a
                    href={`mailto:fomeozuwobss@gmail.com?subject=${encodeURIComponent("Catalogue Request: " + cat.title)}`}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider border border-[#F8F7F4]/40 text-[#F8F7F4] hover:bg-[#F8F7F4]/10 transition-colors"
                  >
                    <Mail size={12} />
                    Request Catalogue
                  </a>

                    <Link
                      href={cat.category === 'painting' ? '/painting' : '/photography'}
                      className="p-2 border border-border hover:border-foreground/60 transition-colors text-foreground"
                      title="View collection page"
                    >
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. FULL COLLECTION DIRECTORY & INTERACTIVE FILTER */}
        <section className="py-24 md:py-32">
          <div className="max-w-3xl mb-12">
            <span className="text-editorial-meta mb-3 block">Complete Archive</span>
            <h2 className="text-display-medium mb-4">Collection Directory</h2>
            <p className="text-sm text-muted leading-relaxed">
              Explore the entire inventory of 67 authenticated works. Filter across artists, mediums, and production years, or request corresponding curatorial publications directly.
            </p>
          </div>

          {/* Interactive Directory Component */}
          <Directory />
        </section>

        {/* 4. COLLECTORS & LOGISTICS SECTION */}
        <Collectors />

      </div>
    </div>
  );
}
