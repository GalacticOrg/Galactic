const webpack = require('webpack');
const env = process.env.NODE_ENV

module.exports = {
    entry: {
      "home.js": env==='development'?[
          'webpack-dev-server/client?http://0.0.0.0:8090', // WebpackDevServer host and port
          'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
          './app/frontend/Home.react.jsx' // Your appʼs entry point
      ]:'./app/frontend/Home.react.jsx',
      "connect.js": env==='development'?[
          'webpack-dev-server/client?http://0.0.0.0:8090', // WebpackDevServer host and port
          'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
          './app/frontend/Connect.react.jsx' // Your appʼs entry point
      ]:'./app/frontend/Connect.react.jsx',
      "result.js": env==='development'?[
          'webpack-dev-server/client?http://0.0.0.0:8090', // WebpackDevServer host and port
          'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
          './app/frontend/Result.react.jsx' // Your appʼs entry point
      ]:'./app/frontend/Result.react.jsx',
      "user.js": env==='development'?[
          'webpack-dev-server/client?http://0.0.0.0:8090', // WebpackDevServer host and port
          'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
          './app/frontend/User.react.jsx' // Your appʼs entry point
      ]:'./app/frontend/User.react.jsx',
      "firehose.js": env==='development'?[
          'webpack-dev-server/client?http://0.0.0.0:8090', // WebpackDevServer host and port
          'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
          './app/frontend/Firehose.react.jsx' // Your appʼs entry point
      ]:'./app/frontend/Firehose.react.jsx',
    },
    output: {
        filename: '[name]',
        publicPath: '/app/js/',
        path: 'public/js/'
    },
    module: {
        loaders: [
           { test: [/\.jsx$/, /\.js$/], exclude: /node_modules/, loader: "babel-loader"}
        ]
    },
    devtool: env==='development'?'source-map':null,
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
}
