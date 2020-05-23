const DirectionStep = (db, SQL) => {
  return db.define('directionStep', {
    text: {
      type: SQL.STRING,
      allowNull: false,
    },
  });
};

export default DirectionStep;
