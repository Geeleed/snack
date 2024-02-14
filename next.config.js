// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

// const withPWA = require("next-pwa")({
//   dest: "public",
//   register: true,
//   skipWaiting: true,
//   // disable: process.env.NODE_ENV === "development",
//   disable: false,
// });

// const nextConfig = withPWA({
//   reactStrictMode: true,
//   swcMinify: true,
//   output: "export",
// });

// module.exports = nextConfig;

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
  },
  // ... other options you like
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... other options you like
};

module.exports = withPWA(nextConfig);
