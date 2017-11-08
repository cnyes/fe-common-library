/* eslint-disable import/first,func-names,global-require,prefer-arrow-callback */
import React from 'react';
import { mount } from 'enzyme';
import SubNavItem from '../SubNavItem';
import catNavs from '../config/fund/catNavs';

describe('<SubNavItem />', function() {
  const mockParams = catNavs[0];
  let makeSubject;
  let Link;

  beforeEach(() => {
    jest.resetModules();

    global.__SERVER__ = false;
    global.__CLIENT__ = true;

    Link = jest.fn(() => <div className="mock-link" />);

    makeSubject = params => {
      const props = params || mockParams;

      return mount(<SubNavItem {...props} />);
    };
  });

  it('should make a snapshot', () => {
    const subject = makeSubject();

    expect(subject.html()).toMatchSnapshot();
  });

  describe('render !external', () => {
    it('should be nice if props.Link is defined', () => {
      const subject = makeSubject({
        ...catNavs[1],
        Link,
      });

      expect(subject.props().external).not.toEqual(true);
      expect(subject.props().Link).toBeDefined();
      expect(subject.find('.mock-link').length).toEqual(1);
    });

    it('should be nice if props.Link is undefined', () => {
      const subject = makeSubject(catNavs[1]);

      expect(subject.props().external).not.toEqual(true);
      expect(subject.props().Link).not.toBeDefined();
      expect(subject.find('.mock-link').length).toEqual(0);
      expect(subject.find('a').length).toEqual(1);
    });
  });

  describe('render external', () => {
    it('should be nice if props.Link is defined', () => {
      const subject = makeSubject({
        ...catNavs[0],
        subItems: null,
        Link,
      });

      expect(subject.props().external).toEqual(true);
      expect(subject.props().Link).toBeDefined();
      expect(subject.find('.mock-link').length).toEqual(0);
      expect(subject.find('a').length).toEqual(1);
    });

    it('should be nice if props.Link is undefined', () => {
      const subject = makeSubject({
        ...catNavs[0],
        subItems: null,
      });

      expect(subject.props().external).toEqual(true);
      expect(subject.props().Link).not.toBeDefined();
      expect(subject.find('.mock-link').length).toEqual(0);
      expect(subject.find('a').length).toEqual(1);
    });
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
