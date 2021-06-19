const { createReadStream } = require('fs')
const { resolve } = require('path')
const { pipeline } = require('stream')
const server = require('http').createServer()

const readStream = createReadStream(resolve(__dirname, '..', 'input.txt'))

server.on('request', (req, res) => {
  pipeline(readStream, res, err => {
    if (err) {
      console.log(`pipeline ended with error ${err.message}`)
    } else {
      console.log(`pipeline ended successfully`)
    }
  })
})

const PORT = 9000
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
