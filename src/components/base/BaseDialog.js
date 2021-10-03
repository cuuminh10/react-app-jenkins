import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Paper from '@material-ui/core/Paper';
import { getSlot } from 'src/helpers';

const Content = ({ content }) => content;

Content.propTypes = {
  content: PropTypes.node,
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: 0
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1.5, 2)
  },
}));

const BootstrapDialogTitle = ({ children, onClose, ...other }) => (
  <DialogTitle
    sx={{
      m: 0,
      py: 1.5,
      px: 2,
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

const BaseDialog = ({
  isOpen, doClose, doSubmit, title, submit, children
}) => {
  const content = getSlot('default', children);
  const action = getSlot('action', children) || (
    <Button variant="contained" onClick={doSubmit}>
      { submit || 'Save' }
    </Button>
  );
  return (
    <BootstrapDialog
      onClose={doClose}
      open={isOpen}
      scroll="paper"
      fullWidth
      maxWidth="sm"
    >
      <BootstrapDialogTitle onClose={doClose}>
        { title }
      </BootstrapDialogTitle>
      <DialogContent dividers>
        { content }
      </DialogContent>
      <DialogActions>
        { action }
      </DialogActions>
    </BootstrapDialog>
  );
};

BaseDialog.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  submit: PropTypes.string,
  doClose: PropTypes.func,
  doSubmit: PropTypes.func
};

export default BaseDialog;
