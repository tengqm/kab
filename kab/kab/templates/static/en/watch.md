## Watch Object Changes

To enable clients to build a model of the current state of a cluster, all
Kubernetes object resource types are required to support consistent lists and
an incremental change notification feed called a **watch**.  The server will
return all changes (**create**, **delete**, and **update**) that occur after a
certain resource version. The exact resource version used is determined by
whether and how the `resourceVersion` is specified:

- If the `resourceVersion` parameter is omitted, it means the **watch** starts
  at the most recent resource version which must be consistent. That is, the
  state is served from etcd via a quorum read. 
- When a **watch** operation is initiated with `resourceVersion` set to `"0"`,
  the **watch** can start at any resource version with the most recent resource
  version available preferred but not required. The server may return a much
  older resource version that the client has previously observed. Clients
  that cannot tolerate this should avoid this configuration. 
- When a `resourceVersion` other than `"0"` is specified, the **watch** starts
  a watch at exact the supplied `resourceVersion`. The client is assumed to
  already have the initial state at the starting resource version because it
  has provided an exact value.

When `resourceVersion` is omitted or set to `"0"`, the server first responds
with synthetic `"Added"` events of all objects that exist at the starting
resource version (the most recent one or an arbitrary one). All the following
**watch** events are for all changes that occurred after the resource version
the **watch** started at. This allows a client to fetch the current state and
then **watch** for changes without missing any updates. When `resourceVersion`
is set to a value other than `"0"`, the server does **NOT** return these
synthetic `"Added"` events.

If the client watch is disconnected they can restart a new `watch` from the
last returned `resourceVersion`, or perform a new `list/watch` request and
start all over again.

### Example

For example, to list all of the Pods in a given namespace.

```html
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

### Dealing with Old Versions

A given Kubernetes server will only preserve a historical list of changes for
a limited time. Clusters using etcd3 preserve changes in the last 5 minutes by
default. When the requested **watch** operations fail because the historical
version of that resource is not available, clients must handle the case by
recognizing the status code `"410 Gone"`, clearing their local cache, performing
a list operation, and starting the watch from the `resourceVersion` returned
by that new list operation.

Most client libraries offer some form of standard tool for this logic.  (In Go
this is called a `Reflector` and is located in the `k8s.io/client-go/cache`
package.)

### Unavailable Versions

If the server cannot recognize the provided `resourceVersion` value, the
server may wait briefly for the resource version to become available. If the
provided version failed to become available in a reasonable amount of time,
the request will return a `"504 Gateway Timeout"` error. The server may also
return in the `Retry-After` response header a value indicating how many
seconds the client is supposed to wait before retrying the request.


