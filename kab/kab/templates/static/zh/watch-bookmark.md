## 监视书签（Watch Bookmarks）

在监视特定资源或资源集合时，为了应对历史窗口过短带来的负面影响，Kubernetes
引入了 `bookmark` 监视事件。这是一种特殊的事件，用来通知客户端，
其所给的 `resourceVersion` 之前发生的所有变更已经发送完毕。
在此事件中返回的对象的类型与所请求的类型相同，但只设置了 `resourceVersion` 字段。
例如：

```console
GET /api/v1/namespaces/test/pods?watch=1&amp;resourceVersion=10245&amp;allowWatchBookmarks=true
---
200 OK
Transfer-Encoding: chunked
Content-Type: application/json

{
  "type": "ADDED",
  "object": {"kind": "Pod", "apiVersion": "v1", "metadata": {"resourceVersion": "10596", ...}, ...}
}
...
{
  "type": "BOOKMARK",
  "object": {"kind": "Pod", "apiVersion": "v1", "metadata": {"resourceVersion": "12746"} }
}
```

`Bookmark` 事件可以在 **watch** 请求中通过参数 `allowWatchBookmarks=true` 来设置，
但是客户端不能假定服务器会在某个给定的时间间隔后会返回书签信息，
也不可以假定服务器肯定会发送 `bookmark` 事件。

