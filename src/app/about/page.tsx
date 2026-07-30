import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About & Chapters',
  description: 'The biographical chapters of Enifome Ozuwo (EOE): Fine Art, Agency Life, Return to Art, and Photography.',
};

export default function AboutPage() {
  return (
    <div className="pt-32 md:pt-48 pb-32 px-6 md:px-12 max-w-[1200px] mx-auto min-h-screen">
      
      {/* Page Header */}
      <header className="mb-32 max-w-2xl animate-reveal-up">
        <span className="text-editorial-meta mb-4 block">Provenance</span>
        <h1 className="text-display-medium mb-6">The Story of EOE</h1>
        <p className="text-sm text-muted leading-relaxed">
          Enifome Ozuwo is a visual artist working across painting and digital photography. His practice is characterized by a deliberate slowing down, exchanging the hyper-velocity of commercial media for the silent, patient observation of canvas and light.
        </p>
      </header>

      {/* Chapters Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-32">
        
        {/* Chapters Column */}
        <div className="lg:col-span-7 flex flex-col pl-6 border-l border-border/80 ml-4 md:ml-0 relative">
          
          {/* Chapter 1 */}
          <div className="mb-20 relative">
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-background border border-border flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-olive" />
            </div>
            <span className="text-xs font-mono text-muted mb-2 block">Chapter I</span>
            <h2 className="text-2xl font-editorial-serif italic text-foreground mb-4">Fine Art</h2>
            <p className="text-sm text-muted leading-relaxed max-w-md">
              Beginning with early charcoal sketch work and acrylic experiments in Lagos. A foundation built on structural layouts, anatomical precision, and the weight of physical surfaces.
            </p>
          </div>

          {/* Chapter 2 */}
          <div className="mb-20 relative">
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-background border border-border flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-olive" />
            </div>
            <span className="text-xs font-mono text-muted mb-2 block">Chapter II</span>
            <h2 className="text-2xl font-editorial-serif italic text-foreground mb-4">Painting</h2>
            <p className="text-sm text-muted leading-relaxed max-w-md">
              Transitioning to oil pigments on linen canvas. A focus on Yoruba cultural ceremonies and everyday domestic rituals, translating movement into thick, tactile impasto layers.
            </p>
          </div>

          {/* Chapter 3 */}
          <div className="mb-20 relative">
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-background border border-border flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-olive" />
            </div>
            <span className="text-xs font-mono text-muted mb-2 block">Chapter III</span>
            <h2 className="text-2xl font-editorial-serif italic text-foreground mb-4">Agency Life</h2>
            <p className="text-sm text-muted leading-relaxed max-w-md">
              Entering the commercial advertising world. Shaping visual narratives for local and multinational brands, learning the rigorous systems of visual communication and layout editing.
            </p>
          </div>

          {/* Chapter 4 */}
          <div className="mb-20 relative">
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-background border border-border flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-olive" />
            </div>
            <span className="text-xs font-mono text-muted mb-2 block">Chapter IV</span>
            <h2 className="text-2xl font-editorial-serif italic text-foreground mb-4">Creative Direction</h2>
            <p className="text-sm text-muted leading-relaxed max-w-md">
              Years spent directing campaigns, leading design teams, and curating brand strategies. While commercially rewarding, it fueled a growing desire to escape digital speed and return to singular physical canvases.
            </p>
          </div>

          {/* Chapter 5 */}
          <div className="mb-20 relative">
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-background border border-border flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-olive" />
            </div>
            <span className="text-xs font-mono text-muted mb-2 block">Chapter V</span>
            <h2 className="text-2xl font-editorial-serif italic text-foreground mb-4">Return to Art</h2>
            <p className="text-sm text-muted leading-relaxed max-w-md">
              A clean break from agency pressure. Reclaiming the physical studio in Yaba, Lagos. The rediscovery of oil paint as a primary vehicle for storytelling, culminating in the "Drummers" series.
            </p>
          </div>

          {/* Chapter 6 */}
          <div className="mb-20 relative">
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-background border border-border flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-olive" />
            </div>
            <span className="text-xs font-mono text-muted mb-2 block">Chapter VI</span>
            <h2 className="text-2xl font-editorial-serif italic text-foreground mb-4">Photography</h2>
            <p className="text-sm text-muted leading-relaxed max-w-md">
              Expanding the creative canvas into digital photography. Using the camera to freeze transient geometric shadows and light gradients, providing direct visual blueprints for painting canvases.
            </p>
          </div>

          {/* Chapter 7 */}
          <div className="relative">
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-background border border-border flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-olive" />
            </div>
            <span className="text-xs font-mono text-muted mb-2 block">Chapter VII</span>
            <h2 className="text-2xl font-editorial-serif italic text-foreground mb-4">Today</h2>
            <p className="text-sm text-muted leading-relaxed max-w-md">
              Operating a hybrid studio practice where painting and photography serve as reciprocal disciplines. A patient, ongoing archive of Lagos history, lighting, and community resilience.
            </p>
          </div>

        </div>

        {/* Visual Columns (Portrait / Studio frames) */}
        <div className="lg:col-span-5 space-y-16">
          
          {/* Portrait Frame (Minimal text-art representation) */}
          <div className="flex flex-col gap-4">
            <div className="relative w-full aspect-[3/4.5] bg-[#1A1A1A] flex flex-col justify-between p-8 text-[#F8F7F4] select-none overflow-hidden">
              <div className="flex justify-between items-start">
                <span className="text-xs uppercase tracking-widest text-white/40">Studio Frame</span>
                <span className="text-xs font-mono text-white/30">2026</span>
              </div>
              
              <div className="my-auto text-center border-y border-white/10 py-12">
                <h3 className="text-4xl font-editorial-serif italic font-light">Enifome Ozuwo</h3>
                <p className="text-[10px] uppercase tracking-widest text-white/50 mt-2">Visual Artist</p>
              </div>

              <div className="text-right text-[10px] text-white/40">
                Lagos Studio Portrait Space
              </div>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-muted font-mono">
              Portrait: Enifome Ozuwo (EOE)
            </span>
          </div>

          {/* Studio Process Frame */}
          <div className="flex flex-col gap-4">
            <div className="relative w-full aspect-[4/3] bg-warm-gray/25 overflow-hidden">
              <Image
                src="/images/photography/WINDOW TO MY WORLD 2.webp"
                alt="Studio window light beam"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 30vw"
              />
            </div>
            <span className="text-[10px] uppercase tracking-wider text-muted font-mono">
              Studio Detail: Volumetric Harmattan Light Study
            </span>
          </div>

        </div>
      </div>

      {/* Inquiry Block */}
      <div className="mt-32 pt-16 border-t border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <span className="text-editorial-meta mb-2 block">Acquisitions</span>
          <p className="text-sm text-muted max-w-sm">For gallery inquiries, private viewings, or representation requests.</p>
        </div>
        <Link
          href="mailto:inquiries@eoe-archive.com"
          className="text-2xl md:text-3xl font-serif italic text-foreground hover:opacity-60 transition-opacity"
        >
          inquiries@eoe-archive.com
        </Link>
      </div>

    </div>
  );
}
