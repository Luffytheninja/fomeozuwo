'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle2, Shield, Truck, Eye, ArrowRight } from 'lucide-react';
import { catalogues } from '@/lib/data';

export function Collectors() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    catalogue: 'all',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    // Build subject and body for fallback mail client or records
    const selectedCat = catalogues.find((c) => c.id === formData.catalogue);
    const catLabel = selectedCat ? `${selectedCat.artist} — ${selectedCat.title}` : 'All Catalogues & General Acquisition';
    const mailSubject = encodeURIComponent(`Acquisition & Catalogue Enquiry: ${catLabel}`);
    const mailBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nInstitution/Affiliation: ${formData.institution || 'Individual Collector'}\nCatalogue of Interest: ${catLabel}\n\nMessage:\n${formData.message}`
    );

    // Open mailto in background for instant transmission
    window.location.href = `mailto:fomeozuwobss@gmail.com?subject=${mailSubject}&body=${mailBody}`;
    setFormSubmitted(true);
  };

  return (
    <section id="collectors" className="py-16 md:py-24 border-t border-border mt-16 md:mt-24">
      {/* Institutional Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="p-6 sm:p-8 bg-warm-gray/25 border border-border/60 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Shield size={14} className="text-accent-olive" />
              <span className="text-[10px] font-mono text-muted tracking-widest uppercase">01 / PROVENANCE</span>
            </div>
            <h3 className="font-serif text-lg italic text-foreground mb-2">Provenance &amp; Authenticity</h3>
            <p className="text-xs text-muted leading-relaxed">
              All original paintings, mixed-media reliefs, and unique 1/1 fine-art photographic prints were acquired directly from the artists through studio patronage, accompanied by signed Certificates of Authenticity.
            </p>
          </div>
          <span className="text-[10px] font-mono text-muted/60 mt-4 block">Official Artist Signatures &amp; Records</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-6 sm:p-8 bg-warm-gray/25 border border-border/60 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Truck size={14} className="text-accent-olive" />
              <span className="text-[10px] font-mono text-muted tracking-widest uppercase">02 / LOGISTICS</span>
            </div>
            <h3 className="font-serif text-lg italic text-foreground mb-2">Conservation &amp; Global Freight</h3>
            <p className="text-xs text-muted leading-relaxed">
              We coordinate fully insured, museum-grade climate-controlled crating and international freight via specialized fine art couriers. Custom preservation framing is managed per acquisition.
            </p>
          </div>
          <span className="text-[10px] font-mono text-muted/60 mt-4 block">Insured Door-to-Door Delivery</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="p-6 sm:p-8 bg-warm-gray/25 border border-border/60 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Eye size={14} className="text-accent-olive" />
              <span className="text-[10px] font-mono text-muted tracking-widest uppercase">03 / VIEWINGS</span>
            </div>
            <h3 className="font-serif text-lg italic text-foreground mb-2">Private Dialogues &amp; Loans</h3>
            <p className="text-xs text-muted leading-relaxed">
              Private physical viewings in Lagos and institutional exhibition loans can be arranged for museum curators, foundations, and qualified collectors. High-resolution object dossiers are provided upon verified request.
            </p>
          </div>
          <span className="text-[10px] font-mono text-muted/60 mt-4 block">Curatorial Dialogue &amp; Research</span>
        </motion.div>
      </div>

      {/* Curatorial & Acquisition Enquiry Section */}
      <div id="enquiry" className="border border-border bg-warm-gray/15 p-6 sm:p-10 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Context & Direct Contact */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-accent-olive block">
              Curatorial Contact &amp; Acquisitions
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif italic text-foreground tracking-tight">
              Enquire on Catalogues &amp; Holdings
            </h2>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Whether you are an institution requesting exhibition loan documentation, a gallery seeking an artist monograph, or a private collector enquiring on an available holding, please submit your request below.
            </p>
            <div className="pt-4 border-t border-border/60 space-y-2 text-xs font-mono text-muted">
              <div>
                <span className="text-foreground block uppercase text-[10px] tracking-wider">Direct Studio Contact</span>
                <a
                  href="mailto:fomeozuwobss@gmail.com"
                  className="text-foreground hover:text-accent-olive underline underline-offset-2 transition-colors"
                >
                  fomeozuwobss@gmail.com
                </a>
              </div>
              <div>
                <span className="text-foreground block uppercase text-[10px] tracking-wider mt-3">Location</span>
                <span>Lagos, Nigeria · Available for Global Enquiries</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean, Structured Form */}
          <div className="lg:col-span-7">
            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 border border-accent-olive/40 bg-accent-olive/5 text-center space-y-3"
              >
                <CheckCircle2 size={32} className="mx-auto text-accent-olive" />
                <h3 className="font-serif italic text-xl text-foreground">Enquiry Dispatched</h3>
                <p className="text-xs text-muted max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-foreground">{formData.name}</strong>. Your enquiry regarding the catalogue and collection holdings has been received. A curatorial response and high-resolution dossier will be sent to <strong className="text-foreground">{formData.email}</strong>.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="text-[10px] font-mono uppercase tracking-widest text-muted hover:text-foreground underline"
                  >
                    Send another enquiry
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-muted mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Adebayo Adeleke"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-background border border-border/80 px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted/50 focus:outline-hidden focus:border-foreground transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-muted mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. curator@museum.org"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-background border border-border/80 px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted/50 focus:outline-hidden focus:border-foreground transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-muted mb-1.5">
                      Institution / Affiliation
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Private Collector / Gallery / Museum"
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      className="w-full bg-background border border-border/80 px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted/50 focus:outline-hidden focus:border-foreground transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-muted mb-1.5">
                      Catalogue / Area of Interest
                    </label>
                    <select
                      value={formData.catalogue}
                      onChange={(e) => setFormData({ ...formData, catalogue: e.target.value })}
                      className="w-full bg-background border border-border/80 px-3 py-2.5 text-xs text-foreground focus:outline-hidden focus:border-foreground transition-colors"
                    >
                      <option value="all">All Catalogues / General Acquisition</option>
                      {catalogues.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.artist} — {cat.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-muted mb-1.5">
                    Message / Acquisition Details
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Specify the artwork ID, exhibition context, or specific curatorial questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-background border border-border/80 px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted/50 focus:outline-hidden focus:border-foreground transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#1A1A1A] hover:bg-black text-[#F8F7F4] text-xs font-mono uppercase tracking-[0.16em] transition-all font-medium"
                >
                  <Mail size={13} />
                  <span>Transmit Curatorial Enquiry</span>
                  <ArrowRight size={13} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
