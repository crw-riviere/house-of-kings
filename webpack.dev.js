const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');

const clientConfig = {
  entry: [
    './src/client/index',
  ],
  output: {
    path: path.join(__dirname, '.dist'),
    publicPath: 'http://localhost:3001/',
    filename: 'client.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    host: 'localhost',
    port: 3001,
    historyApiFallback: true,
    hot: true,
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
      },
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        include: [
          path.join(__dirname, 'src/client'),
        ],
      },
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
            },
          },
        ],
      },
      {
        test: /\.ico$/,
        loader: 'url-loader',
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
    }),
  ],
};

const serverConfig = {
  target: 'node',
  watch: true,
  entry: [
    'webpack/hot/poll?1000',
    './src/server/index',
  ],
  output: {
    path: path.join(__dirname, '.dist'),
    filename: 'server.js',
  },
  externals: [nodeExternals({
    whitelist: ['webpack/hot/poll?1000'],
  })],
  module: {
    rules: [{
      test: /\.js?$/,
      use: 'babel-loader',
      exclude: /node_modules/,
    }],
  },
  plugins: [
    new StartServerPlugin('server.js'),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.DefinePlugin({
    //     "process.env": {
    //         "BUILD_TARGET": JSON.stringify('server')
    //     }
    // }),
  ],
};

module.exports = [clientConfig, serverConfig];
