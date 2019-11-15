"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vueJest = require('vue-jest'); // vue-jest does not also provide types ...
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const crypto_1 = require("crypto");
const vue_template_compiler_1 = require("vue-template-compiler");
const debug_1 = require("debug");
const generate_1 = __importDefault(require("./generate"));
const THIS_FILE = fs.readFileSync(__filename);
const debug = debug_1.debug('vue-i18n-jest');
debug(`getCacheKey: ${vueJest.getCacheKey ? 'vue-jest' : 'vue-i18n-jest'}`);
function jestProcess(sourceText, sourcePath, config, options) {
    const { code, map } = vueJest.process(sourceText, sourcePath, config, options);
    const { customBlocks } = vue_template_compiler_1.parseComponent(sourceText, { pad: true });
    let coding = ';\n';
    if (customBlocks) {
        coding += generate_1.default(customBlocks);
    }
    const retCode = code + coding;
    debug('process', retCode);
    return { code: retCode, map };
}
function getCacheKey(fileData, filePath, configStr, options) {
    const hash = crypto_1.createHash('md5')
        .update(THIS_FILE)
        .update('\0', 'utf8')
        .update(fileData)
        .update('\0', 'utf8')
        .update(path.relative(options.rootDir, filePath))
        .update('\0', 'utf8')
        .update(configStr)
        .update('\0', 'utf8')
        .update(process.env.NODE_ENV || '')
        .digest('hex');
    debug('getCacheKey', hash);
    return hash;
}
const transformer = {
    getCacheKey: vueJest.getCacheKey || getCacheKey,
    process: jestProcess
};
exports.default = transformer;
