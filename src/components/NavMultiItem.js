import {
  // NavLink as RouterLink,
  matchPath,
  useLocation
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, ListItem } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import NavItem from './NavItem';

const NavMultiItem = ({
  href,
  icon: Icon,
  title,
  childrenItems,
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const active = childrenItems.some((item) => (item.href ? !!matchPath({
    path: item.href,
    end: false
  }, location.pathname) : false));
  useEffect(() => {
    if (active) {
      setOpen(true);
    }
  }, [location.pathname]);
  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <ListItem
        disableGutters
        onClick={handleClick}
        sx={{
          display: 'flex',
          py: 0,
          position: 'relative'
        }}
        {...rest}
      >
        <i className={`u-icon-down${open ? ' open' : ''}`} />
        <Button
          sx={{
            color: 'text.secondary',
            fontWeight: 'medium',
            justifyContent: 'flex-start',
            letterSpacing: 0,
            py: 1.25,
            textTransform: 'none',
            width: '100%',
            '& svg': {
              mr: 1
            },
            backgroundColor: open ? 'rgba(86, 100, 210, 0.04)' : 'inherit'
          }}
        >
          {Icon && (
            <Icon size="20" />
          )}
          <span>
            {title}
          </span>
        </Button>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List sx={{ '& .MuiButton-root': { pl: 4.5 } }} component="div" disablePadding>
          {childrenItems.map((item) => (item.children && item.children.length ? (
            <NavMultiItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
              childrenItems={item.children}
            />
          ) : (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          )))}
        </List>
      </Collapse>
    </>

  );
};

NavMultiItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string,
  childrenItems: PropTypes.array
};

export default NavMultiItem;
