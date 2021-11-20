const fs = require('fs');
const programs = require('../consts/programs');
const { stderr } = process;
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

const parseArgs = (inputArgs) => {
    const args = {};
    let countConfig = 0;
    let countPoints = 0;

    inputArgs.forEach((arg, idx) => {
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
            if (!args.config) {
                args.config = inputArgs[idx + 1];
            } else {
                stderr.write(`Must be only 1 argument --config or -c 🔴\n`);
                process.exit(1);
            }
        }

        if ((arg === '--input' || arg === '-i') && isFile.test(inputArgs[idx + 1])) {
            if (!args.inputFile) {
                args.inputFile = inputArgs[idx + 1];
            } else {
                stderr.write(`${dateNow()} Must be only 1 argument --input or -i 🔴\n`);
                process.exit(1);
            }
        } else if (arg === '--input' || arg === '-i') {
            stderr.write(`Must be only 1 argument --input or -i 🔴\n`);
            process.exit(1);
        }

        if ((arg === '--output' || arg === '-o') && isFile.test(inputArgs[idx + 1]) === true) {
            if (!args.outputFile) {
                args.outputFile = inputArgs[idx + 1];
            } else {
                stderr.write(`Must be only 1 argument --output or -o 🔴\n`);
                process.exit(1);
            }
        } else if (arg === '--output' || arg === '-o') {
            stderr.write(`Must be only 1 argument --output or -o 🔴\n`);
            process.exit(1);
        }
    });
    if (countConfig > 1) {
        stderr.write(`Must be only 1 argument after -c or --config 🔴\n`);
        process.exit(1);
    }

    if (countPoints > 2) {
        stderr.write(`Must be only 1 argument after -i or -o 🔴\n`);
        process.exit(1);
    }

    const isInputExist = fs.existsSync(args.inputFile);
    const isOutputExist = fs.existsSync(args.outputFile);

    if (isInputExist === false && args.inputFile !== undefined) {
        stderr.write(`Invalid path of input file 🚫🛻\n`);
        process.exit(1);
    }

    if (isOutputExist === false && args.outputFile !== undefined) {
        stderr.write(`Invalid path of output file 🚫🛻\n`);
        process.exit(1);
    }

    if (!args.config) {
        stderr.write(`Must be atleast one config 🔴\n`);
        process.exit(1);
    }

    return args;
}

module.exports = parseArgs;
