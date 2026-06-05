interface BulletListProps {
  items: string[];
  className?: string;
}

export function BulletList({ items, className = "" }: BulletListProps) {
  return (
    <ul className={`space-y-2.5 ${className}`}>
      {items.map((item) => (
        <li key={item} className="text-body flex items-start gap-3">
          <span
            className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent"
            aria-hidden
          />
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}
