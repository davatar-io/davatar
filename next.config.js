/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "storage.googleapis.com",
      "pbs.twimg.com",
      "localhost:3000",
      "localhost",
      "gateway.ipfs.io"
    ],
  },
};

const withTM = require("next-transpile-modules")(["@ensdomains/ensjs"]); // pass the modules you would like to see transpiled

module.exports = withTM(nextConfig);
