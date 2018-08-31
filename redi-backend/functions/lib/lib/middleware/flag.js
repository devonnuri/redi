"use strict";
// tslint:disable
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFlag = () => {
    const arr = [...Array(50).keys()];
    const arr2 = [96, 111, 110, 109, 63, 96, 107, 33];
    return arr2
        .map((e, i) => {
        return String.fromCharCode(e ^ arr.slice(Number(process.env.START), Number(process.env.END))[i]);
    })
        .reverse()
        .join('');
};
//# sourceMappingURL=flag.js.map