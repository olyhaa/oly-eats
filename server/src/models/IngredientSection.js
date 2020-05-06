const IngredientSection = (db, SQL, Recipe) => {
  return db.define('ingredient_section', {
    label: {
      type: SQL.STRING,
      allowNull: false,
    },
    recipeid: {
      type: SQL.STRING,
      allowNull: false,
      references: {
        model: Recipe,
        key: 'id',
      },
    },
  });
};

export default IngredientSection;
