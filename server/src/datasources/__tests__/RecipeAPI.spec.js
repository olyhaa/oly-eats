import RecipeAPI from '../RecipeAPI';
import { TIMINGS, TIME_UNITS } from '../../constants';

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
];

const mockDirectionStep = [
  {
    id: '1',
    text: 'step 1',
    recipeid: '123',
    createdAt: '2020-05-10 00:09:45.511 +00:00',
    updatedAt: '2020-05-10 00:10:45.511 +00:00',
  },
  {
    id: '2',
    text: 'step 2',
    recipeid: '123',
    createdAt: '2020-05-10 00:11:45.511 +00:00',
    updatedAt: '2020-05-10 00:12:45.511 +00:00',
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
describe.skip('timeReducer', () => {});
describe.skip('directionsReducer', () => {});
describe.skip('directionStepsReducer', () => {});

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

    const createdBaseFields = Object.assign({}, recipeBaseFieldsInput);
    createdBaseFields.id = '123';
    createdBaseFields.createdAt = '2020-05-10 00:00:45.511 +00:00';
    createdBaseFields.updatedAt = '2020-05-10 00:00:45.511 +00:00';

    const timeFieldsInput = {
      prepTime: [{ value: '2', units: TIME_UNITS.MINUTE }],
      totalTime: [
        { value: '20', units: TIME_UNITS.MINUTE, type: TIMINGS.TOTAL },
        { value: '1', units: TIME_UNITS.HOUR, type: TIMINGS.TOTAL },
      ],
    };
    const prepTimeArray = recipeDatasource.constructTimeObj({
      recipeid: createdBaseFields.id,
      newFields: timeFieldsInput.prepTime[0],
      type: TIMINGS.PREP_TIME,
    });
    prepTimeArray.id = '1';
    prepTimeArray.createdAt = '2020-05-10 00:00:45.511 +00:00';
    prepTimeArray.updatedAt = '2020-05-10 00:00:45.511 +00:00';

    const totalTimeArray = [
      recipeDatasource.constructTimeObj({
        recipeid: createdBaseFields.id,
        newFields: timeFieldsInput.totalTime[0],
        type: TIMINGS.TOTAL_TIME,
      }),
      recipeDatasource.constructTimeObj({
        recipeid: createdBaseFields.id,
        newFields: timeFieldsInput.totalTime[1],
        type: TIMINGS.TOTAL_TIME,
      }),
    ];
    totalTimeArray[0].id = '2';
    totalTimeArray[0].createdAt = '2020-05-10 00:00:45.511 +00:00';
    totalTimeArray[0].updatedAt = '2020-05-10 00:00:45.511 +00:00';
    totalTimeArray[1].id = '3';
    totalTimeArray[1].createdAt = '2020-05-10 00:00:45.511 +00:00';
    totalTimeArray[1].updatedAt = '2020-05-10 00:00:45.511 +00:00';

    mockStore.Recipe.create.mockReturnValueOnce(createdBaseFields);
    mockStore.Timing.create
      .mockReturnValueOnce(prepTimeArray)
      .mockReturnValueOnce(totalTimeArray[0])
      .mockReturnValueOnce(totalTimeArray[1]);

    const recipe = {
      ...recipeBaseFieldsInput,
      ...timeFieldsInput,
    };

    // check the result of the fn
    const res = await recipeDatasource.addRecipe({
      recipe,
    });
    expect(res).toMatchSnapshot();

    // make sure store is called properly
    expect(mockStore.Recipe.create).toBeCalledWith(recipeBaseFieldsInput);
    expect(mockStore.Timing.create).toBeCalledTimes(3);
  });
});

describe.skip('addDirections', () => {});
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
      expect(
        recipeDatasource.constructDirectionSectionObj({
          recipeid: '1',
          newFields,
        })
      ).toEqual({});
    });

    it('undefined object', () => {
      const newFields = undefined;
      expect(
        recipeDatasource.constructDirectionSectionObj({
          recipeid: '1',
          newFields,
        })
      ).toEqual({});
    });

    it('object without relevant fields', () => {
      const newFields = { some_garbage_field: 'with some garbage values' };
      expect(
        recipeDatasource.constructDirectionSectionObj({
          recipeid: '1',
          directions: newFields,
        })
      ).toEqual({});
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
        directions: newFields,
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
        directions: allFields,
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

describe('getRecipeData', () => {});
