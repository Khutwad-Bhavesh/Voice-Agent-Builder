import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8000/api/:path*",
      },
      {
        source: "/docs",
        destination: "http://localhost:8000/docs",
      },
      {
        source: "/openapi.json",
        destination: "http://localhost:8000/openapi.json",
      },
    ];
  },
};

export default nextConfig;
