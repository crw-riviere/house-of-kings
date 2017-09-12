const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')

let serverConfig = {
    target:'node',
    externals:[nodeExternals()],
    entry:['./src/server/index'],
    output:{
        path: path.join(__dirname, '.dist'),
        filename:'server.js'
    },
    module:{
        rules:[{
            test: /\.js?$/,
            use: 'babel-loader',
            exclude: /node-modules/
        }]
    },
}

module.exports = [serverConfig]