// if array contains value - removes it from array
// else - adds it to array
import { AppCategory, AppTag } from '../app/nav/interfaces';

export function toggleTagInArray(array: AppTag[], value: AppTag): any {
  return array.filter(tag => tag.id === value.id).length !== 0
    ? array.filter(tag => tag.id !== value.id)
    : array.concat(value);
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

export function filterCategories (categories: AppCategory[]): AppCategory[] {
    const startArray: AppCategory[] = [{id: 'all', name: 'all'}];
    if (!Array.isArray(categories)) {
        return startArray;
    }
    return [...startArray, ...categories.sort(sortObjectArray('name'))];
}
