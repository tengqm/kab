## Resource Deletion

Kubernetes resources are deleted in two phases: 1) finalization, and 2)
removal.

```json
{
  "apiVersion": "v1",
  "kind": "ConfigMap",
  "metadata": {
    "finalizers": ["url.io/neat-finalization", "other-url.io/my-finalizer"],
    "deletionTimestamp": null,
  }
}
```

Once the last finalizer is removed, the resource is actually removed from etcd.

### Deletion Timestamp

When a client first deletes a resource, the `deletionTimestamp` is set to the
current time. When the `deletionTimestamp` is set, controllers that are
permitted to operate on `finalizers` can start performing their cleanup work
at any time, in any order.

The `deletionTimestamp` is also an indicator of whether an object is being
deleted. When a deletion operation is started from the server side, this field
is set to the current time. If this field is empty, the object is not being
deleted.
