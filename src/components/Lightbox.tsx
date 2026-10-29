'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project, projects as defaultProjects } from '@/lib/data';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  projectsList?: Project[];
  currentIndex: number;
  onNavigate?: (index: number) => void;
  setCurrentIndex?: (index: number) => void;
}

export function Lightbox({ 
  isOpen, 
  onClose, 
  projectsList = defaultProjects, 
  currentIndex, 
  onNavigate,
  setCurrentIndex
}: LightboxProps) {
  const navigate = onNavigate || setCurrentIndex || (() => {});
  const currentProject = projectsList[currentIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        navigate((currentIndex + 1) % projectsList.length);
      }
      if (e.key === 'ArrowLeft') {
        navigate((currentIndex - 1 + projectsList.length) % projectsList.length);
      }
    },
    [isOpen, currentIndex, projectsList, onClose, navigate]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !currentProject) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[100] bg-[#1A1A1A] text-[#F8F7F4] flex flex-col justify-between p-6 md:p-12 select-none"
      >
        {/* Lightbox Header */}
        <div className="flex justify-between items-center w-full z-10">
          <div className="flex flex-col">
            <span className="text-xs font-serif italic text-white/60">Enifome Ozuwo</span>
            <span className="text-xs uppercase tracking-widest text-white/40">Private Archive</span>
          </div>
          
          <div className="text-sm font-mono opacity-80">
            {String(currentIndex + 1).padStart(2, '0')} / {String(projectsList.length).padStart(2, '0')}
          </div>

          <button
            onClick={onClose}
            className="p-3 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Lightbox Main Frame */}
        <div className="relative flex-grow flex items-center justify-center my-6 md:my-12">
          {/* Navigation - Left */}
          <button
            onClick={() => navigate((currentIndex - 1 + projectsList.length) % projectsList.length)}
            className="absolute left-0 md:left-4 z-20 p-3 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Previous Project"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>

          {/* Image */}
          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="relative w-full h-full max-w-5xl max-h-[70vh] flex items-center justify-center"
          >
            <Image
              src={currentProject.image}
              alt={currentProject.title}
              fill
              className="object-contain pointer-events-none"
              sizes="(max-width: 1200px) 100vw, 80vw"
              priority
            />
          </motion.div>

          {/* Navigation - Right */}
          <button
            onClick={() => navigate((currentIndex + 1) % projectsList.length)}
            className="absolute right-0 md:right-4 z-20 p-3 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Next Project"
          >
            <ChevronRight size={24} className="text-white" />
          </button>
        </div>

        {/* Lightbox Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-end z-10">
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-wider text-white/40 mb-1">Title & Year</span>
            <h3 className="text-xl font-serif text-white">{currentProject.title} ({currentProject.year})</h3>
          </div>
          
          <div className="flex flex-col md:items-center">
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-wider text-white/40 mb-1">Medium & Dimensions</span>
              <span className="text-sm text-white/80">{currentProject.medium} — {currentProject.dimensions}</span>
            </div>
          </div>

          <div className="flex justify-end text-right">
            <span className="text-xs font-serif italic text-white/60 max-w-xs line-clamp-2 md:line-clamp-none">
              {currentProject.description}
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
