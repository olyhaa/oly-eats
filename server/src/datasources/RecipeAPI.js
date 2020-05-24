import { DataSource } from 'apollo-datasource';
import { TIMINGS } from '../constants';
import { recipeReducer, recipeMutationReducer } from './RecipeReducer';

class RecipeAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  async getAllRecipes() {
    const response = await this.store.Recipe.findAll();
    return Array.isArray(response)
      ? await Promise.all(
          response.map(async (recipe) => {
            const recipeObjs = await this.getRecipeData({ id: recipe.id });
            return recipeReducer(recipeObjs);
          })
        )
      : [];
  }

  async getRecipe({ id }) {
    const recipeObjs = await this.getRecipeData({ id });
    return recipeReducer(recipeObjs);
  }

  async deleteRecipe({ id }) {
    const recipe = await this.store.Recipe.findByPk(id);
    if (!recipe) {
      return recipeMutationReducer({
        success: false,
        message: 'ID not found',
      });
    }
    await recipe.destroy();
    return recipeMutationReducer({
      success: true,
    });
  }

  async addRecipe({ recipe: recipeFields }) {
    const baseRecipe = await this.store.Recipe.create(
      this.constructBaseRecipeObj(recipeFields)
    );

    if (Array.isArray(recipeFields?.timing.prep)) {
      for (let i = 0; i < recipeFields.timing.prep.length; i++) {
        const timeElement = recipeFields.timing.prep[i];
        const timeObj = this.constructTimeObj({
          newFields: timeElement,
          type: TIMINGS.PREP_TIME,
        });
        baseRecipe.createTiming(timeObj);
      }
    }

    if (Array.isArray(recipeFields?.timing.total)) {
      for (let i = 0; i < recipeFields.timing.total.length; i++) {
        const timeElement = recipeFields.timing.total[i];
        const timeObj = this.constructTimeObj({
          newFields: timeElement,
          type: TIMINGS.TOTAL_TIME,
        });
        baseRecipe.createTiming(timeObj);
      }
    }

    const directionsArray = this.constructDirections({
      directions: recipeFields.directions,
    });
    for (let i = 0; i < directionsArray.length; i++) {
      baseRecipe.createDirectionSection(directionsArray[i], {
        include: { all: true, nested: true },
      });
    }

    const ingredientsArray = this.constructIngredients({
      ingredients: recipeFields.ingredients,
    });
    for (let i = 0; i < ingredientsArray.length; i++) {
      baseRecipe.createIngredientSection(ingredientsArray[i], {
        include: { all: true, nested: true },
      });
    }

    await this.addTags({
      recipeId: baseRecipe.id,
      tags: recipeFields.tags,
    });

    const recipeObj = await this.getRecipeData({ id: baseRecipe.id });
    return recipeMutationReducer({
      success: true,
      recipe: recipeObj,
    });
  }

  async updateRecipe({ id, recipe: updatedFields }) {
    const recipe = await this.store.Recipe.findByPk(id);
    if (!recipe) {
      return recipeMutationReducer({
        success: false,
        message: 'ID not found',
      });
    }
    /*
    let response = await this.store.Recipe.update(
      this.constructBaseRecipeObj(updatedFields),
      {
        where: { id: id },
      }
    );
*/
    const recipeObj = await this.getRecipeData({ id: baseRecipe.id });
    return recipeMutationReducer({
      success: false,
      message: 'Action not supported yet',
      recipe: recipeObj,
    });
  }

  constructBaseRecipeObj(newFields) {
    const recipeObj = {};
    if (newFields.title) {
      recipeObj.title = newFields.title;
    }
    if (newFields.description) {
      recipeObj.description = newFields.description;
    }
    if (newFields.source?.display) {
      recipeObj.source_display = newFields.source.display;
    }
    if (newFields.source?.url) {
      recipeObj.source_url = newFields.source.url;
    }
    if (newFields.photo) {
      recipeObj.photo_url = newFields.photo;
    }
    if (newFields.servings) {
      recipeObj.servings = newFields.servings;
    }
    return recipeObj;
  }

  constructTimeObj({ recipeId, newFields, type }) {
    const timeObj = {};
    let hasNewFields = false;

    if (newFields?.value) {
      timeObj.value = newFields.value;
      hasNewFields = true;
    }
    if (newFields?.units) {
      timeObj.units = newFields.units;
      hasNewFields = true;
    }
    if (hasNewFields) {
      timeObj.type = type;
      timeObj.recipeId = recipeId;
    }
    return timeObj;
  }

  constructDirectionSectionObj({ section }) {
    const directionSectionObj = {};
    if (section?.label) {
      directionSectionObj.label = section.label;
    }
    return directionSectionObj;
  }

  constructDirectionStepObj({ step }) {
    const stepObj = {};
    if (step?.text) {
      stepObj.text = step.text;
    }
    return stepObj;
  }

  constructDirections({ directions }) {
    const directionSectionArray = [];

    if (Array.isArray(directions)) {
      for (let i = 0; i < directions.length; i++) {
        const section = directions[i];
        const sectionObj = this.constructDirectionSectionObj({
          section,
        });

        const directionStepArray = [];
        if (Array.isArray(section.steps)) {
          for (let j = 0; j < section.steps.length; j++) {
            const step = section.steps[j];
            const stepObj = this.constructDirectionStepObj({
              step,
            });
            directionStepArray.push(stepObj);
          }
        }
        sectionObj.directionSteps = directionStepArray;
        directionSectionArray.push(sectionObj);
      }
    }
    return directionSectionArray;
  }

  constructIngredientSectionObj({ section }) {
    const ingredientSectionObj = {};
    if (section?.label) {
      ingredientSectionObj.label = section.label;
    }
    return ingredientSectionObj;
  }

  constructIngredientObj({ ingredient }) {
    const ingredientObj = {};

    if (ingredient?.amount) {
      ingredientObj.amount = ingredient.amount;
    }
    if (ingredient?.unit) {
      ingredientObj.unit = ingredient.unit;
    }
    if (ingredient?.prep) {
      ingredientObj.prep = ingredient.prep;
    }
    if (ingredient?.name) {
      ingredientObj.name = ingredient.name;
    }
    if (ingredient?.toTaste != undefined) {
      ingredientObj.toTaste = ingredient.toTaste;
    }
    if (ingredient?.optional != undefined) {
      ingredientObj.optional = ingredient.optional;
    }

    return ingredientObj;
  }

  constructRangedObj({ amount }) {
    const rangedAmountObj = {};
    if (amount?.min && amount?.max) {
      rangedAmountObj.min = amount.min;
      rangedAmountObj.max = amount.max;
    }
    return rangedAmountObj;
  }

  constructIngredients({ ingredients }) {
    const ingredientSectionArray = [];

    if (Array.isArray(ingredients)) {
      for (let i = 0; i < ingredients.length; i++) {
        const section = ingredients[i];
        const sectionObj = this.constructIngredientSectionObj({
          section,
        });

        const ingredientsArray = [];
        if (Array.isArray(section.ingredients)) {
          for (let j = 0; j < section.ingredients.length; j++) {
            const ingredient = section.ingredients[j];
            const ingredientObj = this.constructIngredientObj({
              ingredient,
            });
            if (ingredient.rangedAmount) {
              const rangedObj = this.constructRangedObj({
                amount: ingredient.rangedAmount,
              });
              ingredientObj.rangedAmount = rangedObj;
            }
            ingredientsArray.push(ingredientObj);
          }
        }
        sectionObj.ingredients = ingredientsArray;
        ingredientSectionArray.push(sectionObj);
      }
    }
    return ingredientSectionArray;
  }

  constructTagObj({ recipeId, tag }) {
    if (tag?.id) {
      return { recipeId, tagId: tag.id };
    }
    return undefined;
  }

  async addTags({ recipeId, tags }) {
    const tagsArray = [];

    if (Array.isArray(tags)) {
      for (let i = 0; i < tags.length; i++) {
        const tagObj = this.constructTagObj({
          recipeId,
          tag: tags[i],
        });
        if (tagObj) {
          const tag = await this.store.RecipeTag.create(tagObj);
          tagsArray.push(tag);
        }
      }
    }

    return tagsArray;
  }

  async getRecipeData({ id }) {
    const recipe = await this.store.Recipe.findByPk(id, {
      include: { all: true, nested: true },
    });

    if (!recipe) {
      return {};
    }

    return {
      recipe,
    };
  }
}

export default RecipeAPI;
