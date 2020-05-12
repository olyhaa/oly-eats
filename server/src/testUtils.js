export const addDBFields = ({ fields, id }) => {
  const dbFields = Object.assign({}, fields);
  dbFields.id = id ?? '123';
  dbFields.createdAt = '2020-05-10 00:00:45.511 +00:00';
  dbFields.updatedAt = '2020-05-10 00:00:45.511 +00:00';
  return dbFields;
};
