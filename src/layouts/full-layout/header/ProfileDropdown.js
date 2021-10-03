import React from 'react';
import {
  Box, MenuItem, Typography, Avatar, Button, Divider
} from '@material-ui/core';
import FeatherIcon from 'feather-icons-react';

import PropTypes from 'prop-types';
import UserAvatar from 'src/layouts/full-layout/user/UserAvatar';

const ProfileDropdown = ({ user }) => (
  <Box>
    <Box
      sx={{
        pb: 3,
        mt: 3,
      }}
    >
      <Box display="flex" alignItems="center">
        <UserAvatar user={user} sx={{ width: '6.4rem', height: '6.4rem', fontSize: '1.85rem' }} />
        <Box
          sx={{
            ml: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              lineHeight: '1.235',
            }}
          >
            { user ? user.username : '' }
          </Typography>
          <Typography color="textSecondary" variant="h6" fontWeight="400">
            Administrator
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography
              color="textSecondary"
              display="flex"
              alignItems="center"
              sx={{
                color: (theme) => theme.palette.grey.A200,
                mr: 1,
              }}
            >
              <FeatherIcon icon="mail" width="18" />
            </Typography>
            <Typography color="textSecondary" variant="h6">
              expert-erp@gmc.com
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
    <Divider
      style={{
        marginTop: 0,
        marginBottom: 0,
      }}
    />
  </Box>
);

ProfileDropdown.propTypes = {
  user: PropTypes.object
};

export default ProfileDropdown;
