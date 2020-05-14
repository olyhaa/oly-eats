export const timeReducer = ({ timeArray }) => {
  let reducedTime = [];
  if (timeArray) {
    reducedTime = timeArray.map((element) => {
      return { id: element.id, value: element.value, units: element.units };
    });
  }
  return reducedTime;
};

export const directionStepsReducer = ({ steps }) => {
  let reducedSteps = [];
  if (steps) {
    reducedSteps = steps.map((step) => {
      return { id: step.id, text: step.text };
    });
  }
  return reducedSteps;
};

export const directionsReducer = ({ directionSections }) => {
  let reducedDirections = [];
  if (directionSections) {
    reducedDirections = directionSections.map((section) => {
      const reducedSection = {};
      if (section.label) {
        reducedSection.label = section.label;
      }
      reducedSection.id = section.id;
      reducedSection.steps = directionStepsReducer({
        steps: section.steps,
      });
      return reducedSection;
    });
  }
  return reducedDirections;
};

export const rangedAmountReducer = ({ rangedAmount }) => {
  let reducedRangedAmount = [];
  if (rangedAmount) {
    return {
      min: rangedAmount.min,
      max: rangedAmount.max,
    };
  }
  return reducedRangedAmount;
};

export const ingredientReducer = ({ ingredient }) => {
  const reducedIngredient = {};
  if (ingredient) {
    reducedIngredient.amount =
      ingredient.amount ??
      rangedAmountReducer({
        rangedAmount: ingredient.rangedAmount,
      });
    reducedIngredient.unit = ingredient.unit;
    reducedIngredient.prep = ingredient.prep;
    reducedIngredient.name = ingredient.name;
    reducedIngredient.toTaste = ingredient.toTaste;
    reducedIngredient.optional = ingredient.optional;
  }
  return reducedIngredient;
};

export const ingredientsReducer = ({ ingredientSections }) => {
  let reducedIngredients = [];
  if (ingredientSections) {
    reducedIngredients = ingredientSections.map((section) => {
      const reducedSection = {};
      if (section.label) {
        reducedSection.label = section.label;
      }
      reducedSection.ingredients = section.ingredients.map((ingredient) => {
        return ingredientReducer({
          ingredient,
        });
      });
      return reducedSection;
    });
  }
  return reducedIngredients;
};

export const recipeReducer = ({
  recipe,
  prepTimeArray,
  totalTimeArray,
  directionSections,
  ingredientSections,
}) => {
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
    directions: directionsReducer({ directionSections }),
    ingredients: ingredientsReducer({ ingredientSections }),
    timing: {
      prep: timeReducer({ timeArray: prepTimeArray }),
      total: timeReducer({ timeArray: totalTimeArray }),
    },
    dateAdded: recipe.createdAt,
    dateUpdated: recipe.updatedAt,
  };

  return recipeObj;
};

export const recipeMutationReducer = ({
  success = false,
  message = undefined,
  recipe = null,
}) => {
  return {
    success,
    message,
    recipe: recipeReducer(recipe ? { recipe } : {}),
  };
};
