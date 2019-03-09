import React from 'react';
import { render } from 'enzyme';
import Header from '../Header';

describe('< Header Component />', () => {
  it('should render a div', () => {
    const wrapper = render(<Header />);
    expect(wrapper.find('div').length).toBe(1);
  });
});
