import { Route, Redirect, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useAuth } from './useAuth';

function PrivateRoute({ component: Component, ...rest }) {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => user ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: location } }} />}
    />
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
