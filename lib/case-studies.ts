import type { Item } from "@/lib/services";

export type GalleryKind = "ads" | "search" | "store" | "analytics" | "funnel" | "leads" | "email" | "mobile";

export type CaseStudy = {
  slug: string;
  client: string;
  monogram: string;
  category: string;
  industry: string;
  featured?: boolean;
  headline: string;
  summary: string;
  services: string[];
  channels: string[];
  seo: { title: string; description: string };
  overview: string[];
  challenge: { intro: string; points: string[] };
  strategy: { intro: string; points: Item[] };
  execution: Item[];
  results: { metrics: { value: string; label: string }[]; highlights: string[] };
  gallery: { kind: GalleryKind; caption: string }[];
  learnings: Item[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "gul-khan",
    client: "Gul Khan Truck Art Corporate",
    monogram: "GK",
    category: "Corporate Growth",
    industry: "Corporate Gifting",
    featured: true,
    headline: "Building a multi-channel B2B acquisition system for corporate gifting",
    summary:
      "A coordinated Meta Ads, Google Ads, SEO and email programme built to put a heritage truck art brand in front of corporate buyers and turn interest into high-value gifting orders.",
    services: ["meta-ads", "google-ads", "seo", "analytics-tracking"],
    channels: ["Meta Ads", "Google Ads", "SEO", "Email Marketing"],
    seo: {
      title: "Gul Khan Truck Art Corporate Case Study | B2B Lead Generation",
      description:
        "How Umer Iftikhar built a multi-channel B2B acquisition system for Gul Khan Truck Art Corporate using Meta Ads, Google Ads, SEO and email marketing.",
    },
    overview: [
      "Gul Khan Truck Art is known for bringing Pakistan's iconic truck art tradition to modern products. Its corporate division creates customised gifts for companies: branded, culturally distinctive pieces for clients, employees and events.",
      "Corporate gifting is a high-value, relationship-driven sale. Buyers are procurement teams, HR managers and marketing leads who compare suppliers, request quotes and order in volume. The brand needed a digital system that could reach these decision-makers consistently, not just consumers scrolling social media.",
    ],
    challenge: {
      intro:
        "The corporate offer had strong product appeal but no dedicated acquisition engine. Most visibility came from the consumer side of the brand, which attracts a very different audience.",
      points: [
        "Reach corporate decision-makers, not individual consumers, on platforms built for mass audiences.",
        "Capture companies actively searching for gifting suppliers at the moment they need a vendor.",
        "Build organic visibility for corporate gifting searches to reduce long-term reliance on paid media.",
        "Nurture longer B2B buying cycles, where enquiries can take weeks to turn into orders.",
      ],
    },
    strategy: {
      intro:
        "Rather than running channels in isolation, I designed each one to play a specific role in the corporate buyer's journey, from discovery to enquiry to repeat orders.",
      points: [
        { title: "Meta Ads for demand creation", text: "Showcase the distinctive product range to professional audiences and seasonal gifting moments, building awareness and retargeting pools." },
        { title: "Google Ads for demand capture", text: "Target high-intent searches for corporate and customised gifts so the brand appears when companies are actively sourcing suppliers." },
        { title: "SEO for compounding visibility", text: "Optimise pages around corporate gifting keywords so organic search delivers enquiries without paying for every click." },
        { title: "Email for nurturing and retention", text: "Keep the brand top-of-mind through long decision cycles and bring past corporate clients back for new occasions." },
      ],
    },
    execution: [
      { title: "Audience & offer definition", text: "Mapped corporate buyer personas, key gifting seasons and the products most suited to bulk orders." },
      { title: "Tracking foundation", text: "Configured conversion tracking for enquiries and quote requests so every channel was measured against real business actions." },
      { title: "Paid campaign build", text: "Launched Meta campaigns for awareness and retargeting, and Google Search campaigns targeting corporate gifting intent." },
      { title: "SEO optimisation", text: "Improved on-page structure, metadata and content around corporate gifting search terms." },
      { title: "Email programme", text: "Created email campaigns to nurture enquiries and re-engage previous corporate clients ahead of gifting seasons." },
      { title: "Ongoing optimisation", text: "Reviewed performance across channels, reallocated budget toward what produced enquiries, and refined targeting and messaging." },
    ],
    results: {
      metrics: [
        { value: "4", label: "Integrated acquisition channels" },
        { value: "B2B", label: "Lead generation focus" },
        { value: "Always-on", label: "Corporate marketing system" },
      ],
      highlights: [
        "Established a dedicated digital acquisition system for the corporate gifting division.",
        "Improved brand visibility among corporate buyers across social, search and email.",
        "Captured high-intent demand from companies actively searching for gifting suppliers.",
        "Created a scalable framework the brand can grow into new seasons and markets.",
      ],
    },
    gallery: [
      { kind: "ads", caption: "Meta campaign structure for awareness and retargeting" },
      { kind: "search", caption: "Google Search targeting corporate gifting intent" },
      { kind: "email", caption: "Email nurture sequence for corporate buyers" },
      { kind: "analytics", caption: "Cross-channel enquiry tracking" },
    ],
    learnings: [
      { title: "B2B needs every channel working together", text: "Corporate buyers discover, research and decide over time. Social, search and email each covered a different stage of that journey." },
      { title: "Track enquiries, not clicks", text: "Measuring quote requests and enquiries kept optimisation focused on business value rather than traffic volume." },
      { title: "Seasonality drives planning", text: "Gifting demand peaks around festivals and year-end, so campaigns and emails were planned ahead of those windows." },
    ],
  },
  {
    slug: "gulkhan-pk",
    client: "GulKhan.pk",
    monogram: "GP",
    category: "Ecommerce Growth",
    industry: "Truck Art Ecommerce",
    headline: "Migrating a truck art ecommerce brand from WordPress to Shopify without losing search visibility",
    summary:
      "A full platform migration from WordPress to Shopify that protected hard-earned SEO rankings while giving the brand a faster, more reliable foundation for ecommerce growth.",
    services: ["shopify-development", "seo", "conversion-optimization"],
    channels: ["Shopify", "SEO", "Ecommerce"],
    seo: {
      title: "GulKhan.pk Case Study | WordPress to Shopify Migration Without SEO Loss",
      description:
        "How GulKhan.pk migrated from WordPress to Shopify while protecting SEO rankings and building a faster, conversion-ready ecommerce store.",
    },
    overview: [
      "GulKhan.pk is the online store for Gul Khan's truck art products, bringing hand-painted, culturally iconic designs to customers across Pakistan and beyond.",
      "The store had built organic search visibility on WordPress over time, but the platform was becoming harder to manage as the catalogue and order volume grew. The brand needed a more robust ecommerce platform without sacrificing the traffic it had already earned.",
    ],
    challenge: {
      intro:
        "Platform migrations are one of the riskiest moments in a website's life. Done carelessly, they can erase years of rankings overnight.",
      points: [
        "Move the full product catalogue and store content from WordPress to Shopify.",
        "Preserve existing Google rankings and organic traffic through the migration.",
        "Improve speed, reliability and the shopping experience on mobile.",
        "Keep the store ready for marketing campaigns with accurate tracking after launch.",
      ],
    },
    strategy: {
      intro:
        "I treated the migration as an SEO project first and a design project second. Every ranking page had a destination before anything moved.",
      points: [
        { title: "URL mapping", text: "Inventory every indexed URL and map it to its new Shopify equivalent before launch." },
        { title: "301 redirects", text: "Permanent redirects from old URLs to new ones to transfer ranking signals and avoid broken links." },
        { title: "Metadata preservation", text: "Carry over titles, descriptions, headings and content that were already performing." },
        { title: "Shopping experience upgrade", text: "Use the move to improve product pages, navigation and mobile checkout." },
      ],
    },
    execution: [
      { title: "Pre-migration audit", text: "Crawled the WordPress site and documented URLs, metadata and top organic landing pages." },
      { title: "Store build", text: "Set up the Shopify store, theme, collections and product structure for the catalogue." },
      { title: "Content & product migration", text: "Migrated products, images, descriptions and key content to Shopify." },
      { title: "Redirect implementation", text: "Implemented 301 redirects for mapped URLs so search engines and visitors reached the right pages." },
      { title: "Launch & monitoring", text: "Launched, submitted the new sitemap and monitored indexing and rankings to catch issues early." },
    ],
    results: {
      metrics: [
        { value: "WP → Shopify", label: "Platform migration completed" },
        { value: "301", label: "Redirect map protecting rankings" },
        { value: "Mobile-first", label: "Shopping experience" },
      ],
      highlights: [
        "Completed the move from WordPress to Shopify while maintaining SEO rankings.",
        "Improved ecommerce performance with a faster, more reliable storefront.",
        "Created a stronger foundation for paid campaigns and future growth.",
        "Made the store easier for the team to manage day to day.",
      ],
    },
    gallery: [
      { kind: "store", caption: "Shopify storefront and collection structure" },
      { kind: "search", caption: "Organic visibility maintained after migration" },
      { kind: "mobile", caption: "Mobile-first product and checkout experience" },
      { kind: "analytics", caption: "Post-launch indexing and traffic monitoring" },
    ],
    learnings: [
      { title: "Map before you move", text: "A complete URL inventory and redirect plan is the single most important step in any migration." },
      { title: "Migrations are a chance to improve", text: "Rebuilding on a new platform is the ideal moment to fix navigation, speed and product page structure." },
      { title: "Monitor after launch", text: "Watching Search Console closely in the weeks after launch lets you fix issues before they affect rankings." },
    ],
  },
  {
    slug: "petsinn",
    client: "PetsInn",
    monogram: "PI",
    category: "Pet Ecommerce Growth",
    industry: "Pet Food & Supplies",
    headline: "Launching a pet food brand online with a complete ecommerce growth system",
    summary:
      "A Shopify store, Meta Ads programme and SEO strategy built together to give a pet food brand a professional online presence and a scalable way to acquire customers.",
    services: ["shopify-development", "meta-ads", "seo"],
    channels: ["Shopify", "Meta Ads", "SEO"],
    seo: {
      title: "PetsInn Case Study | Shopify Store, Meta Ads & SEO for Pet Ecommerce",
      description:
        "How PetsInn built its online presence with a Shopify store, Meta Ads campaigns and SEO strategy designed for scalable pet ecommerce growth.",
    },
    overview: [
      "PetsInn is a pet food and supplies brand serving pet owners who want quality nutrition and care products for their animals.",
      "Pet products are a repeat-purchase category with emotionally engaged customers, an ideal fit for ecommerce. But the brand was starting from a limited online presence and needed the full stack: a store, a way to attract customers and long-term search visibility.",
    ],
    challenge: {
      intro: "PetsInn needed to go from minimal digital presence to a functioning online sales channel.",
      points: [
        "Build a trustworthy online store that makes it easy to browse and reorder pet products.",
        "Reach pet owners who are likely to buy and come back for repeat purchases.",
        "Create organic visibility for pet food searches to lower long-term acquisition costs.",
        "Connect store, ads and analytics so growth could be measured and scaled.",
      ],
    },
    strategy: {
      intro: "I built the store, paid acquisition and SEO as one connected system rather than three separate projects.",
      points: [
        { title: "Conversion-ready Shopify store", text: "Clear categories, detailed product information and a smooth mobile checkout for busy pet owners." },
        { title: "Meta Ads for acquisition", text: "Visual campaigns that reach pet owners on Facebook and Instagram, with retargeting for store visitors." },
        { title: "SEO for long-term traffic", text: "Optimise product and collection pages for the searches pet owners use when shopping." },
        { title: "Integrated tracking", text: "Pixel and analytics connected to the store so ad spend could be tied to purchases." },
      ],
    },
    execution: [
      { title: "Store development", text: "Built the Shopify store with a clean structure for product categories and pet types." },
      { title: "Product optimisation", text: "Wrote and structured product pages with the information pet owners need to buy with confidence." },
      { title: "Tracking setup", text: "Installed Meta Pixel and analytics to measure visits, add-to-carts and purchases." },
      { title: "Campaign launch", text: "Launched Meta Ads targeting pet owner audiences, plus retargeting for engaged visitors." },
      { title: "SEO implementation", text: "Optimised metadata, collections and on-page content for pet product search terms." },
    ],
    results: {
      metrics: [
        { value: "3", label: "Growth channels integrated" },
        { value: "0 → 1", label: "Online sales channel launched" },
        { value: "Full-funnel", label: "Acquisition system" },
      ],
      highlights: [
        "Established a complete ecommerce growth system from store to acquisition.",
        "Built a professional online presence for the brand.",
        "Created a paid acquisition engine to reach pet owners on social media.",
        "Laid the SEO foundation for compounding organic traffic.",
      ],
    },
    gallery: [
      { kind: "store", caption: "Shopify store built around pet categories" },
      { kind: "ads", caption: "Meta Ads creative for pet owner audiences" },
      { kind: "search", caption: "Product and collection SEO" },
      { kind: "funnel", caption: "Prospecting and retargeting funnel" },
    ],
    learnings: [
      { title: "Build the whole system at once", text: "Launching store, ads and SEO together meant every visitor landed on a store ready to convert and every sale was tracked." },
      { title: "Repeat purchase is the real prize", text: "Pet food is bought again and again, so the store and campaigns were designed with retention in mind." },
      { title: "Visual products suit Meta", text: "Pets and their owners make engaging creative, a natural fit for Facebook and Instagram." },
    ],
  },
  {
    slug: "building-block",
    client: "Building Block Junior & High",
    monogram: "BB",
    category: "Education Lead Generation",
    industry: "Education",
    headline: "Generating local admission enquiries for a school with targeted Meta Ads",
    summary:
      "Hyper-local Meta Ads campaigns designed to reach parents in the school's catchment area during admission season and turn interest into qualified admission enquiries.",
    services: ["meta-ads", "ai-automation"],
    channels: ["Meta Ads", "Lead Generation", "Local Marketing"],
    seo: {
      title: "Building Block Junior & High Case Study | School Admission Lead Generation",
      description:
        "How targeted local Meta Ads campaigns generated admission enquiries for Building Block Junior & High School from parents in nearby areas.",
    },
    overview: [
      "Building Block Junior & High is a school serving families in its local community, offering junior and high school education.",
      "For schools, marketing is intensely local and highly seasonal. The right audience is parents of school-age children within realistic commuting distance, and the window that matters most is admission season.",
    ],
    challenge: {
      intro: "The school needed a reliable way to generate admission enquiries from the right families, not just general awareness.",
      points: [
        "Reach parents with school-age children living within the school's catchment area.",
        "Generate genuine admission enquiries rather than likes and page follows.",
        "Make the most of a limited admission season with focused budget.",
        "Make it easy for interested parents to take the next step.",
      ],
    },
    strategy: {
      intro: "I built a local lead generation system on Meta, focused on the families most likely to enrol.",
      points: [
        { title: "Radius-based targeting", text: "Campaigns limited to nearby areas so every impression reached realistic prospects." },
        { title: "Parent-focused messaging", text: "Creative highlighting what matters to parents: quality of education, facilities and admission information." },
        { title: "Low-friction lead capture", text: "Lead forms and direct messaging so parents could enquire in a few taps." },
        { title: "Season-aligned budgeting", text: "Budget concentrated around admission periods when parents are actively deciding." },
      ],
    },
    execution: [
      { title: "Audience definition", text: "Defined geographic radius and parent audience profiles around the school." },
      { title: "Creative & copy", text: "Produced ad creative and copy focused on admissions and the school's strengths." },
      { title: "Lead capture setup", text: "Configured lead forms and messaging so enquiries reached the school quickly." },
      { title: "Campaign management", text: "Launched and monitored campaigns, refining targeting and creative based on enquiry quality." },
    ],
    results: {
      metrics: [
        { value: "Local", label: "Radius-targeted campaigns" },
        { value: "Admissions", label: "Enquiry-focused objective" },
        { value: "Seasonal", label: "Budget aligned to intake" },
      ],
      highlights: [
        "Generated targeted admission leads from parents in nearby areas.",
        "Focused budget on families within realistic commuting distance.",
        "Created a repeatable campaign framework for future admission seasons.",
      ],
    },
    gallery: [
      { kind: "ads", caption: "Admission campaign creative for local parents" },
      { kind: "leads", caption: "Lead form capturing parent enquiries" },
      { kind: "mobile", caption: "Mobile-first enquiry experience" },
    ],
    learnings: [
      { title: "Local means local", text: "Tight geographic targeting kept budget focused on families who could realistically enrol." },
      { title: "Timing is everything", text: "Concentrating spend around admission season produced far more value than spreading it across the year." },
      { title: "Speed of follow-up matters", text: "Parents compare schools quickly. Fast responses to enquiries help convert interest into visits." },
    ],
  },
  {
    slug: "sputnik",
    client: "Sputnik",
    monogram: "SP",
    category: "Ecommerce Development",
    industry: "Footwear",
    headline: "Building a Shopify store for a Pakistani footwear brand",
    summary:
      "A Shopify ecommerce store designed to showcase a footwear range clearly, help customers find the right size and style, and make buying online simple.",
    services: ["shopify-development", "conversion-optimization"],
    channels: ["Shopify", "Ecommerce Development"],
    seo: {
      title: "Sputnik Case Study | Shopify Store for a Pakistani Footwear Brand",
      description:
        "How Sputnik, a Pakistani footwear brand, launched a conversion-focused Shopify store with clear product presentation and a smooth mobile shopping experience.",
    },
    overview: [
      "Sputnik is a Pakistani footwear brand offering a range of styles for everyday customers.",
      "Footwear is a category where presentation and sizing confidence drive sales. Customers want to see styles clearly, understand sizing and trust delivery and exchanges before they buy online.",
    ],
    challenge: {
      intro: "Sputnik needed an online store that could sell footwear as effectively as a physical shop.",
      points: [
        "Present a range of styles and sizes in a way that's easy to browse.",
        "Give customers confidence about sizing, delivery and exchanges.",
        "Deliver a fast, smooth experience on mobile, where most shoppers browse.",
      ],
    },
    strategy: {
      intro: "I focused the store on clarity and confidence, the two things that make people comfortable buying shoes online.",
      points: [
        { title: "Clear catalogue structure", text: "Collections organised by style and category so customers find what they want quickly." },
        { title: "Confidence-building product pages", text: "Clean imagery, size information and key policies visible on every product." },
        { title: "Mobile-first experience", text: "Navigation, product pages and checkout optimised for phones." },
      ],
    },
    execution: [
      { title: "Store setup", text: "Configured Shopify, theme and brand styling." },
      { title: "Catalogue build", text: "Structured collections, variants and sizes for the footwear range." },
      { title: "Product pages", text: "Built product pages with clear imagery, sizing and policy information." },
      { title: "Launch", text: "Tested the full purchase path on mobile and desktop before launch." },
    ],
    results: {
      metrics: [
        { value: "Shopify", label: "Ecommerce store launched" },
        { value: "Mobile-first", label: "Shopping experience" },
        { value: "Size-ready", label: "Variant-driven catalogue" },
      ],
      highlights: [
        "Launched a Shopify ecommerce store for the brand.",
        "Created a strong online shopping experience for footwear customers.",
        "Built a foundation ready for paid campaigns and growth.",
      ],
    },
    gallery: [
      { kind: "store", caption: "Footwear collections and product grid" },
      { kind: "mobile", caption: "Mobile product page with size selection" },
      { kind: "funnel", caption: "Streamlined path from browse to checkout" },
    ],
    learnings: [
      { title: "Confidence sells footwear", text: "Clear sizing and policies remove the biggest hesitation in buying shoes online." },
      { title: "Structure beats decoration", text: "A well-organised catalogue matters more than visual flourishes for conversion." },
    ],
  },
  {
    slug: "khatkaar",
    client: "Khatkaar",
    monogram: "KH",
    category: "Ecommerce & Performance",
    industry: "Urdu Calligraphy",
    headline: "Selling Urdu calligraphy online with Shopify and performance-driven Meta Ads",
    summary:
      "A Shopify store and Meta Ads programme that brought a niche Urdu calligraphy brand to a wider audience and turned cultural appreciation into online sales.",
    services: ["shopify-development", "meta-ads"],
    channels: ["Shopify", "Meta Ads", "Ecommerce"],
    seo: {
      title: "Khatkaar Case Study | Shopify & Meta Ads for an Urdu Calligraphy Brand",
      description:
        "How Khatkaar, an Urdu calligraphy brand, sells online with a Shopify store and performance-driven Meta advertising campaigns.",
    },
    overview: [
      "Khatkaar creates Urdu calligraphy products, art rooted in a rich cultural and literary tradition.",
      "Niche, culturally meaningful products have passionate audiences, but those audiences need to be found. The brand needed both a place to sell and a way to reach the people who would value its work.",
    ],
    challenge: {
      intro: "Khatkaar needed to turn a distinctive craft into a scalable online business.",
      points: [
        "Build an online store that presents calligraphy art beautifully and sells it simply.",
        "Find and reach audiences who appreciate Urdu calligraphy and cultural art.",
        "Turn social engagement into actual purchases.",
      ],
    },
    strategy: {
      intro: "I paired a clean, art-focused Shopify store with Meta campaigns built to find and convert the brand's natural audience.",
      points: [
        { title: "Art-first store design", text: "A minimal storefront that lets the calligraphy take centre stage." },
        { title: "Interest-based Meta targeting", text: "Audiences built around art, culture, literature and home decor interests." },
        { title: "Performance-focused campaigns", text: "Campaigns optimised for purchases, not just engagement, with retargeting for engaged visitors." },
      ],
    },
    execution: [
      { title: "Store build", text: "Created the Shopify store, product catalogue and brand styling." },
      { title: "Tracking", text: "Installed Meta Pixel to track product views, add-to-carts and purchases." },
      { title: "Campaign launch", text: "Launched Meta Ads to prospect for art and culture audiences and retarget visitors." },
      { title: "Optimisation", text: "Refined creative and audiences based on which products and messages drove sales." },
    ],
    results: {
      metrics: [
        { value: "Shopify", label: "Online store launched" },
        { value: "Meta", label: "Performance campaigns" },
        { value: "Niche", label: "Audience discovery" },
      ],
      highlights: [
        "Launched a Shopify store for the brand's calligraphy products.",
        "Helped the brand sell products through performance-driven Meta advertising.",
        "Reached new audiences who value Urdu calligraphy and cultural art.",
      ],
    },
    gallery: [
      { kind: "store", caption: "Art-first Shopify storefront" },
      { kind: "ads", caption: "Meta creative for art and culture audiences" },
      { kind: "analytics", caption: "Purchase tracking with Meta Pixel" },
    ],
    learnings: [
      { title: "Niche audiences are findable", text: "Interest-based targeting on Meta is powerful for culturally specific products." },
      { title: "Let the product lead", text: "For art, the storefront should step back and let the work sell itself." },
    ],
  },
  {
    slug: "decordreams",
    client: "Decordreams",
    monogram: "DD",
    category: "Web & Lead Generation",
    industry: "Furniture & Interior",
    headline: "A WordPress website and ad campaigns to attract furniture buyers",
    summary:
      "A WordPress website and digital advertising programme built to showcase furniture and interior products and bring qualified buyers to the brand.",
    services: ["web-development", "meta-ads", "conversion-optimization"],
    channels: ["WordPress", "Meta Ads", "Lead Generation"],
    seo: {
      title: "Decordreams Case Study | WordPress Website & Ads for a Furniture Brand",
      description:
        "How Decordreams, a furniture and interior brand, attracts buyers with a WordPress website and targeted digital advertising campaigns.",
    },
    overview: [
      "Decordreams is a furniture and interior brand helping customers furnish and style their homes.",
      "Furniture is a considered purchase. Buyers browse, compare and often want to speak with someone before committing, so the digital journey needs to inspire and then make enquiring easy.",
    ],
    challenge: {
      intro: "Decordreams needed a digital presence that could attract furniture buyers and move them toward a purchase conversation.",
      points: [
        "Showcase furniture and interior products in an inspiring, professional way.",
        "Attract buyers who are actively furnishing or redesigning their spaces.",
        "Make it simple for interested customers to enquire.",
      ],
    },
    strategy: {
      intro: "I built a website to inspire and convert, then used paid social to bring the right buyers to it.",
      points: [
        { title: "Inspiration-led website", text: "A WordPress site presenting products and room ideas with clear paths to enquire." },
        { title: "Targeted advertising", text: "Meta campaigns reaching homeowners and people interested in interior design and furniture." },
        { title: "Lead capture", text: "Enquiry forms and direct contact options placed throughout the site." },
      ],
    },
    execution: [
      { title: "Website build", text: "Designed and developed the WordPress website with product showcases and enquiry paths." },
      { title: "Tracking", text: "Set up analytics and Pixel tracking for enquiries and key actions." },
      { title: "Campaigns", text: "Launched Meta Ads targeting furniture and interior buyers, with retargeting." },
      { title: "Optimisation", text: "Adjusted creative, audiences and landing pages based on enquiry performance." },
    ],
    results: {
      metrics: [
        { value: "WordPress", label: "Website launched" },
        { value: "Meta", label: "Buyer acquisition campaigns" },
        { value: "Enquiry-led", label: "Conversion path" },
      ],
      highlights: [
        "Created a professional WordPress website for the brand.",
        "Managed digital advertising campaigns to attract furniture buyers.",
        "Built clear enquiry paths to turn interest into sales conversations.",
      ],
    },
    gallery: [
      { kind: "store", caption: "Product and room showcase pages" },
      { kind: "ads", caption: "Meta campaigns for home and interior audiences" },
      { kind: "leads", caption: "Enquiry form for furniture buyers" },
    ],
    learnings: [
      { title: "Considered purchases need conversations", text: "For furniture, the goal is often an enquiry, not an instant checkout." },
      { title: "Inspiration drives action", text: "Showing products in context helps buyers picture them in their own homes." },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
