const TagType = (db, SQL) => {
  return db.define('tagType', {
    label: {
      type: SQL.STRING,
      allowNull: false,
    },
  });
};

export default TagType;
