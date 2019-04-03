const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('yt-styles.css');

module.exports = {
  entry: {
    background: path.join(__dirname, "./src/background.ts"),
    popup: path.join(__dirname, "./src/popup.ts"),
    contentScript: path.join(__dirname, "./src/content-script.ts"),
  },
  output: {
    path: path.join(__dirname, "./dist/js"),
    filename: "[name].js"
  },
  optimization: {
    splitChunks: {
      name: "vendor",
      chunks: "initial"
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: extractCSS.extract([ 'css-loader' ]),
      },
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".css"]
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: "manifest.json",
    }]),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./src/popup.html"),
      filename: "popup.html",
      chunks: ["popup"]
    }),
    extractCSS,
  ],
};
