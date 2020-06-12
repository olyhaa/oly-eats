import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const DeleteModal = ({
  open,
  title,
  contentText,
  confirmLabel,
  handleConfirm,
  handleCancel,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" data-test="delete-modal-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          data-test="delete-modal-text"
        >
          {contentText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCancel}
          color="primary"
          data-test="delete-modal-cancel"
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          color="primary"
          autoFocus
          data-test="delete-modal-confirm"
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  contentText: PropTypes.string,
  confirmLabel: PropTypes.string,
};

DeleteModal.defaultProps = {
  title: 'Delete',
  contentText: 'Are you sure',
  confirmLabel: 'Delete',
};

export default DeleteModal;
