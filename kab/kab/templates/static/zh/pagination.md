## 分页（Pagination）

在较大规模的集群中，读取某类资源的较大集合时，可能导致响应的主题尺寸较大，
进而会影响服务器端和客户端的性能。
例如，某个集群中可能运行着上万个 Pod，每个 Pod 的 JSON 编码数据为 1-2 KB。
跨所有名字空间来读取所有 Pod 的操作可能会导致响应主体非常大（10-20 MB），
进而耗用大量的服务器资源。

从 Kubernetes v1.9 开始，服务器开始支持将一个较大的对象集合切分为多个较小的块，
同时保证整个请求响应总体上的一致性。
每个数据块可以循序返回，从而降低响应的尺寸，允许真人用户以增量方式显示结果，
从而提高系统的响应能力。

为了能够分块地读取一个较大的列表，Kubernetes 支持为请求设置 `limit` 和 `continue`
两个参数，同时允许在 **list** 操作结果列表的 `metadata` 字段中返回 `continue`
字段。客户端应该使用 `limit` 来设置在每个数据块中返回的结果条目上限，
服务器将在结果中返回不超过所给 `limit` 个数的资源，
并且在结果集合中还有其他资源需要返回时，在响应中给出 `continue` 字段。
客户端可以在下一个请求中将此 `continue` 字段传递给服务器，
通知服务器返回结果的下一个数据块。
通过持续执行此操作，直到服务器返回的 `continue` 字段值为空，
客户端可以获得结果的全集。

与 <a href="{% url 'static-page' 'watch' %}"><B>watch</B></a> 操作类似，
`continue` 令牌也会在很短的时间（默认为 5 分钟）后到期。
如果没有更多的结果可返回，则会返回一个 **410 Gone** 错误。
如果出现这种情况，客户端需要从头开始，或者忽略 `limit` 参数。

### 示例

下面的请求用来在集群上列举 Pod，每次最多读取 500 个：

```console
GET /api/v1/pods?limit=500
---
200 OK
Content-Type: application/json

{
  "kind": "PodList",
  "apiVersion": "v1",
  "metadata": {
    "resourceVersion":"10245",
    "continue": "ENCODED_CONTINUE_TOKEN",
    ...
  },
  "items": [...] // 返回 Pod 1-500
}
```

继续执行前面的调用，可以读取接下来的 500 个 Pod。

```console
GET /api/v1/pods?limit=500&continue=ENCODED_CONTINUE_TOKEN
---
200 OK
Content-Type: application/json

{
  "kind": "PodList",
  "apiVersion": "v1",
  "metadata": {
    "resourceVersion":"10245",
    "continue": "ENCODED_CONTINUE_TOKEN_2",
    ...
  },
  "items": [...] // 返回 Pod 501-1000
}
```

继续执行此调用，可以返回最后一批 Pod：

```console
GET /api/v1/pods?limit=500&continue=ENCODED_CONTINUE_TOKEN_2
---
200 OK
Content-Type: application/json

{
  "kind": "PodList",
  "apiVersion": "v1",
  "metadata": {
    "resourceVersion":"10245",
    "continue": "", // continue 令牌为空，因为已经到达列表末端
    ...
  },
  "items": [...] // 返回 Pod 1001-1253
}
```

注意列表中的 `resourceVersion` 在每个请求的响应中都是相同的值，
这就意味着服务器端所返回的是一个一致性的 Pod 列表快照视图。
在 `10245` 版本之后创建的、更新的或者删除的 Pod 都不会被包含在列表中，
除非用户发出的 **list** 请求中不带有 `continue` 令牌。
这一设计是的用户可以将规模较大的请求切分为多个小的数据块，
接下来针对对象的全集执行 **watch** 操作，确保不会漏掉任何更新动作。

