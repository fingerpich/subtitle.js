/**
 * Module dependencies.
 */

var toMS = require('./utils').toMS

/**
 * Expectations.
 */

var INDEX = 'INDEX'
var TIMESTAMP = 'TIMESTAMP'
var TEXT = 'TEXT'

/**
 * Parse the given timestamp.
 */

function parseTimestamp (str) {
  var re = /^(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})$/
  var timestamp = {}
  var match = str.match(re)

  if (match) {
    timestamp.start = match[1]
    timestamp.end = match[2]
    timestamp.duration = toMS(timestamp.end) - toMS(timestamp.start)
  }

  return timestamp
}

/**
 * Parse SRT string.
 * @param {String} srt
 * @return {Array} subtitles
 */

module.exports = function parse (srt) {
  var nodes = []
  var expected = INDEX
  var currentNode

  // Split the string.
  srt = srt.trim().replace(/\r\n/g, '\n').split('\n')

  srt.forEach(function (text) {
    switch (expected) {
      case INDEX:
        currentNode = {}
        nodes.push(currentNode)
        currentNode.index = parseInt(text)
        expected = TIMESTAMP
        return
      case TIMESTAMP:
        var timestamp = parseTimestamp(text)
        currentNode.start = timestamp.start
        currentNode.end = timestamp.end
        currentNode.duration = timestamp.duration
        expected = TEXT
        return
      case TEXT:
        if (!text.trim()) {
          expected = INDEX
          return
        }

        if (!currentNode.hasOwnProperty('text')) {
          currentNode.text = text
        } else {
          currentNode.text += '\n' + text
        }
    }
  })

  return nodes
}
