import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import GMCService from 'src/services/gmc.service';
import { useDispatch } from 'react-redux';
import { get as _get } from 'lodash';

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Stack,
  Paper
} from '@material-ui/core';
import { setUser } from 'src/actions/user';
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  return (
    <>
      <Helmet>
        <title>Login | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="xs">
          <Paper sx={{ overflow: 'hidden' }}>
            <Formik
              initialValues={{
                username: '',
                password: ''
              }}
              validationSchema={Yup.object().shape({
                username: Yup.string().max(30).required('Username is required'),
                password: Yup.string().max(10).required('Password is required')
              })}
              onSubmit={async (formData) => {
                try {
                  const requestData = formData;
                  const res = await GMCService.postDataByUrl('Users/login', requestData);
                  const { status, data } = res;
                  if (status === 200) {
                    localStorage.setItem('user', JSON.stringify(data));
                    dispatch(setUser(data));
                    navigate('/app/dashboard', { replace: true });
                  }
                } catch (err) {
                  const message = _get(err, 'response.data.message') || '';
                  setError(message);
                }
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values
              }) => (
                <form onSubmit={handleSubmit}>
                  <Stack
                    sx={{
                      p: '10px',
                      backgroundColor: '#07245B'
                    }}
                    alignItems="center"
                  >
                    <img width="127" alt="Logo" src="/static/logo-login.png" />
                  </Stack>
                  <Box sx={{ p: 2 }}>
                    <Box
                      sx={{
                        py: 1
                      }}
                    >
                      <Typography
                        align="center"
                        color="primary.main"
                        variant="h2"
                      >
                        Đăng nhập
                      </Typography>
                    </Box>
                    <TextField
                      error={Boolean(touched.username && errors.username)}
                      fullWidth
                      helperText={touched.username && errors.username}
                      label="Tài khoản"
                      margin="normal"
                      name="username"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.username}
                      variant="outlined"
                    />
                    <TextField
                      error={Boolean(touched.password && errors.password)}
                      fullWidth
                      helperText={touched.password && errors.password}
                      label="Mật khẩu"
                      margin="normal"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
                      value={values.password}
                      variant="outlined"
                    />
                    <Typography
                      align="left"
                      color="error"
                      variant="p"
                    >
                      { error }
                    </Typography>
                    <Box sx={{ py: 2 }}>
                      <Button
                        color="primary"
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                      >
                        Đăng nhập
                      </Button>
                    </Box>
                  </Box>
                </form>
              )}
            </Formik>
          </Paper>

        </Container>
      </Box>
    </>
  );
};

export default Login;
