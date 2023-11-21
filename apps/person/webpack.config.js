const {
  ImportMapWebpackPlugin,
} = require("@hackney/webpack-import-map-plugin");
const webpack = require("webpack");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const { merge } = require("webpack-merge");
require("dotenv").config();

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "mfe",
    projectName: "single-view",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    entry: {
      "single-view": defaultConfig.entry,
    },
    output: {
      filename: "[name].[contenthash].js",
    },
    module: {
      rules: [
        {
          test: /\.scss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
    externals: ["react-router-dom", "formik", "yup"],
    plugins: [
      new webpack.EnvironmentPlugin({
        APP_ENV: process.env.APP_ENV || "development",
        API_URL: process.env.API_URL || 'http://localhost:3000/api/v1'
      }),
      new ImportMapWebpackPlugin({
        namespace: "@mfe",
        basePath: process.env.APP_CDN || "http://localhost:8005",
      }),
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
      }),
    ],
    resolve: {
      fallback: {
        stream: require.resolve("stream-browserify"),
      },
    },
  });
};
