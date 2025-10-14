## Content-Types

### Request Format

POST and PUT requests sent to the API server can be encoded in one of the
following formats:

- `"application/json"`: Request payload is encoded in JSON format.
- `"application/yaml"`: Request payload is encoded in YAML.
- `"application/vnd.kubernetes.protobuf"`: Request payload is encoded in
  <a href="https://developers.google.com/protocol-buffers" target="_blank">
  Protobuf <i class='fa fa-external-link-alt'></i></a> format.
  Not all resource types support the "Protobuf" encoding, specifically those
  defined via Custom Resource Definitions or those are API extensions.

For PATCH requests, the content type can be one of the following:

- `"application/json-patch+json"`: JSON patch as defined by the
  <a href="https://tools.ietf.org/html/rfc6902" target="_blank">
  RFC6902 <i class='fa fa-external-link-alt'></i></a>
- `"application/merge-patch+json"`: Merge patch as defined by the
  <a href="https://tools.ietf.org/html/rfc7386" target="_blank">
  RFC7386 <i class='fa fa-external-link-alt'></i></a>.
- `"application/strategic-merge-patch+json"`: Stategic merge patch which is an
  extension to the standard merge patch.
- `"application/apply-patch+yaml"`: A special type of YAML indicating
  a server-side-apply (SSA) request. When there are conflicts during such an
  operation, the apply fails. A server-side-apply request need to provide the
  `fieldManager` query parameter and the object provided cannot have
  `managedFields` in it. For more information about server side apply,
  please refer to the
  <a href="https://kubernetes.io/docs/reference/using-api/server-side-apply/"
  target="_blank">official documentation <i class='fa fa-external-link-alt'></i></a>.

If the specified `"Content-Type"` is supported by the server, the same
`"Content-Type"` header is returned; otherwise the server may return the
"*406 Not acceptable*" error.

### Response Encoding

You can customize the response format by specifying the following HTTP request
headers.

#### The `Accept-Encoding` Header

The `Accept-Encoding` can accept `"gzip"` as its value. It is acceptable to
omit this header.

#### The `Accept` Header

The valid values for the `"Accept"` can be one of:

  * `"application/com.github.proto-openapi.spec.v2@v1.0+protobuf"`:
    This is mainly used for intra-cluster communnications.
  * `"application/json"`: This is the default value indicating that the server
    response is expecected to be JSON data.
  * `"application/json;stream=watch"`: The server response is expecected to be
    JSON data stream for watch operations.
  * `"application/yaml"`: The server response are encoded in YAML format.
  * `"application/vnd.kubernetes.protobuf"`: The server response are encoded in
    [Protobuf](https://developers.google.com/protocol-buffers) format.
  * `"application/vnd.kubernetes.protobuf;stream=watch"`: The same as
    `"application/vnd.kubernetes.protobuf"` except that the response will be a
    stream.
  * `"application/json;as=Table;g=meta.k8s.io;v=v1beta1"`: Request the server
    to return objects in the table content type.
  * `*`: The server response is encoded in `"application/json"`.

In case there is the possibility a specify content type is not supported by
the server, clients should specify multiple content types in their `"Accept"`
hader to support falling back to other options. For example:

```html
Accept: application/json;as=Table;g=meta.k8s.io;v=v1beta1, application/json
```

### Table Output

`kubectl get` usually outputs a simple tabular representation of one or more
instances of a particular resource type. In the past, clients were required to
reproduce the tabular and describe output implemented in `kubectl` to perform
simple lists of objects. A few limitations of that approach include
non-trivial logic when dealing with certain objects. Additionally, types
provided by API aggregation or custom resources are not known at compile time.
This means that generic implementations had to be in place for types
unrecognized by a client.

In order to avoid potential limitations as described above, starting from
version 1.10, clients may request the "Table" representation of objects,
delegating specific details of printing to the server. The Kubernetes API
implements standard HTTP content type negotiation: passing an `"Accept"`
header containing a value of
`"application/json;as=Table;g=meta.k8s.io;v=v1beta1"` with a GET call will
request that the server return objects in the "Table" content type.

For example, list all the namespaces in a cluster in the Table format:

```html
GET /api/v1/pods
Accept: application/json;as=Table;g=meta.k8s.io;v=v1beta1
---
200 OK
Content-Type: application/json

{
  "kind": "Table",
  "apiVersion": "meta.k8s.io/v1beta1",
  "metadata": {
      "selfLink": "/api/v1/namespaces",
      "resourceVersion": "17866787"
  }
  "columnDefinitions": [
    {
      "name": "Name",
      "type": "string",
      "format": "name",
      "description": "...",
      "priority": 0
    },
    ...
  ],
  "rows": [
    {
      "cells": [
        "default",
        "Active",
        "90d"
      ],
      "object": {
        "kind": "PartialObjectMetadata",
        "apiVersion": "meta.k8s.io/v1beta1",
        "metadata": {
          "name":"default",
          "selfLink": "...",
          "uid": "...",
          "resourceVersion": "356215",
          "creationTimestamp":"2020-09-09T02:49:57Z",
          "managedFields":[...]
        }
      }
    },
    ...
  ]
}
```

For resource types that do not have a custom Table definition on the server, a
default "Table" response is returned consisting of the resource's `name` and
`creationTimestamp` fields.

For more detailed definition of the Table output format, please refer to
<a href="{% url 'view-definition' API "meta" "v1" "Table" %}">the Table
</a> definition.
