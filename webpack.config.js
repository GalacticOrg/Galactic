const webpack = require('webpack');
const env = process.env.NODE_ENV
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: {
      "home.js": env==='development'?[
          'webpack-dev-server/client', // WebpackDevServer host and port
          './app/frontend/Home/' // Your appʼs entry point
      ]:'./app/frontend/Home/',
      "connect.js": env==='development'?[
          'webpack-dev-server/client', // WebpackDevServer host and port
          './app/frontend/Connect/'
      ]:'./app/frontend/Connect/',
      "node.js": env==='development'?[
          'webpack-dev-server/client', // WebpackDevServer host and port
          './app/frontend/Node/'
      ]:'./app/frontend/Node/',
      "user.js": env==='development'?[
          'webpack-dev-server/client', // WebpackDevServer host and port
          './app/frontend/User/'
      ]:'./app/frontend/User/',
      "firehose.js": env==='development'?[
          'webpack-dev-server/client', // WebpackDevServer host and port
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
      new BrowserSyncPlugin(
        // BrowserSync options
        {
          // browse to http://localhost:3000/ during development
          host: 'localhost',
          port: 3000,
          // proxy the node server
          // through BrowserSync
          proxy: 'http://localhost:3001/'
        },
        // plugin options
        {
          // prevent BrowserSync from reloading the page
          // and let Webpack Dev Server take care of this
          reload: true
        }
      ),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(env)
        }
      })
    ]
}
