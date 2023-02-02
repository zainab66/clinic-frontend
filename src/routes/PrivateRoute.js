import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = (props) => {
  const { user } = useSelector((state) => state.auth);
  if (props.role) {
    return user ? (
      props.role === user.role ? (
        <Outlet />
      ) : (
        <Navigate to="/assistance/dashboard" />
      )
    ) : (
      <Navigate to="/login" />
    );
  } else {
    return user ? <Outlet /> : <Navigate to="/login" />;
  }
};

export default PrivateRoute;
