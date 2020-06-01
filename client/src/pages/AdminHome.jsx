import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import { getTagsListQuery } from 'utils/FetchData';
import Header from '../components/Header';

const useStyles = makeStyles((theme) => ({}));

function Home() {
  const classes = useStyles();
  const {
    data: allTagsData,
    loading: allTagsLoading,
    error: allTagsError,
  } = useQuery(getTagsListQuery());

  return (
    <>
      <Header title="OlyEats: Admin" />
    </>
  );
}

export default Home;
