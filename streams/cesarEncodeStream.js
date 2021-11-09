const { Transform } = require('stream');
const cesarEncode = require('../codecs/cesarEncode');
const { stderr } = process;

class CesarEncodeStream extends Transform {
    _transform(chunk, encoding, done) {
        try {
            const initialString = chunk.toString('utf-8')
            const resultString = cesarEncode(initialString);
            done(null, resultString);
        } catch (err) {
            stderr.write(err);
            done(err);
        }
    }
}

module.exports = CesarEncodeStream;
