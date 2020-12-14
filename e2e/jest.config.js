module.exports = {
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest'
  },
  globals: {
    'vue-jest': {
      transform: {
        i18n: require('vue-i18n-jest')
      }
    }
  }
}
