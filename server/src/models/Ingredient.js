const Ingredient = (db, SQL) => {
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
  });
};

export default Ingredient;
