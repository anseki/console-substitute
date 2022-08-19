# console-substitute

[![npm](https://img.shields.io/npm/v/console-substitute.svg)](https://www.npmjs.com/package/console-substitute) [![GitHub issues](https://img.shields.io/github/issues/anseki/console-substitute.svg)](https://github.com/anseki/console-substitute/issues) [![dependencies](https://img.shields.io/badge/dependencies-No%20dependency-brightgreen.svg)](package.json) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Polyfill for the String Substitutions by console.

The `console` of web browser supports [the String Substitutions](https://developer.mozilla.org/en-US/docs/Web/API/console#Using_string_substitutions). It is very useful for debugging, etc.  
For example, the multiple variables don't have to be joined by `+`:

```js
console.info('userName: %s, index: %i', userName, index);
```

Output:

```
userName: foo, index: 123
```

But some browsers such as Android browser, etc. don't support it. A big problem is that all arguments except a first argument (i.e. important informations more than first one) are ignored.  
This polyfill implements the String Substitutions to the console that does not support it. This does nothing if the console already supports it.

## Usage

```html
<script src="console-substitute.min"></script>
```

### Methods

The following methods support the String Substitutions:

- `console.log`
- `console.info`
- `console.error`
- `console.warn`

#### Substitution Strings

The following substitution strings are supported:

- `%o`
- `%d`
- `%i`
- `%s`
- `%f`
