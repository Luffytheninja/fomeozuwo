import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal | Privacy & Terms',
  description: 'Privacy Policy, Terms and Conditions, and Acquisition Protocols for the EOE Private Archive.',
};

export default function LegalPage() {
  return (
    <div className="pt-32 md:pt-48 pb-32 px-6 md:px-12 max-w-[1200px] mx-auto min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
        {/* Header */}
        <div className="md:col-span-12 mb-20 animate-reveal-up">
          <span className="text-editorial-meta mb-4 block">Archive Standards</span>
          <h1 className="text-display-medium text-foreground">
            Privacy & Terms
          </h1>
        </div>

        {/* Content Navigation - Desktop Only */}
        <div className="hidden md:block md:col-span-3 sticky top-48 h-fit">
          <nav className="flex flex-col gap-4 border-l border-border pl-6 text-[10px] tracking-widest uppercase">
            <a href="#privacy" className="text-muted hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#terms" className="text-muted hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#shipping" className="text-muted hover:text-foreground transition-colors">Shipping & Returns</a>
            <a href="#copyright" className="text-muted hover:text-foreground transition-colors">Copyright</a>
          </nav>
        </div>

        {/* Content Area */}
        <div className="md:col-span-9 flex flex-col gap-24 font-sans text-sm text-muted leading-relaxed">
          
          {/* Privacy Policy */}
          <section id="privacy" className="scroll-mt-32">
            <h2 className="text-editorial-meta mb-6 text-foreground font-semibold">01 — Privacy Policy</h2>
            <div className="space-y-6">
              <p>
                Your privacy is paramount. This policy outlines how the EOE Private Archive ("we", "our", or "us") manages 
                personal data collected through our digital archive and acquisition inquiries.
              </p>
              <div>
                <h3 className="text-foreground font-semibold mb-2">Data Collection & Intention</h3>
                <p>
                  We collect information necessary for inquiries and private acquisitions, including name, 
                  contact details, and delivery address. This data is used exclusively for facilitating 
                  white-glove shipping logistics, insurance validation, and private artist-collector communications.
                </p>
              </div>
              <div>
                <h3 className="text-foreground font-semibold mb-2">Security Protocols</h3>
                <p>
                  All collector and visitor records are stored securely in encrypted databases. We do not sell or trade collector records. 
                  Contact us at inquiries@eoe-archive.com to request data removal or copies of your information.
                </p>
              </div>
            </div>
          </section>

          {/* Terms & Conditions */}
          <section id="terms" className="scroll-mt-32 border-t border-border/60 pt-16">
            <h2 className="text-editorial-meta mb-6 text-foreground font-semibold">02 — Terms and Conditions</h2>
            <div className="space-y-6">
              <p>
                By accessing this digital archive, you agree to abide by these terms. All content displayed 
                including photographs, painting detail crops, and written stories are the intellectual property of Enifome Ozuwo.
              </p>
              <div>
                <h3 className="text-foreground font-semibold mb-2">Acquisition Contracts</h3>
                <p>
                  Sales are governed by custom contracts of provenance. Full payment is required 
                  before the release of physical canvases and limited-edition prints from the Lagos studio.
                </p>
              </div>
              <div>
                <h3 className="text-foreground font-semibold mb-2">Authorized Use</h3>
                <p>
                  Unauthorized duplication, hotlinking, or commercial use of visual assets from this site is strictly prohibited. 
                  Any editorial or educational reproduction of works featured requires written consent.
                </p>
              </div>
            </div>
          </section>

          {/* Shipping Protocol */}
          <section id="shipping" className="scroll-mt-32 border-t border-border/60 pt-16">
            <h2 className="text-editorial-meta mb-6 text-foreground font-semibold">03 — Shipping & Returns</h2>
            <div className="space-y-6">
              <p>
                Our specialized logistics network ensures museum-quality transport across the globe.
              </p>
              <div>
                <h3 className="text-foreground font-semibold mb-2">Refunds & Returns</h3>
                <p>
                  Due to the unique, one-of-one nature of original canvases and limited-edition prints, 
                  all acquisitions are final. Damage during transit is covered fully by specialized transit insurance protocols, 
                  initiating instant restoration or print replacements where applicable.
                </p>
              </div>
            </div>
          </section>

          {/* Copyright */}
          <section id="copyright" className="scroll-mt-32 border-t border-border/60 pt-16 pb-32">
            <h2 className="text-editorial-meta mb-6 text-foreground font-semibold">04 — Copyright</h2>
            <p>
              © 2026 EOE — Enifome Ozuwo. All rights reserved. The moral rights of the artist have been asserted.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
