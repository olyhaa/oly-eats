import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const AddTagTypeModal = ({ open, handleAdd, handleCancel }) => {
  const [name, setName] = useState('');
  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Add New Tag Type</DialogTitle>
      <DialogContent>
        <TextField
          label="Tag Type Name"
          fullWidth
          required
          margin="normal"
          value={name}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={(event) => handleAdd(name)} color="primary" autoFocus>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddTagTypeModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
};

AddTagTypeModal.defaultProps = {};

export default AddTagTypeModal;
