const { parseArgs, validateConfig } = require('../utils/parseArgs');
const validatePrograms = require('../utils/validatePrograms')
const errorCasesMock = require('../test/mock/errorCasesMock');
const successCasesMock = require('../test/mock/successCasesMock');
const coderMock = require('./mock/coderMock');
const cesarEncode = require('../codecs/cesarEncode');
const cesarDecode = require('../codecs/cesarDecode');
const atbashCoder = require('../codecs/atbashCoder');
const rotEncode = require('../codecs/rotEncode');
const rotDecode = require('../codecs/rotDecode');
const dateNow = require('../utils/dateNow');

describe('Initial test, to sure, that it works 👾', () => {
    test('Should check parsing', () => {
        expect(parseArgs(errorCasesMock.case1)).toEqual({
                config: 'C1-C0',
                inputFile: './input.txt',
                outputFile: './output.txt'
            }
        );
    });
});

describe('Error scenarios from task 🤖', () => {
    test('Should be error with duplicate -c or --config args, and the process should exit with non-zero status code', () =>{
        const spy = jest.spyOn(process.stderr, 'write');
        const mockExit = jest.spyOn(process, 'exit').mockImplementationOnce(() => {
            throw new Error('process.exit() was called.')
        });

        expect(() => {
            parseArgs(errorCasesMock.case2);
        }).toThrow('process.exit() was called.');
        expect(spy.mock.calls).toEqual([[`Must be only 1 argument --config or -c 🔴\n`]]);
        expect(process.exit).toHaveBeenCalledWith(1);
        mockExit.mockRestore();
        spy.mockRestore()
    })

    test('Should be error with user does not pass -c or --config argument, and the process should exit with non-zero status code', () =>{
        const spy = jest.spyOn(process.stderr, 'write');
        const mockExit = jest.spyOn(process, 'exit').mockImplementationOnce(() => {
            throw new Error('process.exit() was called.')
        });

        expect(() => {
            parseArgs(errorCasesMock.case3);
        }).toThrow('process.exit() was called.');
        expect(spy.mock.calls).toEqual([[`Must be atleast one config 🔴\n`]]);
        expect(process.exit).toHaveBeenCalledWith(1);
        mockExit.mockRestore();
        spy.mockRestore()
    })


    test('Should be error with duplicated option, and the process should exit with non-zero status code', () =>{
        const spy = jest.spyOn(process.stderr, 'write');
        const mockExit = jest.spyOn(process, 'exit').mockImplementationOnce(() => {
            throw new Error('process.exit() was called.')
        });

        expect(() => {
            parseArgs(errorCasesMock.case4);
        }).toThrow('process.exit() was called.');
        expect(spy.mock.calls).toEqual([[`Must be only 1 argument after -c or --config 🔴\n`]]);
        expect(process.exit).toHaveBeenCalledWith(1);
        mockExit.mockRestore();
        spy.mockRestore();
    })

    test('Should be error with non exist input file, and the process should exit with non-zero status code', () =>{
        const spy = jest.spyOn(process.stderr, 'write');
        const mockExit = jest.spyOn(process, 'exit').mockImplementationOnce(() => {
            throw new Error('process.exit() was called.')
        });

        expect(() => {
            parseArgs(errorCasesMock.case5);
        }).toThrow('process.exit() was called.');
        expect(spy.mock.calls).toEqual([[`Invalid path of input file 🚫🛻\n`]]);
        expect(process.exit).toHaveBeenCalledWith(1);
        mockExit.mockRestore();
        spy.mockRestore();
    })

    test('Should be error with non exist output file, and the process should exit with non-zero status code', () =>{
        const spy = jest.spyOn(process.stderr, 'write');
        const mockExit = jest.spyOn(process, 'exit').mockImplementationOnce(() => {
            throw new Error('process.exit() was called.')
        });

        expect(() => {
            parseArgs(errorCasesMock.case6);
        }).toThrow('process.exit() was called.');
        expect(spy.mock.calls).toEqual([[`Invalid path of output file 🚫🛻\n`]]);
        expect(process.exit).toHaveBeenCalledWith(1);
        mockExit.mockRestore();
        spy.mockRestore();
    })

    test('Should be error with incorrect symbols of argument for --config, and the process should exit with non-zero status code', () =>{
        const spy = jest.spyOn(process.stderr, 'write');
        const mockExit = jest.spyOn(process, 'exit').mockImplementationOnce(() => {
            throw new Error('process.exit(1) was called.')
        });

        expect(() => {
            validatePrograms(errorCasesMock.case7);
        }).toThrow('process.exit(1) was called.');
        expect(spy.mock.calls).toEqual([[`Try to set config with С0, C1, A, R1 or  🤹‍🔴️\n`]]);
        expect(process.exit).toHaveBeenCalledWith(1);
        mockExit.mockRestore();
        spy.mockRestore();
    })

    test('Should be error with duplicate -i or --input args', () =>{
        const spy = jest.spyOn(process.stderr, 'write');
        const mockExit = jest.spyOn(process, 'exit').mockImplementationOnce(() => {
            throw new Error('process.exit() was called.')
        });

        expect(() => {
            parseArgs(errorCasesMock.case8);
        }).toThrow('process.exit() was called.');
        expect(spy.mock.calls).toEqual([[`Must be only 1 argument --input or -i 🔴\n`]]);
        expect(process.exit).toHaveBeenCalledWith(1);
        mockExit.mockRestore();
        spy.mockRestore()
    })

    test('Should be error with duplicate -o or --output arguments', () =>{
        const spy = jest.spyOn(process.stderr, 'write');
        const mockExit = jest.spyOn(process, 'exit').mockImplementationOnce(() => {
            throw new Error('process.exit() was called.')
        });

        expect(() => {
            parseArgs(errorCasesMock.case9);
        }).toThrow('process.exit() was called.');
        expect(spy.mock.calls).toEqual([[`Must be only 1 argument --output or -o 🔴\n`]]);
        expect(process.exit).toHaveBeenCalledWith(1);
        mockExit.mockRestore();
        spy.mockRestore()
    })
});

describe('Success scenarios from task', () => {
    test('Should pass corrrect sequence of symbols as argument for --config that matches regular expression', () =>{
        const spy = jest.spyOn(process.stdout, 'write');
            validatePrograms(successCasesMock.case1);
        expect(spy.mock.calls).toEqual([[`Config have been validated 🟢 \n`]]);

        spy.mockRestore();
    })
})

describe('Ceasar code tests', () => {
    test('Should check cesar encode', () => {
        expect(cesarEncode(coderMock.case1)).toBe(
            'Iz njof obnf jt Dftbs!'

        );
    });

    test('Should check cesar encode', () => {
        expect(cesarEncode(coderMock.case2)).toBe(
            'Uftujoh jt bxtpnf, jt opu ju?'
        );
    });

    test('Should check cesar encode', () => {
        expect(cesarEncode(coderMock.case3)).toBe(
            'А если накидать русских буков и кучу знаков?).,::, Xibu xjmm zpvs dpefd ep xjui bmm pg ju?'
        );
    });

    test('Should check cesar encode', () => {
        expect(cesarEncode(coderMock.case4)).toBe(
            'b'

        );
    });

    test('Should check cesar decode', () => {
        expect(cesarDecode('Iz njof obnf jt Dftbs!')).toBe(
            coderMock.case1
        );
    });

    test('Should check cesar decode', () => {
        expect(cesarDecode('Uftujoh jt bxtpnf, jt opu ju?')).toBe(
            coderMock.case2
        );
    });

    test('Should check cesar decode', () => {
        expect(cesarDecode('А если накидать русских буков и кучу знаков?).,::, Xibu xjmm zpvs dpefd ep xjui bmm pg ju?')).toBe(
            coderMock.case3
        );
    });
})

describe('Atbash code tests', () => {
    test('Should check atbash encode', () => {
        expect(atbashCoder(coderMock.case1)).toBe(
            'Sb nrmv mznv rh Xvhzi!'
        );
    });

    test('Should check atbash encode', () => {
        expect(atbashCoder(coderMock.case2)).toBe(
            'Gvhgrmt rh zdhlnv, rh mlg rg?'
        );
    });

    test('Should check atbash encode', () => {
        expect(atbashCoder(coderMock.case3)).toBe(
            'А если накидать русских буков и кучу знаков?).,::, Dszg droo blfi xlwvx wl drgs zoo lu rg?'
        );
    });
})

describe('ROT code tests', () => {
    test('Should check ROT encode', () => {
        expect(rotEncode(coderMock.case1)).toBe(
            'Pg uqvm vium qa Kmaiz!'
        );
    });

    test('Should check ROT encode', () => {
        expect(rotEncode(coderMock.case2)).toBe(
            'Bmabqvo qa ieawum, qa vwb qb?'
        );
    });

    test('Should check ROT encode', () => {
        expect(rotEncode(coderMock.case3)).toBe(
            'А если накидать русских буков и кучу знаков?).,::, Epib eqtt gwcz kwlmk lw eqbp itt wn qb?'
        );
    });

    test('Should check ROT decode', () => {
        expect(rotDecode(coderMock.case1)).toBe(
            'Zq eafw fsew ak Uwksj!'
        );
    });

    test('Should check ROT decode', () => {
        expect(rotDecode(coderMock.case2)).toBe(
            'Lwklafy ak sokgew, ak fgl al?'
        );
    });

    test('Should check ROT decode', () => {
        expect(rotDecode(coderMock.case4)).toBe(
            's'
        );
    });
})

describe('Should check validation of config', () => {
    test('Should return true with: C1-C0', () => {
        const res = validateConfig('C1-C0')
        expect(res).toBe(
            true
        );
    });

    test('Should return true with: C1-C0-A-R0-R1-C1', () => {
        const res = validateConfig('C1-C0-A-R0-R1-C1')
        expect(res).toBe(
            true
        );
    });

    test('Should return false with: C1-C0-A-R0-R1-C1-AAA-C1', () => {
        const res = validateConfig('C1-C0-A-R0-R1-C1-AAA-C1')
        expect(res).toBe(
            false
        );
    });
})
describe('Should return correct date', () => {
    test('Try date', () => {
        const date = dateNow();
        expect(date).toEqual(
            `[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}]`
        );
    });
})
