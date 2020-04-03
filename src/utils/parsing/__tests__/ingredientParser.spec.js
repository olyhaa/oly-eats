import { parseIngredient } from '../ingredientParser';

const checkMatch = (source, expect) => {
  const sKeys = Object.keys(source);
  const eKeys = Object.keys(expect);
  let err;
  const checkError = function(v, e) {
    if (!v) {
      err = e;
    }
  };

  if (sKeys.length !== eKeys.length) {
    eKeys.forEach(function(key) {
      if (sKeys.indexOf(key) === -1) {
        err = 'Expected key ' + JSON.stringify(key) + ' not found';
      }
    });
    sKeys.forEach(function(key) {
      if (eKeys.indexOf(key) === -1) {
        err = 'Unexpected key ' + JSON.stringify(key) + ' found';
      }
    });
  }
  if (!err) {
    eKeys.forEach(function(key) {
      if (!err) {
        checkError(
          sKeys.indexOf(key) > -1,
          'Invalid expected ' + JSON.stringify(key) + ' key not found'
        );
        if (
          typeof expect[key] === 'object' &&
          typeof source[key] === 'object'
        ) {
          checkMatch(source[key], expect[key]);
        } else {
          checkError(
            source[key] === expect[key],
            'Invalid expected ' +
              JSON.stringify(expect[key]) +
              ' but got ' +
              JSON.stringify(source[key]) +
              ' for ' +
              key
          );
        }
      }
    });
  }
  return err || true;
};

describe('Ingredient Parser', () => {
  describe('The Basics', () => {
    var testCases = {
      '1 Cup Flour': {
        amount: '1',
        unit: 'Cup',
        name: 'Flour'
      },
      '1 c Flour': {
        amount: '1',
        unit: 'Cup',
        name: 'Flour'
      },
      '1 cups Flour': {
        amount: '1',
        unit: 'Cup',
        name: 'Flour'
      },
      '1/4 Cup flour': {
        amount: '1/4',
        unit: 'Cup',
        name: 'flour'
      },
      '1/4 cups flour': {
        amount: '1/4',
        unit: 'Cup',
        name: 'flour'
      },
      '1 large egg': {
        amount: '1',
        unit: 'Large',
        name: 'egg'
      },
      '1 tsp flour': {
        amount: '1',
        unit: 'Teaspoon',
        name: 'flour'
      },
      '1 pinch salt (optional)': {
        amount: '1',
        unit: 'Pinch',
        name: 'salt',
        optional: true
      },
      '1 pinch salt optional': {
        amount: '1',
        unit: 'Pinch',
        name: 'salt',
        optional: true
      },
      'salt to taste': {
        toTaste: true,
        name: 'salt'
      },
      'optional salt optional to taste': {
        optional: true,
        name: 'salt',
        toTaste: true
      },
      'a pinch of salt to taste': {
        unit: 'Pinch',
        name: 'salt',
        toTaste: true,
        amount: '1'
      },
      'a little salt to taste': {
        unit: 'Little',
        name: 'salt',
        toTaste: true
      },
      '1 lb carrots (diced)': {
        amount: '1',
        unit: 'Pound',
        prep: 'diced',
        name: 'carrots'
      },
      '1 lb (diced) carrots': {
        amount: '1',
        unit: 'Pound',
        prep: 'diced',
        name: 'carrots'
      },
      '1 lb carrots (diced small)': {
        amount: '1',
        unit: 'Pound',
        prep: 'diced small',
        name: 'carrots'
      },
      '1 lb (diced small) carrots': {
        amount: '1',
        unit: 'Pound',
        prep: 'diced small',
        name: 'carrots'
      },
      '1 to 2 Cups salt': {
        amount: {
          min: '1',
          max: '2'
        },
        unit: 'Cup',
        name: 'salt'
      },
      '1to2 Cups salt': {
        amount: {
          min: '1',
          max: '2'
        },
        unit: 'Cup',
        name: 'salt'
      },
      '1-2 Cups salt': {
        amount: {
          min: '1',
          max: '2'
        },
        unit: 'Cup',
        name: 'salt'
      },
      '1 - 2 Cups salt': {
        amount: {
          min: '1',
          max: '2'
        },
        unit: 'Cup',
        name: 'salt'
      },
      '1 oz of flour by weight': {
        amount: '1',
        unit: 'Ounce',
        byWeight: true,
        name: 'flour'
      },
      '1oz by weight of flour': {
        amount: '1',
        unit: 'Ounce',
        byWeight: true,
        name: 'flour'
      },
      '1oz flour by weight': {
        amount: '1',
        unit: 'Ounce',
        byWeight: true,
        name: 'flour'
      },
      '1-2oz of flour by weight': {
        amount: {
          min: '1',
          max: '2'
        },
        unit: 'Ounce',
        byWeight: true,
        name: 'flour'
      },
      'salt and pepper to taste': {
        name: 'salt and pepper',
        toTaste: true
      },
      '1 bottle ketchup': {
        amount: '1',
        unit: 'Bottle',
        name: 'ketchup'
      },
      '2 teaspoons toasted sesame oil, divided': {
        amount: '2',
        unit: 'Teaspoon',
        name: 'toasted sesame oil, divided'
      },
      '2 tsp toasted sesame oil': {
        amount: '2',
        unit: 'Teaspoon',
        name: 'toasted sesame oil'
      },
      '1/2 banana': {
        amount: '1/2',
        name: 'banana'
      },
      '1 medium apple': {
        amount: '1',
        name: 'medium apple'
      }
    };
    Object.keys(testCases).forEach(name => {
      const expect = testCases[name];
      it('Should parse ' + name, done => {
        const res = parseIngredient(name);
        const err = checkMatch(res, expect);
        if (typeof err === 'string') {
          console.log(res);
          expect(false, err);
        }
        done();
      });
    });
  });
});
