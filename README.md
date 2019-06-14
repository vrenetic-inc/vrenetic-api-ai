vrenetic-api-ai
===============

REST API for VRenetic Artificial Intelligence Services

Provider
--------

#### VRenetic AI CLI tools
[CLI](https://github.com/vrenetic-inc/vrenetic-ai-cli) with support for `nn-run` and `nn-show`

Endpoints
---------

#### `GET /ai/nn`

List all available neural networks. 

Runs `vrenetic-ai nn-show --nn-print-all`

#### `GET /ai/nn/:id`

List neural network detials by `id`.

Runs `vrenetic-ai nn-show --nn-id [ID] --nn-print-all`

#### `POST /ai/nn/:id`

Runs neural network by `id` with provided `DTOs` as `JSON` in body.

Runs `vrenetic-ai nn-run [ID] [BODY-DATA]`

Body data structure [example](https://github.com/vrenetic-inc/vrenetic-ai-cli#examples) and [contract](https://github.com/vrenetic-inc/vrenetic-ai-cli#contract) definition

Configuration
-------------

See [schema](https://github.com/vrenetic-inc/vrenetic-api-ai/blob/master/src/lib/core/config-schema.js) for more details

TODO
----
* Error handling
* Config file extension with cli params
* Data batch support for `nn-run`
* Workflows support based on [CLI TODO](https://github.com/vrenetic-inc/vrenetic-ai-cli#todo)
* Docker support
* CI/CD support
