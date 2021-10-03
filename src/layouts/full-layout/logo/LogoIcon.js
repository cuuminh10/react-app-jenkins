import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box } from '@material-ui/core';
// import { ReactComponent as LogoDark } from '../../../assets/images/logos/logo-dark.png';
// import { ReactComponent as LogoLight } from '../../../assets/images/logos/logo-white.png';

const LogoIcon = ({ link = '/', oneType, ...other }) => {
  const customizer = useSelector((state) => state.CustomizerReducer);
  return (
    <Link underline="none" to={link}>
      <Box sx={{ width: '90px', display: 'inline-flex' }} {...other}>
        {
          oneType === 'dark' && (
            <Box>
              <img src="/static/images/logos/logo-dark.png" alt="logo-dark" />
            </Box>
          )
        }
        {
          oneType === 'light' && (
            <Box>
              <img src="/static/images/logos/logo-light.png" alt="logo-light" />
            </Box>
          )
        }
        {
          !oneType && (
            <Box>
              {
                customizer.activeMode === 'dark'
                  ? <img src="/static/images/logos/logo-dark.png" alt="logo-dark" />
                  : <img src="/static/images/logos/logo-light.png" alt="logo-light" />
              }
            </Box>
          )
        }
      </Box>
      {/* {customizer.activeMode === 'dark' ? <LogoLight /> : <LogoDark />} */}
    </Link>
  );
};

LogoIcon.propTypes = {
  link: PropTypes.string,
  oneType: PropTypes.string
};

export default LogoIcon;
