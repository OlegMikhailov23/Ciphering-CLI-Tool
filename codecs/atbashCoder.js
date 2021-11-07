const atbashCoder = (str) => {
    str = [...str];
    let result = str.map(char => {
            const asciiNum = char.charCodeAt();
            if (asciiNum >= 65 && asciiNum <= 90) {
                return String.fromCharCode(65 + (90 - asciiNum));
            }
            if (asciiNum >= 97 && asciiNum <= 122) {
                return String.fromCharCode(97 + (122 - asciiNum));
            }
            return char
        })

    return result.join('');

}

module.exports = atbashCoder;
