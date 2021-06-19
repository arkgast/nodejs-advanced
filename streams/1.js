const fs = require('fs')
const { PassThrough } = require('stream')

const passThrough = new PassThrough()
const outputStream = fs.createWriteStream('file.csv')

passThrough.on('data', chunk => {
  // all data that comes as a Buffer by default
  const str = chunk.toString('utf-8')
  console.log(`passThrough data event chunk: ${str}`)
})

passThrough.on('error', error => {
  console.error(`passThrough encountered an error: ${error.message}`)
})

process.stdin.on('error', err => {
  console.error('stdin encountered an error:', err)
})

process.stdout.on('error', err => {
  console.error('stdout encountered an error:', err)
})

process.stdin.pipe(passThrough).pipe(outputStream)

// It will generate an error after 5 seconds
setTimeout(() => {
  passThrough.emit('error', new Error('Error 💥!'))
}, 5000)
