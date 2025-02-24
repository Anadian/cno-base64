
# [lib.js](src/lib.js)
> cno-base64: Micropackage: convert between a NodeJS Buffer and a base64-encoded string with optional URL-safe alphabet, padding, and MultiBase prefix.

Author: Anadian

Code license: MIT
```
	Copyright 2024 Anadian
	Permission is hereby granted, free of charge, to any person obtaining a copy of this 
software and associated documentation files (the "Software"), to deal in the Software 
without restriction, including without limitation the rights to use, copy, modify, 
merge, publish, distribute, sublicense, and/or sell copies of the Software, and to 
permit persons to whom the Software is furnished to do so, subject to the following 
conditions:
	The above copyright notice and this permission notice shall be included in all copies 
or substantial portions of the Software.
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE 
OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
Documentation License: [![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/)
> The source-code comments and documentation are written in [GitHub Flavored Markdown](https://github.github.com/gfm/).


## Functions

### getBase64FromBuffer
> Returns a Base64 string with optional URL-safe alphabet, padding, and MultiBase prefix.

#### Parametres
| name | type | description |
| --- | --- | --- |
| input_buffer | Buffer | The Node Buffer to convert to Base64.  |
| input_options | object | Run-time options. \[default: {}\] |

##### `options` Properties
| name | type | default | description |
| noop | boolean | false | Skip primary functionality. |
| noDefaults | boolean | false | Don't apply static default options. |
| noDynamic | boolean | false | Don't apply dynamic default options. |
| urlSafe | boolean | true | True to use the [URL-Safe variant of Base64](https://datatracker.ietf.org/doc/html/rfc4648.html#section-5). |
| padding | boolean | false | True to include '=' padding characters. |
| prefix | boolean | false | True to prefix the returned string with the respective [MultiBase](https://github.com/multiformats/multibase) code. |

#### Returns
| type | description |
| --- | --- |
| string | The Base64-encoded string. |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_INVALID_ARG_TYPE' | TypeError | Thrown if a given argument isn't of the correct type. |

#### History
| version | change |
| --- | --- |
| 0.0.1 | WIP |


### getBufferFromBase64
> Returns a Node Buffer for the given Base64-encoded string with automatic MultiBase prefix removal.

#### Parametres
| name | type | description |
| --- | --- | --- |
| input_string | object | The Base64-encoded string.  |
| input_options | object | Run-time options. \[default: {}\] |

##### `options` Properties
| name | type | default | description |
| noop | boolean | false | Skip primary functionality. |
| noDefaults | boolean | false | Don't apply static default options. |
| noDynamic | boolean | false | Don't apply dynamic default options. |
| prefix | boolean | false | Set to `True`, to remove a MultiBase prefix from the input string. |

#### Returns
| type | description |
| --- | --- |
| Buffer | A Node buffer of the data encoded in the given Base64 string. |

#### Throws
| code | type | condition |
| --- | --- | --- |
| 'ERR_INVALID_ARG_TYPE' | TypeError | Thrown if a given argument isn't of the correct type. |

#### History
| version | change |
| --- | --- |
| 0.0.1 | WIP |

