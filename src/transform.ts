const vueJest = require('vue-jest') as Transformer // vue-jest does not also provide types ...
import * as fs from 'fs'
import * as path from 'path'
import { createHash } from 'crypto'
import { parseComponent } from 'vue-template-compiler'
import { debug as Debug } from 'debug'
import generate from './generate'

// impor jest types
import { Config } from '@jest/types'
import { RawSourceMap } from 'source-map'
import { Transformer } from '@jest/transform'
interface FixedRawSourceMap extends Omit<RawSourceMap, 'version'> {
  version: number
}
type TransformedSource = {
  code: string
  map?: FixedRawSourceMap | string | null
}
type TransformOptions = {
  instrument: boolean
}
type CacheKeyOptions = {
  config: Config.ProjectConfig
  instrument: boolean
  rootDir: string
}

const THIS_FILE = fs.readFileSync(__filename)

const debug = Debug('vue-i18n-jest')

debug(`getCacheKey: ${vueJest.getCacheKey ? 'vue-jest' : 'vue-i18n-jest'}`)

function jestProcess (
  sourceText: string,
  sourcePath: Config.Path,
  config: Config.ProjectConfig,
  options?: TransformOptions
): string | TransformedSource {
  const { code, map } = vueJest.process(sourceText, sourcePath, config, options) as TransformedSource
  const { customBlocks } = parseComponent(sourceText, { pad: true })

  let coding = ';\n'
  if (customBlocks) {
    coding += generate(customBlocks)
  }

  const retCode = code + coding
  debug('process', retCode)

  return { code: retCode, map }
}

function getCacheKey (
  fileData: string,
  filePath: Config.Path,
  configStr: string,
  options: CacheKeyOptions
): string {
  const hash = createHash('md5')
    .update(THIS_FILE)
    .update('\0', 'utf8')
    .update(fileData)
    .update('\0', 'utf8')
    .update(path.relative(options.rootDir, filePath))
    .update('\0', 'utf8')
    .update(configStr)
    .update('\0', 'utf8')
    .update(process.env.NODE_ENV || '')
    .digest('hex')
  debug('getCacheKey', hash)
  return hash
}

const transformer: Transformer = {
  getCacheKey: vueJest.getCacheKey || getCacheKey,
  process: jestProcess
}

export default transformer
