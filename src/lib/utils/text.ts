export const capitalize = (text: string): string => {
    const lower = text.toLowerCase()
    let s = ''
    for (let i = 0; i < lower.length; i++) {
        if (lower[i - 1] === " " || i === 0) {
            s += lower.charAt(i).toUpperCase()
        } else {
            s += lower[i]
        }
    }
    return s;
}