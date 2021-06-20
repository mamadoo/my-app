import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import UserImage from '../UserImage';

import './UserListItem.css';

const UserListItem = ({
  id,
  firstName,
  lastName,
  avatar,
}) => {
  const fullName = `${firstName} ${lastName}`;
  return (
    <div className='item'>
      <Link to={`/user/${id}`}>
        <UserImage
          avatar={avatar}
          alt={`Avatar of ${fullName}`}
        />

        <h2>{fullName}</h2>
      </Link>
    </div>
  );
};

UserListItem.propTypes = {
  id: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default UserListItem;
