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

    const directionSections = this.addDirections({
      recipeid: baseRecipe.id,
      directions: recipeFields.directions,
    });

    /*
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
        diirections: directionSections,
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

  constructDirectionSectionObj({ recipeid, directions }) {
    const directionSectionObj = {};
    if (directions.label) {
      directionSectionObj.label = directions.label;
    }
    directionSectionObj.recipeid = recipeid;
    return directionSectionObj;
  }

  constructDirectionStepObj({ sectionid, step }) {
    const stepObj = {};
    if (step.text) {
      stepObj.text = step.text;
    }
    stepObj.sectionid = sectionid;
    return stepObj;
  }

  async addDirections({ recipeid, directions }) {
    const directionSectionArray = [];

    if (Array.isArray(directions)) {
      for (let i = 0; i < directions.length; i++) {
        const section = directions[i];
        const directionSection = await this.store.DirectionSection.create(
          constructDirectionSectionObj({
            recipeid,
            section,
          })
        );

        const directionStepArray = [];
        if (Array.isArray(section.steps)) {
          for (let j = 0; i < section.steps.length; j++) {
            const step = section.steps[j];
            const directionStep = await this.store.DirectionStep.create(
              constructDirectionStepObj({
                sectionid: directionSection.id,
                step,
              })
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
    console.log('steps array = ' + JSON.stringify(steps));
    let reducedSteps = [];
    if (steps) {
      reducedSteps = steps.map((step) => {
        return { id: step.id, text: step.text };
      });
    }
    return reducedSteps;
  }

  directionsReducer({ directionSections }) {
    console.log(
      'directionSections array = ' + JSON.stringify(directionSections)
    );
    let reducedDirections = [];
    if (directionSections) {
      reducedDirections = directionSections.map((section) => {
        const reducedSection = {};
        reducedSection.label = section.label;
        reducedSection.id = section.id;
        reducedSection.steps = this.directionStepsReducer({
          steps: section.steps,
        });
        return reducedSection;
      });
    }
    return reducedDirections;
  }

  recipeReducer({ recipe, prepTimeArray, totalTimeArray, directionSections }) {
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
