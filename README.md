Keypath
-------

Easily access properties in nested objects and arrays using a dot notation
syntax.

## Installation

Install with **NPM**:
`$ npm install keypath`

## keypath(_keypath_, _object/array_[, callback/re-throw]);

Keypath only exposes one function, so require it and use it.

    var keypath = require('keypath');
    keypath('foo.bar.baz', object);

Keypath takes 2 or 3 arguments.

  * keypath: a string representing the value you want to access.
  * object: the object in which this value resides.
  * callback/rethrow: an optional argument that can be either a function or
    `true`. If you give it a function, this function will be called if an error
    occurs. The error itself will be the callbacks only argument.

    If you pass `true` any error will be re-thrown and you can catch it
    yourself.

    If left out `keypath()` will just return `undefined`.

## Roadmap

I'd like to add setting, that'd be convinient, right? Also adding`@avg` and
the like would be cool. If you don't know what that is read this
[excellent](http://nshipster.com/kvc-collection-operators/) blogpost about
that feature in Cocoa.

## License

See LICENSE.

