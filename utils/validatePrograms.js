const programs = require('../consts/programs');
const [codeProgram] = process.argv;
const allowedProgram = [programs.atbashCoder, programs.rotDecode, programs.cesarDecode, programs.cesarEncode, programs.rotEncode];

const validatePrograms = () => codeProgram.split('-').map(program => {
        if (allowedProgram.includes(program)) {
            return true;
        }

        return false;
    }
);

module.exports = validatePrograms;
