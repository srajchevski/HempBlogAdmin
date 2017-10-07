var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
const validate = require('webpack-validator');
module.exports = validate({
  devtool: 'eval',
  entry: {
    app: [
      'webpack-hot-middleware/client',
      'babel-polyfill',
      path.join(__dirname, './app/main.js')
    ],
    style: [
      'webpack-hot-middleware/client',
      path.join(__dirname, './public/css/base.css'),
    ]
  },
  output: {
    path: path.join(__dirname, './public/dist/'),
    filename: 'bundle-[name].js',
    publicPath: '/dist/'
  }
  ,
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }
  ),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    compressor: {
      warnings: false
    }
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new ExtractTextPlugin('[name].min.css')

],
module: {
  loaders: [
    {

      loaders: ['react-hot-loader/webpack', 'babel?presets[]=es2015&presets[]=stage-0&presets[]=react'],

      // Skip any files outside of your project's `src` directory
      include: [
        path.resolve(__dirname, "app"),
      ],

      // Only run `.js` and `.jsx` files through Babel
      test: /\.jsx?$/
    },
    {
      test: /\.css$/,
      loader: "style-loader!css-loader"
    },
    { test: /\.((woff2?)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|ico)$/, loader: 'url?limit=10000' },
    { test: /\.woff(\?.*)?$/, include: [path.join(__dirname, './public')], loader: 'url?prefix=fonts/&name=[name].[ext]&limit=10000&mimetype=application/font-woff' },
    { test: /\.woff2(\?.*)?$/, include: [path.join(__dirname, './public')], loader: 'url?prefix=fonts/&name=[name].[ext]&limit=10000&mimetype=application/font-woff2' },
    { test: /\.otf(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
    { test: /\.ttf(\?.*)?$/, include: [path.join(__dirname, './public')],  loader: 'url?prefix=fonts/&name=[name].[ext]&limit=10000&mimetype=application/octet-stream' },
    {test: /\.eot(\?.*)?$/, include: [path.join(__dirname, './public'), path.join(__dirname, './public/css')],  loader: 'file?prefix=fonts/&name=[path][name].[ext]' },
    { test: /\.svg(\?.*)?$/, include: [path.join(__dirname, './public'), path.join(__dirname, './public/fonts'), path.join(__dirname, './public/css')],  loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
    // {
    //     test: /\.(eot|svg|ttf|woff|woff2)$/,
    //     loader: 'file?name=public/fonts/[name].[ext]'
    // },
    //{ test: /\.(png|jpg|gif)$/, include: [path.join(__dirname, '../public/img')],  loader: 'url?limit=8192' },
    {
      test: /\.(svg|woff|woff2|ttf)$/i,
      include: [path.join(__dirname, './public')],
      loaders: [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
      ]
    },
    {
      test: /\.(png|jpg|gif)$/,
      include: [path.join(__dirname, './public')],
      loader: 'file-loader'
    }
  ],

},
profile: true,
stats: {
  hash: true,
  version: true,
  timings: true,
  assets: true,
  chunks: true,
  modules: true,
  reasons: true,
  children: true,
  source: false,
  errors: true,
  errorDetails: true,
  warnings: true,
  publicPath: true
},
})
;
