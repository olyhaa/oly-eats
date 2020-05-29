export const tagReducer = (tag) => {
  if (!tag) {
    return null;
  }
  return {
    id: tag.id,
    type: tag.getTagType(),
    label: tag.label,
  };
};

export const tagMutationReducer = ({
  success = false,
  message = undefined,
  tag = null,
}) => {
  return {
    success,
    message,
    tag: tagReducer(tag),
  };
};
