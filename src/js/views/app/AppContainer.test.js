import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import AppContainer from './AppContainer';

describe('AppContainer', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AppContainer><div/></AppContainer>, div);
  });

  it('renders all the navigation items', () => {
    const wrapper = shallow(<AppContainer><div/></AppContainer>);
    const navLinks = wrapper.find('.nav-link');
    expect(navLinks.length).toBe(2);
  });
});
