'use client';

import Link from 'next/link';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-10 px-4 sm:px-6 md:px-12 w-full">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-start justify-between gap-8 text-xs font-mono text-muted">
        {/* Left: Brand & Rights */}
        <div className="space-y-2">
          <span className="text-foreground font-serif italic text-sm block">The Ozuwo Enifome Collection</span>
          <span className="block">Lagos, Nigeria · Active Archive · Est. 2006</span>
          <span className="block">© {year} Ozuwo Enifome. All rights reserved.</span>
          <span className="block text-muted/60 text-[10px] leading-relaxed max-w-xs">
            Image rights belong to respective artists. All catalogue content compiled by Ozuwo Enifome
            in collaboration with the artists.
          </span>
        </div>

        {/* Middle: Navigation */}
        <nav className="flex flex-wrap gap-x-8 gap-y-3 uppercase tracking-widest text-[10px]">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <Link href="/painting" className="hover:text-foreground transition-colors">Paintings</Link>
          <Link href="/photography" className="hover:text-foreground transition-colors">Photography</Link>
          <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
          <Link href="/exhibitions" className="hover:text-foreground transition-colors">Exhibitions</Link>
          <Link href="/legal" className="hover:text-foreground transition-colors">Legal &amp; Privacy</Link>
        </nav>

        {/* Right: Contact */}
        <div className="space-y-2 md:text-right">
          <span className="text-foreground block uppercase tracking-widest text-[10px]">Enquiries &amp; Acquisitions</span>
          <a
            href="mailto:fomeozuwobss@gmail.com"
            className="hover:text-foreground transition-colors underline underline-offset-2 block"
          >
            fomeozuwobss@gmail.com
          </a>
          <span className="block text-muted/60 text-[10px]">Lagos, Nigeria</span>
        </div>
      </div>
    </footer>
  );
}
