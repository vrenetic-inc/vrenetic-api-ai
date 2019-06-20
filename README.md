vrenetic-api-ai
===============

REST API for VRenetic Artificial Intelligence Services.

See [TODO](https://github.com/vrenetic-inc/vrenetic-api-ai#todo) section

Provider
--------

#### VRenetic AI CLI tools
[CLI](https://github.com/vrenetic-inc/vrenetic-ai-cli) with support for `ann-run`, `ann-show`, `workflow-run` and `workflow-show`

Endpoints
---------

### ANN

#### `GET /v1/ai/ann`

List all available neural networks. 

Runs `vrenetic-ai ann-show --print-json`

#### `GET /v1/ai/ann/:id`

List neural network detials by `id`.

Runs `vrenetic-ai ann-show --ann-id [ID] --print-json`

#### `POST /v1/ai/ann/:id`

Runs neural network by `id` with provided `DTOs` as `JSON` in body.

Runs `vrenetic-ai ann-run [ID] [BODY-DATA]`

Body data structure [example](https://github.com/vrenetic-inc/vrenetic-ai-cli#examples) and [contract](https://github.com/vrenetic-inc/vrenetic-ai-cli#contract) definition

#### `POST /v1/ai/ann/:id/batch`

Runs neural network by `id` for batch of input data as `["DTOS-DATA", "DTOS-DATA", "DTOS-DATA", ...]`

Runs `vrenetic-ai ann-run [ID] [DTOS-DATA]` in the loop.

### Workflow

#### `GET /v1/ai/workflow`

List all available workflows. 

Runs `vrenetic-ai workflow-show --print-json`

#### `GET /v1/ai/workflow/:id`

List workflow detials by `id`.

Runs `vrenetic-ai workflow-show --ann-id [ID] --print-json`

#### `POST /v1/ai/workflow/:id`

Runs workflow by `id` with provided `DTOs` as `JSON` in body.

Runs `vrenetic-ai workflow-run [ID] [BODY-DATA]`

Body data structure [example](https://github.com/vrenetic-inc/vrenetic-ai-cli#examples) and [contract](https://github.com/vrenetic-inc/vrenetic-ai-cli#contract) definition

#### `POST /v1/ai/workflow/:id/batch`

Runs workflow by `id` for batch of input data as `["DTOS-DATA", "DTOS-DATA", "DTOS-DATA", ...]`

Runs `vrenetic-ai workflow-run [ID] [DTOS-DATA]` in the loop.

### Health

#### `GET /health/status`

Returns system status and settings.

Usage
-----

```bash
$ curl -XGET http://localhost:8110/health/status --silent
{
    "system": "ok",
    "providers": {
        "vrenetic-ai-cli": {
            "version": "0.0.2",
            "binary": "python3 ~/Projects/vrenetic-ai-cli/src/vrenetic/ai.py"
        }
    }
}
```

```bash
$ curl -XGET http://localhost:8110/v1/ai/ann/5b21f94435a6a400013c6eca --silent
"JSON Output based on https://github.com/vrenetic-inc/vrenetic-ai-cli#ai-manifest"
```

```bash
$ curl -XPOST -H "Content-type: application/json" -d "[{},{},{},{}]" http://localhost:8110/v1/ai/workflow/604f08de5b2ad818ce686365011c4aa7/batch
[
    { "relevancy-index": 0 },
    { "relevancy-index": 0 },
    { "relevancy-index": 0 },
    { "relevancy-index": 0 }
]
```

Configuration
-------------

See [schema](https://github.com/vrenetic-inc/vrenetic-api-ai/blob/master/src/lib/core/config-schema.js) for more details

Development
-----------

#### Dependencies

```bash
cd src/
npm install
```

```bash
cd ~/Projects
git clone https://github.com/vrenetic-inc/vrenetic-ai-cli.git
```

#### Run

```bash
export VRENETIC_AI_CLI_BINARY="python3 ~/Projects/vrenetic-ai-cli/src/vrenetic/ai.py"
export JWT_VERIFICATION_KEY=test-key
export NODE_ENV=test
node src/server.js
```

TODO
----

#### PoC
* Error handling
* Docker support
* CI/CD support

#### MVP
* Introduce RabbitMQ support
* Add persistence layer - MongoDB or Neo4j

#### Beta
* Add Application and User entity support for storing personalised data
* Add support for storing datsets based on VRenetic AI Cli DTOs contract
* Add support for storing personalised ANNs
* Add semi-supervised mode based on VRenetic AI Cli
