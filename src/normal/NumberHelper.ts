/**
 *
 * @param num 要转换的数字
 * @param fix 几位数
 */
export function number2Str(num: number, fix: number): string {
    let numS = `${num}`;
    for (let i = numS.length; i < fix; i++) {
        numS = "0" + numS
    }
    return numS
}