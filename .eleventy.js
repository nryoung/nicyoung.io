const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("keybase.txt");
  return {
    passthroughFileCopy: true
  };
};
