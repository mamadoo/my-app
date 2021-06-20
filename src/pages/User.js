import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import UserCard from '../components/UserCard';

export default function User() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleGetUser = useCallback(() => {
    setLoading(true);
    setError(false);
    axios.get(`https://reqres.in/api/users/${userId}`)
      .then(response => {
        setLoading(false);
        if (response.data && response.data.data) {
          setUser(response.data.data);
        }
      })
      .catch(error => {
        setLoading(false);
        setError(true);
      });
  }, [userId]);

  useEffect(() => {
    handleGetUser();
  }, [handleGetUser]);

  const handleRetry = () => {
    handleGetUser();
  };

  if (!userId) {
    return null;
  }

  let content;
  if (error) {
    content = (
      <p>Something went wrong <button onClick={handleRetry}>Retry</button></p>
    );
  } else if (loading) {
    content = (
      <p>Loading...</p>
    );
  } else if (!user) {
    content = (
      <p>User not found</p>
    );
  } else {
    content = (
      <UserCard
        email={user.email}
        firstName={user.first_name}
        lastName={user.last_name}
        avatar={user.avatar}
      />
    );
  }

  return (
    <div>
      {content}
    </div>
  );
}
