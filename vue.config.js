module.exports = {
  devServer: {
    https: false
  },
  productionSourceMap: false, // hide the webpack folder in devtool's src tab
  configureWebpack: {
    entry: {
      app: './src/main.js' // or whatever your entry is
    }
  }
}