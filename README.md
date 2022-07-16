# PostCSS CSS var to Less var [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS Logo" width="90" height="90" align="right">](https://github.com/postcss/postcss)
[![NPM Version](https://img.shields.io/npm/v/postcss-transform-css-var.svg)](https://www.npmjs.com/package/postcss-transform-css-var)
[![BGitter Chat](https://img.shields.io/badge/chat-gitter-blue.svg)](https://gitter.im/postcss/postcss)

A [PostCSS](https://github.com/postcss/postcss) plugin to convert CSS variables to Less variables

## Installation
```
npm install postcss-transform-css-var
```

## Examples
```css
/* input css/less */
:root { --color: black; }
@prefix: ~'flyfly';
.@prefix {
  &-foo {
    --color: red;
    // --c: 10px;
    &-bar {
      background: var(--color, blue);
    }
  }
}
```
```less
/* output less */
@color: black;
@prefix: ~'flyfly';
.@prefix {
  &-foo {
    @color: red;
    // --c: 10px;
    &-bar {
      background: @color;
    }
  }
}
```

## Usage

### [Postcss JS API](https://github.com/postcss/postcss#js-api)
```js
postcss([require('postcss-transform-css-var')]).process(yourCSS);
```

### [Gulp](https://github.com/gulpjs/gulp)
```js
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const syntax = require('postcss-less');
const varConvert = require('postcss-transform-css-var');
const through = require("through2");

const convertPipe = () =>
  through.obj(async(file, enc, cb) => {
    let result = await postcss([varConvert()]).process(file.contents, {
      from: undefined,
      syntax: syntax
    });
    file.contents = Buffer.from(result.css, enc);
    cb(null, file);
  })

gulp.src('src/**/*.less', { basePath: './' })
  .pipe(convertPipe())
  .pipe(gulp.dest('./', { overwrite: true }))
```

## Tests
```
npm test
```

## TODO
- [ ] support option `type: scss`

## Special thanks
This package is a fork of [postcss-css-var-to-less-var](https://github.com/lauthieb/postcss-css-var-to-less-var). Thanks a lot [lauthieb](https://github.com/lauthieb) for this great work!

## License
This project is licensed under the [MIT License](./LICENSE).
