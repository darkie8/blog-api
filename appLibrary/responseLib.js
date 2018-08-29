// response schema

let generate = (err, msg, stat, dt) => {
    return {
        error: err,
        message: msg,
        status: stat,
        dataOutput: dt
    };
}

module.exports = {
    generate: generate
}