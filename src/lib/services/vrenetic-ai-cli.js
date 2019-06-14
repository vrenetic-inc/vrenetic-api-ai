var Promise = require("bluebird")
var cmd = require('node-cmd')

const asyncExecutor = Promise.promisify(cmd.get, { multiArgs: true, context: cmd })

// This should go to configuration file
const nnBinary = 'python3 /Users/kris/Projects/vrenetic-ai-cli/vrenetic-ai/src/vrenetic/ai.py'

// Interface for https://github.com/vrenetic-inc/vrenetic-ai-cli
const nnShowCommand = [nnBinary, 'nn-show', '--nn-print-all'].join(' ')
const nnRunCommand = [nnBinary, 'nn-run'].join(' ')

class VReneticAICli {

  constructor() {
  }

  NNShowAll() {
    return asyncExecutor(nnShowCommand)
  }

  NNShowById(id) {
    return asyncExecutor([nnShowCommand, '--nn-id', id].join(' '))
  }

  NNRun(id, data) {
    return asyncExecutor([nnRunCommand, id, `'${JSON.stringify(data)}'`].join(' '))
  }
}

module.exports = new VReneticAICli()
