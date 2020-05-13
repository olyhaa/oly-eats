import RecipeAPI from '../RecipeAPI';
import { TIMINGS, TIME_UNITS } from '../../constants';
import { addDBFields } from '../../testUtils';

const mockRecipes = [
  {
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
];

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

const mockDirectionSection = [
  {
    id: '1',
    label: 'section 1',
    recipeid: '123',
    createdAt: '2020-05-10 00:07:45.511 +00:00',
    updatedAt: '2020-05-10 00:08:45.511 +00:00',
  },
  {
    id: '2',
    recipeid: '123',
    createdAt: '2020-05-10 00:07:45.511 +00:00',
    updatedAt: '2020-05-10 00:08:45.511 +00:00',
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

const mockStore = {
  Recipe: {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
  },
  Timing: {
    create: jest.fn(),
    findAll: jest.fn(),
  },
  DirectionSection: {
    create: jest.fn(),
    findAll: jest.fn(),
  },
  DirectionStep: {
    create: jest.fn(),
    findAll: jest.fn(),
  },
};
const recipeDatasource = new RecipeAPI({ store: mockStore });

afterEach(() => {
  jest.clearAllMocks();
});

describe.skip('recipeReducer', () => {});
describe.skip('recipeMutationReducer', () => {});

describe('timeReducer', () => {
  it('properly reduces direction step array', () => {
    const timeArray = [mockTimings[1], mockTimings[2]];
    expect(recipeDatasource.timeReducer({ timeArray })).toMatchSnapshot();
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
    expect(
      recipeDatasource.directionsReducer({ directionSections })
    ).toMatchSnapshot();
  });
});

describe('directionStepsReducer', () => {
  it('properly reduces direction step array', () => {
    expect(
      recipeDatasource.directionStepsReducer({ steps: mockDirectionStep })
    ).toMatchSnapshot();
  });
});

describe('getAllRecipes', () => {
  it('returns empty array for empty db', async () => {
    mockStore.Recipe.findAll.mockReturnValueOnce([]);

    const response = await recipeDatasource.getAllRecipes();

    expect(mockStore.Recipe.findAll).toBeCalledWith();
    expect(response).toEqual([]);
  });

  it('returns array of recipes', async () => {
    mockStore.Recipe.findAll.mockReturnValueOnce(mockRecipes);
    mockStore.Recipe.findByPk.mockReturnValueOnce(mockRecipes[0]);
    mockStore.Timing.findAll
      .mockReturnValueOnce(mockTimings.slice(0, 1))
      .mockReturnValueOnce(mockTimings.slice(1, 3));

    const response = await recipeDatasource.getAllRecipes();

    expect(mockStore.Recipe.findAll).toBeCalledWith();
    expect(mockStore.Recipe.findByPk).toBeCalledWith(mockRecipes[0].id);
    expect(mockStore.Timing.findAll).toHaveBeenNthCalledWith(1, {
      where: { recipeid: mockRecipes[0].id, type: TIMINGS.PREP_TIME },
    });
    expect(mockStore.Timing.findAll).toHaveBeenNthCalledWith(2, {
      where: { recipeid: mockRecipes[0].id, type: TIMINGS.TOTAL_TIME },
    });
    expect(response).toMatchSnapshot();
  });
});

describe('getRecipe', () => {
  it('returns null when id does not exist', async () => {
    mockStore.Recipe.findByPk.mockReturnValueOnce(null);
    const bad_id = 'bad_id';

    const response = await recipeDatasource.getRecipe({ id: bad_id });

    expect(mockStore.Recipe.findByPk).toBeCalledWith(bad_id);
    expect(response).toEqual(null);
  });

  it('returns recipe', async () => {
    mockStore.Recipe.findByPk.mockReturnValueOnce(mockRecipes[0]);
    mockStore.Timing.findAll
      .mockReturnValueOnce(mockTimings.slice(0, 1))
      .mockReturnValueOnce(mockTimings.slice(1, 3));
    mockStore.DirectionSection.findAll.mockReturnValueOnce(
      mockDirectionSection.slice(0, 1)
    );
    mockStore.DirectionStep.findAll.mockReturnValueOnce(
      mockDirectionStep.slice(0, 2)
    );

    const response = await recipeDatasource.getRecipe({
      id: mockRecipes[0].id,
    });

    expect(mockStore.Recipe.findByPk).toBeCalledWith(mockRecipes[0].id);

    expect(mockStore.Timing.findAll).toHaveBeenCalledTimes(2);
    expect(mockStore.Timing.findAll).toHaveBeenNthCalledWith(1, {
      where: { recipeid: mockRecipes[0].id, type: TIMINGS.PREP_TIME },
    });
    expect(mockStore.Timing.findAll).toHaveBeenNthCalledWith(2, {
      where: { recipeid: mockRecipes[0].id, type: TIMINGS.TOTAL_TIME },
    });
    expect(mockStore.DirectionSection.findAll).toHaveBeenCalledWith({
      where: { recipeid: mockRecipes[0].id },
    });
    expect(mockStore.DirectionStep.findAll).toHaveBeenCalledWith({
      where: { sectionid: mockDirectionSection[0].id },
    });

    expect(response).toMatchSnapshot();
  });
});

describe('deleteRecipe', () => {
  it('calls store destroy and returns result - id exists', async () => {
    const findPkVal = Object.assign({}, mockRecipes[0]);
    findPkVal.destroy = jest.fn();

    mockStore.Recipe.findByPk.mockReturnValueOnce(findPkVal);
    findPkVal.destroy.mockReturnValueOnce('done');

    // check the result of the fn
    const res = await recipeDatasource.deleteRecipe({ id: findPkVal.id });
    expect(res).toMatchSnapshot();

    // make sure store is called properly
    expect(mockStore.Recipe.findByPk).toBeCalledWith(findPkVal.id);
    expect(findPkVal.destroy).toBeCalled();
  });

  it('calls store destroy and returns result - id not found', async () => {
    mockStore.Recipe.findByPk.mockReturnValueOnce(null);
    const bad_id = 'bad id';

    // check the result of the fn
    const res = await recipeDatasource.deleteRecipe({ id: bad_id });
    expect(res).toMatchSnapshot();

    expect(mockStore.Recipe.findByPk).toBeCalledWith(bad_id);
  });
});

describe('addRecipe', () => {
  it('calls store creator and returns result', async () => {
    const recipeBaseFieldsInput = {
      title: 'my title',
      description: 'some description',
      source_display: 'My Recipe source',
      source_url: 'http://source.com',
      photo_url: 'http://photos.com/mine.jpg',
      servings: 4,
    };
    const dbBaseFields = addDBFields({
      fields: recipeBaseFieldsInput,
      id: '123',
    });

    const timeFieldsInput = {
      prepTime: [{ value: '2', units: TIME_UNITS.MINUTE }],
      totalTime: [
        { value: '20', units: TIME_UNITS.MINUTE },
        { value: '1', units: TIME_UNITS.HOUR },
      ],
    };
    const dbPrepTimeArray = [
      addDBFields({
        id: '1',
        fields: recipeDatasource.constructTimeObj({
          recipeid: dbBaseFields.id,
          newFields: timeFieldsInput.prepTime[0],
          type: TIMINGS.PREP_TIME,
        }),
      }),
    ];

    const dbTotalTimeArray = [
      addDBFields({
        id: '2',
        fields: recipeDatasource.constructTimeObj({
          recipeid: dbBaseFields.id,
          newFields: timeFieldsInput.totalTime[0],
          type: TIMINGS.TOTAL_TIME,
        }),
      }),
      addDBFields({
        id: '3',
        fields: recipeDatasource.constructTimeObj({
          recipeid: dbBaseFields.id,
          newFields: timeFieldsInput.totalTime[1],
          type: TIMINGS.TOTAL_TIME,
        }),
      }),
    ];

    const directionsInput = [
      {
        label: 'section 1',
        steps: [
          {
            text: 'step 1',
          },
          {
            text: 'step 2',
          },
        ],
      },
    ];
    const dbDirectionsFields = addDBFields({
      fields: {
        label: directionsInput[0].label,
        recipeid: dbBaseFields.id,
      },
      id: '1',
    });

    const dbStepFields = [
      addDBFields({
        fields: {
          text: directionsInput[0].steps[0].text,
          sectionid: dbDirectionsFields.id,
        },
        id: '1',
      }),
      addDBFields({
        fields: {
          text: directionsInput[0].steps[1].text,
          sectionid: dbDirectionsFields.id,
        },
        id: '2',
      }),
    ];

    mockStore.Recipe.create.mockReturnValueOnce(dbBaseFields);
    mockStore.Timing.create
      .mockReturnValueOnce(dbPrepTimeArray[0])
      .mockReturnValueOnce(dbTotalTimeArray[0])
      .mockReturnValueOnce(dbTotalTimeArray[1]);
    mockStore.DirectionSection.create.mockReturnValueOnce(dbDirectionsFields);
    mockStore.DirectionStep.create
      .mockReturnValueOnce(dbStepFields[0])
      .mockReturnValueOnce(dbStepFields[1]);

    const recipe = {
      ...recipeBaseFieldsInput,
      ...timeFieldsInput,
      directions: directionsInput,
    };

    // check the result of the fn
    const res = await recipeDatasource.addRecipe({
      recipe,
    });
    expect(res).toMatchSnapshot();

    // make sure store is called properly
    expect(mockStore.Recipe.create).toBeCalledWith(recipeBaseFieldsInput);

    expect(mockStore.Timing.create).toBeCalledTimes(3);
    expect(mockStore.Timing.create).toHaveBeenNthCalledWith(1, {
      recipeid: mockRecipes[0].id,
      type: TIMINGS.PREP_TIME,
      ...timeFieldsInput.prepTime[0],
    });
    expect(mockStore.Timing.create).toHaveBeenNthCalledWith(2, {
      recipeid: mockRecipes[0].id,
      type: TIMINGS.TOTAL_TIME,
      ...timeFieldsInput.totalTime[0],
    });
    expect(mockStore.Timing.create).toHaveBeenNthCalledWith(3, {
      recipeid: mockRecipes[0].id,
      type: TIMINGS.TOTAL_TIME,
      ...timeFieldsInput.totalTime[1],
    });

    expect(mockStore.DirectionSection.create).toBeCalledWith({
      label: directionsInput[0].label,
      recipeid: dbBaseFields.id,
    });
    expect(mockStore.DirectionStep.create).toBeCalledTimes(2);
    expect(mockStore.DirectionStep.create).toHaveBeenNthCalledWith(1, {
      sectionid: dbDirectionsFields.id,
      text: directionsInput[0].steps[0].text,
    });
    expect(mockStore.DirectionStep.create).toHaveBeenNthCalledWith(2, {
      sectionid: dbDirectionsFields.id,
      text: directionsInput[0].steps[1].text,
    });
  });
});

describe('addDirections', () => {
  it('empty object', async () => {
    const directions = {};

    const res = await recipeDatasource.addDirections({
      recipeid: '45',
      directions,
    });

    expect(res).toEqual([]);
  });

  it('single section, no steps provided, only label', async () => {
    mockStore.DirectionSection.create.mockReturnValueOnce(
      mockDirectionSection[0]
    );

    const directions = [{ label: 'section 1' }];
    const recipeid = '101';

    const res = await recipeDatasource.addDirections({
      recipeid,
      directions,
    });

    expect(res).toMatchSnapshot();
    expect(mockStore.DirectionSection.create).toBeCalledWith({
      label: directions[0].label,
      recipeid,
    });
    expect(mockStore.DirectionStep.create).toBeCalledTimes(0);
  });

  it('single section, only steps provided, no label', async () => {
    mockStore.DirectionSection.create.mockReturnValueOnce(
      mockDirectionSection[1]
    );
    mockStore.DirectionStep.create
      .mockReturnValueOnce(mockDirectionStep[0])
      .mockReturnValueOnce(mockDirectionStep[1]);

    const directions = [
      {
        steps: [
          {
            text: 'step 1',
          },
          {
            text: 'step 2',
          },
        ],
      },
    ];

    const res = await recipeDatasource.addDirections({
      recipeid: mockDirectionSection[0].recipeid,
      directions,
    });

    expect(res).toMatchSnapshot();

    expect(mockStore.DirectionSection.create).toBeCalledWith({
      recipeid: mockDirectionSection[0].recipeid,
    });

    expect(mockStore.DirectionStep.create).toBeCalledTimes(2);
    expect(mockStore.DirectionStep.create).toHaveBeenNthCalledWith(1, {
      sectionid: mockDirectionSection[1].id,
      text: directions[0].steps[0].text,
    });
    expect(mockStore.DirectionStep.create).toHaveBeenNthCalledWith(2, {
      sectionid: mockDirectionSection[1].id,
      text: directions[0].steps[1].text,
    });
  });

  it('single direction section, all fields', async () => {
    mockStore.DirectionSection.create.mockReturnValueOnce(
      mockDirectionSection[0]
    );
    mockStore.DirectionStep.create.mockReturnValueOnce(mockDirectionStep[2]);

    const directions = [
      {
        label: mockDirectionSection[0].label,
        steps: [
          {
            text: mockDirectionStep[2].text,
          },
        ],
      },
    ];

    const res = await recipeDatasource.addDirections({
      recipeid: mockDirectionSection[0].recipeid,
      directions,
    });

    expect(res).toMatchSnapshot();

    expect(mockStore.DirectionSection.create).toBeCalledWith({
      recipeid: mockDirectionSection[0].recipeid,
      label: mockDirectionSection[0].label,
    });

    expect(mockStore.DirectionStep.create).toBeCalledWith({
      sectionid: mockDirectionSection[0].id,
      text: mockDirectionStep[2].text,
    });
  });

  it('multiple direction sections', async () => {
    mockStore.DirectionSection.create
      .mockReturnValueOnce(mockDirectionSection[0])
      .mockReturnValueOnce(mockDirectionSection[1]);
    mockStore.DirectionStep.create
      .mockReturnValueOnce(mockDirectionStep[2])
      .mockReturnValueOnce(mockDirectionStep[0])
      .mockReturnValueOnce(mockDirectionStep[1]);

    const directions = [
      {
        label: mockDirectionSection[0].label,
        steps: [
          {
            text: mockDirectionStep[2].text,
          },
        ],
      },
      {
        steps: [
          {
            text: mockDirectionStep[0].text,
          },
          {
            text: mockDirectionStep[1].text,
          },
        ],
      },
    ];

    const res = await recipeDatasource.addDirections({
      recipeid: mockDirectionSection[0].recipeid,
      directions,
    });

    expect(res).toMatchSnapshot();

    expect(mockStore.DirectionSection.create).toBeCalledTimes(2);
    expect(mockStore.DirectionSection.create).toHaveBeenNthCalledWith(1, {
      recipeid: mockDirectionSection[0].recipeid,
      label: mockDirectionSection[0].label,
    });

    expect(mockStore.DirectionSection.create).toHaveBeenNthCalledWith(2, {
      recipeid: mockDirectionSection[1].recipeid,
    });

    expect(mockStore.DirectionStep.create).toBeCalledTimes(3);
    expect(mockStore.DirectionStep.create).toHaveBeenNthCalledWith(1, {
      sectionid: mockDirectionSection[0].id,
      text: directions[0].steps[0].text,
    });
    expect(mockStore.DirectionStep.create).toHaveBeenNthCalledWith(2, {
      sectionid: mockDirectionSection[1].id,
      text: directions[1].steps[0].text,
    });
    expect(mockStore.DirectionStep.create).toHaveBeenNthCalledWith(3, {
      sectionid: mockDirectionSection[1].id,
      text: directions[1].steps[1].text,
    });
  });
});

describe.skip('updateRecipe', () => {});

describe('constructBaseRecipeObj', () => {
  describe('no base recipe fields', () => {
    it('empty object', () => {
      const newFields = {};
      expect(recipeDatasource.constructBaseRecipeObj(newFields)).toEqual({});
    });
    it('object without relevant fields', () => {
      const newFields = { some_garbage_field: 'with some garbage values' };
      expect(recipeDatasource.constructBaseRecipeObj(newFields)).toEqual({});
    });
  });

  describe('only base recipe fields', () => {
    it('has all fields', () => {
      const newFields = {
        title: 'my title',
        description: 'some description',
        source_display: 'My Recipe source',
        source_url: 'http://source.com',
        photo_url: 'http://photos.com/mine.jpg',
        servings: 4,
      };
      expect(recipeDatasource.constructBaseRecipeObj(newFields)).toEqual(
        newFields
      );
    });

    it('has subset of fields', () => {
      const newFields = {
        title: 'my title',
        description: 'some description',
      };
      expect(recipeDatasource.constructBaseRecipeObj(newFields)).toEqual(
        newFields
      );
    });
  });

  it('base recipe fields + others', () => {
    const baseFields = {
      title: 'my title',
      description: 'some description',
      source_display: 'My Recipe source',
      source_url: 'http://source.com',
      photo_url: 'http://photos.com/mine.jpg',
      servings: 4,
    };
    const allFields = Object.assign({}, baseFields);
    allFields.some_garbage_field = 'some garbage';
    expect(recipeDatasource.constructBaseRecipeObj(allFields)).toEqual(
      baseFields
    );
  });
});

describe('constructTimeObj', () => {
  describe('no time fields', () => {
    it('empty object', () => {
      const newFields = {};
      expect(
        recipeDatasource.constructTimeObj({
          recipeid: '1',
          newFields,
          type: TIMINGS.PREP,
        })
      ).toEqual({});
    });

    it('undefined object', () => {
      const newFields = undefined;
      expect(
        recipeDatasource.constructTimeObj({
          recipeid: '1',
          newFields,
          type: TIMINGS.PREP,
        })
      ).toEqual({});
    });

    it('object without relevant fields', () => {
      const newFields = { some_garbage_field: 'with some garbage values' };
      expect(
        recipeDatasource.constructTimeObj({
          recipeid: '1',
          newFields,
          type: TIMINGS.PREP,
        })
      ).toEqual({});
    });
  });

  describe('only time fields', () => {
    it('has all fields', () => {
      const newFields = {
        value: '2',
        units: TIME_UNITS.MINUTE,
      };
      const expectedFields = Object.assign({}, newFields);
      expectedFields.type = TIMINGS.PREP;
      expectedFields.recipeid = '1';

      expect(
        recipeDatasource.constructTimeObj({
          recipeid: expectedFields.recipeid,
          newFields,
          type: expectedFields.type,
        })
      ).toEqual(expectedFields);
    });

    it('has subset of fields', () => {
      const newFields = {
        units: TIME_UNITS.MINUTE,
      };
      const expectedFields = Object.assign({}, newFields);
      expectedFields.type = TIMINGS.PREP;
      expectedFields.recipeid = '1';
      expect(
        recipeDatasource.constructTimeObj({
          recipeid: expectedFields.recipeid,
          newFields,
          type: expectedFields.type,
        })
      ).toEqual(expectedFields);
    });
  });

  it('time fields + others', () => {
    const baseFields = {
      value: '2',
      units: TIME_UNITS.MINUTE,
    };
    const allFields = Object.assign({}, baseFields);
    allFields.some_garbage_field = 'some garbage';
    const expectedFields = Object.assign({}, baseFields);
    expectedFields.type = TIMINGS.PREP;
    expectedFields.recipeid = '1';
    expect(
      recipeDatasource.constructTimeObj({
        recipeid: expectedFields.recipeid,
        newFields: allFields,
        type: expectedFields.type,
      })
    ).toEqual(expectedFields);
  });
});

describe('constructDirectionSectionObj', () => {
  describe('no direction fields', () => {
    it('empty object', () => {
      const newFields = {};
      const recipeid = '1';
      expect(
        recipeDatasource.constructDirectionSectionObj({
          recipeid,
          newFields,
        })
      ).toEqual({ recipeid });
    });

    it('undefined object', () => {
      const newFields = undefined;
      const recipeid = '1';
      expect(
        recipeDatasource.constructDirectionSectionObj({
          recipeid,
          newFields,
        })
      ).toEqual({ recipeid });
    });

    it('object without relevant fields', () => {
      const newFields = { some_garbage_field: 'with some garbage values' };
      const recipeid = '1';
      expect(
        recipeDatasource.constructDirectionSectionObj({
          recipeid,
          section: newFields,
        })
      ).toEqual({ recipeid });
    });
  });

  it('only direction fields', () => {
    const newFields = {
      label: 'direction section',
      steps: [
        {
          text: 'step 1',
        },
        {
          text: 'step 2',
        },
      ],
    };
    const expectedFields = { label: newFields.label, recipeid: '45' };

    expect(
      recipeDatasource.constructDirectionSectionObj({
        recipeid: expectedFields.recipeid,
        section: newFields,
      })
    ).toEqual(expectedFields);
  });

  it('direction fields + others', () => {
    const baseFields = {
      label: 'direction section',
      steps: [
        {
          text: 'step 1',
        },
        {
          text: 'step 2',
        },
      ],
    };
    const allFields = Object.assign({}, baseFields);
    allFields.some_garbage_field = 'some garbage';
    const expectedFields = { label: baseFields.label, recipeid: '45' };
    expect(
      recipeDatasource.constructDirectionSectionObj({
        recipeid: expectedFields.recipeid,
        section: allFields,
      })
    ).toEqual(expectedFields);
  });
});

describe('constructDirectionStepObj', () => {
  describe('no step fields', () => {
    it('empty object', () => {
      const newFields = {};
      expect(
        recipeDatasource.constructDirectionStepObj({
          sectionid: '1',
          step: newFields,
        })
      ).toEqual({});
    });

    it('undefined object', () => {
      const newFields = undefined;
      expect(
        recipeDatasource.constructDirectionStepObj({
          sectionid: '1',
          step: newFields,
        })
      ).toEqual({});
    });

    it('object without relevant fields', () => {
      const newFields = { some_garbage_field: 'with some garbage values' };
      expect(
        recipeDatasource.constructDirectionStepObj({
          sectionid: '1',
          step: newFields,
        })
      ).toEqual({});
    });
  });

  it('only step fields', () => {
    const newFields = {
      text: 'step 1',
    };
    const expectedFields = Object.assign({}, newFields);
    expectedFields.sectionid = '56';

    expect(
      recipeDatasource.constructDirectionStepObj({
        sectionid: expectedFields.sectionid,
        step: newFields,
      })
    ).toEqual(expectedFields);
  });

  it('step fields + others', () => {
    const baseFields = {
      text: 'step 1',
    };
    const allFields = Object.assign({}, baseFields);
    allFields.some_garbage_field = 'some garbage';
    const expectedFields = Object.assign({}, baseFields);
    expectedFields.sectionid = '56';
    expect(
      recipeDatasource.constructDirectionStepObj({
        sectionid: expectedFields.sectionid,
        step: baseFields,
      })
    ).toEqual(expectedFields);
  });
});

describe('constructRangedObj', () => {
  describe('no ranged fields', () => {
    it('empty object', () => {
      expect(
        recipeDatasource.constructRangedObj({
          ingredientid: '1',
          amount: {},
        })
      ).toEqual({});
    });

    it('undefined object', () => {
      expect(
        recipeDatasource.constructRangedObj({
          ingredientid: '1',
          amount: undefined,
        })
      ).toEqual({});
    });

    it('string', () => {
      const newFields = undefined;
      expect(
        recipeDatasource.constructRangedObj({
          ingredientid: '1',
          amount: '34',
        })
      ).toEqual({});
    });

    it('object without relevant fields', () => {
      const newFields = { some_garbage_field: 'with some garbage values' };
      expect(
        recipeDatasource.constructRangedObj({
          recipeid: '1',
          amount: newFields,
        })
      ).toEqual({});
    });
  });

  describe('only ranged amount fields', () => {
    it('has all fields', () => {
      const newFields = {
        min: '2',
        max: '3',
      };
      const expectedFields = Object.assign({}, newFields);
      expectedFields.ingredientid = '42';

      expect(
        recipeDatasource.constructRangedObj({
          ingredientid: expectedFields.ingredientid,
          amount: newFields,
        })
      ).toEqual(expectedFields);
    });

    it('has subset of fields', () => {
      const newFields = {
        min: '2',
      };
      expect(
        recipeDatasource.constructRangedObj({
          ingredientid: '42',
          amount: newFields,
        })
      ).toEqual({});
    });
  });

  it('time fields + others', () => {
    const baseFields = {
      min: '2',
      max: '3',
    };
    const allFields = Object.assign({}, baseFields);
    allFields.some_garbage_field = 'some garbage';
    const expectedFields = Object.assign({}, baseFields);
    expectedFields.ingredientid = '42';
    expect(
      recipeDatasource.constructRangedObj({
        ingredientid: expectedFields.ingredientid,
        amount: allFields,
      })
    ).toEqual(expectedFields);
  });
});

describe('constructIngredientObj', () => {
  describe('no ingredient fields', () => {
    it('empty object', () => {
      expect(
        recipeDatasource.constructIngredientObj({
          sectionid: '1',
          ingredient: {},
        })
      ).toEqual({ sectionid: '1' });
    });

    it('undefined object', () => {
      expect(
        recipeDatasource.constructIngredientObj({
          sectionid: '1',
          ingredient: undefined,
        })
      ).toEqual({ sectionid: '1' });
    });

    it('object without relevant fields', () => {
      const newFields = { some_garbage_field: 'with some garbage values' };
      expect(
        recipeDatasource.constructIngredientObj({
          sectionid: '1',
          amount: newFields,
        })
      ).toEqual({ sectionid: '1' });
    });
  });

  describe('only ingredient fields', () => {
    it('has all fields', () => {
      const newFields = {
        amount: '2',
        unit: 'cup',
        prep: 'chopped',
        name: 'apples',
        toTaste: true,
        optional: true,
      };
      const expectedFields = Object.assign({}, newFields);
      expectedFields.sectionid = '42';

      expect(
        recipeDatasource.constructIngredientObj({
          sectionid: expectedFields.sectionid,
          ingredient: newFields,
        })
      ).toEqual(expectedFields);
    });

    it('has subset of fields', () => {
      const newFields = {
        prep: 'chopped',
        name: 'apples',
      };
      expect(
        recipeDatasource.constructIngredientObj({
          sectionid: '42',
          ingredient: newFields,
        })
      ).toMatchSnapshot();
    });
  });

  it('ingredient fields + others', () => {
    const baseFields = {
      amount: '2',
      prep: 'chopped',
      name: 'apples',
    };
    const allFields = Object.assign({}, baseFields);
    allFields.some_garbage_field = 'some garbage';
    const expectedFields = Object.assign({}, baseFields);
    expectedFields.sectionid = '42';
    expect(
      recipeDatasource.constructIngredientObj({
        sectionid: expectedFields.sectionid,
        ingredient: allFields,
      })
    ).toEqual(expectedFields);
  });
});

describe('constructIngredientSectionObj', () => {
  describe('no ingredient fields', () => {
    it('empty object', () => {
      const newFields = {};
      const recipeid = '1';
      expect(
        recipeDatasource.constructIngredientSectionObj({
          recipeid,
          newFields,
        })
      ).toEqual({ recipeid });
    });

    it('undefined object', () => {
      const newFields = undefined;
      const recipeid = '1';
      expect(
        recipeDatasource.constructIngredientSectionObj({
          recipeid,
          newFields,
        })
      ).toEqual({ recipeid });
    });

    it('object without relevant fields', () => {
      const newFields = { some_garbage_field: 'with some garbage values' };
      const recipeid = '1';
      expect(
        recipeDatasource.constructIngredientSectionObj({
          recipeid,
          section: newFields,
        })
      ).toEqual({ recipeid });
    });
  });

  it('only ingredient fields', () => {
    const newFields = {
      label: 'ingredient section',
      ingredients: [
        {
          amount: '2',
          name: 'apples',
        },
      ],
    };
    const expectedFields = { label: newFields.label, recipeid: '45' };

    expect(
      recipeDatasource.constructIngredientSectionObj({
        recipeid: expectedFields.recipeid,
        section: newFields,
      })
    ).toEqual(expectedFields);
  });

  it('ingredient fields + others', () => {
    const baseFields = {
      label: 'ingredient section',
      ingredients: [
        {
          amount: '2',
          name: 'apples',
        },
      ],
    };
    const allFields = Object.assign({}, baseFields);
    allFields.some_garbage_field = 'some garbage';
    const expectedFields = { label: baseFields.label, recipeid: '45' };
    expect(
      recipeDatasource.constructIngredientSectionObj({
        recipeid: expectedFields.recipeid,
        section: allFields,
      })
    ).toEqual(expectedFields);
  });
});

describe('getRecipeData', () => {});
