/*
 * SCHEMA
 * <amount> <unit> [of] (<prep>) <ingredient> optional|(optional) (<prep>)
 *
 * Reference http://stackoverflow.com/questions/12413705/parsing-natural-language-ingredient-quantities-for-recipes
 */
import {
  unitsOfMeasure,
  noiseWords,
  regexToWords,
  fluidicWords,
  regexOptional
} from './ingredientComponents';
import Pluralize from 'pluralize';

const isNumeric = num => {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const isFraction = num => {
  return num.match(/^(\d+\W\d+\/\d+|\d+\/\d+)$/);
};

const isNumber = str => {
  return str.match(/^(\d+\W\d+\/\d+|\d+\/\d+|\d+\.\d+|\d+)/);
};

const properCase = str => {
  if (!str) {
    return str;
  }
  return str.replace(/\w\S*/g, txt => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

const checkForMatch = (len, section, within, offset) => {
  if (within.length - offset < len) {
    return false;
  }
  const seg = within
    .slice(offset, offset + len)
    .join(' ')
    .toLowerCase();
  if (seg === section) {
    return offset;
  }
  return checkForMatch(len, section, within, offset + 1);
};

let expandedUnits = [];
const unitsKeys = Object.keys(unitsOfMeasure);
const unitsTable = {};
unitsKeys.forEach(function(key) {
  expandedUnits = expandedUnits.concat(unitsOfMeasure[key]);
  unitsOfMeasure[key].forEach(function(alt) {
    unitsTable[alt] = key;
  });
});

const isUnitOfMeasure = value => {
  const val = Pluralize.singular(value);
  if (unitsOfMeasure[val.toLowerCase()] || expandedUnits.indexOf(val) > -1) {
    return true;
  }
  return false;
};

const unitExpander = unit => {
  let val = Pluralize.singular(unit);
  val = properCase(unitsTable[val.toLowerCase()] || unitsTable[val] || val);
  return val;
};

/*
const getNumber = from => {
  const part = from.shift();
  if (part) {
    if (isNumeric(part) || isFraction(part)) {
      return (part + ' ' + getNumber(from)).trim();
    }
    from.unshift(part);
  }
  return '';
};
*/

const getAmount = from => {
  let s = from.join(' ');
  const start = isNumber(s);
  if (start) {
    s = s.substr(start[0].length);
    const tmp = s.match(regexToWords);
    if (tmp) {
      if (!tmp[2]) {
        s = s.substr(tmp[0].length);
      }
      if (tmp[2] && isNumeric(tmp[2])) {
        s = s.substr(tmp[0].length - tmp[2].length).replace(/^ */, '');
      }
      const end = isNumber(s);
      if (end) {
        return {
          match: {
            min: start[1],
            max: end[1]
          },
          rest: s
            .substr(end[0].length)
            .trim()
            .split(' ')
        };
      }
    }
    return {
      match: start[1],
      rest: s.trim().split(' ')
    };
  }
  return false;
};

const findMatch = args => {
  const matchList = args.lookFor,
    matchIdx = checkForMatch(
      matchList.length,
      matchList.join(' '),
      args.within,
      0
    );
  if (matchIdx !== false) {
    args.within.splice(matchIdx, matchList.length);
  }
  return matchIdx;
};

const getALittle = from => {
  const idx = findMatch({
    lookFor: ['a', 'little'],
    within: from
  });
  return idx === false ? false : true;
};

const getByWeight = from => {
  const idx = findMatch({
    lookFor: ['by', 'weight'],
    within: from
  });
  return idx === false ? false : true;
};

const getFluidic = from => {
  const val = from[0].toLowerCase().replace(/\./g, '');
  if (fluidicWords.indexOf(val) > -1) {
    from.shift();
    return true;
  }
  return false;
};

const getUnit = from => {
  if (getALittle(from)) {
    return 'a little';
  }
  if (isUnitOfMeasure(from[0] || '')) {
    return unitExpander(from.shift());
  }
  return false;
};

const getOptional = from => {
  let res = false;
  from.filter((val, idx) => {
    if (regexOptional.test(val)) {
      res = true;
      from.splice(idx, 1);
    }
  });
  return res;
};

const getToTaste = from => {
  const idx = findMatch({
    lookFor: ['to', 'taste'],
    within: from
  });
  return idx === false ? false : true;
};

const removeNoise = from => {
  let res = false;
  from.filter((val, idx) => {
    if (noiseWords.indexOf(val.toLowerCase()) > -1) {
      res = true;
      from.splice(idx, 1);
    }
  });
  return res;
};

const getPrep = from => {
  let start = false;
  let end;
  let inPrep = false;
  let prep = from.forEach(function(item, idx) {
    if (!inPrep && start === false && item[0] === '(') {
      inPrep = true;
      start = idx;
    }
    if (inPrep && item.substr(-1) === ')') {
      inPrep = false;
      end = idx;
    }
  });
  if (start !== false) {
    prep = from.splice(start, end + 1).join(' ');
    return prep.substr(-1) === ')'
      ? prep.substring(1, prep.length - 1)
      : prep.substr(1);
  }
  return false;
};

export const parseIngredient = source => {
  let parts = source.split(/[ \t]/);
  const ingredient = {};
  let val;
  let tmpAmount;

  if (parts[0] === 'a') {
    tmpAmount = 1;
    parts.shift();
  }
  if (!tmpAmount && (val = getAmount(parts))) {
    ingredient.amount = val.match;
    parts = val.rest;
  }
  if (getFluidic(parts)) {
    ingredient.fluidic = true;
  }
  if ((val = getUnit(parts))) {
    ingredient.unit = val;
  }
  if (getByWeight(parts)) {
    ingredient.byWeight = true;
  }
  if (getOptional(parts)) {
    ingredient.optional = true;
  }
  if (getToTaste(parts)) {
    ingredient.toTaste = true;
  }
  if ((val = getPrep(parts))) {
    ingredient.prep = val;
  }
  removeNoise(parts);
  ingredient.name = parts.join(' ');
  if (tmpAmount) {
    if (ingredient.unit !== 'Little') {
      ingredient.amount = tmpAmount + '';
    }
  }
  return ingredient;
};
