import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...restOfProps }) => {
	const { isAuthenticated } = useSelector((state) => state.auth);

	return (
		<Route
			{...restOfProps}
			render={(props) =>
				isAuthenticated ? (
					<Component {...restOfProps} {...props} />
				) : (
					<Redirect to="/" />
				)
			}
		/>
	);
};

export default ProtectedRoute;
