module.exports.clone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};