## 资源删除

Kubernetes 中资源的删除操作分为两个阶段：1）终止（Finalization）；2）移除（Removal）。

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

当对象上最后一个终结器（Finalizer）也被去除时，对应的资源就会最终从 etcd 数据库中删除。

### 删除时间戳

当客户端第一次发出删除请求时，服务器会将对象上的 `deletionTimestamp` 字段设置为当前时间。
当 `deletionTimestamp` 被设置时，可以操控对象上 `finalizers`
字段的控制器可以在任何时候开始清理工作。
如果存在多个控制器管理不同的 `finalizers` 成员，其执行顺序是不可预测的。

`deletionTimestamp` 字段也是一种标志，用来标明对象是否正在被删除。
当服务器侧开始执行删除操作时，此字段被设置为当前时间。
如果此字段为空，则意味着对象没有处于将被删除的状态。

