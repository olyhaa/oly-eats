const validValues = [
  { val: 0, str: '<1/8' },
  { val: 0.125, str: '1/8' },
  { val: 0.25, str: '1/4' },
  { val: 0.333, str: '1/3' },
  { val: 0.375, str: '3/8' },
  { val: 0.5, str: '1/2' },
  { val: 0.625, str: '5/8' },
  { val: 0.666, str: '2/3' },
  { val: 0.75, str: '3/4' },
  { val: 0.875, str: '7/8' },
  { val: 1, str: '1' },
];

export const closestFraction = (num) => {
  return validValues.reduce((a, b) => {
    return Math.abs(b.val - num) < Math.abs(a.val - num) ? b : a;
  }).str;
};

export const formatFraction = (num) => {
  // get non-fractional part
  const wholeNum = Math.floor(Math.abs(num));
  const decimalNum = num - wholeNum;

  // if a whole number, return as-is
  if (decimalNum === 0) {
    return `${wholeNum}`;
  }

  const fractionNum = closestFraction(decimalNum);
  if (fractionNum === validValues[validValues.length - 1].str) {
    return `${wholeNum + 1}`;
  }
  if (fractionNum === validValues[0].str) {
    return `${wholeNum}`;
  }
  if (wholeNum > 0) {
    return `${wholeNum} ${fractionNum}`;
  }
  return `${fractionNum}`;
};
