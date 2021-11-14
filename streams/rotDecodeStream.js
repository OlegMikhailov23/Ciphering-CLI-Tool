const { Transform } = require('stream');
const rotDecode = require('../codecs/rotDecode');
const { stderr, stdout } = process;
const dateNow = require('../utils/dateNow');

class RotDecodeStream extends Transform {
    _transform(chunk, encoding, done) {
        try {
            const initialString = chunk.toString('utf-8')
            const resultString = rotDecode(initialString);
            stdout.write(`${dateNow()} Use Rot Decode 📟 \n`)
            done(null, resultString);
        } catch (err) {
            stderr.write(err);
            done(err);
        }
    }
}

module.exports = RotDecodeStream;
