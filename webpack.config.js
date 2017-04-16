const webpack = require('webpack');
const env = process.env.NODE_ENV
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: {
      "home.js": env==='development'?[
          'webpack-dev-server/client?http://0.0.0.0:8090', // WebpackDevServer host and port
          './app/js/home/' // Your appʼs entry point
      ]:'./app/js/home/index.js',
    },
    output: {
        filename: '[name]',
        publicPath: '/js/',
        path: '/static/js/'
    },
    module: {
        loaders: [
           { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    },
    devtool: env==='development'?'source-map':null,
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(env)
        }
      }),
      new BrowserSyncPlugin({
        // browse to http://localhost:3000/ during development,
        // ./public directory is being served
        host: 'localhost',
        port: 3000,
        proxy: 'http://localhost:8080'
      })
    ]
}
