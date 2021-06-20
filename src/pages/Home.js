import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useAuth } from '../components/useAuth';
import UserList from '../components/UserList';

function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useAuth();

  const handleGetUsers = () => {
    setLoading(true);
    setError(false);
    axios.get('https://reqres.in/api/users?page=2')
      .then(response => {
        setLoading(false);
        if (response.data && response.data.data) {
          setUsers(response.data.data);
        }
      })
      .catch(error => {
        setLoading(false);
        setError(true);
      });
  };

  useEffect(() => {
    if (user) {
      handleGetUsers();
    }
  }, [user]);

  const handleRetry = () => {
    if (user) {
      handleGetUsers();
    }
  };

  let content;
  if (!user) {
    content = (
      <p>Please <Link to='/login'>login</Link> to see users list.</p>
    );
  } else if (error) {
    content = (
      <p>Something went wrong <button onClick={handleRetry}>Retry</button></p>
    );
  } else if (loading) {
    content = (
      <p>Loading...</p>
    );
  } else if (!users || !users.length) {
    content = (
      <p>There is no user</p>
    );
  } else {
    content = (
      <UserList users={users} />
    );
  }

  return (
    <div>
      Welcome to the Home Page!

      {content}
    </div>
  );
}

export default Home;
