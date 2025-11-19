## API 概念

### 1. 概览

Kubernetes 的 API 是一种基于资源的（RESTful）、通过 HTTP 协议提供的编程接口。
Kubernetes 的 RESTful API 是其核心组成部分，通过 API 服务器向外提供。
使用 Kubernetes 的 API 定义，用户可以：

- 使用标准的 HTTP 动词 `POST`、`PUT`、`GET`、`PATCH`、`DELETE` 等）
  创建、读取、更新、删除主要的资源。
- 操控对象的子资源（如果有的话）。
- 出于便利或效率的需要，指示 API 服务器以特定的格式返回响应。
- <a href="{% url 'static-page' 'watch' %}">watch</a>（监视）
  某些资源上发生的变化，获得相应的通知消息。
- 读取资源的一致性列表，以便其他组件能够有效地缓存、同步资源状态。

### 2. Kubernetes API

API 规范通常包含以下几个部分：

<ul>
  <li><a href="{% url 'static-page' 'path' %}">path（路径）</a>
  </li>
  <li><a href="{% url 'static-page' 'verbs' %}">verb（动词）</a>
    <ul>
      <li>Kubernetes 对 <code>CREATE</code>、<code>DELETE</code>、
        <code>PUT</code> 和 <code>GET</code> 的处理与其他 RESTful Web
        服务非常类似。
      </li>
      <li>对于 <a href="{% url 'static-page' 'patches' %}">
        <code>PATCH</code></a> 动词的处理有一定的复杂度。
        当补丁的类型不同时，请求的主体部分差异很大。
      </li>
    </ul>
  </li>
  <li>头部（headers）通常包含一些额外的信息，例如：
    <ul>
      <li>请求的 <a href="{% url 'static-page' 'content-type' %}">content-type（内容类型）</a>
       以及期待的响应格式。最常用的是 JSON 格式 （<code>"application/json"</code>）。
       不过 Kubernetes 为了数据处理效率和性能，还定义了自己的
       <a href="{% url 'static-page' 'protobuf' %}">protobuf</a>
       格式，并且在较新版本中增加了对 CBOR 二进制格式的支持。
      </li>
      <li>用来完成身份认证的凭据信息。
      </li>
    </ul>
  </li>
  <li>主题（body）部分采用某种
    <a href="{% url 'static-page' 'content-type' %}">content-type</a> 来编码。
    <ul>
      <li>Kubernetes 包含很多种不同的数据结构
        <a href="{% url 'list-definitions' '' 'all' %}">definitions（定义）</a>，
        其中一些数据结构以 <a href="{% url 'list-resources' '' 'all' %}">
        resources（资源）</a>的形式公开出来，允许用户执行创建、更新等操作，
        另外一些数据结构则是用来构造更高层次概念的组成部分。
      </li>
      <li>为了进一步明确数据结构的用法和语义，Kubernetes 对标准的
        <a href="https://www.openapis.org/" target="_blank">OpenAPI
        <i class='fa fa-external-link-alt'></i></a> 规范进行了扩充，
        定义了一些
        <a href="{% url 'static-page' 'extensions' %}">extensions（扩展）</a>
        属性。
      </li>
      <li>与其他 RESTful Web 服务类似，Kubernetes API 所建模的
        <a href="{% url 'static-page' 'resource' %}">resource（资源）</a>
        大多也被称作 <a href="{% url 'static-page' 'object' %}">object（对象）</a>，
        只有极少数 API 是例外。
      </li>
      <li>每个 API 对象都使用其
        <a href="{% url 'static-page' 'name' %}">name（名字）</a>作为标识符。
        对于某些对象而言，其名字可以部分地（如果设置了 `metadata.generateName`）
        或者完全地由服务器端生成。
      </li>
      <li>每个 API 对象通常具有与之对应的模式定义，在 Kubernetes 术语中，称作
        <a href="{% url 'static-page' 'kind' %}">kind（类别）</a>。
      </li>
      <li>当对象被写入后台数据库时，系统会为其生成一个
        <a href="{% url 'static-page' 'uid' %}">unique ID（唯一标识符）</a>、
        以及一个
        <a href="{% url 'static-page' 'resource-version' %}">
        resource version（资源版本）</a>属性值。
      </li>
      <li>对于需要长期运行的某些请求，客户端与服务器端一般会建立 HTTP/2 链接，
        以便双向传输二进制的
        <a href="{% url 'static-page' 'stream' %}">streams（数据流）</a>。
      </li>
    </ul>
  </li>
  <li>查询字符串（query string），也称作 <i>parameters（参数）</i>；例如：
    <ul>
     <li><a href="{% url 'static-page' 'dry-run' %}">dry-run</a>：
       对请求进行评估处理，执行正常请求的所有处理步骤，只是最终结果不写入数据库。
     </li>
     <li><a href="{% url 'static-page' 'exact' %}">exact</a>：
       用来指定是否 <code>export</code> 参数要保持特定于集群的字段
       （如 <code>namespace</code>）。
       此参数在 v1.21 发行版本中已被删除。
     </li>
     <li><a href="{% url 'static-page' 'export' %}">export</a>：
        用来指示 API 响应是否将被导出。
        此参数在 v1.21 发行版本中被移除。
     </li>
     <li><a href="{% url 'static-page' 'pretty' %}">pretty</a>：
       对输出的结果进行排版美化，便于人来阅读。
     </li>
     <li><code>limit</code> 和 <code>continue</code>：
       用来将尺寸较大的 API 响应切分成多个
       <a href="{% url 'static-page' 'pagination' %}">chunks（数据块）</a>，
       分批次返回。
     </li>
     <li><a href="{% url 'static-page' 'watch' %}">watch</a>：
       开始订阅某个特定 API 资源的状态变更，当未来出现任何变更时都会接收到通知。
     </li>
     <li><code>fieldManager</code>：
       用来发送一个
       <a href="{% url 'static-page' 'server-side-apply' %}">
       server-side apply（服务器端应用）</a>请求。
     </li>
    </ul>
  </li>
</ul>

### 3. 参考资料

#### OpenAPI 规范

正式的 API 规范是按
<a href="https://www.openapis.org/" target="_blank">OpenAPI V2
<i class='fa fa-external-link-alt'></i></a> 和
<a href="https://www.openapis.org/" target="_blank">OpenAPI V3
<i class='fa fa-external-link-alt'></i></a>
格式生成的，API 规范的生成基于 Go 源代码中的注释，并分别以
<a href="https://github.com/kubernetes/kubernetes/blob/master/api/openapi-spec/swagger.json"
target="_blank">swagger.json <i class='fa fa-external-link-alt'></i></a>
和 
<a href="https://github.com/kubernetes/kubernetes/tree/master/api/openapi-spec/v3" target="_blank">独立的 API 定义 <i class='fa fa-external-link-alt'></i></a>
等形式发布。

#### 使用 API

用户可以使用 <kbd>kubectl</kbd> 命令行工具来调用 Kubernetes API，
也可以使用其他工具或第三方库来调用它们。
如果用户希望编写应用来调用这些 API，可以优先考虑第三方的
<a href="https://kubernetes.io/docs/reference/using-api/client-libraries"
target="_blank">客户端库 <i class='fa fa-external-link-alt'></i></a>。

