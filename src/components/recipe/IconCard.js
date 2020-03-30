import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { PREP_CARD, TOTAL_CARD, SERVING_CARD, SOURCE_CARD } from '../../utils/IconTypes';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  group: {
    padding: theme.spacing(5),
    textAlign: 'center'
  },
  icon: {
    margin: theme.spacing(2),
    fontSize: '2rem'
  }
}));

function IconCard({ title, display, value, type }) {
  const classes = useStyles();

  const getIcon = type => {
    switch (type) {
      case PREP_CARD:
        return 'utensils';
      case TOTAL_CARD:
        return 'clock';
      case SERVING_CARD:
        return 'bread-slice';
      case SOURCE_CARD:
        return 'mortar-pestle';
      default:
        return 'cheese';
    }
  };

  return (
    <Paper className={classes.root}>
      <Box component="div" className={classes.group}>
        <Icon color="primary" className={`fa fa-${getIcon(type)} ${classes.icon}`} />

        <Typography variant="subtitle1">{title}</Typography>

        <Typography variant="subtitle1">
          {type === SOURCE_CARD ? <Link href={value}>{display}</Link> : value}
        </Typography>
      </Box>
    </Paper>
  );
}

IconCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  display: PropTypes.string
};

export default IconCard;
