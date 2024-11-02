const path = require("path")

module.exports = {
  mode: "production",
  entry: "./server.js",
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "index.js",
  },
  target: "node",
}
