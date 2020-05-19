const DirectionSection = (db, SQL) => {
  return db.define('direction_section', {
    label: {
      type: SQL.STRING,
      allowNull: true,
    },
  });
};

export default DirectionSection;
