import TagTypeAPI from '../TagTypeAPI';

const mockTagType = {
  id: '101',
  label: 'category',
};

const mockStore = {
  TagType: {
    create: jest.fn(),
    destroy: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
  },
};
const datasource = new TagTypeAPI({ store: mockStore });

describe('tag type reducer', () => {
  it('properly transforms tag type object', () => {
    expect(datasource.tagTypeReducer(mockTagType)).toMatchSnapshot();
  });
});

describe('tag type mutation reducer', () => {
  it('properly transforms tag type object', () => {
    expect(
      datasource.tagTypeMutationReducer({ mockTagType })
    ).toMatchSnapshot();
  });

  it('properly transforms tag type object on success', () => {
    expect(
      datasource.tagTypeMutationReducer({ success: true, mockTagType })
    ).toMatchSnapshot();
  });

  it('properly transforms tag type object on success with message', () => {
    expect(
      datasource.tagTypeMutationReducer({
        success: true,
        message: 'great job',
        mockTagType,
      })
    ).toMatchSnapshot();
  });

  it('properly transforms on success with message', () => {
    expect(
      datasource.tagTypeMutationReducer({ success: true, message: 'great job' })
    ).toMatchSnapshot();
  });

  it('properly transforms on failure', () => {
    expect(
      datasource.tagTypeMutationReducer({ success: false })
    ).toMatchSnapshot();
  });

  it('properly transforms on failure with message', () => {
    expect(
      datasource.tagTypeMutationReducer({ success: false, message: 'bad test' })
    ).toMatchSnapshot();
  });
});
