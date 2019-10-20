const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SvgStore = require('webpack-svgstore-plugin');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = ({ config, mode }) => {

    const copyAssetsTo = mode === 'development' ? 
        resolve('../dist/assets/images') :
        resolve('../public/assets/images');

    config.module.rules.push(
        {
            test: /\.(ts|tsx)$/,
            use: [
                { loader: 'babel-loader', },
                { loader: 'ts-loader', },
            ],
        },
        {
            test: /\.(sass|scss)$/,
            use: [
               { loader: 'style-loader',},
               { loader: 'css-loader',},
               { loader: 'sass-loader',},
            ]
        },
        {
            test: /\.(ico|png|jpg|gif|ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
            loader: 'file-loader',
            options: {
                name: '[path][name].[ext]'
            }
        },
    );

    config.plugins.push(
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
        new CopyWebpackPlugin([{
            from: resolve('../src/assets/images'),
            to: copyAssetsTo,
        }]),
    );

    config.resolve.extensions.push('.ts', '.tsx');

    return config;
};



