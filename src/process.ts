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
  vueOptionsNamespace: string
  /** The SFC file being processed */
  filename: string
}

const VUE_I18N_OPTION = '__i18n'

/**
 * Process vue-i18n contents inside of a custom block and prepare it for execution in a testing environment.
 */
export default function process ({ blocks, vueOptionsNamespace, filename }: ProcessParameter) : string {
  const i18nResources = blocks.map(block => {
    if (block.type !== 'i18n') return

    const value = parseI18nBlockToJSON(block, filename)
      .replace(/\u2028/g, '\\u2028') // LINE SEPARATOR
      .replace(/\u2029/g, '\\u2029') // PARAGRAPH SEPARATOR
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
    return `'${value}'`
  }).filter((s): s is string => !!s)

  // vueOptions.__i18n = [
  // '<json encoded block 1>',
  // '<json encoded block 2>'
  // ]
  const i18nOption = `${vueOptionsNamespace}.${VUE_I18N_OPTION}`
  const code = i18nResources.length ? `${i18nOption} = [\n${i18nResources.join(',\n')}\n]` : ''
  debug('generatedCode', code)
  return code
}

/**
 * Parse custom `<i18n>` block content to JSON string.
 * @param block SFC block returned from `@vue/component-compiler-utils`
 * @param filename The SFC file being processed
 */
function parseI18nBlockToJSON (block: SFCCustomBlock, filename: string): string {
  const lang = block.attrs && block.attrs.lang
  const locale = block.attrs && block.attrs.locale
  const src = block.attrs && block.attrs.src
  const content = src
    ? readFileSync(getAbsolutePath(src, filename)).toString()
    : block.content

  return convertToJSON(content, lang, locale)
}

/**
 * Convert JSON/YAML/JSON5 to minified JSON string.
 * @param source JSON/YAML/JSON5 encoded string
 * @param lang Language used in `source`. Supported JSON, YAML or JSON5.
 * @param locale Attribute "locale" on <i18n> block will be added.
 * @returns {string} A minified JSON string
 */
function convertToJSON (source: string, lang: string, locale: string): string {
  const stringify = locale
    ? (parseResult: any) => JSON.stringify({ [locale]: parseResult })
    : JSON.stringify

  switch (lang) {
    case 'yaml':
    case 'yml':
      return stringify(parseYAML(source))
    case 'json5':
      return stringify(parseJSON5(source))
    default: // fallback to 'json'
      return stringify(JSON.parse(source))
  }
}

function getAbsolutePath (src: string, fileName: string): string {
  return isAbsolutePath(src) ? src : resolvePath(fileName, '../', src)
}
