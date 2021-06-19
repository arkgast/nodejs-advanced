const { PassThrough, pipeline } = require('stream')
const { createReadStream, createWriteStream } = require('fs')

const passThrough = new PassThrough()
const inputStream = createReadStream('input.csv')
const outputStream = createWriteStream('output.csv')

passThrough.on('data', chunk => {
  const str = chunk.toString()
  console.log(`passThrough received data: ${str}`)
})

// Using pipeline simplifies error handling and stream cleanup,
// and makes combining streams in complex ways more straightforward.
// When an error occurs using pipeline all streams are gonna be destroyed
// by doing so the resources are gonna be released and it also prevents
// memory leaks thanks to the destroy streams step.

console.log('Starting pipeline...')
pipeline(inputStream, passThrough, outputStream, error => {
  if (error) {
    console.log(`Pipeline failed with an error: ${error.message}`)
  } else {
    console.log('Pipeline ended successfully')
  }
})

// It will generate an error after 5 seconds
// If input.csv file is big enough it will pass some data to the output stream
// meanwhile that happens the error is gonna happen and the stream will end up
setTimeout(() => {
  passThrough.emit('error', new Error('Error 💥!'))
}, 1000)
