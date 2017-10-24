/* eslint-disable import/first,func-names,global-require,prefer-arrow-callback */

import getStyleName from '../getStyleName';

describe('getStyleName', () => {
  it('should return nice, if styles[name] is defined', () => {
    const styles = {
      test: 'abcdef',
    };
    const name = 'test';

    expect(getStyleName(styles, name)).toEqual('abcdef');
  });

  it('should return nice, if styles[name] is undefined', () => {
    const styles = {
      test: 'abcdef',
    };
    const name = 'test123';

    expect(getStyleName(styles, name)).toEqual(name);
  });
});
