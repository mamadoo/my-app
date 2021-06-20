import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

import { useAuth } from '../components/useAuth';
import UserList from '../components/UserList';

import './Home.css';

function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pageCount, setPageCount] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const { user } = useAuth();

  const handleGetUsers = (selectedPage = 0) => {
    setLoading(true);
    setError(false);
    axios.get(`https://reqres.in/api/users?page=${selectedPage + 1}`)
      .then(response => {
        setLoading(false);
        if (response.data) {
          setPageCount(response.data.total_pages);
          if (response.data.data) {
            setUsers(response.data.data);
          }
        }
      })
      .catch(error => {
        setLoading(false);
        setError(true);
      });
  };

  const handlePageClick = data => {
    setPageNumber(data.selected);
    handleGetUsers(data.selected);
  };

  useEffect(() => {
    if (user) {
      handleGetUsers();
    }
  }, [user]);

  const handleRetry = () => {
    handleGetUsers();
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
      <>
        <ReactPaginate
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          disableInitialCallback
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
          initialPage={0}
          forcePage={pageNumber}
          force
        />

        <UserList users={users} />
      </>
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
