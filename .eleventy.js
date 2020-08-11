const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("keybase.txt");
  return {
    passthroughFileCopy: true
  };
};
