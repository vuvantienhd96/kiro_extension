const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    popup: "./src/popup/index.tsx",
    sidepanel: "./src/sidepanel/index.tsx",
    editor: "./src/editor/index.tsx",
    background: "./src/background/index.ts",
    content: ["./src/content/index.ts", "./src/content/content.css"],
    injected: "./src/content/injected.ts",
    recorder: "./src/recorder/recorder.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "[name].css" }),
    new CopyPlugin({
      patterns: [
        { from: "src/manifest.json", to: "manifest.json" },
        { from: "src/popup/popup.html", to: "popup.html" },
        { from: "src/sidepanel/sidepanel.html", to: "sidepanel.html" },
        { from: "src/editor/editor.html", to: "editor.html" },
        { from: "src/recorder/recorder.html", to: "recorder.html" },
        { from: "src/icons", to: "icons", noErrorOnMissing: true },
      ],
    }),
  ],
};
