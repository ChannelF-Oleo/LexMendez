import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Portadas de posts servidas desde Firebase Storage.
    // getDownloadURL() devuelve URLs en firebasestorage.googleapis.com; se
    // permite además el host del bucket (.firebasestorage.app) por si se usan
    // URLs directas. Bucket real: lexmendez.firebasestorage.app.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.firebasestorage.app",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
