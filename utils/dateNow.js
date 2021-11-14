const dateNow = () => {
    return `[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}]`
}

module.exports = dateNow;
