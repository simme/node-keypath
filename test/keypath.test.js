//
// # Test Keypath
//

var assert  = require('assert');
var keypath = require('./../keypath');

var testObj = {
  foo: 'a',
  bar: 'b',
  baz: 'c',
  boo: 'd',
  arr: [1, 2, 3, {beep: 'boop', loop: 'troop'}],
  obj: {
    a: '1',
    b: '2',
    c: ['a', 'b', 'c', 'd', [1, 2, 3], {beep: 'boop', loop: 'troop'}]
  }
};

var testArr = [
  1,
  2,
  3,
  ['foo', 'bar', 'baz'],
  {foo: 'beep', boop: 'baz'}
];

suite('Test keypath', function () {
  test('Simple key getter', function () {
    var foo = keypath('foo', testObj);
    var bar = keypath('bar', testObj);

    assert.equal(foo, testObj.foo, 'Failed to return simple value.');
    assert.equal(bar, testObj.bar, 'Failed to return simple value.');
  });

  test('Object in array', function () {
    var kp = 'arr[3].loop';
    var expected = 'troop';
    assert.equal(keypath(kp, testObj), expected, 'Wrong/no value returned.');
  });

  test('Accessing undefined property returns undefined', function () {
    var undef = keypath('baboons', testObj);
    assert.equal(undef, undefined, 'Undefined property returned value.');
  });

  test('Object in array in object', function () {
    var kp = 'obj.c[5].beep';
    var ex = 'boop';
    assert.equal(keypath(kp, testObj), ex, 'Failed to return obj in arr in obj.');
  });

  test('Array in array', function () {
    var kp = 'obj.c[4][1]';
    var ex = 2;
    assert.equal(keypath(kp, testObj), ex, 'Failed to return array in array');
  });

  test('Direct array access', function () {
    var kp = '[2]';
    var ex = 3;
    assert.equal(keypath(kp, testArr), ex, 'Failed direct array access.');
  });

  test('Direct array in array', function () {
    var kp = '[3][0]';
    var ex = 'foo';
    assert.equal(keypath(kp, testArr), ex, 'Failed direct array access.');
  });

  test('Object in array', function () {
    var kp = '[4].foo';
    var ex = 'beep';
    assert.equal(keypath(kp, testArr), ex, 'Failed direct array access.');
  });

  test('Re-throws error', function () {
    assert.throws(function () {
      keypath('foobar', testObj, true);
    }, 'Should throw err.');
  });

  test('Error callback', function (done) {
    keypath('foobar', testObj, function (err) {
      assert(err, 'Err is not passed to callback.');
      done();
    });
  });
});

