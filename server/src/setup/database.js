import SQL from 'sequelize';
import TagModel from '../models/Tag';
import TagTypeModel from '../models/TagType';

export const createStore = () => {
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

  const TagType = new TagTypeModel(db, SQL);
  const Tag = new TagModel(db, SQL, TagType);

  // Sync all the models
  db.sync()
    .then(() => {
      console.info('Database sync complete.');
    })
    .catch(() => {
      console.error('ERROR - Unable to sync database.');
    });

  return { db, Tag, TagType };
};

export default createStore;
