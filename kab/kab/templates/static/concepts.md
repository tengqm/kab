## Overview

The Kubernetes API is a resource-based (RESTful) programmatic interface
provided through HTTP.
The REST API is the fundamental fabric of Kubernetes, exposed by the API server.
With the API, you can:

- create, retrieve, update and delete primary resources via the standard HTTP
  verbs (`POST`, `PUT`, `PATCH`, `DELETE`, `GET`).
- operate the additional subresources for objects that support them.
- instruct the API server to return responses in specific format for
  convenience or efficiency. 
- watch the changes on certain resources to get notifications.
- retrieve a consistent list of resources to allow other components to
  effectively cache and sync the resource states.

## The OpenAPI Specification

The official API specification is generated in the
[OpenAPI V2](https://www.openapis.org/) format from the Go source code.

## Invocation

You can use the <kbd>kubectl</kbd> command line interface to invoke the API
and you can use other tools as well. There are
[client libraries](https://kubernetes.io/docs/reference/using-api/client-libraries)
to use if you are writing applications to invoke the API.
