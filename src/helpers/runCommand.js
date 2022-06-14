const { spawn } = require('child_process')

const runCommand = (command, args, opts = undefined) => {
  const spawned = spawn(command, args, opts)

  return new Promise((resolve) => {
    spawned.stdout.on('data', (data) => {
      console.log(data.toString())
    })

    spawned.stderr.on('data', (data) => {
      console.error(data.toString())
    })

    spawned.on('close', () => {
      resolve()
    })
  })
}

module.exports = {
  runCommand,
}
