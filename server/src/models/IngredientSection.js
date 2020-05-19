const IngredientSection = (db, SQL, Recipe) => {
  return db.define('ingredient_section', {
    label: {
      type: SQL.STRING,
      allowNull: true,
    },
  });
};

export default IngredientSection;
