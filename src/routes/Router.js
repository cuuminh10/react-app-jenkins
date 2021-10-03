import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

/* ***Layouts**** */
const FullLayout = lazy(() => import('../layouts/full-layout/FullLayout'));
const BlankLayout = lazy(() => import('../layouts/blank-layout/BlankLayout'));
/* ***End Layouts**** */

const Error = lazy(() => import('../views/authentication/Error'));
const Login = lazy(() => import('../views/authentication/Login'));

// Pages

const Dashboard = lazy(() => import('src/pages/Dashboard'));
const Leave = lazy(() => import('src/pages/Leave'));
const WorkingSchedule = lazy(() => import('src/pages/WorkingSchedule'));
const Overtime = lazy(() => import('src/pages/Overtime'));
const PurchaseOrder = lazy(() => import('src/pages/PurchaseOrder'));
const PurchaseRequest = lazy(() => import('src/pages/PurchaseRequest'));
const PaymentOrder = lazy(() => import('src/pages/PaymentOrder'));
const SaleOrder = lazy(() => import('src/pages/SaleOrder'));
const Inbox = lazy(() => import('src/pages/Inbox'));
const Outbox = lazy(() => import('src/pages/Outbox'));
const Settings = lazy(() => import('src/pages/Settings'));

/* ****Routes***** */

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      // pages
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/hr/leave', element: <Leave /> },
      { path: '/hr/overtime', element: <Overtime /> },
      { path: '/hr/working-schedule', element: <WorkingSchedule /> },
      { path: '/approval/purchase-order', element: <PurchaseOrder /> },
      { path: '/approval/purchase-request', element: <PurchaseRequest /> },
      { path: '/approval/payment-order', element: <PaymentOrder /> },
      { path: '/approval/sale-order', element: <SaleOrder /> },
      { path: '/mail/inbox', element: <Inbox /> },
      { path: '/mail/outbox', element: <Outbox /> },
      { path: '/settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/login', element: <Login /> },
      // { path: '/register', element: <Register /> },
      // { path: '/reset-password', element: <ResetPassword /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
