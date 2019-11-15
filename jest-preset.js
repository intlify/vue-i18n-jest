const preset = require('@vue/cli-plugin-unit-jest/jest-preset')
const debug = require('debug')('vue-i18n-jest')

preset.transform['^.+\\.vue$'] = require.resolve('vue-i18n-jest')
debug('vue-i18n-preset', preset)

module.exports = preset
