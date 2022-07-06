const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { merge } = require("webpack-merge");

module.exports = {
  entry: path.resolve(__dirname, "./src/index"),
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "./dist"),
    clean: true,
  },
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      title: "Online shop",
      filename: "index.html",
      template: "src/index.html",
    }),
    new ESLintPlugin({ extensions: "ts" }),
    // new FaviconsWebpackPlugin("src/assets/image/icons/favicon.ico"),
  ],
  module: {
    rules: [
      { test: /\.ts$/i, use: "ts-loader" },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
};
