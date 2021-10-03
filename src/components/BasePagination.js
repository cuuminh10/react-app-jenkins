import PropTypes from 'prop-types';
import {
  Pagination, FormControlLabel, Select, MenuItem
} from '@material-ui/core';

const BasePagination = ({
  page, defaultPage = 1, totalPage, onChangePage, rowsPerPage = 10, onChangeRowsPerPage, className
}) => (
  <div className={`c-base-pagination ${className}`}>
    {
      totalPage > 1 && (<Pagination page={page} defaultPage={defaultPage} count={totalPage} color="primary" onChange={onChangePage} />)
    }
    <FormControlLabel
      className="rows-per-page"
      label="Số hàng/ trang: "
      labelPlacement="start"
      control={(
        <Select
          className="u-ml-10"
          size="small"
          value={rowsPerPage}
          onChange={onChangeRowsPerPage}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      )}
    />
  </div>
);

BasePagination.propTypes = {
  totalPage: PropTypes.number,
  page: PropTypes.number,
  defaultPage: PropTypes.number,
  onChangePage: PropTypes.func,
  onChangeRowsPerPage: PropTypes.func,
  rowsPerPage: PropTypes.number,
  className: PropTypes.string
};

export default BasePagination;
