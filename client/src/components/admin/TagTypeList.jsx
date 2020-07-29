import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  hoverButtons: {
    marginTop: theme.spacing(1),
    color: 'gray',
    '&:hover': {
      color: 'white',
    },
  },
}));

function TagTypeList({
  allTagTypes,
  selectedTagTypeIndex,
  handleSelectTagTypeIndex,
  addMutation,
  updateMutation,
  deleteMutation,
}) {
  const classes = useStyles();
  const [addModalOpenState, setAddModalOpen] = useState(false);
  const [updateModalOpenState, setUpdateModalOpen] = useState(false);
  const [deleteModalOpenState, setDeleteModalOpen] = useState(false);

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
    const { id } = allTagTypes[selectedTagTypeIndex];
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
    const { id } = allTagTypes[selectedTagTypeIndex];
    deleteMutation({
      variables: { id },
      refetchQueries: ['GetAllTags'],
    }).then((result) => {
      if (result?.data?.deleteTagType?.success) {
        setDeleteModalOpen(false);
        handleSelectTagTypeIndex(0);
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
    <div className={classes.root} data-test="tag-table-list">
      <FormControl className={classes.formControl}>
        <InputLabel id="tag-type-list-label">Tag Type</InputLabel>
        <Select
          id="tag-type-list-select"
          labelId="tag-type-list-label"
          data-test="tag-type-list"
          value={selectedTagTypeIndex}
        >
          {allTagTypes.map((typeItem, index) => (
            <MenuItem
              data-test="tag-type-item"
              value={index}
              onClick={() => {
                handleSelectTagTypeIndex(index);
              }}
            >
              {typeItem.label}{' '}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <IconButton
        data-test="tag-type-item-edit"
        className={classes.hoverButtons}
        edge="end"
        aria-label="edit"
        onClick={() => {
          setUpdateModalOpen(true);
        }}
      >
        <EditIcon />
      </IconButton>
      <IconButton
        data-test="tag-type-item-delete"
        className={classes.hoverButtons}
        edge="end"
        aria-label="delete"
        onClick={() => {
          setDeleteModalOpen(true);
        }}
      >
        <DeleteIcon />
      </IconButton>
      <IconButton
        data-test="tag-type-item-add"
        className={classes.hoverButtons}
        edge="end"
        aria-label="add"
        onClick={() => {
          setAddModalOpen(true);
        }}
      >
        <AddIcon />
      </IconButton>
      <EditModal
        open={addModalOpenState}
        handleConfirm={handlAddConfirm}
        handleCancel={handleAddCancel}
        confirmLabel="Add"
        title="Add New Tag Type"
      />
      <EditModal
        open={updateModalOpenState}
        initialValue={allTagTypes[selectedTagTypeIndex]?.label}
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
        contentText={`Are you sure you want to delete ${allTagTypes[selectedTagTypeIndex]?.label}?`}
        confirmLabel="Delete"
      />
    </div>
  );
}

TagTypeList.defaultProps = {
  selectedTagTypeIndex: 0,
  mobile: false,
  allTagTypes: [],
};

TagTypeList.propTypes = {
  mobile: PropTypes.bool,
  allTagTypes: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleSelectTagTypeIndex: PropTypes.func.isRequired,
  selectedTagTypeIndex: PropTypes.number,
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
