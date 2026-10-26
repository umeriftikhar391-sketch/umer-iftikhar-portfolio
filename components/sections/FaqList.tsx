import { Plus } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/schema";
import type { Faq } from "@/lib/services";

export default function FaqList({ faqs, path, renderText = text => text }: { faqs: Faq[]; path?: string; renderText?: (text: string) => React.ReactNode }) {
  return (
    <>
      <JsonLd data={faqSchema(faqs, path)} />
      <div className="mt-12 space-y-3">
        {faqs.map((faq) => (
          <details key={faq.q} className="group rounded-2xl border border-line bg-white px-5 py-1 shadow-card transition-colors open:border-brand/30 sm:px-6">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 text-left text-lg font-semibold text-ink marker:hidden hover:text-brand-hover [&::-webkit-details-marker]:hidden">
              {faq.q}
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose"><Plus aria-hidden className="h-4 w-4 text-brand-hover transition-transform duration-300 group-open:rotate-45" /></span>
            </summary>
            <p className="max-w-3xl pb-5 leading-8 text-body">{renderText(faq.a)}</p>
          </details>
        ))}
      </div>
    </>
  );
}
