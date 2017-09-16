const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const nodeExternals = require('webpack-node-externals')

const DistPath = '.dist'

let clientConfig = {
    target: 'web',
    entry: ['./src/client/index'],
    output: {
        path: path.join(__dirname, DistPath),
        filename: 'client.js'
    },
    module: {
        rules: [{
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
        new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon: './public/favicon.ico'
        })
    ],
}

let serverConfig = {
    target: 'node',
    externals: [nodeExternals()],
    entry: ['./src/server/index'],
    output: {
        path: path.join(__dirname, DistPath),
        filename: 'server.js'
    },
    module: {
        rules: [{
            test: /\.js?$/,
            use: 'babel-loader',
            exclude: /node-modules/
        }]
    },
}

module.exports = [clientConfig, serverConfig]