var gulp = require("gulp");
var ts = require("gulp-typescript");
var uglify = require("gulp-uglify");
var tsProject = ts.createProject("tsconfig.json");
var pump = require("pump");
var rename = require("gulp-rename");

gulp.task("default", function() {
  return tsProject
    .src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("dist"));
});

gulp.task("rename", function(cb) {
  return gulp
    .src("dist/index.js")
    .pipe(rename("index.min.js"))
    .pipe(gulp.dest("dist"));
});

gulp.task("compress", ["rename"], function(cb) {
  return pump([gulp.src("dist/*.min.js"), uglify(), gulp.dest("dist")], cb);
});
