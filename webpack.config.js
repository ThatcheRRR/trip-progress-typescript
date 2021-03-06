const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const filename = ext => `[name].${ext}`;

const styleLoader = loader => {
  const loaders = [
    'style-loader',
    'css-loader'
  ];

  if (loader) {
    loaders.push(loader);
  }

  return loaders;
};

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.ts/,
        use: ['ts-loader'],
        exclude: /node-modules/
      },
      {
        test: /\.css$/,
        use: styleLoader()
      },
      {
        test: /\.s[ac]ss/,
        use: styleLoader('sass-loader')
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader']
      },
    ]
  },
  plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        favicon: "./public/favicon.ico",
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: filename('css')
      })
  ],
};
