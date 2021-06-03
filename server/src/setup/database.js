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
import RecipeTagModel from '../models/RecipeTag';

const debugDBModels = (models) => {
  for (let model of Object.keys(models)) {
    if (!models[model].name) continue;

    console.log(
      '\n\n----------------------------------\n',
      models[model].name,
      '\n----------------------------------'
    );

    console.log('\nAttributes');
    for (let attr of Object.keys(models[model].attributes)) {
      console.log(models[model].name + '.' + attr);
    }

    console.log('\nAssociations');
    for (let assoc of Object.keys(models[model].associations)) {
      for (let accessor of Object.keys(
        models[model].associations[assoc].accessors
      )) {
        console.log(
          models[model].name +
            '.' +
            models[model].associations[assoc].accessors[accessor] +
            '()'
        );
      }
    }
  }
};

export const createStore = () => {
  const Op = SQL.Op;
  const operatorsAliases = {
    $in: Op.in,
  };

  const db = new SQL('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: './src/db/store.sqlite',
    operatorsAliases,
    logging: false,
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
  const RecipeTag = new RecipeTagModel(db);

  // define relationships
  Tag.TagType = TagType.hasMany(Tag, { onDelete: 'cascade' });
  TagType.Tag = Tag.belongsTo(TagType);

  DirectionSection.Recipe = Recipe.hasMany(DirectionSection, {
    onDelete: 'cascade',
  });
  Recipe.DirectionSection = DirectionSection.belongsTo(Recipe);

  DirectionStep.DirectionSection = DirectionSection.hasMany(DirectionStep, {
    onDelete: 'cascade',
  });
  DirectionSection.DirectionStep = DirectionStep.belongsTo(DirectionSection);

  IngredientSection.Recipe = Recipe.hasMany(IngredientSection, {
    onDelete: 'cascade',
  });
  Recipe.IngredientSection = IngredientSection.belongsTo(Recipe);

  Ingredient.IngredientSection = IngredientSection.hasMany(Ingredient, {
    onDelete: 'cascade',
  });
  IngredientSection.Ingredient = Ingredient.belongsTo(IngredientSection);

  RangedAmount.Ingredient = Ingredient.hasOne(RangedAmount, {
    onDelete: 'cascade',
  });
  Ingredient.RangedAmount = RangedAmount.belongsTo(Ingredient);

  Timing.Recipe = Recipe.hasMany(Timing, { onDelete: 'cascade' });
  Recipe.Timing = Timing.belongsTo(Recipe);

  Recipe.belongsToMany(Tag, { through: RecipeTag });
  Tag.belongsToMany(Recipe, { through: RecipeTag });

  // Sync all the models
  db.sync()
    .then(() => {
      console.info('Database sync complete.');
    })
    .catch((error) => {
      console.error('ERROR - Unable to sync database: \n' + error);
    });
  /*
  debugDBModels({
    TagType,
    Tag,
    Recipe,
    DirectionSection,
    DirectionStep,
    Timing,
    IngredientSection,
    Ingredient,
    RangedAmount,
    RecipeTag,
  });
*/
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
