const { EventEmitter } = require('events')
const { createServer } = require('http')
const { inspect } = require('util')

const ee = new EventEmitter()

// By default, event listeners are invoked in the order they are added.
// If there is a case when a listener needs to be added to the begining
// prependListener method could be used.

// The EventEmitter calls all listeners synchronously in the order in which they were registered
// This ensures the proper sequencing of events and helps avoid race conditions and logic errors.
// When appropriate, listener functions can switch to an asynchronous mode of operation using
// the setImmediate() or process.nextTick()

let m = 0
ee.on('request', function incrementCounter () {
  m += 1
})
ee.on('request', function syncLog () {
  console.log(`sync m is ${m}`)
})
ee.on('request', function asyncLog () {
  process.nextTick(() => {
    console.log(`async m is ${m}`)
  })
})
ee.on('request', function inspectListeners () {
  console.log(inspect(ee.listeners('request')))
})
ee.on('request', function removeListeners () {
  if (m === 1) {
    ee.removeAllListeners()
  }
})

// If an EventEmitter does not have at least one listener registered
// for the 'error' event, and an 'error' event is emitted, the error is thrown,
// a stack trace is printed, and the Node.js process exits.
ee.on('error', function errorHandler (error) {
  console.error(`error found: ${error.message}`)
  console.error(error)
})

const server = createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.write(JSON.stringify({ message: 'hello :)' }))
  ee.emit('request')
  res.end()
})

const PORT = 9000
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} - pid: ${process.pid}`)
})

process.on('beforeExit', code => {
  console.log(`beforeExit code: ${code}`)
})

process.on('exit', code => {
  console.log(`exit code: ${code}`)
})
