import PropTypes from 'prop-types';
import { RECIPE } from 'utils/recipeConstants';

export const RangedAmountPropTypes = {};
RangedAmountPropTypes[RECIPE.INGREDIENTS_AMOUNT_MIN] = PropTypes.string;
RangedAmountPropTypes[RECIPE.INGREDIENTS_AMOUNT_MAX] = PropTypes.string;

const ingredientItemPropType = {};
ingredientItemPropType[RECIPE.INGREDIENTS_AMOUNT] = PropTypes.string;
ingredientItemPropType[RECIPE.INGREDIENTS_RANGE] = PropTypes.shape(
  RangedAmountPropTypes
);
ingredientItemPropType[RECIPE.INGREDIENTS_UNIT] = PropTypes.string;
ingredientItemPropType[RECIPE.INGREDIENTS_NAME] = PropTypes.string.isRequired;
ingredientItemPropType[RECIPE.INGREDIENTS_PREP] = PropTypes.string;
ingredientItemPropType[RECIPE.INGREDIENTS_OPTIONAL] = PropTypes.bool;
ingredientItemPropType[RECIPE.INGREDIENTS_TO_TASTE] = PropTypes.bool;

export const IngredientItemPropType = PropTypes.shape(ingredientItemPropType);

export const IngredientListPropType = {};
IngredientListPropType[RECIPE.INGREDIENT_SECTION_LABEL] = PropTypes.string;
IngredientListPropType[
  RECIPE.INGREDIENT_SECTION_INGREDIENTS
] = PropTypes.arrayOf(IngredientItemPropType).isRequired;
