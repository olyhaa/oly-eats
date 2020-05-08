import { DataSource } from 'apollo-datasource';

class RecipeAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
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

  // TODO add unit test
  constructTimeObj({ recipeid, newFields, type, typeFieldName }) {
    const prepTimeObj = {};
    let hasNewFields = false;

    if (newFields?.[typeFieldName]?.value) {
      prepTimeObj.value = newFields[typeFieldName].value;
      hasNewFields = true;
    }
    if (newFields?.[typeFieldName]?.units) {
      prepTimeObj.units = newFields[typeFieldName].units;
      hasNewFields = true;
    }
    if (hasNewFields) {
      prepTimeObj.type = type;
      prepTimeObj.recipeid = recipeid;
    }
    return prepTimeObj;
  }

  async getAllRecipes() {
    const response = await this.store.Recipe.findAll();
    // TODO handle errors
    return Array.isArray(response)
      ? response.map((recipe) => this.recipeReducer(recipe))
      : [];
  }

  async getRecipe({ id }) {
    const response = await this.store.Recipe.findByPk(id);
    // TODO handle errors
    return this.recipeReducer(response);
  }

  async addRecipe({ recipe: recipeFields }) {
    console.log('in add recipe: ' + JSON.stringify(recipeFields));
    const baseRecipe = await this.store.Recipe.create(
      this.constructBaseRecipeObj(recipeFields)
    );

    const prepTime = await this.store.Timing.create(
      constructTimeObj({
        recipeid: baseRecipe.id,
        recipeFields,
        type: 'PREP',
        typeFieldName: 'prepTime',
      })
    );

    const totalTime = await this.store.Timing.create(
      constructTimeObj({
        recipeid: baseRecipe.id,
        recipeFields,
        type: 'TOTAL',
        typeFieldName: 'totalTime',
      })
    );
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
      baseRecipe
      /*
      directions,
      ingredients,
      prepTime,
      totalTime,
      recipeTags
      */
    );
  }

  async deleteRecipe({ id }) {
    const response = await this.store.Recipe.destroy({ where: { id: id } });
    // TODO handle errors
    return 'Success!';
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

  async recipeReducer(recipe) {
    if (!recipe) {
      return null;
    }
    return {
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      source_display: recipe.source_display,
      source_url: recipe.source_url,
      photo_url: recipe.photo_url,
      servings: recipe.servings,
      dateAdded: recipe.createdAt,
      dateUpdated: recipe.updatedAt,
    };
  }
}

export default RecipeAPI;
