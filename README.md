Typed Ip Address  [![Build Status](https://travis-ci.org/westonpace/typed-ip-address.svg?branch=master)](https://travis-ci.org/westonpace/typed-ip-address)


The type definition for [`ip-address`](https://github.com/beaugunderson/ip-address)

## LICENSE

MIT

## Caveats

`ip-address` depends on [`jsbn`](https://www.npmjs.com/package/jsbn) for `BigInteger` support.  The types for `jsbn` are only available as global/ambient types and so cannot be included directly as a dependency.  This means that, to use these typings, you will need to run the following...

```
typings install --save ip-address
typings install --save --global dt~jsbn
```

## Contributing

```sh
# Fork this repo, then
npm install

npm run watch

# add tests, make changes, pass tests ... then [ctrl+c]
npm run publish
```

## Updating

Update `typings.json/version` to match the source version you are typing against.
e.g. if you are creating typings for `chai@3.5.0`, then:

```js
// typings.json
{
  "version": "3.5.0"
  // ...
}
```

----

Generated by [`generator-typings`](https://github.com/typings/generator-typings) 1.0.12
