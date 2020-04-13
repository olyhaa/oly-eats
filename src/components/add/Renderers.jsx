/* eslint-disable react/prop-types */
import React from 'react';
import { Field } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { FIELDS, isRequired } from './constants';

export const onlyNums = (value, previousValue) => {
  const pattern = new RegExp(/^[0-9]*$/);
  return pattern.test(value) ? Math.min(Number(value), 100) : previousValue;
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
    variant="outlined"
    margin="normal"
    helperText={touched && error ? error : helperText}
    {...input}
    {...custom}
  />
);

export const renderIngredients = ({ fields, meta: { error } }) => (
  <>
    {fields.map((section, index) => (
      <>
        <Fab
          type="button"
          color="secondary"
          onClick={() => fields.remove(index)}
        >
          <CloseIcon />
        </Fab>
        <Field
          name={`${section}.${FIELDS.INGREDIENTS_LABEL}`}
          component={renderTextField}
          required={isRequired(FIELDS.INGREDIENTS_LABEL)}
          label={`Ingredient Section #${index + 1}`}
        />
        <Field
          name={`${section}.${FIELDS.INGREDIENTS_LIST}`}
          component={renderTextBoxField}
          required={isRequired(FIELDS.INGREDIENTS_LIST)}
          label="Ingredients"
          helperText="Add each ingredient to a new line"
        />
      </>
    ))}
    <Fab
      type="button"
      variant="extended"
      color="primary"
      onClick={() => fields.push({})}
    >
      <AddIcon />
      Add Ingredient Section
    </Fab>
  </>
);

export const renderDirections = ({ fields, meta: { error } }) => (
  <div>
    {fields.map((section, index) => (
      <>
        <Fab
          type="button"
          color="secondary"
          onClick={() => fields.remove(index)}
        >
          <CloseIcon />
        </Fab>
        <Field
          name={`${section}.${FIELDS.DIRECTIONS_LABEL}`}
          component={renderTextField}
          required={isRequired(FIELDS.DIRECTIONS_LABEL)}
          label={`Direction Section #${index + 1}`}
        />
        <Field
          name={`${section}.${FIELDS.DIRECTIONS_LIST}`}
          component={renderTextBoxField}
          required={isRequired(FIELDS.DIRECTIONS_LIST)}
          label="Directions"
          helperText="Add each step to a new line"
        />
      </>
    ))}
    <Fab
      type="button"
      variant="extended"
      color="primary"
      onClick={() => fields.push({})}
    >
      <AddIcon />
      Add Direction Section
    </Fab>
  </div>
);
