const { createWriteStream } = require('fs')
const { resolve } = require('path')

const outputStream = createWriteStream(resolve(__dirname, '..', 'input.txt'))

for (let i = 0; i < 1e6; i++) {
  outputStream.write(
    `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ${i}.\n`
  )
}

outputStream.end()
