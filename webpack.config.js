// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const config = {
  entry: './src/index.js',
  output:{
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname,'./dist'),
    publicPath:'',
    clean: true,
    assetModuleFilename: '[name][ext]'
  },
  devServer: {
    open: true,
    host: 'localhost',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: 'src/favicon.ico'
    }),

    new MiniCssExtractPlugin({
      filename:'style.[contenthash].css'
    }),

    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/images', to: 'images'}
      ]
    }),

    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns:['**/*',path.join(process.cwd(),'extra/**/*')]
    }),
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test:/\.(scss|sass)$/,
        include: [
          path.resolve(__dirname, "src/styles")
        ],
        use:[
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
                //The relative path of the file where the current CSS is located relative to the packed root path dist
                publicPath: '../images/'
            }
          }, 'css-loader', 'sass-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        include : path.join(__dirname, 'src/fonts'),
        use: {
          loader: 'url-loader',
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        include : path.join(__dirname, 'src/images'),
        use: {
          loader: 'url-loader',
        },
      },
      {
        test: /\.html$/,
        include: [
          path.resolve(__dirname, "src/pages")
        ],
        use: [
          {
            loader: 'html-loader',
            options: {minimize: true}
          }
        ]
      }
      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new MiniCssExtractPlugin());

    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  } else {
    config.mode = "development";
  }
  return config;
};
