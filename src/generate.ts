import JSON5 from 'json5'
import yaml from 'js-yaml'
import { debug as Debug } from 'debug'

// type importing
import { SFCBlock } from 'vue-template-compiler'

// constants
export const VUE_OPTIONS = '__vue__options__'
export const VUE_I18N_OPTION = '__i18n'
const defaultLang = 'json'

const debug = Debug('vue-i18n-jest')

export default function generate (blocks: SFCBlock[]) {
  const base = `${VUE_OPTIONS}.${VUE_I18N_OPTION} = []`
  const codes = blocks.map(block => {
    if (block.type === 'i18n') {
      const lang = (block.attrs && block.attrs.lang) || defaultLang
      // const lang = block.attrs?lang ?? defaultLang
      const data = convert(block.content, lang)
      const value = JSON.stringify(JSON.parse(data))
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029')
        .replace(/\\/g, '\\\\')
      return `${VUE_OPTIONS}.${VUE_I18N_OPTION}.push('${value.replace(/\u0027/g, '\\u0027')}')`
    } else {
      return ''
    }
  })

  const code = [base].concat(codes).join('\n')
  debug('genrateCode', code)
  return code
}

function convert (source: string, lang: string): string {
  switch (lang) {
    case 'yaml':
    case 'yml':
      return JSON.stringify(yaml.safeLoad(source), undefined, '\t')
    case 'json5':
      return JSON.stringify(JSON5.parse(source))
    default:
      return source
  }
}
