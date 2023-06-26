import { render } from '@testing-library/react';

import Providers from './providers';

describe('Providers', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Providers />);
    expect(baseElement).toBeTruthy();
  });
});
