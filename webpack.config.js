const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

const devConfig = {
  entry: './js/script.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/js'),
  },
  mode: 'development',
  plugins: [new Dotenv()],
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
    },
  },
};

const prodConfig = {
  entry: './js/script.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/js'),
  },
  mode: 'production',
  plugins: new webpack.DefinePlugin({
    'process.env.TMDB_API_KEY': JSON.stringify(process.env.TMDB_API_KEY),
  }),
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
    },
  },
};

module.exports = env => {
  if (env && env.production) {
    return prodConfig;
  }
  return devConfig;
};
