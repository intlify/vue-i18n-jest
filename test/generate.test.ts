import * as fs from 'fs'
import * as path from 'path'
import { parseComponent } from 'vue-template-compiler'
import generate from '../src/generate'

const files = ['default.vue', 'json.vue', 'yaml.vue', 'json5.vue']
const targets = files.map(file => ({
  content: fs.readFileSync(path.resolve(__dirname, `./fixtures/${file}`)).toString(),
  file
}))

test('generate', () => {
  targets.forEach(target => {
    const { customBlocks } = parseComponent(target.content, { pad: true })
    const code = generate(customBlocks)
    expect(code).toMatchSnapshot(target.file)
  })
})
