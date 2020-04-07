import PropTypes from 'prop-types';

export const DirectionStepPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
});
