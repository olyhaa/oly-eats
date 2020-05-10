import RecipeAPI from '../RecipeAPI';

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
