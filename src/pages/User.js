import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import axios from 'axios';

import UserCard from '../components/UserCard';

const fetcher = url => axios.get(url)
  .then(res => res.data.data)
  .catch(err => {
    if (err.response.status === 404) {
      const error = new Error('User not found.');
      error.status = 404;
      throw error;
    }

    throw err;
  });

export default function User() {
  const { userId } = useParams();
  const { data: user, error } = useSWR(`https://reqres.in/api/users/${userId}`, fetcher, {
    onErrorRetry: (error) => {
      if (error.status === 404) return;
    },
  });

  if (!userId) {
    return null;
  }

  let content;
  if (error && error.status === 404) {
    content = (
      <p>User not found</p>
    );
  } else if (error) {
    content = (
      <p>Something went wrong</p>
    );
  } else if (!user) {
    content = (
      <p>Loading...</p>
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
