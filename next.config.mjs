/** @type {import("next").NextConfig} */
const nextConfig = {
  headers: async () => [
    {
      source: "/",
      headers: [
        {
          key: "Cross-Origin-Embedder-Policy",
          value: "require-corp",
        },
        {
          key: "Cross-Origin-Opener-Policy",
          value: "same-origin",
        },
      ],
    },
  ],
  reactStrictMode: false,
};

export default nextConfig;
