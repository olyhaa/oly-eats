const DirectionSection = (db, SQL, Recipe) => {
  return db.define('direction_section', {
    label: {
      type: SQL.STRING,
      allowNull: false,
    },
    recipeid: {
      type: SQL.STRING,
      allowNull: false,
      references: {
        model: Recipe,
        key: 'id',
      },
    },
  });
};

export default DirectionSection;
