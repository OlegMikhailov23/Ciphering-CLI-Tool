const fs = require('fs');
const {stdout, stderr, stdin} = process;
const dateNow = require('./utils/dateNow');
const stream = require('stream');
const cesarEncodeStream = require('./streams/cesarEncodeStream');
const cesarDecodeStream = require('./streams/cesarDecodeStream');
const atbashStream = require('./streams/atbashStream');
const rotEncodeStream = require('./streams/rotEncodeStream');
const rotDecodeStream = require('./streams/rotDecodeStream');
const {pipeline} = require('stream');
const parseArgs = require('./utils/parseArgs');
const validateProgram = require('./utils/validatePrograms');
const readline = require('readline');
const args = require("./args");
const Readable = require('stream').Readable

const CODEC_STREAM = {
    C1: cesarEncodeStream,
    C0: cesarDecodeStream,
    A: atbashStream,
    R1: rotEncodeStream,
    R0: rotDecodeStream,
};

const superArgs = parseArgs(args);

let readInputStream;
let writeOutputStream;

validateProgram(superArgs.config);
const codeProgramsArr = superArgs.config.split('-').map(program => new CODEC_STREAM[program]);

const start = () => {
    pipeline(
        readInputStream,
        ...codeProgramsArr,
        writeOutputStream,
        (err) => {
            if (err) {
                stderr.write(`${dateNow()} pipeline failed with error: ${err} \n`);
            } else {
                stdout.write(`${dateNow()} Done 🤘👀.\n`)
            }
        }
    );
}

if (!superArgs.inputFile && superArgs.outputFile) {
    writeOutputStream = fs.createWriteStream(superArgs.outputFile,
        {flags: 'a'}
    )
    let rl = readline.createInterface({
        input: stdin,
        output: stdout,
    });

    rl.question(`${dateNow()} Please inter a string ➡️ `, function saveInput(string) {
        readInputStream = new Readable();
        readInputStream.push(`${string}\n`);
        readInputStream.push(null);
        rl.close();
    });

    rl.on("close", function saveInput() {

        start();
    });
}

if (superArgs.inputFile && !superArgs.outputFile) {
    writeOutputStream = new stream.Writable();
    readInputStream = fs.createReadStream(superArgs.inputFile);
    writeOutputStream._write = function (chunk, encoding, done) {
        stdout.write(`Look at result ✅ : ${chunk.toString()} \n`);
        done();
    };

    start()
}

if (superArgs.inputFile && superArgs.outputFile) {
    readInputStream = fs.createReadStream(superArgs.inputFile);
    writeOutputStream = fs.createWriteStream(superArgs.outputFile,
        {flags: 'a'}
    )

    start();
}
