import { PropTypes } from 'prop-types';

export const DirectionStepPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired
});
