export const siteConfig = {
  name: "Umer Iftikhar",
  role: "Performance Marketing Specialist & Web Developer",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://umeriftikhar.online").replace(/\/$/, ""),
  title: "Umer Iftikhar | Performance Marketing Specialist & Web Developer",
  description:
    "Performance marketing specialist and web developer helping brands grow revenue with Meta Ads, Google Ads, SEO, Shopify, analytics and conversion-focused websites.",
  keywords: [
    "Performance Marketing Specialist",
    "Meta Ads Expert",
    "Google Ads Specialist",
    "SEO Consultant",
    "Website Developer",
    "Shopify Developer",
    "Umer Iftikhar",
  ],
  email: "umer.iftikhar391@gmail.com",
  phone: "+92 314 0209996",
  whatsappNumber: "923140209996",
  location: "Pakistan",
  socials: {
    linkedin: "https://www.linkedin.com/in/umer-iftikhar02/",
    instagram: "https://www.instagram.com/umer.iftikhardigi",
    facebook: "https://www.facebook.com/profile.php?id=61591126276980",
  },
  stats: [
    { value: 5, suffix: "+", label: "Years Experience" },
    { value: 25, suffix: "+", label: "Projects Completed" },
    { value: 3000, suffix: "+", label: "Leads Generated" },
    { value: 8, suffix: "x", label: "ROAS Achieved" },
  ],
} as const;

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-59B86S87";
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";

export function whatsappLink(message = "Hi Umer, I want to discuss a project.") {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path === "/" ? "" : path}`;
}

export const mainNav = [
  { name: "Services", href: "/services" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
] as const;
