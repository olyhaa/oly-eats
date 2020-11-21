import {
  removeSurroundingQuotes,
  FILTER_FLAGS,
  parseFilterString,
  doNameFilter,
  doIngredientFilter,
  doFilter,
  doSourceFilter,
} from '../FilterHelpers';

describe('removeSurroundingQuotes', () => {
  it('should remove quotes', () => {
    expect(removeSurroundingQuotes('')).toEqual('');
    expect(removeSurroundingQuotes('amanda')).toEqual('amanda');
    expect(removeSurroundingQuotes('"amanda"')).toEqual('amanda');
    expect(removeSurroundingQuotes(`"amanda's cool"`)).toEqual("amanda's cool");
  });
});

describe('parseFilterString', () => {
  it('empty string', () => {
    expect(parseFilterString('')).toStrictEqual({});
  });

  it('should match names', () => {
    expect(parseFilterString('apple')).toStrictEqual({
      nameFilters: ['apple'],
      ingredientFilters: [],
      sourceFilters: [],
    });

    expect(parseFilterString('apple banana')).toStrictEqual({
      nameFilters: ['apple', 'banana'],
      ingredientFilters: [],
      sourceFilters: [],
    });
  });

  it('should match ingredients', () => {
    expect(
      parseFilterString(`${FILTER_FLAGS.INGREDIENT_FLAG}apple`)
    ).toStrictEqual({
      nameFilters: [],
      ingredientFilters: ['apple'],
      sourceFilters: [],
    });

    expect(
      parseFilterString(
        `${FILTER_FLAGS.INGREDIENT_FLAG}apple ${FILTER_FLAGS.INGREDIENT_FLAG}sugar`
      )
    ).toStrictEqual({
      nameFilters: [],
      ingredientFilters: ['apple', 'sugar'],
      sourceFilters: [],
    });
  });

  it('should match sources', () => {
    expect(parseFilterString(`${FILTER_FLAGS.SOURCE_FLAG}mom`)).toStrictEqual({
      nameFilters: [],
      ingredientFilters: [],
      sourceFilters: ['mom'],
    });

    expect(
      parseFilterString(
        `${FILTER_FLAGS.SOURCE_FLAG}mom ${FILTER_FLAGS.SOURCE_FLAG}kitchen`
      )
    ).toStrictEqual({
      nameFilters: [],
      ingredientFilters: [],
      sourceFilters: ['mom', 'kitchen'],
    });
  });

  it('should match multiple fields', () => {
    expect(
      parseFilterString(
        `pie ${FILTER_FLAGS.INGREDIENT_FLAG}apple ${FILTER_FLAGS.INGREDIENT_FLAG}vanilla ${FILTER_FLAGS.SOURCE_FLAG}mom`
      )
    ).toStrictEqual({
      nameFilters: ['pie'],
      ingredientFilters: ['apple', 'vanilla'],
      sourceFilters: ['mom'],
    });

    expect(
      parseFilterString(`pie ${FILTER_FLAGS.INGREDIENT_FLAG}apple`)
    ).toStrictEqual({
      nameFilters: ['pie'],
      ingredientFilters: ['apple'],
      sourceFilters: [],
    });

    expect(
      parseFilterString(`apple pie ${FILTER_FLAGS.INGREDIENT_FLAG}cranberry`)
    ).toStrictEqual({
      nameFilters: ['apple', 'pie'],
      ingredientFilters: ['cranberry'],
      sourceFilters: [],
    });
  });

  it('should parse quoted strings', () => {
    expect(
      parseFilterString(
        `pie ${FILTER_FLAGS.INGREDIENT_FLAG}"apple spice" ${FILTER_FLAGS.INGREDIENT_FLAG}vanilla "with apples"`
      )
    ).toStrictEqual({
      nameFilters: ['pie', 'with apples'],
      ingredientFilters: ['apple spice', 'vanilla'],
      sourceFilters: [],
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

describe('doSourceFilter', () => {
  const testList = [
    {
      source: {
        display: 'mom',
      },
    },
    {
      source: {
        display: "mom's kitchen",
        url: 'www.mom-bakes.com',
      },
    },
    {
      source: {
        display: 'kitchen sisters',
      },
    },
    {
      source: {
        display: 'sandy bakes',
        url: 'www.ss-baker.com',
      },
    },
  ];

  it('empty list', () => {
    expect(doSourceFilter([], ['mom'])).toStrictEqual([]);
  });

  it('empty filter', () => {
    expect(doSourceFilter(testList, [])).toStrictEqual(testList);
  });

  it('single filter - some matches', () => {
    const expected1 = [];
    expected1.push(testList[0]);
    expected1.push(testList[1]);
    expect(doSourceFilter(testList, ['mom'])).toStrictEqual(expected1);

    const expected2 = [];
    expected2.push(testList[1]);
    expected2.push(testList[3]);
    expect(doSourceFilter(testList, ['bakes'])).toStrictEqual(expected2);
  });

  it('single filter - no matches', () => {
    expect(doSourceFilter(testList, ['mandy'])).toStrictEqual([]);
  });

  it('multiple filters', () => {
    const expected = [];
    expected.push(testList[1]);

    expect(doSourceFilter(testList, ['mom', 'KITCHEN'])).toStrictEqual(
      expected
    );
    expect(doSourceFilter(testList, ['mom', 'bakes'])).toStrictEqual(expected);
  });
});

describe('doFilter', () => {
  const testList = [
    {
      title: 'Nathan pie',
      source: { display: "King Nathan's Best Of", url: 'www.theking.com' },
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
      source: { display: 'Sandy Whips up a Storm' },
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
      source: { display: "Sandy's Garden" },
      ingredients: [
        {
          ingredients: [{ name: 'basil' }],
        },
      ],
    },
    {
      title: 'apple spice',
      source: { display: 'Apple Pie Bakery' },
      ingredients: [
        {
          ingredients: [{ name: 'chopped apple powder' }, { name: 'vanilla' }],
        },
      ],
    },
    {
      title: 'banana pudding',
      source: { display: 'The Pudding King', url: 'www.theappleking.com' },
      ingredients: [
        {
          ingredients: [{ name: 'chopped BANANAS' }, { name: 'honey' }],
        },
      ],
    },
    {
      title: 'banana pie',
      source: { display: 'The Pudding K', url: 'www.thepuddingking.com' },
      ingredients: [
        {
          ingredients: [{ name: 'squished BANANAS' }, { name: 'honey' }],
        },
      ],
    },
  ];

  it('empty list', () => {
    expect(doFilter([], { nameFilters: ['pie'] })).toStrictEqual([]);
  });

  it('empty filter', () => {
    expect(doFilter(testList, {})).toStrictEqual(testList);
  });

  it('only name(s)', () => {
    const expectedList1 = [];
    expectedList1.push(testList[0]);
    expectedList1.push(testList[5]);
    expect(doFilter(testList, { nameFilters: ['pie'] })).toStrictEqual(
      expectedList1
    );

    const expectedList2 = [];
    expectedList2.push(testList[5]);
    expect(
      doFilter(testList, {
        nameFilters: ['pie', 'banana'],
      })
    ).toStrictEqual(expectedList2);
  });

  it('only ingredient(s)', () => {
    const expectedList1 = [];
    expectedList1.push(testList[0]);
    expectedList1.push(testList[1]);
    expectedList1.push(testList[3]);
    expect(doFilter(testList, { ingredientFilters: ['apple'] })).toStrictEqual(
      expectedList1
    );

    const expectedList2 = [];
    expectedList2.push(testList[1]);
    expect(
      doFilter(testList, {
        ingredientFilters: ['vinegar', 'oil'],
      })
    ).toStrictEqual(expectedList2);

    const expectedList3 = [];
    expectedList3.push(testList[0]);
    expectedList3.push(testList[3]);
    expect(
      doFilter(testList, {
        ingredientFilters: ['apple', 'vanilla'],
      })
    ).toStrictEqual(expectedList3);
  });

  it('only source(s)', () => {
    const expectedList1 = [];
    expectedList1.push(testList[0]);
    expectedList1.push(testList[4]);
    expectedList1.push(testList[5]);
    expect(doFilter(testList, { sourceFilters: ['king'] })).toStrictEqual(
      expectedList1
    );

    const expectedList2 = [];
    expectedList2.push(testList[0]);
    expect(
      doFilter(testList, {
        sourceFilters: ['king', 'nathan'],
      })
    ).toStrictEqual(expectedList2);
  });

  it('name(s) and ingredient(s) and sources(s)', () => {
    const expectedList1 = [];
    expectedList1.push(testList[5]);
    expect(
      doFilter(testList, {
        nameFilters: ['pie'],
        ingredientFilters: ['honey'],
        sourceFilters: ['king'],
      })
    ).toStrictEqual(expectedList1);
  });
});
