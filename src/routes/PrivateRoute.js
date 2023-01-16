import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = (props) => {
  const { user } = useSelector((state) => state.auth);

  //return user && user.isCustomer ? <Outlet /> : <Navigate to="/login" />;

  // if (user && user.isCustomer === 'customer') {
  //   return <Outlet />;
  // } else if (user && user.isCustomer !== 'customer') {
  //   return <Navigate to="/d" />;
  // } else {
  //   return <Navigate to="/login" />;
  // }

  // if (user && user.isCustomer !== 'customer') {
  //  return <Navigate to="/d" />;
  // } else {
  //  return <Navigate to="/login" />;
  // }

  if (props.role) {
    return user ? (
      props.role === user.role ? (
        <Outlet />
      ) : (
        <Navigate to="/denied" />
      )
    ) : (
      <Navigate to="/login" />
    );
  } else {
    return user ? <Outlet /> : <Navigate to="/login" />;
  }
  // };
};
///return user && user.isCustomer ? <Outlet /> : <Navigate to="/login" />;

export default PrivateRoute;
