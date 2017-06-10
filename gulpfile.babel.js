'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import babel from 'gulp-babel';
import watch from 'gulp-watch';
import sourceMaps from 'gulp-sourcemaps';

gulp.task('sass', () => {

    console.log("transpiling the scss...");
    return gulp.src('src/**/*.scss')
        .pipe(sourceMaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourceMaps.write('../dist/maps', {
            includeContent: false,
            sourceRoot: "../src"
        }))
        .pipe(gulp.dest('dist'));

});

gulp.task('js', () => {

    console.log("transpiling the javascript...");
    return gulp.src('src/**/*.js')
        .pipe(sourceMaps.init())
        .pipe(babel())
        .pipe(sourceMaps.write('../dist/maps', {
            includeContent: false,
            sourceRoot: "../src"
        }))
        .pipe(gulp.dest('dist'));

});

gulp.task('watch', ['sass', 'js'], () => {
    gulp.watch('src/**/*.scss', ['sass']);
    gulp.watch('src/**/*.js', ['js']);
});

gulp.task('default', ['watch']);