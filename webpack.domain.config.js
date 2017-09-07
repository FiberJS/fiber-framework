module.exports = {
  entry:  __dirname + "/src/domain.js",
  output: {
    path: __dirname,
    filename: "domain.js",
    library: 'fiber',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader?presets[]=es2015'
        },
    ]
  },
  node: {
        fs: "empty" // avoids error messages
    },
  resolve: {
    extensions: ['.js'],
  },
};
