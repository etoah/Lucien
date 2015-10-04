var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'), //htmlѹ��
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

// ��ʽ
gulp.task('css', function () {
    return gulp.src(['css/normalize.css', 'css/codemirror.css', 'css/show-hint.css', 'css/layout.css', 'css/editor.css', 'css/nav.css'])
        .pipe(concat('editor.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/styles'))
        .pipe(notify({message: 'Styles task complete'}));
});

// �ű�
gulp.task('js', function () {
    return gulp.src(['js/*.js', 'js/**/*.js'])
        .pipe(amdOptimize("../main", {
            baseUrl: 'js/lib',

            paths: {
                app: '../app'
            }
        }))   //������ļ�
        .pipe(concat('editor.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({message: 'Scripts task complete'}));
});


// ����
gulp.task('clean', function () {
    return gulp.src(['dist'], {read: false})
        .pipe(clean());
});

// Ԥ������
gulp.task('default', ['clean'], function () {
    gulp.start('html', 'css', 'js');
});

// ����
gulp.task('watch', function () {

    // ��������.css��
    gulp.watch('css/*.css', ['css']);

    // ��������.js��
    gulp.watch('js/*.js', ['js']);


    // ������ʱ�����ŷ���
    var server = livereload();

    // ��������λ�� dist/  Ŀ¼�µĵ�����һ���и��������������
    gulp.watch(['dist/**']).on('change', function (file) {
        server.changed(file.path);
    });

});