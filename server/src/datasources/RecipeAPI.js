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

    const prepTimeArray = [];
    if (Array.isArray(recipeFields.prepTime)) {
      for (let i = 0; i < recipeFields.prepTime.length; i++) {
        const timeElement = recipeFields.prepTime[i];
        const timeObj = this.constructTimeObj({
          recipeid: baseRecipe.id,
          newFields: timeElement,
          type: TIMINGS.PREP_TIME,
        });
        const timeEntry = await this.store.Timing.create(timeObj);
        prepTimeArray.push(timeEntry);
      }
    }

    const totalTimeArray = [];
    if (Array.isArray(recipeFields.totalTime)) {
      for (let i = 0; i < recipeFields.totalTime.length; i++) {
        const timeElement = recipeFields.totalTime[i];
        const timeObj = this.constructTimeObj({
          recipeid: baseRecipe.id,
          newFields: timeElement,
          type: TIMINGS.TOTAL_TIME,
        });
        const timeEntry = await this.store.Timing.create(timeObj);
        totalTimeArray.push(timeEntry);
      }
    }

    const directionSections = await this.addDirections({
      recipeid: baseRecipe.id,
      directions: recipeFields.directions,
    });

    const ingredientSections = await this.addIngredients({
      recipeid: baseRecipe.id,
      ingredients: recipeFields.ingredients,
    });

    const recipeTags = await this.addTags({
      recipeid: baseRecipe.id,
      tags: recipeFields.tags,
    });

    return recipeReducer({
      recipe: baseRecipe,
      prepTimeArray,
      totalTimeArray,
      directionSections,
      ingredientSections,
      recipeTags,
    });
  }

  async updateRecipe({ id, recipe: updatedFields }) {
    const recipe = await this.store.Recipe.findByPk(id);
    if (!recipe) {
      // TODO handle errors
    }
    let response = await this.store.Recipe.update(
      this.constructBaseRecipeObj(updatedFields),
      {
        where: { id: id },
      }
    );
    // TODO handle errors
    response = await this.store.Recipe.findByPk(id);
    return recipeReducer(response);
  }

  constructBaseRecipeObj(newFields) {
    const recipeObj = {};
    if (newFields.title) {
      recipeObj.title = newFields.title;
    }
    if (newFields.description) {
      recipeObj.description = newFields.description;
    }
    if (newFields.source_display) {
      recipeObj.source_display = newFields.source_display;
    }
    if (newFields.source_url) {
      recipeObj.source_url = newFields.source_url;
    }
    if (newFields.photo_url) {
      recipeObj.photo_url = newFields.photo_url;
    }
    if (newFields.servings) {
      recipeObj.servings = newFields.servings;
    }
    return recipeObj;
  }

  constructTimeObj({ recipeid, newFields, type }) {
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
      timeObj.recipeid = recipeid;
    }
    return timeObj;
  }

  constructDirectionSectionObj({ recipeid, section }) {
    const directionSectionObj = {};
    if (section?.label) {
      directionSectionObj.label = section.label;
    }
    directionSectionObj.recipeid = recipeid;
    return directionSectionObj;
  }

  constructDirectionStepObj({ sectionid, step }) {
    const stepObj = {};
    if (step?.text) {
      stepObj.text = step.text;
      stepObj.sectionid = sectionid;
    }
    return stepObj;
  }

  async addDirections({ recipeid, directions }) {
    const directionSectionArray = [];

    if (Array.isArray(directions)) {
      for (let i = 0; i < directions.length; i++) {
        const section = directions[i];
        const sectionObj = this.constructDirectionSectionObj({
          recipeid,
          section,
        });
        const directionSection = await this.store.DirectionSection.create(
          sectionObj
        );

        const directionStepArray = [];
        if (Array.isArray(section.steps)) {
          for (let j = 0; j < section.steps.length; j++) {
            const step = section.steps[j];
            const stepObj = this.constructDirectionStepObj({
              sectionid: directionSection.id,
              step,
            });
            const directionStep = await this.store.DirectionStep.create(
              stepObj
            );
            directionStepArray.push(directionStep);
          }
        }
        directionSection.steps = directionStepArray;
        directionSectionArray.push(directionSection);
      }
    }
    return directionSectionArray;
  }

  constructIngredientSectionObj({ recipeid, section }) {
    const ingredientSectionObj = {};
    if (section?.label) {
      ingredientSectionObj.label = section.label;
    }
    ingredientSectionObj.recipeid = recipeid;
    return ingredientSectionObj;
  }

  constructIngredientObj({ sectionid, ingredient }) {
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
    ingredientObj.sectionid = sectionid;

    return ingredientObj;
  }

  constructRangedObj({ ingredientid, amount }) {
    const rangedAmountObj = {};
    if (amount?.min && amount?.max) {
      rangedAmountObj.min = amount.min;
      rangedAmountObj.max = amount.max;
      rangedAmountObj.ingredientid = ingredientid;
    }
    return rangedAmountObj;
  }

  async addIngredients({ recipeid, ingredients }) {
    const ingredientSectionArray = [];

    if (Array.isArray(ingredients)) {
      for (let i = 0; i < ingredients.length; i++) {
        const section = ingredients[i];
        const sectionObj = this.constructIngredientSectionObj({
          recipeid,
          section,
        });
        const ingredientSection = await this.store.IngredientSection.create(
          sectionObj
        );

        const ingredientsArray = [];
        if (Array.isArray(section.ingredients)) {
          for (let j = 0; j < section.ingredients.length; j++) {
            const ingredient = section.ingredients[j];
            const ingredientObj = this.constructIngredientObj({
              sectionid: ingredientSection.id,
              ingredient,
            });
            const ingredientItem = await this.store.Ingredient.create(
              ingredientObj
            );
            if (ingredient.rangedAmount) {
              const rangedObj = this.constructRangedObj({
                ingredientid: ingredientItem.id,
                amount: ingredient.rangedAmount,
              });
              const rangedAmount = await this.store.RangedAmount.create(
                rangedObj
              );
              ingredientItem.rangedAmount = rangedAmount;
            }
            ingredientsArray.push(ingredientItem);
          }
        }
        ingredientSection.ingredients = ingredientsArray;
        ingredientSectionArray.push(ingredientSection);
      }
    }
    return ingredientSectionArray;
  }

  constructTagObj({ recipeid, tag }) {
    if (tag?.tagid) {
      return { recipeid, tagid: tag.tagid };
    }
    return undefined;
  }

  async addTags({ recipeid, tags }) {
    const tagsArray = [];

    if (Array.isArray(tags)) {
      for (let i = 0; i < tags.length; i++) {
        const tagObj = this.constructTagObj({
          recipeid,
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
    const recipe = await this.store.Recipe.findByPk(id);
    if (!recipe) {
      return {};
    }
    const prepTimeArray = await this.store.Timing.findAll({
      where: { recipeid: id, type: TIMINGS.PREP_TIME },
    });
    const totalTimeArray = await this.store.Timing.findAll({
      where: { recipeid: id, type: TIMINGS.TOTAL_TIME },
    });
    const directionSections = await this.store.DirectionSection.findAll({
      where: { recipeid: id },
    });

    if (directionSections) {
      for (let i = 0; i < directionSections.length; i++) {
        const directionSteps = await this.store.DirectionStep.findAll({
          where: { sectionid: directionSections[i].id },
        });
        directionSections[i].steps = directionSteps;
      }
    }
    const ingredientSections = await this.store.IngredientSection.findAll({
      where: { recipeid: id },
    });

    if (ingredientSections) {
      for (let i = 0; i < ingredientSections.length; i++) {
        const ingredients = await this.store.Ingredient.findAll({
          where: { sectionid: ingredientSections[i].id },
        });
        for (let j = 0; j < ingredients.length; j++) {
          const rangedAmount = await this.store.RangedAmount.findOne({
            where: { ingredientid: ingredients[j].id },
          });
          if (rangedAmount) {
            ingredients[j].rangedAmount = rangedAmount;
          }
        }
        ingredientSections[i].ingredients = ingredients;
      }
    }
    const recipeTags = await this.store.RecipeTag.findAll({
      where: { recipeid: id },
    });

    return {
      recipe,
      prepTimeArray,
      totalTimeArray,
      directionSections,
      ingredientSections,
      recipeTags,
    };
  }
}

export default RecipeAPI;
