import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export default function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <JsonLd data={breadcrumbSchema(all)} />
      <nav aria-label="Breadcrumb" className="text-xs text-gray-500 sm:text-sm">
        <ol className="flex flex-wrap items-center gap-2">
          {all.map((item, i) => (
            <li key={item.path} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden>/</span>}
              {i === all.length - 1 ? (
                <span className="text-gray-300" aria-current="page">{item.name}</span>
              ) : (
                <Link href={item.path} className="transition hover:text-white">{item.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
