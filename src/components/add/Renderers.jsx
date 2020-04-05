/* eslint-disable react/prop-types */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

export const renderTextBoxField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    label={label}
    error={touched && error}
    fullWidth
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
  ...custom
}) => (
  <TextField
    label={label}
    error={touched && error}
    fullWidth
    variant="outlined"
    margin="normal"
    {...input}
    {...custom}
  />
);

export const renderCheckbox = ({ input, label }) => (
  <FormControlLabel
    control={<Checkbox checked={!!input.value} onChange={input.onChange} />}
    label={label}
  />
);

export const renderRadioGroup = ({ input, ...rest }) => (
  <RadioGroup
    {...input}
    {...rest}
    value={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);

export const renderSelectField = ({
  input,
  label,
  value,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl>
    <InputLabel id="demo-simple-select-label">{label}</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      error={touched && error}
      {...input}
      value={value}
      onChange={(event, index, value) => input.onChange(value)}
      {...custom}
    >
      {children}
    </Select>
  </FormControl>
);
