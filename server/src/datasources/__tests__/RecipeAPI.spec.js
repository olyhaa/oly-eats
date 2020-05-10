import RecipeAPI from '../RecipeAPI';
import { TIMINGS, TIME_UNITS } from '../../constants';

const mockRecipes = [
  {
    id: '1',
    title: 'my first recipe',
    description: 'the best recipe ever',
    source_display: "Mandy's Kitchen",
    source_url: 'http://some.url.com/recipe',
    photo_url: 'http://some.url.com/pic.jpg',
    servings: 2,
    createdAt: '2020-05-10 00:00:45.511 +00:00',
    updatedAt: '2020-05-10 00:00:45.511 +00:00',
  },
];

const mockStore = {
  Recipe: {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
  },
};
const recipeDatasource = new RecipeAPI({ store: mockStore });

describe.skip('recipe reducer', () => {});

describe.skip('recipe mutation reducer', () => {});

describe('getAllRecipes', () => {
  it('returns empty array for empty db', async () => {
    mockStore.Recipe.findAll.mockReturnValueOnce([]);

    const response = await recipeDatasource.getAllRecipes();

    expect(mockStore.Recipe.findAll).toBeCalledWith();
    expect(response).toEqual([]);
  });

  it('returns array of recipes', async () => {
    mockStore.Recipe.findAll.mockReturnValueOnce(mockRecipes);

    const response = await recipeDatasource.getAllRecipes();

    expect(mockStore.Recipe.findAll).toBeCalledWith();
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

    const response = await recipeDatasource.getRecipe({
      id: mockRecipes[0].id,
    });

    expect(mockStore.Recipe.findByPk).toBeCalledWith(mockRecipes[0].id);
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

describe.skip('addRecipe', () => {});
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
