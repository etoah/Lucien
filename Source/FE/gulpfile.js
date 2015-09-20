// 载入外挂
var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload');

// 样式
gulp.task('styles', function() {
    return gulp.src('css/*.css')
       // .pipe(concat('index.css'))
        .pipe(gulp.dest('dist/styles'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/styles'))
        .pipe(notify({ message: 'Styles task complete' }));
});

// 脚本
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
       // .pipe(jshint('.jshintrc'))
       // .pipe(jshint.reporter('default'))
        .pipe(concat('index.js'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(notify({ message: 'Scripts task complete' }));
});


// 清理
gulp.task('clean', function() {
    return gulp.src(['dist/styles', 'dist/scripts'], {read: false})
        .pipe(clean());
});

// 预设任务
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts');
});

// 看手
gulp.task('watch', function() {

    // 看守所有.scss档
    gulp.watch('css/*.css', ['styles']);

    // 看守所有.js档
    gulp.watch('js/*.js', ['scripts']);


    // 建立即时重整伺服器
    var server = livereload();

    // 看守所有位在 dist/  目录下的档案，一旦有更动，便进行重整
    gulp.watch(['dist/**']).on('change', function(file) {
        server.changed(file.path);
    });

});