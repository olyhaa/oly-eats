import PropTypes from 'prop-types';
import { RECIPE } from 'utils/recipeConstants';

const directionStepPropType = {};
directionStepPropType[RECIPE.DIRECTIONS_SECTION_TEXT] =
  PropTypes.string.isRequired;

export const DirectionStepPropType = PropTypes.shape(directionStepPropType);
