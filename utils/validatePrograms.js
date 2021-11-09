const programs = require('../consts/programs');
const codeProgram = process.argv[3];
const allowedProgram = [programs.atbashCoder, programs.rotDecode, programs.cesarDecode, programs.cesarEncode, programs.rotEncode];

const validatePrograms = () => {
    let result = true;
    codeProgram.split('-').forEach(program => {
        if (!allowedProgram.includes(program)) {
            result = false;
        }
    });
    return result;
}

module.exports = validatePrograms;
