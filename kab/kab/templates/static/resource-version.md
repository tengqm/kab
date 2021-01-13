## Resource Version

Every Kubernetes object has a `resourceVersion` string field representing the
version of that resource as stored in the underlying database. Clients can use
this field to determine when objects have changed, or to express data
consistency requirements when getting, listing and watching resources.
A resource version is only valid within a single namespace on a single kind of
resource. It is changed by the server every time an object is modified.

### Used in Requests

Resource versions must be treated as opaque by clients and passed unmodified
back to the server. For example, clients should not assume resource versions
are numeric, and may not compare two resource versions to determine which
version is greater than which one.

The `resourceVersion` value can be used as a parameter for a *get*, *list* or
*watch* operation. The exact meaning of this parameter depends on the
operation and the value of the `resourceVersion`.

For a *get* operation:

- If `resourceVersion` is not specified, it means returning the *most recent*
  version of the target object. The returned data must be consistent, served
  from etcd via a quorum read.
- If `resourceVersion` is set to "0", it means returning *any* version of the
  object. The newest available resource version is preferred but strong
  consistency is not required. It is possible for the server to return data at
  a much older version than the client has previously observed. In a HA
  configuration, this may happen due to partitions or stale caches.
- If `resourceVersion` is set to a value other than "0", it means returning a
  version which is at least as new as the specified version. The newest
  available data is preferred, but any data not older than the specified
  version may be returned.

For a *list* operation:

- If `resourceVersion` is not specified, it means returning the most recent
  version of the object collection;
- If `resourceVersion` is set to "0", it means returning _any_ version of the
  object collection;
- If `resourceVersion` is set to a value other than "0", it means returning an
  object collection whose version is not older than the specified one.

For a *put* or *patch* operation, the provided `resourceVersion` is compared
to the current value. If it doesn't match, the update operation fails with a
`"409 StatusConflict"`. This is to ensure that there have not been other
successful mutations to the resource during a read/modify/write cycle.
The client is expected to *get* the resource again, apply the changes afresh,
and try submitting again.

However, when the `resourceVersionMatch` parameter (added in v1.19) is
specified, you have to specify `resourceVersion`.

- If `resourceVersionMatch` is set to "`Exact`", then you have to provide a
  non-zero value for `resourceVersion`, and the server returns exactly the
  resource version of the object.
- If `resourceVersionMatch` is set to "`NoLaterThan`", the `resourceVersion`
  parameter must be provided as well. If `resourceVersion` is "`0`", then the
  API server can return any resource version of the object. If the
  `resourceVersion` has a non-zero value, the API server returns a version no
  older than the specified version.

### Returned in Responses

The resource version of a single object is contained in the `resourceVersion`
field of the object's `metadata` section, representing the resource version
the object was last modified at.

The resource version of a _collection_ of objects is also contained in the
`resourceVersion` field of the list's `metadata`. However, it represents the
resource version at which the list response was constructed.

