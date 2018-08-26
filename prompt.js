const readline = require('readline')
const events = require('events')

class E extends events {}

let e = new E()

let validInputs = ['help', 'exit', 'stats']

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'pleaseTypeShit >'
})

rl.prompt()

rl.on('line', str => {

  if (validInputs.includes(str)) {
    console.log('congrats!')
    e.emit(str)
  } else {
    console.log('stupid shit')
  }

  rl.prompt()
})

// rl.on('close', () => process.exit(0))