const webpack = require('webpack');

module.exports = {
    mode: "production",
    devtool: 'source-map',
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendorJS: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]|vendor[\\/]/,
                    chunks: 'all',
                    enforce: true,
                },
            }
        },
    },
    output: {
        filename: '[name].bundle.min.js',
        chunkFilename: '[name].bundle.min.js',
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                }
            },
        ]
    },
    plugins: [],
};