/* eslint-disable react/prop-types */
import React from 'react';
import TextField from '@material-ui/core/TextField';

const onlyNums = (value) => {
  value.replace(/[^\d]/g, '');
};

export const renderTextBoxField = ({
  input,
  label,
  meta: { touched, error },
  required,
  helperText,
  ...custom
}) => (
  <TextField
    label={label}
    error={touched && error}
    fullWidth
    required={required}
    helperText={touched && error ? error : helperText}
    multiline
    rows={4}
    rowsMax={20}
    margin="normal"
    variant="outlined"
    {...input}
    {...custom}
  />
);

export const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  required,
  helperText,
  ...custom
}) => (
  <TextField
    label={label}
    error={touched && error}
    fullWidth
    required={required}
    helperText={touched && error ? error : helperText}
    variant="outlined"
    margin="normal"
    {...input}
    {...custom}
  />
);

export const renderNumberField = ({
  input,
  label,
  meta: { touched, error },
  required,
  helperText,
  ...custom
}) => (
  <TextField
    label={label}
    error={touched && error}
    fullWidth
    required={required}
    type="number"
    variant="outlined"
    margin="normal"
    helperText={touched && error ? error : helperText}
    normalize={onlyNums}
    {...input}
    {...custom}
  />
);
