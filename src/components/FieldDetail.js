import { Fragment } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  Grid, TextField, FormControl, FormControlLabel, Select, InputLabel, MenuItem, Checkbox
} from '@material-ui/core';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';

const FieldDetail = (props) => {
  const {
    mappingData, optionsForAllSelect, changeValueField
  } = props;
  const getSelectOptions = (field) => {
    const target = optionsForAllSelect.find((item) => item.type === field);
    const items = target ? target.value : [];
    const selectOptions = items.map((option) => {
      if (target.foreignKey) {
        return <MenuItem key={option.id} value={option.id}>{ option.name }</MenuItem>;
      }
      return <MenuItem key={option} value={option}>{ option }</MenuItem>;
    });
    return selectOptions;
  };
  return (
    <Grid container spacing={2}>
      { mappingData.tableControls.map((item) => {
        switch (item.type) {
          case 'input':
            return (
              <Grid key={item.key} item xs={item.grid * 2 > 12 ? 12 : item.grid * 2} md={item.grid}>
                <TextField
                  size="small"
                  fullWidth
                  value={item.value}
                  label={item.header}
                  variant="standard"
                  onChange={(event) => changeValueField(item, event.target.value)}
                />
              </Grid>
            );
          case 'date':
            return (
              <Grid key={item.key} item xs={item.grid * 2 > 12 ? 12 : item.grid * 2} md={item.grid}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label={item.header}
                    value={item.value ? new Date(item.value) : null}
                    onChange={(newValue) => {
                      changeValueField(item, moment(newValue).toISOString());
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
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            );
          case 'select':
            return (
              <Grid key={item.key} item xs={item.grid * 2 > 12 ? 12 : item.grid * 2} md={item.grid}>
                <FormControl
                  variant="standard"
                  sx={{
                    width: '100%',
                    '& .css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input': {
                      paddingTop: '1px'
                    }
                  }}
                >
                  <InputLabel>{ item.header }</InputLabel>
                  <Select
                    value={item.value}
                    onChange={(event) => changeValueField(item, event.target.value)}
                    label={item.header}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    { getSelectOptions(item.key) }
                  </Select>
                </FormControl>
              </Grid>
            );
          case 'checkbox':
            return (
              <Grid key={item.key} item xs={item.grid * 2 > 12 ? 12 : item.grid * 2} md={item.grid}>
                <FormControlLabel
                  label={item.label}
                  control={(
                    <Checkbox
                      checked={item.value}
                      onChange={(event) => changeValueField(item, event.target.checked)}
                    />
                  )}
                />
              </Grid>
            );
          default:
            return <Fragment key={item.key} />;
        }
      })}
    </Grid>
  );
};

FieldDetail.propTypes = {
  mappingData: PropTypes.object,
  optionsForAllSelect: PropTypes.array,
  changeValueField: PropTypes.func
};

export default FieldDetail;
