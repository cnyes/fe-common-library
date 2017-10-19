/* eslint-disable import/first,func-names,global-require,prefer-arrow-callback */
import React from 'react';
import { mount } from 'enzyme';
import Row from '../Row';

describe('Row', () => {
  it('should make a snapshot', () => {
    const subject = mount(<Row />);

    expect(subject.html()).toMatchSnapshot();
  });
});
