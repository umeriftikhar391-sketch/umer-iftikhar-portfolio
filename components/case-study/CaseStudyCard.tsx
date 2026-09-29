import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import CaseCover from "@/components/case-study/CaseCover";
import type { CaseStudy } from "@/lib/case-studies";

export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group block h-full rounded-3xl border border-white/10 bg-white/[0.03] p-3 transition duration-500 hover:-translate-y-1 hover:border-red-500/40"
    >
      <CaseCover monogram={study.monogram} industry={study.industry} />
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-red-500">{study.category}</p>
            <h3 className="mt-2 text-2xl font-bold text-white">{study.client}</h3>
          </div>
          <ArrowUpRight
            aria-hidden
            className="h-6 w-6 shrink-0 text-red-500 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </div>
        <p className="mt-3 line-clamp-3 leading-7 text-gray-400">{study.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {study.channels.map((c) => (
            <span key={c} className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-gray-300">
              {c}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
