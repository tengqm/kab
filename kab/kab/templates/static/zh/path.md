## HTTP 路径

对于一个 API 请求而言，其 HTTP 路径可以包含多个不同部分：

- **组（Group）**：<a href="{% url 'static-page' 'apigroup' %}">API 组</a>信息；
- **版本（Version）**：<a href="{% url 'static-page' 'apiversion' %}">API 组版本</a>信息；
- **资源类别（Kind）**：<a href="{% url 'static-page' 'resource' %}">资源类别</a>；
- **名字空间（Namespace）**：针对名字空间作用域的资源而言，所在的名字空间；
- **资源名称（Name）**：<a href="{% url 'static-page' 'name' %}">资源对象的名称</a>；
- **子资源（Subresource）**：子资源的名称（如果有的话）。

读取资源集合或者单个资源时，对应的 API 路径如下。

### 集群作用域的资源

- `GET /apis/<Group>/<Version>/<Kind>` -
  返回指定资源类别的所有资源对象的集合；
- `GET /apis/<Group>/<Version>/<Kind>/<Name>` -
  返回所给资源类别下面指定名称的资源；
- `GET /apis/<Group>/<Version>/<Kind>/<Name>/<Subresource>` -
  返回所指定资源的给定子资源。

### 名字空间作用域的资源

- `GET /apis/<Group>/<Version>/<Kind>` -
  返回所有名字空间下给定资源类别的所有资源对象集合；
- `GET /apis/<Group>/<Version>/namespaces/<Namespace>/<Kind>` -
  返回给定名字空间下指定资源类别的全部资源对象；
- `GET /apis/<Group>/<Version>/namespaces/<Namespace>/<Kind>/<Name>` -
  返回给定名字空间下指定资源类别的、给定名称的资源；
- `GET /apis/<Group>/<Version>/namespaces/<Namespace>/<Kind>/<Name>/<Subresource>` -
  返回给定名字空间下指定资源类别的、给定名称资源的给定子资源。

由于 `namespace` 资源类别本身是一个**集群作用域**资源，用户可以通过
`GET /api/v1/namespaces` 列举所有名字空间，或者通过访问
`GET /api/v1/namespaces/<Name>` 读取指定名字空间的详细信息。

### 子资源（Sub-Resources）

某些资源类别可能具有一个或者多个子资源，体现为给定资源之下的子路径。

对于集群作用域资源的子资源，其访问路径如下：

```html
/apis/<Group>/<Version>/<Kind>/<Name>/<Subresource>
```

对于名字空间作用域的资源而言，其子资源的访问路径如下：

```html
/apis/<Group>/<Version>/namespaces/<Namespace>/<Kind>/<Name>/<Subresource>
```

系统不提供跨多个资源实例来访问某类子资源的服务；
如果出现这种需求，通常意味着需要提供一种新的虚拟资源类别。

