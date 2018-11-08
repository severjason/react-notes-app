// if array contains value - removes it from array
// else - adds it to array
export function toggleStringInArray(array: string[], value: string): string[] {
    return array.includes(value) ? array.filter((s: string) => s !== value) : array.concat(value);
}

// concat two arrays without duplicate values
export function concatArrayUnique(array1: string[], array2: string[]): string[] {
    return array1.concat(array2.filter((s: string) => !array1.includes(s)));
}

export const sortObjectArray = (field: string) => (a: object, b: object) => {
  let firstField = a[field].toUpperCase();
  let secondField = b[field].toUpperCase();
  if (firstField < secondField) {
    return -1;
  }
  if (firstField > secondField) {
    return 1;
  }
  return 0;
};

export function filterCategories (categories: object[]): object[] {
    const startArray: object[] = [{id: 'all', name: 'all'}];
    if (!Array.isArray(categories)) {
        return startArray;
    }
    return [...startArray, ...categories.sort(sortObjectArray('name'))];
}
