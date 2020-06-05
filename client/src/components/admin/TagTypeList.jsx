import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';
import AddTagTypeModal from 'components/admin/AddTagTypeModal';
import compose from 'lodash.flowright';
import { graphql } from '@apollo/react-hoc';
import {
  getAddTagTypeMutation,
  getUpdateTagTypeMutation,
  getDeleteTagTypeMutation,
} from 'utils/FetchData';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function TagTypeList({
  types,
  selectedIndex,
  handleSelectTagTypeIndex,
  addMutation,
  updateMutation,
  deleteMutation,
}) {
  const classes = useStyles();
  const [addModalOpenState, setAddModalOpen] = useState(false);

  const handlAddConfirm = (label) => {
    addMutation({
      variables: { label },
      refetchQueries: ['GetAllTags'],
    }).then((result) => {
      if (result?.data?.addTagType?.success) {
        setAddModalOpen(false);
      }
    });
  };

  const handleAddCancel = () => {
    setAddModalOpen(false);
  };

  return (
    <div className={classes.root}>
      <List component="nav">
        {types.map((typeItem, index) => (
          <ListItem
            button
            selected={selectedIndex === index}
            onClick={(event) => {
              handleSelectTagTypeIndex(index);
            }}
          >
            <ListItemText primary={typeItem.label} />
          </ListItem>
        ))}
        <Divider />
        <ListItem button onClick={(event) => setAddModalOpen(true)}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Add New" />
        </ListItem>
      </List>
      <AddTagTypeModal
        open={addModalOpenState}
        handleAdd={handlAddConfirm}
        handleCancel={handleAddCancel}
      />
    </div>
  );
}

TagTypeList.defaultProps = {
  selectedIndex: 0,
};

TagTypeList.propTypes = {
  types: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleSelectTagType: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number,
  deleteMutation: PropTypes.func.isRequired,
  addMutation: PropTypes.func.isRequired,
  updateMutation: PropTypes.func.isRequired,
};

export default compose(
  graphql(getAddTagTypeMutation(), {
    name: 'addMutation',
  }),
  graphql(getUpdateTagTypeMutation(), {
    name: 'updateMutation',
  }),
  graphql(getDeleteTagTypeMutation(), {
    name: 'deleteMutation',
  })
)(TagTypeList);
