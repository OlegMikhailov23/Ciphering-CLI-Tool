const cesarCode = (str, toDo) => {
    str = [...str];
    let result= []
    if (toDo === 'C1') {
        result = str.map(char => {
            const asciiNum = char.charCodeAt();
            if (asciiNum >= 65 && asciiNum <= 90 || asciiNum >= 97 && asciiNum <= 122 ) {
                return String.fromCharCode(asciiNum + 1);
            }
            return char
        })
    } else if (toDo === 'C0') {
        result = str.map(char => {
            const asciiNum = char.charCodeAt();
            if (asciiNum >= 65 && asciiNum <= 90 || asciiNum >= 97 && asciiNum <= 122 ) {
                return String.fromCharCode(asciiNum - 1);
            }
            return char
        })
    }

    return result.join('');

}

module.exports = cesarCode;
