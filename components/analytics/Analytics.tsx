"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";
import { GTM_ID, META_PIXEL_ID } from "@/lib/site";

/**
 * Loads GTM (and the Meta Pixel when configured) and pushes click events to the dataLayer:
 * whatsapp_click, email_click, phone_click and cta_click (any element with a data-cta attribute).
 * The lead form pushes generate_lead itself. Map these events to GA4 / Meta in GTM.
 */
export default function Analytics() {
  const pathname = usePathname();
  const firstPageView = useRef(true);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.("a, button");
      if (!el) return;
      const href = el.getAttribute("href") || "";
      const text = (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 80);
      const base = { link_text: text, link_url: href, page_path: window.location.pathname };

      if (href.includes("wa.me/")) track("whatsapp_click", base);
      else if (href.startsWith("mailto:")) track("email_click", base);
      else if (href.startsWith("tel:")) track("phone_click", base);

      const cta = el.getAttribute("data-cta");
      if (cta) track("cta_click", { ...base, cta_label: cta });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  // The Pixel snippet sends the first PageView; send one for each client-side navigation after that.
  useEffect(() => {
    if (firstPageView.current) {
      firstPageView.current = false;
      return;
    }
    window.fbq?.("track", "PageView");
  }, [pathname]);

  return (
    <>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
      {META_PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}
