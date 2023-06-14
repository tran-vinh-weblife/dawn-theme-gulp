const {
    dest,
    series,
    src,
    parallel,
    watch
} = require("gulp");
const gulp = require('gulp');
const concat = require("gulp-concat");
const jshint = require("gulp-jshint");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require('gulp-sass');
const minify = require("gulp-minify");
const cleancss = require("gulp-clean-css");
const browserSync = require('browser-sync').create();
const babel = require("gulp-babel");

function scss() {
    return gulp.src(['./src/scss/**/*.scss', '!./src/scss/_*/**'])
        .pipe(plumber())
        .pipe(rename(function (path) {
            if (path.basename.startsWith('_')) {
                // remove _*.scss
                path.basename = path.basename.slice(1);
                // add prefix (parent folder + file name .scss)
                path.basename = path.dirname + "-" + path.basename
            }
            // dirname
            path.dirname = './'
        }))
        .pipe(sass({outputStyle: "expanded"}))
        .pipe(gulp.dest("./assets"))
}

function minifyCss() {
    return gulp.src("./assets/*.css")
        .pipe(cleancss({
            compatibility: "ie8"
        }))
        .pipe(gulp.dest("./assets"));
}

//==== Define complex task ======
//const js = series(compileJs);
const css = gulp.series(scss);
function watchFiles() {
    watch('src/scss/**/*', scss);
}

// Watch files with browserSync
const watchBrowser = series(
    series(parallel(css, watchFiles))
    //initBrowserSync,
);


// Export file
exports.watch = watchBrowser;
exports.css = css;
exports.default = css;