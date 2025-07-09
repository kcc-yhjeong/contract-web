export const isString = (value: unknown): boolean => {
    return typeof value === 'string';
};

export const isNumber = (value: unknown): boolean => {
    return typeof value === 'number' && !isNaN(value);
};

export const isInRange = (value: number, min: number, max: number): boolean => {
    return value >= min && value <= max;
};

export const isRegex = (value: string, regex: RegExp): boolean => {
    return regex.test(value);
};
