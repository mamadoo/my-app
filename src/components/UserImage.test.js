import { render } from '@testing-library/react'

import UserImage from './UserImage';

describe('<UserImage />', () => {
  it('Must have src="http://image/" and alt="image"', () => {
    const { getByRole } = render(
      <UserImage
        avatar='http://image/'
        alt='image'
      />
    );

    const image = getByRole('img');
    expect(image.src).toEqual('http://image/');
    expect(image.alt).toEqual('image');
  });
});
