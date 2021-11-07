const { Transform } = require('stream');
const cesar = require('./codecs/cesarCode');
const rot = require('./codecs/rot');
const args = require('./args');
const programsCode = require('./consts/programs');

class Coder extends Transform {
    getDecodedMessage(programs, str) {
        let tmp = str;
        programs.forEach(program => {
            switch (program) {
                case programsCode.cesarDecode:
                    tmp = cesar(tmp, programsCode.cesarDecode);
                    return;
                case programsCode.cesarEncode:
                    tmp = cesar(tmp, programsCode.cesarEncode);
                    return
                case programsCode.rotDecode:
                    tmp = rot(tmp, programsCode.rotDecode);
                    return;
                case programsCode.rotEncode:
                    tmp = rot(tmp, programsCode.rotEncode);
                    return;
                default:
                    break;
            }
        })
        return tmp;
    }

    _transform(chunk, encoding, callback) {
        try {
            const encoderProgram = args[1].split('-');
            const initialString = chunk.toString('utf-8')
            const resultString = this.getDecodedMessage(encoderProgram, initialString);
            callback(null, resultString);
        } catch (err) {
            callback(err);
        }
    }
}

const coder = new Coder();

module.exports = coder;
