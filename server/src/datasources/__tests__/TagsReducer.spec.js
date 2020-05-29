import { tagReducer, tagMutationReducer } from '../TagsReducer';

const mockTagTypes = {
  '1': { id: '1', label: 'type 1' },
};

const mockTags = [
  {
    id: '1',
    tagTypeId: '1',
    label: 'bakery',
    getTagType: jest.fn(),
  },
  {
    id: '2',
    tagTypeId: '1',
    label: 'casserole',
    getTagType: jest.fn(),
  },
  {
    id: '3',
    tagTypeId: '1',
    label: 'salad',
    getTagType: jest.fn(),
  },
  {
    id: '7',
    tagTypeId: '2',
    label: 'american',
    getTagType: jest.fn(),
  },
  {
    id: '8',
    tagTypeId: '2',
    label: 'asian',
    getTagType: jest.fn(),
  },
];

describe('tag reducer', () => {
  it('properly transforms tag object', () => {
    mockTags[0].getTagType.mockReturnValueOnce(
      mockTagTypes[mockTags[0].tagTypeId]
    );
    expect(tagReducer(mockTags[0])).toMatchSnapshot();
  });
});

describe('tag mutation reducer', () => {
  it('properly transforms tag object', () => {
    mockTags[0].getTagType.mockReturnValueOnce(
      mockTagTypes[mockTags[0].tagTypeId]
    );
    expect(tagMutationReducer({ tag: mockTags[0] })).toMatchSnapshot();
  });

  it('properly transforms tag type object on success', () => {
    mockTags[0].getTagType.mockReturnValueOnce(
      mockTagTypes[mockTags[0].tagTypeId]
    );
    expect(
      tagMutationReducer({
        success: true,
        tag: mockTags[0],
      })
    ).toMatchSnapshot();
  });

  it('properly transforms tag type object on success with message', () => {
    mockTags[0].getTagType.mockReturnValueOnce(
      mockTagTypes[mockTags[0].tagTypeId]
    );
    expect(
      tagMutationReducer({
        success: true,
        message: 'great job',
        tag: mockTags[0],
      })
    ).toMatchSnapshot();
  });

  it('properly transforms on success with message', () => {
    expect(
      tagMutationReducer({
        success: true,
        message: 'great job',
      })
    ).toMatchSnapshot();
  });

  it('properly transforms on failure', () => {
    expect(tagMutationReducer({ success: false })).toMatchSnapshot();
  });

  it('properly transforms on failure with message', () => {
    expect(
      tagMutationReducer({ success: false, message: 'bad test' })
    ).toMatchSnapshot();
  });
});
