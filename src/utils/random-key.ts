
export const RandomKey = function() {
    let length:number = 24,
        charset:string = "abcdefghijklmnopqrstuvwxyz0123456789",
        count:number = charset.length,
        retVal:string = "";
    for (let i = 0, n = count; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

