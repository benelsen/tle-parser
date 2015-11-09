#!/usr/bin/env node

import Bossy from 'bossy'
import parseTLE from '../'

const definition = {
  h: {
    description: 'Show help',
    alias: 'help',
    type: 'help'
  }
}

const args = Bossy.parse(definition)

if (args instanceof Error) {
  console.error(args.message) // eslint-disable-line no-console
  process.exit(0)
}

if (args.h) {
  console.log(Bossy.usage(definition, 'cat file-with.tle | tle2json > elements.json')) // eslint-disable-line no-console
  process.exit(0)
}

var data = ''

process.stdin.setEncoding('utf8')
process.stdin.on('data', function(chunk) {
  if ( chunk !== null ) {
    data += chunk.toString()
  }
})
process.stdin.on('end', function() {
  const ephemeris = parseTLE(data.trim())
  const json = JSON.stringify(ephemeris)
  process.stdout.write(json)
})
