## Pagination

On large clusters, retrieving the collection of some resource types may result
in very large responses that can impact the server and client. For instance, a
cluster may have tens of thousands of Pods, each of which is 1-2 KB of encoded
JSON. Retrieving all Pods across all namespaces may result in a very large
response (10-20 MB) and consume a large amount of server resources.

Starting in Kubernetes 1.9 the server supports the ability to break a single
large collection request into many smaller chunks while preserving the
consistency of the total request. Each chunk can be returned sequentially
which reduces both the total size of the request and allows user-oriented
clients to display results incrementally to improve responsiveness.

To retrieve a single list in chunks, two new parameters `limit` and `continue`
are supported on collection requests and a new field `continue` is returned
from all **list** operations in the list `metadata` field. A client should
specify the maximum results they wish to receive in each chunk with `limit`
and the server will return up to limit resources in the result and include a
`continue` value if there are more resources in the collection. The client can
then pass this `continue` value to the server on the next request to instruct
the server to return the next chunk of results. By continuing until the server
returns an empty `continue` value the client can consume the full set of
results.

Like a **watch** (**TODO Link**) operation, a `continue` token will expire
after a short amount of time (by default 5 minutes) and return a **410 Gone**
if more results cannot be returned. In this case, the client will need to
start from the beginning or omit the `limit` parameter.

### Example

List Pods on a cluster, retrieving up to 500 Pods each time:

```console
GET /api/v1/pods?limit=500
---
200 OK
Content-Type: application/json

{
  "kind": "PodList",
  "apiVersion": "v1",
  "metadata": {
    "resourceVersion":"10245",
    "continue": "ENCODED_CONTINUE_TOKEN",
    ...
  },
  "items": [...] // returns pods 1-500
}
```

Continue the previous call, retrieving the next set of 500 Pods.

```console
GET /api/v1/pods?limit=500&continue=ENCODED_CONTINUE_TOKEN
---
200 OK
Content-Type: application/json

{
  "kind": "PodList",
  "apiVersion": "v1",
  "metadata": {
    "resourceVersion":"10245",
    "continue": "ENCODED_CONTINUE_TOKEN_2",
    ...
  },
  "items": [...] // returns Pods 501-1000
}
```

Continue the previous call, retrieving the last batch of Pods:

```console
GET /api/v1/pods?limit=500&continue=ENCODED_CONTINUE_TOKEN_2
---
200 OK
Content-Type: application/json

{
  "kind": "PodList",
  "apiVersion": "v1",
  "metadata": {
    "resourceVersion":"10245",
    "continue": "", // continue token is empty because we have reached the end of the list
    ...
  },
  "items": [...] // returns Pods 1001-1253
}
```

Note that the `resourceVersion` of the list remains constant across each
request, indicating the server is showing us a consistent snapshot of the
Pods. Pods that are created, updated, or deleted after version `10245` would
not be shown unless the user makes a **list** request without the `continue`
token. This allows clients to break large requests into smaller chunks and
then perform a **watch** operation on the full set without missing any
updates.

