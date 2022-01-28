export function from10Int2Css(num: number): string {
    let color16 = num.toString(16);
    if (color16.length < 6) {
        for (let i = 0; i < 6 - color16.length; i++) {
            color16 = `0${color16}`;
        }
    }
    return `#${color16}`
}