import {
  timingReducer,
  timeReducer,
  directionsReducer,
  directionStepsReducer,
  ingredientsReducer,
  ingredientReducer,
  rangedAmountReducer,
  tagsReducer,
  recipeReducer,
  recipeMutationReducer,
  metaReducer,
} from '../RecipeReducer';
import { TIMINGS, TIME_UNITS } from '../../constants';

const mockTimings = [
  {
    id: 1,
    recipeId: 123,
    value: '2',
    units: TIME_UNITS.MINUTE,
    type: TIMINGS.PREP_TIME,
    createdAt: '2020-05-10 00:02:45.511 +00:00',
    updatedAt: '2020-05-10 00:03:45.511 +00:00',
  },
  {
    id: 2,
    recipeId: 123,
    value: '20',
    units: TIME_UNITS.MINUTE,
    type: TIMINGS.TOTAL_TIME,
    createdAt: '2020-05-10 00:04:45.511 +00:00',
    updatedAt: '2020-05-10 00:05:45.511 +00:00',
  },
  {
    id: 3,
    recipeId: 123,
    value: '1',
    units: TIME_UNITS.HOUR,
    type: TIMINGS.TOTAL_TIME,
    createdAt: '2020-05-10 00:06:45.511 +00:00',
    updatedAt: '2020-05-10 00:07:45.511 +00:00',
  },
];

const mockDirectionStep = [
  {
    id: 1,
    text: 'step 1',
    directionSectionId: 2,
    createdAt: '2020-05-10 00:09:45.511 +00:00',
    updatedAt: '2020-05-10 00:10:45.511 +00:00',
  },
  {
    id: 2,
    text: 'step 2',
    directionSectionId: 2,
    createdAt: '2020-05-10 00:11:45.511 +00:00',
    updatedAt: '2020-05-10 00:12:45.511 +00:00',
  },
  {
    id: 3,
    text: 'step 1',
    directionSectionId: 1,
    createdAt: '2020-05-10 00:09:45.511 +00:00',
    updatedAt: '2020-05-10 00:10:45.511 +00:00',
  },
];

const fullRecipe = {
  recipe: {
    id: 123,
    title: 'my first recipe',
    description: 'the best recipe ever',
    source_display: "Mandy's Kitchen",
    source_url: 'http://some.url.com/recipe',
    photo_url: 'http://some.url.com/pic.jpg',
    servings: 2,
    createdAt: '2020-05-10 00:00:45.511 +00:00',
    updatedAt: '2020-05-10 00:01:45.511 +00:00',
    timings: [
      {
        id: 1,
        recipeId: 123,
        value: '2',
        units: 'MINUTE',
        type: 'PREP',
        createdAt: '2020-05-10 00:02:45.511 +00:00',
        updatedAt: '2020-05-10 00:03:45.511 +00:00',
      },
      {
        id: 2,
        recipeId: 123,
        value: '20',
        units: 'MINUTE',
        type: 'TOTAL',
        createdAt: '2020-05-10 00:04:45.511 +00:00',
        updatedAt: '2020-05-10 00:05:45.511 +00:00',
      },
      {
        id: 3,
        recipeId: 123,
        value: '1',
        units: 'HOUR',
        type: 'TOTAL',
        createdAt: '2020-05-10 00:06:45.511 +00:00',
        updatedAt: '2020-05-10 00:07:45.511 +00:00',
      },
    ],
    directionSections: [
      {
        id: 1,
        label: 'section 1',
        recipeId: 123,
        createdAt: '2020-05-10 00:07:45.511 +00:00',
        updatedAt: '2020-05-10 00:08:45.511 +00:00',
        directionSteps: [
          {
            id: 1,
            text: 'step 1',
            directionSectionId: 2,
            createdAt: '2020-05-10 00:09:45.511 +00:00',
            updatedAt: '2020-05-10 00:10:45.511 +00:00',
          },
          {
            id: 2,
            text: 'step 2',
            directionSectionId: 2,
            createdAt: '2020-05-10 00:11:45.511 +00:00',
            updatedAt: '2020-05-10 00:12:45.511 +00:00',
          },
        ],
      },
    ],
    ingredientSections: [
      {
        id: 1,
        label: 'ingredient section 1',
        recipeId: 102,
        createdAt: '2020-05-10 00:07:45.511 +00:00',
        updatedAt: '2020-05-10 00:08:45.511 +00:00',
        ingredients: [
          {
            id: 1,
            amount: '2',
            unit: 'cup',
            prep: 'chopped',
            name: 'apples',
            toTaste: true,
            optional: true,
            ingredientSectionId: 2,
            createdAt: '2020-05-10 00:07:45.511 +00:00',
            updatedAt: '2020-05-10 00:08:45.511 +00:00',
          },
          {
            id: 2,
            unit: 'tablespoon',
            prep: 'minced',
            name: 'garlic',
            toTaste: true,
            optional: false,
            ingredientSectionId: 2,
            createdAt: '2020-05-10 00:07:45.511 +00:00',
            updatedAt: '2020-05-10 00:08:45.511 +00:00',
            rangedAmount: {
              id: 1,
              min: '5',
              max: '10',
              createdAt: '2020-05-10 00:07:45.511 +00:00',
              updatedAt: '2020-05-10 00:08:45.511 +00:00',
              ingredientId: 2,
            },
          },
        ],
      },
    ],
    tags: [
      {
        id: 1,
        label: 'bread',
        reatedAt: '2020-05-22T22:25:23.214Z',
        updatedAt: '2020-05-22T22:25:23.214Z',
        tagTypeId: 2,
        recipeTag: {
          createdAt: '2020-05-23T00:20:55.988Z',
          updatedAt: '2020-05-23T00:20:55.988Z',
          recipeId: 123,
          tagId: 1,
        },
        tagType: {
          id: 2,
          label: 'category',
          createdAt: '2020-05-22T22:25:14.275Z',
          updatedAt: '2020-05-22T22:25:14.275Z',
        },
      },
      {
        id: 2,
        label: 'snack',
        reatedAt: '2020-05-22T22:25:23.214Z',
        updatedAt: '2020-05-22T22:25:23.214Z',
        tagTypeId: 4,
        recipeTag: {
          createdAt: '2020-05-23T00:20:55.988Z',
          updatedAt: '2020-05-23T00:20:55.988Z',
          recipeId: 4,
          tagId: 2,
        },
        tagType: {
          id: 4,
          label: 'meal_type',
          createdAt: '2020-05-22T22:25:14.275Z',
          updatedAt: '2020-05-22T22:25:14.275Z',
        },
      },
    ],
    isFavorite: true,
  },
};

describe('recipeReducer', () => {
  it('no data', () => {
    expect(recipeReducer({})).toBeNull();
  });

  it('missing recipe component', () => {
    const recipe = Object.assign({}, fullRecipe);
    recipe.recipe = undefined;
    expect(recipeReducer({ ...recipe })).toBeNull();
  });

  it('all recipe components', () => {
    expect(recipeReducer(fullRecipe)).toMatchSnapshot();
  });
});

describe('recipeMutationReducer', () => {
  it('no success field', () => {
    expect(
      recipeMutationReducer({ message: 'Success!', recipe: fullRecipe })
    ).toMatchSnapshot();
  });

  it('no message field', () => {
    expect(
      recipeMutationReducer({ success: true, recipe: fullRecipe })
    ).toMatchSnapshot();
  });

  it('no recipe field', () => {
    expect(
      recipeMutationReducer({
        success: true,
        message: 'Success!',
      })
    ).toMatchSnapshot();
  });

  it('all fields', () => {
    expect(
      recipeMutationReducer({
        success: true,
        message: 'Success!',
        recipe: fullRecipe,
      })
    ).toMatchSnapshot();
  });
});

describe('timeReducer', () => {
  it('properly reduces total time array', () => {
    const timeArray = [mockTimings[1], mockTimings[2]];
    expect(timeReducer({ timeArray })).toMatchSnapshot();
  });
});

describe('timingReducer', () => {
  it('properly reduces timing array', () => {
    expect(timingReducer({ timingArray: mockTimings })).toMatchSnapshot();
  });
});

describe('directionsReducer', () => {
  it('properly reduces direction array', () => {
    const directionSections = [
      {
        createdAt: '2020-05-10 00:07:45.511 +00:00',
        id: '1',
        label: 'section 1',
        recipeId: '123',
        directionSteps: [
          {
            createdAt: '2020-05-10 00:09:45.511 +00:00',
            id: '3',
            directionSectionId: '1',
            text: 'step 1',
            updatedAt: '2020-05-10 00:10:45.511 +00:00',
          },
        ],
        updatedAt: '2020-05-10 00:08:45.511 +00:00',
      },
      {
        createdAt: '2020-05-10 00:07:45.511 +00:00',
        id: '2',
        recipeId: '123',
        directionSteps: [
          {
            createdAt: '2020-05-10 00:09:45.511 +00:00',
            id: '1',
            directionSectionId: '2',
            text: 'step 1',
            updatedAt: '2020-05-10 00:10:45.511 +00:00',
          },
          {
            createdAt: '2020-05-10 00:11:45.511 +00:00',
            id: '2',
            directionSectionId: '2',
            text: 'step 2',
            updatedAt: '2020-05-10 00:12:45.511 +00:00',
          },
        ],
        updatedAt: '2020-05-10 00:08:45.511 +00:00',
      },
    ];
    expect(directionsReducer({ directionSections })).toMatchSnapshot();
  });
});

describe('directionStepsReducer', () => {
  it('properly reduces direction step array', () => {
    expect(
      directionStepsReducer({ steps: mockDirectionStep })
    ).toMatchSnapshot();
  });
});

describe('ingredientsReducer', () => {
  it('properly reduces ingredients array', () => {
    const ingredientSections = [
      {
        createdAt: '2020-05-10 00:07:45.511 +00:00',
        id: '1',
        label: 'section 1',
        recipeId: '123',
        ingredients: [
          {
            createdAt: '2020-05-10 00:09:45.511 +00:00',
            id: '3',
            ingredientSectionId: '1',
            amount: '2',
            unit: 'cup',
            prep: 'chopped',
            name: 'apples',
            toTaste: true,
            optional: true,
            updatedAt: '2020-05-10 00:10:45.511 +00:00',
          },
        ],
        updatedAt: '2020-05-10 00:08:45.511 +00:00',
      },
      {
        createdAt: '2020-05-10 00:07:45.511 +00:00',
        id: '2',
        recipeId: '123',
        ingredients: [
          {
            createdAt: '2020-05-10 00:09:45.511 +00:00',
            id: '1',
            ingredientSectionId: '2',
            unit: 'tablespoon',
            prep: 'minced',
            name: 'garlic',
            toTaste: true,
            optional: false,
            rangedAmount: {
              id: '1',
              min: '5',
              max: '10',
              createdAt: '2020-05-10 00:07:45.511 +00:00',
              updatedAt: '2020-05-10 00:08:45.511 +00:00',
              ingredientId: '1',
            },
            updatedAt: '2020-05-10 00:10:45.511 +00:00',
          },
          {
            createdAt: '2020-05-10 00:11:45.511 +00:00',
            id: '2',
            ingredientSectionId: '2',
            amount: '3',
            name: 'carrot',
            updatedAt: '2020-05-10 00:12:45.511 +00:00',
          },
        ],
        updatedAt: '2020-05-10 00:08:45.511 +00:00',
      },
    ];
    expect(ingredientsReducer({ ingredientSections })).toMatchSnapshot();
  });
});

describe('ingredientReducer', () => {
  it('properly reduces ingredient', () => {
    const ingredient = {
      createdAt: '2020-05-10 00:09:45.511 +00:00',
      id: '1',
      ingredientSectionId: '2',
      unit: 'tablespoon',
      prep: 'minced',
      name: 'garlic',
      toTaste: true,
      optional: false,
      rangedAmount: {
        id: '1',
        min: '5',
        max: '10',
        createdAt: '2020-05-10 00:07:45.511 +00:00',
        updatedAt: '2020-05-10 00:08:45.511 +00:00',
        ingredientId: '1',
      },
      updatedAt: '2020-05-10 00:10:45.511 +00:00',
    };
    expect(ingredientReducer({ ingredient })).toMatchSnapshot();
  });
});

describe('rangedAmountReducer', () => {
  it('properly reduces ranged amount', () => {
    const rangedAmount = {
      id: '1',
      min: '5',
      max: '10',
      createdAt: '2020-05-10 00:07:45.511 +00:00',
      updatedAt: '2020-05-10 00:08:45.511 +00:00',
      ingredientId: '1',
    };
    expect(rangedAmountReducer({ rangedAmount })).toMatchSnapshot();
  });
});

describe('tagsReducer', () => {
  it('empty array', () => {
    const recipeTags = [];
    expect(tagsReducer({ recipeTags })).toEqual([]);
  });

  it('properly reduces tags', () => {
    const recipeTags = [
      {
        id: 1,
        label: 'bread',
        reatedAt: '2020-05-22T22:25:23.214Z',
        updatedAt: '2020-05-22T22:25:23.214Z',
        tagTypeId: 2,
        recipeTag: {
          createdAt: '2020-05-23T00:20:55.988Z',
          updatedAt: '2020-05-23T00:20:55.988Z',
          recipeId: 123,
          tagId: 1,
        },
        tagType: {
          id: 2,
          label: 'category',
          createdAt: '2020-05-22T22:25:14.275Z',
          updatedAt: '2020-05-22T22:25:14.275Z',
        },
      },
      {
        id: 2,
        label: 'snack',
        reatedAt: '2020-05-22T22:25:23.214Z',
        updatedAt: '2020-05-22T22:25:23.214Z',
        tagTypeId: 4,
        recipeTag: {
          createdAt: '2020-05-23T00:20:55.988Z',
          updatedAt: '2020-05-23T00:20:55.988Z',
          recipeId: 4,
          tagId: 2,
        },
        tagType: {
          id: 4,
          label: 'meal_type',
          createdAt: '2020-05-22T22:25:14.275Z',
          updatedAt: '2020-05-22T22:25:14.275Z',
        },
      },
    ];
    expect(tagsReducer({ recipeTags })).toMatchSnapshot();
  });
});

describe('metaReducer', () => {
  it('empty object', () => {
    const metaObj = {};
    expect(metaReducer(metaObj)).toEqual({});
  });

  it('different created and updated dates', () => {
    const metaObj = {
      createdAt: '2020-05-23 14:34:55.641 +00:00',
      updatedAt: '2020-05-23 14:34:55.641 +00:00',
    };
    expect(metaReducer(metaObj)).toEqual({
      dateAdded: metaObj.createdAt,
    });
  });

  it('same created and updated dates', () => {
    const metaObj = {
      createdAt: '2020-05-20 14:34:55.641 +00:00',
      updatedAt: '2020-05-23 14:34:55.641 +00:00',
    };
    expect(metaReducer(metaObj)).toEqual({
      dateAdded: metaObj.createdAt,
      dateUpdated: metaObj.updatedAt,
    });
  });
});
