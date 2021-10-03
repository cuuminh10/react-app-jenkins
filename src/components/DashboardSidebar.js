import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Drawer,
  Hidden,
  List
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  // Lock as LoginIcon,
  Users,
  BookOpen,
  // CheckSquare,
  // CreditCard,
  // Briefcase,
  Mail
} from 'react-feather';
import NavItem from './NavItem';
import NavMultiItem from './NavMultiItem';

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    icon: Users,
    title: 'HR',
    children: [
      {
        href: '/app/leave',
        title: 'Báo phép'
      },
      {
        href: '/app/overtime',
        title: 'Đăng ký tăng ca'
      },
      {
        href: '/app/working-schedule',
        title: 'Lịch công tác'
      },
    ]
  },
  {
    icon: BookOpen,
    title: 'Approval',
    children: [
      {
        href: '/app/purchase-request',
        // icon: BookOpen,
        title: 'Purchase Request'
      },
      {
        href: '/app/purchase-order',
        // icon: CheckSquare,
        title: 'Purchase Order'
      },
      {
        href: '/app/payment-order',
        // icon: CreditCard,
        title: 'Payment Request'
      },
      {
        href: '/app/sale-order',
        // icon: Briefcase,
        title: 'Sale order'
      },
    ]
  },
  {
    icon: Mail,
    title: 'Hộp thư',
    children: [
      {
        href: '/app/inbox',
        title: 'Inbox'
      },
      {
        href: '/app/outbox',
        title: 'Outbox'
      }
    ]
  },
  {
    href: '/settings',
    icon: SettingsIcon,
    title: 'Settings'
  }
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (item.children && item.children.length ? (
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
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 240
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 240,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default DashboardSidebar;
