/**
 * Test Component for tingle
 * @author fushan
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

module.exports = {
    cache: false,
    entry: {
        demo: __dirname + '/demo/src/app/app.js'
    },
    output: {
        path: __dirname + '/dist/demo',
        filename: "[name].js",
        sourceMapFilename: "[name].js.map"
    },
    devtool: '#source-map', // 这个配置要和output.sourceMapFilename一起使用
    module: {
        loaders: [
            {
                test: /\.js$/,
                // tingle以外的modules都不需要经过babel解析
                exclude: [path.join(__dirname, 'node_modules'), path.join(__dirname, 'dist')],
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-1'],
                    plugins: ['add-module-exports'],
                    compact: false
                }
            },
            {
                test: /\.svg$/,
                loader: 'babel?presets[]=react,presets[]=es2015,presets[]=stage-1!svg-react?attrs={style:{}}',
            }
        ]
    },
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
    },
    plugins: [
        new webpack.DefinePlugin({
            __LOCAL__: true, // 本地环境
            __DEV__: true, // 日常环境
            __PRO__: false // 生产环境
        })
    ]
};
