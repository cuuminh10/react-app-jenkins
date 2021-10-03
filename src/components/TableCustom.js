import {
  useState, useEffect, Fragment
} from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { orderBy as _orderBy } from 'lodash';
import { alpha } from '@material-ui/core/styles';
import {
  Box, Chip, Checkbox, Tooltip, Toolbar, IconButton, Paper, Typography, Table, TableBody,
  TableCell, TableContainer, TableSortLabel, TableHead, TableRow, TablePagination, CircularProgress
} from '@material-ui/core';

import { Delete as DeleteIcon } from '@material-ui/icons';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import PrintIcon from '@material-ui/icons/Print';
import DownloadIcon from '@material-ui/icons/Download';
import { visuallyHidden } from '@material-ui/utils';
import { pink } from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';

import GMCService from 'src/services/gmc.service';
import DetailDialog from 'src/components/base/DetailDialog';
import DeleteConfirmDialog from 'src/components/base/DeleteConfirmDialog';

import resources from 'src/resources';
import moment from 'moment';

// import { getDifference } from 'src/helpers';

const EnhancedTableHead = ({
  headCells, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort
}) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        <TableCell align="center" padding="checkbox">
          <Checkbox
            color="primary"
            sx={{
              '&.MuiCheckbox-indeterminate, &.Mui-checked': {
                color: pink[400],
              },
            }}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : <></>}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  headCells: PropTypes.array,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = ({
  numSelected, title, setOpenDeleteConfirm, onAddNew
}) => (
  <Toolbar
    sx={{
      pl: { sm: 2 },
      pr: { xs: 1, sm: 1 },
      ...(numSelected > 0 && {
        bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
      }),
    }}
  >
    {numSelected > 0 ? (
      <>
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
        <Tooltip title="Delete">
          <IconButton onClick={() => setOpenDeleteConfirm(true)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </>

    ) : (
      <>
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h5"
          id="tableTitle"
          component="div"
        >
          Danh sách { title.toLowerCase() }
        </Typography>
        <Tooltip title="Add new">
          <IconButton onClick={onAddNew}>
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Search">
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Download">
          <IconButton>
            <DownloadIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Print">
          <IconButton>
            <PrintIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="View column">
          <IconButton>
            <ViewColumnIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </>
    )}
  </Toolbar>
);

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  setOpenDeleteConfirm: PropTypes.func,
  onAddNew: PropTypes.func
};

const TableCustom = ({
  mappingData
}) => {
  // const mounted = useRef();
  const [optionEnum, setOptionEnum] = useState(mappingData.optionEnum);
  const [dataTable, setTableData] = useState(mappingData.dataTable);
  const [loadingMain, setLoadingMain] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const fetchDataTable = async () => {
    try {
      setLoadingMain(true);
      const res = await GMCService.getDataByUrl(mappingData.mainTable);
      setLoadingMain(false);
      const { status, data } = res;
      if (status === 200) {
        mappingData.setDataTable(data);
        setTableData(mappingData.dataTable);
      }
    } catch (err) {
      setLoadingMain(false);
      console.log(err);
    }
  };

  const fetchDataLocal = async () => {
    mappingData.localSelects.forEach(async (item) => {
      mappingData.addOptionEnum({
        key: item.localName,
        value: resources[item.localName]
      });
    });
    setOptionEnum(mappingData.optionEnum);
  };

  const fetchDataForeign = async () => {
    try {
      mappingData.foreignSelects.forEach(async (item) => {
        const res = await GMCService.getDataByUrl(item.foreignName);
        mappingData.addOptionEnum({
          key: item.foreignName,
          value: res.data
        });
        setOptionEnum(mappingData.optionEnum);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // if (!mounted.current) {
    //   // mounted
    //   mounted.current = true;
    //   fetchDataForeign();
    //   fetchDataTable();
    //   console.log('mounted');
    // } else {
    // updated
    fetchDataForeign();
    fetchDataLocal();
    fetchDataTable();

    // }
  }, [mappingData.path]);

  const [isOpenModal, setOpenModal] = useState(false);
  const [isOpenDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('no');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const doClickRow = (rowData) => {
    setEdit(true);
    setOpenModal(true);
    mappingData.setCurrentDetail(rowData);
  };

  const doAddNew = () => {
    setEdit(false);
    setOpenModal(true);
    mappingData.setCurrentDetail(mappingData.emptyCurrentDetail);
  };

  const formatTableValue = (row, key) => {
    const target = mappingData.tableControls.find((item) => item.key === key);
    const value = row[key];
    if (target) {
      switch (target.typeControl.main) {
        case 'date':
          return value ? moment(value).format('DD/MM/YYYY') : '';
        case 'select':
          // case column type is select and using foreign key
          const items = optionEnum[target.foreignName || target.localName] || [];
          const columnTarget = items.find((item) => item.id === value);
          if (columnTarget) {
            if (target.typeControl.sub === 'chip') {
              return <Chip sx={{ minWidth: '100px' }} label={columnTarget.name} color={columnTarget.color} variant="outlined" />;
            }
            return columnTarget.name;
          }
          return '';
        case 'checkbox':
          return value ? 'Yes' : 'No';
        default:
          return value;
      }
    }
    return value;
  };

  const doChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const doChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const doRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const doSelectAll = (event) => {
    if (event.target.checked) {
      setSelected(dataTable);
      return;
    }
    setSelected([]);
  };

  const doSelectRow = (event, name) => {
    event.stopPropagation();
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const doSubmit = async (rowData) => {
    try {
      setOpenModal(false);
      // const difference = getDifference(mappingData.currentDetail, rowData);
      const difference = rowData;
      const requestData = { ...difference, id: rowData.id };
      setLoadingSave(true);
      if (isEdit) {
        const url = `${mappingData.mainTable}/${rowData.id}`;
        const res = await GMCService.putDataByUrl(url, requestData);
        const { status, data } = res;
        if (status === 200 || status === 201) {
          mappingData.editDataTable(data);
          setTableData(mappingData.dataTable);
        }
      } else {
        const res = await GMCService.postDataByUrl(mappingData.mainTable, requestData);
        const { status, data } = res;
        if (status === 200 || status === 201) {
          mappingData.addDataTable(data);
          setTableData(mappingData.dataTable);
        }
      }

      setLoadingSave(false);
    } catch (error) {
      console.log(error);
    }
  };

  const doSubmitDelete = async () => {
    try {
      const [rowData] = selected;
      const url = `${mappingData.mainTable}/${rowData.id}`;
      const res = await GMCService.deleteDataByUrl(url);
      const { status } = res;
      // const { status, data } = res;
      if (status === 200 || status === 201) {
        // mappingData.deleteDataTable(data);
        mappingData.deleteDataTable({ id: rowData.id });
        setSelected([]);
        setTableData(mappingData.dataTable);
      }
    } catch (error) {
      console.log(error);
    }
    setOpenDeleteConfirm(false);
  };

  return (
    <>
      <Helmet>
        <title>Tutorial | GMC</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          p: 2
        }}
      >
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            title={mappingData.navTitle}
            setOpenDeleteConfirm={setOpenDeleteConfirm}
            onAddNew={doAddNew}
          />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <EnhancedTableHead
                headCells={mappingData.headers}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={doSelectAll}
                onRequestSort={doRequestSort}
                rowCount={dataTable.length}
              />
              <TableBody>
                { !loadingMain && _orderBy(dataTable, orderBy, order)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const isItemSelected = isSelected(row);
                    return (
                      <TableRow
                        key={row.id}
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        selected={isItemSelected}
                        onClick={() => doClickRow(row)}
                      >
                        <TableCell align="center" padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            onClick={(event) => doSelectRow(event, row)}
                          />
                        </TableCell>
                        {mappingData.keys.map((key) => (
                          <TableCell key={key} align="center"> { formatTableValue(row, key) } </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          { !loadingMain && !dataTable.length && (
            <Typography
              sx={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 1
              }}
              color="inherit"
              variant="subtitle1"
              component="div"
            >No records found
            </Typography>
          ) }
          { loadingMain && (
            <Typography sx={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 1
            }}
            >
              <CircularProgress />
            </Typography>
          ) }

          <TablePagination
            rowsPerPageOptions={[50, 100, 200]}
            component="div"
            count={dataTable.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={doChangePage}
            onRowsPerPageChange={doChangeRowsPerPage}
          />
          {/* <DetailDialog
            title={`${isEdit ? 'Thông tin' : 'Tạo mới'} ${mappingData.navTitle.toLowerCase()}`}
            submit="Save"
            isEdit={isEdit}
            loading={loadingSave}
            isOpen={isOpenModal}
            doClose={() => { setOpenModal(false); }}
            onSubmit={doSubmit}
            optionEnum={optionEnum}
            mappingData={mappingData}
          />
          <DeleteConfirmDialog
            isOpen={isOpenDeleteConfirm}
            onClose={() => setOpenDeleteConfirm(false)}
            onSubmit={doSubmitDelete}
          /> */}
        </Paper>
      </Box>
    </>
  );
};

TableCustom.propTypes = {
  mappingData: PropTypes.object,
};

export default TableCustom;
