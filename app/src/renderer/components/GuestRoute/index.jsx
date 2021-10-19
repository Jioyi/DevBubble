import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from 'renderer/contexts/AuthContext';

const GuestRoute = ({ component: Component, ...restOfProps }) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated && user ? 
          (<Redirect to="/home" />)
        : 
          (<Component {...restOfProps} {...props} />)
      }
    />
  );
};

export default GuestRoute;
