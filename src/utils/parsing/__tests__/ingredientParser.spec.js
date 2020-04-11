import { parseIngredient, buildIngredientString } from '../ingredientParser';

describe('Ingredient Parser', () => {
  describe('The Basics', () => {
    const testCases = {
      '1 Cup Flour': {
        amount: '1',
        unit: 'cup',
        name: 'Flour',
      },
      '1 c Flour': {
        amount: '1',
        unit: 'cup',
        name: 'Flour',
      },
      '1 cups Flour': {
        amount: '1',
        unit: 'cup',
        name: 'Flour',
      },
      '1/4 Cup flour': {
        amount: '1/4',
        unit: 'cup',
        name: 'flour',
      },
      '1/4 cups flour': {
        amount: '1/4',
        unit: 'cup',
        name: 'flour',
      },
      '1 large egg': {
        amount: '1',
        unit: 'large',
        name: 'egg',
      },
      '1 tsp flour': {
        amount: '1',
        unit: 'teaspoon',
        name: 'flour',
      },
      '1 t flour': {
        amount: '1',
        unit: 'teaspoon',
        name: 'flour',
      },
      '1 T flour': {
        amount: '1',
        unit: 'tablespoon',
        name: 'flour',
      },
      '1 pinch salt (optional)': {
        amount: '1',
        unit: 'pinch',
        name: 'salt',
        optional: true,
      },
      '1 pinch salt optional': {
        amount: '1',
        unit: 'pinch',
        name: 'salt',
        optional: true,
      },
      '1 pinch salt, optional': {
        amount: '1',
        unit: 'pinch',
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
        unit: 'pinch',
        name: 'salt',
        toTaste: true,
        amount: '1',
      },
      'a little salt to taste': {
        unit: 'little',
        name: 'salt',
        toTaste: true,
      },
      'a little salt': {
        unit: 'little',
        name: 'salt',
      },
      'a bit of salt to taste': {
        unit: 'little',
        name: 'salt',
        toTaste: true,
      },
      '1 lb carrots (diced)': {
        amount: '1',
        unit: 'pound',
        prep: 'diced',
        name: 'carrots',
      },
      '1 lb (diced) carrots': {
        amount: '1',
        unit: 'pound',
        prep: 'diced',
        name: 'carrots',
      },
      '1 lb carrots (diced small)': {
        amount: '1',
        unit: 'pound',
        prep: 'diced small',
        name: 'carrots',
      },
      '1 lb (diced small) carrots': {
        amount: '1',
        unit: 'pound',
        prep: 'diced small',
        name: 'carrots',
      },
      '1 to 2 Cups salt': {
        amount: {
          min: '1',
          max: '2',
        },
        unit: 'cup',
        name: 'salt',
      },
      '1to2 Cups salt': {
        amount: {
          min: '1',
          max: '2',
        },
        unit: 'cup',
        name: 'salt',
      },
      '1-2 Cups salt': {
        amount: {
          min: '1',
          max: '2',
        },
        unit: 'cup',
        name: 'salt',
      },
      '1 - 2 Cups salt': {
        amount: {
          min: '1',
          max: '2',
        },
        unit: 'cup',
        name: 'salt',
      },
      '1 oz of flour by weight': {
        amount: '1',
        unit: 'ounce',
        byWeight: true,
        name: 'flour',
      },
      '1oz by weight of flour': {
        amount: '1',
        unit: 'ounce',
        byWeight: true,
        name: 'flour',
      },
      '1oz flour by weight': {
        amount: '1',
        unit: 'ounce',
        byWeight: true,
        name: 'flour',
      },
      '1-2oz of flour by weight': {
        amount: {
          min: '1',
          max: '2',
        },
        unit: 'ounce',
        byWeight: true,
        name: 'flour',
      },
      'salt and pepper to taste': {
        name: 'salt and pepper',
        toTaste: true,
      },
      '1 bottle ketchup': {
        amount: '1',
        unit: 'bottle',
        name: 'ketchup',
      },
      '2 teaspoons toasted sesame oil, divided': {
        amount: '2',
        unit: 'teaspoon',
        name: 'toasted sesame oil',
        prep: 'divided',
      },
      '2 tsp toasted sesame oil': {
        amount: '2',
        unit: 'teaspoon',
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
        unit: 'ounce',
        name: 'white wine',
      },
      '20 ml white wine': {
        amount: '20',
        unit: 'milliliter',
        name: 'white wine',
      },
      '20 mL white wine': {
        amount: '20',
        unit: 'milliliter',
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
        unit: 'package',
        name: 'chips',
      },
      '3" ginger': {
        amount: '3',
        unit: 'inch',
        name: 'ginger',
      },
      '1 medium roma tomato, diced small': {
        amount: '1',
        name: 'medium roma tomato',
        prep: 'diced small',
      },
      '15 oz chickpeas, rinsed and drained': {
        amount: '15',
        unit: 'ounce',
        name: 'chickpeas',
        prep: 'rinsed and drained',
      },
      // Nathan's fun stuff
      '1 (chopped) apple': {
        amount: '1',
        name: 'apple',
        prep: 'chopped',
      },
      '1 (chopped) apple, diced small': {
        amount: '1',
        name: 'apple',
        prep: 'chopped, diced small',
      },
      '1 (chopped) apple, granny smith': {
        amount: '1',
        name: 'apple',
        prep: 'chopped, granny smith',
      },
      '11 single apples': {
        amount: '11',
        name: 'single apples',
      },
      '11 a apple': {
        amount: '11',
        name: 'apple',
      },
      '2 to 1 apples': {
        amount: {
          min: '2',
          max: '1',
        },
        name: 'apples',
      },
      'Freshly ground black pepper': {
        name: 'Freshly ground black pepper',
      },
      '12 ounces carrots(about 4 to 5 medium), peeled and shredded on the large holes of a box grater': {
        amount: '12',
        unit: 'ounce',
        name: 'carrots',
        prep:
          'about 4 to 5 medium, peeled and shredded on the large holes of a box grater',
      },
      '1 to 2 tablespoons freshly squeezed lemon juice': {
        amount: {
          min: '1',
          max: '2',
        },
        name: 'freshly squeezed lemon juice',
        unit: 'tablespoon',
      },
      '1 to 2 11 oz cans of tomatoes': {
        amount: {
          min: '1',
          max: '2 11',
        },
        name: 'cans tomatoes',
        unit: 'ounce',
      },
      '1 clove garlic': {
        amount: '1',
        name: 'garlic',
        unit: 'clove',
      },
      '4 cloves garlic': {
        amount: '4',
        name: 'garlic',
        unit: 'clove',
      },
      '1/4 tsp cloves': {
        amount: '1/4',
        name: 'cloves',
        unit: 'teaspoon',
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

describe('buildIngredientString', () => {
  it('all params', () => {
    expect(
      buildIngredientString({
        amount: '1',
        unit: 'Tablespoon',
        name: 'flour',
        prep: 'bleached',
        optional: true,
        toTaste: true,
      })
    ).toEqual('1 Tablespoon flour, bleached, optional, to taste');
  });

  it('ranged amounts', () => {
    expect(
      buildIngredientString({
        amount: {
          min: '1',
          max: '2',
        },
        name: 'freshly squeezed lemon juice',
        unit: 'Tablespoon',
      })
    ).toEqual('1 - 2 Tablespoon freshly squeezed lemon juice');
  });

  it('bool params', () => {
    expect(
      buildIngredientString({
        amount: '2',
        unit: 'Teaspoon',
        name: 'toasted sesame oil',
        prep: 'divided',
        optional: true,
      })
    ).toEqual('2 Teaspoon toasted sesame oil, divided, optional');

    expect(
      buildIngredientString({
        name: 'salt and pepper',
        toTaste: true,
      })
    ).toEqual('salt and pepper, to taste');
  });
});
