/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  sassOptions: {
    includePaths: {
      includePaths: [path.join(__dirname, "styles")],
    },
  },
};

module.exports = nextConfig;
