import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import AppContainer from './AppContainer';

describe('AppContainer', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AppContainer><div/></AppContainer>, div);
  });
});
