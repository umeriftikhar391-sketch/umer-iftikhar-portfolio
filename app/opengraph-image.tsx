import { renderOgImage, ogSize } from "@/lib/og";

export const alt = "Umer Iftikhar, Performance Marketing Specialist & Web Developer";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({ eyebrow: "Performance Marketing Specialist", title: "Turning ad spend into predictable revenue." });
}
