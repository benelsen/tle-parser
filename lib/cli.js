#!/usr/bin/env node

import fs from 'fs'
import Bossy from 'bossy'
import parseTLE from '../'

const definition = {
  h: {
    description: 'Show help',
    alias: 'help',
    type: 'help',
  },
  o: {
    description: 'Output file',
    alias: 'output',
  },
}

const args = Bossy.parse(definition)

if (args instanceof Error) {
  console.error(args.message) // eslint-disable-line no-console
  process.exit(0)
}

if (args.h) {
  console.log(Bossy.usage(definition, 'tle2json -o elements.json file-with.tle')) // eslint-disable-line no-console
  process.exit(0)
}

let inputStream
if ( args._ && args._[0] ) {
  inputStream = fs.createReadStream(args._[0])
} else {
  inputStream = process.stdin
}

let outputStream
if ( args.o ) {
  outputStream = fs.createWriteStream(args.o)
} else {
  outputStream = process.stdout
}

inputStream.setEncoding('utf8')

let data = ''
inputStream.on('data', function(chunk) {
  if ( chunk !== null ) {
    data += chunk.toString()
  }
})

inputStream.on('end', function() {
  const ephemeris = parseTLE(data.trim())
  const json = JSON.stringify(ephemeris)
  outputStream.write(json)
})
