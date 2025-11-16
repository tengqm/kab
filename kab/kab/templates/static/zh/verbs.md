## 请求动词

### 请求类型

总体而言，Kubernetes 中包含两大类 API 请求：

- **非资源请求**：对于访问路径不是 `"/api/v1/..."` 或 `"/apis/<group>/<version>/..."`
  的请求，Kubernetes 将其视为非资源请求，使用请求对应的 HTTP
  方法的小写字母形式作为其动词。

  例如，对于访问 `"/api"` 或 `"/healthz"` 这类端点的 HTTP GET 请求，
  API 服务器会使用 **get** 作为 API 请求的动词。
- **资源请求**：对于访问资源 API 端点的请求，要确定对应的请求动词，
  需要检查所使用的 HTTP 动词，并根据请求所针对的是单个资源还是资源集合来判定。

### 标准的资源动词

几乎所有的对象资源类型都支持标准的  HTTP 动词：
`GET`、`POST`、`PUT`、`PATCH` 和 `DELETE`。

<div class="table-responsive-sm">
<table class="table table-striped">
  <thead>
    <tr><th>HTTP 动词</th><th>API 请求动词</th><th>说明</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><tt>POST &lt;resources&gt;</tt></td>
      <td><B>create</B></td>
      <td>创建一个资源</td>
    </tr>
    <tr>
      <td><tt>GET &lt;resources&gt;/&lt;name&gt;</tt></td>
      <td><B>get</B></td>
      <td>读取某个资源，请求动词也可称为 <B>read</B></td>
    </tr>
    <tr>
      <td><tt>GET &lt;resources&gt;</tt></td>
      <td><B>list</B></td>
      <td>列举所有资源，包括每个对象的完整内容</td>
    </tr>
    <tr>
      <td><tt>GET &lt;resources&gt;/?watch=true</tt></td>
      <td><B>watch</B></td>
      <td>监视某个资源或某类资源的集合</td>
    </tr>
    <tr>
      <td><tt>PUT &lt;resources&gt;/&lt;name&gt;</tt></td>
      <td><B>update</B></td>
      <td>更新某个资源，也被称作 <B>replace</B>。
        请求中必须携带完整的对象标识。如果某个字段被忽略，则表明客户端期望该字段的值被清除。
        换言之，PUT 动词<B>不</B>接受部分更新请求。
        如果需要修改已有对象的某个局部，可以先执行 GET 操作读取资源，
        更改资源的 <code>spec</code>、<code>metadata.labels</code>、
        <code>metadata.annotations</code>  中的某个部分，再用 PUT 请求将其重新提交给服务器。
        某些对象可能会公开一些不完全相同的资源表示，允许客户端更改其 <code>status</code>，
        或者允许针对对象执行一些定制的动作。
      </td>
    </tr>
    <tr>
      <td><tt>PATCH&lt;resources&gt;/&lt;name&gt;</tt></td>
      <td><B>patch</B></td>
      <td>部分更新指定的资源个体</td>
    </tr>
    <tr>
      <td><tt>DELETE &lt;resources&gt;/&lt;name&gt;</tt></td>
      <td><B>delete</B></td>
      <td>删除某个指定的资源个体</td>
    </tr>
    <tr>
      <td><tt>DELETE &lt;resources&gt;</tt></td>
      <td><B>deletecollection</B></td>
      <td>删除指定资源类型的对象集合</td>
    </tr>
  </tbody>
</table>
</div>

### 特殊的资源动词

Kubernetes 有时会使用一些特殊的动词，尤其是在执行鉴权或者检查额外的权限时。
这类 API 请求动词并不与某些 HTTP 动词直接关联。例如：

<div class="table-responsive-sm">
<table class="table table-striped">
  <thead>
    <tr><th>资源</th><th>API 请求动词</th><th>说明</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><tt>podsecuritypolicies</tt></td>
      <td><B>use</B></td>
      <td>从某个 Role 或 ClusterRole 中引用某个 PodSecurityPolicy</td>
    </tr>
    <tr>
      <td><tt>roles</tt> 或 <tt>clusterroles</tt></td>
      <td><B>bind</B></td>
      <td>从某个 RoleBinding 或者 ClusterRoleBinding 中引用某个 Role 或 ClusterRole</td>
    </tr> 
    <tr>
      <td><tt>roles</tt> or <tt>clusterroles</tt></td>
      <td><B>escalate</B></td>
      <td>对于创建或更新一个 Role （或 ClusterRole）对象的操作，
         如果请求者并不具有 Role （或 ClusterRole）中所包含的所有操作权限时，
         这一操作可被称作“escalate（提权）”操作。
         此动词定义仅限于 RBAC 鉴权组件所执行的操作权限检查动作。
      </td>
    </tr> 
    <tr>
      <td><tt>users</tt>, <tt>groups</tt>, <tt>serviceaccounts</tt> or
        <tt>userextras</tt>
      </td>
      <td><B>impersonate</B></td>
      <td>身份认证组件使用这一操作来检查是否发出请求的用户可以执行所指定的主体可以执行的操作，
        这里的主体可以是核心 API 组中的 `users`、`groups` 或 `serviceaccounts`，
        也可以是 `authentication.k8s.io` API 组中的 `userextras`。
      </td>
    </tr> 
  </tbody>
</table>
</div>

### 针对子资源的动词

取决于目标对象的不同，针对其子资源所定义的动词也不同。

<div class="table-responsive-sm">
<table class="table table-striped">
  <thead>
    <tr>
      <th>资源类型</th>
      <th>子资源</th>
      <th>请求动词</th>
      <th>说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><tt>Pod</tt></td>
      <td><tt>attach</tt></td>
      <td><B>attach</B></td>
      <td>用来挂接到指定 Pod 中特定容器的一种长连接请求。
      </td>
    </tr>
    <tr>
      <td><tt>Pod</tt></td>
      <td><tt>exec</tt></td>
      <td><B>exec</B></td>
      <td>用来挂接到指定 Pod 中特定容器的一种长连接请求。
        HTTP 动词可以是 <tt>GET</tt> 或 <tt>POST</tt>。
      </td>
    </tr>
    <tr>
      <td><tt>Pod</tt></td>
      <td><tt>log</tt></td>
      <td><B>log</B></td>
      <td>用于读取指定 Pod 中某个容器的日志数据的一种长连接请求。
        对应的 HTTP 动词只能是 <tt>GET</tt>。
      </td>
    </tr>
    <tr>
      <td><tt>Pod</tt></td>
      <td><tt>proxy</tt></td>
      <td><B>proxy</B></td>
      <td>向某个 Pod 的代理发送一条 HTTP 命令。客户端可以选择为 HTTP 命令指定一条路径。
        HTTP 动词可以是 <tt>GET</tt>、<tt>POST</tt>、<tt>DELETE</tt>、
        <tt>HEAD</tt>、<tt>OPTIONS</tt>、<tt>PATCH</tt> 或 <tt>PUT</tt> 之一。
      </td>
    </tr>
    <tr>
      <td><tt>Pod</tt></td>
      <td><tt>portforward</tt></td>
      <td><B>portforward</B></td>
      <td>创建或者读取用来完成端口转发操作的端口。
        HTTP 动词可以是 <tt>GET</tt> 或 <tt>POST</tt>。
      </td>
    </tr>
    <tr>
      <td><tt>Service</tt></td>
      <td><tt>proxy</tt></td>
      <td><B>proxy</B></td>
      <td>向 Service 的代理发送一条 HTTP 命令。客户端可以选择为 HTTP 命令指定一条路径。
        HTTP 动词可以是 <tt>GET</tt>、<tt>POST</tt>、<tt>DELETE</tt>、
        <tt>HEAD</tt>、<tt>OPTIONS</tt>、<tt>PATCH</tt> 或 <tt>PUT</tt> 之一。
      </td>
    </tr>
    <tr>
      <td><tt>Node</tt></td>
      <td><tt>proxy</tt></td>
      <td><B>proxy</B></td>
      <td>向 Node 的代理发送一条 HTTP 命令。客户端可以选择为 HTTP 命令指定一条路径。
        HTTP 动词可以是 <tt>GET</tt>、<tt>POST</tt>、<tt>DELETE</tt>、
        <tt>HEAD</tt>、<tt>OPTIONS</tt>、<tt>PATCH</tt> 或 <tt>PUT</tt> 之一。
      </td>
    </tr>
  </tbody>
</table>
</div>

跨越多个资源来访问其某个子资源的操作是不支持的。
如果需要进行这样的操作，通常意味着需要构造一种新的、虚拟的资源。

`Node` 资源具有 `proxy`、`metrics`、`spec`、`stats`、`log` 等子资源。
这些子资源都是 kubelet API 的一部分。

### 非资源请求动词

- `logFileHandler`：读取位于指定路径上的指定日志文件
  (<a href="{% url 'view-operation' API 'logFileHandler' %}"><i class="fa fa-eye"></i></a>)
- `logFileListHandler`：列举在指定 API 服务器节点上公开的日志文件
  (<a href="{% url 'view-operation' API 'logFileListHandler' %}"><i class="fa fa-eye"></i></a>)
- `getCoreAPIVersions`：读取核心 API 组下可用的版本
  (<a href="{% url 'view-operation' API 'getCoreAPIVersions' %}"><i class="fa fa-eye"></i></a>)
- `getAPIVersions`：列举 API 服务器上可用的 API 组
  (<a href="{% url 'view-operation' API 'getAPIVersions' %}"><i class="fa fa-eye"></i></a>)
- `getCodeVersion`：读取 API 服务器上的版本信息
  (<a href="{% url 'view-operation' API 'getCodeVersion' %}"><i class="fa fa-eye"></i></a>)
- `getServiceAccountIssuerOpenIDConfiguration`：读取服务账号发放者的 OpenID 配置
  (<a href="{% url 'view-operation' API 'getServiceAccountIssuerOpenIDConfiguration' %}"><i class="fa fa-eye"></i></a>)
- `getServiceAccountIssuerOpenIDKeyset`：读取服务账号发放者 OpenID JSON Web Key Set
  (<a href="{% url 'view-operation' API 'getServiceAccountIssuerOpenIDKeyset' %}"><i class="fa fa-eye"></i></a>)

下面的一些 API 路径对于调试集群而言非常有用：

- `/debug/pprof`：返回调试用的性能数据
- `/healthz`：返回 API 服务器的总体健康信息。用户可以使用 `verbose`
  查询字符串来输出所有已知组件及其健康状态信息。
- `/healthz/<component>`：返回指定组件的健康状态信息。
  `<component>` 部分可以在 `/healthz` 子资源上使用 `verbose` 查询字符串来发现。
  如果所指定的组件无法被 API 服务器识别，则服务器会返回 404 错误。
- `/readyz`：用来检查 API 服务器就绪态的一个端点。用户可以使用 `verbose`
  查询字符串来输出所有已知组件及其就绪态信息。
- `/readyz/<component>`：返回指定组件的就绪态信息。
  `<component>` 部分可以在 `/readyz` 子资源上使用 `verbose` 查询字符串来发现。
  如果所指定的组件无法被 API 服务器识别，则服务器会返回 404 错误。
- `/livez`：用来检查 API 服务器存活态的一个端点。
  用户可以使用 `verbose` 查询字符串来请求输出所有已知组件及其存活态信息。
  用户也可以使用 `exclude=<component>` 查询字符串来过滤掉某个特定组件。
- `/livez/<component>`：读取指定组件的存活态信息。
  `<component>` 部分可以在 `/livez` 子资源上使用 `verbose` 查询字符串来发现。
  如果所指定的组件无法被 API 服务器识别，则服务器会返回 404 错误。
- `/statusz`：使用 `ComponentStatusz` 特性门控启用之后，此端点可以展示组件的高层配置信息。
- `/flagz`: 使用 `ComponentFlagz` 特性门控启用之后，此端点可以给出组件在启动时设置的命令行参数。

