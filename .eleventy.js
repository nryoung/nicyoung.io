module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('css');
  eleventyConfig.addPassthroughCopy('keybase.txt');
  return {
    passthroughFileCopy: true,
  };
};
