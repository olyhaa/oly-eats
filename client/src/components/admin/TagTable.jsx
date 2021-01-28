import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable, {
  MTableToolbar,
  MTableBodyRow,
  MTableEditRow,
} from 'material-table';
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
import TagTypeList from 'components/admin/TagTypeList';

const tableIcons = {
  Add: forwardRef((props, ref) => (
    <AddCircleIcon
      data-test="add-new-row"
      {...props}
      ref={ref}
      color="primary"
      fontSize="large"
    />
  )),
  Check: forwardRef((props, ref) => (
    <Check data-test="save-row" {...props} ref={ref} color="primary" />
  )),
  Clear: forwardRef((props, ref) => (
    <Clear data-test="clear-row" {...props} ref={ref} />
  )),
  Delete: forwardRef((props, ref) => (
    <DeleteIcon data-test="delete-row" {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => (
    <Edit data-test="edit-row" {...props} ref={ref} />
  )),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => (
    <Clear data-test="clear-search" {...props} ref={ref} />
  )),
  Search: forwardRef((props, ref) => (
    <Search data-test="search-table" {...props} ref={ref} />
  )),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
};

const useStyles = makeStyles((theme) => ({
  tableHeader: {},
  menuButton: {
    margin: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

function TagTable({
  title,
  allTagTypes,
  tags,
  handleAdd,
  handleUpdate,
  handleDelete,
  selectedTagTypeIndex,
  handleSelectTagTypeIndex,
}) {
  const classes = useStyles();
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
      components={{
        Toolbar: (props) => (
          <div data-test="tag-table-toolbar" className={classes.tableHeader}>
            {allTagTypes && (
              <TagTypeList
                allTagTypes={allTagTypes}
                selectedTagTypeIndex={selectedTagTypeIndex}
                handleSelectTagTypeIndex={handleSelectTagTypeIndex}
              />
            )}
            <MTableToolbar {...props} />
          </div>
        ),
        /* eslint-disable react/prop-types */
        Row: (props) => (
          <MTableBodyRow
            /* eslint-disable-next-line react/destructuring-assignment */
            data-test={`tag-table-row-${props.data.id}`}
            {...props}
          />
        ),
        EditRow: (props) => (
          <MTableEditRow data-test="tag-table-edit-row" {...props} />
        ),
        /* eslint-enable */
      }}
    />
  );
}

TagTable.defaultProps = {
  selectedTagTypeIndex: 0,
};

TagTable.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  allTagTypes: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleSelectTagTypeIndex: PropTypes.func.isRequired,
  selectedTagTypeIndex: PropTypes.number,
  title: PropTypes.string.isRequired,
  handleAdd: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default TagTable;
