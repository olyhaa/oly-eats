const DirectionSection = (db, SQL) => {
  return db.define('directionSection', {
    label: {
      type: SQL.STRING,
      allowNull: true,
    },
  });
};

export default DirectionSection;
