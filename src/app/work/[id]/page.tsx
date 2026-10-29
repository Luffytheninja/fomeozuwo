'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { projects, catalogues, Project } from '@/lib/data';
import { Lightbox } from '@/components/Lightbox';
import { Collectors } from '@/components/Collectors';
import { ArrowLeft, ArrowRight, Maximize2, Mail, ShieldCheck, Tag } from 'lucide-react';

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const currentProject = projects.find((p) => p.id === id);

  // Lightbox State
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Find index in overall list
  const currentIndex = projects.findIndex((p) => p.id === id);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];

  useEffect(() => {
    if (!currentProject) {
      router.push('/');
    }
  }, [currentProject, router]);

  if (!currentProject) return null;

  const handleOpenLightbox = () => {
    setLightboxIndex(currentIndex);
    setIsLightboxOpen(true);
  };

  const backPath = currentProject.category === 'painting' ? '/painting' : '/photography';
  const relatedCatalogue = catalogues.find((c) => c.artistSlug === currentProject.artistSlug) || catalogues[0];

  // Function to extract position and scale from detail crops style strings for inline CSS
  const getCropStyles = (styleStr: string) => {
    const posMatch = styleStr.match(/object-\[(\d+%\_\d+%)\]/);
    const scaleMatch = styleStr.match(/scale-\[(\d+\.?\d*)\]/);

    const objectPosition = posMatch ? posMatch[1].replace('_', ' ') : 'center';
    const transform = scaleMatch ? `scale(${scaleMatch[1]})` : 'scale(1.5)';

    return { objectPosition, transform };
  };

  const inquirySubject = encodeURIComponent(
    `Acquisition Inquiry: ${currentProject.catalogueId ? `[${currentProject.catalogueId}] ` : ''}${currentProject.title} by ${currentProject.artist}`
  );

  return (
    <div className="pt-32 md:pt-48 pb-32 px-6 md:px-12 max-w-[1400px] mx-auto min-h-screen text-foreground">
      {/* Back navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-16">
        <Link
          href={backPath}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft size={12} />
          Back to {currentProject.category === 'painting' ? 'Paintings' : 'Photography'}
        </Link>

        <a
              href={`mailto:fomeozuwobss@gmail.com?subject=${encodeURIComponent("Catalogue Request: " + (relatedCatalogue?.title || "EOE Collection"))}`}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider border border-foreground/30 hover:bg-foreground hover:text-background transition-colors"
            >
              <Mail size={13} />
              Request Catalogue
            </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start mb-32">
        {/* Left Column: Curatorial Stats & Story */}
        <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-8 animate-reveal-up">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[10px] font-mono tracking-widest uppercase text-accent-olive font-bold">
                {currentProject.artist}
              </span>
              <span className="text-muted/60">&middot;</span>
              <span className="text-[10px] font-mono uppercase text-muted">
                {currentProject.year}
              </span>
              {currentProject.catalogueId && (
                <span className="text-[10px] font-mono px-2 py-0.5 bg-warm-gray/50 text-foreground font-bold rounded">
                  {currentProject.catalogueId}
                </span>
              )}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-editorial-serif italic leading-tight text-foreground mb-2">
              {currentProject.title}
            </h1>

            <span className="text-xs font-mono text-muted block">
              {currentProject.collection}
            </span>
          </div>

          <div className="border-t border-border/80 pt-6 space-y-6">
            <p className="text-sm text-muted leading-relaxed italic">
              &ldquo;{currentProject.story}&rdquo;
            </p>

            {/* Provenance Box */}
            {currentProject.provenance && (
              <div className="p-4 bg-warm-gray/25 border-l-2 border-accent-olive space-y-1">
                <span className="text-[9px] font-mono uppercase tracking-widest text-accent-olive block">
                  Provenance & Documentation
                </span>
                <p className="text-xs text-muted leading-relaxed font-mono">
                  {currentProject.provenance}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 text-xs font-mono text-muted border-t border-border/40 pt-4">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-muted/60 block mb-1">Year</span>
                <span className="text-foreground font-semibold">{currentProject.year}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-widest text-muted/60 block mb-1">Edition</span>
                <span className="text-foreground font-semibold">
                  {currentProject.edition || (currentProject.category === 'photography' ? 'Unique 1/1 Edition' : 'Original Artwork')}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-[9px] uppercase tracking-widest text-muted/60 block mb-1">Medium</span>
                <span className="text-foreground font-semibold">{currentProject.medium}</span>
              </div>
              <div className="col-span-2">
                <span className="text-[9px] uppercase tracking-widest text-muted/60 block mb-1">Dimensions</span>
                <span className="text-foreground font-semibold">{currentProject.dimensions}</span>
              </div>
            </div>

            {/* Direct Collector Acquisition Action */}
            <div className="pt-6 border-t border-border/60 flex flex-col gap-3">
              <a
                href={`mailto:${relatedCatalogue.contactEmail}?subject=${inquirySubject}`}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#1A1A1A] text-[#F8F7F4] hover:bg-black transition-editorial text-xs tracking-wider uppercase font-mono font-medium shadow-sm"
              >
                <Mail size={14} />
                Inquire on Acquisition
              </a>

              <a
              href={`mailto:fomeozuwobss@gmail.com?subject=${encodeURIComponent("Catalogue Request: " + (relatedCatalogue?.title || "EOE Collection"))}`}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider border border-foreground/30 hover:bg-foreground hover:text-background transition-colors"
            >
              <Mail size={13} />
              Request Catalogue
            </a>

              <div className="flex items-center gap-2 text-[11px] text-muted/80 pt-2">
                <ShieldCheck size={14} className="text-accent-olive shrink-0" />
                <span>Documented in private collection archive with artist provenance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Immersive Image View */}
        <div className="lg:col-span-8 space-y-16">
          {/* Main Image Frame */}
          <div 
            onClick={handleOpenLightbox}
            className="relative w-full aspect-[4/3] md:aspect-[3/2] cursor-pointer group bg-warm-gray/10 overflow-hidden border border-border/60"
          >
            <Image
              src={currentProject.image}
              alt={currentProject.title}
              fill
              className="object-contain p-4 md:p-8 transition-slow group-hover:scale-[1.01]"
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            
            {/* Fullscreen Overlay Trigger */}
            <div className="absolute bottom-6 right-6 p-3 bg-[#1A1A1A]/85 text-[#F8F7F4] rounded-full opacity-0 group-hover:opacity-100 transition-editorial flex items-center justify-center hover:scale-110">
              <Maximize2 size={16} />
            </div>
          </div>

          {/* Tactility & Tonal Study (Detail Crops if defined) */}
          {currentProject.detailCrops && currentProject.detailCrops.length > 0 && (
            <div className="border-t border-border/60 pt-16 animate-reveal-up">
              <div className="mb-8">
                <span className="text-editorial-meta mb-1 block">Tactility & Tonal Study</span>
                <h3 className="text-xl font-editorial-serif italic">
                  {currentProject.category === 'painting' ? 'Canvas Details & Brushstrokes' : 'Tonal Washes & Surface Interpretation'}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {currentProject.detailCrops.map((crop, idx) => {
                  const cropStyles = getCropStyles(crop.style);
                  return (
                    <div key={idx} className="flex flex-col gap-3">
                      <div className="relative w-full h-64 overflow-hidden bg-warm-gray/25 border border-border/40">
                        <Image
                          src={currentProject.image}
                          alt={`${currentProject.title} Detail Crop ${idx + 1}`}
                          fill
                          className="object-cover transition-all duration-700 hover:scale-[1.1]"
                          style={{
                            objectPosition: cropStyles.objectPosition,
                            transform: cropStyles.transform,
                          }}
                          sizes="(max-width: 768px) 100vw, 30vw"
                        />
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-muted font-mono">
                        Detail {String(idx + 1).padStart(2, '0')} &mdash; {crop.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dynamic Editorial Navigation footer */}
      <footer className="mt-32 pt-16 border-t border-border/80 flex flex-col md:flex-row justify-between items-center gap-8">
        <Link
          href={`/work/${prevProject.id}`}
          className="flex flex-col items-start gap-1 group text-left"
        >
          <span className="text-[9px] uppercase tracking-widest text-muted">Previous Work</span>
          <span className="font-serif italic text-lg text-muted group-hover:text-foreground transition-colors flex items-center gap-2">
            &larr; {prevProject.title}
          </span>
        </Link>

        <Link
          href="/"
          className="text-xs uppercase tracking-[0.2em] text-muted hover:text-foreground transition-colors"
        >
          All Archive ({projects.length} Works)
        </Link>

        <Link
          href={`/work/${nextProject.id}`}
          className="flex flex-col items-end gap-1 group text-right"
        >
          <span className="text-[9px] uppercase tracking-widest text-muted">Next Work</span>
          <span className="font-serif italic text-lg text-muted group-hover:text-foreground transition-colors flex items-center gap-2">
            {nextProject.title} &rarr;
          </span>
        </Link>
      </footer>

      {/* Fullscreen Lightbox */}
      <Lightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        currentIndex={currentIndex}
        setCurrentIndex={setLightboxIndex}
      />
    </div>
  );
}
