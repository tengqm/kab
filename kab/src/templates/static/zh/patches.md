## 补丁（Patch）

Kubernetes API 支持三种不同的  *PATCH* 操作，具体的操作类型取决于请求的
`Content-Type` 头部内容：

- JSON Patch：`Content-Type: application/json-patch+json`；
- Merge Patch：`Content-Type: application/merge-patch+json`；
- Strategic Merge Patch：`Content-Type: application/strategic-merge-patch+json`；
- Server Side Apply Patch：`Content-Type: application/apply-patch+yaml`。

### JSON 补丁（JSON Patch）

根据 <a href="https://tools.ietf.org/html/rfc6902" target="_blank">
RFC6902 <i class='fa fa-external-link-alt'></i></a> 的定义，JSON patch
是由一系列操作组成，每个操作依次应用到目标对象之上。例如：

```json
{
  "op": "add",
  "path": "/a/b/c",
  "value": ["foo", "bar"]
}
```

### 合并补丁（Merge Patch）

正如 <a href="https://tools.ietf.org/html/rfc7386" target="_blank">
RFC7386 <i class='fa fa-external-link-alt'></i></a> 所定义的，
一个合并补丁（Merge Patch）是对目标资源的部分表达。
请求中所提交的 JSON 会与当前资源执行**合并（merge）**操作，
进而形成一个新的资源；新的资源会被保存起来。

JSON 合并补丁所描述的是要执行的变更，其语法与所变更的资源非常类似。
API 服务器通过比较所提交的补丁与资源的当前内容，确定所请求的变更集合。

- 如果所提交的补丁中包含目标资源中不存在的成员，则这些成员会被添加到目标资源上。
- 如果目标资源中确实包含对应的成员，则对应成员的取值会被替换。
- 补丁中的空值（Null）部分意味着要移除目标资源中的现有属性和值。
  这就意味着合并补丁不适合于那些对空值有某种特殊假定的资源。

使用合并补丁时，用户无法要求仅变更某个非 object 类型的字段的一部分，
例如不能请求替换数组中的一部分值。

下面是合并补丁的一个例子。
例子要求使用一个包含新容器的列表来替换现有 Deployment 资源中的容器列表。

```yaml
spec:
  template:
    spec:
      containers:
      - name: new-container
        image: nginx:1.16.1
```

### 策略性合并补丁（Strategic Merge Patch）

**策略性合并补丁**是**合并补丁**的一种定制实现。
`kubectl` 命令行工具在执行 `apply`、`edit` 和 `patch` 命令时即使用这种格式。

在标准的 JSON 合并补丁中，JSON 对象总是会被合并，但是 JSON 列表总是会被替换。
在策略性合并补丁模式下，对列表属性的操作可以使用
`x-kubernetes-patch-strategy` 扩展和 `x-kubernetes-patch-merge-key` 扩展来定制。

策略性合并补丁支持多种指令。关于这种模式的详细信息，可以参考补丁模式的
<a href="https://github.com/kubernetes/community/blob/master/contributors/devel/sig-api-machinery/strategic-merge-patch.md"
target="_blank">设计文档 <i class='fa fa-external-link-alt'></i></a>。

下面是策略性合并补丁的一个例子。
在这个例子中，用户请求将 Deployment 资源的更新策略从 `RolingUpdate`
改变为 `Recreate`。
指令 `$retainKeys` 用来标明除了 `strategy` 属性下除了 `type` 之外的字段都应该被删除。

```yaml
spec:
  strategy:
    $retainKeys:
    - type
    type: Recreate
```

### 服务器端应用补丁（Server Side Apply Patch）

服务器端应用（SSA）补丁是一种特殊类型的 YAML 数据，
用来表达服务器端应用请求。
如果执行这类操作时出现冲突，则 `apply` 操作会失败。
服务器端应用请求需要提供 `fieldManager` 查询参数，
并且请求所携带的对象不可以包含 `managedFields` 信息。
与服务器端应用相关的详细信息，可以参考
<a href="https://kubernetes.io/docs/reference/using-api/server-side-apply/"
target="_blank">官方设计文档 <i class='fa fa-external-link-alt'></i></a>。

下面是服务器端应用补丁的一个示例：

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
```

