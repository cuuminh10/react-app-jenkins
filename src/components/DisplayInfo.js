import PropTypes from 'prop-types';
import { Fragment } from 'react';
import {
  Grid, Typography, Box, Divider, Paper
} from '@material-ui/core';

const DisplayInfo = ({ data = [] }) => (
  <Paper elevation={0} sx={{ px: 1 }}>
    { data.map((item, index) => (
      <Fragment key={item.label}>
        <Grid container sx={{ py: 1, flexWrap: 'nowrap' }}>
          <Box sx={{ width: { xs: '40%', sm: '200px' }, pr: 1, fontWeight: 500, flexShrink: 0 }}>
            { item.label }
          </Box>
          <Box sx={{ color: 'text.secondary' }}>
            { item.value }
          </Box>
        </Grid>
        <Divider />
      </Fragment>
    )) }
  </Paper>
);

DisplayInfo.propTypes = {
  data: PropTypes.array
};

export default DisplayInfo;
