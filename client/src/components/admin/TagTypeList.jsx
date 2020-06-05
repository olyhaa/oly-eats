import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import EditModal from 'components/admin/EditModal';
import compose from 'lodash.flowright';
import { graphql } from '@apollo/react-hoc';
import {
  getAddTagTypeMutation,
  getUpdateTagTypeMutation,
  getDeleteTagTypeMutation,
} from 'utils/FetchData';
import DeleteModal from 'components/DeleteModal';
import { ListItemSecondaryAction } from '@material-ui/core';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  listItem: {
    '&:hover $hoverButtons': {
      display: 'inline',
    },
  },
  hoverButtons: {
    display: 'none',
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
  const [updateModalOpenState, setUpdateModalOpen] = useState(false);
  const [deleteModalOpenState, setDeleteModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [deleteIndex, setDeleteIndex] = useState(-1);

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

  const handleUpdateConfirm = (label) => {
    const id = types[editIndex].id;
    updateMutation({
      variables: { id, label },
      refetchQueries: ['GetAllTags'],
    }).then((result) => {
      if (result?.data?.updateTagType?.success) {
        setUpdateModalOpen(false);
      }
    });
  };

  const handleDeleteConfirm = () => {
    const id = types[deleteIndex].id;
    deleteMutation({
      variables: { id },
      refetchQueries: ['GetAllTags'],
    }).then((result) => {
      if (result?.data?.deleteTagType?.success) {
        setDeleteModalOpen(false);
      }
    });
  };

  const handleAddCancel = () => {
    setAddModalOpen(false);
  };

  const handleUpdateCancel = () => {
    setUpdateModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
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
            classes={{ container: classes.listItem }}
          >
            <ListItemText primary={typeItem.label} />
            <ListItemSecondaryAction>
              <IconButton
                className={classes.hoverButtons}
                edge="end"
                aria-label="edit"
                onClick={(event) => {
                  setEditIndex(index);
                  setUpdateModalOpen(true);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                className={classes.hoverButtons}
                edge="end"
                aria-label="delete"
                onClick={(event) => {
                  setDeleteIndex(index);
                  setDeleteModalOpen(true);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
        <Divider />
        <ListItem
          button
          onClick={(event) => {
            setEditIndex(-1);
            setAddModalOpen(true);
          }}
        >
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Add New" />
        </ListItem>
      </List>
      <EditModal
        open={addModalOpenState}
        handleConfirm={handlAddConfirm}
        handleCancel={handleAddCancel}
        confirmLabel="Add"
        title="Add New Tag Type"
      />
      <EditModal
        open={updateModalOpenState}
        initialValue={types[editIndex]?.label}
        handleConfirm={handleUpdateConfirm}
        handleCancel={handleUpdateCancel}
        confirmLabel="Update"
        title="Update Tag Type"
      />
      <DeleteModal
        open={deleteModalOpenState}
        handleConfirm={handleDeleteConfirm}
        handleCancel={handleDeleteCancel}
        title="Delete Tag Type"
        contentText={`Are you sure you want to delete ${types[deleteIndex]?.label}?`}
        confirmLabel="Delete"
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
