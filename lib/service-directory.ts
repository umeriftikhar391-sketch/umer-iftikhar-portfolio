// Lightweight directory for navigation and forms; full page copy stays on the server.
import { Target, Megaphone, Search, Code2, ShoppingBag, Bot, BarChart3, MousePointerClick } from "lucide-react";

export const services = [
  {"slug": "meta-ads", "name": "Meta Ads", "icon": Target, "summary": "Umer Iftikhar is a Meta ads expert in Karachi managing Facebook and Instagram ads for ecommerce sales and lead generation, with tracking checks and reporting.", "tags": ["Facebook Ads", "Instagram Ads", "Conversions API"]},
  {"slug": "google-ads", "name": "Google Ads", "icon": Megaphone, "summary": "Umer Iftikhar is a Google Ads expert in Karachi managing Search, Shopping and Performance Max campaigns for ecommerce sales and lead generation.", "tags": ["Search", "Performance Max", "Display"]},
  {"slug": "seo", "name": "SEO", "icon": Search, "summary": "SEO services from Umer Iftikhar, an SEO consultant in Karachi: technical SEO, on-page optimization, local SEO and ecommerce SEO for WordPress and Shopify.", "tags": ["Technical SEO", "Content Strategy", "AEO"]},
  {"slug": "web-development", "name": "Website Development", "icon": Code2, "summary": "Website development services from Umer Iftikhar, a freelance web developer in Karachi building WordPress and Next.js websites, redesigns and landing pages.", "tags": ["Next.js", "WordPress", "Landing Pages"]},
  {"slug": "shopify-development", "name": "Shopify Development", "icon": ShoppingBag, "summary": "Umer Iftikhar is a freelance Shopify developer in Karachi who builds, customizes and migrates Shopify stores and connects them to your marketing tools.", "tags": ["Shopify", "Store Migration", "Ecommerce"]},
  {"slug": "ai-automation", "name": "AI Automation", "icon": Bot, "summary": "AI automation services from Umer Iftikhar in Karachi: lead routing, follow-up workflows, CRM integrations and reporting built with n8n, Make and Zapier.", "tags": ["Workflows", "Integrations", "Reporting"]},
  {"slug": "analytics-tracking", "name": "Analytics & Tracking", "icon": BarChart3, "summary": "Umer Iftikhar is a Google Analytics consultant in Karachi setting up and auditing GA4, Google Tag Manager and conversion tracking for Google Ads and Meta.", "tags": ["GA4", "Google Tag Manager", "Conversions API"]},
  {"slug": "conversion-optimization", "name": "Conversion Optimization", "icon": MousePointerClick, "summary": "Conversion rate optimization services from Umer Iftikhar in Karachi: funnel analysis, behavior research, landing page and checkout fixes, and testing.", "tags": ["CRO", "Landing Pages", "A/B Testing"]},
];

export const serviceOptions = services.map(service => service.name);
