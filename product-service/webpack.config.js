const path = require('path');
const slsw = require('serverless-webpack');

module.exports = {
  target: 'node',
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            }
          }
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@libs': path.resolve(__dirname, 'src/libs'),
    }
  },
};
