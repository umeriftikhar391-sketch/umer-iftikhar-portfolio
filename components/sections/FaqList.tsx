import { Plus } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/schema";
import type { Faq } from "@/lib/services";

export default function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
        {faqs.map((faq) => (
          <details key={faq.q} className="group py-6">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left text-lg font-semibold text-white marker:hidden [&::-webkit-details-marker]:hidden">
              {faq.q}
              <Plus aria-hidden className="mt-1 h-5 w-5 shrink-0 text-red-500 transition-transform duration-300 group-open:rotate-45" />
            </summary>
            <p className="mt-4 max-w-3xl leading-8 text-gray-400">{faq.a}</p>
          </details>
        ))}
      </div>
    </>
  );
}
