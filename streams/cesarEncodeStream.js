const { Transform } = require('stream');
const cesarEncode = require('../codecs/cesarEncode');
const { stderr, stdout } = process;
const dateNow = require('../utils/dateNow');

class CesarEncodeStream extends Transform {
    _transform(chunk, encoding, done) {
        try {
            const initialString = chunk.toString('utf-8')
            const resultString = cesarEncode(initialString);
            stdout.write(`${dateNow()} Use Cesar Encode 🛡 \n`)
            done(null, resultString);
        } catch (err) {
            stderr.write(err);
            done(err);
        }
    }
}

module.exports = CesarEncodeStream;
