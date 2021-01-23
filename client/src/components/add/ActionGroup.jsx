import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

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

const ActionGroup = ({
  hidden,
  handleEdit,
  handleDelete,
  isFavorite,
  handleUnfavorite,
  handleFavorite,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const actions = [
    {
      icon: <EditIcon />,
      name: 'Edit',
      onClick: handleEdit,
      visible: true,
    },
    {
      icon: <DeleteIcon />,
      name: 'Delete',
      onClick: handleDelete,
      visible: true,
    },
    {
      icon: <StarIcon />,
      name: 'Unfavorite',
      onClick: handleUnfavorite,
      visible: isFavorite,
    },
    {
      icon: <StarBorderIcon />,
      name: 'Favorite',
      onClick: handleFavorite,
      visible: !isFavorite,
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
      {actions.map(
        (action) =>
          action.visible && (
            <SpeedDialAction
              key={action.name}
              FabProps={{ 'data-test': `action-${action.name}` }}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.onClick}
            />
          )
      )}
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
  isFavorite: PropTypes.bool.isRequired,
  handleUnfavorite: PropTypes.func.isRequired,
  handleFavorite: PropTypes.func.isRequired,
};

ActionGroup.defaultProps = {};

export default ActionGroup;
