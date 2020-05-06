const Recipe = (db, SQL) => {
  return db.define('recipe', {
    title: {
      type: SQL.STRING,
      allowNull: false,
    },
    description: {
      type: SQL.STRING,
    },
    source_display: {
      type: SQL.STRING,
      allowNull: false,
    },
    source_url: {
      type: SQL.STRING,
    },
    photo_url: {
      type: SQL.STRING,
    },
    servings: {
      type: SQL.INTEGER,
      allowNull: false,
    },
  });
};

export default Recipe;
