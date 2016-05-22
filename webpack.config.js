const webpack = require('webpack');
const env = process.env.NODE_ENV

module.exports = {
    entry: {
      "home.js": env==='development'?[
          'webpack-dev-server/client?http://0.0.0.0:8090', // WebpackDevServer host and port
          'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
          './app/frontend/Home/' // Your appʼs entry point
      ]:'./app/frontend/Home/',
      "connect.js": env==='development'?[
          'webpack-dev-server/client?http://0.0.0.0:8090', // WebpackDevServer host and port
          'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
          './app/frontend/Connect/' // Your appʼs entry point
      ]:'./app/frontend/Connect/',
      "result.js": env==='development'?[
          'webpack-dev-server/client?http://0.0.0.0:8090', // WebpackDevServer host and port
          'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
          './app/frontend/Result.react' // Your appʼs entry point
      ]:'./app/frontend/Result.react',
      "user.js": env==='development'?[
          'webpack-dev-server/client?http://0.0.0.0:8090', // WebpackDevServer host and port
          'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
          './app/frontend/User.react' // Your appʼs entry point
      ]:'./app/frontend/User.react',
      "firehose": env==='development'?[
          'webpack-dev-server/client?http://0.0.0.0:8090', // WebpackDevServer host and port
          'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
          './app/frontend/Firehose.react' // Your appʼs entry point
      ]:'./app/frontend/Firehose.react',
    },
    output: {
        filename: '[name]',
        publicPath: '/app/js/',
        path: 'public/js/'
    },
    module: {
        loaders: [
           { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    },
    devtool: env==='development'?'source-map':null,
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
}
