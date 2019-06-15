vrenetic-api-ai
===============

REST API for VRenetic Artificial Intelligence Services

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

List workflows detials by `id`.

Runs `vrenetic-ai workflow-show --ann-id [ID] --print-json`

#### `POST /v1/ai/workflow/:id`

Runs workflows by `id` with provided `DTOs` as `JSON` in body.

Runs `vrenetic-ai workflow-run [ID] [BODY-DATA]`

Body data structure [example](https://github.com/vrenetic-inc/vrenetic-ai-cli#examples) and [contract](https://github.com/vrenetic-inc/vrenetic-ai-cli#contract) definition

### Health

#### `GET /health/status`

Returns system status and settings.

Usage
-----

```bash
$ curl http://localhost:8110/health/status
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
$ curl http://localhost:8110/v1/ai/ann/5b21f94435a6a400013c6eca
{
    "output": "Output based on https://github.com/vrenetic-inc/vrenetic-ai-cli#ai-manifest"
}
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
* Error handling
* Data batch support for `ann-run` and `workflow-run`
* Docker support
* CI/CD support
* Intorduce RabbitMQ support
