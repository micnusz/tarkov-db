/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://tarkov-db.vercel.app", // zmień na swoją domenę przy deployu
  generateRobotsTxt: true,
  exclude: ["/api/*", "/internal/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/internal/"],
      },
    ],
  },
};
