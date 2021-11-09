const fs = require('fs');
const { stdout, stderr, exit } = process;
const cesarEncodeStream = require('./streams/cesarEncodeStream');
const cesarDecodeStream = require('./streams/cesarDecodeStream');
const atbashStream = require('./streams/atbashStream');
const rotEncodeStream = require('./streams/rotEncodeStream');
const rotDecodeStream = require('./streams/rotDecodeStream')
const args = require('./args');
const { pipeline } = require('stream');
const { promisify } = require('util');
const pipelineAsync = promisify(pipeline);

const checkPrograms = require('./utils/validatePrograms');

const [codeFlag, codeProgram, inputFlag, inputPoint, outputFlag, outputPoint] = args;
const CODEC_STREAM = {
    C1: cesarEncodeStream,
    C0: cesarDecodeStream,
    A: atbashStream,
    R1: rotEncodeStream,
    R0: rotDecodeStream,
};

const isCorrectProgram = checkPrograms();

if (!isCorrectProgram) {
    stderr.write('Попробуйте ещё раз запустить файл c командами С0, C1, A, R1 или R0  🛑\n');
    process.exit(1);
}

if (codeFlag !== '-c') {
    stderr.write('Попробуйте ещё раз запустить файл с флагом -c  🛑\n');
    process.exit(1);
}

if (inputFlag !== '-i') {
    stderr.write('Укажите входной файл с флагом -i  🛑\n');
    process.exit(1);
}

if (outputFlag !== '-o') {
    stderr.write('Укажите выходной файл с флагом -o  🛑\n');
    process.exit(1);
}

let readStream = fs.createReadStream(inputPoint);
let writeStream = fs.createWriteStream(outputPoint);

const codeProgramsArr = codeProgram.split('-').map(program => new CODEC_STREAM[program]);

(async function start() {
    try{
        await pipelineAsync(
            readStream,
            ...codeProgramsArr,
            writeStream,
        );
        stdout.write(`Done 🤘👀. Программа кодировки: ${codeProgram}\n`);
    }
    catch(err) {
        stderr.write('pipeline failed with error:', err);
    }
})();
