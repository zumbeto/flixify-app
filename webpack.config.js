const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const devConfig = {
  entry: './js/script.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/js'),
  },
  mode: 'development',
  plugins: [new Dotenv()],
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
    },
  },
};

module.exports = devConfig;
