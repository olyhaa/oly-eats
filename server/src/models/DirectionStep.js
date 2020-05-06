const DirectionStep = (db, SQL, DirectionSection) => {
  return db.define('direction_step', {
    text: {
      type: SQL.STRING,
      allowNull: false,
    },
    sectionid: {
      type: SQL.STRING,
      allowNull: false,
      references: {
        model: DirectionSection,
        key: 'id',
      },
    },
  });
};

export default DirectionStep;
