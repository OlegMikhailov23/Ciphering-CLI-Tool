const rotCoder = (str, toDo) => {
    str = [...str];
    let result= []
    if (toDo === 'R1') {
        result = str.map(char => {
            const asciiNum = char.charCodeAt();
            if ((asciiNum >= 65 && asciiNum <= 82) || (asciiNum >= 97 && asciiNum <= 114 )) {
                return String.fromCharCode(asciiNum + 8);
            }
            else if ((asciiNum > 80 && asciiNum <= 90) || (asciiNum > 112 && asciiNum <= 122 )) {
                return String.fromCharCode(asciiNum -18);
            }
            return char
        })
    } else if (toDo === 'R0') {
        result = str.map(char => {
            const asciiNum = char.charCodeAt();
            if ((asciiNum >= 65 && asciiNum < 73) || (asciiNum >= 97 && asciiNum < 105)) {
                return String.fromCharCode(asciiNum + 18);
            }
            else if ((asciiNum >= 73 && asciiNum <= 90) || (asciiNum >= 105 && asciiNum <= 122 )) {
                return String.fromCharCode(asciiNum - 8);
            }
            return char
        })
    }

    return result.join('');

}

module.exports = rotCoder;
