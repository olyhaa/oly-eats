import SQL from 'sequelize';
import TagModel from '../models/Tag';
import TagTypeModel from '../models/TagType';
import TimingModel from '../models/Timing';
import DirectionStepModel from '../models/DirectionStep';
import DirectionSectionModel from '../models/DirectionSection';
import RecipeModel from '../models/Recipe';
import IngredientSectionModel from '../models/IngredientSection';
import IngredientModel from '../models/Ingredient';
import RecipeTagModel from '../models/RecipeTag';
import RangedAmountModel from '../models/RangedAmount';

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
  const Recipe = new RecipeModel(db, SQL);
  const DirectionSection = new DirectionSectionModel(db, SQL, Recipe);
  const DirectionStep = new DirectionStepModel(db, SQL, DirectionSection);
  const Timing = new TimingModel(db, SQL, Recipe);
  const IngredientSection = new IngredientSectionModel(db, SQL, Recipe);
  const Ingredient = new IngredientModel(db, SQL, IngredientSection);
  const RangedAmount = new RangedAmountModel(db, SQL, Ingredient);
  const RecipeTag = new RecipeTagModel(db, SQL, Recipe, Tag);

  // Sync all the models
  db.sync()
    .then(() => {
      console.info('Database sync complete.');
    })
    .catch(() => {
      console.error('ERROR - Unable to sync database.');
    });

  return {
    db,
    Recipe,
    DirectionStep,
    DirectionSection,
    IngredientSection,
    Ingredient,
    RangedAmount,
    Timing,
    RecipeTag,
    Tag,
    TagType,
  };
};

export default createStore;
