'use client';

import { motion } from 'framer-motion';

export function Collectors() {
  return (
    <section className="py-24 border-t border-border mt-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-editorial-meta">Acquisition & Curation</span>
            <h2 className="text-3xl md:text-4xl font-serif italic text-foreground tracking-tight">
              For Discerning Collectors.
            </h2>
          </div>
          <div className="hidden lg:block text-xs text-muted max-w-xs leading-relaxed mt-12">
            Every acquisition represents a long-term investment in atmosphere, supported by rigorous logistical and artistic standards.
          </div>
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col gap-4 p-6 bg-warm-gray/30 hover:bg-warm-gray/50 transition-editorial"
          >
            <span className="text-[10px] font-mono text-muted">01 / PROVENANCE</span>
            <h3 className="font-serif text-lg italic text-foreground">Provenance & Authenticity</h3>
            <p className="text-xs text-muted leading-relaxed">
              All original paintings and limited-edition prints are hand-signed by the artist and accompanied by a custom, serial-numbered Certificate of Authenticity.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-4 p-6 bg-warm-gray/30 hover:bg-warm-gray/50 transition-editorial"
          >
            <span className="text-[10px] font-mono text-muted">02 / LOGISTICS</span>
            <h3 className="font-serif text-lg italic text-foreground">White-Glove Shipping</h3>
            <p className="text-xs text-muted leading-relaxed">
              We coordinate fully insured, climate-controlled shipping worldwide via specialized art courier services. Local installations in Lagos are managed personally.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col gap-4 p-6 bg-warm-gray/30 hover:bg-warm-gray/50 transition-editorial"
          >
            <span className="text-[10px] font-mono text-muted">03 / VIEWINGS</span>
            <h3 className="font-serif text-lg italic text-foreground">Private Dialogues</h3>
            <p className="text-xs text-muted leading-relaxed">
              Private studio visits in Lagos and digital viewings of works-in-progress can be arranged for curators, architects, and collectors upon request.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
