### API Groups

Kubernetes supports multiple API versions, each at a different API path, such
as `/api/v1` or `/apis/rbac.authorization.k8s.io/v1alpha1`.

API groups make it easier to extend the Kubernetes API. The API group is
specified in a REST path and in the `apiVersion` field of a serialized object.

There are several API groups in Kubernetes:

- The `core` (also called `legacy`) group is found at REST path `/api/v1`. The
  `core` group is not specified as part of the `apiVersion` field, for
  example, `apiVersion: v1`.

- The named groups are at REST path `/apis/$GROUP_NAME/$VERSION` and use
  `apiVersion: $GROUP_NAME/$VERSION` (for example, `apiVersion: batch/v1`).

### List of API Groups

**TODO: List of API Groups**

### Enabling/Disabling API Groups

Certain resources and API groups are enabled by default. You can enable or
disable them by setting `--runtime-config` on the API server.  The
`--runtime-config` flag accepts comma separated `<key>[=<value>]` pairs
describing the runtime configuration of the API server. If the `=<value>` part
is omitted, it is treated as if `=true` is specified.  For example:

- to disable `batch/v1`, set `--runtime-config=batch/v1=false`;
- to enable `batch/v2alpha1`, set `--runtime-config=batch/v2alpha1`

Note: When you enable or disable groups or resources, you need to restart the
API server and controller manager to pick up the `--runtime-config` changes.


