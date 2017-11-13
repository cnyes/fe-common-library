/* eslint-disable import/first,func-names,global-require,prefer-arrow-callback */
import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Header from '../Header';
import { navs, catNavs } from '../config/fund/FundConfig';

describe('<Header/>', function() {
  let makeSubject;
  let Link;

  beforeEach(() => {
    jest.resetModules();

    const testParams = {
      catNavs,
      channel: '基金',
      location: {
        pathname: '/news/cat/headline',
        search: '',
        state: {},
        action: '',
        key: '',
      },
      navs,
      newsBaseUrl: '',
      toggleFixedHeader: jest.fn(),
    };

    Link = jest.fn(() => <div className="mock-link" />);
    makeSubject = (params = {}) => {
      const props = {
        ...testParams,
        ...params,
      };

      return mount(<Header {...props} />);
    };
  });

  it('should match snapshot', () => {
    const subject = makeSubject();

    expect(subject.find('SubMenu').length).toEqual(navs.length);
    expect(subject.find('SubNavItem').length).toEqual(catNavs.length * 2);

    expect(toJson(subject)).toMatchSnapshot();
  });

  describe('catNavs', () => {
    it('should be nice if it is undefined', () => {
      const subject = makeSubject({
        catNavs: undefined,
      });

      expect(subject.find('SubNavItem').length).toEqual(0);
    });

    it('should be nice if it has no data', () => {
      const subject = makeSubject({
        catNavs: [],
      });

      expect(subject.find('SubNavItem').length).toEqual(0);
    });

    it('should be nice if it has data', () => {
      const subject = makeSubject();

      expect(subject.find('SubNavItem').length).not.toEqual(0);
    });
  });

  describe('displayChannelName', () => {
    it('should be nice if it is true', () => {
      const subject = makeSubject();
      const channelName = subject.props().channel;

      expect(subject.props().displayChannelName).toEqual(true);
      expect(subject.find('.logo-wrapper').html()).toContain(channelName);
    });

    it('should be nice if it is false', () => {
      const subject = makeSubject({
        displayChannelName: false,
      });
      const channelName = subject.props().channelName;

      expect(subject.props().displayChannelName).toEqual(false);
      expect(subject.find('.logo-wrapper').html()).not.toContain(channelName);
    });

    it('should be a Link component', () => {
      const subject = makeSubject({ Link });

      expect(subject.props().Link).toBeDefined();
      expect(subject.find('.logo-wrapper .mock-link').length).toEqual(1);
    });

    it('should be an a tag', () => {
      const subject = makeSubject();

      expect(subject.props().Link).not.toBeDefined();
      expect(subject.find('.logo-wrapper .mock-link').length).toEqual(0);
      expect(subject.find('.logo-wrapper').html()).toContain('channel-label');
    });
  });

  describe('stickySubHeader', () => {
    describe('when true', () => {
      it('should add event listener to window', () => {
        window.addEventListener = jest.fn();
        makeSubject({ stickySubHeader: true });

        expect(window.addEventListener).toHaveBeenCalledTimes(1);
        expect(window.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
      });
    });

    describe('when false', () => {
      it('should add event listener to window', () => {
        window.addEventListener = jest.fn();
        makeSubject({ stickySubHeader: false });

        expect(window.addEventListener).toHaveBeenCalledTimes(0);
      });
    });
  });
});
