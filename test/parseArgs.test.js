const parseArgs = require('../utils/parseArgs');
const validatePrograms = require('../utils/validatePrograms')
const errorCasesMock = require('../test/mock/errorCasesMock');
const successCasesMock = require('../test/mock/successCasesMock');
test('Should check parsing', () => {
    expect(parseArgs(errorCasesMock.case1)).toEqual({
            config: 'C1-C0',
            inputFile: './input.txt',
            outputFile: './output.txt'
        }
    );
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
});

describe('Success scenarios from task', () => {
    test('Should pass corrrect sequence of symbols as argument for --config that matches regular expression', () =>{
        const spy = jest.spyOn(process.stdout, 'write');
            validatePrograms(successCasesMock.case1);
        expect(spy.mock.calls).toEqual([[`Config have been validated 🟢 \n`]]);

        spy.mockRestore();
    })
})
