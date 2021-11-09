export const RandomKey = function() {
    let length = 24,
        charset = "abcdefghijklmnopqrstuvwxyz0123456789",
        count = charset.length,
        retVal = "";
    for (let i = 0, n = count; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

