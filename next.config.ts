import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
