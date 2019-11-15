import * as fs from 'fs'
import * as path from 'path'
import transformer from '../src/transform'

import { Config } from '@jest/types'

const files = ['default.vue', 'json.vue', 'yaml.vue', 'json5.vue']
const targets = files.map(file => ({
  content: fs.readFileSync(path.resolve(__dirname, `./fixtures/${file}`)).toString(),
  file
}))

const mockConfig = {
  moduleFileExtensions: []
}

test('transform', () => {
  targets.forEach(target => {
    const ret = transformer.process(target.content, target.file, (mockConfig as unknown) as Config.ProjectConfig)
    const code = (typeof ret === 'string' ? ret : ret.code)
    expect(code).toMatchSnapshot(target.file)
  })
})
