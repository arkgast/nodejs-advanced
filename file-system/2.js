const fs = require('fs')
const path = require('path')

const fileNamesInDir = []
fs.watch(__dirname, (event, fileName) => {
  fs.stat(fileName, (err, fileStats) => {
    const absolutePath = path.resolve(fileName)
    if (err) {
      deleteFileNameFromArr(absolutePath)
    } else {
      fileNamesInDir.push(absolutePath)
    }
    console.log({ fileNamesInDir })
  })
})

function deleteFileNameFromArr (fileName) {
  if (fileNamesInDir.includes(fileName)) {
    const idx = fileNamesInDir.indexOf(fileName)
    fileNamesInDir.splice(idx, 1)
  }
}
