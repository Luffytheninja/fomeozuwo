'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { projects, photographyCatalogue, Project } from '@/lib/data';
import { Lightbox } from '@/components/Lightbox';
import { Collectors } from '@/components/Collectors';
import { ArrowLeft, ArrowRight, Maximize2, Download, Mail, ShieldCheck } from 'lucide-react';

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

  // Function to extract position and scale from detail crops style strings for inline CSS
  const getCropStyles = (styleStr: string) => {
    const posMatch = styleStr.match(/object-\[(\d+%\_\d+%)\]/);
    const scaleMatch = styleStr.match(/scale-\[(\d+\.?\d*)\]/);

    const objectPosition = posMatch ? posMatch[1].replace('_', ' ') : 'center';
    const transform = scaleMatch ? `scale(${scaleMatch[1]})` : 'scale(1.5)';

    return { objectPosition, transform };
  };

  const inquirySubject = encodeURIComponent(
    `Acquisition Inquiry: ${currentProject.catalogueId ? `${currentProject.catalogueId} - ` : ''}${currentProject.title}`
  );

  return (
    <div className="pt-32 md:pt-48 pb-32 px-6 md:px-12 max-w-[1400px] mx-auto min-h-screen text-foreground">
      {/* Back navigation */}
      <div className="flex items-center justify-between mb-16">
        <Link
          href={backPath}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft size={12} />
          Back to {currentProject.category === 'painting' ? 'Paintings' : 'Photography'}
        </Link>

        {currentProject.category === 'photography' && (
          <a
            href={photographyCatalogue.pdfPath}
            download="Ozuwo_Enifome_Humanised_Landscape_Gallery_Catalogue.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-wider uppercase text-muted hover:text-foreground transition-colors"
          >
            <Download size={13} />
            Catalogue PDF
          </a>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start mb-32">
        {/* Left Column: Curatorial Stats & Story */}
        <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-10 animate-reveal-up">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-editorial-meta">{currentProject.collection} Collection</span>
              {currentProject.catalogueId && (
                <span className="text-[10px] font-mono px-2 py-0.5 bg-warm-gray/40 text-foreground/80 rounded">
                  {currentProject.catalogueId}
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-editorial-serif italic leading-tight text-foreground">
              {currentProject.title}
            </h1>
          </div>

          <div className="border-t border-border/80 pt-6 space-y-8">
            <p className="text-sm text-muted leading-relaxed italic">
              &ldquo;{currentProject.story}&rdquo;
            </p>

            <div className="grid grid-cols-2 gap-6 text-xs uppercase tracking-wider text-muted">
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
                href={`mailto:${photographyCatalogue.contactEmail}?subject=${inquirySubject}`}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#1A1A1A] text-[#F8F7F4] hover:bg-black transition-editorial text-xs tracking-wider uppercase font-medium"
              >
                <Mail size={14} />
                Inquire on Acquisition
              </a>

              <div className="flex items-center gap-2 text-[11px] text-muted/80">
                <ShieldCheck size={14} className="text-accent-olive" />
                <span>Accompanied by signed Certificate of Authenticity & Object Record</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Immersive Image View */}
        <div className="lg:col-span-8 space-y-16">
          {/* Main Image Frame */}
          <div 
            onClick={handleOpenLightbox}
            className="relative w-full aspect-[4/3] md:aspect-[3/2] cursor-pointer group bg-warm-gray/10 overflow-hidden"
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
            <div className="absolute bottom-6 right-6 p-3 bg-[#1A1A1A]/80 text-[#F8F7F4] rounded-full opacity-0 group-hover:opacity-100 transition-editorial flex items-center justify-center">
              <Maximize2 size={16} />
            </div>
          </div>

          {/* Tactility & Tonal Study (Detail Crops for both Painting & Photography) */}
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
                      <div className="relative w-full h-64 overflow-hidden bg-warm-gray/25">
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
          All Archive
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
        projectsList={projects}
        currentIndex={currentIndex}
        onNavigate={(index) => {
          const target = projects[index];
          if (target) {
            router.push(`/work/${target.id}`);
          }
        }}
      />
    </div>
  );
}
