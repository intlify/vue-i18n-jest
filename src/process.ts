import { readFileSync } from 'fs'
import { isAbsolute as isAbsolutePath, resolve as resolvePath } from 'path'

import { debug as Debug } from 'debug'
import { parse as parseJSON5 } from 'json5'
import { safeLoad as parseYAML } from 'js-yaml'
import type { SFCBlock } from 'vue-template-compiler'

const debug = Debug('vue-i18n-jest')

type SFCCustomBlock = Pick<SFCBlock, 'attrs' | 'content' | 'type'>

type ProcessParameter = {
  /** All of the blocks matching your type, returned from `@vue/component-compiler-utils` */
  blocks: SFCCustomBlock[]
  /** The internal namespace for a component's Vue Options in vue-jest */
  componentNamespace: string
  /** The SFC file being processed */
  filename: string
}

const VUE_I18N_OPTION = '__i18n'
const VUE_I18N_BLOCK_TYPE = 'i18n'

type JsonI18nBlockMessages = Record<string, unknown>

/**
 * Process vue-i18n contents inside of a custom block and prepare it for execution in a testing environment.
 */
export default function process ({ blocks, componentNamespace, filename }: ProcessParameter): string[] {
  const i18nOption = `${componentNamespace}.${VUE_I18N_OPTION}`
  const generatedCode = blocks
    .reduce((blocksValues, block) => {
      if (block.type !== VUE_I18N_BLOCK_TYPE) return blocksValues

      const i18nBlockConfig = {
        locale: (block.attrs && block.attrs.locale) || '',
        resource: parseI18nBlockToJSON(block, filename)
      }

      return blocksValues.concat(`${i18nOption}.push(${JSON.stringify(i18nBlockConfig)});`)
    }, [] as string[])

  if (generatedCode.length > 0) {
    generatedCode.unshift(`${i18nOption} = ${i18nOption} || [];`)
  }

  debug('generatedCode', generatedCode)

  return generatedCode
}

/**
 * Parse custom `<i18n>` block content to JSON string.
 * @param block SFC block returned from `@vue/component-compiler-utils`
 * @param filename The SFC file being processed
 */
function parseI18nBlockToJSON (block: SFCCustomBlock, filename: string): JsonI18nBlockMessages {
  const lang = block.attrs && block.attrs.lang
  const src = block.attrs && block.attrs.src
  const content = src
    ? readFileSync(getAbsolutePath(src, filename)).toString()
    : block.content

  return convertToJSON(content, lang)
}

/**
 * Convert JSON/YAML/JSON5 to minified JSON string.
 * @param source JSON/YAML/JSON5 encoded string
 * @param lang Language used in `source`. Supported JSON, YAML or JSON5.
 * @returns {string} A minified JSON string
 */
function convertToJSON (source: string, lang: string): JsonI18nBlockMessages {
  switch (lang) {
    case 'yaml':
    case 'yml':
      return parseYAML(source) as JsonI18nBlockMessages
    case 'json5':
      return parseJSON5(source)
    default: // fallback to 'json'
      return JSON.parse(source)
  }
}

function getAbsolutePath (src: string, fileName: string): string {
  return isAbsolutePath(src) ? src : resolvePath(fileName, '../', src)
}
