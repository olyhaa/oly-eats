import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  group: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const InputComponent = ({ ...other }) => <div {...other} />;

const OutlinedDiv = ({ children, label, required, error }) => {
  const classes = useStyles();
  return (
    <TextField
      className={classes.group}
      variant="outlined"
      label={label}
      multiline
      fullWidth
      required={required}
      error={error}
      helperText={error || ''}
      InputLabelProps={{ shrink: true }}
      InputProps={{
        inputComponent: InputComponent,
      }}
      // eslint-disable-next-line react/jsx-no-duplicate-props
      inputProps={{ children }}
    />
  );
};

OutlinedDiv.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  error: PropTypes.string,
};

OutlinedDiv.defaultProps = {
  required: false,
  error: undefined,
};

export default OutlinedDiv;
