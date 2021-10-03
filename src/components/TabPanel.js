import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';

const TabPanel = ({ children, value, index, ...other }) => (
  <Box
    role="tabpanel"
    id={`full-width-tabpanel-${index}`}
    aria-labelledby={`full-width-tab-${index}`}
    {...other}
  >
    {value === index && (
    <Box>{ children }</Box>
    )}
  </Box>
);

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default TabPanel;
