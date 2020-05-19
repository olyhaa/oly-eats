const RangedAmount = (db, SQL) => {
  return db.define('ranged_amount', {
    min: {
      type: SQL.STRING,
      allowNull: false,
    },
    max: {
      type: SQL.STRING,
      allowNull: false,
    },
  });
};

export default RangedAmount;
