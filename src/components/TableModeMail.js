import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import TableMain from 'src/components/TableMain';
import MailDialog from 'src/components/base/MailDialog';
import moment from 'moment';
import gmcService from 'src/services/gmc.service';
import PopoverFilter from 'src/components/PopoverFilter';
import {
  Grid, TextField, MenuItem
} from '@material-ui/core';
import resources from 'src/resources';

const TableModeMail = ({ mappingData }) => {
  const mounted = useRef();
  const [isEdit, setEdit] = useState(false);
  const [isOpenModal, setOpenModal] = useState(false);
  const [dataTable, setDataTable] = useState(mappingData.dataTable);
  const [loadingMain, setLoadingMain] = useState(false);
  const [loadingTableTab, setLoadingTableTab] = useState(false);
  const [optionEnum, setOptionEnum] = useState(mappingData.optionEnum);
  const [currentDetail, setCurrentDetail] = useState(mappingData.currentDetail);

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filtersForm, setFiltersForm] = useState({
    dateRange: [null, null],
    mailType: 'EmployeeOffWork'
  });

  const filterDataTable = (value = {}, type = filtersForm.mailType) => {
    const [fromDate, toDate] = filtersForm.dateRange;
    const { pageNo } = value;
    if (!pageNo) {
      setPage(1);
      Object.assign(value, { pageNo: 1 });
    }
    const opts = {
      params: {
        objectType: type,
        pageNo: page,
        numberRows: rowsPerPage,
        fromDate: moment(fromDate).toISOString(),
        toDate: moment(toDate).toISOString(),
        ...value
      }
    };
    // setLoadingMain(true);
    gmcService.getDataByUrlCb(`${mappingData.mainTable}`, opts, (data) => {
      // setLoadingMain(false);
      mappingData.setDataTable(data);
      setDataTable(data);
    });
  };

  const updateFilterForm = (obj = {}) => {
    const filters = { ...filtersForm, ...obj };
    setFiltersForm(filters);
  };

  useEffect(() => {
    if (!mounted.current) {
      // mounted
      mounted.current = true;
      mappingData.fetchDataLocal();
      mappingData.fetchDataForeign((data) => {
        setOptionEnum(data.optionEnum);
      });
      filterDataTable();
    } else {
      // TODO
    }
  });

  const doSearch = (keyword, columns) => {
    const data = mappingData.dataTable.filter((item) => {
      const contains = [];
      columns.forEach((column, index) => {
        const newStr = `${item[column]}`.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          .replace(/đ/g, 'd')
          .replace(/Đ/g, 'D')
          .toLocaleUpperCase();
        const newKeyword = keyword.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          .replace(/đ/g, 'd')
          .replace(/Đ/g, 'D')
          .toLocaleUpperCase();
        if (`${item[column]}`.toUpperCase().includes(keyword.toUpperCase()) || newStr.includes(newKeyword)) {
          contains.push(column);
        }
      });
      return !!contains.length;
    });
    setDataTable(data);
  };

  const doClickRow = (rowData) => {
    gmcService.getDataByUrlCb(`${mappingData.mainDetail}/${rowData.objectId}/${rowData.docType}`, {}, (data) => {
      const { docType, toUser, ccUser } = rowData;
      const current = {
        ...data[0],
        employeeFullName: rowData.employeeName || rowData.employeeFullName,
        docType,
        toUser,
        ccUser
      };
      mappingData.setCurrentDetail(current);
      setCurrentDetail(mappingData.currentDetail);
      setEdit(true);
      setOpenModal(true);
    });
  };

  const doChangePage = (event, newPage) => {
    setPage(newPage);
    filterDataTable({ pageNo: newPage });
  };

  const doChangeRowsPerPage = (event) => {
    const rows = parseInt(event.target.value, 10);
    setRowsPerPage(rows);
    filterDataTable({ numberRows: rows });
  };

  const doChangeMailType = (event) => {
    const type = event.target.value;
    updateFilterForm({ mailType: type });
  };

  const doSubmitFilters = () => {
    filterDataTable();
  };

  const doClearFilters = () => {
    updateFilterForm(
      {
        dateRange: [null, null],
        mailType: 'EmployeeOffWork'
      }
    );
  };

  return (
    <>
      <TableMain
        optionEnum={optionEnum}
        loading={loadingMain}
        dataTable={dataTable}
        isModeApprove={false}
        mappingData={mappingData}
        onClickRow={doClickRow}
        page={page}
        onChangePage={doChangePage}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={doChangeRowsPerPage}
        onSearch={doSearch}
      >
        <PopoverFilter
          key="filters"
          isModeApprove={false}
          filtersForm={filtersForm}
          updateFilterForm={updateFilterForm}
          onSubmit={doSubmitFilters}
          onClear={doClearFilters}
        >
          <Grid item xs={12}>
            <TextField
              select
              className="u-wp-100"
              variant="standard"
              label="Loại phiếu"
              value={filtersForm.mailType}
              onChange={doChangeMailType}
              SelectProps={{
                MenuProps: { disablePortal: true }
              }}
            >
              { resources.mailTypes.map((item) => (
                <MenuItem key={item.id} value={item.id}>{ item.name }</MenuItem>
              ))}
            </TextField>
          </Grid>
        </PopoverFilter>
      </TableMain>
      <MailDialog
        isEdit={isEdit}
        currentDetail={currentDetail}
        optionEnum={optionEnum}
        loading={loadingTableTab}
        isOpen={isOpenModal}
        mappingData={mappingData}
        onClose={() => { setOpenModal(false); }}
      />
    </>
  );
};

TableModeMail.propTypes = {
  mappingData: PropTypes.object
};

export default TableModeMail;
