'use strict';

const hContext = require('..');
const assert = require('assert').strict;

assert.strictEqual(hContext(), 'Hello from hContext');
console.info('hContext tests passed');
