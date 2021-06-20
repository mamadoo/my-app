import PropTypes from 'prop-types';

import './UserListItem.css';

const UserListItem = ({
  firstName,
  lastName,
  avatar,
}) => {
  const fullName = `${firstName} ${lastName}`;
  return (
    <div className='item'>
      <img
        src={avatar}
        alt={`Avatar of ${fullName}`}
        width={128}
        height={128}
      />

      <h2>{fullName}</h2>
    </div>
  );
};

UserListItem.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default UserListItem;
