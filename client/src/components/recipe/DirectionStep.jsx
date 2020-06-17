import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function DirectionStep({ id, text }) {
  return (
    <ListItem key={id} role={undefined} dense data-test="direction-list-item">
      <ListItemText id={id} primary={text} />
    </ListItem>
  );
}

DirectionStep.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

export default DirectionStep;
