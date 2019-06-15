vrenetic-api-ai
===============

REST API for VRenetic Artificial Intelligence Services

Provider
--------

#### VRenetic AI CLI tools
[CLI](https://github.com/vrenetic-inc/vrenetic-ai-cli) with support for `nn-run` and `nn-show`

Endpoints
---------

#### `GET /v1/ai/nn`

List all available neural networks. 

Runs `vrenetic-ai nn-show --nn-print-all`

#### `GET /v1/ai/nn/:id`

List neural network detials by `id`.

Runs `vrenetic-ai nn-show --nn-id [ID] --nn-print-all`

#### `POST /v1/ai/nn/:id`

Runs neural network by `id` with provided `DTOs` as `JSON` in body.

Runs `vrenetic-ai nn-run [ID] [BODY-DATA]`

Body data structure [example](https://github.com/vrenetic-inc/vrenetic-ai-cli#examples) and [contract](https://github.com/vrenetic-inc/vrenetic-ai-cli#contract) definition

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
$ curl http://localhost:8110/v1/ai/nn/5b21f94435a6a400013c6eca
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
* Data batch support for `nn-run`
* Workflows support based on [CLI TODO](https://github.com/vrenetic-inc/vrenetic-ai-cli#todo)
* Docker support
* CI/CD support
* Intorduce RabbitMQ support
