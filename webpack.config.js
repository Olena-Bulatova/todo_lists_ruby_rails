const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');

module.exports =  {  
        mode: 'development',
        entry: __dirname + '/src/main.js',
        output: {
            path: __dirname + '/dist', 
            filename: 'main.js',  
            publicPath: '/' 
        },
        optimization: {
            minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
        },
        module: {  
            rules: [
                /* {
                    test: /\.js/,
                    exclude: [
                        /node_modules/,
                        /index.js/,
                    ],
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }, */ 
                { 
                    test: /\.s[ac]ss$/i,
                    use: [
                        'style-loader', 
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                            }
                        },
                        'sass-loader'
                    ],
                },
                { 
                    test: /\.css$/,
                    use: [
                        'style-loader', 
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                            }
                        }
                    ],
                }, 
                {
                    test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
                    loader: 'url-loader',
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'styles/styles.css'
            }),
            new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
            new HtmlWebpackPlugin({
                template: __dirname + '/src/index.html'
            }),
            new CopyWebpackPlugin( {
                patterns: [
                { from: __dirname + '/src/images', to: 'images' },
                { from: __dirname + '/src/fonts', to: 'fonts' },
                ]
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery'
            })      
        ],
        devServer: {
            contentBase: './dist',
            open: true
        } 
    };