import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig, whatsappLink } from "@/lib/site";
import { services } from "@/lib/services";
import { caseStudies } from "@/lib/case-studies";

const socialLinks = [
  { name: "LinkedIn", href: siteConfig.socials.linkedin },
  { name: "Instagram", href: siteConfig.socials.instagram },
  { name: "Facebook", href: siteConfig.socials.facebook },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black px-5 pb-10 pt-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-14 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500">Ready to grow?</p>
            <h2 className="mt-4 max-w-2xl text-balance text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Let&apos;s turn your marketing into a predictable growth engine.
            </h2>
          </div>
          <Link
            href="/contact"
            data-cta="footer_book_call"
            className="group inline-flex items-center gap-2 rounded-full bg-red-600 px-8 py-4 font-semibold text-white transition hover:bg-red-500"
          >
            Book a Strategy Call
            <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="text-3xl font-bold text-white">
              Umer<span className="text-red-500">.</span>
            </Link>
            <p className="mt-5 max-w-xs leading-7 text-gray-400">
              {siteConfig.role}. I build paid media, SEO and conversion systems that turn attention into revenue.
            </p>
          </div>

          <div>
            <h3 className="mb-5 font-semibold text-white">Services</h3>
            <ul className="space-y-3 text-gray-400">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="transition hover:text-white">{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 font-semibold text-white">Case Studies</h3>
            <ul className="space-y-3 text-gray-400">
              {caseStudies.slice(0, 5).map((c) => (
                <li key={c.slug}>
                  <Link href={`/case-studies/${c.slug}`} className="transition hover:text-white">{c.client}</Link>
                </li>
              ))}
              <li>
                <Link href="/case-studies" className="text-red-500 transition hover:text-red-400">View all →</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 font-semibold text-white">Connect</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href={`mailto:${siteConfig.email}`} className="break-all transition hover:text-white">{siteConfig.email}</a>
              </li>
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">WhatsApp</a>
              </li>
              {socialLinks.map((s) => (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">{s.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-sm text-gray-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <nav aria-label="Footer" className="flex gap-6">
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/services" className="hover:text-white">Services</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
