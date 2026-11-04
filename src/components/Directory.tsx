'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, projects, artists, catalogues } from '@/lib/data';
import { Lightbox } from '@/components/Lightbox';
import { Search, Grid, List, ArrowRight, Maximize2, FileText, Filter, X, ChevronDown, ChevronUp, Mail } from 'lucide-react';

const INITIAL_SHOW = 12; // 4 rows of 3 — enough context without infinite scroll

// Curatorial display priority: Enifome's own work first (it's his site), then others
const ARTIST_PRIORITY: Record<string, number> = {
  'ozuwo-enifome': 0,
  'johnson-shobowale': 1,
  'muyiwa-akinwolere': 2,
  'kelani-abass': 3,
};

interface DirectoryProps {
  initialArtist?: string;
  initialCategory?: 'all' | 'painting' | 'photography';
}

export function Directory({ initialArtist = 'all', initialCategory = 'all' }: DirectoryProps) {
  const [selectedArtist, setSelectedArtist] = useState<string>(initialArtist);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'painting' | 'photography'>(initialCategory);
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Distinct sorted years
  const availableYears = useMemo(() => {
    const yrs = Array.from(new Set(projects.map((p) => p.year))).sort();
    return yrs;
  }, []);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    let result = projects.filter((p) => {
      // Artist filter
      if (selectedArtist !== 'all' && p.artistSlug !== selectedArtist) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Year filter
      if (selectedYear !== 'all' && p.year !== selectedYear) {
        return false;
      }
      // Search query (title, catalogueId, medium, description)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesCatId = p.catalogueId?.toLowerCase().includes(q);
        const matchesArtist = p.artist.toLowerCase().includes(q);
        const matchesMedium = p.medium.toLowerCase().includes(q);
        const matchesYear = p.year.includes(q);
        if (!matchesTitle && !matchesCatId && !matchesArtist && !matchesMedium && !matchesYear) {
          return false;
        }
      }
      return true;
    });
    // When no artist filter, sort by curatorial priority (Enifome first, photography before painting)
    if (selectedArtist === 'all') {
      result = [...result].sort((a, b) => {
        const pa = ARTIST_PRIORITY[a.artistSlug] ?? 99;
        const pb = ARTIST_PRIORITY[b.artistSlug] ?? 99;
        if (pa !== pb) return pa - pb;
        // Within same artist: photography before painting
        if (a.category !== b.category) return a.category === 'photography' ? -1 : 1;
        return 0;
      });
    }
    return result;
  }, [selectedArtist, selectedCategory, selectedYear, searchQuery]);

  const [showAll, setShowAll] = useState(false);

  // Reset showAll when filters change so user always sees results from top
  useMemo(() => { setShowAll(false); }, [selectedArtist, selectedCategory, selectedYear, searchQuery]);

  const visibleProjects = useMemo(
    () => (showAll ? filteredProjects : filteredProjects.slice(0, INITIAL_SHOW)),
    [filteredProjects, showAll]
  );

  const activeCatalogue = useMemo(() => {
    if (selectedArtist === 'all') return null;
    if (selectedCategory !== 'all') {
      const match = catalogues.find((c) => c.artistSlug === selectedArtist && c.category === selectedCategory);
      if (match) return match;
    }
    return catalogues.find((c) => c.artistSlug === selectedArtist) || null;
  }, [selectedArtist, selectedCategory]);

  const openLightboxForId = (id: string) => {
    const idx = projects.findIndex((p) => p.id === id);
    if (idx !== -1) {
      setLightboxIndex(idx);
      setLightboxOpen(true);
    }
  };

  const clearFilters = () => {
    setSelectedArtist('all');
    setSelectedCategory('all');
    setSelectedYear('all');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedArtist !== 'all' || selectedCategory !== 'all' || selectedYear !== 'all' || searchQuery !== '';

  return (
    <div id="directory" className="w-full">
      {/* 1. QUICK-FILTER STRIP — catalogue as filter shortcuts */}
      <div className="mb-10 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted">Filter by Catalogue</span>
          <span className="text-[10px] font-mono text-muted">{catalogues.length} Catalogues · {projects.length} Works</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {catalogues.map((cat) => {
            const isSelected = selectedArtist === cat.artistSlug && (selectedCategory === 'all' || selectedCategory === cat.category);
            return (
              <button
                key={cat.id}
                onClick={() => {
                  if (isSelected && selectedCategory === cat.category) {
                    setSelectedArtist('all');
                    setSelectedCategory('all');
                  } else {
                    setSelectedArtist(cat.artistSlug);
                    setSelectedCategory(cat.category);
                  }
                }}
                aria-pressed={isSelected}
                className={`text-left p-3 border text-xs transition-all ${
                  isSelected
                    ? 'border-accent-olive bg-accent-olive/10 text-foreground'
                    : 'border-border/60 hover:border-foreground/30 text-muted hover:text-foreground'
                }`}
              >
                <span className="text-[9px] font-mono uppercase tracking-widest block mb-0.5 opacity-70">{cat.period}</span>
                <span className="font-serif italic text-sm block leading-tight">{cat.artist.split(' ')[0]}</span>
                <span className="text-[9px] font-mono block mt-0.5 truncate">{cat.title}</span>
                {cat.id === 'ozuwo-enifome-humanised-landscape' && (
                  <span className="text-[8px] text-accent-olive/70 font-mono block mt-1">companion pub.</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. FILTER CONTROLS TOOLBAR */}
      <div className="sticky top-14 sm:top-16 md:top-20 z-30 bg-background/95 backdrop-blur-md border-y border-border py-4 mb-8 sm:mb-10 space-y-3">
        {/* Top Toolbar: Prominent Search + Medium + Year + View Mode */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Prominent Search Field */}
          <div className="relative flex-1 max-w-md">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search by title, medium, year, or reference (e.g. KA-01)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-warm-gray/30 border border-border/80 rounded pl-9 pr-8 py-2 text-xs font-sans text-foreground placeholder:text-muted/60 focus:outline-hidden focus:border-foreground transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                aria-label="Clear search"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Medium, Year, and View Toggles */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Medium Selector */}
            <div className="flex items-center bg-warm-gray/30 rounded p-1 border border-border/60">
              <button
                onClick={() => setSelectedCategory('all')}
                aria-pressed={selectedCategory === 'all'}
                className={`px-3 py-1 text-[11px] font-mono uppercase tracking-wider rounded transition-colors ${
                  selectedCategory === 'all' ? 'bg-background text-foreground shadow-xs font-bold' : 'text-muted hover:text-foreground'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedCategory('painting')}
                aria-pressed={selectedCategory === 'painting'}
                className={`px-3 py-1 text-[11px] font-mono uppercase tracking-wider rounded transition-colors ${
                  selectedCategory === 'painting' ? 'bg-background text-foreground shadow-xs font-bold' : 'text-muted hover:text-foreground'
                }`}
              >
                Painting ({projects.filter((p) => p.category === 'painting').length})
              </button>
              <button
                onClick={() => setSelectedCategory('photography')}
                aria-pressed={selectedCategory === 'photography'}
                className={`px-3 py-1 text-[11px] font-mono uppercase tracking-wider rounded transition-colors ${
                  selectedCategory === 'photography' ? 'bg-background text-foreground shadow-xs font-bold' : 'text-muted hover:text-foreground'
                }`}
              >
                Photo ({projects.filter((p) => p.category === 'photography').length})
              </button>
            </div>

            {/* Year Selector */}
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-warm-gray/30 border border-border/60 rounded px-3 py-1.5 text-xs font-mono text-foreground focus:outline-hidden"
              aria-label="Filter by year"
            >
              <option value="all">All Years</option>
              {availableYears.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center gap-1 border-l border-border/60 pl-2.5">
              <button
                onClick={() => setViewMode('grid')}
                aria-label="Grid View"
                aria-pressed={viewMode === 'grid'}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === 'grid' ? 'bg-foreground text-background' : 'text-muted hover:text-foreground'
                }`}
                title="Grid View"
              >
                <Grid size={14} />
              </button>
              <button
                onClick={() => setViewMode('table')}
                aria-label="Table Index View"
                aria-pressed={viewMode === 'table'}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === 'table' ? 'bg-foreground text-background' : 'text-muted hover:text-foreground'
                }`}
                title="Table Index View"
              >
                <List size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Toolbar: Artist Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none border-t border-border/40">
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted hidden md:inline-block mr-1">
            Artist:
          </span>
          <button
            onClick={() => setSelectedArtist('all')}
            aria-pressed={selectedArtist === 'all'}
            className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-colors rounded-full ${
              selectedArtist === 'all'
                ? 'bg-foreground text-background font-bold'
                : 'bg-warm-gray/40 text-muted hover:text-foreground'
            }`}
          >
            All Artists ({projects.length})
          </button>
          {artists.map((artist) => (
            <button
              key={artist.slug}
              onClick={() => setSelectedArtist(artist.slug)}
              aria-pressed={selectedArtist === artist.slug}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-colors rounded-full ${
                selectedArtist === artist.slug
                  ? 'bg-foreground text-background font-bold'
                  : 'bg-warm-gray/40 text-muted hover:text-foreground'
              }`}
            >
              {artist.name} ({artist.worksCount})
            </button>
          ))}
        </div>

        {/* Active Filter Notice */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between text-xs text-muted pt-3 mt-3 border-t border-border/40">
            <span>
              Showing <strong className="text-foreground">{filteredProjects.length}</strong> of {projects.length} artworks
            </span>
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-accent-olive hover:underline"
            >
              <X size={12} /> Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* 3. ACTIVE ARTIST CURATORIAL BANNER (When an artist is filtered) */}
      <AnimatePresence mode="wait">
        {activeCatalogue && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-12 p-6 md:p-8 bg-warm-gray/30 border border-border/80 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between"
          >
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent-olive font-bold">
                  Curated Collection
                </span>
                <span className="text-xs font-mono text-muted">&middot; {activeCatalogue.period}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif italic text-foreground">
                {activeCatalogue.artist} &mdash; {activeCatalogue.title}
              </h2>
              <p className="text-xs md:text-sm text-muted leading-relaxed">
                {activeCatalogue.curatorialSummary}
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <a
                href={`mailto:fomeozuwobss@gmail.com?subject=${encodeURIComponent("Catalogue Request: " + activeCatalogue.title)}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1A1A1A] hover:bg-black text-[#F8F7F4] text-xs font-mono uppercase tracking-wider transition-colors shadow-xs"
              >
                <Mail size={13} />
                Request Catalogue
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. WORK DISPLAY: GRID OR TABLE */}
      {filteredProjects.length === 0 ? (
        <div className="py-24 text-center border border-dashed border-border p-12">
          <p className="text-base font-serif italic text-muted mb-4">No works match the selected filters.</p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-xs font-mono uppercase tracking-wider bg-foreground text-background"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {visibleProjects.map((project) => (
            <article
              key={project.id}
              className="group flex flex-col justify-between border border-border/50 bg-background hover:border-foreground/40 transition-editorial"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] bg-warm-gray/20 overflow-hidden cursor-pointer">
                <Image
                  src={project.image}
                  alt={`${project.title} by ${project.artist} — ${project.description}`}
                  fill
                  className="object-contain p-4 group-hover:scale-[1.03] transition-slow"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Top overlay pills */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 bg-background/90 text-foreground border border-border/60 backdrop-blur-xs">
                    {project.catalogueId}
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 bg-background/90 text-muted border border-border/60 backdrop-blur-xs">
                    {project.year}
                  </span>
                </div>

                {/* Hover Maximize button */}
                <button
                  onClick={() => openLightboxForId(project.id)}
                  aria-label="View large in lightbox"
                  className="absolute bottom-3 right-3 p-2 bg-[#1A1A1A]/85 text-[#F8F7F4] rounded-full opacity-0 group-hover:opacity-100 transition-editorial flex items-center justify-center hover:scale-110"
                >
                  <Maximize2 size={13} />
                </button>
              </div>

              {/* Artwork Metadata */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted">
                      {project.artist}
                    </span>
                    <span className="text-[10px] font-mono text-muted/80 capitalize">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-serif italic text-foreground tracking-tight mb-2 group-hover:text-accent-olive transition-colors">
                    <Link href={`/work/${project.id}`}>
                      {project.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-muted/90 line-clamp-2 leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/50 flex flex-col gap-2.5">
                  <dl className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px] font-mono">
                    <div>
                      <dt className="text-[9px] uppercase tracking-wider text-muted/70">Medium</dt>
                      <dd className="text-foreground truncate mt-0.5" title={project.medium}>
                        {project.medium}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[9px] uppercase tracking-wider text-muted/70">Dimensions</dt>
                      <dd className="text-foreground truncate mt-0.5">
                        {project.dimensions}
                      </dd>
                    </div>
                  </dl>

                  <div className="flex items-center justify-between pt-2 border-t border-border/30">
                    <Link
                      href={`/work/${project.id}`}
                      className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-foreground hover:text-accent-olive font-semibold transition-colors"
                    >
                      <span>Examine Work</span>
                      <ArrowRight size={11} />
                    </Link>
                    <span className="text-[9px] font-mono text-muted/60">{project.year}</span>
                  </div>
                </div>

              </div>
            </article>
          ))}
        </div>
      ) : (
        /* TABLE / INDEX VIEW */
        <div className="overflow-x-auto border border-border">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-warm-gray/30 border-b border-border text-[10px] uppercase tracking-wider text-muted">
              <tr>
                <th className="py-3 px-4">Ref</th>
                <th className="py-3 px-4">Thumbnail</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Artist</th>
                <th className="py-3 px-4">Year</th>
                <th className="py-3 px-4">Medium</th>
                <th className="py-3 px-4">Dimensions</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {visibleProjects.map((project) => (
                <tr key={project.id} className="hover:bg-warm-gray/10 transition-colors">
                  <td className="py-3 px-4 font-bold text-foreground">{project.catalogueId}</td>
                  <td className="py-3 px-4">
                    <div 
                      onClick={() => openLightboxForId(project.id)}
                      className="relative w-12 h-10 bg-warm-gray/30 cursor-pointer overflow-hidden rounded-xs border border-border/40"
                    >
                      <Image
                        src={project.image}
                        alt={`${project.title} by ${project.artist} — ${project.description}`}
                        fill
                        className="object-contain p-1"
                        sizes="48px"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Link
                      href={`/work/${project.id}`}
                      className="font-serif italic text-sm text-foreground hover:text-accent-olive font-semibold block"
                    >
                      {project.title}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-muted">{project.artist}</td>
                  <td className="py-3 px-4">{project.year}</td>
                  <td className="py-3 px-4 text-muted truncate max-w-xs" title={project.medium}>
                    {project.medium}
                  </td>
                  <td className="py-3 px-4 text-muted">{project.dimensions}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/work/${project.id}`}
                        className="text-foreground hover:text-accent-olive transition-colors"
                        title="View details"
                      >
                        <ArrowRight size={13} />
                      </Link>
                      
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Show More / Show Less */}
      {filteredProjects.length > INITIAL_SHOW && (
        <div className="flex flex-col items-center gap-3 mt-12 pt-8 border-t border-border/40">
          <span className="text-xs font-mono text-muted">
            Showing {showAll ? filteredProjects.length : Math.min(INITIAL_SHOW, filteredProjects.length)} of {filteredProjects.length} works
          </span>
          <button
            onClick={() => setShowAll((v) => !v)}
            className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/30 text-foreground hover:bg-foreground hover:text-background text-xs font-mono uppercase tracking-widest transition-all duration-200 group"
          >
            {showAll ? (
              <>
                <ChevronUp size={13} className="group-hover:-translate-y-0.5 transition-transform" />
                <span>Show Less</span>
              </>
            ) : (
              <>
                <span>Show All {filteredProjects.length} Works</span>
                <ChevronDown size={13} className="group-hover:translate-y-0.5 transition-transform" />
              </>
            )}
          </button>
        </div>
      )}

      {/* Lightbox for full zoom examination */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        currentIndex={lightboxIndex}
        setCurrentIndex={setLightboxIndex}
      />
    </div>
  );
}

