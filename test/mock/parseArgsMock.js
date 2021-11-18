module.exports = {
    case1: ['-c', 'C1-C0', '-i', './input.txt', '-o' ,'./output.txt'],
    case2: ['-c', '-c', 'C1-C0', '-i', './input.txt', '-o' ,'./output.txt'],
    case3: ['-c ', 'C1-C0', '-i', './input.txt', '-o','./output.txt', '-o'],
    case4: ['-c ', 'C1-C0', '-i', '-i', './input.txt', '-o','./output.txt', '-o'],
    case5: ['-i', './input.txt', '-c', 'C1-C0', '-o', './output.txt'],
}
