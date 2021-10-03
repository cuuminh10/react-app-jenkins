import { useState } from 'react';
import PropTypes from 'prop-types';
import { orderBy as _orderBy } from 'lodash';
import {
  Box, Chip, Paper, Typography, Table, TableBody,
  TableCell, TableContainer, TableSortLabel, TableHead, TableRow, TablePagination, CircularProgress, Tooltip
} from '@material-ui/core';
import { visuallyHidden } from '@material-ui/utils';
import moment from 'moment';
import { numberWithCommas } from 'src/helpers';

// import { getDifference } from 'src/helpers';

const EnhancedTableHead = ({
  headCells, order, orderBy, onRequestSort
}) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
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
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string,
};

const TableBasic = ({
  loading, optionEnum, mappingData, dataTable
}) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(null);

  const getAlign = (item) => {
    const type = item.typeControl.main;
    if (type === 'number') {
      return 'right';
    }
    if (type === 'date' || type === 'dateTime') {
      return 'center';
    }
    return 'left';
  };

  const getControlAlign = (id) => {
    const control = mappingData.tableControls.find((item) => item.key === id);
    return getAlign(control);
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
            textAlign: getControlAlign(key)
          }}
          >
            { value }
          </Box>
        </Tooltip>
      ) : (
        <Box sx={{
          textAlign: getControlAlign(key)
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

  const summaryAmount = (item) => {
    const hasSummary = mappingData.summaries.some((col) => col === item.key);
    const summary = hasSummary ? dataTable.reduce((acc, cur) => acc + cur[item.key], 0) : '';
    if (typeof summary === 'number') {
      return numberWithCommas(summary);
    }
    return summary;
  };

  const summaryRender = (
    <TableRow className="table-row">
      <TableCell className="table-cell" sx={{ fontWeight: 700, textAlign: 'center' }} colSpan={mappingData.summaryColSpan}>Tổng tiền</TableCell>
      { mappingData.tableControls.map((item, index) => {
        if (index >= mappingData.summaryColSpan) {
          return <TableCell className="table-cell" key={item.key} sx={{ color: 'info.main' }} align={getAlign(item)}>{ summaryAmount(item) }</TableCell>;
        }
        return null;
      }) }
    </TableRow>
  );
  return (
    <Box sx={{ border: '1px solid rgba(224, 224, 224, 1)', borderRadius: '5px' }} className="c-table-basic">
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size="medium"
        >
          <EnhancedTableHead
            headCells={mappingData.getHeaders(false)}
            order={order}
            orderBy={orderBy}
            onRequestSort={doRequestSort}
          />
          <TableBody>
            { !loading && _orderBy(dataTable, orderBy, order)
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow
                  key={index}
                  hover
                  role="checkbox"
                  tabIndex={-1}
                >
                  {mappingData.getHeaders(false).map(({ id }) => (
                    <TableCell className="table-cell" key={id}>
                      { formatTableValue(row, id)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            { !loading && !!mappingData.summaries.length && !!dataTable.length && summaryRender}
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
  );
};

TableBasic.propTypes = {
  loading: PropTypes.bool,
  optionEnum: PropTypes.object,
  mappingData: PropTypes.object,
  dataTable: PropTypes.array,
};

export default TableBasic;
