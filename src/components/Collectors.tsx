'use client';

import { motion } from 'framer-motion';
import { FileText, Mail } from 'lucide-react';
import { catalogues } from '@/lib/data';

export function Collectors() {
  return (
    <section id="collectors" className="py-24 border-t border-border mt-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-editorial-meta">Acquisition & Curation</span>
            <h2 className="text-3xl md:text-4xl font-serif italic text-foreground tracking-tight">
              For Discerning Collectors & Institutions.
            </h2>
            <p className="text-xs text-muted leading-relaxed pt-2">
              The Ozuwo Enifome Collection represents a long-term investment in modern and contemporary Nigerian visual history, supported by rigorous provenance and documentation standards.
            </p>
          </div>

          {/* all 4 gallery catalogues */}
          <div className="mt-8 space-y-3 pt-6 border-t border-border/60">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted block mb-2">
              Official Gallery Catalogues
            </span>
            <div className="flex flex-col gap-2">
              {catalogues.map((cat) => (
                <a
                  key={cat.id}
                  href={`mailto:fomeozuwobss@gmail.com?subject=${encodeURIComponent("Catalogue Request: " + cat.title)}`}
                  className="flex items-center justify-between p-2.5 bg-warm-gray/30 hover:bg-warm-gray/60 border border-border/70 transition-colors group"
                >
                  <div className="flex flex-col pr-2">
                    <span className="text-xs font-serif italic text-foreground font-semibold group-hover:text-accent-olive transition-colors">
                      {cat.artist}
                    </span>
                    <span className="text-[10px] font-mono text-muted truncate max-w-xs">
                      {cat.title} ({cat.period})
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-muted group-hover:text-foreground shrink-0">
                    <Mail size={12} />
                    <span>Request</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col gap-3 p-6 bg-warm-gray/30 hover:bg-warm-gray/50 transition-editorial border border-border/40"
          >
            <span className="text-[10px] font-mono text-muted">01 / PROVENANCE</span>
            <h3 className="font-serif text-lg italic text-foreground">Provenance & Authenticity</h3>
            <p className="text-xs text-muted leading-relaxed">
              All original paintings, mixed media pieces, and unique 1/1 fine-art prints are acquired directly through direct patronage or the artist, accompanied by Certificates of Authenticity.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-3 p-6 bg-warm-gray/30 hover:bg-warm-gray/50 transition-editorial border border-border/40"
          >
            <span className="text-[10px] font-mono text-muted">02 / LOGISTICS</span>
            <h3 className="font-serif text-lg italic text-foreground">White-Glove Shipping</h3>
            <p className="text-xs text-muted leading-relaxed">
              We coordinate fully insured, climate-controlled shipping worldwide via specialized art courier services. Private viewings and installations in Lagos are managed personally.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col gap-3 p-6 bg-warm-gray/30 hover:bg-warm-gray/50 transition-editorial border border-border/40"
          >
            <span className="text-[10px] font-mono text-muted">03 / VIEWINGS</span>
            <h3 className="font-serif text-lg italic text-foreground">Private Dialogues</h3>
            <p className="text-xs text-muted leading-relaxed">
              Private collection viewings and curatorial loans can be arranged for museums, curators, and collectors upon request (<a href="mailto:fomeozuwobss@gmail.com" className="underline hover:text-foreground">fomeozuwobss@gmail.com</a>).
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
