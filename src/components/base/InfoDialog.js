import {
  useState, useEffect, useRef, Fragment
} from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Box, Button, Tabs, Tab, Typography
} from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import TabContext from '@material-ui/lab/TabContext';
import LoadingButton from '@material-ui/lab/LoadingButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Paper from '@material-ui/core/Paper';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';
import TableBasic from 'src/components/TableBasic';
import DisplayInfo from 'src/components/DisplayInfo';
import TabPanel from 'src/components/TabPanel';
import BoxComment from 'src/components/BoxComment';
import { getSlot, formatComments } from 'src/helpers';

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

// const TabPanel = ({ children, value, index, ...other }) => (
//   <Box
//     role="tabpanel"
//     id={`full-width-tabpanel-${index}`}
//     aria-labelledby={`full-width-tab-${index}`}
//     {...other}
//   >
//     {value === index && (
//       <Box>{ children }</Box>
//     )}
//   </Box>
// );

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.string.isRequired,
//   value: PropTypes.string.isRequired,
// };

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const InfoDialog = ({
  isOpen, onClose, isEdit, currentDetail, mappingData, optionEnum, subTables = [], maxWidth, children, loading
}) => {
  const user = useSelector((state) => state.user);
  const [tab, setTab] = useState('1');
  const dialogAction = getSlot('dialogAction', children);
  useEffect(() => {
    if (isOpen) {
      setTab('1');
    }
  }, [isOpen]);
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

  const infoList = mappingData.mappingCurrentDetail.map((item) => ({
    key: item.key,
    label: item.header,
    value: formatTableValue(currentDetail, item.key)
  }));
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
        { `${isEdit ? 'Thông tin' : 'Tạo mới'} ${mappingData.navTitle.toLowerCase()}` }
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Box sx={{ p: 2 }}>
          <DisplayInfo data={infoList} />
          { !!subTables.length && (
          <>
            <Box>
              <Tabs
                textColor="secondary"
                indicatorColor="secondary"
                value={tab}
                onChange={(event, newValue) => setTab(newValue)}
                aria-label="basic tabs example"
                sx={{
                  '& .MuiButtonBase-root': {
                    fontSize: '1rem'
                  }
                }}
              >
                { subTables.map((item, index) => (
                  <Tab label={item.navTitle} value={`${index + 1}`} key={`tab-${item.mainTable}`} />
                )) }
              </Tabs>
            </Box>
            <SwipeableViews
              disabled
              index={Number(tab - 1)}
            >
              { subTables.map((item, index) => (
                <TabPanel sx={{ px: 0, py: 2 }} value={tab} index={`${index + 1}`} key={`panel-${item.mainTable}`}>
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
          </>
          ) }

        </Box>
      </DialogContent>
      <DialogActions>
        { dialogAction || (
          <>
            <Button variant="outlined" onClick={onClose}>Đóng</Button>
          </>
        )}
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
  subTables: PropTypes.array,
  maxWidth: PropTypes.string
};

export default InfoDialog;
