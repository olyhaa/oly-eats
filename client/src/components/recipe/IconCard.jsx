import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
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
  group: {
    padding: theme.spacing(2),
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(5),
    },
  },
  icon: {
    margin: theme.spacing(1),
    fontSize: '2rem',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(2),
    },
  },
}));

function IconCard({ title, display, value, type }) {
  const classes = useStyles();

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

  return (
    <Paper className={classes.root} data-test={`card-${type}`}>
      <Box component="div" className={classes.group}>
        <Icon
          color="primary"
          className={`fa fa-${getIcon(type)} ${classes.icon}`}
        />

        <Typography variant="subtitle1">{title}</Typography>

        <Typography variant="subtitle1">
          {type === SOURCE_CARD &&
            (value ? <Link href={value}>{display}</Link> : display)}
          {type !== SOURCE_CARD && value}
        </Typography>
      </Box>
    </Paper>
  );
}

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
};

IconCard.defaultProps = {
  display: 'Unknown Source',
  type: 'SOURCE_CARD',
};

export default IconCard;
