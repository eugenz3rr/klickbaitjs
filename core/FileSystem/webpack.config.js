const configuration = require('../configuration/configuration.json');
const file_systems = require('./src/FileSystems/FileSystems.json');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');
let alias = {};

// We want to load another config conditionally.
if (configuration.fileSystem.type in file_systems) {
    alias.config = path.resolve(__dirname, `./src/FileSystem/${file_systems[configuration.fileSystem.type]}`);
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
}
