"use strict";

import { path } from "../gulpfile.babel.js";
import { src, dest } from "gulp";
import gulp from "gulp";

import postcss from "gulp-postcss";
import plumber from "gulp-plumber";
import autoprefixer from "autoprefixer";
import sourcemaps from "gulp-sourcemaps";
import rename from "gulp-rename";
import cssnano from "cssnano";
import concatCss from "gulp-concat-css";
import gulpif from "gulp-if";

const browserSync = require("browser-sync").create();
const sass = require("gulp-sass")(require("sass"));

import yargs from 'yargs';
const argv = yargs.argv;
const production = !!argv.production;

const srcPath = "#src/";

function styles() {
    return src(path.src.styles)
        .pipe(plumber())
        .pipe(gulpif(!production, sourcemaps.init()))
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: "expanded"
        }))
        .on("error", sass.logError)
        .pipe(gulpif(production, postcss([autoprefixer()])))
        .pipe(postcss([cssnano()]))
        .pipe(rename({
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(gulpif(!production, sourcemaps.write(".")))
        .pipe(dest(path.build.styles))
        .pipe(browserSync.stream())
}

function vendorStyles() {
    return src(path.src.vendorStyles)
        .pipe(plumber())
        .pipe(sass({
            errLogToConsole: true,
            includePaths: ["node_modules"],
            outputStyle: "expanded"
        }))
        .on("error", sass.logError)
        .pipe(postcss([cssnano()]))
        .pipe(rename({
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(dest(path.build.styles))
        .pipe(browserSync.stream())
}

const stylesBundle = gulp.parallel(styles, vendorStyles);

exports.stylesBundle = stylesBundle;

exports.styles = styles;
exports.vendorStyles = vendorStyles;