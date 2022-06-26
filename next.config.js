/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['storage.googleapis.com', 'pbs.twimg.com'],
  },
};

const withTM = require('next-transpile-modules')(['@ensdomains/ensjs']); // pass the modules you would like to see transpiled

module.exports = withTM(nextConfig);
