const { stderr, stdout } = process;
const { Transform } = require('stream');
const atbashCoder = require('../codecs/atbashCoder');
const dateNow = require('../utils/dateNow');

class AtbashStream extends Transform {
    _transform(chunk, encoding, done) {
        try {
            const initialString = chunk.toString('utf-8');
            const resultString = atbashCoder(initialString);
            stdout.write(`${dateNow()} Use atbash 🔸 \n`)
            done(null, resultString);
        } catch (err) {
            stderr.write(err)
        }
    }

}

module.exports = AtbashStream;
