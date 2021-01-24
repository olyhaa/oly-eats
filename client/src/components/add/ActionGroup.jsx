import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  submitButton: {
    margin: 0,
    top: 'auto',
    right: theme.spacing(2),
    bottom: theme.spacing(2),
    left: 'auto',
    position: 'fixed',
  },
  speedDial: {
    position: 'absolute',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
}));

const ActionGroup = ({ hidden, handleEdit, handleDelete }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const actions = [
    {
      icon: <EditIcon />,
      name: 'Edit',
      onClick: handleEdit,
    },
    {
      icon: <DeleteIcon />,
      name: 'Delete',
      onClick: handleDelete,
    },
  ];

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <SpeedDial
      FabProps={{ 'data-test': 'action-menu' }}
      hidden={hidden}
      ariaLabel="Recipe Actions"
      className={classes.speedDial}
      icon={<SpeedDialIcon />}
      onClose={handleClose}
      onClick={handleOpen}
      open={open}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          FabProps={{ 'data-test': `action-${action.name}` }}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.onClick}
        />
      ))}
    </SpeedDial>
  );
};

ActionGroup.defaultProps = {
  hidden: false,
};

ActionGroup.propTypes = {
  hidden: PropTypes.bool,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

ActionGroup.defaultProps = {};

export default ActionGroup;
