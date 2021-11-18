const {stdout, stderr} = process;
const dateNow = require('./dateNow')
const programs = require('../consts/programs');
const allowedProgram = [programs.atbashCoder, programs.rotDecode, programs.cesarDecode, programs.cesarEncode, programs.rotEncode];
const parseArgs = require('./parseArgs');
const args = require("../args");

const superArgs = parseArgs(args);

const validatePrograms = () => {
    superArgs.config.split('-').forEach(program => {
        if (!allowedProgram.includes(program)) {
            stderr.write(`${dateNow()} Try to set config with С0, C1, A, R1 or  🤹‍🔴️\n`);
            process.exit(1);
        }
    });
    stdout.write(`${dateNow()} Config have been validated 🟢 \n`);
}

module.exports = validatePrograms;
