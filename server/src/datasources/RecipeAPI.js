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

    const directionSections = await this.addDirections({
      recipeid: baseRecipe.id,
      directions: recipeFields.directions,
    });

    const ingredients = await this.addIngredients({
      recipeid: baseRecipe.id,
      ingredients: recipeFields.ingredients,
    });

    /*

      const recipeTags = await this.store.RecipeTag.create(
         constructRecipeTagObj({ recipeid: baseRecipe.id, recipeFields })
       );
*/
    return this.recipeReducer(
      {
        recipe: baseRecipe,
        prepTimeArray,
        totalTimeArray,
        directionSections,
        ingredients,
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

  async getRecipeData(id) {
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

    return {
      recipe,
      prepTimeArray,
      totalTimeArray,
      directionSections,
    };
  }

  timeReducer({ timeArray }) {
    let reducedTime = [];
    if (timeArray) {
      reducedTime = timeArray.map((element) => {
        return { id: element.id, value: element.value, units: element.units };
      });
    }
    return reducedTime;
  }

  directionStepsReducer({ steps }) {
    let reducedSteps = [];
    if (steps) {
      reducedSteps = steps.map((step) => {
        return { id: step.id, text: step.text };
      });
    }
    return reducedSteps;
  }

  directionsReducer({ directionSections }) {
    let reducedDirections = [];
    if (directionSections) {
      reducedDirections = directionSections.map((section) => {
        const reducedSection = {};
        if (section.label) {
          reducedSection.label = section.label;
        }
        reducedSection.id = section.id;
        reducedSection.steps = this.directionStepsReducer({
          steps: section.steps,
        });
        return reducedSection;
      });
    }
    return reducedDirections;
  }

  rangedAmountReducer({ rangedAmount }) {
    let reducedRangedAmount = [];
    if (rangedAmount) {
      return {
        min: rangedAmount.min,
        max: rangedAmount.max,
      };
    }
    return reducedRangedAmount;
  }

  ingredientReducer({ ingredient }) {
    const reducedIngredient = {};
    if (ingredient) {
      reducedIngredient.amount =
        ingredient.amount ??
        this.rangedAmountReducer({
          rangedAmount: ingredient.rangedAmount,
        });
      reducedIngredient.unit = ingredient.unit;
      reducedIngredient.prep = ingredient.prep;
      reducedIngredient.name = ingredient.name;
      reducedIngredient.toTaste = ingredient.toTaste;
      reducedIngredient.optional = ingredient.optional;
    }
    return reducedIngredient;
  }

  ingredientsReducer({ ingredients }) {
    let reducedIngredients = [];
    if (ingredients) {
      reducedIngredients = ingredients.map((section) => {
        const reducedSection = {};
        if (section.label) {
          reducedSection.label = section.label;
        }
        reducedSection.ingredients = section.ingredients.map((ingredient) => {
          return this.ingredientReducer({
            ingredient,
          });
        });
        return reducedSection;
      });
    }
    return reducedIngredients;
  }

  recipeReducer({
    recipe,
    prepTimeArray,
    totalTimeArray,
    directionSections,
    ingredients,
  }) {
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
      directions: this.directionsReducer({ directionSections }),
      ingredients: this.ingredientsReducer({ ingredients }),
      timing: {
        prep: this.timeReducer({ timeArray: prepTimeArray }),
        total: this.timeReducer({ timeArray: totalTimeArray }),
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
