const { stderr } = process;
const { Transform } = require('stream');
const atbashCoder = require('../codecs/atbashCoder');

class AtbashStream extends Transform {
    _transform(chunk, encoding, done) {
        try {
            const initialString = chunk.toString('utf-8');
            const resultString = atbashCoder(initialString);
            done(null, resultString);
        } catch (err) {
            stderr.write(err)
        }
    }

}

module.exports = AtbashStream;
