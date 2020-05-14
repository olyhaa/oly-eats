import { tagReducer, tagMutationReducer } from '../TagsReducer';

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

describe('tag reducer', () => {
  it('properly transforms tag object', () => {
    expect(tagReducer(mockTags[0])).toMatchSnapshot();
  });
});

describe('tag mutation reducer', () => {
  it('properly transforms tag object', () => {
    expect(tagMutationReducer({ tag: mockTags[0] })).toMatchSnapshot();
  });

  it('properly transforms tag type object on success', () => {
    expect(
      tagMutationReducer({
        success: true,
        tag: mockTags[0],
      })
    ).toMatchSnapshot();
  });

  it('properly transforms tag type object on success with message', () => {
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
