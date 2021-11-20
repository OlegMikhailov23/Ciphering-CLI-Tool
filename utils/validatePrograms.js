const {stdout, stderr} = process;
const programs = require('../consts/programs');
const allowedProgram = [programs.atbashCoder, programs.rotDecode, programs.cesarDecode, programs.cesarEncode, programs.rotEncode];

const validatePrograms = (string) => {
    string.split('-').forEach(program => {
        if (!allowedProgram.includes(program)) {
            stderr.write(`Try to set config with С0, C1, A, R1 or  🤹‍🔴️\n`);
            process.exit(1);
        }
    });
    stdout.write(`Config have been validated 🟢 \n`);
}

module.exports = validatePrograms;
