/**
 * Module dependencies.
 */

var parseTimestamps = require('./utils').parseTimestamps
var extend = require('xtend/mutable')

/**
 * Expectations.
 */

var INDEX = 'INDEX'
var TIMESTAMP = 'TIMESTAMP'
var TEXT = 'TEXT'

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
        var timestamps = parseTimestamps(text)
        extend(currentNode, timestamps)
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
