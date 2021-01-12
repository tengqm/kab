## Patch

The Kubernetes API supports three different *PATCH* operations, determined by
their corresponding `Content-Type` header:

- JSON Patch: `Content-Type: application/json-patch+json`;
- Merge Patch: `Content-Type: application/merge-patch+json`;
- Strategic Merge Patch: `Content-Type: application/strategic-merge-patch+json`;
- Server Side Apply Patch: `Content-Type: application/apply-patch+yaml`.

### JSON Patch

As defined in <a href="https://tools.ietf.org/html/rfc6902" target="_blank">
RFC6902</a>, a JSON patch is a sequence of operations that are executed on a
resource. For example,

```json
{
  "op": "add",
  "path": "/a/b/c",
  "value": ["foo", "bar"]
}
```

### Merge Patch

As defined in <a href="https://tools.ietf.org/html/rfc7386" target="_blank">
RFC7386</a>, a merge Patch is a partial representation of the resource. The
submitted JSON is *merged* with the current resource to create a new one, then
the new one is saved.

A JSON merge patch describes changes to be made using a syntax that closely
mimics the resource being modified. The API server determines the exact set of
changes being requested by comparing the content of the provided patch against
the current content.

- If the provided patch contains members that do not appear within the target,
  those members are added.
- If the target does contain the member, the value is replaced.
- Null values in the patch are an indicator to remove the existing values in
  the target. This means a merge patch is not appropriate for resources that
  make explicit use of null values.

With merge patches, it is not possible to patch part of a resource that is not
an object, such as to replace just some of the values in an array.

Below is an example of merge patch that will replace the existing containers
list in a Deployment by a list with a new container.

```yaml
spec:
  template:
    spec:
      containers:
      - name: new-container
        image: nginx:1.16.1
```

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

The following is an example strategic merge patch that will change the update
strategy for a Deployment from `RollingUpdate` to `Recreate`. The
`$retainKeys` directive is to specify that all keys except for `type` under
`strategy` should be removed.

```yaml
spec:
  strategy:
    $retainKeys:
    - type
    type: Recreate
```

### Server Side Apply Patch

A special type of YAML indicating a server-side-apply (SSA) request. When
there are conflicts during such an operation, the apply fails. A
server-side-apply request need to provide the `fieldManager` query parameter
and the object provided cannot have `managedFields` in it. For more
information about server side apply, please refer to the
<a href="https://kubernetes.io/docs/reference/using-api/server-side-apply/"
target="_blank">official documentation</a>.

Blow is an example of a server side apply patch:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
```
