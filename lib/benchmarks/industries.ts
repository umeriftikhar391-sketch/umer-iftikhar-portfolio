/**
 * Single source of truth for the calculator's selectable options.
 * Add or rename industries, platforms, markets and currencies here only.
 * Pure data (no runtime imports) so it is shared by the UI, the matcher and the tests.
 */
import type { Objective, Platform } from "../calculators/types";

export type Industry = { id: string; name: string };

export const OTHER_INDUSTRY_ID = "other";

export const INDUSTRIES: readonly Industry[] = [
  { id: "ecommerce-retail", name: "E-commerce & Retail" },
  { id: "real-estate", name: "Real Estate" },
  { id: "healthcare-dental", name: "Healthcare & Dental" },
  { id: "education-training", name: "Education & Training" },
  { id: "saas-technology", name: "SaaS & Technology" },
  { id: "home-services", name: "Home Services" },
  { id: "automotive", name: "Automotive" },
  { id: "legal-services", name: "Legal Services" },
  { id: "beauty-personal-care", name: "Beauty & Personal Care" },
  { id: "restaurants-hospitality", name: "Restaurants & Hospitality" },
  { id: "financial-services", name: "Financial Services" },
  { id: "travel-tourism", name: "Travel & Tourism" },
  { id: "fitness-wellness", name: "Fitness & Wellness" },
  { id: "professional-services", name: "Professional Services" },
  { id: OTHER_INDUSTRY_ID, name: "Other" },
];

export const PLATFORMS: readonly { id: Platform; name: string; short: string; service: string }[] = [
  { id: "meta", name: "Meta Ads (Facebook and Instagram)", short: "Meta Ads", service: "Meta Ads" },
  { id: "google-search", name: "Google Search Ads", short: "Google Search", service: "Google Ads" },
  { id: "google-display", name: "Google Display Ads", short: "Google Display", service: "Google Ads" },
];

export const OBJECTIVES: readonly { id: Objective; name: string; conversionLabel: string; description: string }[] = [
  { id: "leads", name: "Generate Leads", conversionLabel: "Leads", description: "Enquiries, form fills or calls that your team follows up." },
  { id: "purchases", name: "Generate Purchases", conversionLabel: "Purchases", description: "Online orders, measured by average order value." },
  { id: "customers", name: "Acquire Customers", conversionLabel: "Customers", description: "New paying customers, measured by customer value." },
  { id: "traffic", name: "Drive Website Traffic", conversionLabel: "Conversions", description: "Visits to your site. Revenue is shown only if you add a value per conversion." },
];

export const OTHER_COUNTRY_CODE = "OTHER";

/** Primary markets offered in the country selector (ISO 3166-1 alpha-2). */
export const PRIMARY_MARKETS: readonly { code: string; name: string }[] = [
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "PK", name: "Pakistan" },
  { code: "IN", name: "India" },
  { code: OTHER_COUNTRY_CODE, name: "Other Country" },
];

/** ISO 3166-1 alpha-2 codes for the "Other Country" search; display names come from Intl.DisplayNames. */
export const ISO_COUNTRY_CODES =
  "AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW".split(" ");

/**
 * Named regions a benchmark record may cover. A regional record is only matched for countries listed here,
 * and only when the record explicitly allows regional use. Never infer membership from geography alone.
 */
export const REGIONS: Readonly<Record<string, readonly string[]>> = {
  "north-america": ["US", "CA"],
  gcc: ["AE", "SA", "QA", "KW", "BH", "OM"],
  "european-union": ["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE"],
};

export const CURRENCIES = ["USD", "PKR", "GBP", "EUR", "AED", "SAR", "INR", "CAD", "AUD"] as const;
export type Currency = (typeof CURRENCIES)[number];

/** Suggested input currency per primary market (the visitor can always change it; nothing is converted). */
export const DEFAULT_CURRENCY_BY_MARKET: Readonly<Record<string, Currency>> = {
  US: "USD", GB: "GBP", CA: "CAD", AU: "AUD", AE: "AED", SA: "SAR", PK: "PKR", IN: "INR",
};

export const BUDGET_CHIPS = [500, 1000, 2500, 5000, 10000] as const;
