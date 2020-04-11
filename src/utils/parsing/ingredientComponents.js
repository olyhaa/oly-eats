export const regexOptional = /^(optional|\(\W*optional\W*\)$)/i;

export const unitsOfMeasure = {
  tablespoon: ['T', 'Tbs', 'tbs', 'Tbsp', 'tbsp'],
  teaspoon: ['t', 'Tsp', 'tsp'],
  cup: ['C', 'c'],
  pint: ['pt', 'PT', 'Pt'],
  quart: ['QT', 'Qt', 'qt'],
  pinch: [],
  little: ['bit'],
  clove: [],
  dash: [],
  gallon: ['Gal', 'GAL', 'gal'],
  ounce: ['oz', 'Oz', 'OZ'],
  milliliter: ['ml', 'mL'],
  liter: ['L', 'l'],
  inch: ['"', 'in', 'In', 'IN'],
  millimeter: ['mm'],
  centimeter: ['cm'],
  whole: [],
  half: [],
  can: [],
  bottle: [],
  large: ['lg', 'LG', 'Lg'],
  package: ['pkg', 'Pkg', 'PKG'],
  pound: ['lb', 'Lb', 'LB'],
};

export const numbersRegex = /^([0-9]+[ ./0-9]*)/i;
export const parenRegex = /\(([^)]*?)\)/i;
export const rangeWordsRegex = /^([0-9]+[ ./0-9]*) *(to|-) *([0-9][ ./0-9]*)/i;

export const noiseWords = ['a', 'an', 'of'];

let flattenedList = [];
const unitsKeys = Object.keys(unitsOfMeasure);
const unitsTable = {};
unitsKeys.forEach((key) => {
  unitsTable[key] = key;
  flattenedList = flattenedList.concat(unitsOfMeasure[key]);
  unitsOfMeasure[key].forEach((alt) => {
    unitsTable[alt] = key;
  });
});

export const flattenedUnits = flattenedList;
export const unitsMap = unitsTable;
