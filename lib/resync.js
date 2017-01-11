/**
 * Module dependencies.
 */

var utils = require('./utils')

/**
 * Resync the subtitles.
 * @param {Array} subtitles
 * @param {Number} time
 */

module.exports = function resync (subtitles, time) {
  if (!/(-|\+)?\d+/.test(time.toString())) {
    throw new Error('Invalid time: ' + time + '.Expected a valid integer')
  }

  time = parseInt(time, 10)

  return subtitles.map(function (caption) {
    var start = utils.toMS(caption.start)
    var end = utils.toMS(caption.end)

    start = start + time
    end = end + time

    caption.start = start < 0
      ? utils.toSrtTime(0)
      : utils.toSrtTime(start)

    caption.end = end < 0
      ? utils.toSrtTime(0)
      : utils.toSrtTime(end)

    return caption
  })
}
