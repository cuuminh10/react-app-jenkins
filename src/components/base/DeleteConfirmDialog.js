import PropTypes from 'prop-types';
import {
  Button, DialogContent, Dialog, DialogTitle, DialogContentText, DialogActions
} from '@material-ui/core';

const Content = ({ content }) => content;

Content.propTypes = {
  content: PropTypes.node,
};

const DeleteConfirmDialog = ({
  isOpen, onClose, onSubmit
}) => (
  <Dialog
    open={isOpen}
    onClose={onClose}
    sx={{
      '& .MuiDialogTitle-root': { p: 2 },
      '& .MuiDialogContent-root': { px: 2, py: 0 },
      '& .MuiDialogActions-root': { p: 2 }
    }}
  >
    <DialogTitle sx={{ fontSize: '1rem' }}>
      Confirm deletion
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        Do you want to permanently delete this?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button variant="outlined" size="small" color="error" onClick={onClose}>Cancel</Button>
      <Button variant="contained" size="small" color="error" onClick={onSubmit} autoFocus>
        Agree
      </Button>
    </DialogActions>
  </Dialog>
);

DeleteConfirmDialog.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func
};

export default DeleteConfirmDialog;
