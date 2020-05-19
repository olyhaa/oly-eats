import SQL from 'sequelize';
import TagModel from '../models/Tag';
import TagTypeModel from '../models/TagType';
import TimingModel from '../models/Timing';
import DirectionStepModel from '../models/DirectionStep';
import DirectionSectionModel from '../models/DirectionSection';
import RecipeModel from '../models/Recipe';
import IngredientSectionModel from '../models/IngredientSection';
import IngredientModel from '../models/Ingredient';
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

  // define Models
  const TagType = new TagTypeModel(db, SQL);
  const Tag = new TagModel(db, SQL);
  const Recipe = new RecipeModel(db, SQL);
  const DirectionSection = new DirectionSectionModel(db, SQL);
  const DirectionStep = new DirectionStepModel(db, SQL);
  const Timing = new TimingModel(db, SQL);
  const IngredientSection = new IngredientSectionModel(db, SQL);
  const Ingredient = new IngredientModel(db, SQL);
  const RangedAmount = new RangedAmountModel(db, SQL);

  // define relationships
  TagType.hasMany(Tag);
  Tag.belongsTo(TagType);

  Recipe.hasMany(DirectionSection);
  DirectionSection.belongsTo(Recipe);

  DirectionSection.hasMany(DirectionStep);
  DirectionStep.belongsTo(DirectionSection);

  Recipe.hasMany(IngredientSection);
  IngredientSection.belongsTo(Recipe);

  IngredientSection.hasMany(Ingredient);
  Ingredient.belongsTo(IngredientSection);

  Ingredient.hasOne(RangedAmount);
  RangedAmount.belongsTo(Ingredient);

  Recipe.hasMany(Timing);
  Timing.belongsTo(Recipe);

  Recipe.hasMany(Tag);
  Tag.belongsToMany(Recipe, { through: 'recipe_tags' });

  // Sync all the models
  db.sync()
    .then(() => {
      console.info('Database sync complete.');
    })
    .catch((error) => {
      console.error('ERROR - Unable to sync database: \n' + error);
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
    Tag,
    TagType,
  };
};

export default createStore;
