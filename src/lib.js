#!/usr/bin/env node
/**
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

*/

//# Dependencies
	//## Internal
	//## Standard
	//## External
//# Constants
const FILENAME = 'lib.js';
//## Errors

//# Global Variables
/**## Functions*/
/**
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
*/
function getBase64FromBuffer( input_buffer, input_options = {} ){
	const FUNCTION_NAME = 'getBase64FromBuffer';
	const DEFAULT_OPTIONS = {
		noop: false, // Skip primary functionality.
		noDefaults: false, // Don't apply static default options.
		noDynamic: false, // Don't apply dynamic default options.
		urlSafe: true, // True to use the [URL-Safe variant of Base64](https://datatracker.ietf.org/doc/html/rfc4648.html#section-5).
		padding: false, // True to include '=' padding characters.
		prefix: false, // True to prefix the returned string with the respective [MultiBase](https://github.com/multiformats/multibase) code.
	};//Variables
	var arguments_array = Array.from(arguments);
	var _return = '';
	var return_error = null;
	var options = {};
	var base64_string = '';
	this?.logger?.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `received: ${arguments_array}`});
	//Parametre checks
	if( Buffer.isBuffer(input_buffer) === false ){
		return_error = new TypeError('Param "input_buffer" is not of type Buffer.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}
	if( typeof(input_options) !== 'object' ){
		return_error = new TypeError('Param "input_options" is not of type object.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}

	// Options
	if( input_options.noDefaults !== true ){
		options = Object.assign( options, DEFAULT_OPTIONS, input_options );
	} else{
		options = Object.assign( options, input_options );
	}
	if( options.noop !== true ){
		// Function
		if( options.urlSafe === true && options.padding === false ){
			base64_string = input_buffer.toString('base64url'); //Node's base64url already removes padding.
			if( options.prefix === true ){
				base64_string = 'u' + base64_string;
			}
		} else{
			base64_string = input_buffer.toString('base64');
			if( options.urlSafe === true ){ //options.padding must be true.
				base64_string = base64_string.replaceAll( '+', '-' ).replaceAll( '/', '_' );
				if( options.prefix === true ){
					base64_string = 'U' + base64_string;
				}
			} else if( options.padding !== true ){ //Not URL but still need to remove padding.
				base64_string = base64_string.replaceAll( '=', '' );
				if( options.prefix === true ){
					base64_string = 'm' + base64_string;
				}
			} else if( options.prefix === true ){ //base64_string already has what we need so all that's left is to possibly prepend the multiformat code.
				base64_string = 'M' + base64_string;
			}
		}
		_return = base64_string;
	} // noop
	//Return
	this?.logger?.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
} // getBase64FromBuffer
/**
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
*/
function getBufferFromBase64( input_string, input_options = {} ){
	const FUNCTION_NAME = 'getBufferFromBase64';
	const DEFAULT_OPTIONS = {
		noop: false, // Skip primary functionality.
		noDefaults: false, // Don't apply static default options.
		noDynamic: false, // Don't apply dynamic default options.
		prefix: false, // Set to `true`, to remove a MultiBase prefix from the input string.
	};
	//Variables
	var arguments_array = Array.from(arguments);
	var _return = null;
	var return_error = null;
	var options = {};
	var base64_string = '';
	this?.logger?.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `received: ${arguments_array}`});
	//Parametre checks
	if( typeof(input_string) !== 'string' ){
		return_error = new TypeError('Param "input_string" is not of type object.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	} else if( input_string == '' ){
		return_error = new Error(`Param "input_string" is an empty string`);
		return_error.code = 'ERR_INVALID_ARG_VALUE';
		throw return_error;
	}
	if( typeof(input_options) !== 'object' ){
		return_error = new TypeError('Param "input_options" is not of type object.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}

	// Options
	if( input_options.noDefaults !== true ){
		options = Object.assign( options, DEFAULT_OPTIONS, input_options );
	} else{
		options = Object.assign( options, input_options );
	}
	if( options.noop !== true ){
		// Function
		if( options.prefix === true ){
			base64_string = input_string.slice( 1 );
		} else{
			base64_string = input_string;
		}
		try{
			_return = Buffer.from( base64_string, 'base64' );
		} catch(error){
			return_error = new Error(`Buffer.from threw an error: ${error}`);
			throw return_error;
		}
	} // noop
	//Return
	this?.logger?.log({file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
} // getBufferFromBase64

const NAMESPACE = { getBufferFromBase64: getBufferFromBase64, getBase64FromBuffer: getBase64FromBuffer };
export { NAMESPACE as default, getBufferFromBase64, getBase64FromBuffer };

// lib.js EOF

