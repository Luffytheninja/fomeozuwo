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

  const scrollToContact = () => {
    if (pathname === '/') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/#contact');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
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
      <header
        className={`fixed top-0 left-0 w-full z-[60] px-6 md:px-12 py-6 md:py-8 flex justify-between items-center transition-editorial ${
          isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border/40' : 'bg-transparent'
        }`}
      >
        <div>
          <Link href="/" className="pointer-events-auto group" onClick={() => setIsOpen(false)}>
            <div className="flex flex-col">
              <span className="text-2xl font-editorial-serif tracking-tight font-light group-hover:opacity-60 transition-opacity">
                EOE
              </span>
              <span className="text-[8px] uppercase tracking-[0.25em] text-muted -mt-1 block">
                Private Archive
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-12 pointer-events-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] uppercase tracking-widest transition-opacity hover:opacity-100 ${
                  isActive ? 'text-foreground font-semibold opacity-100 border-b border-foreground/40 pb-1' : 'text-muted opacity-70'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <button
            className="text-[11px] uppercase tracking-widest text-accent-olive opacity-80 hover:opacity-100 font-semibold transition-opacity"
            onClick={scrollToContact}
          >
            Contact
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden pointer-events-auto p-2 text-foreground"
          aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      {/* Mobile Menu Overlay — Minimalist Editorial Layout */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-[#F8F7F4] flex flex-col justify-between p-8 md:hidden"
          >
            {/* Mobile Header Spacer */}
            <div className="flex justify-between items-center border-b border-border/40 pb-6">
              <span className="text-lg font-serif italic text-foreground">EOE</span>
              <span className="text-[9px] uppercase tracking-widest text-muted">Archive Navigation</span>
            </div>

            <nav className="flex flex-col gap-8 my-auto pl-4">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, ease: [0.25, 1, 0.5, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-4xl font-editorial-serif font-light ${
                        isActive ? 'text-foreground italic' : 'text-muted'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.08, ease: [0.25, 1, 0.5, 1] }}
              >
                <button
                  onClick={() => {
                    setIsOpen(false);
                    if (pathname === '/') {
                      setTimeout(() => {
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }, 400);
                    } else {
                      router.push('/#contact');
                    }
                  }}
                  className="text-4xl font-editorial-serif font-light text-accent-olive italic text-left"
                >
                  Contact
                </button>
              </motion.div>
            </nav>

            <div className="border-t border-border/40 pt-6 flex flex-col gap-2">
              <span className="text-[9px] uppercase tracking-[0.2em] text-muted">
                Visual Artist working across painting & photography
              </span>
              <span className="text-[9px] text-muted/60">
                Lagos, Nigeria — Active Archive
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
