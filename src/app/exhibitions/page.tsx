import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Collectors } from '@/components/Collectors';
import { projects } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Exhibitions & Showings',
  description: 'The physical and digital showing timeline of Enifome Ozuwo (EOE).',
};

interface Exhibition {
  year: string;
  title: string;
  type: 'Solo Exhibition' | 'Group Exhibition' | 'Duo Exhibition';
  dates: string;
  gallery: string;
  location: string;
  curator?: string;
  description: string;
  exhibitedWorks: string[];
}

const EXHIBITIONS: Exhibition[] = [
  {
    year: '2026',
    title: 'Sovereign Light',
    type: 'Solo Exhibition',
    dates: 'August 12 — September 30, 2026',
    gallery: 'Omenka Gallery',
    location: 'Ikoyi, Lagos, Nigeria',
    curator: 'Folasade Temitope',
    description: 'An immersive solo presentation featuring new large-scale oil canvases and high-contrast digital prints investigating harmattan atmospheric dust and volumetric lighting.',
    exhibitedWorks: ['Good Morning', 'Window to My World I', 'Window to My World II', 'Children of Makoko (Tales of Sadness)']
  },
  {
    year: '2025',
    title: 'The Contrast of Life',
    type: 'Group Exhibition',
    dates: 'March 5 — April 20, 2025',
    gallery: 'Nike Art Gallery',
    location: 'Lekki, Lagos, Nigeria',
    curator: 'Chief Nike Davies-Okundaye',
    description: 'A curated dialogue bringing together ten contemporary Lagos photographers. EOE presented the first four parts of his documentary series mapping BROAD Street geometry and pedestrian shadows.',
    exhibitedWorks: ['The Contrast of Life I', 'The Contrast of Life II (Geometric Shadows)', 'The Contrast of Life III (The Elder)', 'The Contrast of Life IV (Lagoon Reflection)']
  },
  {
    year: '2023',
    title: 'Lagos Archive',
    type: 'Duo Exhibition',
    dates: 'October 15 — November 10, 2023',
    gallery: 'Alliance Française (Mike Adenuga Centre)',
    location: 'Ikoyi, Lagos, Nigeria',
    curator: 'Jean-Pierre Laurent',
    description: 'A collaborative exhibition addressing the boundaries between digital medium documentation and physical canvas abstract layering, focusing on coastal lagoon fishing communities.',
    exhibitedWorks: ['My Boat, My Livelihood', 'African Street Guitarist', 'Sunset Over Canoe Park', 'Window to Our World']
  },
  {
    year: '2020',
    title: 'Tactile Rhythms',
    type: 'Group Exhibition',
    dates: 'June 10 — July 2, 2020',
    gallery: 'Didi Museum',
    location: 'Victoria Island, Lagos, Nigeria',
    curator: 'Dr. Newton Jibunoh',
    description: 'An early post-agency showing focusing on tactile paint layers, rhythm, and Yoruba drumming ceremonies. This group show marked EOE’s first major physical presentation since returning to fine art.',
    exhibitedWorks: ['The Drummers', 'Daily Chores']
  }
];

export default function ExhibitionsPage() {
  return (
    <div className="pt-32 md:pt-48 pb-32 px-6 md:px-12 max-w-[1200px] mx-auto min-h-screen">
      
      {/* Page Header */}
      <header className="mb-32 max-w-2xl animate-reveal-up">
        <span className="text-editorial-meta mb-4 block">Showings</span>
        <h1 className="text-display-medium mb-6">Exhibitions</h1>
        <p className="text-sm text-muted leading-relaxed">
          Physical presentations, collaborations, and curatorial showings of EOE's works across galleries, museums, and cultural centers.
        </p>
      </header>

      {/* Exhibitions List */}
      <section className="space-y-24">
        {EXHIBITIONS.map((exh, idx) => {
          const isCurrent = exh.year === '2026';
          return (
            <div
              key={idx}
              className={`py-12 border-t border-border flex flex-col md:flex-row justify-between gap-8 md:gap-16 items-start transition-editorial ${
                isCurrent ? 'bg-warm-gray/10 px-6' : ''
              }`}
            >
              {/* Year column */}
              <div className="flex flex-col gap-2 min-w-[100px]">
                <span className="text-2xl font-serif italic text-foreground">{exh.year}</span>
                {isCurrent && (
                  <span className="text-[8px] uppercase tracking-widest text-accent-olive font-bold">
                    Active Show
                  </span>
                )}
              </div>

              {/* Core Details column */}
              <div className="flex-grow space-y-6 max-w-2xl">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-muted block mb-1">
                    {exh.type}
                  </span>
                  <h2 className="text-3xl font-editorial-serif italic text-foreground">{exh.title}</h2>
                  <p className="text-xs text-muted mt-2">{exh.dates}</p>
                </div>

                <p className="text-sm text-muted leading-relaxed">{exh.description}</p>

                {/* Exhibited Works tags */}
                <div className="space-y-2">
                  <span className="text-[9px] uppercase tracking-widest text-muted/60 block">Exhibited Works</span>
                  <div className="flex flex-wrap gap-2">
                    {exh.exhibitedWorks.map((work) => (
                      <span
                        key={work}
                        className="text-[10px] px-3 py-1 bg-warm-gray/45 text-foreground rounded-full"
                      >
                        {work}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Gallery & Location Column */}
              <div className="text-left md:text-right min-w-[200px] space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-muted block">Location</span>
                <p className="font-serif italic text-foreground text-lg leading-tight">{exh.gallery}</p>
                <p className="text-xs text-muted">{exh.location}</p>
                {exh.curator && (
                  <p className="text-[10px] text-muted/80 mt-4">
                    Curated by <span className="font-semibold">{exh.curator}</span>
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </section>

      {/* Inquiry details */}
      <Collectors />
    </div>
  );
}
