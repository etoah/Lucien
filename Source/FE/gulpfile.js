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
    livereload = require('gulp-livereload'),
    greplace = require('gulp-replace'),
   shell = require('gulp-shell');


var config={
    target:'public',
    cssPath:"public/css",
    cssName:'editor.css',
    jsPath:"public/js",
    jsName:'main.js',
    delayJsName:'plugin.js'
};


gulp.task('html', function () {
    return gulp.src('index.html')
        .pipe(greplace(/<link rel=.*>/g, ''))
        .pipe(greplace('</head>', '<link rel="stylesheet" href="css/'+config.cssName+'"/></head>'))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(config.target))
        .pipe(notify({message: 'html task ok'}));

});



// ��ʽ
gulp.task('css', function () {
    return gulp.src(['css/normalize.css', 'css/codemirror.css', 'css/show-hint.css', 'css/layout.css', 'css/editor.css', 'css/nav.css','css/icons.css'])
        .pipe(concat(config.cssName))
        .pipe(gulp.dest(config.cssPath))
        .pipe(minifycss())
        .pipe(gulp.dest(config.cssPath))
        .pipe(notify({message: 'Styles task complete'}));
});

gulp.task('copyFont', function () {
    return gulp.src(['css/icons.woff'])
        .pipe(gulp.dest(config.cssPath));
});
gulp.task('copy', function () {
    return gulp.src(['editor.appcache','demo.html'])
        .pipe(gulp.dest(config.target));
});


// �ű�
gulp.task('rjs', shell.task(['node js/r.js -o js/build.js']));
gulp.task('js', function () {
    return gulp.src('js/require.js')
        .pipe(uglify())
        .pipe(gulp.dest(config.jsPath))
        .pipe(notify({message: 'require task complete'}));
});



// ����
gulp.task('clean', function () {
    return gulp.src(['dist'], {read: false})
        .pipe(clean());
});

// Ԥ������
gulp.task('default', ['clean'], function () {
    gulp.start('html', 'css','copy','copyFont','rjs', 'js');
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