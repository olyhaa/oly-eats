import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { DirectionStepPropType } from '../../types/DirectionsPropTypes';

function DirectionStep({ id, text }) {
  return (
    <ListItem key={id} role={undefined} dense>
      <ListItemText id={id} primary={text} />
    </ListItem>
  );
}

DirectionStep.propTypes = {
  ...DirectionStepPropType
};

export default DirectionStep;
