const webpack = require("webpack");
const dotenv = require("dotenv");

dotenv.config();

plugins: [
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify("development"),
  }),
];
