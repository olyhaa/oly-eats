import { tagTypeReducer, tagTypeMutationReducer } from '../TagTypeReducer';

const mockTagTypes = [
  {
    id: '101',
    label: 'category',
  },
  {
    id: '102',
    label: 'cuisine',
  },
  {
    id: '103',
    label: 'meal_type',
  },
];

describe('tag type reducer', () => {
  it('properly transforms tag type object', () => {
    expect(tagTypeReducer(mockTagTypes[0])).toMatchSnapshot();
  });
});

describe('tag type mutation reducer', () => {
  it('properly transforms tag type object', () => {
    expect(
      tagTypeMutationReducer({ tagType: mockTagTypes[0] })
    ).toMatchSnapshot();
  });

  it('properly transforms tag type object on success', () => {
    expect(
      tagTypeMutationReducer({
        success: true,
        tagType: mockTagTypes[0],
      })
    ).toMatchSnapshot();
  });

  it('properly transforms tag type object on success with message', () => {
    expect(
      tagTypeMutationReducer({
        success: true,
        message: 'great job',
        tagType: mockTagTypes[0],
      })
    ).toMatchSnapshot();
  });

  it('properly transforms on success with message', () => {
    expect(
      tagTypeMutationReducer({ success: true, message: 'great job' })
    ).toMatchSnapshot();
  });

  it('properly transforms on failure', () => {
    expect(tagTypeMutationReducer({ success: false })).toMatchSnapshot();
  });

  it('properly transforms on failure with message', () => {
    expect(
      tagTypeMutationReducer({ success: false, message: 'bad test' })
    ).toMatchSnapshot();
  });
});
