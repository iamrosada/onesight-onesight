const path = require("path");
/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["@babel/preset-react"]);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

module.exports = withTM({
  // your custom config goes here
  ...nextConfig,
});
