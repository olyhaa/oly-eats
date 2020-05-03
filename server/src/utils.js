const SQL = require('sequelize');

module.exports.createStore = () => {
  const Op = SQL.Op;
  const operatorsAliases = {
    $in: Op.in,
  };

  const db = new SQL('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: './src/db/store.sqlite',
    operatorsAliases,
    logging: true,
  });

  const TagType = db.define('tag_type', {
    label: {
      type: SQL.STRING,
      allowNull: false,
    },
  });

  const Tag = db.define('tag', {
    typeid: {
      type: SQL.STRING,
      allowNull: false,
      references: {
        model: TagType,
        key: 'id',
      },
    },
    label: {
      type: SQL.STRING,
      allowNull: false,
    },
  });

  // Sync all the models
  db.sync().then(() => {
    console.log('Database sync complete!');
  });

  return { db, Tag, TagType };
};
