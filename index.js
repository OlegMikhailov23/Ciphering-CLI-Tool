const fs = require('fs');
const { stdout, stderr, exit } = process;
const coder = require('./coder');
const args = require('./args');
const checkPrograms = require('./utils/validatePrograms')


const [codeFlag, codeProgram, inputFlag, inputPoint, outputFlag, outputPoint] = args;

const codeProgramsArr = codeProgram.split('-');

const isCorrectProgram = !checkPrograms(codeProgramsArr).includes(false);

if (!isCorrectProgram) {
    stderr.write('Попробуйте ещё раз запустить файл c командами С0, C1, A, R1 или R0  🛑\n');
    exit();
}

if (codeFlag !== '-c') {
    stderr.write('Попробуйте ещё раз запустить файл с флагом -c  🛑\n');
    exit();
}

if (inputFlag !== '-i') {
    stderr.write('Укажите входной файл с флагом -i  🛑\n');
    exit();
}

if (outputFlag !== '-o') {
    stderr.write('Укажите выходной файл с флагом -o  🛑\n');
    exit();
}

let readStream = fs.createReadStream(inputPoint, 'utf-8');
let writeStream = fs.createWriteStream(outputPoint);

readStream
    .pipe(coder)
    .pipe(writeStream)
    .on('finish', () => {
    stdout.write(`Done 🤘👀. Программа кодировки: ${codeProgram}\n`);
    exit();
    }
);
