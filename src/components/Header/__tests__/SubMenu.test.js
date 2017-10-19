/* eslint-disable import/first,func-names,global-require,prefer-arrow-callback */
import React from 'react';
import { mount } from 'enzyme';

import SubMenu from '../SubMenu';
import navs from '../config/fund/navs';
import mockSubMenu from './mocks/mockSubMenu.json';

describe('<SubMenu/>', function() {
  let makeSubject;

  beforeEach(() => {
    jest.resetModules();

    global.__SERVER__ = false;
    global.__CLIENT__ = true;

    makeSubject = params => {
      const props = params || navs[2];

      return mount(<SubMenu {...props} />);
    };
  });

  it('should make a snapshot', () => {
    const subject = makeSubject({
      ...navs[2],
      request: jest.fn(),
    });

    subject.setState({
      list: mockSubMenu.items.data,
    });

    expect(subject.html()).toMatchSnapshot();
  });

  describe('render submenu-title', () => {
    it('should be nice if url.length', () => {
      const subject = makeSubject();

      expect(subject.props().url.length).not.toEqual(0);
      expect(subject.find('a.submenu-title').length).toEqual(1);
    });

    it('should be nice if !url.length', () => {
      const subject = makeSubject({
        ...navs[0],
        url: '',
      });

      expect(subject.props().url.length).toEqual(0);
      expect(subject.find('a.submenu-title').length).toEqual(0);
    });
  });

  describe('renderPopupMenu', () => {
    it('should not renderPopupMenu if no left and no right', () => {
      const subject = makeSubject(navs[0]);

      expect(subject.find('.popup').length).toEqual(0);
    });

    it('should be nice if leftList and rightList', () => {
      const subject = makeSubject(navs[7]);

      expect(subject.find('.link-wrapper').length).toEqual(1);
      expect(subject.find('.news-list').length).toEqual(1);

      expect(subject.find('.link-wrapper').html()).toContain('基金交易');
      expect(subject.find('.news-list').html()).toContain('交易登入');
      expect(subject.find('.news-list').html()).toContain('鉅亨基金交易平台');
    });

    it('should be nice if catSlug and requst are both defined', () => {
      const subject = makeSubject({
        ...navs[2],
        request: jest.fn(),
      });

      expect(subject.props().catSlug).toBeDefined();
      expect(subject.props().request).toBeDefined();

      subject.setState({
        list: mockSubMenu.items.data,
      });

      expect(subject.find('.news-list').length).toEqual(1);
      expect(subject.find('.news-list a').length).toEqual(mockSubMenu.items.data.length);
      expect(subject.find('.news-list').html()).toContain('新聞頭條');
    });
  });

  describe('load headeline with category', () => {
    it('should load headeline if pros.catSlug is not defined', () => {
      const request = () => {};

      request.get = jest.fn(() => Promise.resolve(mockSubMenu));

      const subject = makeSubject({
        ...navs[1],
        request,
      });

      expect(subject.props().catSlug).not.toBeDefined();
      expect(subject.props().request).toBeDefined();

      subject.simulate('mouseEnter');

      expect(request.get).not.toBeCalled();
    });

    it('should load headeline if pros.catSlug and props.request are both defined', () => {
      const request = () => {};

      request.get = jest.fn(() => Promise.resolve(mockSubMenu));

      const subject = makeSubject({
        ...navs[2],
        request,
      });

      expect(subject.props().catSlug).toBeDefined();
      expect(subject.props().request).toBeDefined();

      subject.simulate('mouseEnter');

      expect(request.get).toBeCalled();
    });
  });
});
