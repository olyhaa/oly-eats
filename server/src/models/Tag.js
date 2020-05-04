const Tag = (db, SQL, TagType) => {
  return db.define('tag', {
    typeid: {
      type: SQL.STRING,
      allowNull: false,
      references: {
        model: TagType,
        key: 'id',
      },
    },
    label: {
      type: SQL.STRING,
      allowNull: false,
    },
  });
};

export default Tag;
