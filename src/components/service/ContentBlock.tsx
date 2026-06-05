import type { ReactNode } from "react";
import { BulletList } from "../ui/BulletList";

interface ContentBlockProps {
  title: string;
  children?: ReactNode;
  items?: string[];
  intro?: string;
}

export function ContentBlock({ title, children, items, intro }: ContentBlockProps) {
  return (
    <div>
      <h2 className="card-title mb-4 text-xl">{title}</h2>
      {intro && (
        <p className="mb-4 leading-relaxed text-muted">{intro}</p>
      )}
      {items && <BulletList items={items} />}
      {children}
    </div>
  );
}
