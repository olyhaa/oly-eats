const Ingredient = (db, SQL, IngredientSection) => {
  return db.define('ingredient', {
    amount: {
      type: SQL.STRING,
    },
    unit: {
      type: SQL.STRING,
    },
    prep: {
      type: SQL.STRING,
    },
    name: {
      type: SQL.STRING,
      allowNull: false,
    },
    toTaste: {
      type: SQL.BOOLEAN,
      allowNull: false,
    },
    optional: {
      type: SQL.BOOLEAN,
      allowNull: false,
    },
    sectionid: {
      type: SQL.STRING,
      allowNull: false,
      references: {
        model: IngredientSection,
        key: 'id',
      },
    },
  });
};

export default Ingredient;
