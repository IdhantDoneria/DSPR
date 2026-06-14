/**
 * DSPR — Canonical content source.
 *
 * Every word of DSPR's original website content is preserved verbatim here.
 * Presentation is redesigned across the components; the content itself is not
 * rewritten, shortened, or removed.
 */

export const SITE = {
  name: "DSPR",
  legalName: "DSPR",
  title:
    "DSPR — Public Relations | Digital Marketing Agency Mumbai | Influencer Marketing",
  tagline: "Crafting Stories, Driving Results",
  description:
    "DSPR is a boutique public relations and digital marketing agency in Mumbai. Storytellers and strategists shaping brand narratives across PR, social media, influencer marketing, digital, and performance marketing.",
  url: "https://www.dspr.in",
  email: "contact.dspr@gmail.com",
  location: "Mumbai | Maharashtra | India",
  founder: "Digisha Shah",
  activeSince: "2011",
  portfolioSize: "100+",
  social: {
    facebook: "https://www.facebook.com/DSPRIndia/",
    instagram: "https://www.instagram.com/hellodspr/",
  },
} as const;

export type NavItem = { label: string; href: string };

export const NAV_ITEMS: NavItem[] = [
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Media/Press", href: "#media" },
  { label: "Clients", href: "#clients" },
  { label: "Careers", href: "#contact" },
];

/* ------------------------------------------------------------------ */
/* HERO SLIDESHOW                                                      */
/* ------------------------------------------------------------------ */

export type HeroSlide = {
  id: number;
  overlay: string;
  publication: string;
  collaboration: string;
  note: string;
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    overlay: "Recognized across publications",
    publication: "Featured",
    collaboration: "Brides Today",
    note: "Magazine covers / Brides Today",
  },
  {
    id: 2,
    overlay: "Condé Nast Traveler x Cupcake Productions",
    publication: "Condé Nast Traveler",
    collaboration: "Cupcake Productions",
    note: "B&W photography shoot",
  },
  {
    id: 3,
    overlay: "The New York Times x House on the Clouds",
    publication: "The New York Times",
    collaboration: "House on the Clouds",
    note: "B&W lifestyle / travel image",
  },
  {
    id: 4,
    overlay: "Vogue Italia x House on the Clouds",
    publication: "Vogue Italia",
    collaboration: "House on the Clouds",
    note: "Aerial villa / travel photograph",
  },
  {
    id: 5,
    overlay: "Vogue Singapore x Raabta",
    publication: "Vogue Singapore",
    collaboration: "Raabta",
    note: "Wedding couple outdoors",
  },
  {
    id: 6,
    overlay: "Vogue Australia x House on the Clouds",
    publication: "Vogue Australia",
    collaboration: "House on the Clouds",
    note: "Outdoor nature / villa photo",
  },
  {
    id: 7,
    overlay: "Vogue USA x PV Sindhu (RVR Pro)",
    publication: "Vogue USA",
    collaboration: "PV Sindhu — RVR Pro",
    note: "Celebratory event / stage photo",
  },
  {
    id: 8,
    overlay: "Vogue India x Shree Jewellers",
    publication: "Vogue India",
    collaboration: "Shree Jewellers",
    note: "Indian wedding couple close-up",
  },
];

/* ------------------------------------------------------------------ */
/* FEATURED CLIENT STRIP                                               */
/* ------------------------------------------------------------------ */

export const FEATURED_CLIENTS: string[] = [
  "TOPS Mumbai",
  "Raabta by Shrey Bhagat",
  "Leap",
  "Epic Stories",
];

/* ------------------------------------------------------------------ */
/* ABOUT                                                               */
/* ------------------------------------------------------------------ */

export type AboutBlock = { title: string; body: string };

export const ABOUT_INTRO = {
  heading: "About Us",
  blocks: [
    {
      title: "Crafting Stories, Driving Results",
      body: "At DSPR, we are more than a boutique public relations and Digital Marketing Agency – We are Storytellers and Strategists committed to shaping brand narratives and fostering enduring partnerships.",
    },
    {
      title: "Our Approach — A Journey That Covers Every Angle.",
      body: "Our 360-degree holistic approach encompasses Public Relations, Social Media Management, Influencer Marketing, Content Writing, Digital Marketing, Performance Marketing, and Design Services. Each facet harmonizes to cultivate and boost the path to success!",
    },
    {
      title: "Expertise Across Sectors",
      body: "Our team's extensive experience spans a multitude of sectors, including travel, food, hospitality, weddings, lifestyle, luxury, and entertainment. This diverse background equips us with a well-rounded perspective on the dynamic digital landscape.",
    },
    {
      title: "Guided by a Narrative Philosophy",
      body: "Central to our ethos is the art of storytelling. We believe that every brand has a unique story waiting to be told. Under the visionary leadership of Digisha Shah, DSPR weaves these narratives into the fabric of business strategies, enabling clients to make informed decisions that propel growth.",
    },
    {
      title: "Delivering Value Through Investment",
      body: "At DSPR, we're not just about offering services; we're about delivering value. With an unparalleled understanding of the intricate digital realm, we ensure that every client's investment translates into tangible results. It's this commitment that sets us apart.",
    },
  ] as AboutBlock[],
  closing:
    "Join us on a journey of transformation, where stories become strategies and partnerships evolve into success stories.",
};

/* ------------------------------------------------------------------ */
/* FOUNDER                                                             */
/* ------------------------------------------------------------------ */

export const FOUNDER = {
  heading: "Founder: Digisha Shah",
  name: "Digisha Shah",
  blocks: [
    {
      title: "Elevating Your Brand Amidst the Brand Chaos",
      body: "In an era where brands multiply incessantly, Digisha Shah emerges as the beacon that sets your brand apart from the cacophony, infusing it with a bespoke fusion of strategic public relations and targeted services.",
    },
    {
      title: "A Legacy of Brand Distinction",
      body: "Her expertise lies in curating brand identities for the lifestyle and luxury domains, a realm where distinction is paramount. With an illustrious portfolio, she has lent her prowess to renowned names, leaving an indelible mark on the industry.",
    },
    {
      title: "A Journey of Evolution",
      body: "Independently shaping brand narratives since 2011, Digisha Shah's journey was preceded by stints with premier PR agencies. Backed by an extensive PR voyage spanning over 100 brands, she stands at the precipice of new horizons, eager to propel diverse brands to well-deserved recognition.",
    },
    {
      title: "Experience the Unveiling",
      body: "Welcome to a world where brand differentiation isn't just a strategy – it's a passion, a purpose.",
    },
  ] as AboutBlock[],
  stats: [
    { value: "100+", label: "Brands shaped" },
    { value: "2011", label: "Independent since" },
    { value: "13+", label: "Years of expertise" },
  ],
};

/* ------------------------------------------------------------------ */
/* AWARDS                                                              */
/* ------------------------------------------------------------------ */

export type Award = { year: string; title: string; org: string };

export const AWARDS = {
  heading: "Awards and Recognition",
  items: [
    {
      year: "2016",
      title: "30 Under 30 PR Professionals in India",
      org: "PR Moments",
    },
    {
      year: "2019",
      title: "Runner Up — Digital Wedding Campaign",
      org: "Wedding Sutra Influencer Award",
    },
    {
      year: "2022",
      title: "Women Agency Head of the Year",
      org: "AdGully",
    },
  ] as Award[],
};

/* ------------------------------------------------------------------ */
/* TEAM                                                                */
/* ------------------------------------------------------------------ */

export const TEAM = {
  heading: "The Team",
  body: "DSPR is reinforced by a powerful team of professionals with strong experience and understanding of the public relations and digital media industry. These talented minds will not only help your business find digital solutions but also aid it to grow exponentially.",
};

/* ------------------------------------------------------------------ */
/* SERVICES                                                            */
/* ------------------------------------------------------------------ */

export type Service = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  items: string[];
};

export const SERVICES = {
  label: "Our Services",
  heading: "Our Services",
  items: [
    {
      id: "public-relations",
      index: "01",
      title: "Public Relations",
      tagline: "Earning attention worth keeping.",
      items: [
        "PR Consultation",
        "Media Management",
        "Product Launches",
        "Advertisements",
        "Fam Trips",
        "Brand Building",
        "Image Management",
      ],
    },
    {
      id: "social-media",
      index: "02",
      title: "Social Media",
      tagline: "A feed that feels considered.",
      items: [
        "Social Media Management",
        "Content Curation",
        "Design Management",
        "Page Optimisation",
        "Grid Styling",
        "Content Strategy",
        "Product Photography",
      ],
    },
    {
      id: "wedding-pr",
      index: "03",
      title: "Wedding PR",
      tagline: "Celebrations, beautifully amplified.",
      items: [
        "Website Traffic",
        "Customer Acquisition",
        "Brand Awareness",
        "Re-marketing",
        "Lead Generation",
        "Generate Interactions",
        "Increase App Installs",
        "Conversions",
      ],
    },
    {
      id: "yours-truly",
      index: "04",
      title: "Yours Truly",
      tagline: "Digital marketing & branded content.",
      items: [
        "Collaborations",
        "Strategic Partnerships",
        "Campaign Launch",
        "Brand Research",
        "Content Curation",
        "Community Marketing",
        "Micro Targeting",
      ],
    },
    {
      id: "influencer-marketing",
      index: "05",
      title: "Influencer Marketing",
      tagline: "The right voices, perfectly placed.",
      items: [
        "Creator Identification",
        "Influencer Outreach",
        "Campaign Execution",
        "Brand Collaborations",
        "Content Coordination",
        "Performance Tracking",
        "Relationship Management",
      ],
    },
    {
      id: "performance-marketing",
      index: "06",
      title: "Performance Marketing",
      tagline: "Measurable growth, every rupee accountable.",
      items: [
        "Meta & Google Ads",
        "Campaign Planning",
        "Audience Targeting",
        "Lead Generation",
        "Conversion Optimisation",
        "Retargeting Campaigns",
        "Performance Analysis",
      ],
    },
  ] as Service[],
};

/* ------------------------------------------------------------------ */
/* CLIENTS                                                             */
/* ------------------------------------------------------------------ */

export type ClientCategory = { name: string; clients: string[] };

export const CLIENTS = {
  heading: "Our Clients",
  categories: [
    {
      name: "Weddings",
      clients: [
        "Cupcake Productions",
        "DWP — Destination Wedding Planner",
        "House on the Clouds",
        "Untitled design 8",
        "Raabta by Shrey Bhagat",
        "Wed Me Good",
        "Untitled design 7",
        "ESL",
        "Aroosi",
        "Three Entertainment",
        "RVR Pro",
        "Shreem",
        "M & S — Morani & Soorma",
        "IMG_2958",
        "Epic Stories",
        "Itchha",
        "DJ AJ",
        "Tamarind Global",
        "Eventcasa",
      ],
    },
    {
      name: "Lifestyle, Travel & Hospitality",
      clients: [
        "MDF",
        "SaffronStays",
        "Della",
        "Artboard 1",
        "Hotel Marine Plaza",
        "Provenance",
        "Accessorize",
        "Mary Cohr",
        "Elle",
        "Dole",
        "Bollywood Music Project",
        "Foam Home",
        "TBLC",
        "oardefault",
        "images",
      ],
    },
    {
      name: "Food & Beverage",
      clients: [
        "Untitled design",
        "Pepito",
        "Santé",
        "Cremeitalia",
        "Plantaway",
        "Napoli by Shatranj",
        "NYBC",
        "Copper Chimney",
        "Brooklyn Creamery",
        "Seeds of Life",
        "Coppetto",
        "Gallops",
        "1441 Pizzeria",
        "Pritam",
        "Millo",
        "Untitled design 2",
        "182766337",
        "image_2025-11-22",
      ],
    },
    {
      name: "Kids & Parenting",
      clients: [
        "Muso",
        "Leap Gymnastics",
        "Untitled design 1",
        "Panchhi",
        "Untitled design 6",
      ],
    },
  ] as ClientCategory[],
};

/* ------------------------------------------------------------------ */
/* MEDIA / PRESS                                                       */
/* ------------------------------------------------------------------ */

export type Publication = { name: string; collaboration: string };

export const MEDIA = {
  label: "Media / Press",
  heading: "As Featured In",
  intro:
    "Publications and media houses DSPR's clients have been featured in.",
  publications: [
    { name: "Condé Nast Traveler", collaboration: "Cupcake Productions" },
    { name: "The New York Times", collaboration: "House on the Clouds" },
    { name: "Vogue Italia", collaboration: "House on the Clouds" },
    { name: "Vogue Singapore", collaboration: "Raabta" },
    { name: "Vogue Australia", collaboration: "House on the Clouds" },
    { name: "Vogue USA", collaboration: "PV Sindhu / RVR Pro" },
    { name: "Vogue India", collaboration: "Shree Jewellers" },
  ] as Publication[],
};

/* ------------------------------------------------------------------ */
/* CONTACT                                                             */
/* ------------------------------------------------------------------ */

export const CONTACT = {
  heading: "Get in touch",
  intro:
    "Tell us about your brand. We'll reply from our Mumbai studio with the story we'd tell about you.",
  fields: {
    name: { label: "Name", required: true },
    email: { label: "Email", required: true },
    subject: { label: "Subject", required: false },
    business: { label: "Business Name", required: false },
  },
  writeToUs: SITE.email,
  location: SITE.location,
};
