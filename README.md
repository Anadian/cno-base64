# cno-base64
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![Semantic Versioning 2.0.0](https://img.shields.io/badge/semver-2.0.0-brightgreen?style=flat-square)](https://semver.org/spec/v2.0.0.html)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square)](https://conventionalcommits.org)
[![License](https://img.shields.io/github/license/Anadian/cno-base64)](https://github.com/Anadian/cno-base64/blob/main/LICENSE)
[![ci](https://github.com/Anadian/cno-base64/actions/workflows/ci.yml/badge.svg)](https://github.com/Anadian/cno-base64/actions/workflows/ci.yml)
[![NPM Version](https://img.shields.io/npm/v/cno-base64)](https://www.npmjs.com/package/cno-base64)
[![Coverage Status](https://coveralls.io/repos/github/Anadian/cno-base64/badge.svg?branch=main)](https://coveralls.io/github/Anadian/cno-base64?branch=main)


> Micropackage: convert between a NodeJS Buffer and a base64-encoded string with optional URL-safe alphabet, padding, and MultiBase prefix.
# Table of Contents
- [Background](#Background)
- [Install](#Install)
- [Usage](#Usage)
- [API](#API)
- [Contributing](#Contributing)
- [License](#License)
# Background
# Install
Available on the [npm registry](https://www.npmjs.com/package/cno-base64) as `cno-base64`.
Add it to a project with [pnpm](https://pnpm.io/cli/add):
```sh
pnpm add --save cno-base64
```
It can, of course, also be installed by [npm](https://docs.npmjs.com/cli/v8/commands/npm-install) or [yarn](https://yarnpkg.com/getting-started/usage) using the normal methods.
# Usage
```js
import Base64NS from 'cno-base64'; // Default export is a full "namespace".
import { getBase64FromBuffer, getBufferFromBase64 } from 'cno-base64'; // Just the functions.
```
# API
See [API.md](API.md) for full API.
# Contributing
Changes are tracked in [CHANGELOG.md](CHANGELOG.md).
# License
MIT ©2024 

SEE LICENSE IN [LICENSE](LICENSE)

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/)This project's documentation is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/).
