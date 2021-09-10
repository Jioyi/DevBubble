import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const GuestRoute = ({ component: Component, ...restOfProps }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? (
          <Redirect to="/home" />
        ) : (
          <Component {...restOfProps} {...props} />
        )
      }
    />
  );
};

export default GuestRoute;
