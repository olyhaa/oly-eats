export const tagTypeReducer = (tagType) => {
  if (!tagType) {
    return null;
  }
  return {
    id: tagType.id,
    label: tagType.label,
    tags: tagType.getTags(),
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
