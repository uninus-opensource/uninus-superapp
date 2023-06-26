import { render } from '@testing-library/react';

import Modules from './modules';

describe('Modules', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Modules />);
    expect(baseElement).toBeTruthy();
  });
});
