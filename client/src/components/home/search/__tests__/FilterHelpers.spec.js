import { TIMING_UNITS } from '../../../../utils/recipeConstants';
import {
  removeSurroundingQuotes,
  FILTER_FLAGS,
  parseFilterString,
  doNameFilter,
  doIngredientFilter,
  doFilter,
  doSourceFilter,
  doSingleTagFilter,
  doAnyTagFilter,
  getTotalMins,
  doMaxTimeFilter,
  convertToFilterString,
} from '../FilterHelpers';
import { SEARCH_CATEGORIES } from '../searchConstants';

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
    expect(parseFilterString('')).toStrictEqual([]);
  });

  it('should match names', () => {
    expect(parseFilterString('apple')).toStrictEqual([
      {
        value: 'apple',
        category: SEARCH_CATEGORIES.NAME,
      },
    ]);

    expect(parseFilterString('apple banana')).toStrictEqual([
      {
        value: 'apple',
        category: SEARCH_CATEGORIES.NAME,
      },
      {
        value: 'banana',
        category: SEARCH_CATEGORIES.NAME,
      },
    ]);
  });

  it('should match ingredients', () => {
    expect(
      parseFilterString(`${FILTER_FLAGS.INGREDIENT_FLAG}apple`)
    ).toStrictEqual([
      {
        value: 'apple',
        category: SEARCH_CATEGORIES.INGREDIENT,
      },
    ]);

    expect(
      parseFilterString(
        `${FILTER_FLAGS.INGREDIENT_FLAG}apple ${FILTER_FLAGS.INGREDIENT_FLAG}sugar`
      )
    ).toStrictEqual([
      {
        value: 'apple',
        category: SEARCH_CATEGORIES.INGREDIENT,
      },
      {
        value: 'sugar',
        category: SEARCH_CATEGORIES.INGREDIENT,
      },
    ]);
  });

  it('should match sources', () => {
    expect(parseFilterString(`${FILTER_FLAGS.SOURCE_FLAG}mom`)).toStrictEqual([
      {
        value: 'mom',
        category: SEARCH_CATEGORIES.SOURCE,
      },
    ]);

    expect(
      parseFilterString(
        `${FILTER_FLAGS.SOURCE_FLAG}mom ${FILTER_FLAGS.SOURCE_FLAG}kitchen`
      )
    ).toStrictEqual([
      {
        value: 'mom',
        category: SEARCH_CATEGORIES.SOURCE,
      },
      {
        value: 'kitchen',
        category: SEARCH_CATEGORIES.SOURCE,
      },
    ]);
  });

  it('should match tags', () => {
    expect(parseFilterString(`${FILTER_FLAGS.TAG_FLAG}dinner`)).toStrictEqual([
      {
        value: 'dinner',
        category: SEARCH_CATEGORIES.TAGS,
      },
    ]);

    expect(
      parseFilterString(
        `${FILTER_FLAGS.TAG_FLAG}dinner ${FILTER_FLAGS.TAG_FLAG}lunch`
      )
    ).toStrictEqual([
      {
        value: 'dinner',
        category: SEARCH_CATEGORIES.TAGS,
      },
      {
        value: 'lunch',
        category: SEARCH_CATEGORIES.TAGS,
      },
    ]);
  });

  it('should match multiple fields', () => {
    expect(
      parseFilterString(
        `pie ${FILTER_FLAGS.INGREDIENT_FLAG}apple ${FILTER_FLAGS.TAG_FLAG}dinner ${FILTER_FLAGS.INGREDIENT_FLAG}vanilla ${FILTER_FLAGS.SOURCE_FLAG}mom`
      )
    ).toStrictEqual([
      { value: 'pie', category: SEARCH_CATEGORIES.NAME },
      { value: 'apple', category: SEARCH_CATEGORIES.INGREDIENT },
      { value: 'vanilla', category: SEARCH_CATEGORIES.INGREDIENT },
      {
        value: 'mom',
        category: SEARCH_CATEGORIES.SOURCE,
      },
      { value: 'dinner', category: SEARCH_CATEGORIES.TAGS },
    ]);

    expect(
      parseFilterString(`pie ${FILTER_FLAGS.INGREDIENT_FLAG}apple`)
    ).toStrictEqual([
      { value: 'pie', category: SEARCH_CATEGORIES.NAME },
      { value: 'apple', category: SEARCH_CATEGORIES.INGREDIENT },
    ]);

    expect(
      parseFilterString(
        `apple pie ${FILTER_FLAGS.INGREDIENT_FLAG}cranberry ${FILTER_FLAGS.TAG_FLAG}"gluten free"`
      )
    ).toStrictEqual([
      { value: 'apple', category: SEARCH_CATEGORIES.NAME },
      { value: 'pie', category: SEARCH_CATEGORIES.NAME },
      { value: 'cranberry', category: SEARCH_CATEGORIES.INGREDIENT },
      { value: 'gluten free', category: SEARCH_CATEGORIES.TAGS },
    ]);
  });

  it('should parse quoted strings', () => {
    expect(
      parseFilterString(
        `pie ${FILTER_FLAGS.INGREDIENT_FLAG}"apple spice" ${FILTER_FLAGS.INGREDIENT_FLAG}vanilla "with apples"`
      )
    ).toStrictEqual([
      { value: 'pie', category: SEARCH_CATEGORIES.NAME },
      { value: 'with apples', category: SEARCH_CATEGORIES.NAME },
      { value: 'apple spice', category: SEARCH_CATEGORIES.INGREDIENT },
      { value: 'vanilla', category: SEARCH_CATEGORIES.INGREDIENT },
    ]);
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

describe('doTagFilter', () => {
  const testList = [
    {
      tags: [
        { label: 'dinner', type: { id: '1' } },
        { label: 'breakfast', type: { id: '1' } },
        { label: 'Greek', type: { id: '2' } },
        { label: 'turkish', type: { id: '2' } },
      ],
    },
    {
      tags: [
        { label: 'breakfast', type: { id: '1' } },
        { label: 'Mexican', type: { id: '2' } },
      ],
    },
    {
      tags: [
        { label: 'slow cooker', type: { id: '3' } },
        { label: 'Mexican', type: { id: '2' } },
        { label: 'turkish', type: { id: '2' } },
        { label: 'breakfast', type: { id: '4' } },
      ],
    },
    {
      tags: [{ label: 'TexMex', type: { id: '2' } }],
    },
  ];

  it('empty list', () => {
    expect(doSingleTagFilter([], '1', ['lunch'])).toStrictEqual([]);
    expect(doAnyTagFilter([], ['lunch'])).toStrictEqual([]);
  });

  it('empty filter', () => {
    expect(doSingleTagFilter(testList, '1', [])).toStrictEqual(testList);
    expect(doAnyTagFilter(testList, [])).toStrictEqual(testList);
  });

  it('single filter - some matches', () => {
    const expected1 = [];
    expected1.push(testList[0]);
    expected1.push(testList[1]);
    expect(doSingleTagFilter(testList, '1', ['breakfast'])).toStrictEqual(
      expected1
    );
    const expected1a = [];
    expected1a.push(testList[0]);
    expected1a.push(testList[1]);
    expected1a.push(testList[2]);
    expect(doAnyTagFilter(testList, ['breakfast'])).toStrictEqual(expected1a);

    const expected2 = [];
    expected2.push(testList[1]);
    expected2.push(testList[2]);
    expected2.push(testList[3]);
    expect(doSingleTagFilter(testList, '2', ['mex'])).toStrictEqual(expected2);
    expect(doAnyTagFilter(testList, ['mex'])).toStrictEqual(expected2);
  });

  it('single filter - no matches', () => {
    expect(doSingleTagFilter(testList, '2', ['mandy'])).toStrictEqual([]);
    expect(doAnyTagFilter(testList, ['mandy'])).toStrictEqual([]);
  });

  it('multiple filters', () => {
    const expected = [];
    expected.push(testList[0]);

    expect(
      doSingleTagFilter(testList, '2', ['greek', 'turkish'])
    ).toStrictEqual(expected);
    expect(doAnyTagFilter(testList, ['greek', 'turkish'])).toStrictEqual(
      expected
    );
  });
});

describe('getTotalMins', () => {
  it('no items', () => {
    expect(getTotalMins([])).toEqual(0);
  });

  it('only minutes', () => {
    expect(getTotalMins([{ units: TIMING_UNITS.MINUTE, value: 30 }])).toEqual(
      30
    );
  });

  it('only hours', () => {
    expect(getTotalMins([{ units: TIMING_UNITS.HOUR, value: 2 }])).toEqual(120);
  });

  it('minutes and hours', () => {
    expect(
      getTotalMins([
        { units: TIMING_UNITS.MINUTE, value: 17 },
        { units: TIMING_UNITS.HOUR, value: 2 },
      ])
    ).toEqual(137);
  });
});

describe('doMaxTimeFilter', () => {
  const testList = [
    {
      timing: {
        total: [
          { value: 14, units: TIMING_UNITS.MINUTE },
          { value: 1, units: TIMING_UNITS.HOUR },
        ],
      },
    },
    {
      timing: {
        total: [{ value: 45, units: TIMING_UNITS.MINUTE }],
      },
    },
    {
      timing: {
        total: [{ value: 2, units: TIMING_UNITS.HOUR }],
      },
    },
  ];

  it('empty list', () => {
    expect(doMaxTimeFilter([], ['20'])).toStrictEqual([]);
  });

  it('empty filter', () => {
    expect(doMaxTimeFilter(testList, [])).toStrictEqual(testList);
  });

  it('single filter - some matches', () => {
    const expected1 = [];
    expected1.push(testList[1]);
    expect(doMaxTimeFilter(testList, ['50'])).toStrictEqual(expected1);
    const expected2 = [];
    expected2.push(testList[0]);
    expected2.push(testList[1]);
    expect(doMaxTimeFilter(testList, ['75'])).toStrictEqual(expected2);
  });

  it('single filter - no matches', () => {
    expect(doMaxTimeFilter(testList, ['1'])).toStrictEqual([]);
  });

  it('multiple filters', () => {
    const expected = [];
    expected.push(testList[1]);

    expect(doMaxTimeFilter(testList, ['60', '50'])).toStrictEqual(expected);
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
      tags: [
        { label: 'dinner', type: { id: '1' } },
        { label: 'breakfast', type: { id: '1' } },
      ],
      timing: {
        total: [
          { value: 14, units: TIMING_UNITS.MINUTE },
          { value: 1, units: TIMING_UNITS.HOUR },
        ],
      },
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
      tags: [
        { label: 'dinner', type: { id: '1' } },
        { label: 'lunch', type: { id: '1' } },
      ],
      timing: {
        total: [{ value: 20, units: TIMING_UNITS.MINUTE }],
      },
    },
    {
      title: 'herbs',
      source: { display: "Sandy's Garden" },
      ingredients: [
        {
          ingredients: [{ name: 'basil' }],
        },
      ],
      tags: [],
      timing: {
        total: [{ value: 1, units: TIMING_UNITS.HOUR }],
      },
    },
    {
      title: 'apple spice',
      source: { display: 'Apple Pie Bakery' },
      ingredients: [
        {
          ingredients: [{ name: 'chopped apple powder' }, { name: 'vanilla' }],
        },
      ],
      tags: [],
      timing: {
        total: [
          { value: 30, units: TIMING_UNITS.MINUTE },
          { value: 1, units: TIMING_UNITS.HOUR },
        ],
      },
    },
    {
      title: 'banana pudding',
      source: { display: 'The Pudding King', url: 'www.theappleking.com' },
      ingredients: [
        {
          ingredients: [{ name: 'chopped BANANAS' }, { name: 'honey' }],
        },
      ],
      tags: [
        { label: 'Mexican', type: { id: '2' } },
        { label: 'side', type: { id: '1' } },
      ],
      timing: {
        total: [{ value: 45, units: TIMING_UNITS.MINUTE }],
      },
    },
    {
      title: 'banana pie',
      source: { display: 'The Pudding K', url: 'www.thepuddingking.com' },
      ingredients: [
        {
          ingredients: [{ name: 'squished BANANAS' }, { name: 'honey' }],
        },
      ],
      tags: [{ label: 'American', type: { id: '2' } }],
      timing: {
        total: [
          { value: 45, units: TIMING_UNITS.MINUTE },
          { value: 1, units: TIMING_UNITS.HOUR },
        ],
      },
    },
    {
      title: 'improved apple pie',
      source: { display: 'The Pudding K', url: 'www.thepuddingking.com' },
      ingredients: [
        {
          ingredients: [{ name: 'squished ritz crackers' }, { name: 'honey' }],
        },
      ],
      tags: [{ label: 'British', type: { id: '2' } }],
      timing: {
        total: [{ value: 2, units: TIMING_UNITS.HOUR }],
      },
    },
  ];

  it('empty list', () => {
    expect(
      doFilter([], [{ category: SEARCH_CATEGORIES.NAME, value: 'pie' }])
    ).toStrictEqual([]);
  });

  it('empty filter', () => {
    expect(doFilter(testList, [])).toStrictEqual(testList);
  });

  it('only name(s)', () => {
    const expectedList1 = [];
    expectedList1.push(testList[0]);
    expectedList1.push(testList[5]);
    expectedList1.push(testList[6]);
    expect(
      doFilter(testList, [{ category: SEARCH_CATEGORIES.NAME, value: 'pie' }])
    ).toStrictEqual(expectedList1);

    const expectedList2 = [];
    expectedList2.push(testList[5]);
    expect(
      doFilter(testList, [
        { category: SEARCH_CATEGORIES.NAME, value: 'pie' },
        { category: SEARCH_CATEGORIES.NAME, value: 'banana' },
      ])
    ).toStrictEqual(expectedList2);
  });

  it('only ingredient(s)', () => {
    const expectedList1 = [];
    expectedList1.push(testList[0]);
    expectedList1.push(testList[1]);
    expectedList1.push(testList[3]);
    expect(
      doFilter(testList, [
        { category: SEARCH_CATEGORIES.INGREDIENT, value: 'apple' },
      ])
    ).toStrictEqual(expectedList1);

    const expectedList2 = [];
    expectedList2.push(testList[1]);
    expect(
      doFilter(testList, [
        { category: SEARCH_CATEGORIES.INGREDIENT, value: 'vinegar' },
        { category: SEARCH_CATEGORIES.INGREDIENT, value: 'oil' },
      ])
    ).toStrictEqual(expectedList2);

    const expectedList3 = [];
    expectedList3.push(testList[0]);
    expectedList3.push(testList[3]);
    expect(
      doFilter(testList, [
        { category: SEARCH_CATEGORIES.INGREDIENT, value: 'apple' },
        { category: SEARCH_CATEGORIES.INGREDIENT, value: 'vanilla' },
      ])
    ).toStrictEqual(expectedList3);
  });

  it('only source(s)', () => {
    const expectedList1 = [];
    expectedList1.push(testList[0]);
    expectedList1.push(testList[4]);
    expectedList1.push(testList[5]);
    expectedList1.push(testList[6]);
    expect(
      doFilter(testList, [
        { category: SEARCH_CATEGORIES.SOURCE, value: 'king' },
      ])
    ).toStrictEqual(expectedList1);

    const expectedList2 = [];
    expectedList2.push(testList[0]);
    expect(
      doFilter(testList, [
        { category: SEARCH_CATEGORIES.SOURCE, value: 'king' },
        { category: SEARCH_CATEGORIES.SOURCE, value: 'nathan' },
      ])
    ).toStrictEqual(expectedList2);
  });

  it('only tag(s)', () => {
    const expectedList1 = [];
    expectedList1.push(testList[0]);
    expectedList1.push(testList[1]);
    expect(
      doFilter(testList, [
        { category: SEARCH_CATEGORIES.TAGS, value: 'dinner' },
      ])
    ).toStrictEqual(expectedList1);

    const expectedList2 = [];
    expectedList2.push(testList[4]);
    expect(
      doFilter(testList, [
        { category: SEARCH_CATEGORIES.TAGS, value: 'mexican' },
        { category: SEARCH_CATEGORIES.TAGS, value: 'side' },
      ])
    ).toStrictEqual(expectedList2);
  });

  it('only time(s)', () => {
    const expectedList1 = [];
    expectedList1.push(testList[1]);
    expect(
      doFilter(testList, [{ category: SEARCH_CATEGORIES.TIME, value: '30' }])
    ).toStrictEqual(expectedList1);

    const expectedList2 = [];
    expectedList2.push(testList[1]);
    expectedList2.push(testList[4]);
    expect(
      doFilter(testList, [
        { category: SEARCH_CATEGORIES.TIME, value: '50' },
        { category: SEARCH_CATEGORIES.TIME, value: '45' },
      ])
    ).toStrictEqual(expectedList2);
  });

  it('uninitialized time filter', () => {
    expect(
      doFilter(testList, [{ category: SEARCH_CATEGORIES.TIME, value: '' }])
    ).toStrictEqual(testList);
  });

  it('name(s) and ingredient(s) and sources(s) and tag(s) and time(s)', () => {
    const expectedList1 = [];
    expectedList1.push(testList[6]);
    expect(
      doFilter(testList, [
        { category: SEARCH_CATEGORIES.NAME, value: 'pie' },
        { category: SEARCH_CATEGORIES.INGREDIENT, value: 'honey' },
        { category: SEARCH_CATEGORIES.SOURCE, value: 'king' },
        { category: SEARCH_CATEGORIES.TAGS, value: 'british' },
        { category: SEARCH_CATEGORIES.TIME, value: '120' },
      ])
    ).toStrictEqual(expectedList1);
  });
});

describe('convertToFilterString', () => {
  it('empty array', () => {
    expect(convertToFilterString([])).toEqual('');
  });

  it('only names', () => {
    expect(
      convertToFilterString([
        { value: 'pie', category: SEARCH_CATEGORIES.NAME },
      ])
    ).toEqual('pie');

    expect(
      convertToFilterString([
        { value: 'apple pie', category: SEARCH_CATEGORIES.NAME },
      ])
    ).toEqual('"apple pie"');

    expect(
      convertToFilterString([
        { value: 'apple', category: SEARCH_CATEGORIES.NAME },
        { value: 'pie', category: SEARCH_CATEGORIES.NAME },
      ])
    ).toEqual('apple pie');
  });

  it('mix of categories', () => {
    expect(
      convertToFilterString([
        { value: 'pie', category: SEARCH_CATEGORIES.NAME },
        { value: 'apple', category: SEARCH_CATEGORIES.INGREDIENT },
        { value: 'king', category: SEARCH_CATEGORIES.SOURCE },
        { value: 'gluten free', category: SEARCH_CATEGORIES.TAGS },
        { value: '20', category: SEARCH_CATEGORIES.TIME },
      ])
    ).toEqual('pie i:apple s:king tag:"gluten free" time:20');
  });

  it('has NOT_INITIALIZED category item(s)', () => {
    expect(
      convertToFilterString([
        { value: '', category: SEARCH_CATEGORIES.NOT_INITIALIZED },
      ])
    ).toEqual('');

    expect(
      convertToFilterString([
        { value: '', category: SEARCH_CATEGORIES.NOT_INITIALIZED },
        { value: 'apple', category: SEARCH_CATEGORIES.INGREDIENT },
      ])
    ).toEqual('i:apple');

    expect(
      convertToFilterString([
        { value: 'apple', category: SEARCH_CATEGORIES.INGREDIENT },
        { value: '', category: SEARCH_CATEGORIES.NOT_INITIALIZED },
      ])
    ).toEqual('i:apple');

    expect(
      convertToFilterString([
        { value: 'apple', category: SEARCH_CATEGORIES.INGREDIENT },
        { value: '', category: SEARCH_CATEGORIES.NOT_INITIALIZED },
        { value: 'pie', category: SEARCH_CATEGORIES.NAME },
      ])
    ).toEqual('i:apple pie');

    expect(
      convertToFilterString([
        { value: '', category: SEARCH_CATEGORIES.NOT_INITIALIZED },
        { value: '', category: SEARCH_CATEGORIES.NOT_INITIALIZED },
      ])
    ).toEqual('');
  });
});
