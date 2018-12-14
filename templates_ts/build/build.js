const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const ora = require('ora')

const spinner = ora('building for production...')
spinner.start()
setTimeout(function(){
    spinner.stop()

},2000)

webpack({
    entry: {
        app: './src/main.ts'
    },
    output: {
        filename: '[name].[hash].bundle.js',
        path: path.resolve(__dirname, '../dist'),
    },
    resolve: {
        extensions: ['.js', '.vue', '.ts', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, '../src')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
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
                    name: 'static/img/[name].[hash:7].[ext]',
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
        new CleanWebpackPlugin(
            ['dist'],
            {
                root: path.join(__dirname, '..'),
                verbose: false,
                dry: false
            }
        ),
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
                API_ROOT: '"//www.jd.com/api"'
            }
        }),
        new ExtractTextPlugin('[name]-[hash:7].css'),
        new VueLoaderPlugin(),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../static'),
            to: './',
            ignore: ['.*']
        }])
    ],
}, (err, stats) => {
    if (err || stats.hasErrors()) {
      // 在这里处理错误
    }
    console.log('打包成功！');

    // 处理完成
  });

// module.exports = {
//     entry: {
//         begin: './src/begin.js',
//         index: './src/index.js',
//         // main: './src/main.js'
//     },
//     output: {
//         filename: 'js/[name]bundle.js',
//         path: path.resolve(__dirname, '../dist')
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             filename: 'mall.html',
//             template: 'src/mall.html',
//             chunks: ['index'],
//             hash: true,
//             minify: {
//                 removeComments: true,
//                 collapseWhitespace: true
//             }
//         }),
//         new HtmlWebpackPlugin({
//             filename: 'index.html',
//             template: 'src/index.html',
//             inject: true,
//             title: "index",
//             chunks: ['begin'],
//             hash: true,
//             minify: {
//                 removeComments: true,
//                 collapseWhitespace: true
//             }
//         }),
//         new HtmlWebpackPlugin({
//             filename: 'main.html',
//             template: 'src/main.html',
//             inject: true,
//             title: "main",
//             hash: true,
//             chunks: ['main'],
//             minify: {
//                 removeComments: true,
//                 collapseWhitespace: true
//             }
//         }),
//         new ExtractTextPlugin('[name]-[hash:7].css'),

//         // new ExtractTextPlugin('home/[name].[contenthash].css'),
//         // new ExtractTextPlugin('about/[name].[contenthash].css'),
//         new CleanWebpackPlugin(
//             ['dist/*', 'dist/*',],　     //匹配删除的文件
//             {
//                 root: __dirname,       　　　　　　　　　　//根目录
//                 verbose: true,        　　　　　　　　　　//开启在控制台输出信息
//                 dry: false        　　　　　　　　　　//启用删除文件
//             }
//         ),
//         new VueLoaderPlugin(),
//         new CopyWebpackPlugin([{
//             from: path.resolve(__dirname, '../static'),
//             to: './',
//             ignore: ['.*']
//         }])
//     ],
//     resolve: {
//         extensions: ['.js', '.vue', '.json'],
//         alias: {
//             'vue$': 'vue/dist/vue.esm.js',
//             '@': path.resolve(__dirname, '../src')
//         }
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.css$/,
//                 loader: 'style-loader'
//             },
//             {
//                 test: /\.css$/,
//                 loader: 'css-loader'
//             },
//             {
//                 test: /\.js$/,
//                 use: 'babel-loader',
//                 exclude: /node_modules/
//             },
//             {
//                 test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
//                 loader: 'url-loader',
//                 options: {
//                     limit: 10000,
//                     name: 'static/img/[name].[hash:7].[ext]'
//                 }
//             },
//             {
//                 test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
//                 loader: 'url-loader',
//                 options: {
//                     limit: 10000,
//                     name: 'static/fonts/[name].[hash:7].[ext]'
//                 }
//             },
//             {
//                 test: /\.vue$/,
//                 loader: 'vue-loader'
//             },
//             {
//                 test: /\.(html)$/,
//                 use: {
//                     loader: 'html-loader',
//                     options: {
//                         attrs: ['img:src', 'img:data-src', 'audio:src'],
//                         minimize: true
//                     }
//                 }
//             },
//         ]
//     },
// }
