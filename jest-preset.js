const preset = require('@vue/cli-plugin-unit-jest/jest-preset')
const transformer = require('./lib/index').default

preset.transform['^.+\\.vue$'] = transformer

module.exports = preset
