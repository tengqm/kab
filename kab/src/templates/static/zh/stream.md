## 流数据（Stream）

Kubernetes 所公开的某些 API 操作可能要求在客户端与容器端双向传输二进制数据流。
实际场景包括 `attach`、`exec`、`portforward` 和 `logging` 等请求。
API 在可升级的 HTTP 链接之上
（参见 <a href="https://tools.ietf.org/html/rfc2817" target="_blank">
RFC2817 <i class='fa fa-external-link-alt'></i></a>）
使用 WebSocket 和 SPDY 等协议来提供一些额外操作。
这类操作通常以对应动词（`exec`、`log`、`attach`、`portforward` 等）
作为子资源，通过 `GET` 和 `POST` HTTP 动作提供给客户端。
`GET` 操作主要用来支持在浏览器中执行 JavaScript 操作，
而 `POST` 操作从语义上来讲更为精确一些。

目前使用的两种主要的协议包括：

- **流式通道（Streamed Channels）**：
  在远程执行某个 Shell 命令时，需要向标准输入（STDIN）写入、从标准输出（STDOUT）
  和标准错误输出（STDERR）中读取；在为多个端口执行数据流转发时，可以使用同一个
  TCP 连接来完成多工操作。在这些情况下，需要处理多个彼此独立的二进制数据流。
  Kubernetes 支持基于 SPDY 的帧协议来利用 SPDY 通道处理流数据，
  也支持 WebSocket 帧协议，在同一数据流上多工传输多个通道，
  每个数据块的头部都有一个字节的前缀用来标示其所属通道。
  WebSocket 协议还支持一种可选的子协议，处理客户端提供的 base64 编码的字节流，
  以及从服务器端返回的 base64 编码的字节流。在这些数据流中，通道前缀一般是字母
  （`'0'`、`'1'`、`'2'`），便于浏览器中的 JavaScript 解析处理数据。
- **流式响应（Streaming Response）**：
  流数据通道的默认日志输出采用 HTTP 分块传输编码（HTTP Chunked Transfer-Encoding），
  可支持来自服务器的任意二进制数据流。
  基于浏览器的 JavaScript 在访问分块响应中原始数据时能力有限，
  尤其是服务器端返回大量日志数据时。
  在将来的 API 调用中，可能会支持传输大尺寸文件。
  流式 API 端点支持可选的 WebSocket 升级操作，用以提供从服务器到客户端的单向通道，
  用 WebSocket 二进制帧的形式传输块数据。
  WebSoecket 有一种可选的子协议，可以在将数据流返回给客户端之前对其执行 base64 编码。

如果客户端对 SPDY 协议有原生的支持，则应该使用 SPDY 协议，将 WebSocket 作为备选。
需要注意的是，WebSocket 协议可能会受到“行头（Head-Of-Line）”阻塞现象影响，
所以客户端需要按顺序来读取、处理每个消息。
未来的发展方向是使用 HTTP/2 实现来替代 SPDY 协议。

