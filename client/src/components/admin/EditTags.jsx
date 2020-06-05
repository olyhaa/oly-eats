import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import {
  getTagsListQuery,
  getAddTagMutation,
  getUpdateTagMutation,
  getDeleteTagMutation,
} from 'utils/FetchData';
import TagTable from 'components/admin/TagTable';
import TagTypeList from 'components/admin/TagTypeList';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import compose from 'lodash.flowright';
import { graphql } from '@apollo/react-hoc';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  loadingContainer: {
    display: 'flex',
    margin: theme.spacing(3),
  },
  loading: {
    margin: 'auto',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function EditTags({ addMutation, updateMutation, deleteMutation }) {
  const classes = useStyles();
  const { data: tagTypeData, loading, error } = useQuery(getTagsListQuery());
  const [selectedTagTypeIndex, setSelectedTagTypeIndex] = useState(0);

  const handleTagAdd = (newData) => {
    return addMutation({
      variables: {
        typeid: tagTypeData.allTagTypes[selectedTagTypeIndex].id,
        label: newData.label,
      },
      refetchQueries: ['GetAllTags'],
    });
  };

  const handleTagUpdate = (newData) => {
    return updateMutation({
      variables: { id: newData.id, label: newData.label },
      refetchQueries: ['GetAllTags'],
    });
  };

  const handleTagDelete = (data) => {
    return deleteMutation({
      variables: { id: data.id },
      refetchQueries: ['GetAllTags'],
    });
  };

  return (
    <>
      {loading && (
        <div className={classes.loadingContainer}>
          <CircularProgress className={classes.loading} />
        </div>
      )}
      {error && <span>Error!</span>}
      {!loading && (
        <div className={classes.root}>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <Toolbar />
            <div className={classes.drawerContainer}>
              <TagTypeList
                types={tagTypeData.allTagTypes}
                selectedIndex={selectedTagTypeIndex}
                handleSelectTagTypeIndex={setSelectedTagTypeIndex}
              />
            </div>
          </Drawer>
          <main className={classes.content}>
            <TagTable
              title={tagTypeData.allTagTypes[selectedTagTypeIndex].label}
              tags={tagTypeData.allTagTypes[selectedTagTypeIndex].tags}
              handleAdd={handleTagAdd}
              handleUpdate={handleTagUpdate}
              handleDelete={handleTagDelete}
            />
          </main>
        </div>
      )}
    </>
  );
}

EditTags.propTypes = {
  deleteMutation: PropTypes.func.isRequired,
  addMutation: PropTypes.func.isRequired,
  updateMutation: PropTypes.func.isRequired,
};

export default compose(
  graphql(getAddTagMutation(), {
    name: 'addMutation',
  }),
  graphql(getUpdateTagMutation(), {
    name: 'updateMutation',
  }),
  graphql(getDeleteTagMutation(), {
    name: 'deleteMutation',
  })
)(EditTags);
