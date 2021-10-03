import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Box, Tooltip, MenuItem, Grid, Popover, Typography, Stack, TextField, Divider, Button, ClickAwayListener, IconButton
} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import CloseIcon from '@material-ui/icons/Close';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import MobileDateRangePicker from '@material-ui/lab/MobileDateRangePicker';
import vi from 'date-fns/locale/vi';
import resources from 'src/resources';

const PopoverFilter = ({
  children, filtersForm, updateFilterForm, isModeApprove, onSubmit, onClear
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const closePopover = () => {
    setAnchorEl(null);
  };

  const doChangeDateRange = (newValue) => {
    const dateRange = Array.isArray(newValue) ? newValue : [newValue, newValue];
    updateFilterForm({ dateRange });
  };

  const doChangeApproveStatus = (event) => {
    const approveStatus = event.target.value;
    updateFilterForm({ approveStatus });
  };

  const doSubmit = () => {
    setAnchorEl(null);
    onSubmit();
  };
  return (
    <>
      <Tooltip title="Filter list">
        <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      <Popover
        id="c-popover-filter"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <ClickAwayListener onClickAway={closePopover}>
          <Box className="u-relative">
            <IconButton
              className="u-absolute u-right-0"
              aria-label="close"
              onClick={closePopover}
            >
              <CloseIcon />
            </IconButton>
            <Box sx={{ p: 2, width: '400px', maxWidth: '100%' }}>
              <Typography variant="h5">
                Filters
              </Typography>
              <Box sx={{ py: 1 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={vi}>
                  <MobileDateRangePicker
                    clearable
                    calendars={2}
                    allowSameDateSelection
                    startText="Ngày bắt đầu"
                    endText="Ngày kết thúc"
                    value={filtersForm.dateRange}
                    onChange={doChangeDateRange}
                    renderInput={(startProps, endProps) => (
                      <Grid container spacing={2}>
                        {/* <Box sx={{ mr: 1, minWidth: { xs: 68, sm: 'auto' } }}>Từ</Box> */}
                        <Grid item xs={6} md={6}>
                          <TextField variant="standard" sx={{ width: '100%' }} {...startProps} size="small" />
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <TextField variant="standard" sx={{ width: '100%' }} {...endProps} size="small" />
                        </Grid>
                      </Grid>
                    )}
                  >
                    DateRangePicker
                  </MobileDateRangePicker>
                </LocalizationProvider>
                <Box sx={{ mt: 2 }}>
                  <Grid container spacing={2}>
                    { isModeApprove && (
                    <Grid item xs={12}>
                      <TextField
                        select
                        className="u-wp-100"
                        variant="standard"
                        label="Tình trạng"
                        value={filtersForm.approveStatus}
                        onChange={doChangeApproveStatus}
                        SelectProps={{
                          MenuProps: { disablePortal: true }
                        }}
                      >
                        { resources.approveStatus.map((item) => (
                          <MenuItem key={item.id} value={item.id}>{ item.name }</MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    ) }
                    { children }
                  </Grid>
                </Box>
              </Box>
            </Box>
            <Box sx={{ px: 2 }}>
              <Divider />
            </Box>
            <Stack direction="row" spacing={1} justifyContent="flex-end" p={1}>
              <Button color="error" variant="outlined" onClick={onClear}>
                Clear
              </Button>
              <Button variant="outlined" onClick={doSubmit} autoFocus>
                Save
              </Button>
            </Stack>
          </Box>
        </ClickAwayListener>
      </Popover>
    </>
  );
};

PopoverFilter.propTypes = {
  filtersForm: PropTypes.object,
  updateFilterForm: PropTypes.func,
  onSubmit: PropTypes.func,
  onClear: PropTypes.func,
  isModeApprove: PropTypes.bool,
  children: PropTypes.node
};

export default PopoverFilter;
