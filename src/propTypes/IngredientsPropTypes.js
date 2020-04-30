import PropTypes from 'prop-types';

export const IngredientItemPropType = PropTypes.shape({
  amount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ min: PropTypes.string, max: PropTypes.string }),
  ]).isRequired,
  unit: PropTypes.string,
  name: PropTypes.string.isRequired,
  prep: PropTypes.string,
  byWeight: PropTypes.bool,
  optional: PropTypes.bool,
  toTaste: PropTypes.bool,
});
