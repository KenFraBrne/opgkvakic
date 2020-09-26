const withOptimizedImages = require("next-optimized-images");
const path = require('path');

module.exports = withOptimizedImages({
  responsive: {
    adapter: require('responsive-loader/sharp')
  },
  webpack(config) {
    config.resolve.alias.images = path.join(__dirname, "public");
    return config;
  },
});
