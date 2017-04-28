/**
 * tingle generator
 * @author fushan
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var jade = require('jade');
var marked = require('marked');

var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var webpack = require('webpack');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var sourcemaps = require('gulp-sourcemaps');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var cssimport = require("gulp-cssimport");
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var replace = require('gulp-just-replace');
var gulpUniqueFile = require('gulp-unique-files');
var pathMap = require('gulp-pathmap');
var autoprefixer = require('gulp-autoprefixer');

//make inline svg
//var svgSymbols = require('gulp-svg-symbols');
var svgStore = require('gulp-svgstore');
var through = require('through2');
var spawn = require('cross-spawn');

var pkg = require('./package.json');

gulp.task('pack_demo', function (cb) {
    webpack(require('./webpack.dev.js'), function (err, stats) {
        // 重要 打包过程中的语法错误反映在stats中
        console.log('webpack log:' + stats);
        if (stats.hasErrors()) {
            // 异常日志打印到屏幕
            fs.writeFileSync('./dist/demo/demo.js', [
                'document.body.innerHTML="<pre>',
                stats.toJson().errors[0].replace(/[\n\r]/g, '<br>').replace(/\[\d+m/g, '').replace(/"/g, '\\"'),
                '</pre>";',
                'document.body.firstChild.style.fontFamily="monospace";',
                'document.body.firstChild.style.lineHeight="1.5em";',
                'document.body.firstChild.style.margin="1em";',
            ].join(''));
        }
        console.info('###### pack_demo done ######');
        cb();
    });
});

gulp.task('stylus_component', function (cb) {
    gulp.src(['./src/theme/*.styl'])
        .pipe(stylus())
        // .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['iOS >= 7', 'Android >= 2.3', 'FireFoxAndroid >= 46', '> 1%']
        }))
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist'));
    console.info('###### stylus_component done ######');
    cb();
});

gulp.task('stylus_demo', function (cb) {
    gulp.src([
            './node_modules/tingle-style/dist/tingle.css', // tingle基础样式
            './node_modules/tingle-!(style)*/src/*.css', // 依赖包样式
            './tingle/tingle-!(style)*/src/*.css', // submodule样式, tingle-style不支持submodule方式使用
            './demo/src/**/*.styl'
        ])
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(concat('demo.css'))
        .pipe(replace([{
            search: /\/\*#\ssourceMappingURL=([^\*\/]+)\.map\s\*\//g,
            replacement: '/* end for `$1` */\n'
        }]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/demo'));
    console.info('###### stylus_demo done ######');
    cb();
});

// 命名方式是 xxx.svg, 会把fill都干掉
// 命名方式是 xxx.color.svg, 会保留svg中的颜色
// 命名方式是 xxx.ignore.svg, 会忽略该svg文件
function svgFilter() {
    return through.obj(function (file, enc, cb) {

        // console.log(file.path + ':\n');
        if (!!file.path.match(/\.color\.svg$/)) {
            //console.log('file.path');
            file.path = file.path.replace(/\.color\.svg$/, '.svg');
        } else if (!!file.path.match(/\.ignore\.svg$/)) {
            cb();
            return;
        } else {
            var fileContent = file.contents.toString();

            // FIXME 这个地方还要增强, `illustrator`和`sketch`导出的`svg`文件, 表示颜色的方式不一致!!!
            file.contents = new Buffer(fileContent.replace(/\sfill="[^"]*\"\s?/g, ' '));
        }

        this.push(file);
        cb();
    });
}

gulp.task('svg_demo', function () {
    var buildName = 'tingle-icon-symbols.svg';
    return gulp.src([
            // 当前组件时的demo中使用的`icon`文件
            './demo/src/svg/*.svg',
            // 构建好的`symbol`文件, 需要排除
            '!./demo/src/svg/' + buildName
        ])
        .pipe(pathMap('%f'))
        .pipe(gulpUniqueFile())
        .pipe(svgFilter())
        .pipe(svgStore())
        .pipe(rename(buildName))
        .pipe(gulp.dest('./demo/src/svg'));
});

gulp.task('svg', function () {
    var buildName = 'tingle-icon-symbols.svg';
    return gulp.src([
            // 多套皮肤共用的`icon`文件集合
            './node_modules/@ali/tingle-icon-source/common/*.svg',

            // 默认皮肤使用的`icon`文件集合
            './node_modules/@ali/tingle-icon-source/default/*.svg',

            // 依赖的组件私有的`icon`文件集合
            './node_modules/@ali/tingle-*/src/svg/*.svg',

            // 构建好的`symbol`文件, 需要排除
            '!./src/svg/' + buildName
        ])
        .pipe(pathMap('%f'))
        .pipe(gulpUniqueFile())
        .pipe(svgFilter())
        .pipe(svgStore())
        .pipe(rename(buildName))
        .pipe(gulp.dest('./src/svg'));
});

gulp.task('reload_by_js', ['pack_demo'], function () {
    reload();
});

gulp.task('reload_by_component_css', ['stylus_component'], function () {
    reload();
});

gulp.task('reload_by_demo_css', ['stylus_demo'], function () {
    reload();
});

gulp.task('reload_by_svg', ['demo_svg'], function () {
    reload();
});

// 开发`Tingle component`时，执行`gulp develop` or `gulp d`
gulp.task('develop', [
    'pack_demo',
    'stylus_component',
    'stylus_demo',
    'svg_demo'
], function () {
    browserSync({
        server: {
            baseDir: ["./", "dist", "docs"]
        },
        open: 'external'
    });

    gulp.watch(['src/**/*.js', 'demo/src/**/*.js'], ['reload_by_js']);

    gulp.watch('src/**/*.styl', ['reload_by_component_css']);

    gulp.watch('demo/src/**/*.styl', ['reload_by_demo_css']);

    // 监听svg icon文件的变化
    gulp.watch(['demo/src/svg/*.svg'], ['reload_by_svg']);
});

// 构建css
gulp.task('build_css', function (cb) {
    gulp.src(['./src/theme/*.styl'])
        .pipe(stylus())
        .pipe(cssimport({}))
        // 删除souceMapping一行
        .pipe(replace([{
            search: /\/\*#\ssourceMappingURL=[^*]*\*\//g,
            replacement: ''
        }]))
        .pipe(gulp.dest("dist/"))
        .pipe(cssmin())
        .pipe(rename(function (path) {
            path.basename += '.min';
        }))
        .pipe(gulp.dest("dist/"));
    console.info('###### build_css done ######');
    cb();
});

// 构建js
gulp.task('pack', function (cb) {
    webpack(require('./webpack.js'), function (err, stats) {
        // 单个组件里的 sourcemap 会引起构建报错,需要去掉每一个组件 dist 里的 sourcemap
        // 临时方案, 去掉 sourcemap
        var regexp = /\/\/[#@]\s(source(?:Mapping)?URL)=data:application\/json;base64,\s*(\S+)/g;
        var distFile = path.join(__dirname, 'dist', 'tingle-ui.js');
        var codeStr = fs.readFileSync(distFile).toString();
        fs.writeFileSync(distFile, codeStr.replace(regexp, ''));

        // 重要 打包过程中的语法错误反映在stats中
        console.log('webpack log:' + stats);
        console.log('Building finished.');
        cb();
    });
});

// copy
gulp.task('copy', ['build_js', 'build_css'], function (cb) {
    var preUrl = '//g.alicdn.com/platform/tingle-ui/' + pkg.version + '/';
    gulp.src(['index.html'])
        .pipe(replace([
            {
                search: /\/dist\/default.css/g,
                replacement: preUrl + 'default.css'
            },
            {
                search: /\/dist\/demo\/demo.css/g,
                replacement: preUrl + 'demo/demo.css'
            },
            {
                search: /\/dist\/demo\/demo.js/g,
                replacement: preUrl + 'demo/demo.js'
            }
        ]))
        .pipe(gulp.dest('dist/demo'));
    gulp.src(['docs/docs.html', 'docs/js/docs.js', 'docs/css/docs.css', 'docs/css/markdown.css'])
        .pipe(gulp.dest('dist/docs'));
    gulp.src(['relationship/*.*', 'relationship/**/*.*'])
        .pipe(gulp.dest('dist/relationship/'));
    gulp.src(['dist/tingle-ui.js', 'dist/tingle-ui.min.js', 'dist/tingle-ui.js.map'])
        .pipe(rename(function (path) {
            path.basename = path.basename.replace('tingle-ui', 'salt-ui');
        }))
        .pipe(gulp.dest('dist/'));
    gulp.src(['dist/dd.css', 'dist/dd.min.css', 'dist/dd.css.map'])
        .pipe(rename(function (path) {
            path.basename = path.basename.replace('dd', 'salt-ui');
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('build_js', ['pack'], function () {
    return gulp.src(__dirname + '/dist/tingle-ui.js')
        //.pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename('tingle-ui.min.js'))
        // 独立的map文件不起作用, 先写到build后的js文件里
        // http://stackoverflow.com/questions/27671390/why-to-inline-source-maps
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist'));
});

var resultMap = {};
var componentList = [];
function handleMarkdown() {
    var components = fs.readdirSync('./docs/components/');
    components.forEach(function (name) {
        name = path.basename(name, '.md');
        componentList.push({
            name: name
        });
        var readme = fs.readFileSync('docs/components/' + name + '.md');
        var src = readme.toString().split('\n'),
            result = [],
            isContinuity = false;
        src.map(function (item) {
            if (isContinuity) {
                if (item.slice(0, 10) === '## Install') {
                    isContinuity = false;
                    return;
                } else if (item.slice(0, 8) === '## Links') {
                    isContinuity = false;
                    return;
                }
                result.push(item)
            } else {
                if (item.slice(0, 2) === '# ') {
                    item = item.replace(/\[\!\[tnpm version\]\(http:\/\/web\.npm\.alibaba-inc\.com\/badge\/v\/\@ali\/tingle-.*?\.svg\?style=flat-square\)\]\(http:\/\/web\.npm\.alibaba-inc\.com\/package\/\@ali\/tingle-.*?\)/, '');
                    result.push(item);
                    isContinuity = true;
                } else if (item.slice(0, 8) === '## Props') {
                    result.push(item);
                    isContinuity = true;
                } else if (item.slice(0, 8) === '## Event') {
                    result.push(item);
                    isContinuity = true;
                } else if (item.slice(0, 17) === '## Simple Usage') {
                    result.push(item);
                    isContinuity = true;
                } else if (item.slice(0, 4) === '<img') {
                    result.push(item);
                    isContinuity = true;
                } else if (item.slice(0, 4) === '![](' || item.slice(0, 9) === '![image](') {
                    result.push(item);
                    isContinuity = true;
                }
            }
        });
        resultMap[name] = result.join('\n');
    });
    saveDocs();
}

// save
function saveDocs() {
    var md = [];
    var res = [];
    var componentNames = [];
    componentList.map(function (item) {
        md.push('<div id="' + item.name + '">' + marked(resultMap[item.name]) + '</div>');
        componentNames.push(item.name);
    });


    res.push(jade.renderFile('./docs/docs.jade', {
        componentList: componentList,
        componentNames: componentNames.join(','),
        md: md.join('')
    }));

    fs.open(__dirname + "/docs/docs.html", "w", '0644', function (e, fd) {
        if (e) throw e;
        fs.write(fd, res.join(''), 0, 'utf8', function (e) {
            if (e) throw e;
            fs.closeSync(fd);

        })
    });
}

// generate REAEME
gulp.task('readme', function (cb) {
    gulp.src('node_modules/\@ali/tingle-*/README.md')
        .pipe(rename(function (path) {
            path.basename = path.dirname;
            path.dirname = '';
        }))
        .pipe(gulp.dest('./docs/components/'));
    cb();
});

// 生成文档
gulp.task('doc', ['readme'], function (cb) {
    handleMarkdown();
    cb();
});

// tnpm update
gulp.task('tnpm_update', function () {
    spawn.sync('tnpm', ['update'], {stdio: 'inherit'});
});


// 快捷方式
gulp.task('b', ['svg', 'svg_demo', 'doc', 'copy', 'stylus_component']);
gulp.task('d', ['doc', 'develop']);

// 发布 tnmp, 防止忘记 build
gulp.task('publish', ['build_js'], function () {
    spawn.sync('tnpm', ['publish'], {stdio: 'inherit'});
});
// 更新组件
gulp.task('update', ['tnpm_update', 'b', 'd']);

// 快捷方式
gulp.task('p', ['publish']);
gulp.task('u', ['update']);

// 保留nowa的命令
gulp.task('server', ['d']);
