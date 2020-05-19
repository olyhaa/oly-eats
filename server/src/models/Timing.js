const Timing = (db, SQL) => {
  return db.define('timing', {
    value: {
      type: SQL.INTEGER,
      allowNull: false,
    },
    type: {
      type: SQL.ENUM('PREP', 'TOTAL'),
      allowNull: false,
    },
    units: {
      type: SQL.ENUM('MINUTE', 'HOUR'),
      allowNull: false,
    },
  });
};

export default Timing;
