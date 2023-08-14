const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const prefixer = require("gulp-autoprefixer");
const clean = require("gulp-clean-css");
const concat = require("gulp-concat");
const map = require("gulp-sourcemaps");
const bs = require("browser-sync").create();

gulp.task("sass", function () {
  return (
    gulp
      .src("scss/style.scss")
      .pipe(plumber())
      .pipe(map.init())
      .pipe(sass())
      .pipe(
        prefixer({
          overrideBrowserslist: ["last 8 versions"],
          browsers: [
            "Android >= 4",
            "Chrome >= 20",
            "Firefox >= 24",
            "Explorer >= 11",
            "iOS >= 6",
            "Opera >= 12",
            "Safari >= 6",
          ],
        })
      )
      .pipe(
        clean({
          level: 2,
        })
      )
      // .pipe(concat("style.min.css"))
      .pipe(map.write())
      .pipe(gulp.dest("build/css/"))
  );
});

gulp.task("html", function () {
  return gulp.src("*.html").pipe(gulp.dest("build"));
});
gulp.task("img", function () {
  return gulp.src("src/**/*").pipe(gulp.dest("build/src"));
});

gulp.task("serve", function () {
  bs.init({
    server: "build",
  });

  gulp.watch("scss/**/*.scss", gulp.series("sass"));
  gulp.watch("*.html", gulp.series("html"));
  gulp.watch("src/**/*", gulp.series("img"));
});
