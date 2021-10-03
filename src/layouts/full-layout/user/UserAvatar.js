import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box } from '@material-ui/core';

const UserAvatar = ({ user, sx }) => {
  let name = '';
  if (user) {
    if (user.avatar) {
      return (
        <Avatar
          src={user.avatar}
          alt={user.avatar}
          sx={{
            width: '30px',
            height: '30px',
            ...sx
          }}
        />
      );
    }
    if (user.username) {
      const splitName = user.username.split(' ');
      if (splitName.length === 1) {
        name = splitName[0].substr(0, 2).toUpperCase();
      } else if (splitName.length > 1) {
        const first = splitName[splitName.length - 2].substr(0, 1).toUpperCase();
        const second = splitName[splitName.length - 1].substr(0, 1).toUpperCase();
        name = `${first}${second}`;
      }
    }
  }
  return (
    <Box sx={{
      width: '30px',
      height: '30px',
      backgroundColor: 'primary.main',
      color: 'white',
      fontSize: '0.857rem',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      ...sx
    }}
    >
      { name }
    </Box>
  );
};

UserAvatar.propTypes = {
  user: PropTypes.object,
  sx: PropTypes.object
};

export default UserAvatar;
