# :globe_with_meridians: vue-i18n-jest

[![Test](https://github.com/kazupon/vue-i18n-jest/workflows/Test/badge.svg)](https://github.com/kazupon/vue-i18n-jest/workflows/Test/badge.svg)
[![npm](https://img.shields.io/npm/v/vue-i18n-jest.svg)](https://www.npmjs.com/package/vue-i18n-jest)

vue-jest transformer for i18n custom blocks

## :warning: NOTICE
`v2.x or later` is for [vue-i18n-next](https://github.com/intlify/vue-i18n-next) (Vue 3.x)

If you want to use for [vue-i18n@v8.x](https://github.com/kazupon/vue-i18n) (Vue 2.x), use the `v1.x`

This transformer is for `vue-jest@v5.x`

## :cd: Installation

### npm

```sh
npm install --save-dev vue-i18n-jest
```

### yarn

```sh
yarn add -D vue-i18n-jest
```

## :rocket: Usages

To define vue-i18n-jest as a transformer for your .vue files that have i18n custom blocks, map them to the vue-i18n-jest module.

if you've already setup vue-jest, You can change it as follows:

```js
module.exports = {
  globals: {
    'vue-jest': {
      transform: {
        'i18n': 'vue-i18n-jest'
      }
    }
  }
}
```


## :scroll: Changelog
Details changes for each release are documented in the [CHANGELOG.md](https://github.com/kazupon/vue-i18n-jest/blob/master/CHANGELOG.md).


## :exclamation: Issues
Please make sure to read the [Issue Reporting Checklist](https://github.com/kazupon/vue-i18n-jest/blob/master/.github/CONTRIBUTING.md#issue-reporting-guidelines) before opening an issue. Issues not conforming to the guidelines may be closed immediately.

## :white_check_mark: TODO
Managed with [GitHub Projects](https://github.com/kazupon/vue-i18n-jest/issues?q=is%3Aissue+is%3Aopen+label%3ATODO)

## :copyright: License

[MIT](http://opensource.org/licenses/MIT)
