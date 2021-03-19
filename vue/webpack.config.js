const VueLoaderPlugin = require('vue-loader/lib/plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

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
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',

            // Requires sass-loader@^9.0.0
            options: {
              // This is the path to your variables
              additionalData: "@import '@/styles/variables.scss'"
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
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
              publicPath: 'vue/dist',
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
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  plugins: [
    new VueLoaderPlugin(),
    //new BundleAnalyzerPlugin()
  ]
};
if (process.env.NODE_ENV === 'production') {

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
    new CompressionPlugin())
}