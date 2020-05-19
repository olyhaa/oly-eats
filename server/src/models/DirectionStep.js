const DirectionStep = (db, SQL) => {
  return db.define('direction_step', {
    text: {
      type: SQL.STRING,
      allowNull: false,
    },
  });
};

export default DirectionStep;
