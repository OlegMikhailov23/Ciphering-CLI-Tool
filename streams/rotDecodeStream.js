const { Transform } = require('stream');
const rotDecode = require('../codecs/rotDecode');
const { stderr } = process;

class RotDecodeStream extends Transform {
    _transform(chunk, encoding, done) {
        try {
            const initialString = chunk.toString('utf-8')
            const resultString = rotDecode(initialString);
            done(null, resultString);
        } catch (err) {
            stderr.write(err);
            done(err);
        }
    }
}

module.exports = RotDecodeStream;
