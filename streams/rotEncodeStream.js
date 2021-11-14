const { Transform } = require('stream');
const rotEncode = require('../codecs/rotEncode');
const { stderr, stdout } = process;
const dateNow = require('../utils/dateNow');

class RotEncodeStream extends Transform {
    _transform(chunk, encoding, done) {
        try {
            const initialString = chunk.toString('utf-8')
            const resultString = rotEncode(initialString);
            stdout.write(`${dateNow()} Use Rot Encode 📟 \n`)
            done(null, resultString);
        } catch (err) {
            stderr.write(err);
            done(err);
        }
    }
}

module.exports = RotEncodeStream;
