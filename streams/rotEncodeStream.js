const { Transform } = require('stream');
const rotEncode = require('../codecs/rotEncode');
const { stderr } = process;

class RotEncodeStream extends Transform {
    _transform(chunk, encoding, done) {
        try {
            const initialString = chunk.toString('utf-8')
            const resultString = rotEncode(initialString);
            done(null, resultString);
        } catch (err) {
            stderr.write(err);
            done(err);
        }
    }
}

module.exports = RotEncodeStream;
