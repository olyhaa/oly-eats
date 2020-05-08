const Timing = (db, SQL, Recipe) => {
  return db.define('timing', {
    type: {
      type: SQL.ENUM('PREP', 'TOTAL'),
      allowNull: false,
    },
    value: {
      type: SQL.INTEGER,
      allowNull: false,
    },
    units: {
      type: SQL.ENUM('MINUTE', 'HOUR'),
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

export default Timing;
