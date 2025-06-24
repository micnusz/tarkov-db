const nextConfig = {
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
