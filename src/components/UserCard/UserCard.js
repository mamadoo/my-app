import PropTypes from 'prop-types';

import UserImage from '../UserImage';

const UserCard = ({
  email,
  firstName,
  lastName,
  avatar,
}) => {
  return (
    <div>
      <UserImage
        avatar={avatar}
        alt={`Image of ${firstName} ${lastName}`}
      />

      <div>Email: {email}</div>
      <div>First name: {firstName}</div>
      <div>Last name: {lastName}</div>
    </div>
  );
};

UserCard.propTypes = {
  email: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default UserCard;
