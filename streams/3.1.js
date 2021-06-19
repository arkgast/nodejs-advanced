const fs = require('fs')
const path = require('path')
const server = require('http').createServer()

// By working with files this way we put the whole file in memory
// this is very inefficient because the resources are not released
// once the request finishes and it takes longer to give a reply
server.on('request', (req, res) => {
  fs.readFile(path.resolve(__dirname, '..', 'input.txt'), (err, data) => {
    if (err) throw err
    res.end(data)
  })
})

const PORT = 9000
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
