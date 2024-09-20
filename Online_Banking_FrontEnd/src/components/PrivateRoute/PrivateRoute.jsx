import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component }) => {
  const result = useSelector((state) => state["Online Banking Appln"]);

  return result.token ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
