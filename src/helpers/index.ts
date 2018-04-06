export function toggleStringInArray(array: string[], value: string): string[] {
    return array.includes(value) ? array.filter((s: string) => s !== value) : array.concat(value);
}

export function concatArrayUnique(array1: string[], array2: string[]): string[] {
    return array1.concat(array2.filter((s: string) => !array1.includes(s)));
}
