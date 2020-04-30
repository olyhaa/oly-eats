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
  let displayStr = '';
  if (timeArray && timeArray.length > 0) {
    timeArray.forEach((item) => {
      displayStr += `${item.value} ${item.units} `;
    });
    return displayStr.trim();
  }
  return undefined;
};
