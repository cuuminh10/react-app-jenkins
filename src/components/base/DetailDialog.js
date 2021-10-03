import {
  useState, useEffect, useRef, Fragment
} from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Grid, Box, Button, TextField, FormControl, FormControlLabel, Select, InputLabel, MenuItem, Checkbox, Dialog,
  DialogTitle, DialogContent, DialogActions, IconButton, Stack, Tabs, Tab, Typography
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';
import DateTimePicker from '@material-ui/lab/DateTimePicker';
import SwipeableViews from 'react-swipeable-views';
import TabPanel from 'src/components/TabPanel';
import TableBasic from 'src/components/TableBasic';
import NumberFormat from 'react-number-format';
import BoxComment from 'src/components/BoxComment';
import { isNumber as _isNumber, toNumber as _toNumber, includes as _includes } from 'lodash';
import { getSlot, formatDateTime, formatComments } from 'src/helpers';
import vi from 'date-fns/locale/vi';

const BootstrapDialogTitle = ({ children, onClose, ...other }) => (
  <DialogTitle
    sx={{
      m: 0,
      py: 0,
      pl: 0,
      pr: 2,
      backgroundColor: 'primary.main',
      color: 'primary.contrastText',
      fontSize: '1rem',
      position: 'relative'
    }}
    {...other}
  >
    {children}
    {onClose ? (
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 5,
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'primary.contrastText'
        }}
      >
        <CloseIcon />
      </IconButton>
    ) : <></>}
  </DialogTitle>
);

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const DetailDialog = ({
  isOpen, onClose, onSubmit, isEdit, loading, currentDetail, mappingData,
  optionEnum, setCurrentDetail, isModeApprove, children, detailViewMode, subTables, loadingTab
}) => {
  const user = useSelector((state) => state.user);
  const mounted = useRef();
  const [tab, setTab] = useState('1');
  const changeAffectedValueField = (current, affectedKey) => {
    setCurrentDetail({ ...current, affectedKey: '' });
  };
  const changeValueField = (item, value, valid = true) => {
    const current = { ...currentDetail };
    if (item.affectedKey) {
      current[item.affectedKey] = '';
    }
    current[item.key] = value;
    const affectControl = mappingData.detailControls.filter((control) => control.autoFillFrom && _includes(control.autoFillFrom, item.key));
    affectControl.forEach((d) => {
      const [from, to] = d.autoFillFrom;
      if (current[from] && current[to]) {
        console.log(value);

        const fromDate = moment(current[from]);
        const toDate = moment(current[to]);
        const result = toDate.diff(fromDate, 'days');
        current[d.key] = result + 1;
      }
    });
    setCurrentDetail(current);
  };
  const getSelectOptions = (item) => {
    let items = optionEnum[item.foreignName || item.localName] || [];
    if (item.dependentKey) {
      items = items.filter((option) => option.fk_id === currentDetail[item.dependentKey]);
    }
    return items;
  };
  const selectOptionsRender = (item) => getSelectOptions(item).map((option) => <MenuItem key={option.id} value={option.id}>{ option.name }</MenuItem>);
  const getOptionColor = (item, value) => {
    const items = optionEnum[item.foreignName || item.localName] || [];
    const target = items.find((option) => option.id === value);
    return target && target.color ? `${target.color}.main` : '';
  };
  const dialogAction = getSlot('dialogAction', children);
  const setGridXs = (grid) => (grid * 2 > 12 ? 12 : grid * 2);
  useEffect(() => {
    setCurrentDetail(mappingData.currentDetail);
    if (!mounted.current) {
      // mounted
      mounted.current = true;
      setCurrentDetail(mappingData.currentDetail);
    } else {
      if (isOpen) {
        setTab('1');
      }
      // updated
    }
  }, [mappingData.currentDetail, isOpen]);

  return (
    <Dialog
      sx={{
        '& .MuiDialogContent-root': { p: 0 },
        '& .MuiDialogActions-root': {
          padding: (theme) => theme.spacing(1.5, 2)
        },
        '& .MuiDialog-paperScrollPaper': {
          margin: '0 !important',
          width: {
            xs: 'calc(100% - 24px)!important',
            sm: 'calc(100% - 64px) !important'
          },
          minHeight: '450px'
        },
      }}
      onClose={onClose}
      open={isOpen}
      scroll="paper"
      fullWidth
      maxWidth="sm"
    >
      <BootstrapDialogTitle onClose={onClose}>
        <Tabs
          indicatorColor={isEdit ? 'secondary' : 'primary'}
          value={tab}
          onChange={(event, newValue) => setTab(newValue)}
          sx={{
            '& .MuiButtonBase-root': {
              fontSize: '1rem'
            },
            '& .MuiTab-root': {
              color: '#fff !important'
            },
            '& .css-1xh9abu-MuiButtonBase-root-MuiTab-root': {
              color: '#fff !important'
            }
          }}
        >
          <Tab label={`${isEdit ? 'Chi tiết' : 'Tạo mới'}`} value="1" key="tab-info" />
          { !!isEdit && subTables.map((item, index) => (
            <Tab label={item.navTitle} value={`${index + 2}`} key={`tab-${item.mainTable}`} />
          )) }
        </Tabs>
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <SwipeableViews
          disabled
          index={Number(tab - 1)}
        >
          <TabPanel
            value={tab}
            index="1"
            key="panel-info"
            sx={{
              p: 2,
              '& .MuiInputBase-input.Mui-disabled, .MuiFormControlLabel-label.Mui-disabled': {
              // eslint-disable-next-line no-nested-ternary
                WebkitTextFillColor: (theme) => (detailViewMode ? theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white : undefined)
              },
              '& .css-19uq3pg-MuiButtonBase-root-MuiCheckbox-root.Mui-disable': {
                color: (theme) => theme.palette.primary.main
              }
            }}
          >
            <Grid container spacing={2}>
              { mappingData.mappingCurrentDetail.map((item) => {
                if (!isModeApprove && item.forApprove) {
                  return undefined;
                }
                const value = currentDetail[item.key];
                const { main, sub, option } = item.typeControl;
                switch (main) {
                  case 'input':
                    if (sub === 'number') {
                      return (
                        <Grid key={item.key} item xs={setGridXs(item.grid)} md={item.grid}>
                          <NumberFormat
                            customInput={TextField}
                            onValueChange={(values) => changeValueField(item, values.value)}
                            value={value}
                          // you can define additional custom props that are all forwarded to the customInput e. g.
                            size="small"
                            label={item.header}
                            variant="standard"
                            required={!detailViewMode && item.required}
                            disabled={detailViewMode}
                            fullWidth
                          />
                        </Grid>
                      );
                    }
                    return (
                      <Grid key={item.key} item xs={setGridXs(item.grid)} md={item.grid}>
                        <TextField
                          size="small"
                          type="text"
                          fullWidth
                          multiline
                          required={!detailViewMode && item.required}
                          disabled={detailViewMode}
                          value={value}
                          label={item.header}
                          variant="standard"
                          onChange={(event) => changeValueField(item, event.target.value, event.target.validity.valid)}
                        />
                      </Grid>
                    );
                  case 'date':
                    return (
                      <Grid key={item.key} item xs={setGridXs(item.grid)} md={item.grid}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} locale={vi}>
                          <DatePicker
                            disabled={detailViewMode}
                            label={item.header}
                            value={value || null}
                            minDate={sub === 'min' && currentDetail[option] ? new Date(currentDetail[option]) : undefined}
                            maxDate={sub === 'max' && currentDetail[option] ? new Date(currentDetail[option]) : undefined}
                            onChange={(newValue) => {
                              changeValueField(item, formatDateTime(newValue));
                            }}
                            renderInput={(params) => (
                              <TextField
                                sx={{
                                  '& .MuiIconButton-root': {
                                    marginRight: '-10px'
                                  },
                                  '& .MuiSvgIcon-root': {
                                    width: '20px'
                                  }
                                }}
                                variant="standard"
                                size="small"
                                fullWidth
                                required={!detailViewMode && item.required}
                                {...params}
                              />
                            )}
                          />
                        </LocalizationProvider>
                      </Grid>
                    );
                  case 'dateTime':
                    return (
                      <Grid key={item.key} item xs={setGridXs(item.grid)} md={item.grid}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} locale={vi}>
                          <DateTimePicker
                            sx={{
                              '& .PrivatePickersFadeTransitionGroup-root .css-rjgel3': {
                                whiteSpace: 'nowrap'
                              }
                            }}
                            ampm={false}
                            disabled={detailViewMode}
                            label={item.header}
                            value={value || null}
                            minDateTime={sub === 'min' && currentDetail[option] ? new Date(currentDetail[option]) : undefined}
                            maxDateTime={sub === 'max' && currentDetail[option] ? new Date(currentDetail[option]) : undefined}
                            onChange={(newValue) => {
                              changeValueField(item, formatDateTime(newValue));
                            }}
                            renderInput={(params) => (
                              <TextField
                                sx={{
                                  '& .MuiIconButton-root': {
                                    marginRight: '-10px'
                                  },
                                  '& .MuiSvgIcon-root': {
                                    width: '20px'
                                  }
                                }}
                                variant="standard"
                                size="small"
                                fullWidth
                                required={!detailViewMode && item.required}
                                {...params}
                              />
                            )}
                          />
                        </LocalizationProvider>
                      </Grid>
                    );
                  case 'select':
                    return (
                      <Grid key={item.key} item xs={setGridXs(item.grid)} md={item.grid}>
                        <FormControl
                          variant="standard"
                          // disabled={detailViewMode || item.typeControl.option === 'disabled'}
                          sx={{
                            width: '100%',
                            '& .css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input': {
                              paddingTop: '1px'
                            },
                            '& .MuiInput-input': {
                              color: getOptionColor(item, value),
                              WebkitTextFillColor: getOptionColor(item, value) ? 'unset !important' : ''
                            }
                          }}
                        >
                          <InputLabel required={!detailViewMode && item.required} sx={{ color: (theme) => (detailViewMode || option === 'disabled' ? theme.palette.text.disabled : undefined) }}>{ item.header }</InputLabel>
                          <Select
                            disabled={detailViewMode || option === 'disabled'}
                            value={value}
                            onChange={(event) => changeValueField(item, event.target.value)}
                            label={item.header}
                          >
                            {/* <MenuItem value="">
                              <em>None</em>
                            </MenuItem> */}
                            { selectOptionsRender(item) }
                          </Select>
                        </FormControl>
                      </Grid>
                    );
                  case 'checkbox':
                    return (
                      <Grid key={item.key} item xs={setGridXs(item.grid)} md={item.grid}>
                        <FormControlLabel
                          label={item.header}
                          required={!detailViewMode && item.required}
                          disabled={detailViewMode}
                          control={(
                            <Checkbox
                              checked={value}
                              onChange={(event) => changeValueField(item, event.target.checked)}
                            />
                        )}
                        />
                      </Grid>
                    );
                  case 'text':
                    return (
                      <Grid key={item.key} item xs={setGridXs(item.grid)} md={item.grid}>
                        <TextField
                          size="small"
                          fullWidth
                          disabled
                          value={currentDetail[item.key]}
                          label={item.header}
                          required={!detailViewMode && item.required}
                          variant="standard"
                        />
                      </Grid>
                    );
                  default:
                    return currentDetail[item.key];
                }
              })}
            </Grid>
          </TabPanel>
          { subTables.map((item, index) => (
            <TabPanel sx={{ p: 2 }} value={tab} index={`${index + 2}`} key={`panel-${item.mainTable}`}>
              { item.type === 'table' && (
              <TableBasic
                loading={loading}
                dataTable={item.dataTable}
                mappingData={item}
              />
              ) }
              { item.type === 'comment' && (
              <BoxComment data={formatComments(item.dataTable)} user={user} />
              ) }
            </TabPanel>
          )) }
        </SwipeableViews>
      </DialogContent>
      <DialogActions>
        <Stack direction="row" spacing={1}>
          { dialogAction }
        </Stack>
        { !dialogAction && (
        <Button variant="outlined" onClick={onClose}>Đóng</Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

DetailDialog.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  isModeApprove: PropTypes.bool,
  isEdit: PropTypes.bool,
  loading: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  mappingData: PropTypes.object,
  optionEnum: PropTypes.object,
  currentDetail: PropTypes.object,
  setCurrentDetail: PropTypes.func,
  detailViewMode: PropTypes.bool,
  subTables: PropTypes.array,
  loadingTab: PropTypes.bool
};

export default DetailDialog;
