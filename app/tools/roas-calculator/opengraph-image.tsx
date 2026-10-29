import { renderOgImage, ogSize } from "@/lib/og";

export const alt = "Free ROAS calculator and ad budget planner by Umer Iftikhar";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({ eyebrow: "Free Tool · ROAS Calculator", title: "ROAS, CPA and break-even ROAS in one calculator." });
}
