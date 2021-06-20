import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useAuth } from './useAuth';

function PublicRoute({ component: Component, ...rest }) {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => !user ? <Component {...props} /> : <Redirect to={{ pathname: '/' }} />}
    />
  )
}

PublicRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default PublicRoute;