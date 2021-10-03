import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box } from '@material-ui/core';

const LogoIconGmc = ({ ...other }) => {
  const customizer = useSelector((state) => state.CustomizerReducer);
  return (
    <Box {...other}>
      {
        customizer.activeMode === 'dark'
          ? <img src="/static/images/logos/gmc-dark.png" alt="gmc-dark" />
          : <img src="/static/images/logos/gmc-light.png" alt="gmc-light" />
      }
    </Box>
  );
};

export default LogoIconGmc;
