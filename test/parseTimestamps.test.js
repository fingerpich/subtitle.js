/**
 * Dependencies.
 */

const test = require('ava')
const { parseTimestamps } = require('../lib/utils')

/**
 * Tests for `parseTimestamps` function.
 */

test('should parse the timestamps', t => {
  const data = [
    {
      srtTime: '00:00:50,000 --> 00:00:53,000',
      expected: {
        start: '00:00:50,000',
        end: '00:00:53,000',
        duration: 3000
      }
    },
    {
      srtTime: '00:02:22,542 --> 00:02:25,284',
      expected: {
        start: '00:02:22,542',
        end: '00:02:25,284',
        duration: 2742
      }
    },
    {
      srtTime: '02:13:01,305 --> 02:13:07,267',
      expected: {
        start: '02:13:01,305',
        end: '02:13:07,267',
        duration: 5962
      }
    }
  ]

  data.forEach(obj => {
    const value = parseTimestamps(obj.srtTime)
    t.deepEqual(value, obj.expected)
  })
})
