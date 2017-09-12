'use strict';

const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = '/';
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = '';

let clientConfig = {
    entry: [
        './src/client/index'
    ],
    output: {
        path: path.join(__dirname, '.dist'),
        publicPath: 'http://localhost:3001/',
        filename: 'client.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        host: 'localhost',
        port: 3001,
        historyApiFallback: true,
        hot: true
    },
    target: 'web',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                include: [
                    path.join(__dirname, 'src/client'),
                ]
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
                loader: 'url-loader'
            },
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon: './public/favicon.ico'
        })
    ],
}

let serverConfig = {
    target: 'node',
    watch: true,
    entry: [
        'webpack/hot/poll?1000',
        './src/server/index'
    ],
    output: {
        path: path.join(__dirname, '.dist'),
        filename: 'server.js'
    },
    externals: [nodeExternals({
        whitelist: ['webpack/hot/poll?1000']
    })],
    module: {
        rules: [{
            test: /\.js?$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }]
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
}

module.exports = [clientConfig, serverConfig]