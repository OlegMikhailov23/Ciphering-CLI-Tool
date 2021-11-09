const rotEncode = (str) => {
    str = [...str];
    let result = str.map(char => {
        const asciiNum = char.charCodeAt();
        if ((asciiNum >= 65 && asciiNum <= 82) || (asciiNum >= 97 && asciiNum <= 114)) {
            return String.fromCharCode(asciiNum + 8);
        } else if ((asciiNum > 80 && asciiNum <= 90) || (asciiNum > 112 && asciiNum <= 122)) {
            return String.fromCharCode(asciiNum - 18);
        }
        return char
    })

    return result.join('');
}

module.exports = rotEncode;
