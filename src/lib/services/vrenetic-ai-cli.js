var cmd = require('node-cmd')
var Promise = require("bluebird")
const config = require("../../lib/config")

class VReneticAICli {

  constructor(nnBinary) {
    this.nnBinary = nnBinary
    this.nnRunCommand = [this.nnBinary, 'nn-run'].join(' ')
    this.nnShowCommand = [this.nnBinary, 'nn-show', '--nn-print-all'].join(' ')
    this.asyncExecutor = Promise.promisify(cmd.get, { multiArgs: true, context: cmd })
  }

  NNShowAll() {
    return this.asyncExecutor(this.nnShowCommand)
  }

  NNShowById(id) {
    return this.asyncExecutor([this.nnShowCommand, '--nn-id', id].join(' '))
  }

  NNRun(id, data) {
    return this.asyncExecutor([this.nnRunCommand, id, `'${JSON.stringify(data)}'`].join(' '))
  }

  NNStatus() {
    return this.asyncExecutor([this.nnBinary, '--version'].join(' '))
  }
}

module.exports = new VReneticAICli(config.get('vreneticAICli'))
