import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery, gql as graphql } from '@apollo/client';
import {
  getTagsListQuery,
  getAddTagMutation,
  getUpdateTagMutation,
  getDeleteTagMutation,
} from 'utils/FetchData';
import TagTable from 'components/admin/TagTable';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import compose from 'lodash.flowright';
import { Redirect } from 'react-router-dom';
import { ERROR_PAGE } from 'utils/PageConstants';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(5),
    },
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
    padding: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3),
    },
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

  const handleClick = (data) => {
    setSelectedTagTypeIndex(data);
  };

  if (error) {
    return <Redirect to={ERROR_PAGE} />;
  }

  return (
    <>
      {loading && (
        <div className={classes.loadingContainer}>
          <CircularProgress className={classes.loading} />
        </div>
      )}
      {!loading && (
        <Paper className={classes.root}>
          <main className={classes.content}>
            <TagTable
              title={tagTypeData.allTagTypes[selectedTagTypeIndex].label}
              tags={tagTypeData.allTagTypes[selectedTagTypeIndex].tags}
              allTagTypes={tagTypeData.allTagTypes}
              selectedTagTypeIndex={selectedTagTypeIndex}
              handleSelectTagTypeIndex={handleClick}
              handleAdd={handleTagAdd}
              handleUpdate={handleTagUpdate}
              handleDelete={handleTagDelete}
            />
          </main>
        </Paper>
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
