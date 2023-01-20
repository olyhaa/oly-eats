import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, IconButton } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Icon from '@material-ui/core/Icon';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EditNumberModal from './EditNumberModal';
import {
  PREP_CARD,
  TOTAL_CARD,
  SERVING_CARD,
  SOURCE_CARD,
  DATE_ADDED_CARD,
  DATE_UPDATED_CARD,
} from './IconTypes';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  rootEdit: {
    height: '100%',
    '&:hover': {
      background: theme.palette.action.disabledBackground,
      cursor: 'pointer',
    },
    '&:hover $hoverIcons': {
      display: 'inline',
    },
  },
  hoverIcons: {
    display: 'none',
    '&:hover': {
      color: theme.palette.text.primary,
    },
  },
  group: {
    padding: theme.spacing(2),
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(5),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
  icon: {
    margin: theme.spacing(1),
    fontSize: '2rem',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(2),
    },
  },
  valueDisplay: {
    position: 'relative',
  },
  valueEdit: {
    position: 'absolute',
    top: '-2px',
    right: 0,
  },
}));

const IconCard = ({ title, display, value, type, updateValue }) => {
  const classes = useStyles();
  const [editModalOpenState, setEditModalOpen] = useState(false);

  const handleEditConfirm = (newValue) => {
    if (updateValue) {
      updateValue(newValue);
    }
    setEditModalOpen(false);
  };

  const handleEditCancel = () => {
    setEditModalOpen(false);
  };

  const getIcon = (type) => {
    switch (type) {
      case PREP_CARD:
        return 'utensils';
      case TOTAL_CARD:
        return 'clock';
      case SERVING_CARD:
        return 'bread-slice';
      case SOURCE_CARD:
        return 'mortar-pestle';
      case DATE_ADDED_CARD:
        return 'calendar-plus';
      case DATE_UPDATED_CARD:
        return 'calendar-check';
      default:
        return 'cheese';
    }
  };

  const getEdit = (type) => {
    if (type === SERVING_CARD) {
      return true;
    }
    return false;
  };

  return (
    <>
      <Paper
        className={getEdit(type) ? `${classes.rootEdit}` : `${classes.root}`}
        data-test={`card-${type}`}
      >
        <Box component="div" className={classes.group}>
          <Icon
            color="primary"
            className={`fa fa-${getIcon(type)} ${classes.icon}`}
          />

          <Typography variant="subtitle1">{title}</Typography>

          <Typography variant="subtitle1" className={classes.valueDisplay}>
            {type === SOURCE_CARD &&
              (value ? <Link href={value}>{display}</Link> : display)}
            {type !== SOURCE_CARD && value}
            {getEdit(type) && (
              <IconButton
                data-test="card-edit"
                className={`${classes.hoverIcons} ${classes.valueEdit}`}
                edge="end"
                aria-label="edit"
                size="small"
                onClick={() => {
                  setEditModalOpen(true);
                }}
              >
                <EditIcon />
              </IconButton>
            )}
          </Typography>
        </Box>
      </Paper>
      {type === SERVING_CARD && (
        <EditNumberModal
          open={editModalOpenState}
          initialValue={value}
          handleConfirm={handleEditConfirm}
          handleCancel={handleEditCancel}
          confirmLabel="Update"
          title={`Edit ${title}`}
        />
      )}
    </>
  );
};

IconCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  display: PropTypes.string,
  type: PropTypes.oneOf([
    PREP_CARD,
    TOTAL_CARD,
    SERVING_CARD,
    SOURCE_CARD,
    DATE_ADDED_CARD,
    DATE_UPDATED_CARD,
  ]),
  updateValue: PropTypes.func,
};

IconCard.defaultProps = {
  display: 'Unknown Source',
  type: 'SOURCE_CARD',
  updateValue: undefined,
};

export default IconCard;
