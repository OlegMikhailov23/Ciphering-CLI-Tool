const errorCases = {
    case1: ['-c', 'C1-C0', '-i', './input.txt', '-o' ,'./output.txt'],
    case2: ['-c', '-c', 'C1-C0', '-i', './input.txt', '-o' ,'./output.txt'],
    case3: ['-i', './input.txt', '-o','./output.txt'],
    case4: ['-c ', 'C1-C0', '-c', 'C1','-i', './input.txt', '-o','./output.txt'],
    case5: ['-i', './input.tx', '-c', 'C1-C0', '-o', './output.txt'],
    case6: ['-i', './input.txt', '-c', 'C1-C0', '-o', './output.tx'],
    case7: 'C1-C2',
    case8: ['-i','--input', './input.txt', '-c', 'C1-C0', '-o', './output.tx'],
    case9: ['-c','R0', '-i','./input.txt','-o', './output.tx', '--output'],
}

module.exports = errorCases;
