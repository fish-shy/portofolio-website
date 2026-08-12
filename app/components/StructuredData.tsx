import { absoluteUrl, siteConfig, siteUrl } from "../lib/site";

/**
 * schema.org JSON-LD describing the person behind the portfolio.
 *
 * Emitted as a single @graph so Person / WebSite / ProfilePage can cross-
 * reference each other by @id instead of repeating the same data three times.
 */
export default function StructuredData() {
  const personId = `${siteUrl}/#person`;
  const websiteId = `${siteUrl}/#website`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: siteConfig.name,
        url: siteUrl,
        image: absoluteUrl("/assets/images/profile.png"),
        jobTitle: siteConfig.jobTitle,
        description: siteConfig.description,
        email: `mailto:${siteConfig.email}`,
        telephone: siteConfig.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.address.locality,
          addressRegion: siteConfig.address.region,
          addressCountry: siteConfig.address.country,
        },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: siteConfig.university,
        },
        worksFor: {
          "@type": "Organization",
          name: siteConfig.employer,
        },
        knowsAbout: siteConfig.skills,
        knowsLanguage: ["id", "en"],
        sameAs: [siteConfig.socials.github, siteConfig.socials.linkedin],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: `${siteConfig.name} — Portfolio`,
        description: siteConfig.description,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name: `${siteConfig.name} — ${siteConfig.headline}`,
        description: siteConfig.description,
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        mainEntity: { "@id": personId },
        inLanguage: "en",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // `<` is escaped so a stray "</script>" in the data can never close the tag early.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
