const path = require("path");

module.exports = {
  mode: "development",
  entry: { app: "./components/App.jsx" },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },

    ],
  },
  optimization: {
    splitChunks: {
      name: "vendor",
      chunks: "all",
    },
  },
};
