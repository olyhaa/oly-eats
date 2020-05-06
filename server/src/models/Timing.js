const Timing = (db, SQL, Recipe) => {
  return db.define('timing', {
    value: {
      type: SQL.INTEGER,
      allowNull: false,
    },
    units: {
      type: SQL.ENUM('minute', 'hour'),
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
