import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from 'renderer/contexts/AuthContext';

const ProtectedRoute = ({ component: Component, ...restOfProps }) => {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated && user ? 
          (<Component {...restOfProps} {...props} />) 
        : 
          (<Redirect to="/" />)
      }
    />
  );
};

export default ProtectedRoute;
