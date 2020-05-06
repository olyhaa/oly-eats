const RangedAmount = (db, SQL, Ingredient) => {
  return db.define('ranged_amount', {
    min: {
      type: SQL.STRING,
      allowNull: false,
    },
    max: {
      type: SQL.STRING,
      allowNull: false,
    },
    ingredientid: {
      type: SQL.STRING,
      allowNull: false,
      references: {
        model: Ingredient,
        key: 'id',
      },
    },
  });
};

export default RangedAmount;
