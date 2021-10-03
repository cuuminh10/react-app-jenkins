import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Box, Tooltip, FormControlLabel, Checkbox, Popover, Typography, Stack, TextField, Divider, Button, ClickAwayListener, IconButton
} from '@material-ui/core';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import CloseIcon from '@material-ui/icons/Close';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import MobileDateRangePicker from '@material-ui/lab/MobileDateRangePicker';
import vi from 'date-fns/locale/vi';
import resources from 'src/resources';

const PopoverColumns = ({
  showColumns = [], onChangeColumnItem
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const closePopover = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Tooltip title="View columns">
        <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
          <ViewColumnIcon />
        </IconButton>
      </Tooltip>

      <Popover
        id="c-popover-columns"
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
            <Box sx={{ p: 2, minWidth: '200px', maxWidth: '100%' }}>
              <Typography variant="h5">
                Show Columns
              </Typography>
              <Box sx={{ pt: 1, display: 'flex', flexDirection: 'column' }}>
                { showColumns.map((item, index) => (
                  <FormControlLabel
                    key={`${item.id}-${index}`}
                    size="small"
                    control={(
                      <Checkbox
                        sx={{ px: '8px', py: '4px', '& .MuiSvgIcon-root': { fontSize: '1.57rem' } }}
                        checked={item.isShow}
                        onChange={(event) => onChangeColumnItem(event, item.id)}
                      />
                    )}
                    label={item.label}
                  />
                )) }
              </Box>
            </Box>
          </Box>
        </ClickAwayListener>
      </Popover>
    </>
  );
};

PopoverColumns.propTypes = {
  showColumns: PropTypes.array,
  onChangeColumnItem: PropTypes.func
};

export default PopoverColumns;
