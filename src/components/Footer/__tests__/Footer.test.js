/* eslint-disable import/first,func-names,global-require,prefer-arrow-callback */
import React from 'react';
import { mount, shallow } from 'enzyme';
import Footer from '../Footer';

describe('Footer component test', () => {
  let Link;
  let now;

  beforeEach(() => {
    jest.resetModules();

    Link = jest.fn(() => <div className="mock-link" />);
    now = +new Date(2016, 9, 1);
  });

  it('should be same as snapshot', () => {
    const wrapper = mount(<Footer now={now} />);
    const tree = wrapper.html();

    expect(tree).toMatchSnapshot();
  });

  it('should has 11 anchor tags if props.Link is defined', () => {
    const wrapper = shallow(<Footer now={now} Link={Link} />);

    expect(wrapper.find('a').length).toEqual(11);
    expect(wrapper.html()).toContain('mock-link');
  });

  it('should has 12 anchor tags if props.Link is undefined', () => {
    const wrapper = shallow(<Footer now={now} />);

    expect(wrapper.find('a').length).toEqual(12);
    expect(wrapper.find('.mock-link').length).toEqual(0);
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
