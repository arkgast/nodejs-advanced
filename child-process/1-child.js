const { promisify } = require('util')

const sleep = promisify(setTimeout)

async function main () {
  process.stdout.write('child - executing process')
  await sleep(2000)
}

main().then(() => {
  process.stdout.write('child - process completed successfully')
})
