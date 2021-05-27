import { readFileSync } from 'fs'
import { resolve as resolvePath } from 'path'
import { parseComponent } from 'vue-template-compiler'

import process from '../src/process'

const files = [
  'no-i18n.vue',
  'default.vue',
  'json.vue',
  'json-src-import.vue',
  'json-locale.vue',
  'yaml.vue',
  'yaml-src-import.vue',
  'yaml-locale.vue',
  'json5.vue',
  'json5-src-import.vue',
  'json5-locale.vue'
]

describe('process', () => {
  test.each(files)('(%s) returns expected string', file => {
    const filePath = resolvePath(__dirname, `./fixtures/${file}`)
    const fileContent = readFileSync(filePath).toString()
    const { customBlocks: blocks } = parseComponent(fileContent)

    const code = process({ blocks, vueOptionsNamespace: '__vue__options__', filename: filePath })

    expect(code).toMatchSnapshot(file)
  })
})
