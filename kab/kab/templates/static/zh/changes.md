Kubernetes 的功能特性设计充分考虑了各个 API 持续演化的需要。
其目标是在一定时期内保证与现有客户端之间的兼容性，
从而确保其他项目有机会完成适应性变更动作。

一般而言，社区可能会时不时地甚至频繁地添加新的 API 资源和新的字段。
但是对现有资源或字段的清除动作则要遵循 API的  
<a href="https://kubernetes.io/docs/reference/using-api/deprecation-policy/"
target="_blank">弃用策略 <i class='fa fa-external-link-alt'></a>。
从 v1.19 版本开始，针对发往已被弃用的 REST API 端点的请求，系统会返回一个
`warning` 头部字段。
