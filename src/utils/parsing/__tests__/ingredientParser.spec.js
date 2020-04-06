import { parseIngredient } from '../ingredientParser';

describe('Ingredient Parser', () => {
  describe('The Basics', () => {
    const testCases = {
      '1 Cup Flour': {
        amount: '1',
        unit: 'Cup',
        name: 'Flour',
      },
      '1 c Flour': {
        amount: '1',
        unit: 'Cup',
        name: 'Flour',
      },
      '1 cups Flour': {
        amount: '1',
        unit: 'Cup',
        name: 'Flour',
      },
      '1/4 Cup flour': {
        amount: '1/4',
        unit: 'Cup',
        name: 'flour',
      },
      '1/4 cups flour': {
        amount: '1/4',
        unit: 'Cup',
        name: 'flour',
      },
      '1 large egg': {
        amount: '1',
        unit: 'Large',
        name: 'egg',
      },
      '1 tsp flour': {
        amount: '1',
        unit: 'Teaspoon',
        name: 'flour',
      },
      '1 t flour': {
        amount: '1',
        unit: 'Teaspoon',
        name: 'flour',
      },
      '1 T flour': {
        amount: '1',
        unit: 'Tablespoon',
        name: 'flour',
      },
      '1 pinch salt (optional)': {
        amount: '1',
        unit: 'Pinch',
        name: 'salt',
        optional: true,
      },
      '1 pinch salt optional': {
        amount: '1',
        unit: 'Pinch',
        name: 'salt',
        optional: true,
      },
      '1 pinch salt, optional': {
        amount: '1',
        unit: 'Pinch',
        name: 'salt',
        optional: true,
      },
      'salt to taste': {
        toTaste: true,
        name: 'salt',
      },
      'salt, optional to taste': {
        optional: true,
        name: 'salt',
        toTaste: true,
      },
      'a pinch of salt to taste': {
        unit: 'Pinch',
        name: 'salt',
        toTaste: true,
        amount: '1',
      },
      'a little salt to taste': {
        unit: 'Little',
        name: 'salt',
        toTaste: true,
      },
      'a little salt': {
        unit: 'Little',
        name: 'salt',
      },
      'a bit of salt to taste': {
        unit: 'Little',
        name: 'salt',
        toTaste: true,
      },
      '1 lb carrots (diced)': {
        amount: '1',
        unit: 'Pound',
        prep: 'diced',
        name: 'carrots',
      },
      '1 lb (diced) carrots': {
        amount: '1',
        unit: 'Pound',
        prep: 'diced',
        name: 'carrots',
      },
      '1 lb carrots (diced small)': {
        amount: '1',
        unit: 'Pound',
        prep: 'diced small',
        name: 'carrots',
      },
      '1 lb (diced small) carrots': {
        amount: '1',
        unit: 'Pound',
        prep: 'diced small',
        name: 'carrots',
      },
      '1 to 2 Cups salt': {
        amount: {
          min: '1',
          max: '2',
        },
        unit: 'Cup',
        name: 'salt',
      },
      '1to2 Cups salt': {
        amount: {
          min: '1',
          max: '2',
        },
        unit: 'Cup',
        name: 'salt',
      },
      '1-2 Cups salt': {
        amount: {
          min: '1',
          max: '2',
        },
        unit: 'Cup',
        name: 'salt',
      },
      '1 - 2 Cups salt': {
        amount: {
          min: '1',
          max: '2',
        },
        unit: 'Cup',
        name: 'salt',
      },
      '1 oz of flour by weight': {
        amount: '1',
        unit: 'Ounce',
        byWeight: true,
        name: 'flour',
      },
      '1oz by weight of flour': {
        amount: '1',
        unit: 'Ounce',
        byWeight: true,
        name: 'flour',
      },
      '1oz flour by weight': {
        amount: '1',
        unit: 'Ounce',
        byWeight: true,
        name: 'flour',
      },
      '1-2oz of flour by weight': {
        amount: {
          min: '1',
          max: '2',
        },
        unit: 'Ounce',
        byWeight: true,
        name: 'flour',
      },
      'salt and pepper to taste': {
        name: 'salt and pepper',
        toTaste: true,
      },
      '1 bottle ketchup': {
        amount: '1',
        unit: 'Bottle',
        name: 'ketchup',
      },
      '2 teaspoons toasted sesame oil, divided': {
        amount: '2',
        unit: 'Teaspoon',
        name: 'toasted sesame oil',
        prep: 'divided',
      },
      '2 tsp toasted sesame oil': {
        amount: '2',
        unit: 'Teaspoon',
        name: 'toasted sesame oil',
      },
      '1/2 banana': {
        amount: '1/2',
        name: 'banana',
      },
      '1 medium apple': {
        amount: '1',
        name: 'medium apple',
      },
      '1 medium apple, chopped': {
        amount: '1',
        name: 'medium apple',
        prep: 'chopped',
      },
      '20 oz white wine': {
        amount: '20',
        unit: 'Ounce',
        name: 'white wine',
      },
      '20 ml white wine': {
        amount: '20',
        unit: 'Milliliter',
        name: 'white wine',
      },
      '20 mL white wine': {
        amount: '20',
        unit: 'Milliliter',
        name: 'white wine',
      },
      'medium chopped apple': {
        name: 'medium chopped apple',
      },
      'a medium chopped apple': {
        amount: '1',
        name: 'medium chopped apple',
      },
      'an apple': {
        amount: '1',
        name: 'apple',
      },
      '2 packages chips': {
        amount: '2',
        unit: 'Package',
        name: 'chips',
      },
      '3" ginger': {
        amount: '3',
        unit: 'Inch',
        name: 'ginger',
      },
      '1 medium roma tomato, diced small': {
        amount: '1',
        name: 'medium roma tomato',
        prep: 'diced small',
      },
      '15 oz chickpeas, rinsed and drained': {
        amount: '15',
        unit: 'Ounce',
        name: 'chickpeas',
        prep: 'rinsed and drained',
      },
    };

    Object.keys(testCases).forEach((name) => {
      const expected = testCases[name];
      it(`Should parse ${name}`, () => {
        expect(parseIngredient(name)).toEqual(expected);
      });
    });
  });
});
