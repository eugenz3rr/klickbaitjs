const configuration = require('./../configuration/configuration.json');
const fs = require("fs-extra");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

// We need to map the keys to the file names.
const config_mapping = {
  'cordova': 'CordovaConfiguration',
  'installer': 'KlickbaitConfiguration',
};

let alias = {};

// We want to load another config conditionally.
if (configuration.installer.type in config_mapping) {
    alias.config = path.resolve(__dirname, `./src/${config_mapping[configuration.installer.type]}.js`);
}

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js',
        library: ['Core']
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }, {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            //outputPath: 'vue/fonts',
                            publicPath: 'vue/app/dist',
                            limit: 8192,
                        },
                    },
                ],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {}
                    // other vue-loader options go here
                }
            },
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '../../configuration/configuration.json' : path.resolve(__dirname, '../configuration/example.configuration.json'),
            ...alias
        },
        extensions: ['*', '.js', '.vue', '.json'],
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map',
    plugins: [
        new VueLoaderPlugin(),
        //new BundleAnalyzerPlugin()
    ]
};
if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map';

    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"'
                }
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: true
            }),
        ],
        new CompressionPlugin());

    module.exports.module
}