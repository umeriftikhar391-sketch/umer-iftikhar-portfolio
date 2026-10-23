import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import Section from "@/components/sections/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import ProcessSteps from "@/components/sections/ProcessSteps";
import FaqList from "@/components/sections/FaqList";
import CtaSection from "@/components/sections/CtaSection";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/seo/JsonLd";
import { serviceSchema, serviceWebPageSchema } from "@/lib/schema";
import type { Service } from "@/lib/services";
import type { ServiceCopy, CopySection, CopyNode } from "@/lib/service-copy";

const cardClass = "min-w-0 rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-8";
const linkClass = "text-red-400 underline decoration-red-500/40 underline-offset-4 hover:text-red-300";

/** Plain-text copy stays plain text; only the approved internal anchors become links. */
function LinkedCopy({ text, links }: { text: string; links: ServiceCopy["links"] }): React.ReactNode {
  const candidates = links.filter(link => text.includes(link.text)).sort((a, b) => text.indexOf(a.text) - text.indexOf(b.text) || b.text.length - a.text.length);
  const link = candidates[0];
  if (!link) return text;
  const index = text.indexOf(link.text);
  return <>{text.slice(0, index)}<Link href={link.href} className={linkClass}>{link.text}</Link><LinkedCopy text={text.slice(index + link.text.length)} links={links} /></>;
}

function Blocks({ nodes, copy, numbered = false }: { nodes: CopyNode[]; copy: ServiceCopy; numbered?: boolean }) {
  const output: React.ReactNode[] = [];
  const rich = (text: string) => <LinkedCopy text={text} links={copy.links} />;
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.kind === "card" || node.kind === "bullet") {
      const group: CopyNode[] = [node];
      while (nodes[i + 1]?.kind === node.kind) group.push(nodes[++i]);
      if (node.kind === "bullet") {
        output.push(<ul key={i} className="mt-6 grid list-disc gap-x-10 gap-y-3 pl-5 leading-7 text-gray-300 marker:text-red-500 md:grid-cols-2">{group.map(item => <li key={item.text}>{rich(item.text)}</li>)}</ul>);
      } else {
        output.push(<div key={i} className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{group.map((item, index) => <article key={item.title} className={cardClass}>
          {numbered && <span className="font-mono text-sm text-red-500">{String(index + 1).padStart(2, "0")}</span>}
          <h3 className={`${numbered ? "mt-4 " : ""}text-xl font-bold text-white`}>{rich(item.title ?? "")}</h3>
          <p className="mt-3 leading-7 text-gray-400">{rich(item.text)}</p>
        </article>)}</div>);
      }
    } else if (node.kind === "heading") {
      output.push(<h3 key={i} className="mt-12 text-2xl font-bold text-white">{node.text}</h3>);
    } else if (node.kind === "link") {
      output.push(<Link key={i} href={node.href!} className={`${linkClass} mt-6 inline-block`}>{node.text}</Link>);
    } else {
      output.push(<p key={i} className="mt-6 max-w-4xl text-lg leading-8 text-gray-400">{rich(node.text)}</p>);
    }
  }
  return <>{output}</>;
}

function Measurement({ section, copy }: { section: CopySection; copy: ServiceCopy }) {
  const first = section.nodes.findIndex(node => node.kind === "heading");
  const second = section.nodes.findIndex((node, i) => i > first && node.kind === "heading");
  const closing = section.nodes.findIndex((node, i) => i > second && node.kind === "paragraph");
  const end = closing < 0 ? section.nodes.length : closing;
  return <>
    <Blocks nodes={section.nodes.slice(0, first)} copy={copy} />
    <div className="mt-12 grid gap-5 md:grid-cols-2">
      {[section.nodes.slice(first, second), section.nodes.slice(second, end)].map(column => <div key={column[0].text} className={cardClass}>
        <h3 className="text-2xl font-bold text-white">{column[0].text}</h3>
        <ul className="mt-5 list-disc space-y-3 pl-5 leading-7 text-gray-300 marker:text-red-500">{column.filter(node => node.kind === "bullet").map(node => <li key={node.text}>{node.text}</li>)}</ul>
        {column.filter(node => node.kind === "link").map(node => <Link key={node.href} href={node.href!} className={`${linkClass} mt-6 inline-block`}>{node.text}</Link>)}
      </div>)}
    </div>
    <Blocks nodes={section.nodes.slice(end)} copy={copy} />
  </>;
}

export default function ServiceContentPage({ service, copy }: { service: Service; copy: ServiceCopy }) {
  const hero = copy.sections[0];
  const intro = hero.nodes.filter(node => node.kind === "paragraph");
  const path = `/services/${service.slug}`;
  return <>
    <JsonLd data={[serviceWebPageSchema(service), serviceSchema(service)]} />
    <PageHero eyebrow={hero.eyebrow} title={hero.title} intro={intro[0].text} extraIntro={intro[1]?.text}
      primary={hero.primary && { ...hero.primary, cta: `service_${service.slug}_hero_primary` }}
      secondary={hero.secondary && { ...hero.secondary, cta: `service_${service.slug}_hero_secondary` }}
      breadcrumbs={[{ name: "Services", path: "/services" }, { name: service.name, path }]}
    >
      <div className={cardClass}>
        <p className="text-sm uppercase tracking-[0.2em] text-gray-400">What to expect</p>
        <ul className="mt-5 list-disc space-y-4 pl-5 text-lg text-white marker:text-red-500">{hero.nodes.filter(n => n.kind === "bullet").map(n => <li key={n.text}>{n.text}</li>)}</ul>
      </div>
    </PageHero>
    {copy.sections.slice(1).map((section, index) => {
      if (section.eyebrow === "Work With Me") return <CtaSection key={section.title} source={`service-${service.slug}`} defaultService={service.name} eyebrow={section.eyebrow} title={section.title} intro={section.nodes.find(n => n.kind === "paragraph")!.text} steps={section.nodes.filter(n => n.kind === "bullet").map(n => n.text)} />;
      if (section.eyebrow === "FAQ") return <Section key={section.title}>
        <SectionHeading eyebrow={section.eyebrow} title={section.title} />
        <FaqList faqs={copy.faqs} path={path} renderText={text => <LinkedCopy text={text} links={copy.links} />} />
      </Section>;
      if (section.eyebrow === "Process") return <Section key={section.title} glow="left">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div><SectionHeading eyebrow={section.eyebrow} title={section.title} />
            <Blocks nodes={section.nodes.filter(n => n.kind === "paragraph")} copy={copy} />
            {section.cta && <div className="mt-10"><Button href={section.cta.href} cta={`service_${service.slug}_process`}>{section.cta.label}</Button></div>}
          </div>
          <ProcessSteps steps={section.nodes.filter(n => n.kind === "card").map(n => ({ title: n.title!, text: n.text }))} />
        </div>
      </Section>;
      return <Section key={section.title} id={section.eyebrow === "Proof" ? "case-studies" : undefined} glow={index % 3 === 0 ? "right" : undefined}>
        <SectionHeading eyebrow={section.eyebrow} title={section.title} />
        {section.eyebrow === "Measurement" ? <Measurement section={section} copy={copy} /> : <Blocks nodes={section.nodes} copy={copy} numbered={index === 1} />}
        {section.cta && <div className="mt-10"><Button href={section.cta.href} variant="secondary" cta={`service_${service.slug}_all_cases`}>{section.cta.label}</Button></div>}
      </Section>;
    })}
  </>;
}
