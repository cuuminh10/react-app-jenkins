import PropTypes from 'prop-types';
import moment from 'moment';

import { Fragment } from 'react';
import {
  Grid, Typography, Box, Stack, Divider
} from '@material-ui/core';

const MailBox = ({ data }) => (
  <Stack direction="row" alignItems="center" spacing={2}>
    <Box
      className="u-flex-center"
      sx={{
        background: '#ff5722', width: 50, height: 50, borderRadius: '50%', color: '#fff'
      }}
    >
      { data.avatar }
    </Box>
    <Stack spacing={0.5}>
      <p className="u-fw-bold">{ data.name }</p>
      <p className="d-flex">
        <span className="u-fw-bold">To:</span> <span>{ data.to || '-' } </span>
        <span className="u-fw-bold u-ml-5">Cc:</span> <span>{ data.cc || '-' }</span>
      </p>
      <p>{ data.reciveDate }</p>
    </Stack>
  </Stack>
);

MailBox.propTypes = {
  data: PropTypes.object
};

export default MailBox;
