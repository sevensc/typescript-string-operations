var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var babel = require('gulp-babel');

gulp.task('default', function () {
    return tsProject.src()
        .pipe(tsProject()).js
        //.pipe(babel({presets:["env"]}))
        .pipe(gulp.dest("dist"));
});