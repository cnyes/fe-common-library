/* eslint-disable import/first,func-names,global-require,prefer-arrow-callback */
jest.mock('react-router');

import React from 'react';
import { mount, shallow } from 'enzyme';

describe('Footer component test', () => {
  let Footer;
  let now;

  beforeEach(() => {
    jest.resetModules();
    Footer = require('../Footer');

    now = +new Date(2016, 9, 1);
  });

  it('should be same as snapshot', () => {
    const wrapper = mount(<Footer now={now} />);
    const tree = wrapper.html();

    expect(tree).toMatchSnapshot();
  });

  it('should has 19 anchor tags', () => {
    const wrapper = shallow(<Footer now={now} />);

    expect(wrapper.find('a').length).toEqual(11);
  });

  it('should has a <footer> tag which has class named `main-footer`', () => {
    const wrapper = shallow(<Footer now={now} />);

    expect(
      wrapper
        .find('footer')
        .first()
        .hasClass('main-footer')
    ).toBeTruthy();
  });
});
