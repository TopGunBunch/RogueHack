/* eslint-disable @typescript-eslint/no-var-requires */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',

    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',

    entry: './src',

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    }
                ],
            },
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            },
        ],
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index.js',
    },

    plugins: [
        new HtmlWebpackPlugin(),
    ],

    devServer: {
        host: '0.0.0.0',
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    // externals: {
    //     'react': 'React',
    //     'react-dom': "ReactDOM'
    // }
};
