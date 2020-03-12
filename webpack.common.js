const path = require('path');
const webpack = require('webpack');
const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = {
  entry: ['babel-polyfill', './src/index.tsx'],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'awesome-typescript-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: false,
              },
            ],
          ],
          plugins: [
            [
              '@babel/plugin-proposal-decorators',
              {
                legacy: true,
              },
            ],
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            ['@babel/plugin-transform-runtime'],
            [new CheckerPlugin()],
          ],
        },
      },
      { test: /\.(js|jsx)$/, loader: 'source-map-loader' },
      {
        test: /\.(scss|sass|css)$/,
        rules: [
          {
            use: ['style-loader', 'css-loader'],
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: './src/styles/postcss.config.js',
              },
            },
          },
          {
            test: /\.(scss|sass)$/,
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  resolve: { extensions: ['*', '.js', '.jsx', '.ts', '.tsx'] },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [new webpack.optimize.AggressiveMergingPlugin()],
};
