# microservice-skeleton

## Introduction

This is a simple NodeJS module for creating creating simple API-based microservices.
It is very easy to follow the MVC design pattern, and because of this, designing your microservice using a MVC pattern is recommended.
It is based on Express and uses controllers for managing the URL routes. It is configured to deal with JSON requests, using `bodyParser`.

### Hooks

It uses hooks for inserting functionality. Each hook allows to receive a
parameter from the skeleton. The list of available hooks
is listed below:

- `express`: Loaded at the beginning, right after setting up the Express
  instance. The accessible parameter is the Express instance (`app`), which you
  can customize as preferred.
- `controllers`: It is loaded during controller loading, to allow
  creating custom controllers. The parameter is the controller directory register
  function, to which you would pass the full path to directory where
  controllers are located.

### Controllers

The controllers structure is very simple, and work via keys that point
to an Express router function.
For instance, if the controller's file name is `login.js` and it
implements the `get` function, it would be accessible with a GET request
to `/login`.

For instance, take a look at the `liveness.js` file, located at [`lib/controllers/liveness.js`](lib/controllers/liveness.js):

```
'use strict';
module.exports = {
  get: (req, res, next) => {
    res.json({
      hello: 'world'
    });
  }
};
```

#### Allowed methods

Since this module is meant for creating API-based microservices, it only supports a few types of HTTP requests. Supposing the microservice is named `login.js`, you would be able to define the following HTTP methods in your controller file:

- `index`: `GET` request to `/`.
- `get`: `GET` request to `/login`.
- `post`: `POST` request to `/login`.
- `put`: `PUT` request to `/login`.
- `delete`: `DELETE` request to `/login`.
- `show`: `GET` request to `/login/:id`.
- `edit`: `POST` request to `/login/:id`.

### Liveness and readiness

This module is meant for creating simple microservices that can be
deployed with Kubernetes. Because of this, there are already two
predefined controllers, `liveness` and `readiness`, accessible at
`/liveness` and `/readiness` respectively:

- `/liveness` will always show a simple `{"hello":"world"}` response,
  used to checking whether the microservice is running or not (if it is
  not, the page would not be accessible).
- `/readiness` will show a simple `{"ready":STATUS}` response, where
  STATUS is either `true` or `false`. The default value is `false` which
  you have to change in your microservice as following, in the `express`
  hook:

```
app.set('ready', true)
```

## License

Copyright 2016 Marcos Bjørkelund

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

