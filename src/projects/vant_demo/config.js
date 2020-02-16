module.exports = {
  postcss: {
    plugins: [
      require("postcss-px-to-viewport")({
        viewportWidth: 375,
        minPixelValue: 1
      })
    ]
  }
};
