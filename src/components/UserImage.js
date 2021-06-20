import PropTypes from 'prop-types';

export default function UserImage({
  avatar,
  alt,
}) {
  return (
    <img
      src={avatar}
      alt={alt}
      width={128}
      height={128}
    />
  );
}

UserImage.propTypes = {
  avatar: PropTypes.string.isRequired,
  alt: PropTypes.string,
};
