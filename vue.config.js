const fs = require('fs')

const layerPages = fs.readdirSync('./src/data')

module.exports = {
  transpileDependencies: [
    "vuetify",
    "@voorhoede/deltares-vuetify-theme",
    "vue2mapbox-gl",
  ],
  chainWebpack: (config) => {
    config.module
      .rule("markdown")
      .test(/\.md$/)
      .use("html-loader")
      .loader("html-loader")
      .end()
      .use("markdown-loader")
      .loader("markdown-loader")
      .end();

    config.plugin("define").tap((definitions) => {
      definitions[0] = Object.assign(definitions[0], {
        LAYER_PAGES: JSON.stringify(layerPages),
      });

      return definitions;
    });
  },
};
