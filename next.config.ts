const nextConfig = {
  experimental: {
    reactCompiler: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.tarkov.dev",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
