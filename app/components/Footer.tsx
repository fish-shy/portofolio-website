import { siteConfig } from "../lib/site";

const links = [
  { label: "GitHub", href: siteConfig.socials.github },
  { label: "LinkedIn", href: siteConfig.socials.linkedin },
  { label: "Email", href: `mailto:${siteConfig.email}` },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-tile px-5 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 py-8 text-[12px] md:flex-row md:items-center md:justify-between">
        <p className="text-muted">
          © {currentYear} {siteConfig.name}. Built with Next.js.
        </p>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
          {links.map((link) => {
            const external = link.href.startsWith("http");
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "me noopener noreferrer" : undefined}
                  className="inline-flex min-h-11 items-center text-muted hover:text-ink transition-colors"
                >
                  {link.label}
                  {external && <span className="sr-only"> (opens in a new tab)</span>}
                </a>
              </li>
            );
          })}
          <li>
            <a href="#home" className="inline-flex min-h-11 items-center text-muted hover:text-ink transition-colors">
              Back to top
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
