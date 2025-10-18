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

Kubernetes 保留空组名（`""`）、单个单词的组名（如 `"apps"`）
以及以 `".k8s.io"` 结尾的组名。
资源的 API 组名必须是小写字母，并且可以用作合法的 DNS 子域名。

### API 组的发现

用户可以读取 `"/apis/"` API 路径来发现集群支持的 API 组及各自的版本。
这一操作被称作 `getAPIVersions` 操作。

对于每个 API 组，都存在一个位于端点  `"/apis/<group>/"` 的 API，
用户可以读取这一 API 来列举 API 组所支持的版本列表。
此操作被称作 `"get<Group>APIGroup"` 操作，其中 `<Group>` 是驼峰编码拼写形式的
API 组名。例如 `"getAppsAPIGroup"`。

对于每个 API 组版本，在 API 路径 `"/apis/<group>/<version>/"`
存在一个列举指定 API 组和版本的 API 资源类别的 API。
此操作被称作 `"get<Group><Version>APIResources"` 操作，其中 `<Group>`
是驼峰编码形式的 API 组名，而 `<Version>` 是驼峰编码的 API 版本字符串。
例如 `"getAppsV1APIResources"`。

### API 组的启用与禁止

某些资源和 API 组是默认被启用的。
用户可以通过设置 API 服务器的 `--runtime-config` 命令行参数来启用或者禁止指定的
API 组或资源。`--runtime-config` 参数支持用逗号分隔的键值对（`<key>[=<value>]`），
用来设置 API 服务器的运行时配置。 
如果 `=<value>` 部分被忽略，则服务器将其视为设置了 `=true`。
例如：

- 要禁用 `batch/v1`，可以设置 `--runtime-config=batch/v1=false`；
- 要启用 `batch/v2alpha1`，可以设置 `--runtime-config=batch/v2alpha1`。

**注意**：当用户启用或者禁用某 API 组或者资源时，需要重启 API 服务器以及控制器管理器组件，
这样所作出的变更才会生效。

