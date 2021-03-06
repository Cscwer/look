var webpack = require('webpack');
var path = require('path');
var buildPath = path.resolve(__dirname, 'build');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var TransferWebpackPlugin = require('transfer-webpack-plugin');

var config = {
    entry: [path.join(__dirname, '/src/app/main.js')],
        resolve: {
            extensions: ["", ".js", ".jsx"]
    },
    devtool: 'source-map',
    output: {
        path: buildPath,    //Path of output file
        filename: 'bundle.js'  //Name of output file
    },
    plugins: [
        //Minify the bundle
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                //supresses warnings, usually from module minification
                warnings: false
            }
        }),
        //Allows error warnings but does not stop compiling. Will remove when eslint is added
        new webpack.NoErrorsPlugin(),
        //Transfer Files
        new TransferWebpackPlugin([
          {from: 'www'}
        ], path.resolve(__dirname,"src"))
    ],
    module: {
        preLoaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'eslint-loader',
                include: [path.resolve(__dirname, "src/app")],
                exclude: [nodeModulesPath]
            },
         ],
        loaders: [
            {
                test: /\.(js|jsx)$/, //All .js and .jsx files
                loader: 'babel-loader?optional=runtime&stage=0', //react-hot is like browser sync and babel loads jsx and es6-7
                exclude: [nodeModulesPath]
            }
        ]
    },
    //Eslint config
    eslint: {
        configFile: '.eslintrc' //Rules for eslint
    }
};

module.exports = config;
