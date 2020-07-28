const path = require('path');

module.exports = {
  //   context: __dirname,
  entry: './src/scores.ts',
  output: {
    filename: 'scores.js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
        },
        exclude: /node_modules/,
        include: [path.resolve(__dirname, 'src')],
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
};
