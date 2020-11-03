const fs = require("fs");
const path = require("path");
const configDir = require("./config").configDir;
const projectConfig = require(path.join(__dirname, configDir, "project.json"));

const layerPages = fs.readdirSync(
  path.resolve(configDir, "data")
);

const locales = fs.readdirSync(
  path.resolve(configDir, "content")
);

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

    config.plugin("html").tap((args) => {
      args[0].title = projectConfig.name;
      return args;
    });

    config.plugin("define").tap((definitions) => {
      definitions[0] = Object.assign(definitions[0], {
        LAYER_PAGES: JSON.stringify(layerPages),
        LOCALES: JSON.stringify(locales),
      });

      return definitions;
    });

    config.plugin("env").use(require.resolve("webpack/lib/EnvironmentPlugin"), [
      {
        CONFIG_DIR: path.join(__dirname, "/", configDir),
      },
    ]);
  },

  pluginOptions: {
    i18n: {
      locale: "es",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: true,
    },
  },
};
