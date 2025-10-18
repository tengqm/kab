## 内容类型（Content-Type）

### 请求格式

发送到 API 服务器的 POST 和 PUT 请求可以使用以下格式之一来进行编码：

- `"application/json"`：请求的负载使用 JSON 格式进行编码。
- `"application/yaml"`：请求的负载采用 YAML 格式进行编码。
- `"application/vnd.kubernetes.protobuf"`：请求的负载使用
  <a href="https://developers.google.com/protocol-buffers" target="_blank">
  Protobuf <i class='fa fa-external-link-alt'></i></a> 格式进行编码。
  注意并非所有资源类型都支持 "Protobuf" 编码，尤其是那些使用
  自定义资源定义（CustomResourceDefinition，CRD）来定义的资源以及通过
  API 服务器扩展来支持的资源。
- `"application/cbor"`：基于
  <a href="https://www.rfc-editor.org/rfc/rfc8949" target="_blank">RFC8949</a>
  所定义的格式对请求负载进行编码。

对于 PATCH 请求，内容类型（`content-type`）可以是如下之一：

- `"application/json-patch+json"`：基于
  <a href="https://tools.ietf.org/html/rfc6902" target="_blank">
  RFC6902 <i class='fa fa-external-link-alt'></i></a>
  标准定义的一种 JSON 补丁格式。
- `"application/merge-patch+json"`：基于
  <a href="https://tools.ietf.org/html/rfc7386" target="_blank">
  RFC7386 <i class='fa fa-external-link-alt'></i></a>
  标准定义的一种合并补丁格式。
- `"application/strategic-merge-patch+json"`：策略性合并补丁格式，
  是对标准的合并补丁的一种扩展。
- `"application/apply-patch+yaml"`：YAML 格式的一种特殊类型，
  用来对服务器端应用（SSA）请求进行编码。当服务器端应用操作出现冲突时，
  整个应用操作失败。服务器端应用请求需要提供 `fieldManager` 查询参数，
  并且所提供的对象不可以包含 `managedFields` 字段。
  与服务器端应用相关的进一步详细信息，可参阅
  <a href="https://kubernetes.io/docs/reference/using-api/server-side-apply/"
  target="_blank">官方文档 <i class='fa fa-external-link-alt'></i></a>。
- `"application/apply-patch+cbor"`:  针对 CBOR 编码的服务器端应用配置的介质类型。

如果请求中所给的 `"Content-Type"` 是服务器所支持的，则服务器会用相同的编码形式返回响应，
并在头部中包含取值相同的 `"Content-Type"`；否则服务器可能会返回
"*406 Not acceptable*" 错误。

### 响应的编码

用户可以通过下面的 HTTP 请求头部字段来指定响应的格式。

#### `Accept-Encoding` 头部

`Accept-Encoding` 头部可以接受 `"gzip"` 作为其取值。
忽略这一头部字段的做法是可接受的。

#### `Accept` 头部

`"Accept"` 头部的合法取值是以下之一：

* `"application/com.github.proto-openapi.spec.v2@v1.0+protobuf"`：
  这一格式主要用于集群内部通信。
* `"application/json"`：这是默认值，表明服务器的响应应该是 JSON 数据。
* `"application/json;stream=watch"`：服务器对于 watch 操作的响应应该是 JSON 数据流。
* `"application/yaml"`：服务器的响应应该是 YAML 格式编码的数据。
* `"application/vnd.kubernetes.protobuf"`：服务器的影响应该采用 
  [Protobuf](https://developers.google.com/protocol-buffers) 格式编码。
* `"application/vnd.kubernetes.protobuf;stream=watch"`：与
  `"application/vnd.kubernetes.protobuf"` 相同，只不过响应应该是一个数据流。
* `"application/json;as=Table;g=meta.k8s.io;v=v1beta1"`：请求服务器以表格内容类型来返回对象。
* `"application/cbor-seq"`：服务器的响应应该是一个由 CBOR 编码的监视事件组成的序列。
* `*`：服务器的响应应该以 `"application/json"` 格式编码。

为了应对某种内容类型是服务器所不支持的，客户端应该在其 `"Accept"` 头部设置多种内容类型，
进而支持回退到其他可选内容类型。例如：

```html
Accept: application/json;as=Table;g=meta.k8s.io;v=v1beta1, application/json
```

### 表格输出

`kubectl get` 操作通常会给出一个简单的、表格形式的结果，其中包含指定资源类型的一个或者多个实例。
以前，客户端需要使用 `kubectl` 中实现的机制来重现表格输出，完成简单的列表操作。
这种方法的缺陷之一是在处理某些对象时需要执行很多逻辑。
此外，API 聚合或者自定义资源都是在系统编辑阶段无法预知的。
这就意味着需要一种更为通用的实现方式，以便处理客户端无法识别的资源类型。

为了避免上述的各类缺陷，从 v1.10 版本开始，客户端可以请求服务器返回对象的“表格”形式呈现。
将表格的排版细节工作交给服务器端来实现。
Kubernetes API 实现了一种标准的 HTTP 内容类型协商机制，
用户可以在 GET 请求的 `"Accept"` 头部中包含
`"application/json;as=Table;g=meta.k8s.io;v=v1beta1"`，
从而要求服务器以“表格”内容类型来返回对象。

例如，如果要以表格形式列举集群中的所有名字空间：

```console
GET /api/v1/pods
Accept: application/json;as=Table;g=meta.k8s.io;v=v1beta1
---
200 OK
Content-Type: application/json

{
  "kind": "Table",
  "apiVersion": "meta.k8s.io/v1beta1",
  "metadata": {
      "selfLink": "/api/v1/namespaces",
      "resourceVersion": "17866787"
  }
  "columnDefinitions": [
    {
      "name": "Name",
      "type": "string",
      "format": "name",
      "description": "...",
      "priority": 0
    },
    ...
  ],
  "rows": [
    {
      "cells": [
        "default",
        "Active",
        "90d"
      ],
      "object": {
        "kind": "PartialObjectMetadata",
        "apiVersion": "meta.k8s.io/v1beta1",
        "metadata": {
          "name":"default",
          "selfLink": "...",
          "uid": "...",
          "resourceVersion": "356215",
          "creationTimestamp":"2020-09-09T02:49:57Z",
          "managedFields":[...]
        }
      }
    },
    ...
  ]
}
```

对于在服务器端没有定制的表格定义的资源类型而言，
所返回的默认的“表格”响应中会包含资源的  `name` 和 `creationTimestamp` 字段。

关于对 Table 输出格式的更为详细的说明，可以参阅 
<a href="{% url 'view-definition' API "meta" "v1" "Table" %}">Table
</a> 结构的定义。

