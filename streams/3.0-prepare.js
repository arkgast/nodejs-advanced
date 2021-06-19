const { createWriteStream } = require('fs')
const { resolve } = require('path')

const outputStream = createWriteStream(resolve(__dirname, '..', 'input.txt'))

for (let i = 0; i < 1e6; i++) {
  outputStream.write(
    `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum ${i}.\n`
  )
}

outputStream.end()
