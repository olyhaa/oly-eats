import { DataSource } from 'apollo-datasource';
import { TIMINGS } from '../constants';
import { extendResolversFromInterfaces } from 'apollo-server';

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
            const recipeObjs = await this.getRecipeData(recipe.id);
            return this.recipeReducer(recipeObjs);
          })
        )
      : [];
  }

  async getRecipe({ id }) {
    const recipeObjs = await this.getRecipeData(id);
    return this.recipeReducer(recipeObjs);
  }

  async deleteRecipe({ id }) {
    const recipe = await this.store.Recipe.findByPk(id);
    if (!recipe) {
      return this.recipeMutationReducer({
        success: false,
        message: 'ID not found',
      });
    }
    await recipe.destroy();
    return this.recipeMutationReducer({
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

    /*
      const directions = addDirections({ recipeid: baseRecipe.id, recipeFields });

       const ingredients = addIngredients({
        recipeid: baseRecipe.id,
        recipeFields,
      });

      const recipeTags = await this.store.RecipeTag.create(
         constructRecipeTagObj({ recipeid: baseRecipe.id, recipeFields })
       );
*/
    return this.recipeReducer(
      {
        recipe: baseRecipe,
        prepTimeArray,
        totalTimeArray,
      }
      /*
      directions,
      ingredients,
      recipeTags
      */
    );
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
    return this.recipeReducer(response);
  }
  /*
  async addDirections({ recipeid, recipeFields }) {
    const directionSection = await this.store.DirectionSection.create(
      constructDirectionSectionObj({ recipeid: baseRecipe.id, recipeFields })
    );
    const directionStep = await this.store.DirectionStep.create(
      constructDirectionStepObj({
        sectionid: directionSection.id,
        recipeFields,
      })
    );
  }

  async addIngredients({ recipeId, recipeFields }) {
    const ingredientSection = await this.store.IngredientSection.create(
      constructIngredientSectionObj({ recipeid: baseRecipe.id, recipeFields })
    );
    const ingredient = await this.store.Ingredient.create(
      constructIngredientObj({ sectionid: ingredientSection.id, recipeFields })
    );
    const rangedAmount = await this.store.RangedAmount.create(
      constructRangedAmountObj({ ingredientid: ingredient.id, recipeFields })
    );
  }
*/

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
    const prepTimeObj = {};
    let hasNewFields = false;

    if (newFields?.value) {
      prepTimeObj.value = newFields.value;
      hasNewFields = true;
    }
    if (newFields?.units) {
      prepTimeObj.units = newFields.units;
      hasNewFields = true;
    }
    if (hasNewFields) {
      prepTimeObj.type = type;
      prepTimeObj.recipeid = recipeid;
    }
    return prepTimeObj;
  }

  async getRecipeData(id) {
    const recipe = await this.store.Recipe.findByPk(id);
    const prepTimeArray = await this.store.Timing.findAll({
      where: { recipeid: id, type: TIMINGS.PREP_TIME },
    });
    const totalTimeArray = await this.store.Timing.findAll({
      where: { recipeid: id, type: TIMINGS.TOTAL_TIME },
    });
    return { recipe, prepTimeArray, totalTimeArray };
  }

  recipeReducer({ recipe, prepTimeArray, totalTimeArray }) {
    if (!recipe) {
      return null;
    }
    const recipeObj = {
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      source: {
        display: recipe.source_display,
        url: recipe.source_url,
      },
      photo: recipe.photo_url,
      servings: recipe.servings,
      timing: {
        prep: prepTimeArray,
        total: totalTimeArray,
      },
      dateAdded: recipe.createdAt,
      dateUpdated: recipe.updatedAt,
    };

    return recipeObj;
  }

  recipeMutationReducer({
    success = false,
    message = undefined,
    recipe = null,
  }) {
    return {
      success,
      message,
      recipe: this.recipeReducer(recipe ? { recipe } : {}),
    };
  }
}

export default RecipeAPI;
