import PropTypes from 'prop-types';

import UserListItem from './UserListItem';

import './UserList.css';

const UserList = ({ users }) => {
  return (
    <div className='container'>
      {
        users.map(user => (
          <UserListItem
            key={user.id}
            firstName={user.first_name}
            lastName={user.last_name}
            avatar={user.avatar}
          />
        ))
      }
    </div>
  );
};

UserList.propTypes = {
  users: PropTypes.array.isRequired,
};

export default UserList;
