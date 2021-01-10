### API Groups

Kubernetes supports multiple API groups, each at a different API path, such
as `/api/v1` or `/apis/rbac.authorization.k8s.io/v1alpha1`. This allows each
API groups to be enabled/disabled individually and to evolve at different
speed. Multiple identically named kinds can exist in different groups.

API groups make it easier to extend the Kubernetes API. The API group is
specified in a REST path and in the `apiVersion` field of a serialized object.

There are several API groups in Kubernetes:

- The `core` (also called `legacy`) group is found at REST path `/api/v1`. The
  `core` group is not specified as part of the `apiVersion` field, for
  example, `apiVersion: v1`.

- The named groups are at REST path `/apis/$GROUP_NAME/$VERSION` and use
  `apiVersion: $GROUP_NAME/$VERSION` (for example, `apiVersion: batch/v1`).

Kubernetes reserves the use of empty group name (`""`), single word group
names (e.g. `"apps"`) and group names ending with `".k8s.io"`. A group name
must be lower case and be valid DNS subdomains.

### Discovery of API Groups

API groups along with their supported versions can be discovered at the API path
`"/apis/"`. This is referred to as the
[getAPIVersions](/apis/operation/1.20/getAPIVersions/) operation.

For each API group, there is an API served at `"/apis/<group>/"` that allows
you to list the API group versions supported. This operation is referred to as
the `"get<Group>APIGroup"` operation, where `<Group>` is the CamelCase of the
API group name. For example, the `"getAppsAPIGroup"`
[operation](/apis/operation/1.20/getAppsAPIGroup/).

For each API group version, there is an API served at
`"/apis/<group>/<version>/"` that lists the API resources in that specific API
group version. This operation is referred to as the
`"get<Group><Version>APIResources"` operation, where `<Group>` is the
CamelCase of the API group name and `<Version>` is the CamelCase API group
version. For example, the `"getAppsV1APIResources"`
[operation](/apis/operation/1.20/getAppsV1APIResources/).

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


