var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.dev');

new WebpackDevServer(webpack(config), {
  hot: true,
  historyApiFallback: true,
  contentBase: 'example',
  publicPath: config.output.publicPath
}).listen(3000, '172.22.112.79', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://172.22.112.79:3000/');
});
