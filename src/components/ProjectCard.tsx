'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/lib/data';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const aspectRatioMap: Record<string, string> = {
  portrait: 'aspect-[3/4.5]',
  landscape: 'aspect-[4/3]',
  square: 'aspect-[1/1]',
};

export function ProjectCard({ 
  project, 
  className,
  isBento = false 
}: { 
  project: Project; 
  className?: string;
  isBento?: boolean;
}) {
  const ratioClass = aspectRatioMap[project.aspectRatio ?? 'landscape'] ?? 'aspect-[4/3]';

  return (
    <Link href={`/work/${project.id}`} className="block group w-full h-full">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn('flex flex-col h-full', className)}
      >
        {/* Modular Metadata — Header Style */}
        <div className="flex justify-between items-baseline mb-6">
          <span className="text-micro opacity-40">{project.id.toUpperCase()}</span>
          <span className="text-micro font-bold">{project.year}</span>
        </div>

        {/* Image Viewport */}
        <div
          className={cn(
            'relative overflow-hidden bg-transparent transition-swiss flex-grow flex items-center justify-center p-4 md:p-8',
            !isBento && ratioClass
          )}
        >
          <div className="relative w-full h-full transition-swiss group-hover:scale-[1.03]">
             <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={false}
            />
          </div>
        </div>

        {/* Technical Metadata Footer */}
        <div className="mt-6 pt-6 border-t border-black/5 grid grid-cols-2 gap-4">
          <div className="flex flex-col min-w-0">
            <span className="text-[9px] uppercase tracking-wider text-muted mb-1">Project</span>
            <h3 className="text-label truncate w-full">{project.title}</h3>
          </div>
          <div className="flex flex-col items-end min-w-0 text-right">
            <span className="text-[9px] uppercase tracking-wider text-muted mb-1">Category</span>
            <span className="text-label truncate w-full">{project.category}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

