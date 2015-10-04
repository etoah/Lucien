var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'), //html压缩
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    amdOptimize = require('amd-optimize'),
    livereload = require('gulp-livereload');


gulp.task('html', function () {
    return gulp.src('index.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist'))
        .pipe(notify({message: 'html task ok'}));

});

// 样式
gulp.task('css', function () {
    return gulp.src(['css/normalize.css', 'css/codemirror.css', 'css/show-hint.css', 'css/layout.css', 'css/editor.css', 'css/nav.css'])
        .pipe(concat('editor.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/styles'))
        .pipe(notify({message: 'Styles task complete'}));
});

// 脚本
gulp.task('js', function () {
    return gulp.src(['js/*.js', 'js/**/*.js'])
        .pipe(amdOptimize("../main", {
            baseUrl: 'js/lib',

            paths: {
                app: '../app'
            }
        }))   //主入口文件
        .pipe(concat('editor.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({message: 'Scripts task complete'}));
});


// 清理
gulp.task('clean', function () {
    return gulp.src(['dist'], {read: false})
        .pipe(clean());
});

// 预设任务
gulp.task('default', ['clean'], function () {
    gulp.start('html', 'css', 'js');
});

// 看手
gulp.task('watch', function () {

    // 看守所有.css档
    gulp.watch('css/*.css', ['css']);

    // 看守所有.js档
    gulp.watch('js/*.js', ['js']);


    // 建立即时重整伺服器
    var server = livereload();

    // 看守所有位在 dist/  目录下的档案，一旦有更动，便进行重整
    gulp.watch(['dist/**']).on('change', function (file) {
        server.changed(file.path);
    });

});