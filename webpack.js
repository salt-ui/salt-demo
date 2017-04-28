/**
 * Build Components for tingle
 * @author alex.mm
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var pkg = require('./package.json');

module.exports = {
    cache: false,
    entry: {
        'tingle-ui': __dirname + '/src/tingle-ui.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: "[name].js",
        library: 'TingleUI',
        libraryTarget: "umd"
        //sourceMapFilename: "[name].js.map"
    },
    devtool: '#source-map', // 这个配置要和output.sourceMapFilename一起使用
    module: {
        loaders: [
            {
                test: /\.js$/,
                // tingle以外的modules都不需要经过babel解析
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-1'],
                    plugins: ['add-module-exports']
                }
            },
            {
                test: /\.svg$/,
                loader: 'babel?presets[]=react,presets[]=es2015,presets[]=stage-1!svg-react?attrs={style:{}}',
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'webpack_set_version': 'VERSION = "' + pkg.version + '"',
            'webpack_set_global_salt_ui': 'window.SaltUI = TingleUI'
        }),
        new webpack.optimize.DedupePlugin(),
    ],
    resolve: {
        alias: {
            'tingle-ui': path.join(__dirname, 'dist', 'tingle-ui.js')
        }
    },
    externals: {
        "react": {
            root: 'React',
            var: 'React',
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react'
        },
        "react-dom": {
            root: 'ReactDOM',
            var: 'ReactDOM',
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'react-dom'
        }
    }
};
