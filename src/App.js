import React, { useEffect } from 'react';
import { useRoutes, useNavigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { useSelector } from 'react-redux';
import RTL from './layouts/full-layout/customizer/RTL';
import ThemeSettings from './layouts/full-layout/customizer/ThemeSettings';
// eslint-disable-next-line import/no-named-as-default
import Router from './routes/Router';
import 'react-perfect-scrollbar/dist/css/styles.css';
import * as firebase from './firebase';
import './App.scss';

const App = () => {
  const routing = useRoutes(Router);
  const theme = ThemeSettings();
  const customizer = useSelector((state) => state.CustomizerReducer);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('auth/login');
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <RTL direction={customizer.activeDir}>
        <CssBaseline />
        {routing}
      </RTL>
    </ThemeProvider>
  );
};

export default App;
