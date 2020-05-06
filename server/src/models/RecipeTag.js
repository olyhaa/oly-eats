const RecipeTag = (db, SQL, Recipe, Tag) => {
  return db.define('recipe_tag', {
    recipeid: {
      type: SQL.STRING,
      allowNull: false,
      references: {
        model: Recipe,
        key: 'id',
      },
    },
    tagid: {
      type: SQL.STRING,
      allowNull: false,
      references: {
        model: Tag,
        key: 'id',
      },
    },
  });
};

export default RecipeTag;
