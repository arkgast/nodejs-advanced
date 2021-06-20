const { pipeline, Readable, Transform, Writable } = require('stream')
const { promisify } = require('util')

const sleep = promisify(setTimeout)

async function * generate () {
  yield 'a'
  await sleep(2000)
  yield 'b'
  await sleep(2000)
  yield 'c'
}

const inputStream = Readable.from(generate())

const upperCaseTransform = new Transform({
  transform (chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase())
  }
})

const outputStream = new Writable({
  write (chunk, encoding, callback) {
    console.log(`output logging chunk: ${chunk.toString()}`)
    callback()
  }
})

pipeline(inputStream, upperCaseTransform, outputStream, error => {
  if (error) {
    console.log('pipeline ended with error: ', error)
  } else {
    console.log('pipeline completed successfully')
  }
})
