import React from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../components/useAuth';

function Dashboard() {
  const history = useHistory();
  const { user, signout } = useAuth();

  const handleLogout = () => {
    signout();
    history.push('/login');
  }

  return (
    <div>
      Welcome {user.email}!<br /><br />
      <input
        type="button"
        onClick={handleLogout}
        value="Logout"
      />
    </div>
  );
}

export default Dashboard;