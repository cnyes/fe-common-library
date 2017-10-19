/* eslint-disable import/first,func-names,global-require,prefer-arrow-callback */
import React from 'react';
import { mount } from 'enzyme';
import catNavs from '../config/fund/catNavs';

describe('<SubNavItem />', function() {
  let SubNavItem;
  let makeSubject;
  const mockParams = catNavs[0];

  beforeEach(() => {
    jest.resetModules();

    global.__SERVER__ = false;
    global.__CLIENT__ = true;

    SubNavItem = require('../SubNavItem');

    makeSubject = params => {
      const props = params || mockParams;

      return mount(<SubNavItem {...props} />);
    };
  });

  it('should make a snapshot', () => {
    const subject = makeSubject();

    expect(subject.html()).toMatchSnapshot();
  });

  it('should be nice if !external', () => {
    const subject = makeSubject(catNavs[1]);

    expect(subject.props().external).not.toEqual(true);
    expect(subject.find('Link').length).toEqual(1);
  });

  it('should be nice if external', () => {
    const subject = makeSubject({
      ...catNavs[0],
      subItems: null,
    });

    expect(subject.props().external).toEqual(true);
    expect(subject.find('Link').length).toEqual(0);
  });

  describe('SubNavItemMenu', () => {
    it('should not render if undefined', () => {
      const subject = makeSubject(catNavs[1]);

      expect(subject.props().subItems).not.toBeDefined();
      expect(subject.find('nav').length).toEqual(0);
    });

    it('should not render if []', () => {
      const subject = makeSubject({
        ...catNavs[1],
        subItems: [],
      });

      expect(subject.props().subItems).toEqual([]);
      expect(subject.find('nav').length).toEqual(0);
    });

    it('should be nice', () => {
      const subject = makeSubject(catNavs[0]);

      expect(subject.props().subItems).not.toEqual([]);
      expect(subject.find('nav').length).toEqual(1);
      expect(subject.find('nav a').length).toEqual(catNavs[0].subItems.length);
    });
  });
});
