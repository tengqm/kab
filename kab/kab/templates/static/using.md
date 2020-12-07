## Invocation

You can use the <kbd>kubectl</kbd> command line interface to invoke the API
and you can use other tools as well. There are
[client libraries](https://kubernetes.io/docs/reference/using-api/client-libraries)
to use if you are writing applications to invoke the API.

### HTTP Verbs

Almost all object resource types support the standard HTTP verbs - `GET`,
`POST`, `PUT`, `PATCH`, and `DELETE`. Kubernetes uses the term *list* to
describe returning a collection of resources to distinguish from retrieving a
single resource which is usually called a *read*.

The verbs supported for subresources differ depending on the object. It is
NOTE possible to access sub-resources across multiple resources.
Generally a new, "virtual" resource type would be used if that becomes necessary.

### HTTP Paths

The following paths are used to retrieve collections and resources:

*Cluster-scoped resources*:

- `GET /apis/GROUP/VERSION/RESOURCETYPE` -
  returns the collection of resources of the resource type
- `GET /apis/GROUP/VERSION/RESOURCETYPE/NAME` -
  returns the resource with NAME under the resource type
- `GET /apis/GROUP/VERSION/RESOURCETYPE/NAME/SUBRESOURCE` -
  returns the subresource SUBRESOURCE under the resource NAME

*Namespace-scoped resources*:

- `GET /apis/GROUP/VERSION/RESOURCETYPE` -
  returns the collection of all instances of the resource type across all
  namespaces.
- `GET /apis/GROUP/VERSION/namespaces/NAMESPACE/RESOURCETYPE` -
  returns collection of all instances of the resource type in NAMESPACE
- `GET /apis/GROUP/VERSION/namespaces/NAMESPACE/RESOURCETYPE/NAME` -
  returns the instance of the resource type with NAME in NAMESPACE
- `GET /apis/GROUP/VERSION/namespaces/NAMESPACE/RESOURCETYPE/NAME/SUBRESOURCE` -
  returns the subresource SUBRESOURCE under resource NAME.

Since a `namespace` is a *cluster-scoped* resource type, you can retrieve the
list of all namespaces with `GET /api/v1/namespaces` and details about a
particular namespace with `GET /api/v1/namespaces/<NAME>`.

### Request Format

Requests sent to the API server can be encoded in one of the following
formats:

- `application/json`: Request payload is encoded in JSON format.
- `application/yaml`: Request payload is encoded in YAML.
- `application/vnd.kubernetes.protobuf`: Request payload is encoded in
  [protocol buffers](https://developers.google.com/protocol-buffers) format.

** TODO: There are other patch formats

### Specifying the Response Encoding

You can customize the response format by specifying the following HTTP request
headers.

- `Accept-Encoding`: The accepted value is "`gzip`". It is acceptable to omit
  this header.
- `Accept`: The valid values can be one of:
  * `application/com.github.proto-openapi.spec.v2@v1.0+protobuf`:
    This is mainly used for intra-cluster communnications.
  * `application/json`: This is the default value indicating that the server
    response is expecected to be JSON data.
  * `application/json;stream=watch`: The server response is expecected to be
    JSON data stream for watch operations.
  * `application/yaml`: The server response are encoded in YAML format.
  * `application/vnd.kubernetes.protobuf`: The server response are encoded in
    [protocol buffers](https://developers.google.com/protocol-buffers) format.
  * `application/vnd.kubernetes.protobuf;stream=watch`: The same as
    `application/vnd.kubernetes.protobuf` except that the response will be a
    stream.
  * `*`: The server response is encoded in "`application/json`".

### Watch Object Changes

To enable clients to build a model of the current state of a cluster, all
Kubernetes object resource types are required to support consistent lists and
an incremental change notification feed called a *watch*.

When a `list/watch` operation is initiated with a `resourceVersion` specified,
the server will return all changes (*create*, *delete*, and *update*) that
occur after the supplied `resourceVersion`.  This allows a client to fetch the
current state and then *watch* for changes without missing any updates. If the
client watch is disconnected they can restart a new `watch` from the last
returned `resourceVersion`, or perform a new `collection` request and begin
again.

For example, to list all of the Pods in a given namespace.

```console
GET /api/v1/namespaces/test/pods
---
200 OK
Content-Type: application/json

{
  "kind": "PodList",
  "apiVersion": "v1",
  "metadata": {"resourceVersion":"10245"},
  "items": [...]
}
```

To list all Pods starting from resource version 10245, receive notifications
of any creates, deletes, or updates as individual JSON objects.

```console
GET /api/v1/namespaces/test/pods?watch=1&amp;resourceVersion=10245
---
200 OK
Transfer-Encoding: chunked
Content-Type: application/json

{
  "type": "ADDED",
  "object": {"kind": "Pod", "apiVersion": "v1", "metadata": {"resourceVersion": "10596", ...}, ...}
}
{
  "type": "MODIFIED",
  "object": {"kind": "Pod", "apiVersion": "v1", "metadata": {"resourceVersion": "11020", ...}, ...}
}
...
```

A given Kubernetes server will only preserve a historical list of changes for
a limited time. Clusters using etcd3 preserve changes in the last 5 minutes by
default. When the requested watch operations fail because the historical
version of that resource is not available, clients must handle the case by
recognizing the status code `410 Gone`, clearing their local cache, performing
a list operation, and starting the watch from the `resourceVersion` returned
by that new list operation.

Most client libraries offer some form of standard tool for this logic.  (In Go
this is called a `Reflector` and is located in the `k8s.io/client-go/cache`
package.)

#### Watch Bookmarks

To mitigate the impact of short history window, we introduced a concept of
`bookmark` watch event. It is a special kind of event to mark that all changes
up to a given `resourceVersion` the client is requesting have already been
sent. Object returned in that event is of the type requested by the request,
but only `resourceVersion` field is set, e.g.:

```console
GET /api/v1/namespaces/test/pods?watch=1&amp;resourceVersion=10245&amp;allowWatchBookmarks=true
---
200 OK
Transfer-Encoding: chunked
Content-Type: application/json

{
  "type": "ADDED",
  "object": {"kind": "Pod", "apiVersion": "v1", "metadata": {"resourceVersion": "10596", ...}, ...}
}
...
{
  "type": "BOOKMARK",
  "object": {"kind": "Pod", "apiVersion": "v1", "metadata": {"resourceVersion": "12746"} }
}
```

`Bookmark` events can be requested by `allowWatchBookmarks=true` option in
*watch* requests, but clients shouldn't assume bookmarks are returned at any
specific interval, nor may they assume the server will send any `bookmark`
event.

