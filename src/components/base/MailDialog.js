import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Divider, IconButton, Paper
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DisplayInfo from 'src/components/DisplayInfo';
import MailBox from 'src/components/MailBox';
import resources from 'src/resources';

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

const InfoDialog = ({
  isOpen, onClose, isEdit, currentDetail, mappingData, optionEnum, maxWidth = 'sm', children, loading
}) => {
  const formatTableValue = (row, key) => {
    const target = mappingData.mappingCurrentDetail.find((item) => item.key === key);
    const value = row[key];
    if (target && value) {
      switch (target.typeControl.main) {
        case 'date':
          return value ? moment(value).format('DD/MM/YYYY') : '';
        case 'dateTime':
          return value ? moment(value).format('DD/MM/YYYY HH:mm') : '';
        case 'select':
          // case column type is select and using foreign key
          const items = optionEnum[target.foreignName || target.localName] || [];
          const columnTarget = items.find((item) => item.id === value);
          if (columnTarget) {
            if (target.typeControl.sub === 'chip') {
              return <Box sx={{ color: `${columnTarget.color}.main` }}>{ columnTarget.name }</Box>;
            }
            return columnTarget.name;
          }
          return '';
        case 'checkbox':
          return value ? 'Yes' : 'No';
        default:
          return value;
      }
    }
    return value;
  };

  const formatAvatarName = (name) => {
    if (!name) return '';
    const names = name.split(' ');
    if (names.length === 1) {
      return name.substring(0, 2).toUpperCase();
    }
    return names.slice(-2).map((item) => item.substring(0, 1));
  };

  const infoList = mappingData.mappingCurrentDetail.map((item) => ({
    key: item.key,
    label: item.header,
    value: formatTableValue(currentDetail, item.key)
  }));

  const mailData = {
    avatar: formatAvatarName(currentDetail.employeeFullName),
    name: currentDetail.employeeFullName,
    to: currentDetail.toUser,
    cc: currentDetail.ccUser,
    reciveDate: moment(currentDetail.reciveDate).format('LLLL')
  };
  const mailType = resources.mailTypes.find((item) => item.id === currentDetail.docType);
  const mailTitle = mailType ? mailType.name : '';
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
          }
        }
      }}
      onClose={onClose}
      open={isOpen}
      scroll="paper"
      fullWidth
      maxWidth={maxWidth}
    >
      <BootstrapDialogTitle onClose={onClose}>
        { `Thông tin ${mailTitle.toLowerCase()}` }
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Box sx={{ p: 2 }}>
          <Paper sx={{ p: 1, mx: 1, mb: 1.5 }}>
            <MailBox data={mailData} />
          </Paper>
          <DisplayInfo data={infoList} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};

InfoDialog.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  isEdit: PropTypes.bool,
  onClose: PropTypes.func,
  mappingData: PropTypes.object,
  currentDetail: PropTypes.object,
  optionEnum: PropTypes.object,
  maxWidth: PropTypes.string
};

export default InfoDialog;
