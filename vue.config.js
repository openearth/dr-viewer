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
  },
};