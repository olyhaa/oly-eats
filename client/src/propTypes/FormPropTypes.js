import PropTypes from 'prop-types';

export const fieldInputPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onDragStart: PropTypes.func,
  onDrop: PropTypes.func,
  onFocus: PropTypes.func,
  value: PropTypes.string,
});

export const fieldMetaPropType = PropTypes.shape({
  active: PropTypes.bool.isRequired,
  asyncValidating: PropTypes.bool.isRequired,
  autofilled: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.string,
  form: PropTypes.string.isRequired,
  warning: PropTypes.string,
  invalid: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  touched: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  visited: PropTypes.bool.isRequired,
});
