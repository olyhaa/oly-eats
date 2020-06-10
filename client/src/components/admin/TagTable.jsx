import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Search from '@material-ui/icons/Search';

const tableIcons = {
  Add: forwardRef((props, ref) => (
    <AddCircleIcon {...props} ref={ref} color="primary" fontSize="large" />
  )),
  Check: forwardRef((props, ref) => (
    <Check {...props} ref={ref} color="primary" />
  )),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteIcon {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
};

function TagTable({ title, tags, handleAdd, handleUpdate, handleDelete }) {
  const columns = [{ title: 'Name', field: 'label' }];

  return (
    <MaterialTable
      title={title}
      icons={tableIcons}
      columns={columns}
      data={tags}
      options={{
        pageSize: 10,
        actionsColumnIndex: -1,
      }}
      editable={{
        onRowAdd: (newData) => {
          return handleAdd(newData);
        },
        onRowUpdate: (newData) => {
          return handleUpdate(newData);
        },
        onRowDelete: (oldData) => {
          return handleDelete(oldData);
        },
      }}
    />
  );
}

TagTable.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
  handleAdd: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default TagTable;
