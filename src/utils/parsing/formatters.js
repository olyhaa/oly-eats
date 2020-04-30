import Pluralize from 'pluralize';
import { TIMING_UNITS } from '../../components/add/formConstants';

const fractionMap = {
  '½': '1/2',
  '⅓': '1/3',
  '⅔': '2/3',
  '¼': '1/4',
  '¾': '3/4',
  '⅕': '1/5',
  '⅖': '2/5',
  '⅗': '3/5',
  '⅘': '4/5',
  '⅙': '1/6',
  '⅚': '5/6',
  '⅐': '1/7',
  '⅛': '1/8',
  '⅜': '3/8',
  '⅝': '5/8',
  '⅞': '7/8',
  '⅑': '1/9',
  '⅒': '1/10',
};

export const convertUnicodeFractions = (inputStr) => {
  let convertedString = inputStr;

  Object.keys(fractionMap).forEach((unicodeFraction) => {
    const expandedFraction = fractionMap[unicodeFraction];
    const regex = new RegExp(`${unicodeFraction}`, 'g');
    convertedString = convertedString.replace(regex, expandedFraction);
  });
  return convertedString;
};

export const getDisplayTime = (timeArray) => {
  const unitsOrder = [TIMING_UNITS.HOUR, TIMING_UNITS.MINUTE];
  timeArray.sort((a, b) => {
    return unitsOrder.indexOf(a.units) - unitsOrder.indexOf(b.units);
  });
  let displayStr = '';

  if (timeArray && timeArray.length > 0) {
    timeArray.forEach((item) => {
      const unit = item.value > 1 ? Pluralize.plural(item.units) : item.units;
      displayStr += `${item.value} ${unit} `;
    });
    return displayStr.trim();
  }
  return undefined;
};

export const getDisplayDate = (unixTime) => {
  const date = new Date(unixTime);
  return date.toLocaleDateString();
};
