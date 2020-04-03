export const regexOptional = /^(optional|\(\W*optional\W*\)$)/i;

export const unitsOfMeasure = {
  tablespoon: ['T', 'Tbs', 'tbs', 'Tbsp', 'tbsp'],
  teaspoon: ['t', 'Tsp', 'tsp'],
  cup: ['C', 'c'],
  pint: ['pt', 'PT', 'Pt'],
  quart: ['QT', 'Qt', 'qt'],
  pinch: [],
  little: [],
  dash: [],
  gallon: ['Gal', 'GAL', 'gal'],
  ounce: ['oz', 'Oz', 'OZ'],
  milliliter: ['ml'],
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
  pound: ['lb', 'Lb', 'LB']
};

export const fluidicWords = ['fluid', 'fl'];

export const regexToWords = / *(to([ 0-9]+)|- *)/i;

export const noiseWords = ['a', 'of'];
