export const formatNumber = (number: number | undefined): string => {
    if (number === undefined || isNaN(number)) {
        return ' ';
      }
    const match = number.toString().match(/^[+-]?0\.(0*)/);
    if (match === null) {
        const expMatch = number.toString().match(/(^[+-]?[1-9]\.[0-9]*)([eE][-+][0-9]*)/);
        if (expMatch === null) {
            const abbreviations = ['', 'k', 'm', 'b', 't'];
            const index = Math.floor(Math.log10(Math.abs(number) === 0 ? 1 : Math.abs(number)) / 3);
            const abbreviation = abbreviations[index];
            const value = (number / (10 ** (index * 3))).toFixed(2);
            return `${value}${abbreviation}`;
        } else {
            return `${parseFloat(expMatch[1]).toFixed(2)}${expMatch[2]}`;
        }
    }
    return number.toFixed(2 + match[1].length);
}