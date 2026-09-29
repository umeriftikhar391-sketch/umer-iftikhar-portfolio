type Params = Record<string, string | number | undefined>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
  }
}

// Standard Meta Pixel events mirrored from our dataLayer events (only fires if the Pixel is loaded).
const metaEvents: Record<string, string> = {
  generate_lead: "Lead",
  whatsapp_click: "Contact",
  email_click: "Contact",
  phone_click: "Contact",
};

export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
  const metaEvent = metaEvents[event];
  if (metaEvent && typeof window.fbq === "function") window.fbq("track", metaEvent, params);
}
