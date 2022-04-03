import { render } from '@testing-library/react';

import TextField from './text-field';

describe('TextField', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TextField id="test" label="Test" />);
    expect(baseElement).toBeTruthy();
  });
  it('label should display text', () => {
    const { getByText } = render(<TextField id="test" label="Test" />);
    expect(getByText('Test')).toBeTruthy();
  });
});
