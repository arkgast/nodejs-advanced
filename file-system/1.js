const fs = require('fs')

fs.watch(__dirname, (event, fileName) => {
  fs.stat(fileName, (err, fileStats) => {
    if (err) {
      console.log(
        `${fileName} does not exists anymore, it is likely it was deleted`
      )
    } else {
      console.log(`${fileStats.uid} ${fileName}`)
    }
  })
})
