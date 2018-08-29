let trimming = (x) => String(x).replace(/^\s+|\s+$/gm, '');
let isEmpty = (x) => (x === null || x === undefined ||
    trimming(x) === '') ? true : false;


module.exports = {
    trimming: trimming,
    isEmpty: isEmpty
}