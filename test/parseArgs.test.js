const parseArgs = require('../utils/parseArgs');
const mock = require('../test/mock/parseArgsMock');

test('Should check parsing', () => {
    expect(parseArgs(mock.case1)).toEqual({
            config: 'C1-C0',
            inputFile: './input.txt',
            outputFile: './output.txt'
        }
    );
});

test('Should be error with duplicate -c or --config args ', () => {
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {
    });
    parseArgs(mock.case2);
    expect(mockExit).toHaveBeenCalledWith(1);
});

test('Should be error with duplicate -o or --output args ', () => {
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {
    });
    parseArgs(mock.case3);
    expect(mockExit).toHaveBeenCalledWith(1);
});

test('Should be error with duplicate -i or --input args ', () => {
    const mockExit = jest.spyOn(process.stderr, 'write').mockImplementation(() => {
    });
    const error = `Must be only 1 argument --input or -i 🔴\n`;
    parseArgs(mock.case4);
    expect(mockExit).toHaveBeenCalledWith(error);
});








