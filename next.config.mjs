import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/:locale(fr|en)/api/:path*",
        destination: "/api/:path*",
      },
    ];
  },
};

export default withNextIntl(nextConfig);
