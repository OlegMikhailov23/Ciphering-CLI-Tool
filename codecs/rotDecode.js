const rotDecode = (str, toDo) => {
    str = [...str];
    let result = str.map(char => {
        const asciiNum = char.charCodeAt();
        if ((asciiNum >= 65 && asciiNum < 73) || (asciiNum >= 97 && asciiNum < 105)) {
            return String.fromCharCode(asciiNum + 18);
        } else if ((asciiNum >= 73 && asciiNum <= 90) || (asciiNum >= 105 && asciiNum <= 122)) {
            return String.fromCharCode(asciiNum - 8);
        }
        return char
    })

    return result.join('');
}

module.exports = rotDecode;
