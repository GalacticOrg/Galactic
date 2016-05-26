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
          'webpack/hot/only-dev-server',
          './app/frontend/Connect/'
      ]:'./app/frontend/Connect/',
      "node.js": env==='development'?[
          'webpack-dev-server/client?http://0.0.0.0:8090', // WebpackDevServer host and port
          'webpack/hot/only-dev-server',
          './app/frontend/Node/'
      ]:'./app/frontend/Node/',
      "user.js": env==='development'?[
          'webpack-dev-server/client?http://0.0.0.0:8090', // WebpackDevServer host and port
          'webpack/hot/only-dev-server',
          './app/frontend/User/'
      ]:'./app/frontend/User/',
      "firehose.js": env==='development'?[
          'webpack-dev-server/client?http://0.0.0.0:8090', // WebpackDevServer host and port
          'webpack/hot/only-dev-server',
          './app/frontend/Firehose/'
      ]:'./app/frontend/Firehose/',
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
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      })
    ]
}
