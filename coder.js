const { Transform } = require('stream');
const args = require('./args');


class Coder extends Transform {
    _transform(chunk, encoding, callback) {
        try {
            console.log(chunk.toString('utf-8').split(''), args);
            const resultString = `*${chunk.toString('utf-8')}*`;
            callback(null, resultString);
        } catch (err) {
            callback(err);
        }
    }
}

const coder = new Coder();

module.exports = coder;
