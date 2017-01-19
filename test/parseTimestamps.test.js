/**
 * Dependencies.
 */

const test = require('ava')
const { parseTimestamps } = require('../lib/utils')

/**
 * Tests for `parseTimestamps` function.
 */

test('should parse the timestamps', t => {
  const str = '00:00:50,000 --> 00:00:53,000'
  const value = parseTimestamps(str)
  const expected = {
    start: '00:00:50,000',
    end: '00:00:53,000',
    duration: 3000
  }

  t.deepEqual(value, expected)
})
