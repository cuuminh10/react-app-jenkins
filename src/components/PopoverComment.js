import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import {
  Box, Popover, Typography, Stack, TextField, Divider, Button, ClickAwayListener
} from '@material-ui/core';

const PopoverComment = ({
  id, title, placeholder, required, anchorEl, setAnchorEl, onSubmit
}) => {
  const popoverId = anchorEl ? id : undefined;
  const [content, setContent] = useState('');
  const inputRef = useRef();
  const doSubmit = () => {
    onSubmit(content);
    setAnchorEl(null);
    setContent('');
  };
  useEffect(() => {
    if (anchorEl) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [anchorEl]);
  return (
    <Popover
      id={popoverId}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
        <Box>
          <Stack sx={{ p: 2, width: '400px' }} spacing={2}>
            <Typography variant="h5">
              { title }
            </Typography>
            <TextField
              inputRef={inputRef}
              multiline
              value={content}
              rows={2}
              size="small"
              label={placeholder}
              type="text"
              fullWidth
              variant="outlined"
              onChange={(event) => setContent(event.target.value)}
            />
          </Stack>
          <Box sx={{ px: 2 }}>
            <Divider />
          </Box>
          <Stack direction="row" spacing={1} justifyContent="flex-end" p={1}>
            <Button color="error" variant="outlined" onClick={() => setAnchorEl(null)}>
              Huỷ bỏ
            </Button>
            <Button disabled={required && !content} variant="outlined" onClick={doSubmit} autoFocus>
              Đồng ý
            </Button>
          </Stack>
        </Box>
      </ClickAwayListener>
    </Popover>
  );
};

PopoverComment.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  anchorEl: PropTypes.any,
  setAnchorEl: PropTypes.func,
  onSubmit: PropTypes.func
};

export default PopoverComment;
