const programs = require('../consts/programs');
const {stdout, stderr} = process;
const allowedProgram = [programs.atbashCoder, programs.rotDecode, programs.cesarDecode, programs.cesarEncode, programs.rotEncode];
const dateNow = require('./dateNow')


const validatePrograms = (string) => {
    let result = true;
    string.split('-').forEach(program => {
        if (!allowedProgram.includes(program)) {
            result = false;
        }
    });

    return result;
}

const parseArgs = () => {
    const args = {};
    const allArgs = process.argv.slice(2, process.argv.length);
    let countConfig = 0;
    let countPoints = 0;

    allArgs.forEach((arg, idx) => {
        const isConfig = validatePrograms(arg);
        const isPoint = /.txt$/;
        const isFile = /\.[0-9a-z]+$/i
        if (isConfig) {
            countConfig += 1;
        }
        if (isPoint.test(arg)) {
            countPoints += 1;
        }
        if (arg === '--config' || arg === '-c') {
            args.config = allArgs[idx + 1];
        }

        if ((arg === '--input' || arg === '-i') && isFile.test(allArgs[idx + 1])) {
            if (!args.inputFile) {
                args.inputFile = allArgs[idx + 1];
            } else {
                stderr.write(`${dateNow()} Must be only 1 argument --input or -i 🔴\n`);
                process.exit(1);
            }
        }

        if ((arg === '--output' || arg === '-o') && isFile.test(allArgs[idx + 1]) === true) {
            if (!args.outputFile) {
                args.outputFile = allArgs[idx + 1];
            } else {
                stderr.write(`${dateNow()} Must be only 1 argument --output or -o 🔴\n`);
                process.exit(1);
            }
        }
    });
    if (countConfig > 1) {
        stderr.write(`${dateNow()} Must be only 1 argument after -c or --config 🔴\n`);
        process.exit(1);
    }
    if (countPoints > 2) {
        stderr.write(`${dateNow()} Must be only 1 argument after -i or -o 🔴\n`);
        process.exit(1);
    }
    stdout.write(`${dateNow()} Hooray, we have passed parser ✅ \n`);

    return args;
}

module.exports = parseArgs;
