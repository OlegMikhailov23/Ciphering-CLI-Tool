const cesarEncode = (str) => {
    str = [...str];
    let result = str.map(char => {
        const asciiNum = char.charCodeAt();
        if (asciiNum >= 65 && asciiNum < 90 || asciiNum >= 97 && asciiNum < 122) {
            return String.fromCharCode(asciiNum + 1);
        }
        if (asciiNum === 90 || asciiNum === 122) {
            return String.fromCharCode(asciiNum - 25);
        }
        return char
    })

    return result.join('');
}

module.exports = cesarEncode;
