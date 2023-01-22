"use strict"

import { path, srcPath } from "../gulpfile.babel.js";
import { src, dest } from "gulp";
import consolidate from 'gulp-consolidate';
import "require-yaml";

function listPages() {
    delete require.cache[require.resolve('../' + path.src.pageList)]
    const pages = require('../' + path.src.pageList);

    return src(srcPath + 'index/all.html')
        .pipe(consolidate('lodash', {
            pages: pages
        }))
        .pipe(dest(path.build.html));
}

exports.listPages = listPages;