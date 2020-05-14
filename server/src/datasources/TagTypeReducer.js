export const tagTypeReducer = (tagType) => {
  if (!tagType) {
    return null;
  }
  return {
    id: tagType.id,
    label: tagType.label,
  };
};

export const tagTypeMutationReducer = ({
  success = false,
  message = undefined,
  tagType = null,
}) => {
  return {
    success,
    message,
    tagType: tagTypeReducer(tagType),
  };
};
