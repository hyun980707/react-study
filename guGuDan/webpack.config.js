const path = require("path");
const webpack = require("webpack");

module.exports = {
  name: "gu-gu-dan-setting",
  mode: "development", // 운영 시 production으로 변경,
  devtool: "eval",
  resolve: {
    extensions: [".js", ".jsx", "tsx"],
  },
  entry: {
    app: ["./index"],
  }, // 시작
  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  browsers: ["> 5% in KR"], // browserslist
                },
              },
            ],
            "@babel/preset-react",
          ],
        },
      },
    ],
  },
  plugins: [new webpack.LoaderOptionsPlugin({ debug: true })],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "app.js",
  }, // 출력
};
