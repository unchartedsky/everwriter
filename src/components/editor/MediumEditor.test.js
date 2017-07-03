import React from 'react';
import { shallow } from 'enzyme';
import MediumEditor from './MediumEditor';

it('renders without crashing', () => {
  shallow(<MediumEditor />);
});
