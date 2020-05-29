import { TIMINGS } from '../constants';

export const sortById = (item1, item2) => {
  return item1.id - item2.id;
};

export const timingReducer = ({ timingArray }) => {
  const reducedTiming = {};
  if (timingArray) {
    const prepArray = [];
    const totalArray = [];
    for (let i = 0; i < timingArray.length; i++) {
      if (timingArray[i].type === TIMINGS.PREP_TIME) {
        prepArray.push(timingArray[i]);
      } else if (timingArray[i].type === TIMINGS.TOTAL_TIME) {
        totalArray.push(timingArray[i]);
      }
    }
    reducedTiming.prep = timeReducer({ timeArray: prepArray });
    reducedTiming.total = timeReducer({ timeArray: totalArray });
  }
  return reducedTiming;
};

export const timeReducer = ({ timeArray }) => {
  let reducedTime = [];
  if (timeArray) {
    reducedTime = timeArray.map((element) => {
      return { value: element.value, units: element.units };
    });
  }
  return reducedTime;
};

export const directionStepsReducer = ({ steps }) => {
  let reducedSteps = [];
  if (steps) {
    reducedSteps = steps.sort(sortById).map((step) => {
      return { text: step.text };
    });
  }
  return reducedSteps;
};

export const directionsReducer = ({ directionSections }) => {
  let reducedDirections = [];
  if (directionSections) {
    reducedDirections = directionSections.sort(sortById).map((section) => {
      const reducedSection = {};
      if (section.label) {
        reducedSection.label = section.label;
      }
      reducedSection.steps = directionStepsReducer({
        steps: section.directionSteps,
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
    if (ingredient.amount) {
      reducedIngredient.amount = ingredient.amount;
    }
    if (ingredient.rangedAmount) {
      reducedIngredient.rangedAmount = rangedAmountReducer({
        rangedAmount: ingredient.rangedAmount,
      });
    }
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
    reducedIngredients = ingredientSections.sort(sortById).map((section) => {
      const reducedSection = {};
      if (section.label) {
        reducedSection.label = section.label;
      }
      reducedSection.ingredients = section.ingredients
        .sort(sortById)
        .map((ingredient) => {
          return ingredientReducer({
            ingredient,
          });
        });
      return reducedSection;
    });
  }
  return reducedIngredients;
};

export const tagsReducer = ({ recipeTags }) => {
  console.log('recipeTags: ' + JSON.stringify(recipeTags));
  let reducedTags = [];
  if (recipeTags) {
    reducedTags = recipeTags.map((tag) => {
      return {
        id: tag.id,
        label: tag.label,
        type: {
          id: tag.tagType.id,
          label: tag.tagType.label,
        },
      };
    });
  }
  return reducedTags;
};

export const metaReducer = ({ createdAt, updatedAt }) => {
  const reducedMeta = {};
  if (createdAt) {
    reducedMeta.dateAdded = createdAt;
    if (createdAt.toString() != updatedAt.toString()) {
      reducedMeta.dateUpdated = updatedAt;
    }
  }
  return reducedMeta;
};

export const recipeReducer = ({ recipe }) => {
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
    directions: directionsReducer({
      directionSections: recipe.directionSections,
    }),
    ingredients: ingredientsReducer({
      ingredientSections: recipe.ingredientSections,
    }),
    timing: timingReducer({ timingArray: recipe.timings }),
    tags: tagsReducer({ recipeTags: recipe.tags }),
    meta: metaReducer({
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt,
    }),
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
    recipe: recipeReducer(recipe ? recipe : {}),
  };
};
