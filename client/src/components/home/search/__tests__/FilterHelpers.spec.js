import {
  INGREDIENT_FLAG,
  parseFilterString,
  doNameFilter,
  doIngredientFilter,
  doFilter,
  filterAndSort,
} from '../FilterHelpers';

describe('parseFilterString', () => {
  it('should match names', () => {
    expect(parseFilterString('apple')).toStrictEqual({
      nameFilters: ['apple'],
      ingredientFilters: [],
    });

    expect(parseFilterString('apple banana')).toStrictEqual({
      nameFilters: ['apple', 'banana'],
      ingredientFilters: [],
    });
  });

  it('should match ingredients', () => {
    expect(parseFilterString(`${INGREDIENT_FLAG}apple`)).toStrictEqual({
      nameFilters: [],
      ingredientFilters: ['apple'],
    });

    expect(
      parseFilterString(`${INGREDIENT_FLAG}apple ${INGREDIENT_FLAG}sugar`)
    ).toStrictEqual({
      nameFilters: [],
      ingredientFilters: ['apple', 'sugar'],
    });
  });

  it('should match multiple fields', () => {
    expect(
      parseFilterString(`pie ${INGREDIENT_FLAG}apple ${INGREDIENT_FLAG}vanilla`)
    ).toStrictEqual({
      nameFilters: ['pie'],
      ingredientFilters: ['apple', 'vanilla'],
    });

    expect(parseFilterString(`pie ${INGREDIENT_FLAG}apple`)).toStrictEqual({
      nameFilters: ['pie'],
      ingredientFilters: ['apple'],
    });

    expect(
      parseFilterString(`apple pie ${INGREDIENT_FLAG}cranberry`)
    ).toStrictEqual({
      nameFilters: ['apple', 'pie'],
      ingredientFilters: ['cranberry'],
    });
  });
});

describe('doNameFilter', () => {
  const testList = [
    { title: 'apple pie' },
    { title: 'apple strudel' },
    { title: 'bananas and apples' },
    { title: 'bananapudding' },
    { title: 'fruit salad' },
    { title: 'tasty apps' },
  ];
  it('empty list', () => {
    expect(doNameFilter([], ['name'])).toStrictEqual([]);
  });

  it('empty filter', () => {
    expect(doNameFilter(testList, [])).toStrictEqual(testList);
  });

  it('single filter - some matches', () => {
    const expected = [];
    expected.push(testList[0]);
    expected.push(testList[1]);
    expected.push(testList[2]);

    expect(doNameFilter(testList, ['apple'])).toStrictEqual(expected);
  });

  it('single filter - no matches', () => {
    expect(doNameFilter(testList, ['appler'])).toStrictEqual([]);
  });

  it('multiple filters', () => {
    const expected = [];
    expected.push(testList[2]);

    expect(doNameFilter(testList, ['apple', 'BanAna'])).toStrictEqual(expected);
  });
});

describe('doIngredientFilter', () => {
  const testList = [
    {
      ingredients: [
        {
          ingredients: [
            { name: 'apple' },
            { name: 'banana' },
            { name: 'sugar' },
          ],
        },
        {
          ingredients: [
            { name: 'chopped apples' },
            { name: 'vanilla' },
            { name: 'butter' },
          ],
        },
      ],
    },
    {
      ingredients: [
        {
          ingredients: [
            { name: 'oil' },
            { name: 'balsamic vinegar' },
            { name: 'basil' },
          ],
        },
        {
          ingredients: [
            { name: 'chopped apples' },
            { name: 'cherries' },
            { name: 'blueberry' },
          ],
        },
      ],
    },
    {
      ingredients: [
        {
          ingredients: [{ name: 'basil' }],
        },
      ],
    },
    {
      ingredients: [
        {
          ingredients: [{ name: 'chopped apple powder' }],
        },
      ],
    },
    {
      ingredients: [
        {
          ingredients: [{ name: 'chopped BANANAS' }],
        },
      ],
    },
  ];

  it('empty list', () => {
    expect(doIngredientFilter([], ['apple'])).toStrictEqual([]);
  });

  it('empty filter', () => {
    expect(doIngredientFilter(testList, [])).toStrictEqual(testList);
  });

  it('single filter - some matches', () => {
    const expected = [];
    expected.push(testList[0]);
    expected.push(testList[1]);
    expected.push(testList[3]);

    expect(doIngredientFilter(testList, ['apple'])).toStrictEqual(expected);
  });

  it('single filter - no matches', () => {
    expect(doIngredientFilter(testList, ['appler'])).toStrictEqual([]);
  });

  it('multiple filters', () => {
    const expected = [];
    expected.push(testList[0]);

    expect(doIngredientFilter(testList, ['apple', 'BanAna'])).toStrictEqual(
      expected
    );
  });
});

describe('doFilter', () => {
  const testList = [
    {
      title: 'Nathan pie',
      ingredients: [
        {
          ingredients: [
            { name: 'apple' },
            { name: 'banana' },
            { name: 'sugar' },
          ],
        },
        {
          ingredients: [
            { name: 'chopped apples' },
            { name: 'vanilla' },
            { name: 'butter' },
          ],
        },
      ],
    },
    {
      title: 'interesting salad dressing',
      ingredients: [
        {
          ingredients: [
            { name: 'oil' },
            { name: 'balsamic vinegar' },
            { name: 'basil' },
          ],
        },
        {
          ingredients: [
            { name: 'chopped apples' },
            { name: 'cherries' },
            { name: 'blueberry' },
          ],
        },
      ],
    },
    {
      title: 'herbs',
      ingredients: [
        {
          ingredients: [{ name: 'basil' }],
        },
      ],
    },
    {
      title: 'apple spice',
      ingredients: [
        {
          ingredients: [{ name: 'chopped apple powder' }, { name: 'vanilla' }],
        },
      ],
    },
    {
      title: 'banana pudding',
      ingredients: [
        {
          ingredients: [{ name: 'chopped BANANAS' }, { name: 'honey' }],
        },
      ],
    },
    {
      title: 'banana pie',
      ingredients: [
        {
          ingredients: [{ name: 'squished BANANAS' }, { name: 'honey' }],
        },
      ],
    },
  ];

  it('empty list', () => {
    expect(
      doFilter([], { nameFilters: ['pie'], ingredientFilters: [] })
    ).toStrictEqual([]);
  });

  it('empty filter', () => {
    expect(
      doFilter(testList, { nameFilters: [], ingredientFilters: [] })
    ).toStrictEqual(testList);
  });

  it('only name(s)', () => {
    const expectedList1 = [];
    expectedList1.push(testList[0]);
    expectedList1.push(testList[5]);
    expect(
      doFilter(testList, { nameFilters: ['pie'], ingredientFilters: [] })
    ).toStrictEqual(expectedList1);

    const expectedList2 = [];
    expectedList2.push(testList[5]);
    expect(
      doFilter(testList, {
        nameFilters: ['pie', 'banana'],
        ingredientFilters: [],
      })
    ).toStrictEqual(expectedList2);
  });

  it('only ingredient(s)', () => {
    const expectedList1 = [];
    expectedList1.push(testList[0]);
    expectedList1.push(testList[1]);
    expectedList1.push(testList[3]);
    expect(
      doFilter(testList, { nameFilters: [], ingredientFilters: ['apple'] })
    ).toStrictEqual(expectedList1);

    const expectedList2 = [];
    expectedList2.push(testList[1]);
    expect(
      doFilter(testList, {
        nameFilters: [],
        ingredientFilters: ['vinegar', 'oil'],
      })
    ).toStrictEqual(expectedList2);

    const expectedList3 = [];
    expectedList3.push(testList[0]);
    expectedList3.push(testList[3]);
    expect(
      doFilter(testList, {
        nameFilters: [],
        ingredientFilters: ['apple', 'vanilla'],
      })
    ).toStrictEqual(expectedList3);
  });

  it('name(s) and ingredient(s)', () => {
    const expectedList1 = [];
    expectedList1.push(testList[5]);
    expect(
      doFilter(testList, {
        nameFilters: ['pie'],
        ingredientFilters: ['honey'],
      })
    ).toStrictEqual(expectedList1);
  });
});
