"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const json5_1 = __importDefault(require("json5"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const debug_1 = require("debug");
// constants
exports.VUE_OPTIONS = '__vue__options__';
exports.VUE_I18N_OPTION = '__i18n';
const defaultLang = 'json';
const debug = debug_1.debug('vue-i18n-jest');
function generate(blocks) {
    const base = `${exports.VUE_OPTIONS}.${exports.VUE_I18N_OPTION} = []`;
    const codes = blocks.map(block => {
        if (block.type === 'i18n') {
            const lang = (block.attrs && block.attrs.lang) || defaultLang;
            // const lang = block.attrs?lang ?? defaultLang
            const data = convert(block.content, lang);
            const value = JSON.stringify(JSON.parse(data))
                .replace(/\u2028/g, '\\u2028')
                .replace(/\u2029/g, '\\u2029')
                .replace(/\\/g, '\\\\');
            return `${exports.VUE_OPTIONS}.${exports.VUE_I18N_OPTION}.push('${value.replace(/\u0027/g, '\\u0027')}')`;
        }
        else {
            return '';
        }
    });
    const code = [base].concat(codes).join('\n');
    debug('genrateCode', code);
    return code;
}
exports.default = generate;
function convert(source, lang) {
    switch (lang) {
        case 'yaml':
        case 'yml':
            return JSON.stringify(js_yaml_1.default.safeLoad(source), undefined, '\t');
        case 'json5':
            return JSON.stringify(json5_1.default.parse(source));
        default:
            return source;
    }
}
