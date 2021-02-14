import assert from 'assert';

import getCoords from '../../src/utils/getCoords';

describe('getCoords', () => {
  beforeEach(() => {
    global.document = {
      body: {},
      documentElement: {}
    };
    global.window = {};
  });
  it('coords', () => {
    const box = {top: 10, left: 20};
    const coords = getCoords(box);

    assert.equal(coords.top, 10);
    assert.equal(coords.left, 20);
  });
});

