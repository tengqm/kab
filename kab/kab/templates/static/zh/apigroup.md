### API 组

Kubernetes 支持很多 API 组，每个 API 组的 API 路径各不相同，
例如 `/api/v1` 或 `/apis/rbac.authorization.k8s.io/v1alpha1`。
这一设计模式使得各个 API 组可以独立地被启用或禁止，并且按各自独立的节奏演化。
名字完全相同的多个资源类别可以在不同的 API 组中同时存在。

API 组的设计使得 Kubernetes API 的扩展非常容易。
API 组信息既包含在 RESTful 请求的路径中，也包含在序列化对象表示的 `apiVersion` 字段中。

Kubernetes 中的 API 组有很多，主要使用以下两组 API 路径：

- 核心组（`core`，也称作 `legacy` 组）在 RESTful 请求的 `/api/v1` 路径下提供服务。
  使用核心组的 API 时，在对象的 `apiVersion` 字段中不必给出组名，例如：
  `apiVersion: v1`。

- 其他所有组都分别处于 RESTful 请求的 `/apis/$GROUP_NAME/$VERSION` 路径下，
  并且需要在资源中给出组名和版本号 `apiVersion: $GROUP_NAME/$VERSION`。
  例如：`apiVersion: batch/v1`。

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


