import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box, MenuItem, Typography, Stack, Divider, Chip, Tooltip
} from '@material-ui/core';
import resources from 'src/resources';
import { formatDate, isChecked } from 'src/helpers';
import GMCService from 'src/services/gmc.service';
import UserAvatar from 'src/layouts/full-layout/user/UserAvatar';

const NotificationDropdown = ({ notifications = [], setNotifications }) => {
  const getType = (notify) => {
    const type = resources.mailTypes.find((item) => item.id === notify.type);
    return type ? type.name : '';
  };
  const viewNotification = async (notification) => {
    const type = isChecked(notification.readFlag);
    if (!type) {
      try {
        const url = `common/noti/read/${notification.id}`;
        const res = await GMCService.postDataByUrl(url);
        const target = notifications.find((item) => item.id === notification.id);
        target.readFlag = (!type).toString();
        setNotifications([...notifications]);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <Box>
      {notifications.map((notification, index) => (
        <Box key={`${notification.title}-${index}`}>
          <MenuItem
            onClick={() => viewNotification(notification)}
            sx={{
              py: 1,
              px: 0,
              borderRadius: '0px',
            }}
          >
            <Box display="flex" alignItems="center">
              <UserAvatar
                user={{ username: notification.sndUser }}
                sx={{
                  width: '45px',
                  flexShrink: 0,
                  height: '45px'
                }}
              />
              <Box
                sx={{
                  ml: 2,
                }}
              >
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    whiteSpace: 'normal',
                    display: '-webkit-box',
                    textOverflow: 'ellipsis',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    mb: 0.5,
                    color: (theme) => (isChecked(notification.readFlag) ? theme.palette.text.disabled : undefined)
                  }}
                >
                  {notification.content}
                </Typography>
                <Stack direction="row" sx={{ pr: 2 }} alignItems="center" justifyContent="space-between">
                  <Chip sx={{ opacity: isChecked(notification.readFlag) ? 0.7 : 1 }} label={getType(notification)} size="small" color="secondary" variant="outlined" />
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    noWrap
                    fontWeight="400"
                    sx={{
                      color: (theme) => (isChecked(notification.readFlag) ? theme.palette.text.disabled : undefined)
                    }}
                  >
                    { formatDate(notification.sndDate, 'DD/MM/YYYY HH:mm') }
                  </Typography>
                </Stack>
              </Box>
            </Box>
          </MenuItem>
          {/* <Divider
            style={{
              marginTop: 0,
              marginBottom: 0,
            }}
          /> */}
          <Divider sx={{ m: '0px !important' }} />
        </Box>
      ))}
    </Box>
  );
};

NotificationDropdown.propTypes = {
  notifications: PropTypes.array,
  setNotifications: PropTypes.func
};

export default NotificationDropdown;
