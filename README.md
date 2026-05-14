# JSON5

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

JSON5 is an extension to the popular JSON file format that aims to be easier to **write and maintain _by hand_ (e.g. for config files)**. It is _not intended_ to be used for machine-to-machine communication.

## Features
The following ECMAScript 5.1 features, which are not supported in JSON, have been extended to JSON5:

- Object keys may be an ECMAScript 5.1 _[IdentifierName]_.
- Objects may have a single trailing comma.
- Arrays may have a single trailing comma.
- Strings may be single quoted.
- Strings may span multiple lines by escaping new line characters.
- Strings may include character escapes.
- Numbers may be hexadecimal.
- Numbers may have a leading or trailing decimal point.
- Numbers may be [IEEE 754] positive infinity, negative infinity, and NaN.
- Numbers may begin with an explicit plus sign.
- Single and multi-line comments are allowed.
- Additional white space characters are allowed.

## Specification
For a detailed explanation of the JSON5 format, please read the [official specification](https://json5.github.io/json5-spec/).

## Usage

```js
import { JSON5 } from "https://code4fukui.github.io/JSON5/JSON5.js";

const s = `{
  a: "abc", // comment
  b: 123, /* comment */
}`;

const obj = JSON5.parse(s);
console.log(obj);
const s2 = JSON5.stringify(obj);
console.log(s2);
```

## CLI
This package includes a CLI for converting JSON5 to JSON and for validating the syntax of JSON5 documents.

## Contributing
When contributing code, please write relevant tests and run `npm test` and `npm run lint` before submitting pull requests.

## Security Vulnerabilities and Disclosures
To report security vulnerabilities, please contact the maintainers directly.

[IdentifierName]: https://www.ecma-international.org/ecma-262/5.1/#sec-7.6
[IEEE 754]: http://ieeexplore.ieee.org/servlet/opac?punumber=4610933