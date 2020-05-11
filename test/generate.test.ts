import * as fs from 'fs'
import * as path from 'path'
import { parseComponent } from 'vue-template-compiler'
import generate from '../src/generate'

const files = [
  'default.vue',
  'json.vue',
  'yaml.vue',
  'json5.vue',
  'json-locale-import.vue',
  'json5-locale-import.vue',
  'yaml-locale-import.vue'
]
const targets = files.map(file => {
  const sourcePath = path.resolve(__dirname, `./fixtures/${file}`)

  return {
    content: fs.readFileSync(sourcePath).toString(),
    sourcePath,
    file
  }
})

test('generate', () => {
  targets.forEach(target => {
    const { customBlocks } = parseComponent(target.content, { pad: true })
    const code = generate(customBlocks, target.sourcePath)
    expect(code).toMatchSnapshot(target.file)
  })
})
