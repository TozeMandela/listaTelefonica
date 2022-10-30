const path = require('path');

module.exports = {
    mode: 'development',
    entry: './frontend/js/main.js',
    output: {
        path: path.resolve(__dirname,'public', 'js'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/env'
                        ]
                    }
                }
            }
        ]
    },
    devtool: 'source-map'
}