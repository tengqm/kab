## 监视对象变更

为了支持让客户端构造集群当前状态的一个信息模型，所有 Kubernetes
对象类型都必须支持一致性的列表操作，同时支持称作**watch**的增量变更通知数据流。
服务器会返回在某个指定资源版本之后发生的所有变更
（包括**create**、**delete** 和 **update**）。
具体使用的资源版本取决于请求中是否以及如何设置 `resourceVersion` 查询参数：

- 如果忽略了 `resourceVersion` 查询参数，则意味着 **watch** 会从最新的资源版本开始，
  而这个版本必须是一致的。换言之，状态是通过一致性读（Quorum Read）操作从
  etcd 数据库中读取的。
- 如果 **watch** 操作发起时参数 `resourceVersion` 被设置为 `"0"`，则 **watch**
  可以从任意一个资源版本开始。系统会优先考虑最新的可用版本，但不必保证这点。
  服务器可以返回一个比较老的资源版本，甚至是客户端之前已经观察到的版本。
  如果无法忍受这点，则客户端应该避免使用这种配置。
- 当 **watch** 操作的 `resourceVersion` 被设置为 `"0"` 之外的字符串时，**watch**
  会从所给的 `resourceVersion` 开始。
  这种场景下通常假定客户端已经拥有了对应资源的某个初始版本，
  因为它能够给出一个确切的资源版本值。

当客户端忽略 `resourceVersion` 或者将其设置为 `"0"` 时，服务器端会首先返回一些合成的
`"Added"` 事件，其中包含在起始资源版本 （可以是最新的版本也可能是某个任意版本）
时刻已经存在的对象。所有后续的 **watch** 事件都是记录 **watch** 
操作启动时所处资源版本之后发生的变更。
这一设计使得客户端能够读取服务器上某资源（或资源集合）的当前状态，
并通过 **watch** 操作监视后续发生的变更，确保不会错过任何状态更新。
当 `resourceVersion` 被设置为 `"0"` 之外的其他值时，服务器**不会**返回这些合成的
`"Added"` 事件。

如果客户端在监视操作过程中中断了连接，可以从最新返回的 `resourceVersion`
开始重新启动一次 `watch` 操作；或者也可以执行 `list/watch` 请求组合，从头开始。

### 示例

要列举给定名字空间下所有 Pod：

```html
GET /api/v1/namespaces/test/pods
---
200 OK
Content-Type: application/json

{
  "kind": "PodList",
  "apiVersion": "v1",
  "metadata": {"resourceVersion":"10245"},
  "items": [...]
}
```

要列举从资源版本 `"12345"` 开始的所有 Pod，并接收所有的创建、删除和更新操作通知：

```console
GET /api/v1/namespaces/test/pods?watch=1&amp;resourceVersion=10245
---
200 OK
Transfer-Encoding: chunked
Content-Type: application/json

{
  "type": "ADDED",
  "object": {"kind": "Pod", "apiVersion": "v1", "metadata": {"resourceVersion": "10596", ...}, ...}
}
{
  "type": "MODIFIED",
  "object": {"kind": "Pod", "apiVersion": "v1", "metadata": {"resourceVersion": "11020", ...}, ...}
}
...
```

### 对旧版本的处理

给定的 Kubernetes 服务器只会在有限的时间内保存资源的变更历史列表。
使用 etcd3 的集群默认会保留过去 5 分钟的变更历史。
当所请求的 **watch** 操作因为资源的历史版本不可访问而失败时，
客户端必须根据返回的状态码 `"410 Gone"` 作出合适的应对，
清除本地的数据缓存之后执行一次 list 操作，并基于新的 list 操作所返回的
`resourceVersion` 启动 watch 操作。

大多数的客户端库都为这一逻辑提供了某种形式的标准工具。
在 Go 语言的客户端中，这一逻辑被封装在 `Reflector` 中，代码实现位于
`k8s.io/client-go/cache` 包内。

### 无法访问的版本

如果服务器无法识别客户端所给的 `resourceVersion`，则服务器可能会短暂地等待，
以期所请求的资源版本变得可用。如果在适当的等待时间之后，所给的资源版本仍无法访问，
则服务器会返回 `"504 Gateway Timeout"` 错误。
服务器也可能会在响应的头部通过 `Retry-After` 字段给出一个值，
提示客户端等待多长时间之后可以重试这一请求。

