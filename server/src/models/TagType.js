const TagType = (db, SQL) => {
  return db.define('tag_type', {
    label: {
      type: SQL.STRING,
      allowNull: false,
    },
  });
};

export default TagType;
