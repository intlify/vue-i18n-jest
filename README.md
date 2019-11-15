# :globe_with_meridians: vue-i18n-jest

[![npm](https://img.shields.io/npm/v/vue-i18n-jest.svg)](https://www.npmjs.com/package/vue-i18n-jest)
[![CircleCI](https://circleci.com/gh/kazupon/vue-i18n-jest/tree/master.svg?style=svg)](https://circleci.com/gh/kazupon/vue-i18n-jest/tree/master)
[![codecov](https://codecov.io/gh/kazupon/vue-i18n-jest/branch/master/graph/badge.svg)](https://codecov.io/gh/kazupon/vue-i18n-jest)

vue-jest wrapper for i18n custom blocks

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

```diff
{
  "jest": {
    // ...
    "transform": {
-     "^.+\\.vue$": "vue-jest"
+     "^.+\\.vue$": "vue-i18n-jest"
    },
    // ....
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
