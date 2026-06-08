interface SectionHeadingProps {
  title: string;
  description?: string;
  eyebrow?: string;
  className?: string;
}

export function SectionHeading({
  title,
  description,
  eyebrow,
  className = "",
}: SectionHeadingProps) {
  return (
    <header className={`mb-10 md:mb-12 max-w-3xl ${className}`}>
      {eyebrow && (
        <p className="section-eyebrow mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-semibold leading-tight text-primary md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <>
          <div className="mt-5 h-px w-12 bg-accent" aria-hidden />
          <p className="text-body mt-5">
            {description}
          </p>
        </>
      )}
    </header>
  );
}
