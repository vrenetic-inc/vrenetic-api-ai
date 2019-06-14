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
