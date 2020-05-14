export const tagReducer = (tag) => {
  if (!tag) {
    return null;
  }
  return {
    id: tag.id,
    typeid: tag.typeid,
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
