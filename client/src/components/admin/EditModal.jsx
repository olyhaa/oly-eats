import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const EditModal = ({
  open,
  handleConfirm,
  handleCancel,
  initialValue,
  title,
  confirmLabel,
}) => {
  const [name, setName] = useState();
  const handleChange = (event) => {
    setName(event.target.value);
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
          label="Tag Type Name"
          fullWidth
          required
          margin="normal"
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
          onClick={() => handleConfirm(name)}
          color="primary"
          autoFocus
          data-test="edit-modal-confirm"
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditModal.propTypes = {
  initialValue: PropTypes.string,
  open: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  confirmLabel: PropTypes.string.isRequired,
};

EditModal.defaultProps = {
  initialValue: '',
};

export default EditModal;
