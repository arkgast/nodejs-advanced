const { spawn } = require('child_process')

const childProcess = spawn('node', ['child-process/1-child.js'])

childProcess.stdout.on('data', data => {
  console.log(data.toString())
})

childProcess.on('exit', code => {
  console.log(`parent - child completed with code ${code}`)
})

process.on('beforeExit', code => {
  console.log(`parent - beforeExit with code ${code}`)
})

process.on('exit', code => {
  console.log(`parent - exit with code ${code}`)
})
