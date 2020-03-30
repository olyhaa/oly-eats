import { PropTypes } from 'prop-types';

export const IngredientItemPropType = PropTypes.shape({
  value: PropTypes.number.isRequired,
  units: PropTypes.string,
  description: PropTypes.string.isRequired,
  notes: PropTypes.string
});
