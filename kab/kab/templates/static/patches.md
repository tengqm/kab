## Patch

The Kubernetes API supports three different *PATCH* operations, determined by
their corresponding `Content-Type` header:

- JSON Patch: `Content-Type: application/json-patch+json`;
- Merge Patch: `Content-Type: application/merge-patch+json`;
- Strategic Merge Patch: `Content-Type: application/strategic-merge-patch+json`.

### JSON Patch

As defined in [RFC6902](https://tools.ietf.org/html/rfc6902), a JSON patch is
a sequence of operations that are executed on a resource. For example,

```json
{
  "op": "add",
  "path": "/a/b/c",
  "value": ["foo", "bar"]
}
```

### Merge Patch

As defined in [RFC7386](https://tools.ietf.org/html/rfc6902), a Merge Patch is
a partial representation of the resource. The submitted JSON is *merged* with
the current resource to create a new one, then the new one is saved.


### Strategic Merge Patch

This is a custom implementation of the Merge Patch. It is used by the
`kubectl` command line for the `apply`, `edit` and `patch` subcommands.

In the standard JSON merge patch, JSON objects are always merged but lists are
always replaced. In a strategic merge patch, the operations applied on a list
can be customized using the `x-kubernetes-patch-strategy` and the
`x-kubernetes-patch-merge-key` extensions.

A strategic merge patch supports multiple directives.
For more details, check the
<a
href="https://github.com/kubernetes/community/blob/master/contributors/devel/sig-api-machinery/strategic-merge-patch.md"
target="_blank">design document</a>
