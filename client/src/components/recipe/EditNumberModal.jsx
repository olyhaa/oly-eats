import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const EditNumberModal = ({
  open,
  handleConfirm,
  handleCancel,
  initialValue,
  title,
  confirmLabel,
}) => {
  const [value, setValue] = useState(initialValue);
  const [errorText, setErrorText] = useState(undefined);
  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    if (newValue <= 0) {
      setErrorText('Value must be greater than 0.');
    } else if (newValue >= 100) {
      setErrorText('Value must be less than 100.');
    } else {
      setErrorText(undefined);
    }
  };

  return (
    <Dialog
      data-test="edit-modal-dialog"
      open={open}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" data-test="edit-modal-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <TextField
          data-test="edit-modal-input"
          label="New Value"
          fullWidth
          required
          margin="normal"
          type="number"
          error={!!errorText}
          helperText={errorText}
          defaultValue={initialValue}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCancel}
          color="primary"
          data-test="edit-modal-cancel"
        >
          Cancel
        </Button>
        <Button
          onClick={() => handleConfirm(value)}
          color="primary"
          autoFocus
          disabled={errorText}
          data-test="edit-modal-confirm"
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditNumberModal.propTypes = {
  initialValue: PropTypes.number,
  open: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  confirmLabel: PropTypes.string.isRequired,
};

EditNumberModal.defaultProps = {
  initialValue: '',
};

export default EditNumberModal;
