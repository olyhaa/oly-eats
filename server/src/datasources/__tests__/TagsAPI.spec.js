import TagsAPI from '../TagsAPI';
import { tagReducer } from '../TagsReducer';

const mockTagTypes = [
  {
    id: '1',
    label: 'category',
  },
  {
    id: '2',
    label: 'cuisine',
  },
];

const mockTags = [
  {
    id: '1',
    typeid: '1',
    label: 'bakery',
  },
  {
    id: '2',
    typeid: '1',
    label: 'casserole',
  },
  {
    id: '3',
    typeid: '1',
    label: 'salad',
  },
  {
    id: '7',
    typeid: '2',
    label: 'american',
  },
  {
    id: '8',
    typeid: '2',
    label: 'asian',
  },
];

const mockStore = {
  TagType: {
    findByPk: jest.fn(),
  },
  Tag: {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
  },
};
const tagsDatasource = new TagsAPI({ store: mockStore });

describe('getAllTags', () => {
  it('returns empty array for empty db for valid typeid', async () => {
    mockStore.TagType.findByPk.mockReturnValueOnce(mockTagTypes[0]);
    mockStore.Tag.findAll.mockReturnValueOnce([]);

    const response = await tagsDatasource.getAllTags({
      typeid: mockTagTypes[0].id,
    });
    expect(mockStore.TagType.findByPk).toBeCalledWith(mockTagTypes[0].id);
    expect(mockStore.Tag.findAll).toBeCalledWith({
      where: { typeid: mockTagTypes[0].id },
    });
    expect(response).toEqual([]);
  });

  it('returns empty array for empty db for bad typeid', async () => {
    mockStore.TagType.findByPk.mockReturnValueOnce(null);
    const bad_id = 'bad id';

    const response = await tagsDatasource.getAllTags({
      typeid: bad_id,
    });

    expect(mockStore.TagType.findByPk).toBeCalledWith(bad_id);
    expect(response).toEqual([]);
  });

  it('returns array of tags for valid typeid', async () => {
    mockStore.Tag.findAll.mockReturnValueOnce(mockTags.slice(0, 3));
    mockStore.TagType.findByPk.mockReturnValueOnce(mockTagTypes[0]);

    const response = await tagsDatasource.getAllTags({
      typeid: mockTagTypes[0].id,
    });
    expect(mockStore.Tag.findAll).toBeCalledWith({
      where: { typeid: mockTagTypes[0].id },
    });
    expect(response).toEqual(
      mockTags.slice(0, 3).map((tag) => tagReducer(tag))
    );
  });
});

describe('addTag', () => {
  it('calls store creator and returns result - valid typeid', async () => {
    const test_label = 'test label';
    mockStore.TagType.findByPk.mockReturnValueOnce(mockTagTypes[0]);
    mockStore.Tag.create.mockReturnValueOnce(mockTags[0]);

    // check the result of the fn
    const res = await tagsDatasource.addTag({
      typeid: mockTagTypes[0].id,
      label: test_label,
    });
    expect(res).toMatchSnapshot();

    // make sure store is called properly
    expect(mockStore.TagType.findByPk).toBeCalledWith(mockTagTypes[0].id);
    expect(mockStore.Tag.create).toBeCalledWith({
      typeid: mockTagTypes[0].id,
      label: test_label,
    });
  });

  it('does not call store creator and returns result - invalid typeid', async () => {
    const test_label = 'test label';
    const bad_type_id = 'bad id';
    mockStore.TagType.findByPk.mockReturnValueOnce(null);

    // check the result of the fn
    const res = await tagsDatasource.addTag({
      typeid: bad_type_id,
      label: test_label,
    });
    expect(res).toMatchSnapshot();

    // make sure store is called properly
    expect(mockStore.TagType.findByPk).toBeCalledWith(bad_type_id);
  });
});

describe('deleteTag', () => {
  it('calls store destroy and returns result - id exists', async () => {
    const findPkVal = Object.assign({}, mockTags[2]);
    findPkVal.destroy = jest.fn();

    mockStore.Tag.findByPk.mockReturnValueOnce(findPkVal);
    findPkVal.destroy.mockReturnValueOnce('done');

    // check the result of the fn
    const res = await tagsDatasource.deleteTag({ id: findPkVal.id });
    expect(res).toMatchSnapshot();

    // make sure store is called properly
    expect(mockStore.Tag.findByPk).toBeCalledWith(findPkVal.id);
    expect(findPkVal.destroy).toBeCalled();
  });

  it('calls store destroy and returns result - id not found', async () => {
    mockStore.Tag.findByPk.mockReturnValueOnce(null);
    const bad_id = 'bad id';

    // check the result of the fn
    const res = await tagsDatasource.deleteTag({ id: bad_id });
    expect(res).toMatchSnapshot();

    expect(mockStore.Tag.findByPk).toBeCalledWith(bad_id);
  });
});

describe('updateTag', () => {
  it('calls store update with values and returns result - id exists', async () => {
    const findPkVal = Object.assign({}, mockTags[1]);
    const updatedPkVal = Object.assign({}, findPkVal);
    updatedPkVal.label = 'new label';

    findPkVal.update = jest.fn();

    mockStore.Tag.findByPk
      .mockReturnValueOnce(findPkVal)
      .mockReturnValueOnce(updatedPkVal);
    findPkVal.update.mockReturnValueOnce(updatedPkVal);
    const new_label = 'new label';

    // check the result of the fn
    const res = await tagsDatasource.updateTag({
      id: findPkVal.id,
      label: new_label,
    });
    expect(res).toMatchSnapshot();

    // make sure store is called properly
    expect(mockStore.Tag.findByPk).toBeCalledWith(findPkVal.id);
    expect(findPkVal.update).toBeCalledWith({ label: new_label });
  });

  it('calls store update and returns result - id not found', async () => {
    mockStore.Tag.findByPk.mockReturnValueOnce(null);
    const bad_id = 'bad_id';

    // check the result of the fn
    const res = await tagsDatasource.updateTag({
      id: bad_id,
      label: 'new label',
    });
    expect(res).toMatchSnapshot();

    // make sure store is called properly
    expect(mockStore.Tag.findByPk).toBeCalledWith(bad_id);
  });
});
