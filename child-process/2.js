const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')

const fileName = path.resolve(__dirname, '..', 'file.txt')

fs.watchFile(fileName, () => {
  const grep = spawn('grep', ['-e', 'hola', fileName])
  const wc = spawn('wc', ['-l'])

  grep.stdout.pipe(wc.stdin)
  wc.stdout.pipe(process.stdout)
})
