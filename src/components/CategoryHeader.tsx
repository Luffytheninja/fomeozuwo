interface CategoryHeaderProps {
  title: string;
  description: string;
}

export function CategoryHeader({ title, description }: CategoryHeaderProps) {
  return (
    <section className="mb-32 max-w-4xl animate-fade-up">
      <span className="text-micro text-muted block mb-8 tracking-[0.2em]">{title}</span>
      <h1 className="text-hero mb-12 capitalize">{title}</h1>
      <p className="text-xl text-muted leading-relaxed max-w-2xl">{description}</p>
    </section>
  );
}
