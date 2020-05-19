const Tag = (db, SQL) => {
  return db.define('tag', {
    label: {
      type: SQL.STRING,
      allowNull: false,
    },
  });
};

export default Tag;
