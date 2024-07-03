const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin');

module.exports = 
  {
    context: __dirname,
    output: {
      path: __dirname + '/static/js',
      filename: '[name].js',
      publicPath: 'auto',
    },
    plugins: [
      new VanillaExtractPlugin(),
      new MiniCssExtractPlugin({
        filename: '../css/[name].css',
        ignoreOrder: true,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: [/node_modules/],
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                  },
                ],
                ['@babel/preset-react'],
              ],
            },
          },
        },
        {
          test: /\.css$/,
          exclude: [/\.module\.css$/],
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
      ],
    },
    resolve: {
      alias: {
        'my-component-library': path.resolve(__dirname, '../component-library/packages/my-component-library'),
        'my-component-library-divider': path.resolve(__dirname, '../component-library/packages/divider'),
        'my-component-library-button': path.resolve(__dirname, '../component-library/packages/button'),
        'my-component-library-theme': path.resolve(__dirname, '../component-library/packages/theme')
      },
      extensions: ['.js', '.jsx', '.json', '.css', '.less'],
    },
    entry: {
      'main': [
        './client/js/initPage.js',
      ],
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'main',
            type: 'css/mini-extract',
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
  };
