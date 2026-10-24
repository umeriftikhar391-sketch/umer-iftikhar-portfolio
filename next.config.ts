import { wordpressUrl } from "./lib/wordpress/config";
import type { NextConfig } from "next";

const media = wordpressUrl();

const nextConfig: NextConfig = {
  images: { remotePatterns: media ? [{ protocol: media.protocol.slice(0, -1) as "http" | "https", hostname: media.hostname, port: media.port, pathname: "/wp-content/uploads/**" }] : [] },
  poweredByHeader: false,
  async redirects() {
    return [{
      source: "/:path*",
      has: [{ type: "host", value: "www.umeriftikhar.online" }],
      destination: "https://umeriftikhar.online/:path*",
      statusCode: 301,
    }];
  },
  async headers() {
    return [{ source: "/:path*", headers: [
      { key: "Strict-Transport-Security", value: "max-age=31536000" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
    ] }];
  },
  experimental: {
    // Shared Node.js hosting (Hostinger) caps memory and process counts. By default Turbopack runs
    // PostCSS/Tailwind in separate child processes, which get killed under those limits and crash the
    // build while processing globals.css. Run them as worker threads inside the main process instead.
    turbopackPluginRuntimeStrategy: "workerThreads",
    // Keep build parallelism and memory use low for the same reason.
    cpus: 1,
    memoryBasedWorkersCount: true,
    turbopackFileSystemCacheForBuild: false,
  },
};

export default nextConfig;
