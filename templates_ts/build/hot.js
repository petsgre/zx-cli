const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/main.ts'
  },
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.ts', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../src')
    }
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    },
    {
      test: /\.ts$/,
      loader: 'ts-loader',
      options: {
        appendTsSuffixTo: [/\.vue$/],
      }
    }, {
      test: /\.css$/,
      use: [
          { loader: 'style-loader' },
          {
              loader: 'css-loader',
              options: {
                  importLoaders: 1,
                  sourceMap: true
              }
          },
          {
              loader: 'postcss-loader',
              options: {
                  plugins: [require("autoprefixer")("last 100 versions")]
              }
          }
      ],
  },
    {
      test: /\.js$/,
      use: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 1000,
        name: 'static/img/[name].[hash:3].[ext]',
        publicPath: '/'
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'static/fonts/[name].[hash:7].[ext]'
      }
    },

    ]
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   filename: 'mall.html',
    //   template: 'src/mall.html',
    //   chunks: ['index'],
    //   hash: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true
    //   }
    // }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: true,
      title: "index",
      chunks: ['app'],
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'main.html',
    //   template: 'src/main.html',
    //   inject: true,
    //   title: "main",
    //   hash: true,
    //   chunks: ['main'],
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true
    //   }
    // }),
    // 开启全局的模块热替换(HMR)
    new webpack.HotModuleReplacementPlugin(),

    // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息
    new webpack.NamedModulesPlugin(),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../static'),
      to: 'static',
      ignore: ['.*']
    }])
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 3000,
    hot: true,
    inline: true,
    stats: "errors-only",
    clientLogLevel: 'warning',
    publicPath: '/',
    watchOptions: {
      // poll: true
    },
    historyApiFallback: true,
    proxy: {
      "/api": "http://localhost:8080"
    }
  },
  watch: true
};
