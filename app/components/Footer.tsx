import { siteConfig } from "../lib/site";

const links = [
  { label: "GitHub", href: siteConfig.socials.github },
  { label: "LinkedIn", href: siteConfig.socials.linkedin },
  { label: "Email", href: `mailto:${siteConfig.email}` },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-4 sm:px-6 pb-10">
      <div className="max-w-6xl mx-auto border-t border-line pt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted">
          © {currentYear} {siteConfig.name}. Built with Next.js.
        </p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          {links.map((link) => {
            const external = link.href.startsWith("http");
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "me noopener noreferrer" : undefined}
                  className="inline-flex items-center min-h-11 text-ink hover:text-accent transition-colors"
                >
                  {link.label}
                  {external && <span className="sr-only"> (opens in a new tab)</span>}
                </a>
              </li>
            );
          })}
          <li>
            <a href="#home" className="inline-flex items-center min-h-11 text-ink hover:text-accent transition-colors">
              Back to top
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
