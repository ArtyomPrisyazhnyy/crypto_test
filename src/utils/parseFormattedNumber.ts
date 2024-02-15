export const parseFormattedNumber = (formattedNumber: string): number => {
    const suffixes: Record<string, number> = {
        '': 1,
        k: 1e3,
        m: 1e6,
        b: 1e9,
        t: 1e12,
    };

    let numberPart = formattedNumber;
    let multiplier = 1;

    // Проверяем, есть ли суффикс в конце числа
    const suffix = formattedNumber.slice(-1).toLowerCase();
    if (suffix !== '' && isNaN(Number(suffix))) {
        numberPart = formattedNumber.slice(0, -1);
        multiplier = suffixes[suffix];
        if (!multiplier) {
            console.error(`Unsupported suffix: ${suffix}`);
            return NaN;
        }
    }

    return parseFloat(numberPart) * multiplier;
};
