const fs = require('fs');
const { stdout, stderr, exit } = process;
const coder = require('./coder');
const args = require('./args');


const [codeFlag, codeProgram, inputFlag, inputPoint, outputFlag, outputPoint] = args;


// Проверяем корректность введенных данных
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
// Проверяем корректность введенных данных

const codeProgramArr = codeProgram.split('-');

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


// const { stdout, stdin, exit } = process;
// const flag = process.argv[2];
// const allowedFlags = ['-m', '-s'];
//
// if (!allowedFlags.includes(flag)) {
//     stdout.write('Попробуйте ещё раз запустить файл с флагом -s или -m');
//     exit();
// }
//
// stdout.write('Введите два числа плиз!\n');
//
// stdin.on('data', data => {
//     const numString = data.toString();
//     const numStringsArray = numString.split(' ');
//     const hasIncorrectLength = numStringsArray.length !== 2;
//     const hasIncorrectValues = numStringsArray.some(numStr => Number.isNaN(+numStr));
//
//     if (hasIncorrectLength || hasIncorrectValues) {
//         stdout.write('Нужно ввести 2 числа, разделенных пробелом!\n');
//         exit();
//     }
//
//     const [firstNum, secondNum] = numStringsArray.map(numStr => +numStr);
//     if (flag === '-s') {
//         const sum = firstNum + secondNum;
//         stdout.write(`${firstNum} + ${secondNum} = ${sum}`);
//     } else {
//         const mult = firstNum * secondNum;
//         stdout.write(`${firstNum} * ${secondNum} = ${mult}`);
//     }
//     exit();
// })



