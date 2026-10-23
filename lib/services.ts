import type { LucideIcon } from "lucide-react";
import {
  Target,
  Search,
  Code2,
  ShoppingBag,
  Bot,
  BarChart3,
  MousePointerClick,
  Megaphone,
} from "lucide-react";

export type Item = { title: string; text: string };
export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  name: string;
  icon: LucideIcon;
  summary: string;
  tags: string[];
  seo: { title: string; description: string; keywords: string[] };
  hero: { eyebrow: string; headline: string; highlight: string; intro: string };
  outcomes: string[];
  problems: Item[];
  solution: { intro: string; pillars: Item[] };
  process: Item[];
  tools: Item[];
  benefits: Item[];
  caseStudies: string[];
  related: string[];
  faqs: Faq[];
};

export const services: Service[] = [
  {
    "slug": "meta-ads",
    "name": "Meta Ads",
    "icon": Target,
    "summary": "Facebook and Instagram campaign management for ecommerce sales and lead generation, with tracking checks and reporting.",
    "tags": [
      "Facebook Ads",
      "Instagram Ads",
      "Conversions API"
    ],
    "seo": {
      "title": "Meta Ads Expert | Facebook & Instagram Ads | Umer Iftikhar",
      "description": "Umer Iftikhar is a Meta ads expert in Karachi managing Facebook and Instagram ads for ecommerce sales and lead generation, with tracking checks and reporting.",
      "keywords": []
    },
    "hero": {
      "eyebrow": "Meta Ads Management",
      "headline": "Meta Ads Expert for Ecommerce Sales and Lead Generation",
      "highlight": "",
      "intro": "I'm Umer Iftikhar, a Meta ads expert based in Karachi, Pakistan. I plan, launch and manage Facebook and Instagram ad campaigns for ecommerce brands that need online sales and for service businesses that need qualified leads."
    },
    "outcomes": [
      "Campaigns built around your sales or lead goal",
      "Tracking checked before budget is scaled",
      "Clear reports on spend, results and cost per result"
    ],
    "problems": [
      {
        "title": "Spend without a clear return",
        "text": "Budget goes out every day, but sales or enquiries rise and fall for no obvious reason. Boosted posts and broad audiences make it hard to see what is working."
      },
      {
        "title": "Leads that don't become customers",
        "text": "Cheap form fills look good in Ads Manager, but your team spends hours chasing people who never intended to buy or book."
      },
      {
        "title": "Ads that have stopped working",
        "text": "The same few ads run for months. Frequency climbs, click-through rate falls, and there is no plan for what to test next."
      },
      {
        "title": "Tracking you can't rely on",
        "text": "Purchases or leads are missing or double-counted, so Meta optimises toward the wrong people and reports don't match your actual sales."
      }
    ],
    "solution": {
      "intro": "As an independent Meta ads specialist, I run your campaigns personally, from the first audit to week-to-week optimisation. My Facebook ads management services cover both Facebook and Instagram placements, for online sales and for lead generation.",
      "pillars": [
        {
          "title": "Audit and planning",
          "text": "I review account history, campaign structure, audiences and tracking, then agree goals, a target cost per result and a campaign plan for your offer."
        },
        {
          "title": "Campaign setup and management",
          "text": "I build and run prospecting and retargeting campaigns across Facebook and Instagram, monitor budgets, and adjust audiences and spend as results come in."
        },
        {
          "title": "Creative testing strategy",
          "text": "I plan which angles, hooks, formats and offers to test, write ad copy and creative briefs, and use results to decide what to make next."
        },
        {
          "title": "Tracking and reporting",
          "text": "I review or set up the Meta Pixel and Conversions API, check that key events fire correctly, and report on spend, results and cost per result."
        }
      ]
    },
    "process": [
      {
        "title": "Account and tracking review",
        "text": "I look at past campaigns, audiences, creative results, Pixel and Conversions API health and attribution settings to see where budget is being lost."
      },
      {
        "title": "Goals and campaign plan",
        "text": "We agree the main goal (purchases, leads or booked calls), the cost per result your margins can support, and the campaign structure to test first."
      },
      {
        "title": "Setup and launch",
        "text": "I fix or set up tracking, build audiences and campaigns, and launch the first round of ads built around distinct creative angles."
      },
      {
        "title": "Test and optimise",
        "text": "Each week I review results by campaign, audience, placement and creative, pause what isn't working and move budget toward what is."
      },
      {
        "title": "Report and plan",
        "text": "You get clear reports on spend, results and cost per result, with notes on what I changed and what I plan to test next."
      }
    ],
    "tools": [
      {
        "title": "Meta Ads Manager",
        "text": "Campaign setup, Advantage+ and manual campaigns"
      },
      {
        "title": "Meta Pixel",
        "text": "Browser-side events and custom conversions"
      },
      {
        "title": "Conversions API",
        "text": "Server-side events with deduplication"
      },
      {
        "title": "Events Manager",
        "text": "Event checks, diagnostics and prioritisation"
      },
      {
        "title": "GA4",
        "text": "On-site behaviour and cross-channel comparison"
      },
      {
        "title": "Google Tag Manager",
        "text": "Clean, maintainable tag deployment"
      }
    ],
    "benefits": [
      {
        "title": "Ecommerce sales campaigns",
        "text": "Prospecting and retargeting campaigns optimised for purchases, with purchase value tracked so spend can be judged against sales. Suitable for Shopify stores and other platforms."
      },
      {
        "title": "Facebook lead generation services",
        "text": "Campaigns using Instant Forms, messaging or your website forms, with questions and targeting set up to filter for people likely to buy or book."
      },
      {
        "title": "Instagram ads management",
        "text": "Ads planned for Feed, Stories and Reels, with copy and creative adapted to how people browse Instagram rather than resized Facebook ads."
      },
      {
        "title": "Retargeting",
        "text": "Follow-up ads for people who visited your site, viewed products, opened a lead form or engaged with your content, with messages matched to how far they got."
      }
    ],
    "caseStudies": [
      "building-block",
      "khatkaar",
      "decordreams"
    ],
    "related": [
      "analytics-tracking",
      "conversion-optimization",
      "google-ads"
    ],
    "faqs": [
      {
        "q": "What does a Meta ads expert do?",
        "a": "A Meta ads expert plans, runs and improves advertising on Facebook and Instagram so ad spend produces sales or leads. In my work that covers account audits, audience research, campaign setup, creative testing strategy, budget management, Pixel and Conversions API checks, and reporting."
      },
      {
        "q": "Do you run Meta ads for both ecommerce and lead generation?",
        "a": "Yes. Ecommerce campaigns optimise for purchases and are judged on purchase value and cost per purchase. Lead generation campaigns optimise for form submissions, messages or calls and are judged on cost per lead and how many leads become customers. The setup, tracking and creative differ for each."
      },
      {
        "q": "Is your management fee separate from the ad spend?",
        "a": "Yes. Your ad budget is paid directly to Meta through your own ad account. My management fee is a separate charge, which I quote after reviewing your account and goals."
      },
      {
        "q": "How do you decide on an ad budget?",
        "a": "I base the starting budget on your average order or lead value, the cost per result you can afford, and the number of conversions Meta needs to optimise delivery. I recommend a figure after the account review rather than applying a fixed minimum."
      },
      {
        "q": "What will you need from me to get started?",
        "a": "I need partner access to your ad account, Facebook Page, Instagram account and Pixel through your Meta business portfolio (Business Manager), plus website or store access if tracking needs work. I also need details of your offers, any existing creative and brand assets, and past results if you have them. The account, data and audiences stay yours."
      },
      {
        "q": "Can you take over campaigns that are already running?",
        "a": "Yes. I start the way a Facebook ads consultant would: by auditing the existing account, tracking and creative before changing anything. That way campaigns that are working aren't reset unnecessarily, and changes are made in a deliberate order."
      },
      {
        "q": "How do you measure Meta Ads results?",
        "a": "I measure results against your business goal: purchases, purchase value and return on ad spend for ecommerce, and leads, cost per lead and lead quality for lead generation. I compare Meta's figures with your store or CRM data, because Ads Manager does not capture every conversion."
      },
      {
        "q": "How long before you can tell whether campaigns are working?",
        "a": "It depends on how quickly campaigns collect enough conversions to judge. Budget, cost per result, the length of your sales cycle, tracking quality and how much needs rebuilding all affect it, so I agree a review point with you at the start rather than promising a fixed date."
      }
    ]
  },
  {
    slug: "google-ads",
    name: "Google Ads",
    icon: Megaphone,
    summary:
      "Search, Performance Max and Display campaigns that capture high-intent demand and turn it into leads and sales.",
    tags: ["Search", "Performance Max", "Display"],
    seo: {
      title: "Google Ads Specialist | Search & Performance Max Management",
      description:
        "Google Ads specialist building Search, Performance Max and Display campaigns that capture high-intent buyers, reduce wasted spend and grow conversions.",
      keywords: ["Google Ads Specialist", "PPC Specialist", "Performance Max", "Google Search Ads"],
    },
    hero: {
      eyebrow: "Google Ads Management",
      headline: "Capture Buyers the Moment They",
      highlight: "Search",
      intro:
        "People searching on Google are already looking for what you sell. The job is to be in front of the right searches, pay a sensible price for each click and send that traffic to a page built to convert. I run Google Ads accounts with that discipline.",
    },
    outcomes: ["High-intent traffic", "Lower wasted spend", "More conversions per click"],
    problems: [
      { title: "Budget lost to irrelevant searches", text: "Broad match without negative keywords sends money to searches that will never convert." },
      { title: "Performance Max as a black box", text: "PMax spends heavily on low-value placements when asset groups, signals and conversion goals are poorly configured." },
      { title: "Wrong conversions tracked", text: "Page views or button clicks counted as conversions teach Smart Bidding to find the wrong users." },
      { title: "Landing pages that leak", text: "Paying for high-intent clicks and sending them to a slow, generic homepage wastes the most valuable traffic you can buy." },
    ],
    solution: {
      intro:
        "I build Google Ads accounts around intent. Keyword themes, bidding and landing pages are aligned so every click has a clear reason to convert, and conversion tracking is accurate enough for Smart Bidding to work in your favour.",
      pillars: [
        { title: "Intent-based structure", text: "Tightly themed campaigns and ad groups so ads, keywords and landing pages speak to the same search intent." },
        { title: "Aggressive waste control", text: "Ongoing search term reviews, negative keyword lists and placement exclusions to protect budget." },
        { title: "Accurate conversion data", text: "GA4 and Google Ads conversion tracking with enhanced conversions, so bidding optimises for real business value." },
        { title: "Smart Bidding done right", text: "Bid strategies chosen for your data volume and goals, and moved from manual to automated control only when the data is ready." },
      ],
    },
    process: [
      { title: "Audit & keyword research", text: "Analyse account history, search terms and competitors, and map keywords by intent and commercial value." },
      { title: "Tracking setup", text: "Configure conversion actions, enhanced conversions and GA4 linking so every lead and sale is attributed correctly." },
      { title: "Campaign build", text: "Create Search, Performance Max or Display campaigns with strong ad copy, assets, extensions and audience signals." },
      { title: "Optimise weekly", text: "Refine bids, keywords, negatives, ads and landing pages based on conversion data, not guesswork." },
      { title: "Scale profitably", text: "Expand to new keywords, locations and campaign types once core campaigns are hitting target CPA or ROAS." },
    ],
    tools: [
      { title: "Google Search Ads", text: "High-intent keyword campaigns" },
      { title: "Performance Max", text: "Cross-channel reach with controlled asset groups" },
      { title: "Display & YouTube", text: "Remarketing and awareness" },
      { title: "GA4", text: "Conversion paths and audience building" },
      { title: "Google Tag Manager", text: "Conversion and enhanced conversion tags" },
      { title: "Google Merchant Center", text: "Shopping feeds for ecommerce" },
    ],
    benefits: [
      { title: "Buyers with intent", text: "Reach people actively searching for your product or service, when they're ready to act." },
      { title: "Less wasted spend", text: "Regular search term hygiene means budget goes to searches that actually convert." },
      { title: "Measurable ROI", text: "Accurate tracking connects ad spend to leads and revenue, so decisions are grounded in numbers." },
      { title: "Compounding performance", text: "Every week of clean data makes Smart Bidding sharper and your account more efficient." },
    ],
    caseStudies: ["gul-khan", "gulkhan-pk"],
    related: ["meta-ads", "seo", "analytics-tracking"],
    faqs: [
      { q: "Should I use Search campaigns or Performance Max?", a: "Most businesses start with Search to capture high-intent demand and build clean conversion data. Performance Max works well once conversion tracking is reliable and there are enough conversions for the algorithm to learn from. Often the best setup uses both, with clear roles." },
      { q: "How much should I spend on Google Ads?", a: "Budget depends on keyword costs in your market and the number of conversions you need. I'll estimate click costs and expected volumes during research and recommend a budget that can realistically hit your goals." },
      { q: "How long before Google Ads become profitable?", a: "Search campaigns can generate leads within days, but optimisation usually takes four to twelve weeks as data accumulates and bidding improves." },
      { q: "Do you manage Google Shopping for ecommerce stores?", a: "Yes. I set up Merchant Center feeds, Shopping and Performance Max campaigns, and product-level reporting for Shopify and other ecommerce platforms." },
      { q: "Can you improve an existing account?", a: "Yes. Many engagements start with an audit of an existing account. It usually reveals quick wins in negatives, tracking and structure before any new campaigns are built." },
    ],
  },
  {
    slug: "seo",
    name: "SEO",
    icon: Search,
    summary:
      "Technical SEO, content strategy and search visibility built to earn traffic that compounds every month, including AI search.",
    tags: ["Technical SEO", "Content Strategy", "AEO"],
    seo: {
      title: "SEO Consultant | Technical SEO, Content & AI Search Visibility",
      description:
        "SEO consultant improving rankings, organic traffic and AI search visibility through technical SEO, content strategy, on-page optimisation and structured data.",
      keywords: ["SEO Consultant", "SEO Specialist", "Technical SEO", "AEO", "AI Search Optimization"],
    },
    hero: {
      eyebrow: "Search Engine Optimisation",
      headline: "Organic Growth That Keeps",
      highlight: "Compounding",
      intro:
        "Paid ads stop when the budget stops. Organic search keeps delivering. I build SEO programmes that fix the technical foundation, target keywords buyers actually search, and make your brand visible in Google and in AI answers from ChatGPT, Gemini and AI Overviews.",
    },
    outcomes: ["Higher rankings", "Compounding organic traffic", "AI search visibility"],
    problems: [
      { title: "Invisible on page two", text: "Good products and services never get found because pages aren't optimised for the searches customers use." },
      { title: "Technical issues holding you back", text: "Slow pages, crawl errors, duplicate content and missing structured data quietly suppress rankings." },
      { title: "Content without a strategy", text: "Blog posts are published without keyword research or intent mapping, so they attract little traffic and fewer customers." },
      { title: "Missing from AI answers", text: "Search is shifting to AI-generated answers. Brands without clear, citable content are left out of those recommendations." },
    ],
    solution: {
      intro:
        "My SEO work combines technical precision with content that answers real buyer questions. Every page has a job: a keyword to own, an intent to satisfy and a next step for the visitor.",
      pillars: [
        { title: "Technical foundation", text: "Site speed, Core Web Vitals, crawlability, indexation, canonicals and schema markup, fixed and monitored." },
        { title: "Keyword & intent mapping", text: "Keyword research grouped by intent and mapped to pages, so every URL targets a clear, winnable opportunity." },
        { title: "On-page optimisation", text: "Titles, headings, internal links and content structure optimised to rank and to convert the traffic that arrives." },
        { title: "AEO & AI visibility", text: "Answer-first content, entity clarity and structured data that make your brand easy for AI systems to cite." },
      ],
    },
    process: [
      { title: "SEO audit", text: "Technical crawl, content inventory, backlink review and competitor gap analysis." },
      { title: "Keyword strategy", text: "Research and prioritise keywords by volume, difficulty and commercial intent, then map them to pages." },
      { title: "Technical fixes", text: "Resolve speed, indexation, structured data and site architecture issues that limit rankings." },
      { title: "Content & on-page", text: "Optimise existing pages and create new content built around search intent and conversion." },
      { title: "Track & iterate", text: "Monitor rankings, traffic and conversions in Search Console and GA4, and refine the plan every month." },
    ],
    tools: [
      { title: "Google Search Console", text: "Indexing, queries and performance" },
      { title: "GA4", text: "Organic traffic and conversions" },
      { title: "Screaming Frog", text: "Technical crawls and site audits" },
      { title: "Ahrefs / Semrush", text: "Keyword and competitor research" },
      { title: "PageSpeed Insights", text: "Core Web Vitals and performance" },
      { title: "Schema.org", text: "Structured data for rich results" },
    ],
    benefits: [
      { title: "Traffic that compounds", text: "Rankings keep delivering visitors long after the work is done, lowering your blended acquisition cost." },
      { title: "Trust and authority", text: "Ranking for the right terms positions your brand as the credible choice in your market." },
      { title: "Better paid performance", text: "Faster, clearer pages improve Quality Score and conversion rates for your ads too." },
      { title: "Future-proof visibility", text: "Optimising for AI search keeps your brand discoverable as search behaviour changes." },
    ],
    caseStudies: ["gulkhan-pk", "gul-khan", "petsinn"],
    related: ["web-development", "google-ads", "conversion-optimization"],
    faqs: [
      { q: "How long does SEO take to show results?", a: "Technical fixes can show impact within weeks. Meaningful ranking and traffic growth typically takes three to six months, depending on competition, site history and how much content is needed." },
      { q: "What is AEO and why does it matter?", a: "Answer Engine Optimisation structures content so AI systems like ChatGPT, Gemini and Google AI Overviews can understand and cite it. As more searches end in AI answers, being cited becomes a key source of visibility." },
      { q: "Do you do local SEO?", a: "Yes. I optimise Google Business Profiles, local landing pages and citations for businesses that serve specific cities or regions." },
      { q: "Can you protect rankings during a website migration?", a: "Yes. Migrations need URL mapping, 301 redirects, metadata transfer and post-launch monitoring. I handled exactly this for GulKhan.pk's move from WordPress to Shopify." },
      { q: "Do you build backlinks?", a: "I focus on earning links through strong content, digital PR opportunities and partnerships. I don't use spammy link schemes that put your site at risk." },
    ],
  },
  {
    slug: "web-development",
    name: "Website Development",
    icon: Code2,
    summary:
      "Fast, conversion-focused websites in Next.js and WordPress, built to rank, load instantly and turn visitors into leads.",
    tags: ["Next.js", "WordPress", "Landing Pages"],
    seo: {
      title: "Website Developer | Fast, SEO-Ready, Conversion-Focused Websites",
      description:
        "Website developer building fast, SEO-ready websites and landing pages in Next.js and WordPress, designed to convert visitors into leads and customers.",
      keywords: ["Website Developer", "Next.js Developer", "WordPress Developer", "Landing Page Developer"],
    },
    hero: {
      eyebrow: "Website Development",
      headline: "Websites Built to Load Fast and",
      highlight: "Convert",
      intro:
        "Your website is where every ad, search result and referral ends up. If it's slow, confusing or hard to use on a phone, you lose customers you've already paid to attract. I build websites that are fast, clear and designed around one outcome: more enquiries and sales.",
    },
    outcomes: ["Faster load times", "Higher conversion rates", "SEO-ready from day one"],
    problems: [
      { title: "Slow on mobile", text: "Heavy themes and page builders produce slow pages that frustrate visitors and hurt rankings." },
      { title: "Pretty but unconvincing", text: "Design that looks good but doesn't explain the offer, build trust or guide visitors to act." },
      { title: "Impossible to track", text: "No clean event tracking, so you can't tell which pages or campaigns produce leads." },
      { title: "Hard to update", text: "Every small change needs a developer, so the site falls behind the business." },
    ],
    solution: {
      intro:
        "I combine marketing strategy with clean engineering. Every site starts with the message and the conversion path, then gets built on a fast, maintainable stack with tracking and SEO in place before launch.",
      pillars: [
        { title: "Conversion-first structure", text: "Clear value proposition, proof, objection handling and calls to action placed where decisions happen." },
        { title: "Performance engineering", text: "Optimised images, minimal scripts and modern frameworks for fast load times and strong Core Web Vitals." },
        { title: "SEO built in", text: "Semantic markup, metadata, schema, sitemaps and clean URLs from the first deploy." },
        { title: "Tracking ready", text: "GA4, GTM and ad platform pixels configured with meaningful events on day one." },
      ],
    },
    process: [
      { title: "Discovery", text: "Understand your business, audience, offer and goals, and review competitors." },
      { title: "Structure & copy", text: "Plan the sitemap, page structure and conversion path, and write copy that sells." },
      { title: "Design", text: "Premium, mobile-first design that reflects your brand and makes the next step obvious." },
      { title: "Development", text: "Build in Next.js or WordPress with performance, accessibility and SEO best practices." },
      { title: "Launch & measure", text: "QA, tracking verification, launch, and ongoing optimisation based on real user behaviour." },
    ],
    tools: [
      { title: "Next.js", text: "High-performance React websites" },
      { title: "WordPress", text: "Flexible CMS for content-heavy sites" },
      { title: "Tailwind CSS", text: "Consistent, maintainable styling" },
      { title: "Vercel / Hostinger", text: "Reliable deployment and hosting" },
      { title: "Google Tag Manager", text: "Event and conversion tracking" },
      { title: "Core Web Vitals", text: "Performance measurement" },
    ],
    benefits: [
      { title: "More leads from the same traffic", text: "A clearer message and conversion path lift results from every channel you run." },
      { title: "Better rankings", text: "Speed, structure and schema give search engines everything they need to rank you." },
      { title: "Lower ad costs", text: "Faster, relevant landing pages improve ad quality scores and conversion rates." },
      { title: "A site you can grow with", text: "Clean, documented code and a sensible CMS make updates simple." },
    ],
    caseStudies: ["decordreams", "gulkhan-pk"],
    related: ["shopify-development", "seo", "conversion-optimization"],
    faqs: [
      { q: "Next.js or WordPress, which is right for me?", a: "WordPress suits content-heavy sites where non-technical teams publish often. Next.js is ideal when speed, custom functionality and top-tier performance matter most. I'll recommend the right fit based on your goals and team." },
      { q: "How long does a website project take?", a: "A focused landing page can launch in one to two weeks. A full business website typically takes three to six weeks depending on pages, content and integrations." },
      { q: "Do you write the website copy?", a: "Yes. Conversion-focused copywriting is part of the process, because design without a clear message rarely converts." },
      { q: "Will my website be mobile-friendly?", a: "Every site is designed mobile-first and tested across devices, since most traffic, especially from social ads, arrives on phones." },
      { q: "Do you provide support after launch?", a: "Yes. I offer ongoing support for updates, performance monitoring and conversion optimisation." },
    ],
  },
  {
    slug: "shopify-development",
    name: "Shopify Development",
    icon: ShoppingBag,
    summary:
      "Shopify stores and migrations built for speed, trust and conversion, ready for ads, SEO and scale from launch day.",
    tags: ["Shopify", "Store Migration", "Ecommerce"],
    seo: {
      title: "Shopify Developer | Store Builds, Migrations & CRO",
      description:
        "Shopify developer building high-converting stores and handling WordPress to Shopify migrations without losing SEO. Fast themes, tracking and ecommerce growth.",
      keywords: ["Shopify Developer", "Shopify Expert", "Shopify Migration", "Ecommerce Website Developer"],
    },
    hero: {
      eyebrow: "Shopify Development",
      headline: "Shopify Stores Built to",
      highlight: "Sell",
      intro:
        "A Shopify store is more than a theme with products. It's the checkout for every ad you run and every search you win. I build and migrate Shopify stores that load fast, earn trust and make buying easy, with tracking and SEO ready for growth from day one.",
    },
    outcomes: ["Higher conversion rate", "Safe SEO migrations", "Ads-ready tracking"],
    problems: [
      { title: "Low conversion rate", text: "Traffic arrives but doesn't buy: weak product pages, unclear shipping and returns, and friction at checkout." },
      { title: "Risky platform migrations", text: "Moving from WordPress or WooCommerce can wipe out years of rankings if URLs and redirects aren't handled carefully." },
      { title: "App bloat", text: "Dozens of apps slow the store down and conflict with each other, hurting speed and sales." },
      { title: "Broken purchase tracking", text: "Purchases aren't reported correctly to Meta, Google and GA4, so ad optimisation suffers." },
    ],
    solution: {
      intro:
        "I build Shopify stores with the customer journey and the marketing stack in mind. Product pages sell, navigation is simple, speed is protected, and every purchase is tracked accurately across platforms.",
      pillars: [
        { title: "Conversion-focused design", text: "Product pages, collections and cart built around trust signals, clear offers and frictionless buying." },
        { title: "SEO-safe migrations", text: "Full URL mapping, 301 redirects and metadata transfer to protect rankings and traffic." },
        { title: "Lean and fast", text: "Only essential apps, optimised media and theme code tuned for mobile speed." },
        { title: "Marketing integrations", text: "Meta Pixel and Conversions API, Google Ads, GA4, Merchant Center and email tools connected properly." },
      ],
    },
    process: [
      { title: "Store strategy", text: "Define catalogue structure, customer journey, key pages and the integrations you need." },
      { title: "Design & theme setup", text: "Customise a fast theme to your brand and conversion goals, mobile-first." },
      { title: "Products & migration", text: "Import products, customers and orders, and map URLs with redirects when migrating." },
      { title: "Tracking & integrations", text: "Connect analytics, ad pixels, feeds, payment gateways and shipping." },
      { title: "Launch & optimise", text: "Test every path to purchase, launch, then improve using real shopper behaviour." },
    ],
    tools: [
      { title: "Shopify", text: "Store setup, themes and customisation" },
      { title: "Liquid", text: "Theme development and custom sections" },
      { title: "Shopify Apps", text: "Carefully selected integrations" },
      { title: "Google Merchant Center", text: "Product feeds for Shopping ads" },
      { title: "Meta Commerce", text: "Catalogue and Conversions API" },
      { title: "GA4", text: "Ecommerce event tracking" },
    ],
    benefits: [
      { title: "More sales from existing traffic", text: "Better product pages and checkout flow convert more visitors into customers." },
      { title: "Protected rankings", text: "Careful migrations keep the organic traffic you've already earned." },
      { title: "Ready to scale ads", text: "Accurate purchase data lets Meta and Google optimise for real revenue." },
      { title: "Easy to manage", text: "A store your team can update without calling a developer for every change." },
    ],
    caseStudies: ["gulkhan-pk", "sputnik", "khatkaar", "petsinn"],
    related: ["web-development", "meta-ads", "conversion-optimization"],
    faqs: [
      { q: "Can you migrate my store from WordPress or WooCommerce to Shopify?", a: "Yes. I migrate products, customers and content, map every important URL to its new location with 301 redirects, and monitor rankings after launch to protect SEO." },
      { q: "How long does a Shopify store build take?", a: "A standard store typically takes two to four weeks. Larger catalogues, custom features or migrations can take longer." },
      { q: "Do you design custom Shopify themes?", a: "I customise high-quality, fast themes to your brand and build custom sections where needed. It's usually faster and more maintainable than a fully custom theme." },
      { q: "Will my store be ready for Meta and Google ads?", a: "Yes. Pixel, Conversions API, Google Ads conversion tracking, GA4 ecommerce events and Merchant Center feeds are all part of the setup." },
      { q: "Can you help after the store launches?", a: "Yes. I offer ongoing Shopify support, conversion optimisation and performance marketing to grow sales after launch." },
    ],
  },
  {
    slug: "ai-automation",
    name: "AI Automation",
    icon: Bot,
    summary:
      "AI-powered workflows, lead handling and reporting automations that save hours every week and respond to customers faster.",
    tags: ["AI Workflows", "Lead Automation", "Chatbots"],
    seo: {
      title: "AI Automation Specialist | Workflows, Lead Handling & Chatbots",
      description:
        "AI automation for growing businesses: automated lead follow-up, AI assistants, CRM workflows and reporting that save time and increase conversions.",
      keywords: ["AI Automation", "AI Automation Specialist", "Marketing Automation", "AI Chatbot for Business"],
    },
    hero: {
      eyebrow: "AI Automation",
      headline: "Automate the Busywork. Respond",
      highlight: "Faster",
      intro:
        "Leads go cold while waiting for a reply. Reports take hours to compile. Teams copy data between tools by hand. I design AI-powered automations that handle the repetitive work, so your team can focus on selling and serving customers.",
    },
    outcomes: ["Instant lead response", "Hours saved weekly", "Fewer manual errors"],
    problems: [
      { title: "Slow lead response", text: "Enquiries sit in inboxes for hours. By the time someone replies, the prospect has contacted a competitor." },
      { title: "Manual data entry", text: "Leads, orders and customer details are copied between forms, sheets and CRMs by hand." },
      { title: "Repetitive questions", text: "Your team answers the same pricing, availability and service questions every day." },
      { title: "Reporting takes hours", text: "Pulling numbers from ad platforms and analytics into weekly reports eats valuable time." },
    ],
    solution: {
      intro:
        "I map your current workflows, find the repetitive steps that cost the most time, and replace them with reliable automations and AI assistants that plug into the tools you already use.",
      pillars: [
        { title: "Lead capture & routing", text: "New leads are captured, qualified, sent to your CRM and followed up automatically in seconds." },
        { title: "AI assistants", text: "Chat and messaging assistants that answer common questions and book appointments around the clock." },
        { title: "Workflow automation", text: "Connect forms, sheets, CRMs, email and messaging apps so data moves on its own." },
        { title: "Automated reporting", text: "Marketing dashboards and summaries delivered automatically, without manual exports." },
      ],
    },
    process: [
      { title: "Workflow audit", text: "Document how leads, customers and data move through your business today." },
      { title: "Opportunity mapping", text: "Prioritise automations by time saved and revenue impact." },
      { title: "Build & integrate", text: "Create the automations and AI assistants, connected to your existing tools." },
      { title: "Test & refine", text: "Run real scenarios, handle edge cases and tune AI responses for accuracy and tone." },
      { title: "Handover & support", text: "Document everything, train your team and monitor performance." },
    ],
    tools: [
      { title: "Make / Zapier", text: "No-code workflow automation" },
      { title: "n8n", text: "Flexible, self-hostable automation" },
      { title: "OpenAI / Claude APIs", text: "AI reasoning and content generation" },
      { title: "WhatsApp Business", text: "Automated customer messaging" },
      { title: "Google Sheets & CRMs", text: "Lead and data management" },
      { title: "Looker Studio", text: "Automated reporting dashboards" },
    ],
    benefits: [
      { title: "Faster response, more conversions", text: "Replying to leads in seconds rather than hours improves the chance of winning the deal." },
      { title: "Time back for your team", text: "Hours of repetitive work each week handed off to reliable automations." },
      { title: "Consistent customer experience", text: "Every lead gets the same fast, accurate follow-up, every time." },
      { title: "Scales without hiring", text: "Handle more leads and customers without adding headcount for admin work." },
    ],
    caseStudies: ["building-block", "gul-khan"],
    related: ["analytics-tracking", "meta-ads", "web-development"],
    faqs: [
      { q: "What kind of tasks can be automated?", a: "Lead capture and follow-up, CRM updates, appointment booking, FAQ responses, order notifications, reporting and data syncing between tools are all common examples." },
      { q: "Will AI replace my team?", a: "No. Automation removes repetitive admin so your team spends more time on sales, service and strategy, the work that needs a human." },
      { q: "Do I need technical knowledge to use the automations?", a: "No. I build, document and hand over automations that run in the background. Your team just sees faster, cleaner workflows." },
      { q: "Is my customer data secure?", a: "Automations use your own accounts and follow the permissions of the tools involved. Sensitive data is only shared with services that need it." },
      { q: "Can AI answer customer questions on WhatsApp or my website?", a: "Yes. AI assistants can be trained on your services, pricing and policies to answer common questions and hand over to a human when needed." },
    ],
  },
  {
    slug: "analytics-tracking",
    name: "Analytics & Tracking",
    icon: BarChart3,
    summary:
      "GA4, Google Tag Manager and server-side tracking that give you trustworthy data on every lead, sale and campaign.",
    tags: ["GA4", "Google Tag Manager", "Conversions API"],
    seo: {
      title: "GA4 & Google Tag Manager Specialist | Conversion Tracking Setup",
      description:
        "Analytics and tracking specialist setting up GA4, Google Tag Manager, Meta Conversions API and Google Ads conversion tracking for accurate marketing data.",
      keywords: ["GA4 Specialist", "Google Tag Manager Expert", "Conversion Tracking", "Conversions API Setup"],
    },
    hero: {
      eyebrow: "Analytics & Tracking",
      headline: "Data You Can Actually",
      highlight: "Trust",
      intro:
        "Every marketing decision depends on data. When tracking is missing or duplicated, you scale the wrong campaigns and cut the right ones. I build measurement systems with GA4, Google Tag Manager and server-side events, so you know exactly what's driving revenue.",
    },
    outcomes: ["Accurate attribution", "Smarter ad optimisation", "Clear reporting"],
    problems: [
      { title: "Numbers that don't match", text: "GA4, Meta and Google Ads all report different results, and nobody knows which to believe." },
      { title: "Missing conversions", text: "Form submissions, calls and WhatsApp clicks aren't tracked, so the best channels look like they're failing." },
      { title: "Messy tag setups", text: "Hard-coded scripts, duplicate tags and abandoned containers slow the site and corrupt data." },
      { title: "Privacy blind spots", text: "Ad blockers and browser privacy features hide a growing share of conversions from ad platforms." },
    ],
    solution: {
      intro:
        "I design tracking around the business questions you need answered, then implement it cleanly: one tag manager, consistent event naming, server-side signals for ad platforms, and dashboards that show what matters.",
      pillars: [
        { title: "Measurement plan", text: "Define the key events, conversions and parameters that map to your business goals." },
        { title: "Clean GTM implementation", text: "Structured containers with clear naming, triggers and variables that are easy to maintain." },
        { title: "Server-side signals", text: "Meta Conversions API and Google enhanced conversions to recover data lost to browser restrictions." },
        { title: "Actionable dashboards", text: "Looker Studio and GA4 reports focused on leads, revenue and cost, not vanity metrics." },
      ],
    },
    process: [
      { title: "Tracking audit", text: "Review existing tags, events, conversions and data discrepancies." },
      { title: "Measurement plan", text: "Document events, conversions and naming conventions tied to business goals." },
      { title: "Implementation", text: "Configure GTM, GA4, ad platform pixels and server-side events." },
      { title: "QA & validation", text: "Test every event across devices and browsers, and reconcile numbers between platforms." },
      { title: "Dashboards & handover", text: "Build reports, document the setup and train your team." },
    ],
    tools: [
      { title: "Google Analytics 4", text: "Events, conversions and audiences" },
      { title: "Google Tag Manager", text: "Tag deployment and data layer" },
      { title: "Meta Conversions API", text: "Server-side event tracking" },
      { title: "Google Ads Conversions", text: "Including enhanced conversions" },
      { title: "Looker Studio", text: "Custom reporting dashboards" },
      { title: "Microsoft Clarity", text: "Heatmaps and session recordings" },
    ],
    benefits: [
      { title: "Confident decisions", text: "Know which campaigns, keywords and pages actually produce revenue." },
      { title: "Better ad performance", text: "Accurate conversion signals help Meta and Google optimise for your best customers." },
      { title: "Faster reporting", text: "Automated dashboards replace hours of manual spreadsheet work." },
      { title: "A setup that lasts", text: "Clean, documented tracking that anyone on your team can maintain." },
    ],
    caseStudies: ["gul-khan", "petsinn"],
    related: ["meta-ads", "google-ads", "conversion-optimization"],
    faqs: [
      { q: "Why don't GA4 and my ad platforms show the same numbers?", a: "Each platform uses different attribution models, time windows and tracking methods. A clean setup reduces unnecessary gaps, and I help you understand which numbers to use for which decisions." },
      { q: "What is server-side tracking?", a: "Server-side tracking sends conversion events from your server rather than only the visitor's browser. It's more resilient to ad blockers and privacy restrictions, improving data quality for ad platforms." },
      { q: "Can you track WhatsApp clicks and phone calls?", a: "Yes. WhatsApp clicks, call clicks, email clicks and form submissions can all be tracked as conversions in GA4 and your ad platforms." },
      { q: "Do I need Google Tag Manager?", a: "It's strongly recommended. GTM keeps all tracking in one place, makes changes faster and avoids hard-coding scripts into your website." },
      { q: "Is tracking compliant with privacy laws?", a: "I can implement consent mode and consent banners so tracking respects visitor choices and regional regulations." },
    ],
  },
  {
    slug: "conversion-optimization",
    name: "Conversion Optimization",
    icon: MousePointerClick,
    summary:
      "Data-led landing page and funnel optimisation that turns more of your existing traffic into leads and customers.",
    tags: ["CRO", "Landing Pages", "A/B Testing"],
    seo: {
      title: "Conversion Rate Optimization Specialist | CRO & Landing Pages",
      description:
        "Conversion rate optimisation specialist improving landing pages, funnels and checkout flows with research, testing and analytics to generate more leads and sales.",
      keywords: ["Conversion Rate Optimization", "CRO Specialist", "Landing Page Optimization", "Funnel Optimization"],
    },
    hero: {
      eyebrow: "Conversion Rate Optimisation",
      headline: "Get More Customers From the Traffic You",
      highlight: "Already Have",
      intro:
        "Doubling your conversion rate has the same effect as doubling your traffic, without doubling your ad spend. I use analytics, behaviour data and structured testing to find where visitors drop off and fix what stops them from buying or enquiring.",
    },
    outcomes: ["Higher conversion rate", "Lower cost per acquisition", "Better funnel visibility"],
    problems: [
      { title: "Traffic without results", text: "Ads and SEO bring visitors, but very few of them enquire or buy." },
      { title: "Guesswork redesigns", text: "Pages get redesigned based on opinion, sometimes making conversion rates worse." },
      { title: "Hidden friction", text: "Long forms, unclear pricing, slow pages and weak trust signals quietly push people away." },
      { title: "No testing process", text: "Without a structured testing programme, improvements are random and hard to prove." },
    ],
    solution: {
      intro:
        "CRO is a research discipline. I combine quantitative data from GA4 with qualitative insight from heatmaps and session recordings, prioritise the biggest opportunities, and test changes so every improvement is measured.",
      pillars: [
        { title: "Funnel analysis", text: "Identify exactly where visitors drop off, from landing page to checkout or form." },
        { title: "Behaviour research", text: "Heatmaps, scroll maps and recordings reveal what visitors see, ignore and struggle with." },
        { title: "Offer & message clarity", text: "Sharpen headlines, value propositions, proof and calls to action." },
        { title: "Structured testing", text: "Prioritised hypotheses tested and measured, so wins are real and repeatable." },
      ],
    },
    process: [
      { title: "Conversion audit", text: "Review analytics, funnels, page speed and user experience across devices." },
      { title: "Research", text: "Heatmaps, recordings and customer insight to understand behaviour and objections." },
      { title: "Hypotheses", text: "Prioritise ideas by potential impact, confidence and effort." },
      { title: "Design & test", text: "Build improved variations and run A/B or sequential tests." },
      { title: "Implement & repeat", text: "Roll out winners and feed learnings into the next round of tests." },
    ],
    tools: [
      { title: "GA4", text: "Funnels and conversion analysis" },
      { title: "Microsoft Clarity", text: "Heatmaps and session recordings" },
      { title: "Hotjar", text: "Surveys and behaviour insight" },
      { title: "Google Tag Manager", text: "Event tracking for experiments" },
      { title: "PageSpeed Insights", text: "Speed and Core Web Vitals" },
      { title: "Figma", text: "Variation design and prototyping" },
    ],
    benefits: [
      { title: "More revenue, same budget", text: "Higher conversion rates mean more leads and sales without increasing ad spend." },
      { title: "Lower acquisition costs", text: "Every percentage point of conversion improvement reduces your cost per customer." },
      { title: "Decisions backed by data", text: "Changes are tested and measured instead of based on opinion." },
      { title: "Better customer experience", text: "Removing friction makes it easier for customers to buy from you." },
    ],
    caseStudies: ["gulkhan-pk", "decordreams", "sputnik"],
    related: ["web-development", "analytics-tracking", "meta-ads"],
    faqs: [
      { q: "How much traffic do I need for CRO?", a: "Formal A/B testing needs a reasonable volume of conversions to reach significance. With lower traffic, I focus on research-led improvements and best-practice fixes that are measured over time." },
      { q: "What's a good conversion rate?", a: "It varies widely by industry, offer and traffic source. The right benchmark is your own baseline. The goal is continuous improvement from where you are today." },
      { q: "Do you only work on landing pages?", a: "No. I optimise entire funnels, including ad-to-landing page messaging, forms, product pages, cart and checkout." },
      { q: "How long does it take to see results?", a: "Quick wins like fixing broken forms or slow pages can show results immediately. A structured testing programme typically delivers measurable gains over two to three months." },
      { q: "Can CRO help my ad campaigns?", a: "Yes. Higher landing page conversion rates lower your cost per acquisition and send better signals back to ad platforms, improving campaign performance." },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export const serviceOptions = services.map((s) => s.name);
