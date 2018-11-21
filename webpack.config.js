const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = env => {
    const isProduction = env.production ? true : false;
    const envType = isProduction ? 'production' : 'development';

    return {
        mode: envType,
        entry: ['./src/app.js', 'whatwg-fetch'],
        output: {
            path: path.resolve(__dirname, 'docs'),
            filename: 'js/script.js'
        },
        devServer: {
            contentBase: './docs'
        },
        /*Loaders*/
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: 'css-loader'
                },
                {
                    test: /\.(scss|sass)$/,
                    use: [
                        // fallback to style-loader in development
                        !isProduction ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]?[hash]',
                                outputPath: 'images/',
                                publicPath: isProduction ? '../images/' : ''
                            }
                        }
                    ]
                },
                {
                    test: /\.js$/,
                    exclude: '/node_modules/',
                    use: ['babel-loader']
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]?[hash]',
                                outputPath: 'fonts/',
                                publicPath: isProduction ? '../fonts/' : ''
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'css/[name].css'
            }),
            new CleanWebpackPlugin(['docs']),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './src/templates/index.html'
            }),
            new HtmlWebpackPlugin({
                filename: 'calc.html',
                template: './src/templates/calc.html'
            }),
            new HtmlWebpackPlugin({
                filename: 'categories.html',
                template: './src/templates/categories.html'
            }),
            new HtmlWebpackPlugin({
                filename: 'directory.html',
                template: './src/templates/directory.html'
            }),
            new HtmlWebpackPlugin({
                filename: 'contacts.html',
                template: './src/templates/contacts.html'
            }),
            new HtmlWebpackPlugin({
                filename: 'cart.html',
                template: './src/templates/cart.html'
            }),
            new CopyWebpackPlugin([
                {
                    from: 'src/templates',
                    to: ''
                }
            ]),
            new ImageminPlugin({
                test: /\.(jpe?g|png|gif|svg)$/i,
                disable: !isProduction, // Disable during development
                pngquant: {
                    quality: '80-100'
                }
            }),
            new CopyWebpackPlugin([
                {
                    from: 'src/fonts',
                    to: 'fonts/[path][name].[ext]'
                },
                {
                    from: 'src/images',
                    to: 'images/[path][name].[ext]'
                }
            ])
        ],
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    uglifyOptions: {
                        keep_classnames: true,
                        warnings: false
                    }
                }),
                new OptimizeCSSAssetsPlugin({})
            ]
        }
    };
};
