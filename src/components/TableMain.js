import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { orderBy as _orderBy } from 'lodash';
import { alpha } from '@material-ui/core/styles';
import {
  Box, Chip, Checkbox, Tooltip, Toolbar, IconButton, Paper, Typography, Table, TableBody,
  TableCell, TableContainer, TableSortLabel, TableHead, TableRow, TablePagination, CircularProgress,
  FormControlLabel, Switch, Select, MenuItem, TextField, FormControl, InputLabel, Grid, InputBase, Stack
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import { visuallyHidden } from '@material-ui/utils';
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment';
import resources from 'src/resources';
import { boolToNum, getSlot, numberWithCommas } from 'src/helpers';
import BaseChart from 'src/components/BaseChart';
import BasePagination from 'src/components/BasePagination';
import PopoverColumns from 'src/components/PopoverColumns';

const EnhancedTableHead = ({
  headCells, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort
}) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell align="center" padding="checkbox">
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
        </TableCell> */}
        <TableCell className="table-cell" align="center">STT</TableCell>
        {headCells.map((headCell) => (
          <TableCell
            className="table-cell"
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
  orderBy: PropTypes.string,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = ({
  onSearch, toolForm, icons, filters, numSelected, setOpenDeleteConfirm, chartOptions, showColumns, onChangeColumnItem
}) => {
  const [keyword, setKeyword] = useState('');
  const onSubmitSearch = (event) => {
    event.preventDefault();
    onSearch(keyword);
  };
  const contentToolBar = () => {
    if (numSelected > 0) {
      return (
        <>
          <Typography
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
      );
    }
    return (
      <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Grid item xs={12} sm={6} sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <Box
            component="form"
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: { xs: '100%', md: '300px' },
              backgroundColor: 'background.default',
              border: '1px solid rgba(224, 224, 224, 1)',
              borderRadius: '4px'
            }}
            onSubmit={onSubmitSearch}
          >
            <InputBase
              sx={{ ml: 1, flex: 1, '& .css-7dqvty-MuiInputBase-input': { p: 0 } }}
              size="small"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="Type keyword..."
            />
            <IconButton type="submit" sx={{ p: '10px' }}>
              <SearchIcon />
            </IconButton>
          </Box>
          {/* { searchForm } */}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            justifyContent: { xs: 'space-between', md: 'flex-end' },
            mt: { xs: 2, md: 0 },
          }}
          >
            { !!chartOptions && (<BaseChart type="donut" chartOptions={chartOptions} />) }
            <Box sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column',
                md: 'row'
              },
              alignItems: 'center',
              position: 'relative',
              zIndex: 1,
              ml: { md: 3 },
              flexWrap: 'wrap'
            }}
            >
              <Box>
                { toolForm }
              </Box>
              <Box sx={{
                display: 'flex', flex: '1 1', justifyContent: 'flex-end'
              }}
              >
                { icons }
                <PopoverColumns showColumns={showColumns} onChangeColumnItem={onChangeColumnItem} />
                { filters }
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    );
  };
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        minHeight: 0,
        justifyContent: 'space-between',
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      { contentToolBar() }
    </Box>
  );
};

EnhancedTableToolbar.propTypes = {
  onSearch: PropTypes.func,
  toolForm: PropTypes.node,
  icons: PropTypes.node,
  filters: PropTypes.node,
  numSelected: PropTypes.number.isRequired,
  setOpenDeleteConfirm: PropTypes.func,
  chartOptions: PropTypes.object,
  showColumns: PropTypes.array,
  onChangeColumnItem: PropTypes.func
};

const TableMain = ({
  children, optionEnum, loading, mappingData, dataTable, selected = [], setSelected, isModeApprove, onSearch,
  onClickRow, onOpenDeleteConfirm, defaultOrderBy = null, chartOptions, page, onChangePage, rowsPerPage, onChangeRowsPerPage
}) => {
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState(defaultOrderBy);
  const [showColumns, setShowColumns] = useState(mappingData.getHeaders(isModeApprove).map((item) => ({ ...item, isShow: true })));
  useEffect(() => {
    setShowColumns(mappingData.getHeaders(isModeApprove).map((item) => ({ ...item, isShow: true })));
  }, [isModeApprove]);
  const isSelected = (name) => selected.indexOf(name) !== -1;
  const searchForm = getSlot('searchForm', children);
  const toolForm = getSlot('toolForm', children);
  const filters = getSlot('filters', children);
  const icons = getSlot('icons', children);
  const columns = showColumns.filter((item) => item.isShow);
  const totalPage = dataTable.length ? Math.ceil(dataTable[0].totalRows / rowsPerPage) : 0;

  const getAlign = (id) => {
    const control = mappingData.tableControls.find((item) => item.key === id);
    const type = control ? control.typeControl.main : '';
    if (type === 'number') {
      return 'right';
    }
    if (type === 'date' || type === 'dateTime') {
      return 'center';
    }
    return 'left';
  };
  const formatTableValue = (row, key) => {
    const target = mappingData.tableControls.find((item) => item.key === key);
    let value = row[key];
    if (target) {
      const { main, sub } = target.typeControl;
      switch (main) {
        case 'number':
          value = numberWithCommas(value); break;
        case 'date':
          value = value ? moment(value).format('DD/MM/YYYY') : ''; break;
        case 'dateTime':
          value = value ? moment(value).format('DD/MM/YYYY HH:mm') : ''; break;
        case 'select':
          // case column type is select and using foreign key
          const items = optionEnum[target.foreignName || target.localName] || [];
          const columnTarget = items.find((item) => item.id === value);
          if (columnTarget) {
            value = sub === 'chip' ? <Chip sx={{ minWidth: '100px' }} label={columnTarget.name} color={columnTarget.color} variant="outlined" /> : columnTarget.name;
          }
          break;
        case 'checkbox':
          value = value ? 'Yes' : 'No'; break;
        default:
      }
      const isShowTooltip = (main === 'text' || (main === 'select' && sub !== 'chip')) && value;
      return isShowTooltip ? (
        <Tooltip title={value} placement="top">
          <Box sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            textAlign: getAlign(key)
          }}
          >
            { value }
          </Box>
        </Tooltip>
      ) : (
        <Box sx={{
          textAlign: getAlign(key)
        }}
        >
          { value }
        </Box>
      );
    }
    return value;
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

  const doChangeColumnItem = (event, id) => {
    const cols = [...showColumns];
    const index = showColumns.findIndex((item) => item.id === id);
    cols[index].isShow = event.target.checked;
    setShowColumns(cols);
  };

  const formatSearch = (value) => {
    onSearch(value, columns.filter((item) => item.typeControl.main === 'text').map((item) => item.id));
  };

  return (
    <>
      <Helmet>
        <title>Expert ERP | GMC</title>
      </Helmet>
      <Box
        className="c-table-main"
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%'
        }}
      >
        <Paper sx={{ p: 2 }}>
          <EnhancedTableToolbar
            onSearch={formatSearch}
            searchForm={searchForm}
            toolForm={toolForm}
            icons={icons}
            filters={filters}
            showColumns={showColumns}
            onChangeColumnItem={doChangeColumnItem}
            numSelected={selected.length}
            setOpenDeleteConfirm={onOpenDeleteConfirm}
            chartOptions={chartOptions}
          />
          <Box sx={{ mt: 2, border: '1px solid rgba(224, 224, 224, 1)', borderRadius: '5px' }}>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size="medium"
              >
                <EnhancedTableHead
                  headCells={columns}
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={doSelectAll}
                  onRequestSort={doRequestSort}
                  rowCount={dataTable.length}
                />
                <TableBody>
                  { !loading && _orderBy(dataTable, orderBy, order)
                    .slice(0, rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row);
                      return (
                        <TableRow
                          key={`${row.id}-${index}`}
                          hover
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          selected={isItemSelected}
                          onClick={() => onClickRow(row)}
                        >
                          {/* <TableCell align="center" padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              onClick={(event) => doSelectRow(event, row)}
                            />
                          </TableCell> */}
                          <TableCell className="table-cell" align="center">{((page - 1) * rowsPerPage) + index + 1}</TableCell>
                          { columns.map(({ id }) => (
                            <TableCell className="table-cell" key={`${id}-${index}`}>
                              { formatTableValue(row, id) }
                            </TableCell>
                          )) }
                          {/* {mappingData.getHeaders(isModeApprove).map(({ id }) => (
                            <TableCell className="table-cell" key={`${id}-${index}`}>
                              { formatTableValue(row, id) }
                            </TableCell>
                          ))} */}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            { !loading && !dataTable.length && (
            <Typography
              sx={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', py: 1
              }}
              color="inherit"
              variant="subtitle1"
              component="div"
            >No records found
            </Typography>
            ) }
            { loading && (
            <Typography sx={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', py: 1
            }}
            >
              <CircularProgress />
            </Typography>
            ) }
          </Box>
          { !loading && (
          <BasePagination
            className="u-mt-15"
            rowsPerPage={rowsPerPage}
            defaultPage={1}
            isShowPage={totalPage > 1}
            page={page}
            totalPage={totalPage}
            color="primary"
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
          />
          ) }
        </Paper>
      </Box>
    </>
  );
};

TableMain.propTypes = {
  defaultOrderBy: PropTypes.string,
  optionEnum: PropTypes.object,
  loading: PropTypes.bool,
  mappingData: PropTypes.object,
  dataTable: PropTypes.array,
  selected: PropTypes.array,
  isModeApprove: PropTypes.bool,
  setSelected: PropTypes.func,
  onClickRow: PropTypes.func,
  onOpenDeleteConfirm: PropTypes.func,
  children: PropTypes.node,
  chartOptions: PropTypes.object,
  page: PropTypes.number,
  onChangePage: PropTypes.func,
  rowsPerPage: PropTypes.number,
  onChangeRowsPerPage: PropTypes.func,
  onSearch: PropTypes.func
};

export default TableMain;
