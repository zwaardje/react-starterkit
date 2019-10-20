
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SvgStore = require('webpack-svgstore-plugin');
const postcssCustomMedia = require('postcss-custom-media');
const Dotenv = require('dotenv-webpack');
const SentryCliPlugin = require('@sentry/webpack-plugin');

const project = 'starter-kit';
const production = process.env.NODE_ENV === 'production';
console.log(process.env.NODE_ENV);

function resolve(dir) {
    return path.join(__dirname, dir);
}

const webpackConfig = {
    mode: production ? 'production' : 'development',
    devtool: production ? '#source-map' : '#cheap-module-source-map',
    entry: {
        fetch: ['whatwg-fetch'],
        react: ['react', 'react-dom'],
        mapboxgl: ['mapbox-gl'],
        i18next: ['i18next'],
        datepicker: ['react-datepicker'],
        "date-fns": ['date-fns'],
        app: resolve('./src/index.tsx')
    },
    output: {
        path: resolve('dist'),
        publicPath: '/',
        filename: `js/${project}.[name].[hash].js`,
        chunkFilename: `js/${project}.[name].[hash].bundle.js`
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
       },
    },
    externals: {},
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        modules: [
            resolve('src'),
            resolve('node_modules')
        ],
        alias: {}
    },
    module: {
        noParse: /(mapbox-gl)\.js$/,
        rules: [
            {
                test: /\.(ico|png|jpg|gif|ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                include: [
                    resolve('src'),
                ],
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'awesome-typescript-loader'
                    }
                ]
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(sass|scss|css)$/,
                use: [
                   { loader: 'style-loader',},
                   { loader: 'css-loader',},
                   {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                ctx: {},
                                path: 'postcss.config.js',
                            },
                            ident: 'postcss',
                            plugins: () => [
                              postcssCustomMedia()
                            ]
                        },
                    },
                   { loader: 'sass-loader',},
                ]
            }
        ]
    },
    stats: {
        assets: true,
        colors: true,
        errors: true,
        errorDetails: true,
        hash: false
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve('./src/index.html'),
            production: production,
            reject: true,
        }),
        new CopyWebpackPlugin([{
            from: resolve('./src/assets/images'),
            to: resolve('./dist/assets/images')
        }]),
        new SvgStore({
            svgoOptions: {
                plugins: [
                    {
                        removeTitle: true,
                        removeDimensions: true
                    }
                ]
            },
            prefix: 'icon-'
        }),
        new Dotenv({
            safe: true,
            systemvars: true,
            silent: true,
            defaults: false,
        }),
    ],
    devServer: {},
};

if(production) {
    webpackConfig.plugins.push(
        new SentryCliPlugin({
            include: '.',
            ignore: ['node_modules', 'webpack.config.js'],
            configFile: 'sentry.properties',
            debug: true,
            release: process.env.BUILD_SOURCEVERSION
        })
    )
}

if(!production) {
    webpackConfig.devServer = {
        contentBase: resolve('dist'),
        compress: false,
        historyApiFallback: true,
        disableHostCheck: true,
        inline: true,
        hot: true,
        host: '0.0.0.0',
        port: 1337,
        watchOptions: {
            ignored: /node_modules|#|.swp$/,
            aggregateTimeout: 1000
        }
    }
}


module.exports = webpackConfig;
