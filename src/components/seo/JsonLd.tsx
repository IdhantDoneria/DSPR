import { SITE, SERVICES, AWARDS } from "@/lib/data";

/**
 * Structured data (schema.org) for rich results. Rendered server-side in the
 * document <head> region via the layout.
 */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${SITE.url}/#organization`,
        name: SITE.name,
        legalName: SITE.legalName,
        description: SITE.description,
        url: SITE.url,
        email: SITE.email,
        foundingDate: SITE.activeSince,
        founder: {
          "@type": "Person",
          name: SITE.founder,
          jobTitle: "Founder",
        },
        areaServed: "IN",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Mumbai",
          addressRegion: "Maharashtra",
          addressCountry: "IN",
        },
        sameAs: [SITE.social.facebook, SITE.social.instagram],
        knowsAbout: [
          "Public Relations",
          "Digital Marketing",
          "Influencer Marketing",
          "Wedding PR",
          "Performance Marketing",
          "Luxury Brand Storytelling",
          "Hospitality Marketing",
          "Travel Marketing",
        ],
        award: AWARDS.items.map((a) => `${a.title}, ${a.org} (${a.year})`),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services",
          itemListElement: SERVICES.items.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        publisher: { "@id": `${SITE.url}/#organization` },
        inLanguage: "en-IN",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // schema.org payload is static and trusted
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
