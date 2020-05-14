import {
  timeReducer,
  directionsReducer,
  directionStepsReducer,
  ingredientsReducer,
  ingredientReducer,
  rangedAmountReducer,
  tagsReducer,
  recipeReducer,
} from '../RecipeReducer';
import { TIMINGS, TIME_UNITS } from '../../constants';

const mockTimings = [
  {
    id: '1',
    recipeid: '123',
    value: '2',
    units: TIME_UNITS.MINUTE,
    type: TIMINGS.PREP_TIME,
    createdAt: '2020-05-10 00:02:45.511 +00:00',
    updatedAt: '2020-05-10 00:03:45.511 +00:00',
  },
  {
    id: '2',
    recipeid: '123',
    value: '20',
    units: TIME_UNITS.MINUTE,
    type: TIMINGS.TOTAL_TIME,
    createdAt: '2020-05-10 00:04:45.511 +00:00',
    updatedAt: '2020-05-10 00:05:45.511 +00:00',
  },
  {
    id: '3',
    recipeid: '123',
    value: '1',
    units: TIME_UNITS.HOUR,
    type: TIMINGS.TOTAL_TIME,
    createdAt: '2020-05-10 00:06:45.511 +00:00',
    updatedAt: '2020-05-10 00:07:45.511 +00:00',
  },
];

const mockDirectionStep = [
  {
    id: '1',
    text: 'step 1',
    sectionid: '2',
    createdAt: '2020-05-10 00:09:45.511 +00:00',
    updatedAt: '2020-05-10 00:10:45.511 +00:00',
  },
  {
    id: '2',
    text: 'step 2',
    sectionid: '2',
    createdAt: '2020-05-10 00:11:45.511 +00:00',
    updatedAt: '2020-05-10 00:12:45.511 +00:00',
  },
  {
    id: '3',
    text: 'step 1',
    sectionid: '1',
    createdAt: '2020-05-10 00:09:45.511 +00:00',
    updatedAt: '2020-05-10 00:10:45.511 +00:00',
  },
];

const fullRecipe = {
  recipe: {
    id: '123',
    title: 'my first recipe',
    description: 'the best recipe ever',
    source_display: "Mandy's Kitchen",
    source_url: 'http://some.url.com/recipe',
    photo_url: 'http://some.url.com/pic.jpg',
    servings: 2,
    createdAt: '2020-05-10 00:00:45.511 +00:00',
    updatedAt: '2020-05-10 00:01:45.511 +00:00',
  },
  prepTimeArray: [
    {
      id: '1',
      recipeid: '123',
      value: '2',
      units: 'MINUTE',
      type: 'PREP',
      createdAt: '2020-05-10 00:02:45.511 +00:00',
      updatedAt: '2020-05-10 00:03:45.511 +00:00',
    },
  ],
  totalTimeArray: [
    {
      id: '2',
      recipeid: '123',
      value: '20',
      units: 'MINUTE',
      type: 'TOTAL',
      createdAt: '2020-05-10 00:04:45.511 +00:00',
      updatedAt: '2020-05-10 00:05:45.511 +00:00',
    },
    {
      id: '3',
      recipeid: '123',
      value: '1',
      units: 'HOUR',
      type: 'TOTAL',
      createdAt: '2020-05-10 00:06:45.511 +00:00',
      updatedAt: '2020-05-10 00:07:45.511 +00:00',
    },
  ],
  directionSections: [
    {
      id: '1',
      label: 'section 1',
      recipeid: '123',
      createdAt: '2020-05-10 00:07:45.511 +00:00',
      updatedAt: '2020-05-10 00:08:45.511 +00:00',
      steps: [
        {
          id: '1',
          text: 'step 1',
          sectionid: '2',
          createdAt: '2020-05-10 00:09:45.511 +00:00',
          updatedAt: '2020-05-10 00:10:45.511 +00:00',
        },
        {
          id: '2',
          text: 'step 2',
          sectionid: '2',
          createdAt: '2020-05-10 00:11:45.511 +00:00',
          updatedAt: '2020-05-10 00:12:45.511 +00:00',
        },
      ],
    },
  ],
  ingredientSections: [
    {
      id: '1',
      label: 'ingredient section 1',
      recipeid: '102',
      createdAt: '2020-05-10 00:07:45.511 +00:00',
      updatedAt: '2020-05-10 00:08:45.511 +00:00',
      ingredients: [
        {
          id: '1',
          amount: '2',
          unit: 'cup',
          prep: 'chopped',
          name: 'apples',
          toTaste: true,
          optional: true,
          sectionid: '2',
          createdAt: '2020-05-10 00:07:45.511 +00:00',
          updatedAt: '2020-05-10 00:08:45.511 +00:00',
        },
        {
          id: '2',
          unit: 'tablespoon',
          prep: 'minced',
          name: 'garlic',
          toTaste: true,
          optional: false,
          sectionid: '2',
          createdAt: '2020-05-10 00:07:45.511 +00:00',
          updatedAt: '2020-05-10 00:08:45.511 +00:00',
          rangedAmount: {
            id: '1',
            min: '5',
            max: '10',
            createdAt: '2020-05-10 00:07:45.511 +00:00',
            updatedAt: '2020-05-10 00:08:45.511 +00:00',
            ingredientid: '2',
          },
        },
      ],
    },
  ],
  recipeTags: [
    {
      id: '1',
      recipeid: '123',
      tagid: '1',
      createdAt: '2020-05-10 00:07:45.511 +00:00',
      updatedAt: '2020-05-10 00:08:45.511 +00:00',
    },
    {
      id: '2',
      recipeid: '123',
      tagid: '23',
      createdAt: '2020-05-10 00:07:45.511 +00:00',
      updatedAt: '2020-05-10 00:08:45.511 +00:00',
    },
  ],
};

describe('recipeReducer', () => {
  it('missing recipe component', () => {
    const recipe = Object.assign({}, fullRecipe);
    recipe.recipe = undefined;
    expect(recipeReducer({ ...recipe })).toBeNull();
  });

  it('all recipe components', () => {
    expect(recipeReducer(fullRecipe)).toMatchSnapshot();
  });
});

describe('recipeMutationReducer', () => {});

describe('timeReducer', () => {
  it('properly reduces direction step array', () => {
    const timeArray = [mockTimings[1], mockTimings[2]];
    expect(timeReducer({ timeArray })).toMatchSnapshot();
  });
});

describe('directionsReducer', () => {
  it('properly reduces direction array', () => {
    const directionSections = [
      {
        createdAt: '2020-05-10 00:07:45.511 +00:00',
        id: '1',
        label: 'section 1',
        recipeid: '123',
        steps: [
          {
            createdAt: '2020-05-10 00:09:45.511 +00:00',
            id: '3',
            sectionid: '1',
            text: 'step 1',
            updatedAt: '2020-05-10 00:10:45.511 +00:00',
          },
        ],
        updatedAt: '2020-05-10 00:08:45.511 +00:00',
      },
      {
        createdAt: '2020-05-10 00:07:45.511 +00:00',
        id: '2',
        recipeid: '123',
        steps: [
          {
            createdAt: '2020-05-10 00:09:45.511 +00:00',
            id: '1',
            sectionid: '2',
            text: 'step 1',
            updatedAt: '2020-05-10 00:10:45.511 +00:00',
          },
          {
            createdAt: '2020-05-10 00:11:45.511 +00:00',
            id: '2',
            sectionid: '2',
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
        recipeid: '123',
        ingredients: [
          {
            createdAt: '2020-05-10 00:09:45.511 +00:00',
            id: '3',
            sectionid: '1',
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
        recipeid: '123',
        ingredients: [
          {
            createdAt: '2020-05-10 00:09:45.511 +00:00',
            id: '1',
            sectionid: '2',
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
              ingredientid: '1',
            },
            updatedAt: '2020-05-10 00:10:45.511 +00:00',
          },
          {
            createdAt: '2020-05-10 00:11:45.511 +00:00',
            id: '2',
            sectionid: '2',
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
      sectionid: '2',
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
        ingredientid: '1',
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
      ingredientid: '1',
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
        id: '1',
        recipeid: '2',
        tagid: '3',
      },
      {
        id: '2',
        recipeid: '2',
        tagid: '4',
      },
    ];
    expect(tagsReducer({ recipeTags })).toMatchSnapshot();
  });
});
