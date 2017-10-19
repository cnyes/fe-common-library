/* eslint-disable import/first,func-names,global-require,prefer-arrow-callback */
import links from '../links';

describe('links', () => {
  it('should make a snapshot', () => {
    expect(links).toMatchSnapshot();
  });
});
