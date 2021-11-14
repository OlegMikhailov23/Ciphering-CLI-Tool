const { stderr, stdout } = process;
const { Transform } = require('stream');
const cesarDecode = require('../codecs/cesarDecode');
const dateNow = require('../utils/dateNow');

class CesarDecodeStream extends Transform {
    _transform(chunk, encoding, done) {
        try {
            const initialString = chunk.toString('utf-8');
            const resultString = cesarDecode(initialString);
            stdout.write(`${dateNow()} Use Cesar Decode 🛡 \n`)
            done(null, resultString);
        } catch (err) {
            stderr.write(err)
        }
    }

}

module.exports = CesarDecodeStream;
