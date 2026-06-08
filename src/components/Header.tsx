import { useState } from "react";
import { useScrollToSection } from "../hooks/useScrollToSection";
import { NAV_LINKS, SERVICE_LINKS } from "../lib/navigation";

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
    >
      <path
        d="M2.5 4.5L6 8L9.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const Header: React.FC = () => {
  const { goToSection } = useScrollToSection();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    goToSection(sectionId);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-surface-elevated/85 backdrop-blur-xl">
      <div className="container-site">
        <div className="flex h-20 items-center justify-between gap-4">
          <a
            href="/"
            onClick={(e) => handleNavClick(e, "top")}
            className="group flex min-w-0 items-center gap-3.5"
          >
            <img
              src="/images/logo.jpeg"
              alt=""
              className="h-11 w-11 shrink-0 rounded-xl object-cover ring-1 ring-border"
            />
            <div className="min-w-0 leading-tight">
              <div className="truncate text-base font-semibold text-primary transition-colors group-hover:text-accent md:text-[1.125rem]">
                <span className="md:hidden">Маслянский В. Б.</span>
                <span className="hidden md:inline">
                  Маслянский Вячеслав Борисович
                </span>
              </div>
              <div className="hidden text-sm tracking-wide text-muted sm:block">
                врач-флеболог · Минск
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-[0.9375rem] font-medium text-primary md:flex md:text-base">
            <div className="group relative">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 py-2 transition-colors hover:text-accent"
              >
                Услуги
                <ChevronDown className="transition-transform duration-200 group-hover:rotate-180" />
              </button>

              <div className="invisible absolute right-0 top-full z-10 w-56 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <div className="rounded-[var(--radius-card)] border border-border bg-surface-elevated py-1.5 shadow-[0_8px_30px_rgb(28_42_68/0.08)]">
                  {SERVICE_LINKS.map((link) => (
                    <a
                      key={link.id}
                      href="/"
                      onClick={(e) => handleNavClick(e, link.id)}
                      className="block px-4 py-2.5 text-primary transition-colors hover:bg-surface-muted hover:text-accent"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href="/"
                onClick={(e) => handleNavClick(e, link.id)}
                className="py-2 transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="rounded-lg p-2 text-primary transition-colors hover:bg-surface-muted hover:text-accent md:hidden"
            aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M4 7h16M4 12h16M4 17h16"
                />
              )}
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <nav className="border-t border-border py-5 md:hidden">
            <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-muted">
              Услуги
            </p>
            <div className="mb-4 space-y-0.5">
              {SERVICE_LINKS.map((link) => (
                <a
                  key={link.id}
                  href="/"
                  onClick={(e) => handleNavClick(e, link.id)}
                  className="block rounded-lg px-3 py-2.5 text-primary transition-colors hover:bg-surface-muted hover:text-accent"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href="/"
                onClick={(e) => handleNavClick(e, link.id)}
                className="block rounded-lg px-3 py-2.5 text-primary transition-colors hover:bg-surface-muted hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
