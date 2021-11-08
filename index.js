const fs = require('fs');
const { stdout, stderr, exit } = process;
const coder = require('./coder');
const args = require('./args');
const checkPrograms = require('./utils/validatePrograms');
const { pipeline } = require('stream');
const { promisify } = require('util');

const pipelineAsync = promisify(pipeline);


const [codeFlag, codeProgram, inputFlag, inputPoint, outputFlag, outputPoint] = args;

const codeProgramsArr = [ coder ];
const isCorrectProgram = !checkPrograms(codeProgram.split('-')).includes(false);

if (!isCorrectProgram) {
    stderr.write('Попробуйте ещё раз запустить файл c командами С0, C1, A, R1 или R0  🛑\n');
    process.exitCode = 1;
}

if (codeFlag !== '-c') {
    stderr.write('Попробуйте ещё раз запустить файл с флагом -c  🛑\n');
    process.exitCode = 1;
}

if (inputFlag !== '-i') {
    stderr.write('Укажите входной файл с флагом -i  🛑\n');
    process.exitCode = 1;
}

if (outputFlag !== '-o') {
    stderr.write('Укажите выходной файл с флагом -o  🛑\n');
    process.exitCode = 1;
}

let readStream = fs.createReadStream(inputPoint);
let writeStream = fs.createWriteStream(outputPoint);

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
        stderr.write('pipeline failed with error:');
    }
})();


