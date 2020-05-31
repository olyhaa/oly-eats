import RecipeAPI from '../RecipeAPI';
import { TIMINGS, TIME_UNITS } from '../../constants';
import { addDBFields } from '../../testUtils';

const pkParams = { include: { all: true, nested: true } };

const mockRecipes = [
  {
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
        value: '2',
        units: TIME_UNITS.MINUTE,
        type: TIMINGS.PREP_TIME,
        recipeId: 123,
        createdAt: '2020-05-10 00:02:45.511 +00:00',
        updatedAt: '2020-05-10 00:03:45.511 +00:00',
      },
      {
        id: 2,
        value: '20',
        units: TIME_UNITS.MINUTE,
        type: TIMINGS.TOTAL_TIME,
        recipeId: 123,
        createdAt: '2020-05-10 00:04:45.511 +00:00',
        updatedAt: '2020-05-10 00:05:45.511 +00:00',
      },
      {
        id: 3,
        value: '1',
        units: TIME_UNITS.HOUR,
        type: TIMINGS.TOTAL_TIME,
        recipeId: 123,
        createdAt: '2020-05-10 00:06:45.511 +00:00',
        updatedAt: '2020-05-10 00:07:45.511 +00:00',
      },
    ],
    directionSections: [
      {
        id: 2,
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
        recipeId: 123,
        createdAt: '2020-05-10 00:07:45.511 +00:00',
        updatedAt: '2020-05-10 00:08:45.511 +00:00',
        label: 'ingredient section 1',
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
        label: 'tag 1',
        tagTypeId: 1,
        recipeId: 123,
        tagid: 12,
        createdAt: '2020-05-10 00:07:45.511 +00:00',
        updatedAt: '2020-05-10 00:08:45.511 +00:00',
        recipeTag: {
          createdAt: '2020-05-23T00:20:58.070Z',
          updatedAt: '2020-05-23T00:20:58.070Z',
          recipeId: 123,
          tagId: 12,
        },
        tagType: {
          id: 1,
          label: 'category',
          createdAt: '2020-05-22T22:25:13.475Z',
          updatedAt: '2020-05-22T22:25:13.475Z',
        },
      },
      {
        id: 2,
        label: 'tag 2',
        recipeId: 123,
        tagid: 23,
        tagTypeId: 1,
        createdAt: '2020-05-10 00:07:45.511 +00:00',
        updatedAt: '2020-05-10 00:08:45.511 +00:00',
        recipeTag: {
          createdAt: '2020-05-23T00:20:58.070Z',
          updatedAt: '2020-05-23T00:20:58.070Z',
          recipeId: 123,
          tagId: 23,
        },
        tagType: {
          id: 1,
          label: 'category',
          createdAt: '2020-05-22T22:25:13.475Z',
          updatedAt: '2020-05-22T22:25:13.475Z',
        },
      },
    ],
  },
];

const mockTags = [
  {
    id: 1,
    recipeId: 123,
    tagid: 1,
    createdAt: '2020-05-10 00:07:45.511 +00:00',
    updatedAt: '2020-05-10 00:08:45.511 +00:00',
  },
  {
    id: 2,
    recipeId: 123,
    tagid: 23,
    createdAt: '2020-05-10 00:07:45.511 +00:00',
    updatedAt: '2020-05-10 00:08:45.511 +00:00',
  },
];

const mockStore = {
  Recipe: {
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
  },
  Timing: {
    destroy: jest.fn(),
  },
  DirectionSection: {
    destroy: jest.fn(),
  },
  IngredientSection: {
    destroy: jest.fn(),
  },
  RecipeTag: {
    create: jest.fn(),
    destroy: jest.fn(),
  },
};

const recipeDatasource = new RecipeAPI({ store: mockStore });

afterEach(() => {
  jest.clearAllMocks();
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

    const response = await recipeDatasource.getAllRecipes();

    expect(mockStore.Recipe.findAll).toBeCalledWith();
    expect(mockStore.Recipe.findByPk).toBeCalledWith(
      mockRecipes[0].id,
      pkParams
    );
    expect(response).toMatchSnapshot();
  });
});

describe('getRecipe', () => {
  it('returns null when id does not exist', async () => {
    mockStore.Recipe.findByPk.mockReturnValueOnce(null);
    const bad_id = 'bad_id';

    const response = await recipeDatasource.getRecipe({ id: bad_id });

    expect(mockStore.Recipe.findByPk).toBeCalledWith(bad_id, pkParams);
    expect(response).toEqual(null);
  });

  it('returns recipe', async () => {
    mockStore.Recipe.findByPk.mockReturnValueOnce(mockRecipes[0]);

    const response = await recipeDatasource.getRecipe({
      id: mockRecipes[0].id,
    });

    expect(mockStore.Recipe.findByPk).toBeCalledWith(
      mockRecipes[0].id,
      pkParams
    );

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
      source: {
        display: 'My Recipe source',
        url: 'http://source.com',
      },
      photo: 'http://photos.com/mine.jpg',
      servings: 4,
    };
    const recipeBaseFieldsInputFlat = {
      title: recipeBaseFieldsInput.title,
      description: recipeBaseFieldsInput.description,
      source_display: recipeBaseFieldsInput.source.display,
      source_url: recipeBaseFieldsInput.source.url,
      photo_url: recipeBaseFieldsInput.photo,
      servings: recipeBaseFieldsInput.servings,
    };
    const dbBaseFields = addDBFields({
      fields: recipeBaseFieldsInputFlat,
      id: 123,
    });
    dbBaseFields.createTiming = jest.fn();
    dbBaseFields.createDirectionSection = jest.fn();
    dbBaseFields.createIngredientSection = jest.fn();

    const timeFieldsInput = {
      timing: {
        prep: [{ value: '2', units: TIME_UNITS.MINUTE }],
        total: [
          { value: '20', units: TIME_UNITS.MINUTE },
          { value: '1', units: TIME_UNITS.HOUR },
        ],
      },
    };

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

    const ingredientsInput = [
      {
        label: 'ingredient section 1',
        ingredients: [
          {
            amount: '2',
            unit: 'cup',
            prep: 'chopped',
            name: 'apples',
            toTaste: true,
            optional: true,
          },
        ],
      },
      {
        ingredients: [
          {
            rangedAmount: { min: '5', max: '10' },
            unit: 'tablespoon',
            prep: 'minced',
            name: 'garlic',
            toTaste: true,
            optional: false,
          },
        ],
      },
    ];

    const tagsInput = [{ id: mockTags[0].tagid }, { id: mockTags[1].tagid }];

    mockStore.Recipe.create.mockReturnValueOnce(dbBaseFields);
    mockStore.RecipeTag.create
      .mockReturnValueOnce(mockTags[0])
      .mockReturnValueOnce(mockTags[1]);
    mockStore.Recipe.findByPk.mockReturnValueOnce(mockRecipes[0]);

    const recipe = {
      ...recipeBaseFieldsInput,
      ...timeFieldsInput,
      directions: directionsInput,
      ingredients: ingredientsInput,
      tags: tagsInput,
    };

    // check the result of the fn
    const res = await recipeDatasource.addRecipe({
      recipe,
    });

    // make sure store is called properly
    expect(mockStore.Recipe.create).toBeCalledWith(recipeBaseFieldsInputFlat);

    expect(dbBaseFields.createTiming).toBeCalledTimes(3);
    expect(dbBaseFields.createTiming).toHaveBeenNthCalledWith(1, {
      type: TIMINGS.PREP_TIME,
      ...timeFieldsInput.timing.prep[0],
    });
    expect(dbBaseFields.createTiming).toHaveBeenNthCalledWith(2, {
      type: TIMINGS.TOTAL_TIME,
      ...timeFieldsInput.timing.total[0],
    });
    expect(dbBaseFields.createTiming).toHaveBeenNthCalledWith(3, {
      type: TIMINGS.TOTAL_TIME,
      ...timeFieldsInput.timing.total[1],
    });

    expect(dbBaseFields.createDirectionSection).toBeCalledWith(
      {
        label: directionsInput[0].label,
        directionSteps: directionsInput[0].steps,
      },
      pkParams
    );

    expect(dbBaseFields.createIngredientSection).toBeCalledTimes(2);
    expect(dbBaseFields.createIngredientSection).toHaveBeenNthCalledWith(
      1,
      ingredientsInput[0],
      pkParams
    );
    expect(dbBaseFields.createIngredientSection).toHaveBeenNthCalledWith(
      2,
      ingredientsInput[1],
      pkParams
    );

    expect(mockStore.RecipeTag.create).toBeCalledTimes(2);
    expect(mockStore.RecipeTag.create).toHaveBeenNthCalledWith(1, {
      recipeId: mockRecipes[0].id,
      tagId: tagsInput[0].id,
    });
    expect(mockStore.RecipeTag.create).toHaveBeenNthCalledWith(2, {
      recipeId: mockRecipes[0].id,
      tagId: tagsInput[1].id,
    });

    expect(mockStore.Recipe.findByPk).toBeCalledWith(
      mockRecipes[0].id,
      pkParams
    );
    expect(res).toMatchSnapshot();
  });
});

describe('constructDirections', () => {
  it('empty array', async () => {
    const directions = [];

    const res = recipeDatasource.constructDirections({
      directions,
    });

    expect(res).toEqual([]);
  });

  it('single section, no steps provided, only label', async () => {
    const directions = [{ label: 'section 1' }];

    const res = recipeDatasource.constructDirections({
      directions,
    });

    expect(res).toMatchSnapshot();
  });

  it('single section, only steps provided, no label', async () => {
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

    const res = recipeDatasource.constructDirections({
      directions,
    });

    expect(res).toMatchSnapshot();
  });

  it('single direction section, all fields', async () => {
    const directions = [
      {
        label: 'section 1',
        steps: [
          {
            text: 'step 1',
          },
        ],
      },
    ];

    const res = recipeDatasource.constructDirections({
      directions,
    });

    expect(res).toMatchSnapshot();
  });

  it('multiple direction sections', async () => {
    const directions = [
      {
        label: 'section 1',
        steps: [
          {
            text: 'step 1',
          },
        ],
      },
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

    const res = recipeDatasource.constructDirections({
      directions,
    });

    expect(res).toMatchSnapshot();
  });
});

describe('constructIngredients', () => {
  it('empty array', async () => {
    const ingredient = [];

    const res = recipeDatasource.constructIngredients({
      ingredient,
    });

    expect(res).toEqual([]);
  });

  it('single section, no ingredients provided, only label', async () => {
    const ingredients = [{ label: 'ingredient section 1' }];

    const res = recipeDatasource.constructIngredients({
      ingredients,
    });

    expect(res).toMatchSnapshot();
  });

  it('single section, only ingredients provided, no label', async () => {
    const ingredients = [
      {
        ingredients: [
          {
            amount: '2',
            unit: 'cup',
            prep: 'chopped',
            name: 'apples',
            toTaste: true,
            optional: true,
          },
          {
            rangedAmount: { min: '5', max: '10' },
            unit: 'tablespoon',
            prep: 'minced',
            name: 'garlic',
            toTaste: true,
            optional: false,
          },
        ],
      },
    ];

    const res = recipeDatasource.constructIngredients({
      ingredients,
    });

    expect(res).toMatchSnapshot();
  });

  it('single ingredient section, all fields', async () => {
    const ingredients = [
      {
        label: 'ingredient section 1',
        ingredients: [
          {
            amount: '2',
            unit: 'cup',
            prep: 'chopped',
            name: 'apples',
          },
        ],
      },
    ];

    const res = recipeDatasource.constructIngredients({
      ingredients,
    });

    expect(res).toMatchSnapshot();
  });

  it('multiple ingredient sections', async () => {
    const ingredients = [
      {
        label: 'ingredient section 1',
        ingredients: [
          {
            amount: '2',
            unit: 'cup',
            prep: 'chopped',
            name: 'apples',
            toTaste: true,
            optional: true,
          },
        ],
      },
      {
        ingredients: [
          {
            amount: '1',
            unit: 'tablespoon',
            prep: 'minced',
            name: 'garlic',
          },
        ],
      },
    ];

    const res = recipeDatasource.constructIngredients({
      ingredients,
    });

    expect(res).toMatchSnapshot();
  });
});

describe('addTags', () => {
  it('empty array', async () => {
    const tags = [];

    const res = await recipeDatasource.addTags({
      recipeId: '45',
      tags,
    });

    expect(res).toEqual([]);
  });

  it('multiple tags', async () => {
    mockStore.RecipeTag.create
      .mockReturnValueOnce(mockTags[0])
      .mockReturnValueOnce(mockTags[1]);

    const recipeId = mockRecipes[0].id;
    const tags = [{ id: 1 }, { id: 100 }];

    const res = await recipeDatasource.addTags({
      recipeId,
      tags,
    });

    expect(res).toMatchSnapshot();
    expect(mockStore.RecipeTag.create).toHaveBeenNthCalledWith(1, {
      recipeId,
      tagId: tags[0].id,
    });
    expect(mockStore.RecipeTag.create).toHaveBeenNthCalledWith(2, {
      recipeId,
      tagId: tags[1].id,
    });
  });
});

describe('updateRecipe', () => {
  it('id not found', async () => {
    mockStore.Recipe.findByPk.mockReturnValueOnce(null);
    const bad_id = 'bad id';

    // check the result of the fn
    const res = await recipeDatasource.updateRecipe({ id: bad_id });
    expect(res).toMatchSnapshot();

    expect(mockStore.Recipe.findByPk).toBeCalledWith(bad_id);
  });

  it('calls store update and returns result - id exists', async () => {
    const recipe_id = 'update_id';

    const recipeBaseFieldsInput = {
      title: 'updated title',
      description: 'some updated description',
      source: {
        display: 'My Recipe Updated source',
        url: 'http://updated-source.com',
      },
      photo: 'http://updated-photos.com/mine.jpg',
      servings: 1,
    };
    const recipeBaseFieldsInputFlat = {
      title: recipeBaseFieldsInput.title,
      description: recipeBaseFieldsInput.description,
      source_display: recipeBaseFieldsInput.source.display,
      source_url: recipeBaseFieldsInput.source.url,
      photo_url: recipeBaseFieldsInput.photo,
      servings: recipeBaseFieldsInput.servings,
    };
    const dbBaseFields = addDBFields({
      fields: recipeBaseFieldsInputFlat,
      id: recipe_id,
    });
    dbBaseFields.createTiming = jest.fn();
    dbBaseFields.createDirectionSection = jest.fn();
    dbBaseFields.createIngredientSection = jest.fn();

    const timeFieldsInput = {
      timing: {
        prep: [{ value: '4', units: TIME_UNITS.MINUTE }],
        total: [{ value: '20', units: TIME_UNITS.MINUTE }],
      },
    };

    const directionsInput = [
      {
        label: 'updated section 1',
        steps: [
          {
            text: 'updated step 1',
          },
          {
            text: 'updated step 2',
          },
        ],
      },
    ];

    const ingredientsInput = [
      {
        label: 'updated ingredient section 1',
        ingredients: [
          {
            amount: '2',
            unit: 'cup',
            prep: 'updated',
            name: 'apples',
            toTaste: true,
            optional: true,
          },
        ],
      },
      {
        ingredients: [
          {
            rangedAmount: { min: '5', max: '10' },
            unit: 'tablespoon',
            prep: 'updated',
            name: 'garlic',
            toTaste: true,
            optional: false,
          },
        ],
      },
    ];

    const tagsInput = [{ id: mockTags[0].tagid }, { id: mockTags[1].tagid }];

    const existingRecipe = Object.assign({}, mockRecipes[0]);
    existingRecipe.update = jest.fn().mockReturnValueOnce(dbBaseFields);

    mockStore.Recipe.findByPk.mockReturnValueOnce(existingRecipe);
    mockStore.RecipeTag.create
      .mockReturnValueOnce(mockTags[0])
      .mockReturnValueOnce(mockTags[1]);

    const recipe = {
      ...recipeBaseFieldsInput,
      ...timeFieldsInput,
      directions: directionsInput,
      ingredients: ingredientsInput,
      tags: tagsInput,
    };

    // check the result of the fn
    await recipeDatasource.updateRecipe({ id: recipe_id, recipe });

    // make sure deletes are called properly
    expect(mockStore.Timing.destroy).toBeCalledWith({
      where: { recipeId: recipe_id },
    });
    expect(mockStore.DirectionSection.destroy).toBeCalledWith({
      where: { recipeId: recipe_id },
    });
    expect(mockStore.IngredientSection.destroy).toBeCalledWith({
      where: { recipeId: recipe_id },
    });
    expect(mockStore.RecipeTag.destroy).toBeCalledWith({
      where: { recipeId: recipe_id },
    });

    // make sure creates are called properly
    expect(mockStore.Recipe.findByPk).toBeCalledWith(recipe_id);
    expect(existingRecipe.update).toBeCalledWith(recipeBaseFieldsInputFlat);

    expect(dbBaseFields.createTiming).toBeCalledTimes(2);
    expect(dbBaseFields.createTiming).toHaveBeenNthCalledWith(1, {
      type: TIMINGS.PREP_TIME,
      ...timeFieldsInput.timing.prep[0],
    });
    expect(dbBaseFields.createTiming).toHaveBeenNthCalledWith(2, {
      type: TIMINGS.TOTAL_TIME,
      ...timeFieldsInput.timing.total[0],
    });

    expect(dbBaseFields.createDirectionSection).toBeCalledWith(
      {
        label: directionsInput[0].label,
        directionSteps: directionsInput[0].steps,
      },
      pkParams
    );

    expect(dbBaseFields.createIngredientSection).toBeCalledTimes(2);
    expect(dbBaseFields.createIngredientSection).toHaveBeenNthCalledWith(
      1,
      ingredientsInput[0],
      pkParams
    );
    expect(dbBaseFields.createIngredientSection).toHaveBeenNthCalledWith(
      2,
      ingredientsInput[1],
      pkParams
    );

    expect(mockStore.RecipeTag.create).toBeCalledTimes(2);
    expect(mockStore.RecipeTag.create).toHaveBeenNthCalledWith(1, {
      recipeId: recipe_id,
      tagId: tagsInput[0].id,
    });
    expect(mockStore.RecipeTag.create).toHaveBeenNthCalledWith(2, {
      recipeId: recipe_id,
      tagId: tagsInput[1].id,
    });

    expect(mockStore.Recipe.findByPk).toBeCalledWith(recipe_id, pkParams);
  });
});

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
        source: {
          display: 'My Recipe source',
          url: 'http://source.com',
        },
        photo: 'http://photos.com/mine.jpg',
        servings: 4,
      };
      const newFieldsExpected = {
        title: newFields.title,
        description: newFields.description,
        source_display: newFields.source.display,
        source_url: newFields.source.url,
        photo_url: newFields.photo,
        servings: newFields.servings,
      };
      expect(recipeDatasource.constructBaseRecipeObj(newFields)).toEqual(
        newFieldsExpected
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
      source: {
        display: 'My Recipe source',
        url: 'http://source.com',
      },
      photo: 'http://photos.com/mine.jpg',
      servings: 4,
    };
    const baseFieldsExpected = {
      title: baseFields.title,
      description: baseFields.description,
      source_display: baseFields.source.display,
      source_url: baseFields.source.url,
      photo_url: baseFields.photo,
      servings: baseFields.servings,
    };
    const allFields = Object.assign({}, baseFields);
    allFields.some_garbage_field = 'some garbage';
    expect(recipeDatasource.constructBaseRecipeObj(allFields)).toEqual(
      baseFieldsExpected
    );
  });
});

describe('constructTimeObj', () => {
  describe('no time fields', () => {
    it('empty object', () => {
      const newFields = {};
      expect(
        recipeDatasource.constructTimeObj({
          recipeId: '1',
          newFields,
          type: TIMINGS.PREP,
        })
      ).toEqual({});
    });

    it('undefined object', () => {
      const newFields = undefined;
      expect(
        recipeDatasource.constructTimeObj({
          recipeId: '1',
          newFields,
          type: TIMINGS.PREP,
        })
      ).toEqual({});
    });

    it('object without relevant fields', () => {
      const newFields = { some_garbage_field: 'with some garbage values' };
      expect(
        recipeDatasource.constructTimeObj({
          recipeId: '1',
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
      expectedFields.recipeId = '1';

      expect(
        recipeDatasource.constructTimeObj({
          recipeId: expectedFields.recipeId,
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
      expectedFields.recipeId = '1';
      expect(
        recipeDatasource.constructTimeObj({
          recipeId: expectedFields.recipeId,
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
    expectedFields.recipeId = '1';
    expect(
      recipeDatasource.constructTimeObj({
        recipeId: expectedFields.recipeId,
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
          newFields,
        })
      ).toEqual({});
    });

    it('undefined object', () => {
      const newFields = undefined;
      expect(
        recipeDatasource.constructDirectionSectionObj({
          newFields,
        })
      ).toEqual({});
    });

    it('object without relevant fields', () => {
      const newFields = { some_garbage_field: 'with some garbage values' };
      expect(
        recipeDatasource.constructDirectionSectionObj({
          section: newFields,
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
    const expectedFields = { label: newFields.label };

    expect(
      recipeDatasource.constructDirectionSectionObj({
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
    const expectedFields = { label: baseFields.label };
    expect(
      recipeDatasource.constructDirectionSectionObj({
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
          step: newFields,
        })
      ).toEqual({});
    });

    it('undefined object', () => {
      const newFields = undefined;
      expect(
        recipeDatasource.constructDirectionStepObj({
          step: newFields,
        })
      ).toEqual({});
    });

    it('object without relevant fields', () => {
      const newFields = { some_garbage_field: 'with some garbage values' };
      expect(
        recipeDatasource.constructDirectionStepObj({
          step: newFields,
        })
      ).toEqual({});
    });
  });

  it('only step fields', () => {
    const newFields = {
      text: 'step 1',
    };

    expect(
      recipeDatasource.constructDirectionStepObj({
        step: newFields,
      })
    ).toEqual(newFields);
  });

  it('step fields + others', () => {
    const baseFields = {
      text: 'step 1',
    };
    const allFields = Object.assign({}, baseFields);
    allFields.some_garbage_field = 'some garbage';
    expect(
      recipeDatasource.constructDirectionStepObj({
        step: allFields,
      })
    ).toEqual(baseFields);
  });
});

describe('constructRangedObj', () => {
  describe('no ranged fields', () => {
    it('empty object', () => {
      expect(
        recipeDatasource.constructRangedObj({
          amount: {},
        })
      ).toEqual({});
    });

    it('undefined object', () => {
      expect(
        recipeDatasource.constructRangedObj({
          amount: undefined,
        })
      ).toEqual({});
    });

    it('string', () => {
      expect(
        recipeDatasource.constructRangedObj({
          amount: '34',
        })
      ).toEqual({});
    });

    it('object without relevant fields', () => {
      const newFields = { some_garbage_field: 'with some garbage values' };
      expect(
        recipeDatasource.constructRangedObj({
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

      expect(
        recipeDatasource.constructRangedObj({
          amount: newFields,
        })
      ).toEqual(newFields);
    });

    it('has subset of fields', () => {
      const newFields = {
        min: '2',
      };
      expect(
        recipeDatasource.constructRangedObj({
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
    expect(
      recipeDatasource.constructRangedObj({
        amount: allFields,
      })
    ).toEqual(baseFields);
  });
});

describe('constructIngredientObj', () => {
  describe('no ingredient fields', () => {
    it('empty object', () => {
      expect(
        recipeDatasource.constructIngredientObj({
          ingredient: {},
        })
      ).toEqual({});
    });

    it('undefined object', () => {
      expect(
        recipeDatasource.constructIngredientObj({
          ingredient: undefined,
        })
      ).toEqual({});
    });

    it('object without relevant fields', () => {
      const newFields = { some_garbage_field: 'with some garbage values' };
      expect(
        recipeDatasource.constructIngredientObj({
          amount: newFields,
        })
      ).toEqual({});
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

      expect(
        recipeDatasource.constructIngredientObj({
          ingredient: newFields,
        })
      ).toEqual(newFields);
    });

    it('has subset of fields', () => {
      const newFields = {
        prep: 'chopped',
        name: 'apples',
      };
      expect(
        recipeDatasource.constructIngredientObj({
          ingredient: newFields,
        })
      ).toMatchSnapshot();
    });

    it('has subset of fields that are false', () => {
      const newFields = {
        prep: 'chopped',
        name: 'apples',
        optional: false,
        toTaste: false,
      };
      expect(
        recipeDatasource.constructIngredientObj({
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

    expect(
      recipeDatasource.constructIngredientObj({
        ingredient: allFields,
      })
    ).toEqual(baseFields);
  });
});

describe('constructIngredientSectionObj', () => {
  describe('no ingredient fields', () => {
    it('empty object', () => {
      const newFields = {};
      expect(
        recipeDatasource.constructIngredientSectionObj({
          newFields,
        })
      ).toEqual({});
    });

    it('undefined object', () => {
      const newFields = undefined;
      expect(
        recipeDatasource.constructIngredientSectionObj({
          newFields,
        })
      ).toEqual({});
    });

    it('object without relevant fields', () => {
      const newFields = { some_garbage_field: 'with some garbage values' };
      expect(
        recipeDatasource.constructIngredientSectionObj({
          section: newFields,
        })
      ).toEqual({});
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
    const expectedFields = { label: newFields.label };

    expect(
      recipeDatasource.constructIngredientSectionObj({
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
    const expectedFields = { label: baseFields.label };
    expect(
      recipeDatasource.constructIngredientSectionObj({
        section: allFields,
      })
    ).toEqual(expectedFields);
  });
});

describe('constructTagObj', () => {
  describe('no tag fields', () => {
    it('empty object', () => {
      expect(
        recipeDatasource.constructTagObj({
          recipeId: 1,
          tags: {},
        })
      ).toBeUndefined();
    });

    it('undefined object', () => {
      expect(
        recipeDatasource.constructTagObj({
          recipeId: 1,
          tags: undefined,
        })
      ).toBeUndefined();
    });

    it('object without relevant fields', () => {
      const newFields = { some_garbage_field: 'with some garbage values' };
      expect(
        recipeDatasource.constructTagObj({
          recipeId: 1,
          tags: newFields,
        })
      ).toBeUndefined();
    });
  });

  describe('only tag fields', () => {
    const newFields = { id: 2 };
    const expectedFields = { recipeId: 42, tagId: newFields.id };

    expect(
      recipeDatasource.constructTagObj({
        recipeId: expectedFields.recipeId,
        tag: newFields,
      })
    ).toEqual(expectedFields);
  });

  it('tag fields + others', () => {
    const baseFields = {
      id: 2,
    };
    const allFields = Object.assign({}, baseFields);
    allFields.some_garbage_field = 'some garbage';
    const expectedFields = { recipeId: '42', tagId: baseFields.id };
    expect(
      recipeDatasource.constructTagObj({
        recipeId: expectedFields.recipeId,
        tag: allFields,
      })
    ).toEqual(expectedFields);
  });
});

describe('getRecipeData', () => {
  it('invalid id', async () => {
    mockStore.Recipe.findByPk.mockReturnValueOnce();
    const bad_id = 'bad_id';
    const response = await recipeDatasource.getRecipeData({
      id: bad_id,
    });
    expect(mockStore.Recipe.findByPk).toBeCalledWith(bad_id, pkParams);

    expect(response).toEqual({});
  });

  it('valid id', async () => {
    mockStore.Recipe.findByPk.mockReturnValueOnce(mockRecipes[0]);

    const response = await recipeDatasource.getRecipeData({
      id: mockRecipes[0].id,
    });

    expect(mockStore.Recipe.findByPk).toBeCalledWith(
      mockRecipes[0].id,
      pkParams
    );

    expect(response).toMatchSnapshot();
  });
});
