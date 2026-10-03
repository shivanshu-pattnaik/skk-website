import { academy, contact, guru, siteUrl } from "./content";

export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: academy.name,
      description: `Odissi dance academy in ${academy.city}, led by Guru ${guru.name}.`,
      inLanguage: "en-IN",
    },
    {
      "@type": ["DanceGroup", "LocalBusiness"],
      "@id": `${siteUrl}/#academy`,
      name: academy.name,
      alternateName: `${academy.discipline}, ${academy.city}`,
      description: `${academy.name} is an Odissi dance academy in ${academy.city}, offering structured classical Odissi training and stage performance opportunities for students.`,
      url: siteUrl,
      image: `${siteUrl}/og-image.jpg`,
      logo: `${siteUrl}/icon.png`,
      email: contact.email,
      telephone: contact.phones.map((phone) => `+91${phone.value.replace(/\D/g, "")}`),
      foundingDate: String(academy.founded),
      address: {
        "@type": "PostalAddress",
        streetAddress: contact.addressLines[0],
        addressLocality: "Puri",
        addressRegion: "Odisha",
        addressCountry: "IN",
      },
      sameAs: [contact.instagramUrl],
      founder: {
        "@type": "Person",
        "@id": `${siteUrl}/#guru`,
        name: guru.name,
        jobTitle: guru.role,
        worksFor: { "@id": `${siteUrl}/#academy` },
      },
      employee: { "@id": `${siteUrl}/#guru` },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: `+91${contact.whatsapp.replace(/\D/g, "")}`,
          contactType: "enquiries",
          areaServed: "IN",
          availableLanguage: ["en", "or", "hi"],
        },
      ],
    },
  ],
} as const;