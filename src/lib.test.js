#!/usr/bin/env node
/**
# [lib.test.js](src/lib.test.js)
> Primary tests for `cno-base64`

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
	import DefaultExport from './lib.js';
	import * as NamespaceExport from './lib.js';
	import { getBase64FromBuffer, getBufferFromBase64 } from './lib.js';
	//## Standard
	//## External
	import Test from 'cno-test';
//# Constants
const FILENAME = 'lib.test.js';
const LOREM_BUFFER = Buffer.from( "Lorem ipsum dolor sit amet biam. ~~~\u00ff\u00ff" );
//## Errors

//# Global Variables
/**## Functions*/
Test.test( 'getBase64FromBuffer:throws', function( t ){
	t.diagnostic( t.name );
	const test_matrix = {
		functions: {
			defaultExport: DefaultExport.getBase64FromBuffer,
			namespaceExport: NamespaceExport.getBase64FromBuffer,
			namedExport: getBase64FromBuffer
		},
		conditions: {
			input_buffer_type: {
				args: [
					true
				],
				expected: {
					instanceOf: TypeError,
					code: 'ERR_INVALID_ARG_TYPE'
				}
			},
			input_buffer_null: {
				args: [
					null
				],
				expected: {
					instanceOf: TypeError,
					code: 'ERR_INVALID_ARG_TYPE'
				}
			},
			input_options_type: {
				args: [
					Buffer.from( [ 0 ] ),
					true
				],
				expected: {
					instanceOf: TypeError,
					code: 'ERR_INVALID_ARG_TYPE'
				}
			}
		}
	};
	for( const function_key of Object.keys( test_matrix.functions ) ){
		var input_function = test_matrix.functions[function_key];
		for( const condition_key of Object.keys( test_matrix.conditions ) ){
			t.diagnostic( `${t.name}:${function_key}:${condition_key}` );
			var condition = test_matrix.conditions[condition_key];
			var bound_function = input_function.bind( null, ...condition.args );
			var validator_function = Test.errorExpected.bind( null, condition.expected );
			Test.assert.throws( bound_function, validator_function );
		}
	}
} );
Test.test( 'getBase64FromBuffer:returns', function( t ){
	t.diagnostic( t.name );
	var test_matrix = {
		functions: {
			defaultExport: DefaultExport.getBase64FromBuffer,
			namespaceExport: NamespaceExport.getBase64FromBuffer,
			namedExport: getBase64FromBuffer
		},
		conditions: {
			input_buffer_default: {
				args: [
					LOREM_BUFFER
				],
				expected: 'TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgYmlhbS4gfn5-w7_Dvw'
			},
			input_options_noop: {
				args: [
					LOREM_BUFFER,
					{
						noop: true
					}
				],
				expected: ''
			},
			input_options_noDefaults: {
				args: [
					LOREM_BUFFER,
					{
						noDefaults: true
					}
				],
				expected: 'TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgYmlhbS4gfn5+w7/Dvw'
			}
		}
	};
	var url_safe = false;
	var padding = false;
	var prefix = false;
	var expected = '';
	for( var i = 1; i <= 2**3; i++ ){
		url_safe = !url_safe;
		if( ( i % 2 ) === 0 ){
			padding = !padding;
		}
		if( ( i % 4 ) === 0 ){
			prefix = !prefix;
		}
		if( url_safe ){
			expected = 'TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgYmlhbS4gfn5-w7_Dvw';
		} else{
			expected = 'TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgYmlhbS4gfn5+w7/Dvw';
		}
		if( padding ){
			expected += '==';
		}
		if( prefix ){
			if( url_safe && padding ){
				expected = 'U'+expected;
			} else if( url_safe ){
				expected = 'u'+expected;
			} else if( padding ){
				expected = 'M'+expected;
			} else{
				expected = 'm'+expected;
			} 
		}
		test_matrix.conditions['option_set_'+i] = {
			args: [
				LOREM_BUFFER,
				{
					urlSafe: url_safe,
					padding: padding,
					prefix: prefix
				}
			],
			expected: expected
		};
	} //for i
	for( const function_key of Object.keys( test_matrix.functions ) ){
		var input_function = test_matrix.functions[function_key];
		for( const condition_key of Object.keys( test_matrix.conditions ) ){
			t.diagnostic( `${t.name}:${function_key}:${condition_key}` );
			var condition = test_matrix.conditions[condition_key];
			var function_return = input_function.apply( null, condition.args );
			//var validator_function = Test.errorExpected.bind( null, condition.expected );
			Test.assert.deepStrictEqual( function_return, condition.expected );
		}
	}
} );
Test.test( 'getBufferFromBase64:throws', function( t ){
	t.diagnostic( t.name );
	const test_matrix = {
		functions: {
			defaultExport: DefaultExport.getBufferFromBase64,
			namespaceExport: NamespaceExport.getBufferFromBase64,
			namedExport: getBufferFromBase64
		},
		conditions: {
			input_string_type: {
				args: [
					true
				],
				expected: {
					instanceOf: TypeError,
					code: 'ERR_INVALID_ARG_TYPE'
				}
			},
			input_string_empty: {
				args: [
					''
				],
				expected: {
					instanceOf: Error,
					code: 'ERR_INVALID_ARG_VALUE'
				}
			},
			input_options_type: {
				args: [
					'Unimportant.',
					true
				],
				expected: {
					instanceOf: TypeError,
					code: 'ERR_INVALID_ARG_TYPE'
				}
			}
		}
	};
	for( const function_key of Object.keys( test_matrix.functions ) ){
		var input_function = test_matrix.functions[function_key];
		for( const condition_key of Object.keys( test_matrix.conditions ) ){
			t.diagnostic( `${t.name}:${function_key}:${condition_key}` );
			var condition = test_matrix.conditions[condition_key];
			var bound_function = input_function.bind( null, ...condition.args );
			var validator_function = Test.errorExpected.bind( null, condition.expected );
			Test.assert.throws( bound_function, validator_function );
		}
	}
} );
Test.test( 'getBufferFromBase64:returns', function( t ){
	t.diagnostic( t.name );
	var test_matrix = {
		functions: {
			defaultExport: DefaultExport.getBufferFromBase64,
			namespaceExport: NamespaceExport.getBufferFromBase64,
			namedExport: getBufferFromBase64
		},
		conditions: {
			input_string_default: {
				args: [
					'TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgYmlhbS4gfn5-w7_Dvw'
				],
				expected: LOREM_BUFFER
			},
			input_options_noOptions: {
				args: [
					'TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgYmlhbS4gfn5-w7_Dvw',
					{
						noop: true,
						noDefaults: true
					}
				],
				expected: null
			},
		}
	};
	var url_safe = false;
	var prefix = false;
	var input_string = '';
	for( var i = 1; i <= 2**2; i++ ){
		url_safe = !url_safe;
		if( ( i % 2 ) === 0 ){
			prefix = !prefix;
		}
		if( url_safe ){
			input_string = 'TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgYmlhbS4gfn5-w7_Dvw';
		} else{
			input_string = 'TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgYmlhbS4gfn5+w7/Dvw';
		}
		if( prefix ){
			if( url_safe ){
				input_string = 'u'+input_string;
			} else{
				input_string = 'm'+input_string;
			} 
		}
		test_matrix.conditions['option_set_'+i] = {
			args: [
				input_string,
				{
					prefix: prefix
				}
			],
			expected: LOREM_BUFFER
		};
	} //for i
	for( const function_key of Object.keys( test_matrix.functions ) ){
		var input_function = test_matrix.functions[function_key];
		for( const condition_key of Object.keys( test_matrix.conditions ) ){
			t.diagnostic( `${t.name}:${function_key}:${condition_key}` );
			var condition = test_matrix.conditions[condition_key];
			var function_return = input_function.apply( null, condition.args );
			//var validator_function = Test.errorExpected.bind( null, condition.expected );
			Test.assert.deepStrictEqual( function_return, condition.expected );
		}
	}
} );

// lib.test.js EOF

