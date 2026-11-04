'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Home hero is dark (#151515 + artwork slideshow)
  const isHeroLight = !(pathname === '/' && !isScrolled);

  const scrollToContact = () => {
    if (pathname === '/') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/#contact');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/painting', label: 'Paintings' },
    { href: '/photography', label: 'Photography' },
    { href: '/about', label: 'About' },
    { href: '/exhibitions', label: 'Exhibitions' },
  ];

  return (
    <>
      {/* Modern Swiss Glass Header */}
      <header
        className={`fixed top-0 left-0 w-full z-50 px-4 sm:px-8 md:px-12 py-3.5 sm:py-4 md:py-5 flex justify-between items-center transition-all duration-500 ${
          isHeroLight
            ? 'bg-[#F8F7F4]/80 backdrop-blur-xl border-b border-border/80 text-[#1A1A1A] shadow-xs'
            : 'bg-black/35 backdrop-blur-xl border-b border-white/10 text-[#F8F7F4]'
        }`}
      >
        {/* Brand / Logo */}
        <div>
          <Link
            href="/"
            className="pointer-events-auto group flex items-center gap-3 transition-opacity hover:opacity-80"
            onClick={() => setIsOpen(false)}
          >
            <span className="text-xl sm:text-2xl font-editorial-serif tracking-tight font-light leading-none">
              EOE
            </span>
            <span
              className={`hidden sm:inline-block h-3.5 w-px transition-colors duration-500 ${
                isHeroLight ? 'bg-border' : 'bg-white/20'
              }`}
            />
            <span
              className={`text-[9px] font-mono uppercase tracking-[0.22em] transition-colors duration-500 ${
                isHeroLight ? 'text-muted' : 'text-white/65'
              }`}
            >
              Private Archive
            </span>
          </Link>
        </div>

        {/* Desktop Nav: Precision Swiss international layout */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10 pointer-events-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] font-mono uppercase tracking-[0.18em] transition-all duration-200 relative py-1 ${
                  isActive
                    ? isHeroLight
                      ? 'text-[#1A1A1A] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-[#1A1A1A]'
                      : 'text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-white'
                    : isHeroLight
                    ? 'text-muted hover:text-[#1A1A1A]'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Swiss Glass Action Button */}
          <button
            onClick={scrollToContact}
            className={`text-[10px] font-mono uppercase tracking-[0.2em] font-medium px-4 py-2 border transition-all duration-300 ${
              isHeroLight
                ? 'border-foreground/30 text-foreground hover:bg-foreground hover:text-background'
                : 'border-white/30 text-white hover:bg-white hover:text-[#151515]'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden pointer-events-auto p-2 transition-colors duration-300 focus:outline-hidden ${
            isHeroLight ? 'text-foreground' : 'text-white'
          }`}
          aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile Menu Overlay: Swiss Glass Aesthetic */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#F8F7F4]/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 pt-24 md:hidden"
          >
            {/* Top Info Header */}
            <div className="flex justify-between items-center border-b border-border/60 pb-4">
              <span className="text-sm font-editorial-serif italic text-foreground">
                The Ozuwo Enifome Collection
              </span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-muted">
                Archive Navigation
              </span>
            </div>

            {/* Nav Links */}
            <nav className="flex flex-col gap-6 my-auto pl-2">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, ease: [0.25, 1, 0.5, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-3xl sm:text-4xl font-editorial-serif tracking-tight transition-colors ${
                        isActive ? 'text-foreground italic font-normal' : 'text-muted hover:text-foreground font-light'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.06, ease: [0.25, 1, 0.5, 1] }}
              >
                <button
                  onClick={() => {
                    setIsOpen(false);
                    if (pathname === '/') {
                      setTimeout(() => {
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }, 300);
                    } else {
                      router.push('/#contact');
                    }
                  }}
                  className="text-3xl sm:text-4xl font-editorial-serif font-light text-accent-olive italic text-left"
                >
                  Contact
                </button>
              </motion.div>
            </nav>

            {/* Mobile Footer */}
            <div className="border-t border-border/60 pt-4 flex flex-col gap-1.5">
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-foreground/80">
                Lagos, Nigeria &middot; Active Archive
              </span>
              <span className="text-[9px] text-muted">
                Curated holdings spanning Kelani Abass, Muyiwa Akinwolere, Johnson Babatunde Shobowale & Ozuwo Enifome.
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
