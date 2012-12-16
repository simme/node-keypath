//
// # Keypath
//
// Easily access properties within nested objects and arrays using
// dot notation.
//
// **kp** Keypath to access.
// **object** Object/array to traverse.
// **fn** Error callback `function (err) {..}` or true to re-throw any errors.
//
function keypath(kp, object, fn) {
  var parts = kp.split('.');
  var len   = parts.length;
  var root  = object;

  try {
    for (var i = 0; i < len; i++) {
      var p = parts[i];

      // Handle arrays
      var keys = p.match(/^(.*?)(?:\[(.*)\])$/);
      if (keys) {
        var arrprop = keys[1];
        var arrkey  = keys[2].split('][');
        if (arrprop.length > 0) {
          root = root[arrprop];
        }

        do {
          root = root[arrkey.shift()];
        } while (arrkey.length);
      }
      else {
        root = root[p];
        if (typeof root === 'undefined' && fn) {
          throw new Error(kp + ' is undefined.');
        }
      }
    }
  }
  catch (err) {
    root = undefined;
    if (typeof fn === 'function') {
      fn(err);
    }
    // Re-throw err
    else if (typeof fn === 'boolean' && fn) {
      throw err;
    }
  }

  return root;
}

module.exports = keypath;

