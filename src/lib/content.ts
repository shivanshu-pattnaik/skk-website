export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const academy = {
  name: "Sukumari Kalakendra",
  discipline: "Odissi Dance Academy",
  descriptor: "Odissi Dance Academy · Puri, Odisha",
  city: "Puri, Odisha",
  founded: 2025,
  logoAlt: "Sukumari Kalakendra emblem",
} as const;

export const guru = {
  name: "Itishree Pattnaik",
  role: "Guru & Founder-Director",
} as const;

export const contact = {
  addressLines: ["153, Khakimatha Nuasahi", "Puri, Odisha"],
  addressDisplay: "153, Khakimatha Nuasahi, Puri, Odisha",
  phones: [
    { label: "Phone", value: "9040845830" },
    { label: "Phone", value: "7750013232" },
  ],
  whatsapp: "9040845830",
  email: "sukumarikalakendra@gmail.com",
  instagram: "sukumari_kalakendra",
  instagramUrl: "https://www.instagram.com/sukumari_kalakendra/",
} as const;

export const whatsappUrl = `https://wa.me/91${contact.whatsapp.replace(/\D/g, "")}`;
export const telUrl = `tel:+91${contact.phones[0].value.replace(/\D/g, "")}`;
export const instagramUrl = contact.instagramUrl;

export const nav = [
  { href: "#about", label: "About" },
  { href: "#guru", label: "The Guru" },
  { href: "#events", label: "Events" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
] as const;

export const about = {
  eyebrow: "The Academy",
  title: "A living tradition, taught with patience",
  lead: `Sukumari Kalakendra is an Odissi dance academy in Puri — the temple city where this classical form has been nurtured for centuries. Established in ${academy.founded}, the academy offers structured training in Odissi for students beginning their journey in the dance.`,
  paragraphs: [
    "Classes move steadily from the fundamentals — chauka and tribhangi, the two foundational postures of Odissi — through hand gestures, eye movements and footwork, into abhinaya, the expressive storytelling at the heart of the form.",
    "Students are prepared to perform, not merely to practise. Stage exposure, costume discipline and ensemble timing are built into the training from the earliest years, so that a performance on the day feels like a natural extension of the rehearsal room.",
  ],
  altPrimary: "Two young Odissi dancers in a studio, one kneeling and one standing with hands joined",
  altSecondary: "Two dancers in green, yellow and red costume holding a paired Odissi pose",
  pillars: [
    {
      title: "Foundations",
      body: "Posture, rhythm and alignment taught slowly and correctly, so that technique is never unlearned later.",
    },
    {
      title: "Abhinaya",
      body: "Expression and interpretation of poetry — the storytelling that turns movement into meaning.",
    },
    {
      title: "Stagecraft",
      body: "Ensemble discipline, costume and presence, developed through regular public performance.",
    },
  ],
} as const;

export const guruSection = {
  eyebrow: "The Guru",
  title: "Itishree Pattnaik",
  lead: "Guru & Founder-Director of Sukumari Kalakendra",
  paragraphs: [
    "Itishree Pattnaik founded Sukumari Kalakendra to give students in Puri a rigorous, unhurried grounding in Odissi — a form that rewards discipline far more than it rewards haste.",
    "Her teaching is built around close personal correction: posture adjusted by hand, a gesture repeated until it is right, and a piece taken apart line by line until a student understands what they are dancing rather than only what they are doing.",
    "Under her direction the academy's dancers have performed at festivals in Puri and elsewhere in Odisha, and have represented the academy on stage alongside senior practitioners of the form.",
  ],
  quote: "Odissi is learned in the details — in the line of a finger, the lift of the chin, the stillness before the movement begins.",
} as const;

export const events = {
  eyebrow: "Events & Achievements",
  title: "On stage, and recognised for it",
  lead: "A selection of performances, festivals and honours from the academy's recent seasons.",
  items: [
    {
      title: "International Performing Arts Festival",
      place: "Puri, 2024",
      body: "Ensemble performances presented at the International Performing Arts Festival in Puri, alongside artists and academies from across the country.",
      imageId: "ipaf-group",
    },
    {
      title: "National-Level Cultural Festival",
      place: "Odisha, 2024",
      body: "The troupe took part in a national-level cultural festival organised with rural marketing and cultural bodies in Odisha, performing before a full house.",
      imageId: "group-award",
    },
    {
      title: "Mementoes & Recognition",
      place: "On stage",
      body: "Performances acknowledged with mementoes presented to the academy and its dancers at festival venues.",
      imageId: "award-memento",
    },
    {
      title: "Full-Troupe Showcases",
      place: "Regular seasons",
      body: "Large-ensemble productions staged across the year, giving every student — from the youngest to the senior dancers — a place on stage.",
      imageId: "stage-nine",
    },
  ],
} as const;

export const gallery = {
  eyebrow: "Gallery",
  title: "Performances, portraits and the ensemble",
  lead: "Photographs from rehearsals, portraits and stage seasons.",
} as const;

export const contactSection = {
  eyebrow: "Contact",
  title: "Enquire about joining",
  lead: "For class enquiries, performances or collaborations, reach the academy directly or send a note below.",
} as const;
