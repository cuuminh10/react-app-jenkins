import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  TextField, Typography, Box, Divider, Paper, Stack
} from '@material-ui/core';
import UserAvatar from 'src/layouts/full-layout/user/UserAvatar';
import { formatDate } from 'src/helpers';
// { data = [{ title: 'Hôm nay', list: [{ createUser: 'GMC3', createDate: '2021-09-22T15:06:50.39', content: 'CHAN QUA CHAN QUA CHAN QUA' }, { createUser: 'GMC3', createDate: '2021-09-22T15:06:50.39', content: 'CHAN QUA CHAN QUA CHAN QUA' }, { createUser: 'GMC', createDate: '2021-09-22T15:05:50.39', content: ' Dau xanh Dau xanh Dau xanh Dau xanh' }] }] }
const BoxComment = ({ data, user }) => {
  const [text, setText] = useState();
  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        maxWidth: '900px',
        p: 1,
        mt: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '290px',
        position: 'relative'
      }}
    >
      { !data.length && <Typography sx={{ fontSize: '1.2rem', textAlign: 'center' }}>Không có comment nào.</Typography> }
      {
        data.map((item, dataIndex) => (
          <Box key={`${item.title}-${dataIndex}`}>
            <Box sx={{ position: 'relative', mb: 3, mt: dataIndex > 0 ? 3 : 1 }}>
              <Divider />
              <Paper
                elevation={0}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  padding: '5px 20px',
                  fontSize: '14px'
                }}
              >{item.title}
              </Paper>
            </Box>
            {
              item.list.map((comment, index) => ((
                <Stack key={`${item.title}-${comment.content}-${index}`} sx={{ mb: 1 }} alignItems="start" spacing={2} direction={comment.createUser !== user.username ? 'row' : 'row-reverse'}>
                  {
                    (index === 0 || !(comment.createUser === item.list[index - 1].createUser)) && comment.createUser !== user.username && (
                      <UserAvatar
                        user={{ username: comment.createUser }}
                        sx={{
                          width: '2.5rem',
                          height: '2.5rem',
                          fontSize: '0.8rem',
                          backgroundColor: (theme) => theme.palette.grey['500'],
                        }}
                      />
                    )
                  }
                  <Stack spacing={0.5}>
                    {
                      (index === 0 || !(comment.createUser === item.list[index - 1].createUser)) && comment.createUser !== user.username && (
                        <Typography sx={{ fontSize: '0.9rem', color: (theme) => theme.palette.grey['500'] }} variant="p">
                          { comment.createUser }
                        </Typography>
                      )
                    }
                    <Stack spacing={1} alignItems="flex-end" direction={comment.createUser !== user.username ? 'row' : 'row-reverse'}>
                      <Box
                        ml={index > 0 && comment.createUser === item.list[index - 1].createUser && comment.createUser !== user.username ? 'calc(2.5rem + 16px)' : 0}
                        sx={{
                          py: 1,
                          px: 2,
                          backgroundColor: comment.createUser !== user.username ? (theme) => theme.palette.grey['100'] : 'primary.light',
                          borderRadius: '6px',
                          color: (theme) => `${
                            theme.palette.mode === 'dark'
                              ? 'rgba(0, 0, 0, 0.87)'
                              : 'rgba(0, 0, 0, 0.87)'
                          }`,
                        }}
                      >
                        {comment.content}
                      </Box>
                      <Typography sx={{ fontSize: '0.8rem', color: (theme) => theme.palette.grey['500'] }} variant="p">
                        {formatDate(comment.createDate, 'HH:mm')}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              )

              ))
            }
          </Box>
        ))
      }
      {/* <Box sx={{ position: 'absolute', left: 0, bottom: 0, width: '100%' }}>
        <TextField
          size="small"
          fullWidth
          value={text}
          variant="outlined"
          onChange={(event) => setText(event.target.value)}
        />
      </Box> */}
    </Paper>
  );
};

BoxComment.propTypes = {
  data: PropTypes.array,
  user: PropTypes.object
};

export default BoxComment;
