const programs = require('../consts/programs');


const allowedProgram = [programs.atbashCoder, programs.rotDecode, programs.cesarDecode, programs.cesarEncode, programs.rotEncode]

const validatePrograms = (programs) => programs.map(program => {
        if (!allowedProgram.includes(program)) {
            return false;
        }
    }
);

module.exports = validatePrograms;
