'use client';

import { Project } from '@/lib/data';
import { ProjectCard } from './ProjectCard';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function AsymmetricalGrid({ projects }: { projects: Project[] }) {
  // Swiss Modular Span Pattern
  // This creates a rigorous yet dynamic rhythm typical of Swiss layout systems
  const getSpanClass = (index: number) => {
    const pattern = [
      'md:col-span-8 md:row-span-2', // Large Feature (2/3 width)
      'md:col-span-4 md:row-span-1', // Standard Label
      'md:col-span-4 md:row-span-1', // Standard Label
      'md:col-span-4 md:row-span-2', // Tall Sidebar
      'md:col-span-8 md:row-span-1', // Wide Feature
      'md:col-span-4 md:row-span-1', // Standard
      'md:col-span-4 md:row-span-1', // Standard
    ];
    return pattern[index % pattern.length];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-border overflow-hidden border-swiss auto-rows-[300px] md:auto-rows-[400px]">
      {projects.map((project, index) => (
        <div 
          key={project.id} 
          className={cn(
            'flex bg-background p-6 md:p-8 border-swiss', 
            getSpanClass(index)
          )}
        >
          <ProjectCard 
            project={project} 
            className="w-full h-full" 
            isBento={true}
          />
        </div>
      ))}
    </div>
  );
}

