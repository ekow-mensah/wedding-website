const {src, dest, watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const minifyCss = require('gulp-csso');
const concat = require('gulp-concat')

function scss() {
    return src('src/scss/**')
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(concat('styles.css'))
    .pipe(dest('public_html/css/style'));
}

if (process.env.NODE_ENV === 'development') {
    watch('./src/scss/**/*.scss', scss);
}

exports.scss = scss;
exports.default = scss;