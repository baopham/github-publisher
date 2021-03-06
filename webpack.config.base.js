import path from 'path'
import webpack from 'webpack'

export default {
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.GH_CLIENT_ID': JSON.stringify(process.env.GH_CLIENT_ID),
      'process.env.GH_CLIENT_SECRET': JSON.stringify(process.env.GH_CLIENT_SECRET)
    })
  ],
  externals: [
    // put your node 3rd party libraries which can't be built with webpack here
    // (mysql, mongodb, and so on..)
  ]
}
