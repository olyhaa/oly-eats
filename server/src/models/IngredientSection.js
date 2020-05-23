const IngredientSection = (db, SQL, Recipe) => {
  return db.define('ingredientSection', {
    label: {
      type: SQL.STRING,
      allowNull: true,
    },
  });
};

export default IngredientSection;
