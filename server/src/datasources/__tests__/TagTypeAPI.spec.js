import TagTypeAPI from '../TagTypeAPI';
import { tagTypeReducer } from '../TagTypeReducer';

const mockTagTypes = [
  {
    id: '101',
    label: 'category',
    getTags: jest.fn(),
  },
  {
    id: '102',
    label: 'cuisine',
    getTags: jest.fn(),
  },
  {
    id: '103',
    label: 'meal_type',
    getTags: jest.fn(),
  },
];

const mockStore = {
  TagType: {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
  },
};
const tagTypes = new TagTypeAPI({ store: mockStore });

describe('getAllTagTypes', () => {
  it('returns empty array for empty db', async () => {
    mockStore.TagType.findAll.mockReturnValueOnce([]);
    const response = await tagTypes.getAllTagTypes();
    expect(mockStore.TagType.findAll).toBeCalledWith();
    expect(response).toEqual([]);
  });

  it('returns array of tag types', async () => {
    mockStore.TagType.findAll.mockReturnValueOnce(mockTagTypes);
    mockTagTypes[0].getTags.mockReturnValueOnce([]);
    mockTagTypes[1].getTags.mockReturnValueOnce([]);
    mockTagTypes[2].getTags.mockReturnValueOnce([]);

    const response = await tagTypes.getAllTagTypes();
    expect(mockStore.TagType.findAll).toBeCalledWith();
    expect(response).toMatchSnapshot();
  });
});

describe('addTagType', () => {
  it('calls store creator and returns result', async () => {
    const test_label = 'test label';
    mockStore.TagType.create.mockReturnValueOnce(mockTagTypes[2]);
    mockTagTypes[2].getTags.mockReturnValueOnce([]);

    // check the result of the fn
    const res = await tagTypes.addTagType({ label: test_label });
    expect(res).toMatchSnapshot();

    // make sure store is called properly
    expect(mockStore.TagType.create).toBeCalledWith({
      label: test_label,
    });
  });
});

describe('deleteTagType', () => {
  it('calls store destroy and returns result - id exists', async () => {
    const findPkVal = Object.assign({}, mockTagTypes[2]);
    findPkVal.destroy = jest.fn();
    mockTagTypes[2].getTags.mockReturnValueOnce([]);

    mockStore.TagType.findByPk.mockReturnValueOnce(findPkVal);
    findPkVal.destroy.mockReturnValueOnce('done');

    // check the result of the fn
    const res = await tagTypes.deleteTagType({ id: findPkVal.id });
    expect(res).toMatchSnapshot();

    // make sure store is called properly
    expect(mockStore.TagType.findByPk).toBeCalledWith(findPkVal.id);
    expect(findPkVal.destroy).toBeCalled();
  });

  it('calls store destroy and returns result - id not found', async () => {
    mockStore.TagType.findByPk.mockReturnValueOnce(null);

    // check the result of the fn
    const res = await tagTypes.deleteTagType({ id: 'bad_id' });
    expect(res).toMatchSnapshot();

    expect(mockStore.TagType.findByPk).toBeCalledWith('bad_id');
  });
});

describe('updateTagType', () => {
  it('calls store update with values and returns result - id exists', async () => {
    const findPkVal = Object.assign({}, mockTagTypes[1]);
    const updatedPkVal = Object.assign({}, findPkVal);
    updatedPkVal.label = 'new label';
    mockTagTypes[1].getTags.mockReturnValueOnce([]);

    findPkVal.update = jest.fn();

    mockStore.TagType.findByPk
      .mockReturnValueOnce(findPkVal)
      .mockReturnValueOnce(updatedPkVal);
    findPkVal.update.mockReturnValueOnce(updatedPkVal);
    const new_label = 'new label';

    // check the result of the fn
    const res = await tagTypes.updateTagType({
      id: findPkVal.id,
      label: new_label,
    });
    expect(res).toMatchSnapshot();

    // make sure store is called properly
    expect(mockStore.TagType.findByPk).toBeCalledWith(findPkVal.id);
    expect(findPkVal.update).toBeCalledWith({ label: new_label });
  });

  it('calls store update and returns result - id not found', async () => {
    mockStore.TagType.findByPk.mockReturnValueOnce(null);
    const bad_id = 'bad_id';

    // check the result of the fn
    const res = await tagTypes.updateTagType({
      id: bad_id,
      label: 'new label',
    });
    expect(res).toMatchSnapshot();

    // make sure store is called properly
    expect(mockStore.TagType.findByPk).toBeCalledWith(bad_id);
  });
});
