'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, projects, artists, catalogues } from '@/lib/data';
import { Lightbox } from '@/components/Lightbox';
import { 
  Download, 
  Search, 
  Grid, 
  List, 
  ArrowRight, 
  Maximize2, 
  FileText,
  Filter,
  X
} from 'lucide-react';

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
    return projects.filter((p) => {
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
  }, [selectedArtist, selectedCategory, selectedYear, searchQuery]);

  const activeCatalogue = useMemo(() => {
    if (selectedArtist === 'all') return null;
    return catalogues.find((c) => c.artistSlug === selectedArtist) || null;
  }, [selectedArtist]);

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
      {/* 1. CATALOGUES DOWNLOAD BAR (Shelf of PDFs) */}
      <div className="mb-16 border border-border bg-warm-gray/20 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted block mb-1">
              Official Documentation
            </span>
            <h3 className="text-xl md:text-2xl font-serif italic text-foreground">
              Collection Catalogues & PDFs
            </h3>
          </div>
          <span className="text-xs text-muted font-mono">
            4 Catalogues &middot; 67 Documented Works
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {catalogues.map((cat) => {
            const isSelected = selectedArtist === cat.artistSlug;
            return (
              <div
                key={cat.id}
                className={`flex flex-col justify-between p-4 border transition-all ${
                  isSelected 
                    ? 'border-accent-olive bg-background shadow-sm' 
                    : 'border-border/60 bg-background/60 hover:border-foreground/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-muted">
                      {cat.period}
                    </span>
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 bg-warm-gray/40 text-foreground/80 rounded">
                      {cat.worksCount} Works
                    </span>
                  </div>
                  <h4 className="text-sm font-serif italic font-semibold text-foreground leading-snug mb-1">
                    {cat.artist}
                  </h4>
                  <p className="text-[11px] text-muted line-clamp-2 leading-relaxed mb-4">
                    {cat.title}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-border/40">
                  <a
                    href={cat.pdfPath}
                    download={cat.pdfFilename}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 bg-[#1A1A1A] hover:bg-black text-[#F8F7F4] text-[10px] font-mono uppercase tracking-wider transition-colors"
                  >
                    <Download size={11} />
                    <span>PDF</span>
                  </a>
                  <button
                    onClick={() => setSelectedArtist(isSelected ? 'all' : cat.artistSlug)}
                    className={`py-1.5 px-3 text-[10px] font-mono uppercase tracking-wider border transition-colors ${
                      isSelected
                        ? 'border-accent-olive text-accent-olive bg-accent-olive/10 font-bold'
                        : 'border-border hover:border-foreground/40 text-muted'
                    }`}
                  >
                    {isSelected ? 'Viewing' : 'Filter'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. FILTER CONTROLS BAR */}
      <div className="sticky top-20 z-30 bg-background/95 backdrop-blur-md border-y border-border py-4 mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Artist Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted hidden md:inline-block mr-2">
              Artist:
            </span>
            <button
              onClick={() => setSelectedArtist('all')}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-colors rounded-full ${
                selectedArtist === 'all'
                  ? 'bg-foreground text-background font-bold'
                  : 'bg-warm-gray/40 text-muted hover:text-foreground'
              }`}
            >
              All ({projects.length})
            </button>
            {artists.map((artist) => (
              <button
                key={artist.slug}
                onClick={() => setSelectedArtist(artist.slug)}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-colors rounded-full ${
                  selectedArtist === artist.slug
                    ? 'bg-foreground text-background font-bold'
                    : 'bg-warm-gray/40 text-muted hover:text-foreground'
                }`}
              >
                {artist.name.split(' ')[0]} ({artist.worksCount})
              </button>
            ))}
          </div>

          {/* Medium, Search, and View Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Medium Selector */}
            <div className="flex items-center bg-warm-gray/30 rounded p-1 border border-border/60">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider rounded ${
                  selectedCategory === 'all' ? 'bg-background text-foreground shadow-xs font-bold' : 'text-muted hover:text-foreground'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedCategory('painting')}
                className={`px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider rounded ${
                  selectedCategory === 'painting' ? 'bg-background text-foreground shadow-xs font-bold' : 'text-muted hover:text-foreground'
                }`}
              >
                Painting ({projects.filter((p) => p.category === 'painting').length})
              </button>
              <button
                onClick={() => setSelectedCategory('photography')}
                className={`px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider rounded ${
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
              className="bg-warm-gray/30 border border-border/60 rounded px-2.5 py-1.5 text-xs font-mono text-foreground focus:outline-hidden"
              aria-label="Filter by year"
            >
              <option value="all">All Years</option>
              {availableYears.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>

            {/* Search Input */}
            <div className="relative flex-1 sm:w-48">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder="Search works..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-warm-gray/30 border border-border/60 rounded pl-8 pr-7 py-1.5 text-xs font-sans text-foreground placeholder:text-muted/60 focus:outline-hidden focus:border-foreground/40"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center gap-1 border-l border-border/60 pl-3">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === 'grid' ? 'bg-foreground text-background' : 'text-muted hover:text-foreground'
                }`}
                title="Grid View"
              >
                <Grid size={14} />
              </button>
              <button
                onClick={() => setViewMode('table')}
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
                href={activeCatalogue.pdfPath}
                download={activeCatalogue.pdfFilename}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1A1A1A] hover:bg-black text-[#F8F7F4] text-xs font-mono uppercase tracking-wider transition-colors shadow-xs"
              >
                <Download size={13} />
                Download Catalogue (PDF)
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
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group flex flex-col justify-between border border-border/50 bg-background hover:border-foreground/40 transition-editorial"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] bg-warm-gray/20 overflow-hidden cursor-pointer">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-contain p-4 group-hover:scale-[1.03] transition-slow"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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

                <div className="pt-4 border-t border-border/50 flex flex-col gap-2 text-[11px] text-muted font-mono">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase text-muted/70">Medium</span>
                    <span className="text-foreground truncate max-w-[65%] text-right" title={project.medium}>
                      {project.medium}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase text-muted/70">Dimensions</span>
                    <span className="text-foreground">{project.dimensions}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 mt-1 border-t border-border/30">
                    <Link
                      href={`/work/${project.id}`}
                      className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-foreground hover:text-accent-olive font-semibold transition-colors"
                    >
                      <span>Examine Work</span>
                      <ArrowRight size={11} />
                    </Link>

                    {project.pdfPath && (
                      <a
                        href={project.pdfPath}
                        download={project.pdfFilename}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-muted hover:text-foreground transition-colors"
                        title="Download Catalogue PDF"
                      >
                        <Download size={10} />
                        <span>PDF</span>
                      </a>
                    )}
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
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-warm-gray/10 transition-colors">
                  <td className="py-3 px-4 font-bold text-foreground">{project.catalogueId}</td>
                  <td className="py-3 px-4">
                    <div 
                      onClick={() => openLightboxForId(project.id)}
                      className="relative w-12 h-10 bg-warm-gray/30 cursor-pointer overflow-hidden rounded-xs border border-border/40"
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
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
                      {project.pdfPath && (
                        <a
                          href={project.pdfPath}
                          download={project.pdfFilename}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted hover:text-foreground transition-colors"
                          title="Download Catalogue PDF"
                        >
                          <Download size={13} />
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
