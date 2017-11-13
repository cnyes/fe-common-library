/* eslint-disable import/first,func-names,global-require,prefer-arrow-callback */
import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Row from '../Row';

describe('Row', () => {
  it('should make a snapshot', () => {
    const subject = mount(<Row />);

    expect(toJson(subject)).toMatchSnapshot();
  });
});
