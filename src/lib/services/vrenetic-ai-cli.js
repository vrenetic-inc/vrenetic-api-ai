const {default: PQueue} = require('p-queue');
var cmd = require('node-cmd')
var Promise = require("bluebird")
const config = require("../../lib/config")

class VReneticAICli {

  constructor(binary) {
    this.binary = binary
    this.annRunCommand = [this.binary, 'ann-run'].join(' ')
    this.annShowCommand = [this.binary, 'ann-show', '--print-json'].join(' ')
    this.workflowRunCommand = [this.binary, 'workflow-run'].join(' ')
    this.workflowShowCommand = [this.binary, 'workflow-show', '--print-json'].join(' ')
    this.asyncExecutor = Promise.promisify(cmd.get, { multiArgs: true, context: cmd })

    var maxParallelJobs = config.get('childrenMaxConcurrentInstaces')
    this.queue = new PQueue({concurrency: maxParallelJobs});
  }

  ANNShowAll() {
    return this.asyncExecutor(this.annShowCommand)
  }

  ANNShowById(id) {
    return this.asyncExecutor([this.annShowCommand, '--ann-id', id].join(' '))
  }

  ANNRun(id, data) {
    return this.asyncExecutor([this.annRunCommand, id, `'${JSON.stringify(data)}'`].join(' '))
  }

  ANNRunBatch(id, data) {
    var results = []
    for(var n = 0; n < data.length; n++) {
      var output = this.asyncExecutor([this.annRunCommand, id, `'${JSON.stringify(data[n])}'`].join(' '))
      results.push(output)
    }
    return Promise.all(results);
  }

  WorkflowShow() {
    return this.asyncExecutor(this.workflowShowCommand)
  }

  WorkflowShowById(id) {
    return this.asyncExecutor([this.workflowShowCommand, '--workflow-id', id].join(' '))
  }

  WorkflowRun(id, data) {
    return this.asyncExecutor([this.workflowRunCommand, id, `'${JSON.stringify(data)}'`].join(' '))
  }

  WorkflowRunBatch(id, data) {
    var results = []
    for(var n = 0; n < data.length; n++) {
      var workflowData = data[n]

      var output = this.queue.add(() => {
          return this.asyncExecutor([this.workflowRunCommand, id, `'${JSON.stringify(workflowData)}'`].join(' '))
        }
      )
      results.push(output)
    }

    return Promise.all(results);
  }

  Version() {
    return this.asyncExecutor([this.binary, '--version'].join(' '))
  }

  Info() {
    return this.asyncExecutor([this.binary, 'info'].join(' '))
  }
}

module.exports = new VReneticAICli(config.get('vreneticAICli'))
