const { stderr } = process;
const { Transform } = require('stream');
const cesarDecode = require('../codecs/cesarDecode');

class CesarDecodeStream extends Transform {
    _transform(chunk, encoding, done) {
        try {
            const initialString = chunk.toString('utf-8');
            const resultString = cesarDecode(initialString);
            done(null, resultString);
        } catch (err) {
            stderr.write(err)
        }
    }

}

module.exports = CesarDecodeStream;
